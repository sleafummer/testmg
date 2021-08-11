<template>
	<button @tap='buttona'>点击此按钮有弹窗</button>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			buttona() {
				uni.showToast({
					title: '提交成功',
					duration: 2000,
					
				})
			}
		}
	}
</script>

<style>
</style>
