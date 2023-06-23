<template>
	<div id="order">
		<van-nav-bar fixed title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" color="red" />
		<div class="account-bg"></div>
		<div class="content-box">
			<van-tabs v-model="activeName" swipeable color='#0c34ba' line-height="2px" @change="tabOrder">
				<van-tab name="0">
					<template #title>
						全部
					</template>
					<template #default>
						<div class="tab-content">
							<div class="order-wrapper" v-if="order.length>0">
								<div class="order-prod" v-for="prod in order" :key="prod.oid">
									<div class="order-info">订单信息</div>
									<div class="order-no">
										<div class="no">订单编号：{{prod.oid}}</div>
										<div class="order-op">
											<div class="op-comfirm" v-if="prod.result[0].status == 1"
												@click="confirmReceive(prod.oid,activeName)">确认收货</div>
											<div class="op-remove" v-if="prod.result[0].status == 2">
												<div class="finish">已完成</div>
												<div class="remove" @click="removeOrder(prod.oid,activeName)">
													<van-icon name="delete-o" color="#666" />
												</div>
											</div>

										</div>
									</div>
									<div class="order-box">
										<div class="order-item" v-for="oitem in prod.result" :key="oitem.id">
											<div class="pro-item">
												<div class="pro-item-img">
													<img class="auto-img" :src="oitem.smallImg" :alt="oitem.name">
												</div>
												<div class="pro-item-content">
													<div class="zhname-box">
														<div class="zhname one-line-text">{{oitem.name}}</div>
														<div class="rule one-line-text">{{oitem.rule}}</div>
													</div>
													<div class="enname one-line-text">{{oitem.enname}}</div>
													<div class="price-count">
														<div class="price">￥{{oitem.price}}</div>
														<div class="count">x{{oitem.count}}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="order-total">
										<div class="order-date">{{prod.result[0].createdAt | formatDate}}</div>
										<div class="order-count">共计 {{prod.totalCount}} 件商品</div>
										<div class="order-money">订单金额：￥{{prod.totalPrice}}</div>
										<div class="left-circle circle"></div>
										<div class="right-circle circle"></div>
									</div>
								</div>
							</div>
							<van-empty description="没有订单数据" v-else />

						</div>
					</template>
				</van-tab>
				<van-tab name="1">
					<template #title>
						进行中
					</template>
					<template #default>
						<div class="tab-content">
							<div class="order-wrapper" v-if="order.length>0">
								<div class="order-prod" v-for="prod in order" :key="prod.oid">
									<div class="order-info">订单信息</div>
									<div class="order-no">
										<div class="no">订单编号：{{prod.oid}}</div>
										<div class="order-op">
											<div class="op-comfirm" v-if="prod.result[0].status == 1"
												@click="confirmReceive(prod.oid,activeName)">确认收货</div>
											<div class="op-remove" v-if="prod.result[0].status == 2">
												<div class="finish">已完成</div>
												<div class="remove" @click="removeOrder(prod.oid,activeName)">
													<van-icon name="delete-o" color="#666" />
												</div>
											</div>

										</div>
									</div>
									<div class="order-box">
										<div class="order-item" v-for="oitem in prod.result" :key="oitem.id">
											<div class="pro-item">
												<div class="pro-item-img">
													<img class="auto-img" :src="oitem.smallImg" :alt="oitem.name">
												</div>
												<div class="pro-item-content">
													<div class="zhname-box">
														<div class="zhname one-line-text">{{oitem.name}}</div>
														<div class="rule one-line-text">{{oitem.rule}}</div>
													</div>
													<div class="enname one-line-text">{{oitem.enname}}</div>
													<div class="price-count">
														<div class="price">￥{{oitem.price}}</div>
														<div class="count">x{{oitem.count}}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="order-total">
										<div class="order-date">{{prod.result[0].createdAt | formatDate}}</div>
										<div class="order-count">共计 {{prod.totalCount}} 件商品</div>
										<div class="order-money">订单金额：￥{{prod.totalPrice}}</div>
										<div class="left-circle circle"></div>
										<div class="right-circle circle"></div>
									</div>
								</div>
							</div>
							<van-empty description="没有订单数据" v-else />

						</div>
					</template>
				</van-tab>
				<van-tab name="2">
					<template #title>
						已完成
					</template>
					<template #default>
						<div class="tab-content">
							<div class="order-wrapper" v-if="order.length>0">
								<div class="order-prod" v-for="prod in order" :key="prod.oid">
									<div class="order-info">订单信息</div>
									<div class="order-no">
										<div class="no">订单编号：{{prod.oid}}</div>
										<div class="order-op">
											<div class="op-comfirm" v-if="prod.result[0].status == 1"
												@click="confirmReceive(prod.oid,activeName)">确认收货</div>
											<div class="op-remove" v-if="prod.result[0].status == 2">
												<div class="finish">已完成</div>
												<div class="remove" @click="removeOrder(prod.oid,activeName)">
													<van-icon name="delete-o" color="#666" />
												</div>
											</div>

										</div>
									</div>
									<div class="order-box">
										<div class="order-item" v-for="oitem in prod.result" :key="oitem.id">
											<div class="pro-item">
												<div class="pro-item-img">
													<img class="auto-img" :src="oitem.smallImg" :alt="oitem.name">
												</div>
												<div class="pro-item-content">
													<div class="zhname-box">
														<div class="zhname one-line-text">{{oitem.name}}</div>
														<div class="rule one-line-text">{{oitem.rule}}</div>
													</div>
													<div class="enname one-line-text">{{oitem.enname}}</div>
													<div class="price-count">
														<div class="price">￥{{oitem.price}}</div>
														<div class="count">x{{oitem.count}}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="order-total">
										<div class="order-date">{{prod.result[0].createdAt | formatDate}}</div>
										<div class="order-count">共计 {{prod.totalCount}} 件商品</div>
										<div class="order-money">订单金额：￥{{prod.totalPrice}}</div>
										<div class="left-circle circle"></div>
										<div class="right-circle circle"></div>
									</div>
								</div>
							</div>
							<van-empty description="没有订单数据" v-else />

						</div>
					</template>
				</van-tab>
			</van-tabs>
		</div>
	</div>

