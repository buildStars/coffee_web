<template>
	<div id="app">

		<router-view />
		<MyTabbar v-show="this.$route.meta.tabbarShow" />
	</div>
</template>
<script>

export default {
	created() {
		this.$store.commit("GETTOKEN");

	},
};
</script>

<style lang="less">
#app {
	max-width: 640px;
	margin: 0 auto;
}

.auto-img {
	display: block;
	width: 100%;
}
.one-line-text {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
