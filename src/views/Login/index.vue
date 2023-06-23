<template>
	<div id="login">
		<van-nav-bar @click-right="onClickRight">
			<template #left>
				<div class="left-box">
					<div class="logo">
						<img src="@/assets/images/home_active.png" alt="">
					</div>
					<div class="logo-text">Luckin Coffee</div>
				</div>
			</template>
			<template #right>
				<span class="home-text">首页</span>
			</template>
		</van-nav-bar>
		<div class="login-box">
			<div class="welcome-title">欢迎回来！</div>
			<div class="welcome-subtitle">Please login to your accounts</div>
			<div class="form-box">
				<van-form @submit="login" :show-error="false">
					<van-field v-model="phone1" name="手机号" label="手机号" placeholder="手机号" autocomplete="off"
						:rules="[{ required: true, message: '手机号必填' },{ message: '手机号格式不对' ,pattern:phonePattern}]" />
					<van-field v-model="password1" :type="pwdIcon?'text':'password'" name="密码" label="密码" placeholder="密码(6-16位)"
						autocomplete="off" :right-icon="pwdIcon?'eye-o':'closed-eye'" @click-right-icon="pwdToggle"
						:rules="[{ required: true, message: '密码必填' },{ message: '密码支持数字字母下划线组合，且必须以字母开头，6-16位' ,pattern:pwdPattern}]" />
					<div class="forget">
						<div class="forget-pwd" @click="goForget">忘记密码？</div>
					</div>
					<div class="login-btn">
						<van-button round block native-type="submit" color="#0c34ba">登录</van-button>
					</div>
					<div class="register-btn">

						<van-button round block native-type="button" @click="overlayShow = true">注册</van-button>
						<van-overlay :show="overlayShow" @click="overlayShow = false" class-name="overlay">
						</van-overlay>
						<van-popup v-model="overlayShow" position="bottom">
							<div class="register-box">

								<div class="register-title">注册<i class="close-icon">
										<van-icon name="cross" size="22px" color="#c8c9cc" @click="overlayShow =false" />
									</i></div>
								<van-form @submit="register" :show-error="false">
									<van-field v-model="phone" name="手机号" label="手机号" placeholder="手机号" autocomplete="off"
										:rules="[{ required: true, message: '手机号必填' },{ message: '手机号格式不对' ,pattern:phonePattern}]" />
									<van-field v-model="password" :type="pwdIcon?'text':'password'" name="密码" label="密码"
										placeholder="密码(6-16位)" autocomplete="off" :right-icon="pwdIcon?'eye-o':'closed-eye'"
										@click-right-icon="pwdToggle"
										:rules="[{ required: true, message: '密码必填' },{ message: '密码支持数字字母下划线组合，且必须以字母开头，6-16位' ,pattern:pwdPattern}]" />

									<van-field v-model="username" type="text" name="昵称" label="昵称" placeholder="昵称(1-10位)"
										autocomplete="off"
										:rules="[{ required: true, message: '昵称必填' },{ message: '昵称支持中英文数字组合，1-10位' ,pattern:namePattern}]" />
									<div class="register-btn">
										<van-button round block native-type="submit" color="#0c34ba">注册</van-button>
									</div>
								</van-form>
							</div>
						</van-popup>
					</div>
				</van-form>
			</div>
		</div>

	</div>
</template>
<script>
import { mapState } from "vuex";
export default {
	name: "Login",
	data() {
		return {
			//1 登录属性
			phone1: "",
			password1: "",
			phone: "",
			username: "",
			password: "",
			pwdIcon: false,
			overlayShow: false,
			phonePattern:
				/^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/,
			pwdPattern: /^[a-zA-Z]\w{5,15}$/,
			namePattern: /[\u4e00-\u9fa5a-zA-Z0-9]{1,10}/,
		};
	},
	computed: {
		...mapState({
			regMsg: (state) => state.login.regMsg,
			userLogin: (state) => state.user.userLogin,
		}),
	},
	methods: {
		login() {
			this.$store
				.dispatch("goLogin", {
					phone: this.phone1,
					password: this.password1,
				})
				.then((res) => {
					if (res.code == 200) {
						this.$toast(res.msg);
						this.$router.push("/home");
					}
					this.$toast(res.msg);
				});
		},

		register(v) {
			this.$store
				.dispatch("goRegister", {
					phone: this.phone,
					nickName: this.username,
					password: this.password,
				})
				.then((res) => {
					if (res.code == 102) {
						this.$toast(res.msg);
					} else if (res.code == 100) {
						this.$toast(res.msg);
						this.overlayShow = false;
						this.phone = "";
						this.username = "";
						this.password = "";
					}
				});
		},
		onClickLeft() {},
		onClickRight() {
			this.$router.push("/home");
		},
		pwdToggle() {
			this.pwdIcon = !this.pwdIcon;
		},
		goForget() {
			this.$router.push("/forget");
		},
	},
};
</script>

<style lang="less" scoped>
#login {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	overflow: auto;
	background-color: white;
	.home-text {
		color: #0c34ba;
		font-size: 14px;
		font-weight: 700;
	}
	.left-box {
		display: flex;
		align-items: center;

		.logo {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			overflow: hidden;
			img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		.logo-text {
			margin-left: 10px;
			font-weight: 700;
			font-size: 14px;
		}
	}
	.login-box {
		padding: 10px;
		margin-top: 80px;

		.welcome-title {
			font-size: 30px;
		}
		.welcome-subtitle {
			font-size: 18px;
			color: #999;
			margin-top: 20px;
		}

		.form-box {
			margin-top: 50px;

			.forget {
				display: flex;
				margin-top: 20px;
				justify-content: flex-end;
				font-size: 14px;
			}

			.login-btn {
				margin-top: 50px;
			}
			.register-btn {
				margin-top: 20px;
			}
		}
		.overlay {
			background-color: rgba(0, 0, 0, 0.1);
		}
		.register-box {
			padding: 10px;
			font-size: 14px;

			.register-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24px;
				margin-bottom: 20px;
			}

			.register-btn {
				margin-top: 50px;
			}
		}
	}
}
</style>