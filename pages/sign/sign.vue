<template>
	<view class="aaa">

	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: null,
				currentRouter: null
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let currentRouter = options.currentRouter;
			console.log(currentRouter)
			this.currentRouter = '/pages/face/face'

			this.getSignUrl()
		},
		methods: {
			listenMessage(e) {
				this.$request('/user/get/sign/status', {
				id: uni.getStorageSync('curUser').id

				}).then(res => {
					if (res.code == 1) {
						uni.setStorageSync('curUser', res.obj)
						// Toast.success('协议签署成功');
						console.log('协议签署成功')
					}
				})
			},

			getSignUrl() {
				this.$request('/user/get/sign/url', {
					id: uni.getStorageSync('curUser').id,
					currentRouter: this.$data.currentRouter
				}).then(res => {
					console.log(res)
					if (res.code == 1) {

						if ((res.obj.signStatus & 2) == 2) {
							uni.setStorageSync('curUser', res.obj)
							uni.redirectTo({
								url: '/pages/face/face',
								success: function() {
									console.log("成功")
								},
								fail: function() {
									console.log("失败")
								}
							})
						} else {
							// console.log(123123)
							window.location.href = res.obj.wxUserEQBSignVO.url
							// this.url = res.obj.wxUserEQBSignVO.url

						}
					}
				})
			},
		}


	}
</script>

<style>
</style>
