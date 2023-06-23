<template>
	<div id="shopbag">
		<van-nav-bar fixed title="购物袋" left-text="返回" :right-text="isEdit?'完成':'编辑'" left-arrow @click-left="onClickLeft"
			@click-right="onClickRight" />
		<div class="shopbag-bg">
		</div>
		<div class="shopbag-empty">
			<van-empty description="请先登录" image="error" v-if="tokenString ==''">
				<van-button round type="danger" class="bottom-button" color="#0c34ba" @click="goLogin">去登录</van-button>
			</van-empty>
			<van-empty description="购物袋没有商品！" v-show="allShopcart.length <1" />
		</div>
		<div class="shopbag-list">
			<div class="shopbag-list-item" v-for="(item ,index) in allShopcart" :key="item.sid">

				<van-swipe-cell>

					<template #default>
						<div class="shopbag-item-box">
							<div class="check-box">
								<van-checkbox v-model="item.checked" @click="isAll"></van-checkbox>
							</div>
							<div class="shopbag-img-box">
								<img :src="item.small_img" :alt="item.name" class="auto-img">
							</div>
							<div class="shopbag-content">
								<div class="shopbag-name">
									<div class="zhname-box">
										<div class="zhname one-line-text">{{item.name}}</div>
										<div class="rule one-line-text">{{item.rule}}</div>
									</div>
									<div class="enname one-line-text">{{item.enname}}</div>
								</div>
								<div class="price-count">
									<div class="price">￥{{item.price}}</div>
									<div class="count">
										<van-stepper v-model="item.count" theme="round" button-size="22" disable-input
											@change="modifyCount(item.count,item.sid)" />
									</div>
								</div>
							</div>

						</div>
					</template>
					<template #right>
						<van-button square text="删除" type="danger" class="delete-button" @click="deleteShopcart(item.sid,index)" />
					</template>
				</van-swipe-cell>

			</div>
			<van-submit-bar v-show="!isEdit&&allShopcart.length >=1" :price="checkedShopcart.length > 0?allPrice:0"
				button-text="提交订单" @submit="onSubmit">
				<van-checkbox v-model="allChecked" @click="allChange(allChecked)">全选</van-checkbox>
			</van-submit-bar>
			<van-submit-bar v-show="isEdit&&allShopcart.length >=1" button-text="删除选择" @submit="DeleteChecked">
				<van-checkbox v-model="allChecked" @click="allChange(allChecked)">全选</van-checkbox>
			</van-submit-bar>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Shopbag",
	data() {
		return {
			isEdit: false,
			value: "",
			allChecked: false,
		};
	},
	mounted() {
		if (this.tokenString != "") {
			this.$store.dispatch("allShopcart", { tokenString: this.tokenString });
		}
	},
	methods: {
		onClickLeft() {
			this.$router.back();
		},
		onClickRight() {
			this.isEdit = !this.isEdit;
		},
		goLogin() {
			this.$router.push("/login");
		},
		onSubmit() {
			if (this.checkedShopcart.length < 1) {
				return this.$toast("请选择下单的商品");
			}
			this.$router.push({
				path: "/orderPay",
				query: {
					sids: JSON.stringify(this.checkedShopcart.map((item) => item.sid)),
				},
			});
		},
		modifyCount(count, sid) {
			console.log(count, sid);
			this.$store.dispatch("modifyShopcartCount", {
				tokenString: this.tokenString,
				count,
				sid,
			});
		},
		allChange(check) {
			console.log(check);
			this.$store.commit("ALLCHANGE", check);
		},
		isAll() {
			let index = this.allShopcart.findIndex((item) => item.checked == false);
			this.allChecked = index != -1 ? false : true;
		},
		deleteShopcart(sid, index) {
			this.$store
				.dispatch("deleteShopcart", {
					tokenString: this.tokenString,
					sids: JSON.stringify([sid]),
				})
				.then((res) => {
					this.$store.commit("DELETESHOPCART", [sid]);
					this.isAll();
					this.$toast(res.msg);
				});
		},
		DeleteChecked() {
			let sids = this.allShopcart
				.filter((item) => item.checked == true)
				.map((item) => item.sid);
			this.$store
				.dispatch("deleteShopcart", {
					tokenString: this.tokenString,
					sids: JSON.stringify(sids),
				})
				.then((res) => {
					this.$store.commit("DELETESHOPCART", sids);
					this.isAll();
					this.$toast(res.msg);
				});
		},
	},
	computed: {
		...mapState({
			accountInfo: (state) => state.user.accountInfo,
			tokenString: (state) => state.user.token,
			allShopcart: (state) => state.shopbag.allShopcart,
			checkedShopcart() {
				return this.allShopcart.filter((item) => item.checked == true);
			},
			allPrice() {
				return (
					this.allShopcart
						.filter((item) => item.checked == true)
						.map((item) => +item.price * item.count)
						.reduce((a, b) => a + b) * 100
				);
			},
		}),
	},
};
</script>

<style lang="less">
#shopbag {
	padding-top: 46px;
	padding-bottom: 100px;
	.van-nav-bar {
		.van-nav-bar__text {
			color: @theme-color;
		}
		.van-icon {
			color: @theme-color;
		}
	}
	.van-submit-bar {
		bottom: 50px;
	}
	.van-submit-bar__button--danger {
		margin-left: auto;
	}
	.shopbag-bg {
		height: 60px;
		background: url(./images/shopbag_bg.png) no-repeat 50%;
		background-size: cover;
	}
	.van-empty__description {
		margin-bottom: 16px;
	}

	.shopbag-list {
		padding: 10px;

		.goods-card {
			margin: 0;
			background-color: #fff;
		}
		.delete-button {
			height: 100%;
		}
		.shopbag-list-item {
			background-color: #fff;
			margin-bottom: 10px;
			border-radius: 10px;
			overflow: hidden;

			.shopbag-item-box {
				display: flex;
				padding: 10px;
				align-items: center;

				.check-box {
					width: 20px;
					height: 20px;
				}
				.shopbag-img-box {
					width: 80px;
					height: 80px;
					background-color: #ddd;
					margin: 0 10px;
				}

				.shopbag-content {
					width: calc(100% - 120px);
					height: 80px;

					.shopbag-name {
						height: 40px;

						.zhname-box {
							display: flex;
							align-items: center;
							font-size: 14px;
							.zhname {
								max-width: 100px;
							}

							.rule {
								margin-left: 20px;
								color: #666;
							}
						}

						.enname {
							font-size: 12px;
							color: #999;
							margin-top: 3px;
						}
					}
					.price-count {
						display: flex;
						height: 40px;
						align-items: center;

						.price {
							font-size: 14px;
							font-weight: 700;
							color: #e4393c;
							margin-right: auto;
						}
					}
				}
			}
		}
	}
}
</style>