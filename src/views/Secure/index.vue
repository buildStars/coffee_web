<template>
	<div id="secure">
		<van-nav-bar fixed title="安全中心" left-text="返回" left-arrow @click-left="onClickLeft" color="red" />
		<div class="account-bg"></div>
		<div class="content-box">
			<van-cell title="修改密码" is-link @click="overlayShow=true" />
			<van-popup v-model="overlayShow" position="bottom">
				<div class="register-box">
					<div class="register-title">修改密码<i class="close-icon">
							<van-icon name="cross" size="22px" color="#c8c9cc" @click="overlayShow =false" />
						</i></div>
					<van-form @submit="updatePwd" :show-error="false">
						<van-field v-model="opassword" :type="opwdIcon?'text':'password'" name="旧密码" label="旧密码" placeholder="输入密码"
							autocomplete="off" :right-icon="opwdIcon?'eye-o':'closed-eye'" @click-right-icon="opwdIcon=!opwdIcon"
							:rules="[{ required: true, message: '密码必填' },{ message: '密码支持数字字母下划线组合，且必须以字母开头，6-16位' ,pattern:pwdPattern}]" />
						<van-field v-model="npassword" :type="npwdIcon?'text':'password'" name="新密码" label="新密码" placeholder="输入密码"
							autocomplete="off" :right-icon="npwdIcon?'eye-o':'closed-eye'" @click-right-icon="npwdIcon=!npwdIcon"
							:rules="[{ required: true, message: '密码必填' },{ message: '密码支持数字字母下划线组合，且必须以字母开头，6-16位' ,pattern:pwdPattern}]" />

						<div class="register-btn">
							<van-button round block native-type="submit" color="#0c34ba">确认修改</van-button>
						</div>
					</van-form>
				</div>
			</van-popup>
			<van-cell title="注销账号" is-link @click="destroy" />
		</div>
		<div class="btn-box">
			<van-button color="#0c34ba" round block @click="logout">退出登录</van-button>
		</div>
	</div>

</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Secure",
	data() {
		return {
			opwdIcon: false,
			npwdIcon: false,
			npassword: "",
			opassword: "",
			overlayShow: false,
			pwdPattern: /^[a-zA-Z]\w{5,15}$/,
		};
	},
	computed: {
		...mapState({
			accountInfo: (state) => state.user.accountInfo,
			token: (state) => state.user.token,
		}),
	},
	methods: {
		onClickLeft() {
			this.$router.back();
		},
		updatePwd() {
			this.$store
				.dispatch("updatePwd", {
					tokenString: this.token,
					oldPassword: this.opassword,
					password: this.npassword,
				})
				.then((res) => {
					if (res.code == "E003") {
						this.$toast(res.msg);
					} else if (res.code == "E001") {
						this.$toast(res.msg);
						this.$store.commit("CLEARACCOUNTINFO");
						this.$router.push("/login");
					}
				});
		},

		logout() {
			this.$dialog
				.confirm({
					title: "退出登录",
					message: "是否确认退出登录！",
					confirmButtonColor: "#0c34ba",
				})
				.then(() => {
					this.$store
						.dispatch("goLogout", { tokenString: this.token })
						.then((res) => {
							this.$toast(res.msg);
							this.$router.push("/login");
						});
					// this.$store.commit("CLEARACCOUNTINFO");
				})
				.catch(() => {
					// on cancel
				});
		},

		destroy() {
			this.$dialog
				.confirm({
					title: "注销账号",
					message: "是否确认注销账号，一旦确认无法恢复！",
					confirmButtonColor: "#0c34ba",
				})
				.then(() => {
					this.$store
						.dispatch("destroyAccount", { tokenString: this.token })
						.then((res) => {
							this.$toast(res.msg);

							this.$router.push("/login");
						});
					// this.$store.commit("CLEARACCOUNTINFO");
				})
				.catch(() => {
					// on cancel
				});
		},
	},
};
</script>

<style lang ="less">
#secure {
	padding-top: 46px;
	.van-cell__value {
		flex: 1;
	}
	.van-nav-bar__text {
		color: @theme-color;
	}

	.account-bg {
		height: 100px;
		background-color: @theme-color;
	}

	.content-box {
		margin: -30px 10px 0;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-color: #fff;
		overflow: hidden;
		padding: 10px;

		.register-box {
			padding: 20px;
			font-size: 14px;

			.register-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 18px;
				margin-bottom: 30px;
			}

			.register-btn {
				margin-top: 40px;
			}
		}
	}

	.btn-box {
		margin-top: 100px;
		padding: 10px;
	}
}
</style>