<template>
	<div id="detail">
		<van-nav-bar fixed title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight"
			color="red" />
		<div class="detail-img">
			<img class="auto-img" v-lazy="detail[0]?.large_img || ``" alt="">
		</div>
		<div class="detail">
			<div class="detail-pro">
				<div class="detail-name-box">
					<div class="detail-name one-line-text">{{detail[0]?.name}}</div>
					<div class="detail-enname one-line-text">{{detail[0]?.enname}}</div>
				</div>
				<div class="detail-price">￥{{detail[0]?.price}}</div>
			</div>
			<div class="detail-configs">
				<div class="detail-configs-item" v-show="cream">
					<div class="configs-title">{{detail[0]?.cream_desc}}</div>
					<div class="configs">
						<div class="configs-item" v-for="conf in detail[0]?.cream.split('/')" :key="conf"
							:class="{active:cream == conf}" @click="cream=conf">
							{{conf}}
						</div>
					</div>
				</div>
				<div class="detail-configs-item" v-show="milk">
					<div class="configs-title">{{detail[0]?.milk_desc}}</div>
					<div class="configs">
						<div class="configs-item" v-for="conf in detail[0]?.milk.split('/')" :key="conf"
							:class="{active:milk == conf}" @click="milk=conf">
							{{conf}}
						</div>
					</div>
				</div>
				<div class="detail-configs-item" v-show="sugar">
					<div class="configs-title">{{detail[0]?.sugar_desc}}</div>
					<div class="configs">
						<div class="configs-item" v-for="conf in detail[0]?.sugar.split('/')" :key="conf"
							:class="{active:sugar == conf}" @click="sugar=conf">
							{{conf}}
						</div>
					</div>
				</div>
				<div class="detail-configs-item" v-show="tem">
					<div class="configs-title">{{detail[0]?.tem_desc}}</div>
					<div class="configs">
						<div class="configs-item" v-for="conf in detail[0]?.tem.split('/')" :key="conf"
							:class="{active:tem == conf}" @click="tem=conf">
							{{conf}}
						</div>
					</div>
				</div>
			</div>
			<div class="select-count-box">
				<div class="select-text">选择数量</div>
				<div class="select-count">
					<van-stepper v-model="num" theme="round" button-size="22" disable-input />
				</div>
			</div>
			<div class="detail-desc">
				<div class="detail-desc-title">商品描述</div>
				<div class="detail-desc-content">
					<div class="desc-item" v-for="(desc, i) in detaildesc" :key="i">
						{{i+1+'、'+desc}}
					</div>
				</div>
			</div>
		</div>
		<van-goods-action>
			<van-goods-action-icon icon="bag" :badge="shopcartCount >0 ?shopcartCount : ''" color="#646566" text="购物袋"
				@click="goShopBag" />
			<van-goods-action-icon icon="like" :color="findLike?.length > 0 ?'#e4393c':'#646566'" text="收藏"
				@click="toggleLike" />
			<van-goods-action-button type="info" color="#0c34ba" text="加入购物袋" @click="addShopBag" />
		</van-goods-action>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Detail",
	data() {
		return {
			num: 1,
			cream: "",
			milk: "",
			sugar: "",
			tem: "",
		};
	},
	mounted() {
		this.$store
			.dispatch("getDetail", { pid: this.$route.query.pid })
			.then((res) => {
				let rule = res.result[0];
				this.cream = rule.cream.split("/")[0];
				this.milk = rule.milk.split("/")[0];
				this.sugar = rule.sugar.split("/")[0];
				this.tem = rule.tem.split("/")[0];
			});
		if (this.tokenString != "") {
			this.$store.dispatch("shopcartCount", {
				tokenString: this.tokenString,
			});
			this.$store.dispatch("findLike", {
				pid: this.$route.query.pid,
				tokenString: this.tokenString,
			});
		}
	},
	computed: {
		...mapState({
			detail: (state) => state.detail.detail,
			tokenString: (state) => state.user.token,
			shopcartCount: (state) => state.shopbag.shopcartCount,
			findLike: (state) => state.like.findLike,
		}),
		detaildesc() {
			return this.detail[0]?.desc.split("\n");
		},
	},
	methods: {
		onClickLeft() {
			this.$router.back();
		},
		onClickRight() {},
		addShopBag() {
			let rule = [this.cream, this.milk, this.sugar, this.tem]
				.filter((i) => i !== "")
				.join("/");

			this.$store
				.dispatch("addShopcart", {
					pid: this.detail[0].pid,
					count: this.num,
					rule,
					tokenString: this.tokenString,
				})
				.then((res) => {
					if (res?.code == 3000) {
						this.$toast(res.msg);
						this.$store.dispatch("shopcartCount", {
							tokenString: this.tokenString,
						});
					}
				});
		},
		toggleLike() {
			if (this.tokenString == "") {
				this.$router.push("/login");
			} else {
				if (this.findLike.length < 1) {
					this.$store
						.dispatch("like", {
							pid: this.$route.query.pid,
							tokenString: this.tokenString,
						})
						.then((res) => {
							this.$toast(res.msg);
						});
				} else {
					this.$store
						.dispatch("notlike", {
							pid: this.$route.query.pid,
							tokenString: this.tokenString,
						})
						.then((res) => {
							this.$toast(res.msg);
						});
				}
			}
		},
		goShopBag() {
			this.$router.push("/shopbag");
		},
	},
};
</script>

<style lang="less">
#detail {
	font-size: 12px;
	padding: 46px 0 50px;
	.van-nav-bar__text {
		color: @theme-color;
	}
	.van-icon {
		color: @theme-color;
	}

	.detail {
		position: relative;
		top: -10px;
		padding: 10px;
		margin: 0 10px;
		background-color: #fff;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

		.detail-pro {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.detail-name {
				font-size: 14px;
			}
			.detail-enname {
				color: #999;
			}

			.detail-price {
				font-size: 16px;
				color: #e4393c;
				font-weight: 700;
			}
		}

		.detail-configs {
			margin-top: 20px;

			.detail-configs-item {
				display: flex;
				margin-bottom: 10px;

				.configs-title {
					width: 50px;
					height: 30px;
					line-height: 30px;
					font-size: 14px;
				}
				.configs {
					display: flex;
					align-items: center;

					.configs-item {
						width: 70px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						background-color: #e8e8e8;
						border-radius: 20px;
						margin-right: 10px;

						&.active {
							color: #fff;
							background-color: #3762f0;
						}
					}
				}
			}
		}

		.select-count-box {
			display: flex;
			align-items: center;
			margin-top: 20px;
			padding: 15px 0;
			border-top: 1px solid #f5f5f5;
			border-bottom: 1px solid #f5f5f5;
			.select-text {
				font-size: 14px;
			}

			.select-count {
				margin-left: auto;
			}
		}

		.detail-desc {
			margin-top: 20px;

			.detail-desc-title {
				font-size: 14px;
				margin-bottom: 10px;
			}
			.detail-desc-content {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				gap: 10px;
			}
		}
	}
}
</style>