<template>
	<div id="home">
		<van-nav-bar fixed>
			<template #left>
				<div class="left-box van-ellipsis">
					<div class="hello-text">
						{{timeHello}}
					</div>
					<div class="name-text van-ellipsis" @click="goLogin" v-if="accountInfo.length==0">登录 </div>
					<div class="name-text van-ellipsis nick-name" v-else>{{accountInfo[0].nickName}}</div>

				</div>
			</template>
			<template #right>
				<van-search shape="round" v-model="value" placeholder="请输入搜索关键词" @focus="goSearch" />
			</template>
		</van-nav-bar>
		<div class="banner-swiper">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="item in banner" :key="item.pid" @click="goDetail(item.pid)">
					<div class="">
						<img class="auto-img" :src="item.bannerImg" />
					</div>
				</van-swipe-item>

			</van-swipe>
		</div>

		<div class="hot-prod">
			<div class="hot-prod-item" v-for="item in hotProduct" :key="item.id" @click="goDetail(item.pid)">
				<div class="prod">
					<div class="img-box">
						<img class="auto-img" :src="item.smallImg" alt="" >
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
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Home",
	data() {
		return {
			value: "",
		};
	},
	mounted() {
		this.$store.dispatch("getBanner");
		this.$store.dispatch("getHotProduct");
		if (this.tokenString != "") {
			this.$store.dispatch("findAccountInfo", {
				tokenString: this.tokenString,
			});
		}
	},
	computed: {
		...mapState({
			banner: (state) => state.home.banner,
			hotProduct: (state) => state.home.hotProduct,
			accountInfo: (state) => state.user.accountInfo,
			tokenString: (state) => state.user.token,
		}),
		timeHello() {
			let timeHour = +new Date().toLocaleTimeString().slice(0, 2);
			if (timeHour >= 5 && timeHour < 12) {
				return "上午好";
			} else if (timeHour >= 12 && timeHour < 14) {
				return "中午好";
			} else if (timeHour >= 14 && timeHour < 18) {
				return "下午好";
			} else {
				return "晚上好";
			}
		},
	},
	methods: {
		goLogin() {
			this.$router.push("/login");
		},
		goSearch() {
			this.$router.push("search");
		},
		goDetail(pid) {
			this.$router.push({ name: "detail", query: { pid } });
		},
	},
};
</script>

<style lang='less'>
#home {
	width: 100%;
	padding-top: 46px;
	padding-bottom: 50px;
	.nick-name {
		color: @theme-color;
	}
	.left-box {
		display: flex;
		justify-content: space-between;
		max-width: 100px;
		.hello-text {
			margin-right: 10px;
		}
		.name-text {
			font-weight: 700;
		}
	}
	.van-nav-bar_content {
		width: 100%;
	}
	.van-search {
		width: 100%;
		padding: 0 10px;
	}
	.van-nav-bar__right {
		width: calc(100% - 120px);
		padding: 0;
	}

	// .my-swipe {
	// }
	.hot-prod {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		flex-wrap: wrap;
		padding: 10px;
		background-color: #fff;
		gap: 10px;
		.hot-prod-item {
			width: calc(50% - 5px);
			.img-box{
				width: 100%;
				height: 173px;
				background-color: rgb(212, 208, 208);
			}

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
</style>