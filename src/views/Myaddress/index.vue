<template>
	<div id="myaddress">
		<van-nav-bar fixed title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />

		<div class="content-box">
			<van-address-list v-model="chosenAddressId" :list="address" :switchable="false" default-tag-text="默认" @add="onAdd"
				@edit="onEdit">

			</van-address-list>
		</div>
	</div>

</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Myaddress",
	data() {
		return {
			chosenAddressId: "1",
			disabledList: [],
		};
	},
	mounted() {
		this.$store.dispatch("findAddress", { tokenString: this.token });
	},
	computed: {
		...mapState({
			accountInfo: (state) => state.user.accountInfo,
			token: (state) => state.user.token,
			address: (state) => state.myaddress.address,
		}),
	},
	methods: {
		onClickLeft() {
			this.$router.back();
		},
		onEdit(item, index) {
			this.$router.push({path:"/editAddress",query:{aid:item.aid}})
		},
		onAdd() {
			this.$router.push("/addAddress");
		},
	},
};
</script>

<style lang ="less">
#myaddress {
	padding-top: 46px;
	.van-cell__value {
		flex: 1;
	}
	.van-nav-bar__text {
		color: @theme-color;
	}

	.van-tag--danger {
		background-color: @theme-color;
	}
	.van-button--danger {
		background-color: @theme-color;
		border-color: @theme-color;
	}
	.content-box {
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

		overflow: hidden;
	}
}
</style>