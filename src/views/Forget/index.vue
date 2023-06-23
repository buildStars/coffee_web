<template>
	<div id="forget">
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
		<div class="forget-box">
			<div class="welcome-title">忘记密码！</div>
			<div class="welcome-subtitle">forgot password!</div>
			<div class="form-box">
				<van-form @submit="onSubmit" :show-error="false">
					<van-field v-model="phone" name="手机号" label="手机号" placeholder="手机号" autocomplete="off"
						:rules="[{ required: true, message: '手机号必填' },{ message: '手机号格式不对' ,pattern:phonePattern}]" />
					<van-field v-model="newpassword" :type="pwdIcon?'text':'password'" name="新密码" label="新密码"
						placeholder="密码(6-16位)" autocomplete="off" :right-icon="pwdIcon?'eye-o':'closed-eye'"
						@click-right-icon="pwdToggle"
						:rules="[{ required: true, message: '密码必填' },{ message: '密码支持数字字母下划线组合，且必须以字母开头，6-16位' ,pattern:pwdPattern}]" />
					<van-field v-model="email" name="邮箱" label="邮箱" placeholder="邮箱" autocomplete="off"
						:rules="[{ required: true, message: '邮箱必填'},{ message: '邮箱格式不对' ,pattern:emailPattern}]" />
					<van-field v-model="emailCode" name="邮箱验证码" label="邮箱验证码" center placeholder="邮箱验证码(6位数字)" autocomplete="off"
						:rules="[{ required: true, message: '邮箱验证码必填' }]">
						<template #button>
							<van-button size="small" native-type="button" color="#0c34ba" @click="sendCode()">发送验证码
							</van-button>
						</template>
					</van-field>

					<div class="forget">
						<div class="forget-pwd" @click="goLogin">已有账号，立即登录</div>
					</div>
					<div class="submit-btn">
						<van-button round block native-type="submit" color="#0c34ba">提交</van-button>
					</div>

				</van-form>
			</div>
		</div>

	</div>
</template>
<script>
export default {
	name: "Forget",
	data() {
		return {
			email: "",
			emailCode: "",
			phone: "",
			username: "",
			newpassword: "",
			pwdIcon: false,
			phonePattern:
				/^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/,
			pwdPattern: /^[a-zA-Z]\w{5,15}$/,
			emailPattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		};
	},
	methods: {
		onSubmit(values) {
			console.log("submit", values);
			this.$store
				.dispatch("checkValidCode", { validCode: this.emailCode })
				.then((res) => {
					if (res.code == "K001") {
						this.$store
							.dispatch("retrievePassword", {
								phone: this.phone,
								password: this.newpassword,
							})
							.then((res) => {
								console.log(res);
								if (res.code == "L001") {
									this.$toast(res.msg);
									this.$router.push("/login");
								} else if (res.code == "L003") {
									this.$toast(res.msg);
								} else {
									this.$toast(res.msg);
								}
							});
					} else {
						this.$toast(res.msg);
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
		goLogin() {
			this.$router.push("/login");
		},
		emailValidate() {
			if (!this.emailPattern.test(this.email)) {
			}
		},
		sendCode() {
			if (this.emailPattern.test(this.email)) {
				console.log(66);
				this.$store
					.dispatch("emailValidCode", { email: this.email })
					.then((res) => {
						if (res.code == "J001") {
							this.$toast(res.msg);
						}
					});
			} else {
				this.$toast("邮箱格式不正确");
			}
		},
	},
};
</script>

<style lang="less" scoped>
#forget {
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
	.forget-box {
		padding: 0 10px;
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
			margin-top: 25px;
			padding: 15px;
			.forget {
				display: flex;
				margin-top: 20px;
				justify-content: flex-end;
				font-size: 12px;
			}
			.van-cell {
				padding-left: 0;
				padding-right: 0;
			}
			.submit-btn {
				margin-top: 40px;
			}
		}
	}
}
</style>