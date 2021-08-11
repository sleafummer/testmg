<template>
	<view class="">

	</view>
</template>

<script>
	export default {
		data() {
			return {
				authUrl: null,
				currentRouter: null
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let currentRouter = options.currentRouter;
			this.currentRouter = currentRouter

			this.getAuthUrl();
		},



		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			console.log("face  onReady")
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			console.log("face  onshow")
		},

		methods: {
			
			getAuthUrl() {
				let nowHref=location.href.split('accessToken=')[1].split('&')[0];
				let backPath=location.href.split('redirectUrl=')[1]
				let accountId=location.href.split('accountId=')[1].split('&')[0];
				let outOrderNo=location.href.split('outOrderNo=')[1].split('&')[0];
				console.log(outOrderNo)
				this.$outrequest("/identity/veri/face/url", {
						"redirectUrl":backPath,
						"accountId":accountId,
						"outOrderNo":outOrderNo
					},
					'POST', {
						accessToken: nowHref
					}).then(res => {
					if (res.code == 1) {
						if (res.obj.faceAuthStatus == 1) {
							uni.setStorageSync('curUser', res.obj);
							uni.navigateBack({
								delta: 1,
							})
						} else {
							// this.authUrl = res.obj.userFaceUrlVO.originalUrl
							window.location.href = res.obj.originalUrl;

						}
					}
				})
			},

			listenMessage(e) {
				let type = e.detail.data[0].type
				this.$request('/user/face/status', {

					id: uni.getStorageSync('curUser').id

				}).then(res => {
					if (res.code == 1) {
						uni.setStorageSync('curUser', res.obj)
						// Toast.success('人脸识别成功');
						console.log(人脸识别成功)
					}
				})
			},
		}
	}
</script>

<style>
</style>
