<template>
	<div>
		<van-tabbar v-model="active" active-color="#0c34ba" inactive-color="#646566">
			<van-tabbar-item v-for="item in icon" :key="item.id" :to="item.path">{{item.title}}
				<template #icon="props">
					<img :src="props.active  ? item.active : item.inactive" />
				</template>
			</van-tabbar-item>
			<!-- <van-tabbar-item icon="search" to="/menu">菜单</van-tabbar-item>
			<van-tabbar-item icon="friends-o" to="/shopbag">购物袋</van-tabbar-item>
			<van-tabbar-item icon="setting-o" to="/my">我d的</van-tabbar-item> -->
		</van-tabbar>
	</div>
</template>
<script>
export default {
	name: "MyTabbar",
	data() {
		return {
			active: 0,
			icon: [
				{
					id: 1,
					path: "/home",
					title: "首页",
					active: require("@/assets/images/home_active.png"),
					inactive: require("@/assets/images/home.png"),
				},
				{
					id: 2,
					path: "/menu",
					title: "菜单",
					active: require("@/assets/images/menu_active.png"),
					inactive: require("@/assets/images/menu.png"),
				},
				{
					id: 3,
					path: "/shopbag",
					title: "购物袋",
					active: require("@/assets/images/shopbag_active.png"),
					inactive: require("@/assets/images/shopbag.png"),
				},
				{
					id: 4,
					path: "/my",
					title: "我的",
					active: require("@/assets/images/my_active.png"),
					inactive: require("@/assets/images/my.png"),
				},
			],
		};
	},
	mounted() {

	},
	watch: {
		$route: {
			deep: true,
			immediate: true,
			handler(n, o) {
				switch (n.path) {
					case "/home": {
						this.active = 0;
						break;
					}
					case "/menu": {
						this.active = 1;
						break;
					}
					case "/shopbag": {
						this.active = 2;
						break;
					}
					case "/my": {
						this.active = 3;
						break;
					}
				}
			},
		},
	},
};
</script>
<style lang="less"></style>
