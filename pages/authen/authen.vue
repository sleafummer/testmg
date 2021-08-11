<template>
	<view class="box">
		<view class="scan-img">
			<view class="id_card">
				<image :src="idCardF" class="scan" @tap="upload_picture('idCardF')"></image>
				<view class="bottom_text">
					<text>上传身份证</text>
					<text class="blue_text">头像页</text>
				</view>
			</view>
			<view class="id_card">
				<image :src="idCardR" class="scan" @tap="upload_picture('idCardR')"></image>
				<view class="bottom_text">
					<text>上传身份证</text>
					<text class="blue_text">国徽页</text>
				</view>
			</view>

			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog type="input" title="身份证识别不清晰" message="成功消息" :duration="2000" :before-close="true" @close="dialogClose"
				 @confirm="dialogConfirm">
				</uni-popup-dialog>
			</uni-popup>

		</view>
		<view class="contre">
			<view class="neiron">
				<text class="kahao"> 姓名</text>
				<input type="text" class="kahao1" placeholder="拍照上传系统自动识别" :value="name">
			</view>
			<view class="neiron">
				<text class="kahao"> 身份证号</text>
				<input type="text" class="kahao1" placeholder="拍照上传系统自动识别" :value="idCard">
			</view>
		</view>
		<button style="width:600rpx" @tap="nextStep" class="anniu">下一步</button>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {

		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				tempIdcard: '/static/img/bankCard.png',
				idCardF: require('../../static/img/idCardZ.png'),
				idCardR: require('../../static/img/idCardF.png'),
				name: "",
				idCard: ""
			}
		},

		methods: {

			upload_picture: function(e) {
				var ossURL = 'https://kxk-test.oss-cn-beijing.aliyuncs.com'
				var that = this
				let idcard_type = e;
				console.log(e)
				//让用户选择或拍摄一张照片
				
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						//将照片上传至云端需要刚才存储的临时地址
						const tempFilePaths = res.tempFilePaths
						that.$request("/oss/encryptParam", {

						}).then(res => {
							console.log("阿里云成功")
							console.log(res)
							// wx.cloud.init();
							console.log(tempFilePaths[0])
							//  随机生成文件名称
							let fileRandName = Date.now() + "" + parseInt(Math.random() * 1000)
							let arr = tempFilePaths[0].split(".");
							let fileName = "uni" + fileRandName + '.' + arr[arr.length - 1];
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
									console.log("上传成功")
									if (idcard_type == "idCardF") {

										that.idCardF = ossURL + "/" + res.obj.dir + "/" + fileName

									} else {
										that.idCardR = ossURL + "/" + res.obj.dir + "/" + fileName

									}
									// 当身份证信息全部上传的时候调用身份证ocr信息
									let tempIdcard = that.$data.tempIdcard;
									let idCardF = that.$data.idCardF;
									let idCardR = that.$data.idCardR;
									console.log(idCardF,idCardR)
									if (idCardF != null && idCardF != "" && idCardR != null && idCardR != "" && idCardF != tempIdcard &&
										idCardR != tempIdcard && idCardF.indexOf('http')!=-1 && idCardR.indexOf('http')!=-1) {
										that.$request('/user/idcard/ocr', {

											openId: uni.getStorageSync('openId'),
											idCardF: idCardR,
											idCardR: idCardF

										}).then(res => {
											if (res.code == 1) {

												that.name = res.obj.name,
													that.idCard = res.obj.idCard

												uni.setStorageSync('curUser', res.obj)
											} else {
												// Toast.fail("身份证OCR失败")
												// console.log("身份证OCR失败")
												// that.$refs.popup.open()
												uni.showToast({
													title: '身份证OCR失败',
													duration: 2000,
												})
											}
										})
									}
								},
								fail(res) {
									console.log("上传失败")
									console.log(res)
								}
							})

						});
					}
				})
			},

			nextStep() {
				let idCard = this.$data.idCard;
				let name = this.$data.name;
				// todo 判断
				let bankCard = this.$data.bankCard;
				if (idCard == null || idCard == "" || name == null || name == "") {
					// Toast.fail("请先填写姓名/身份证号")
					return false;
				}
				let user = uni.getStorageSync('curUser');
				this.$request("/user/edit/name/idcard", {

					id: user.id,
					idCard: this.$data.idCard,
					name: this.$data.name

				}).then(res => {
					if (res.code == 1) {
						uni.navigateTo({
							url: '/pages/bank_ocr/bank_ocr',
						})
					}
				})
			},

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
	@import "./authen.css";
</style>
