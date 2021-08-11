<template>
	<view class="taskdetail">
		<view class="task-lists">
			<view class="task">
				<view class="task-definition">
					<text>{{job.name}}</text>
				</view>
				<view class="task-price">
					{{job.money / 100}}{{job.dw}}
				</view>
			</view>
			<view class="task-location">
				<text class="iconfont icon-dingwei1"></text>
				<text>{{job.rwDd}}</text>
			</view>
			<view class="task-time">
				<text class="iconfont icon-dingwei1"></text>
				<text>任务截止时间:</text>

				<text>{{job.endTime}}</text>
			</view>
			<!-- 横线 -->
			<view class="transverse-line">

			</view>
			<view class="mission-content">
				<text class="iconfont icon-tubiaozhizuo-"></text>
				<text>任务内容 </text>
			</view>

			<view class="tesk-content">

				<text>{{job.rwNr}}</text>
			</view>

			<view class="mission-requirement">
				<text class="iconfont icon-tubiaozhizuo-"></text>
				<text>人员要求 </text>
			</view>
			<view class="task-requiest">

				<text>{{job.ryYq}}</text>
			</view>
			<view class="other-requirements">
				<text class="iconfont icon-tubiaozhizuo-"></text>
				<text>其他要求 </text>
			</view>
			<view class="task-requiest">

				<text>{{job.qtYq}}</text>
			</view>
		</view>
		<view class="task-company">
			<view class="requirement">
				<text class="iconfont icon-tubiaozhizuo-"></text>
				<text>任务发布企业 </text>
			</view>
			<view class="company-name">
				<view class="requirement">
					<text class="iconfont icon-wode"></text>

					<text>{{job.rwFbf}} </text>
				</view>
			</view>
		</view>
		<view class="information-description">
			<text>未表明收费的职位不会收取任何费用,若商家要求缴纳费用或押金,请提高警惕并在第一时间向我们举报</text>
			<view class="button">
				<button @tap="applyTask" style="width:600rpx" :disabled="showbtn">申请任务</button>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="input" title="请等待管理员审核" message="成功消息" :duration="2000" :before-close="true" @close="dialogClose"
			 @confirm="dialogConfirm">
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup_success" type="dialog">
			<uni-popup-dialog type="input" title="申请成功" message="成功消息" :duration="2000" :before-close="true" @close="dialogClose"
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
		format,
		filters,
		viewStatus,
		authStatus
	} from '../../common/utils/util.js'
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},

		data() {
			return {
				job: [],
				id: null,
				showbtn: false
			};
		},


		props: {},
		// created() {
		// },
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			// console.log(options)
			this.id = options.id;
			this.getListjobslist()
		},
		methods: {
			// 获取任务列表

			getListjobslist() {
				this.$request('/jobs/get', {
					// 传参参数名：参数值,如果没有，就不需要传
					id: this.$data.id
				}).then(res => {
					// 打印调用成功回调
					if (res.code == 1) {
						console.log(res)
						this.job = res.obj
						this.$data.job.endTime = format(this.$data.job.endTime, 'YY-MM-DD')
					}

					// 	this.$data.job.map(item => {
					// 	item.endTime = format(item.endTime, 'YY-MM-DD')
					// 	})

					// 	return this.$data.job
				})
				// return this.$data.job
			},
			applyTask() {
				console.log(123)
				let curUser = uni.getStorageSync('curUser');
				if (curUser == null || curUser == "") {
					return false;
				}

				let authStatusa = authStatus();
				if (!authStatusa) {
					return false;
				}

				if (authStatusa) {
					let status = viewStatus();
					if (status == 0) {
						// Toast('请等待管理员审核');
						// this.$refs.popup.open()
						uni.showToast({
							title: '请等待管理员审核',
							duration: 2000,
						})
					} else {
						this.$request('/jobs/apply/add', {

							jobsId: this.$data.job.id,
							userId: uni.getStorageSync('curUser').id

						}).then(res => {
							if (res.code == 1) {
								// Toast.success('申请成功');
								// this.$refs.popup_success.open()
								uni.showToast({
									title: '申请成功',
									duration: 2000
								})
								this.showbtn = true;
								uni.navigateTo({
									url: '/pages/myapplication/myapplication',
								})
							}
						})
					}
				}
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
	@import "./taskdetail.css";
</style>
