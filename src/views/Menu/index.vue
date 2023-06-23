<template>
	<div id="menu">
		<van-search v-model="value" placeholder="请输入搜索关键词" shape="round" @click="$router.push('/search')"/>
		<div class="menu-box">
			<div class="menu-left">
				<van-sidebar v-model="activeKey">
					<van-sidebar-item title="热卖推荐" @click="getHotProduct" />
					<van-sidebar-item v-for="item in type" :key="item.id" :title="item.typeDesc"
						@click="getTypeProduct(item.type)" />
				</van-sidebar>
			</div>
			<div class="menu-right">
				<div class="prod-box" v-show="isClickHot">
					<div class="prod-item" v-for="item in hotProduct" :key="item.id" @click="goDetail(item.pid)">
						<div class="prod">
							<div class="img-box">
								<img class="auto-img" :src="item.smallImg" alt="">
							</div>
							<div class="prod-name one-line-text">{{item.name}}</div>
							<div class="prod-enname one-line-text">{{item.enname}}</div>
							<div class="pro-info">
								<div class="prod-price">￥{{item.price}}</div>
							</div>
							<div class="badge-box">
								<van-tag color="#e4393c" text-color="white">热卖</van-tag>
							</div>
						</div>
					</div>

				</div>
				<div class="prod-box" v-show="!isClickHot">
					<div class="prod-item" v-for="item in typeProduct" :key="item.id" @click="goDetail(item.pid)">
						<div class="prod">
							<div class="img-box">
								<img class="auto-img" :src="item.smallImg" alt="">
							</div>
							<div class="prod-name one-line-text">{{item.name}}</div>
							<div class="prod-enname one-line-text">{{item.enname}}</div>
							<div class="pro-info">
								<div class="prod-price">￥{{item.price}}</div>
							</div>
							<div class="badge-box" v-show="item.isHot==1">
								<van-tag color="#e4393c" text-color="white">热卖</van-tag>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Menu",
	data() {
		return {
			value: "",
			activeKey: 0,

			isClickHot: true,
		};
	},
	mounted() {
		this.$store.dispatch("getType");
		this.getHotProduct();
	},
	computed: {
		...mapState({
			type: (state) => state.menu.type,
			hotProduct: (state) => state.menu.hotProduct,
			typeProduct: (state) => state.menu.typeProduct,
		}),
	},
	methods: {
		getHotProduct() {
			this.isClickHot = true;
			this.$store.dispatch("getHotProduct");
		},
		getTypeProduct(type) {
			this.isClickHot = false;
			this.$store.dispatch("getTypeProduct",{value:type} );
		},
		goDetail(pid) {
			this.$router.push({ name: "detail", query: { pid } });
		},
	},
};
</script>

<style lang="less">
#menu {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding-bottom: 48px;
	.menu-box {
		display: flex;
		height: calc(100% - 57px);

		.menu-left {
			width: 98px;
			height: 100%;
			overflow-y: auto;
			background-color: #f7f8fa;
			.van-sidebar {
				width: 100%;
			}
			.van-sidebar-item--select::before {
				width: 2px;
				height: 60%;
				background-color: @theme-color;
			}
		}

		.menu-right {
			width: calc(100% - 98px);
			height: 100%;
			background-color: #fff;
			overflow-y: auto;
			padding: 0 10px;

			.prod-box {
				display: flex;
				justify-content: space-between;

				flex-wrap: wrap;

				gap: 10px;
				.prod-item {
					width: calc(50% - 5px);
					.prod {
						position: relative;
						.prod-name {
							font-size: 16px;
							margin-top: 10px;
						}
						.prod-enname {
							color: #999;
						}

						.prod-price {
							color: #e4393c;
							font-weight: 700;
							font-size: 14px;
						}

						.badge-box {
							position: absolute;
							right: 0;
							top: 0;
						}
					}
				}
			}
		}
	}
}
</style>