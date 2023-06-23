<template>
	<div id="like">
		<van-nav-bar fixed title="我的收藏" left-text="返回" left-arrow @click-left="onClickLeft" color="red" />
		<div class="account-bg"></div>
		<div class="content-box">
			<div class="prod-box">

				<div class="prod-item" v-for="prod in allLike" :key="prod.id" @click="goDetail(prod.pid)">
					<div class="img-box">
						<img class="auto-img" :src="prod.smallImg" :alt="prod.name">
						<div class="badge-box" v-show="prod.isHot==1">
							<van-tag color="#e4393c" text-color="white">热卖</van-tag>
						</div>
					</div>
					<div class="prod-name one-line-text">{{prod.name}}</div>
					<div class="pro-enname one-line-text">{{prod.enname}}</div>
					<div class="prod-info">
						<div class="prod-price">￥{{prod.price}}</div>
						<div class="prod-remove" @click.stop="removeLike(prod.pid)">
							<van-icon name="delete-o" color="#999" />
						</div>
					</div>
				</div>

			</div>
			<van-empty description="没有收藏数据！" v-show="allLike.length == 0" />
		</div>
	</div>

</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Like",
	mounted() {
		this.$store.dispatch("findAllLike", {tokenString:this.token});
	},
	computed: {
		...mapState({
			accountInfo: (state) => state.user.accountInfo,
			token: (state) => state.user.token,
			allLike: (state) => state.like.allLike,
		}),
	},
	methods: {
		onClickLeft() {
			this.$router.back();
		},
		removeLike(pid) {
			this.$store
				.dispatch("removeLike", { tokenString: this.token, pid })
				.then((res) => {
					this.$toast(res);
					this.$store.dispatch("findAllLike", {tokenString:this.token});
				});
		},
		goDetail(pid) {
			this.$router.push({ name: "detail", query: { pid } });
		},
	},
};
</script>

<style lang ="less">
#like {
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
		margin: 0 10px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		position: relative;
		overflow: hidden;
		top: -20px;

		.prod-box {
			display: flex;
			background-color: #fff;
			padding: 10px;
			flex-wrap: wrap;
			gap: 10px;

			.prod-item {
				width: calc(50% - 5px);
			}
			.img-box {
				position: relative;

				.badge-box {
					position: absolute;
					right: 0;
					top: 0;
				}
			}
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

				.prod-remove {
					width: 20px;
					height: 20px;
					font-size: 20px;
					color: #999;
				}
			}
		}
	}
}
</style>