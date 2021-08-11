<template>
	<view class="box">
		<view class="scan-img">
		
			<image @tap="upload_picture" class="scan" :src="bankCardImg"></image>
			<text class="wenzi">点击上传银行卡正面照片</text>
		</view>
		<view class="neiron">
			<text class="kahao"> 卡号</text>
			<input type="text" @input="alter_number" class="kahao1" placeholder="拍照上传系统自动识别" :value="bankCard"></input>
		</view>
		<button style="width:600rpx" class="anniu" @tap="next">完成</button>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" title="银行卡识别不清晰,请重新上传" message="成功消息" :duration="2000" :before-close="true" @close="dialogClose"
			 @confirm="dialogConfirm">
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup_backcard" type="dialog">
			<uni-popup-dialog type="input" title="请先填写银行卡号" message="成功消息" :duration="2000" :before-close="true" @close="dialogClose"
			 @confirm="dialogConfirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import {
		ossURL
	} from "../../common/url.js"
	export default {
		data() {
			return {
				bankCardImg: "/static/img/bankCard.png",
				bankCard: null,
				obj: null,
				show: false
			};
		},

		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		props: {},
		methods: {
			alter_number(e) {
				this.bankCard = e.detail.value

			},
			upload_picture(e) {
				var ossURL = 'https://kxk-test.oss-cn-beijing.aliyuncs.com'
				var that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res)
						// console.log(JSON.stringify(res.tempFilePaths));
						//将照片上传至云端需要刚才存储的临时地址
						const tempFilePaths = res.tempFilePaths
						that.$request('/oss/encryptParam', {
							// 传参参数名：参数值,如果没有，就不需要传

						}).then(res => {
							// 打印调用成功回调
							if (res.code == 1) {
								console.log(res)

								// wx.cloud.init();
								console.log(tempFilePaths[0])
								//  随机生成文件名称
								let fileRandName = Date.now() + "" + parseInt(Math.random() * 1000)
								let arr = tempFilePaths[0].split(".");
								let fileName = "uni" + fileRandName + '.' + arr[arr.length - 1];
								// console.log(bannerImage)
								uni.uploadFile({
									url: ossURL,
									name: "file",
									filePath: tempFilePaths[0],
									formData: {
										'OSSAccessKeyId': res.obj.accessid,
										'key': res.obj.dir + "/" + fileName,
										'expire': res.obj.expire,
										'host': res.obj.host,
										'policy': res.obj.policy,
										'signature': res.obj.signature,
										'dir': res.obj.dir,
										'name': tempFilePaths[0],
									},
									success(ress) {
										//上传成功后会返回永久地址

										that.bankCardImg = ossURL + "/" + res.obj.dir + "/" + fileName
										// console.log(that.$data.bankCardImg)
										that.$request('/user/bank/ocr', {

											// openId : uni.getStorageSync('openId'),
											bankCardImg: that.$data.bankCardImg,

										}).then(res => {
											console.log(res)
											// console.log(123)
											if (res.code == 1) {

												that.bankCard = res.obj.bankCard,

													uni.setStorageSync('curUser', res.obj)
												// console.log(456)
											}

										})
									},
									fail(res) {
										// this.$refs.popup.open()
										uni.showToast({
											title: '上传失败',
											duration: 2000,
										})
										console.log("上传失败")
										console.log(res)
									}
								})
							}

						})
					}
				});
			},

			// 下一步去刷脸
			next() {
				let bankCard = this.$data.bankCard;
				let bankCardImg = this.$data.bankCardImg
				if (bankCard == null || bankCard == "") {
					// Toast.fail("请先填写银行卡号")
					this.$refs.popup_backcard.open()
					return false;
				}

				if (bankCardImg == null || bankCardImg == "") {
					// Toast.fail("请先上传银行卡正面")
					return false;
				}
				this.$request("/user/bank/4factors", {
					bankCard: this.$data.bankCard,
					id: uni.getStorageSync('curUser').id,
				}).then(res => {
					console.log("next")
					console.log(res)
					if (res.code == 1) {
						uni.setStorageSync('curUser', res.obj)
						uni.redirectTo({
							// url: '/pages/bank_card/bank_card',
							url: '/pages/bank_card/bank_card',
						})
					}
				});
			},

			// event(e){
			//                 console.log(e)
			//             }

			/* 对话框点击确认按钮 */
			dialogConfirm(done) {
				console.log('你点击了确认按钮');
				// 需要执行 done 才能关闭对话框  
				done()
			},
			/**  
			 * 对话框取消按钮  
			 */
			dialogClose(done) {
				console.log('你点击了取消按钮');
				// 需要执行 done 才能关闭对话框  
				done()
			},
		}
	};
</script>
<style>
	@import "./change_bank.css";
</style>
