<template>
	<div id="orderpay">
		<van-nav-bar fixed title="订单结算" left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="order-buy">
			<div class="order-address">
				<div class="select-address" @click="overlayShow=true">
					<div class="select-address-title">选择地址</div>
					<div class="arrow">
						<van-icon name="arrow"></van-icon>
					</div>
				</div>
				<div class="user-address-info">
					<div class="user-info">
						<div class="username">{{checkAddress?.name}}</div>
						<div class="phone">{{checkAddress?.tel}}</div>
						<div class="">
							<van-tag round color="#0c34ba" v-show="checkAddress.isDefault == 1">默认</van-tag>
						</div>
					</div>
					<div class="detail-address">{{checkAddress?.address}}</div>
				</div>
			</div>
			<van-popup v-model="overlayShow" position="bottom" closeable>
				<div class="address-box">
					<div class="address-title">选择地址
					</div>

					<!-- <van-radio-group v-model="radio">
							<van-radio name="1">单选框 1</van-radio>
							<van-radio name="2">单选框 2</van-radio>
						</van-radio-group> -->
					<van-address-list v-model="chosenAddress" :list="address" default-tag-text="默认" @add="onAdd"
						@select="toggleAddress" />

				</div>
			</van-popup>
			<div class="order-buy-box">
				<div class="order-wrapper">
					<div class="order-prod">
						<div class="order-info">订单信息</div>
						<div class="order-box">
							<div class="order-item" v-for="item in coffee" :key="item.sid">
								<div class="pro-item">
									<div class="pro-item-img">
										<img class="auto-img" :src="item.small_img" :alt="item.name">
									</div>
									<div class="pro-item-content">
										<div class="zhname-box">
											<div class="zhname one-line-text">{{item.name}}</div>
											<div class="rule one-line-text">{{item.rule}}</div>
										</div>
										<div class="enname one-line-text">{{item.enname}}</div>
										<div class="price-count">
											<div class="price">￥{{item.price}}</div>
											<div class="count">x{{item.count}}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="order-total">

							<div class="order-count">共计 {{allCount}} 件商品</div>
							<div class="order-money">订单金额：￥{{allPrice}}</div>
							<div class="left-circle circle"></div>
							<div class="right-circle circle"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="buy-box">
				<van-button block round color="#0c34ba" @click="pay">立即结算</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "OrderPay",
	data() {
		return {
			overlayShow: false,
			// radio: "1",
			chosenAddress: "",
			checkAddress: {},
			sids: "",
			coffee: [],
		};
	},
	mounted() {
		this.sids = this.$route.query.sids;
		this.$store
			.dispatch("commitShopcart", {
				tokenString: this.tokenString,
				sids: this.sids,
			})
			.then((res) => {
				this.coffee = res.result;
			});
		this.$store
			.dispatch("findAddress", { tokenString: this.tokenString })
			.then((res) => {
				this.checkAddress =
					res.result.filter((item) => item.isDefault == 1)[0] || {};
				this.chosenAddress = this.checkAddress.id;
			});
	},
	methods: {
		onClickLeft() {
			this.$router.back();
		},
		pay() {
			if (this.checkAddress.aid == undefined){
				return this.$toast('请选择地址')
			}
				this.$store
					.dispatch("pay", {
						tokenString: this.tokenString,
						sids: this.sids,
						phone: this.checkAddress.tel,
						address: this.checkAddress.address,
						receiver: this.checkAddress.name,
					})
					.then((res) => {
						if (res.code == 60000) {
							this.$toast(res.msg);
							this.$router.push("/order");
						}
					})
					.catch((err) => {
						this.$toast.clear();
						this.$toast("购买失败");
					});
		},
		onAdd() {
			this.$router.push("/addAddress");
		},
		toggleAddress(item, index) {
			console.log(item, index);
			this.checkAddress = this.address[index];
			this.overlayShow = false;

			// this.checkAddress = JSON.parse(JSON.stringify(this.checkAddress));
		},
	},

	computed: {
		...mapState({
			address: (state) => state.myaddress.address,
			tokenString: (state) => state.user.token,
			allPrice() {
				return this.coffee
					.map((item) => +item.price * item.count)
					?.reduce((a, b) => a + b, 0);
			},
			allCount() {
				return this.coffee
					.map((item) => item.count)
					?.reduce((a, b) => a + b, 0);
			},
		}),
	},
};
</script>

<style lang="less">
#orderpay {
	padding-top: 46px;
	padding-bottom: 50px;
	.van-address-item__edit {
		display: none;
	}
	.van-address-item {
		padding: 10px 0;
	}
	.van-address-item__value {
		padding: 0;
	}
	.van-nav-bar {
		.van-nav-bar__text {
			color: @theme-color;
		}
		.van-icon {
			color: @theme-color;
		}
	}
	.order-buy {
		padding: 10px;
		.order-address {
			background-color: #fff;
			padding: 10px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;

			.select-address {
				display: flex;
				align-items: center;
				padding: 5px 0;
				font-size: 14px;
				font-weight: 700;
				gap: 5px;
			}

			.user-address-info {
				margin-top: 10px;

				.user-info {
					display: flex;
					align-items: center;

					.username {
						font-size: 14px;
						font-weight: 700;
					}

					.phone {
						font-size: 14px;
						color: #666;
						margin: 0 10px;
					}
				}

				.detail-address {
					margin-top: 10px;
					font-size: 14px;
					color: #999;
				}
			}
		}
		.address-box {
			padding: 10px;
			font-size: 14px;
			max-height: 500px;
			.address-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 16px;
				font-weight: 700;
				padding: 10px 0;
			}

			.address-list {
				padding: 10px;
			}
			.address-btn {
				margin-top: 50px;
			}
		}
		.order-buy-box {
			margin-top: 30px;
			.order-prod {
				padding: 10px;
				margin-bottom: 10px;
				background-color: #fff;

				.order-info {
					padding: 10px 0;
					font-size: 14px;
					font-weight: 700;
				}

				.order-box {
					margin-bottom: 10px;
					padding: 10px 0;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					gap: 10px;
					.order-item {
						.pro-item {
							display: flex;
							align-items: center;

							.pro-item-img {
								width: 80px;
								height: 80px;
								margin-right: 10px;
								background-color: #ddd;
							}

							.pro-item-content {
								width: calc(100% - 110px);
								height: 80px;
								.zhname-box {
									display: flex;
									font-size: 14px;
									.zhname {
										max-width: 100px;
									}
									.rule {
										margin-left: 20px;
									}
								}

								.enname {
									font-size: 12px;
									color: #999;
									margin-top: 3px;
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

				.order-total {
					display: flex;
					font-size: 14px;
					align-items: center;
					padding: 20px 0 10px;
					border-top: 1px dashed #e8e8e8;
					position: relative;
					flex-wrap: wrap;

					.order-money {
						color: #e4393c;
						font-weight: 700;
						margin-left: auto;
					}

					.circle {
						position: absolute;
						top: -10px;
						width: 20px;
						height: 20px;
						background-color: #f5f5f5;
						border-radius: 50%;
					}

					.left-circle {
						left: -20px;
					}

					.right-circle {
						right: -20px;
					}
				}
			}
		}

		.buy-box {
			position: fixed;
			left: 0;
			bottom: 0;
			width: calc(100% - 20px);
			padding: 10px;
		}
	}
}
</style>