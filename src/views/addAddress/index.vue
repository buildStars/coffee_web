<template>
	<div id="addAddress">

		<van-nav-bar fixed title="新增地址" left-text="返回" left-arrow @click-left="onClickLeft" />

		<div class="form-box">
			<van-form>
				<van-address-edit :area-list="areaList" show-postal show-set-default :tel-validator="telValidate"
					:postal-validator="postValidate" :area-columns-placeholder="['选择县', '选择市', '选择区/县']" @save="onSave" />

			</van-form>
		</div>

	</div>

</template>

<script>
import { mapState } from "vuex";
import { areaList } from "@vant/area-data";
export default {
	name: "AddAddress",
	data() {
		return {
			username: "",
			phone: "",
			phonePattern:
				/^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/,
			addressDetail: "",
			postcode: "",
			postPattern: /^[0-9]\d{5}$/,
			showArea: false,
			areaList,
		};
	},
	mounted() {},
	computed: {
		...mapState({
			token: (state) => state.user.token,
		}),
	},
	methods: {
		onClickLeft() {
			this.$router.back();
		},
		onSave(v) {
			console.log(v);
			v.tokenString = this.token;
			if (v.postalCode == "") {
				this.$toast("邮政编码不正确");
			} else {
				v.isDefault = v.isDefault ? 1 : 0;
				this.$store.dispatch("addAddress", v).then((res) => {
					if (res.code == 9001) {
						//失败
						this.$toast(res.msg);
					} else {
						this.$toast(res.msg);
						this.$router.back();
					}
				});
			}
		},
		onConfirm(values) {
			console.log(values);
			if (values[2] == undefined || values[2].code == "") {
				return this.$toast("请选择地区");
			}
			this.value = values
				.filter((item) => !!item)
				.map((item) => item.name)
				.join("/");
			this.showArea = false;
		},
		telValidate(v) {
			if (this.phonePattern.test(v)) {
				return true;
			} else {
				console.log("false");
				return false;
			}
		},
		postValidate(v) {
			if (this.postPattern.test(v)) {
				return true;
			} else {
				console.log("false");
				return false;
			}
		},
	},
};
</script>

<style lang ="less">
#addAddress {
	padding-top: 46px;
	.van-nav-bar__text {
		color: @theme-color;
	}

	.van-button--danger {
		background-color: @theme-color;
		border-color: @theme-color;
	}
}
</style>