<template>
	<view class="login">
		<view class="picture">
			<image class="image" :src="logoImg" mode=""></image>
		</view>
		<view class="neiron">
			<view class="left">
				<text class="kahao"> <text class="iconfont icon-shouji"></text></text>
				<input type="text" v-model="phoneNumber" @blur="alter_number" class="kahao1" placeholder="手机号码" value="" />
			</view>
		</view>
		<view class="neiron">
			<view class="left">
				<text class="kahao"> <text class="iconfont icon-22"></text></text>
				<input type="text" bindinput="alter_number" class="kahao1" placeholder="短信验证码" v-model="vcode" />
			</view>
			<!-- <text @click="open" class="send">发送验证码</text> -->
			<button  class="blue send login_code_common" v-if="show_again==0" @click="sendCode">发送验证码</button>
			<button  class="blue send login_code_common" v-if="show_again==1" @click="sendCodeAgain">{{count}}s</button>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog type="input" title="请输入正确的手机号码" message="成功消息" :duration="2000" :before-close="true" @close="dialogClose"
				 @confirm="dialogConfirm">
				</uni-popup-dialog>
			</uni-popup>
		</view>
		<view class="button">
			<button @tap="gain" class="text_b" style="border-radius: 50rpx;background-color: #4388F2;">登录</button>
			<button @tap="testgain" class="text_b" style="border-radius: 50rpx;background-color: #000;" v-if="false">测试</button>
			<uni-popup ref="popup_two" type="center">
				<uni-popup-dialog type="input" title="请输入正确的验证码" message="成功消息" :duration="2000" :before-close="true" @close="ac_dialoClose"
				 @confirm="ac_dialogConfirm">
				</uni-popup-dialog>
			</uni-popup>
		</view>

		<view class="consent">
			<text class="narrate">注册/登录即代表阅读并同意</text>
			<text class="agreement" @tap="enter_agreement">《用户注册协议》</text>
		</view>
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
				logoImg:require('../../static/img/logo.png'),
				oemId:'',
				phoneNumber: null,
				vcode: null,
				show_again: 0, //  显示发送验证码||请稍后按钮
				count: "", // 等待时间
				timer: null, //定时器
			}
		},
		onLoad() {
			this.dominCode();
		},
		mounted(){
			
		},
		methods: {
			zwgain(data){
				this.$outrequest('/jump/url', {
					// 传参参数名：参数值,如果没有，就不需要传
					'accountId':data,
					"redirectType": 3,
					"outOrderNo": 16,
					'redirectUrl':'http://thepeng1995.55555.io/pages/login/login'
					
				},'POST',
										{
											accessToken:'91d7e706d8e547e7a8360f8fdbc20da'
										}).then(res => {
											
					// 打印调用成功回调
					// console.log(res)
					if(res.obj.url){
						location.href=res.obj.url;
					}else{
						location.href=res.obj;
					}
					
				})
			},
			
			testgain(){
				alert(1)
				this.$outrequest('/tripartite/account/regist', {
					// 传参参数名：参数值,如果没有，就不需要传
					"thirdPartyUserId":555,
					"name": '王绪韩',
					"idCard": '342422199511055830',
					
				},'POST',
										{
											accessToken:'91d7e706d8e547e7a8360f8fdbc20da'
										}).then(res => {
											console.log(res)
					// 打印调用成功回调
					this.zwgain(res.obj.accountId)
					
				})
				
				
			},
			// 进入协议页面
			enter_agreement() {
				uni.navigateTo({
					url: "/pages/agreement/agreement"
				})
			},
			dominCode(){
				this.$request('/oem/set/get/domain', {
					// 传参参数名：参数值,如果没有，就不需要传
					"domain": window.location.host
				}).then(res => {
					if(res.obj.oemH5Logo!=null){
						this.logoImg=res.obj.oemH5Logo;
						uni.setStorageSync('oemName', res.obj.oemName)
						uni.setNavigationBarTitle({
						    title: res.obj.oemName
						});
					}
					
					this.oemId=res.obj.id
				// 	// 打印调用成功回调
				// 	// if(res.code === 1) {
					
				// 	// this.vcode=res.obj
				// 	// uni.setStorage({
				// 	// 	accessToken: "res"
				// 	// })
				// 	// }
				
				})
				
			},
			sendCode(){
				if(this.PhoneNum(this.$data.phoneNumber)){
					const count = 60;
					let _this=this;
					this.open();
					if (!this.timer) {
						this.count = count;
						_this.show_again = 1;
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= count) {
								this.count--;
							} else {
								_this.show_again = 0;
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000)
					}
				}else{
					// this.$refs.popup.open()
				}
				
			},
			sendCodeAgain() {
				const _this = this;
				uni.showToast({
					title:  `请稍后重试(${_this.count})`,
					icon: "none",
					duration: 1500
				})
			},
			
			open() {
				// console.log(1)
				// console.log(this.PhoneNum(this.$data.phoneNumber))
				if (!this.PhoneNum(this.$data.phoneNumber)) {
					this.$refs.popup.open()
					// return
				} else {
					// console.log(1111)
					this.$request('/verification/send', {
						// 传参参数名：参数值,如果没有，就不需要传
						"phone": this.$data.phoneNumber,
						"domain": window.location.host
					}).then(res => {
						// 打印调用成功回调
						// if(res.code === 1) {
						console.log(res)
						// this.vcode=res.obj
						// uni.setStorage({
						// 	accessToken: "res"
						// })
						// }

					})
				}

				// 
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

			/* 对话框点击确认按钮 */
			ac_dialogConfirm(done) {
				console.log('你点击了确认按钮');
				// 需要执行 done 才能关闭对话框  
				done()
			},
			/**  
			 * 对话框取消按钮  
			 */
			ac_dialoClose(done) {
				console.log('你点击了取消按钮');
				// 需要执行 done 才能关闭对话框  
				done()
			},
			gain() {
				this.$request('/h5/login', {
					// 传参参数名：参数值,如果没有，就不需要传

					"phone": this.$data.phoneNumber,
					"vcode": this.$data.vcode,
					oemId:this.oemId
					
				}).then(res => {
					// 打印调用成功回调
					// console.log(res)
					if (res.code == 1) {
						uni.setStorageSync('accessToken', res.obj.accessToken)
						uni.setStorageSync('userInfo', res.obj)
						uni.setStorageSync('curUser', res.obj)
						uni.switchTab({
							url: '/pages/index/index'
						})
					} else {
						// 没登录成功，验证码错误
						console.log(1)
						this.$refs.popup_two.open()
					}
				})
			},

			//  验证手机号
			PhoneNum(value) {
				return /^1[23456789]\d{9}$/.test(value);
			},

			alter_number() {
				console.log(this.$data.phoneNumber)
				console.log(this.PhoneNum(this.$data.phoneNumber))

			}
		}
	}
</script>

<style>
	@import url("./login.css");
</style>
