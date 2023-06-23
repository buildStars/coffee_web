<template>
	<div id="my">
		<div class="my-bg-box">
			<div class="my-bg" :style="`background-image:url(${myMsg[0]?.userBg ? myMsg[0]?.userBg:''})`">
				<div class="my-uploader-box">
					<van-uploader :after-read="afterRead" />
				</div>
			</div>
		</div>
		<div class="my-box">
			<div class="my-info">
				<div class="my-img">
					<img class="auto-img" :src="myMsg[0]?.userImg" :alt="myMsg[0]?.mickName">
				</div>
				<div class="user-info">
					<div class="user-name one-line-text">{{myMsg[0]?.nickName}}</div>
					<div class="user-desc one-line-text">{{myMsg[0]?.desc.length > 0 ? myMsg[0]?.desc: '这家伙很懒，什么也没有留下！'}}</div>
				</div>
			</div>

			<div class="cell-list">
				<van-cell title="个人资料" is-link to="/account" />
				<van-cell title="我的订单" is-link to="/order" />
				<van-cell title="我的收藏" is-link to="/like" />
				<van-cell title="地址管理" is-link to="/myaddress" />
				<van-cell title="安全中心" is-link to="secure" />
			</div>
		</div>

	</div>
</template>

<script>
import { mapState } from "vuex";
import { getType, getBase64 } from "@/utils/imageFile";
export default {
	name: "My",
	mounted() {
		this.$store.dispatch("findMy", this.token);
	
	},
	computed: {
		...mapState({
			myMsg: (state) => state.user.findMyMsg,
			token: (state) => state.user.token,
		}),
	},
	methods: {
		afterRead(file) {
			// 此时可以自行将文件上传至服务器;
			console.log(file);
			console.log(getType(file));
			this.$store
				.dispatch("updateUserBg", {
					tokenString: this.token,
					imgType: getType(file),
					serverBase64Img: getBase64(file),
				})
				.then((res) => {
					this.$toast(res.msg);
					this.$store.dispatch("findMy", this.token);
				});
		},
	},
};
</script>

<style lang="less">
#my {
	.my-bg-box {
		position: relative;
		.my-bg {
			// width: 375px;
			height: 140px;
			background-position: 50%;
			background-repeat: no-repeat;
			background-size: cover;
			background-color: #e8e8e8;
			position: relative;
			.my-uploader-box {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				opacity: 0;
				.van-uploader {
					width: 100%;
					height: 100%;

					.van-uploader__wrapper {
						width: 100%;
						height: 100%;

						.van-uploader__upload {
							width: 100%;
							height: 100%;
							margin: 0;
						}
					}
				}
			}
		}
	}
	.my-box {
		margin: 0 10px;
		padding: 10px;
		position: relative;
		top: -35px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-image: linear-gradient(
			180deg,
			hsla(0, 0%, 100%, 0.5) 0,
			hsla(0, 0%, 100%, 0.5) 35px,
			#fff 0
		);

		.my-img {
			width: 50px;
			height: 50px;
			background-color: #ddd;
			border-radius: 50%;
			box-shadow: 0 0 0 0.08rem rgb(0 0 0 / 30%);
			overflow: hidden;
		}
		.my-info {
			display: flex;
			align-items: center;

			.user-info {
				font-size: 14px;
				margin-left: 20px;

				.user-name {
					font-weight: 700;
					color: @theme-color;
				}

				.user-desc {
					color: #666;
					margin-top: 10px;
				}
			}
		}

		.cell-list {
			margin-top: 50px;
		}
	}
}
</style>