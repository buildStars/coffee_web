<template>
	<div id="search">
		<van-nav-bar fixed left-arrow left-text="返回" @click-left="onClickLeft">
			<template #right>
				<van-search shape="round" v-model="value" placeholder="输入商品关键字" @input="search" clearable show-action />

			</template>
		</van-nav-bar>
		<div class="search-history">
			<div class="history-box">
					<div class="history-item" v-for="(item,index) in history" :key="item" @click="rmHistory(index)">{{item}}
						<van-icon name="cross" />
					</div>
			</div>
			<div class="search-btn" @click="clearHistory">清除所有搜索历史</div>
		</div>
		<div class="pro-box">
			<div class="pro-item" v-for="item in list" :key="item.id"
				@click="$router.push({path:'/detail',query:{pid:item.pid} })">
				<div class="product">
					<div class="img-box">
						<img class="auto-img" :src="item.smallImg" alt="item.name">
					</div>
					<div class="prod-name one-line-text">{{item.name}}</div>
					<div class="prod-enname one-line-text">{{item.enname}}</div>
					<div class="prod-info">
						<div class="prod-price">{{item.price}}</div>
					</div>
					<div class="badge-box" v-show="item.isHot">
						<van-tag type="danger">热卖</van-tag>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { getLocal, setLocal, removeLocal } from "@/utils/LocalStorage";
export default {
	name: "Search",
	data() {
		return {
			value: "",
			list: [],
			history: [],
		};
	},
	mounted() {
		this.history = getLocal("mycoffee-search-history") || [];
	},
	methods: {
        onClickLeft(){
            this.$router.back()
        },
		search() {
			if (this.value.trim() != "")
				this.$store
					.dispatch("search", {
						tokenString: this.tokenString,
						name: this.value,
					})
					.then((res) => {
						if (res.code == "Q001") {
							this.list = res.result;
						}
						if (
							this.list.length > 0 &&
							this.history.indexOf(this.value) == -1
						) {
							this.history.push(this.value);
							setLocal("mycoffee-search-history", this.history);
						}
					});
		},
		rmHistory(index) {
			this.history.splice(index, 1);
			setLocal("mycoffee-search-history", this.history);
		},
		clearHistory() {
			this.history = [];
			setLocal("mycoffee-search-history", this.history);
		},
	},
	computed: {
		...mapState({
			tokenString: (state) => state.user.token,
		}),
	},
};
</script>

<style lang="less">
#search {
	padding-top: 46px;
	.van-nav-bar__right {
		display: flex;
		align-items: center;
		padding: 0;
		width: calc(100% - 80px);

		.van-search {
			width: 100%;
			padding: 0;
		}
	}

	.search-history {
		padding-bottom: 10px;
		background-color: #fff;

		.history-box {
			padding: 10px 10px 0 0;

			&::after {
				display: block;
				content: "";
				clear: both;
			}

			.history-item {
				float: left;
				margin-left: 10px;
				margin-bottom: 10px;
				background-color: #e8e8e8;
				padding: 2px 5px;
			}
		}

		.search-btn {
			height: 26px;
			background-color: #e8e8e8;
			width: 160px;
			text-align: center;
			line-height: 26px;
			margin: 10px auto;
			color: #666;
			border-radius: 18px;
			font-size: 14px;
		}
	}

	.pro-box {
		margin-top: 20px;
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		padding: 10px;

		.pro-item {
			width: calc(50% - 30px);
			background-color: #fff;
			padding: 0.26667rem;

			.product {
				position: relative;

				.prod-name {
					margin-top: 10px;
					font-size: 16px;
				}

				.prod-enname {
					color: #999;
					font-size: 12px;
				}

				.prod-info {
					margin-top: 5px;
					display: flex;
					align-items: center;

					.prod-price {
						color: #e4393c;
						font-weight: 700;
						font-size: 14px;
						margin-right: auto;
					}
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