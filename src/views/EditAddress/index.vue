<template>
	<div id="editAddress">

		<van-nav-bar fixed title="编辑地址" left-text="返回" left-arrow @click-left="onClickLeft" />

		<div class="form-box">
			<van-form>
				<van-address-edit :area-list="areaList" show-postal show-set-default :tel-validator="telValidate" show-delete
					:postal-validator="postValidate" :area-columns-placeholder="['选择县', '选择市', '选择区/县']" :address-info="address"
					@save="onSave" @delete="deleteAddress" />

			</van-form>
		</div>

	</div>

</template>

<script>
import { mapState } from "vuex";
import { areaList } from "@vant/area-data";
export default {
	name: "EddAddress",
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
			address: {},
		};
	},
	mounted() {
		this.$store
			.dispatch("findAddressByAid", {
				tokenString: this.token,
				aid: this.$route.query.aid,
			})
			.then((res) => {
				if (res.code == 40000) {
					this.address = res.result[0];
					if (this.address.isDefault == 1) {
						this.address.isDefault = true;
					} else {
						this.address.isDefault = false;
					}
				}
			});
	},
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
			v.tokenString = this.token;
			if (v.postalCode == "") {
				this.$toast("邮政编码不正确");
			} else {
				v.isDefault = v.isDefault ? 1 : 0;
				console.log(v);
				this.$store.dispatch("editAddress", v).then((res) => {
					if (res.code == 30000) {
					
						this.$toast(res.msg);
						this.$router.back();
					} else {
						this.$toast(res.msg);
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

		deleteAddress(v) {
			v.tokenString = this.token;
			console.log(v);
			this.$store.dispatch("deleteAddress", v).then((res) => {
				this.$toast(res.msg);
				this.$router.back();
			});
		},
	},
};
</script>

<style lang ="less">
#editAddress {
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