<template>
	<view class="uploadingok">
		<view class="top-picture">
			<image class="image" src="/static/img/tin.png">
			</image>
		</view>
		<view class="text">
			<text>
				提交成功，等待企业审核！
			</text>
		</view>
		<view class="button">
			<button style="width:300rpx;background-color:#4388F2" @tap="get_back">知道了</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			get_back() {
				uni.redirectTo({
					url: '/pages/myapplication/myapplication'
				});
			}

		}
	};
</script>
<style>
	@import "./uploadingok.css";
</style>