</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Order",
	data() {
		return {
			activeName: "0",
		};
	},
	mounted() {
		this.$store.dispatch("getOrder", { tokenString: this.token, status: 0 });
	},
	computed: {
		...mapState({
			order: (state) => state.order.order,
			token: (state) => state.user.token,
		}),
	},
	filters: {
		formatDate(v) {
			let time = new Date(v).toLocaleTimeString();
			let date = new Date(v).toLocaleDateString().replaceAll("/", "-");
			return date + " " + time;
		},
	},
	methods: {
		onClickLeft() {
			this.$router.back();
		},
		tabOrder(status) {
			this.$store.dispatch("getOrder", { tokenString: this.token, status });
		},
		confirmReceive(oid, status) {
			this.$dialog
				.confirm({
					title: "收货提示",
					message: "是否确认收货!",
					confirmButtonColor: "#0c34ba",
				})
				.then(() => {
					// on confirm
					this.$store
						.dispatch("toReceive", { tokenString: this.token, oid })
						.then((res) => {
							this.$toast(res.msg);
							this.$store.dispatch("getOrder", { tokenString: this.token, status });
						});
				})
				.catch(() => {
					// on cancel
				});
		},
		removeOrder(oid, status) {
			this.$dialog
				.confirm({
					title: "删除订单",
					message: "是否确定删除该订单!",
					confirmButtonColor: "#0c34ba",
				})
				.then(() => {
					// on confirm
					this.$store
						.dispatch("toRemoveOrder", { tokenString: this.token, oid })
						.then((res) => {
							this.$toast(res.msg);
							this.$store.dispatch("getOrder", {tokenString: this.token, status });
						});
				})
				.catch(() => {
					// on cancel
				});
		},
	},
};
</script>

<style lang ="less">
#order {
	padding-top: 46px;
	.van-cell__value {
		flex: 1;
	}
	.van-nav-bar__text {
		color: @theme-color;
	}
	.van-icon {
		color: @theme-color;
	}

	.account-bg {
		height: 120px;
		background-color: @theme-color;
	}

	.content-box {
		margin: -20px 10px 0;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

		overflow: hidden;

		.tab-content {
			margin-top: 10px;
		}

		.order-prod {
			padding: 10px;
			margin-bottom: 10px;
			background-color: #fff;

			.order-info {
				padding: 10px 0;
				font-size: 14px;
				font-weight: 700;
			}

			.order-no {
				display: flex;
				font-size: 14px;

				.no {
					color: #666;
					margin-right: auto;
				}
				.order-op {
					margin-bottom: 10px;
					.op-remove {
						display: flex;
						align-items: center;

						.finish {
							margin-right: 10px;
						}
					}
				}
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

				.order-date {
					width: 100%;
					margin-bottom: 10px;
				}

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
}
</style>