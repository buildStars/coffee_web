<template>
	<div id="account">
		<van-nav-bar fixed title="个人资料" left-text="返回" left-arrow @click-left="onClickLeft" color="red" />
		<div class="account-bg"></div>
		<div class="list-box">
			<van-cell title="头像" value="">
				<template #default>
					<div class="img-box">
						<img class="auto-img" :src="accountInfo[0]?.userImg" alt="">
						<van-uploader :after-read="afterRead" />
					</div>
				</template>
			</van-cell>
			<van-cell title="用户ID" :value="accountInfo[0]?.userId" />
			<van-cell title="手机号" :value="accountInfo[0]?.phone" />
			<van-cell title="昵称">
				<template #default>
					<div class="nikename">
						<form>
							<input type="text" v-model="accountInfo[0] && accountInfo[0].nickName" @blur="updateNickName()">
						</form>
					</div>
				</template>
			</van-cell>
			<div class="desc-box">
				<div class="desc-title">简介</div>
				<div class="desc-area">
					<textarea class="text-area" placeholder="这家伙很懒，什么都没有留下"
						v-model="accountInfo[0] && accountInfo[0].desc" @blur="updateDesc"></textarea>
				</div>
			</div>

		</div>
	</div>

</template>

<script>
import { getType, getBase64 } from "@/utils/imageFile";
import { mapState } from "vuex";
export default {
	name: "Account",
	mounted() {
		if (this.tokenString != "") {
			this.$store.dispatch("findAccountInfo", {
				tokenString: this.tokenString,
			});
		}
	},
	computed: {
		...mapState({
			accountInfo: (state) => state.user.accountInfo,
			tokenString: (state) => state.user.token,
		}),
	},
	methods: {
		onClickLeft() {
			this.$router.back();
		},
		afterRead(file) {
			// 此时可以自行将文件上传至服务器;
			this.$store
				.dispatch("updateAvatar", {
					tokenString: this.tokenString,
					imgType: getType(file),
					serverBase64Img: getBase64(file),
				})
				.then((res) => {
					this.$toast(res.msg);
					this.$store.dispatch("findAccountInfo", {
						tokenString: this.tokenString,
					});
				});
		},

		updateNickName() {
			console.log(this.accountInfo[0].nickName);
			this.$store
				.dispatch("updateNickName", {
					tokenString: this.tokenString,
					nickName: this.accountInfo[0].nickName,
				})
				.then((res) => {
					this.$toast(res.msg);
					this.$store.dispatch("findAccountInfo", {
						tokenString: this.tokenString,
					});
				});
		},

		updateDesc() {
			this.$store
				.dispatch("updateDesc", {
					tokenString: this.tokenString,
					desc: this.accountInfo[0].desc,
				})
				.then((res) => {
					this.$toast(res.msg);
					this.$store.dispatch("findAccountInfo", {
						tokenString: this.tokenString,
					});
				});
		},
	},
};
</script>

<style lang ="less">
#account {
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
		height: 100px;
		background-color: @theme-color;
	}

	.list-box {
		margin: -30px 10px 0;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-color: #fff;
		overflow: hidden;
		padding: 10px;
		.van-cell {
			padding: 0;
			padding-bottom: 10px;
			line-height: 40px;
		}

		.img-box {
			width: 40px;
			height: 40px;
			background-color: #f5f5f5;
			position: relative;
			overflow: hidden;
			border-radius: 50%;
			margin-left: auto;

			.van-uploader {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}

		.nikename {
			input {
				text-align: right;
				display: block;
				width: 100%;
				padding: 0;
				border: none;
				outline: none;
				color: #969799;
				font-size: 14px;
			}
		}
		.desc-title {
			font-size: 14px;
			line-height: 40px;
		}
		.text-area {
			display: block;
			width: 100%;
			padding: 0;
			border: none;
			outline: none;
			color: #969799;
			font-size: 14px;
			resize: none;
		}
	}
}
</style>