<template>
	<view class="myapplication">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#4388F2"></uni-segmented-control>
		<view class="content">
			<view v-if="current === 0">

				<view class="contre" v-for="(item, index) in tobecompletedlistall" :key="index" v-if="item.state == 2">
					<view class="order-number">
						<view class="top">
							<view class="left">
								<view>
									<text>申请编号：</text>
								</view>
								<view>
									<text>{{item.id}}</text>
								</view>
							</view>
							<view class="right">
								<text v-if="item.state == 1" class="done">待确认</text>
								<text v-if="item.state == 2" class="done">待完成</text>
								<text v-if="item.state == 3" class="done">已拒绝</text>
								<text v-if="item.state == 4" class="done">已完成</text>
							</view>
						</view>
						<view class="transverse-line">
							<!-- 线条 -->
						</view>
						<!-- 列表 -->
						<view class="lists">
							<view class="top-company">
								<text class="iconfont icon-renwu1"></text>
								<text>{{item.rwFbf}}</text>
							</view>
							<view class="task">
								<text>{{item.jobsName}}</text>
								<text class="price-red">{{item.money / 100}}元{{item.dw}}</text>
							</view>
							<view class="site">
								<text>{{item.rwDd}}</text>
							</view>
							<!-- 任务截止时间，结算 -->
							<view class="task-narrate">
								<view class="task-time">
									<text>任务截止时间:</text>
									<text>{{item.endTime}}</text>
								</view>
								<view class="clearing-form">
									<view v-if="item.payType == 1" class="done">月结</view>
									<view v-if="item.payType == 2" class="done">日结</view>
									<view v-if="item.payType == 3" class="done">周结</view>
									<view v-if="item.payType == 4" class="done">完工结</view>
								</view>
							</view>
						</view>
						<view class="transverse-line">
							<!-- 线条 -->
						</view>
						<view class="accomplish">

							<view class="accomplish-done" @tap="accomplish_number(item.id)">完成批次</view>
							<view class="accomplish-done" @tap="achievement_uploading(item.id)">成果交付</view>
						</view>
					</view>
				</view>

				<view class="contre" v-for="(item, index) in tobecompletedlistall" :key="index" v-if="item.state == 1 || item.state == 3">
					<view class="order-number">
						<view class="top">
							<view class="left">
								<view>
									<text>申请编号：</text>
								</view>
								<view>
									<text>{{item.id}}</text>
								</view>
							</view>
							<view class="right">
								<text v-if="item.state == 1" class="done">待确认</text>
								<text v-if="item.state == 2" class="done">待完成</text>
								<text v-if="item.state == 3" class="done">已拒绝</text>
								<text v-if="item.state == 4" class="done">已完成</text>
							</view>
						</view>
						<view class="transverse-line">
							<!-- 线条 -->
						</view>
						<!-- 列表 -->
						<view class="lists">
							<view class="top-company">
								<text class="iconfont icon-renwu1"></text>
								<text>{{item.rwFbf}}</text>
							</view>
							<view class="task">
								<text>{{item.jobsName}}</text>
								<text class="price-red">{{item.money / 100}}元{{item.dw}}</text>
							</view>
							<view class="site">
								<text>{{item.rwDd}}</text>
							</view>
							<!-- 任务截止时间，结算 -->
							<view class="task-narrate">
								<view class="task-time">
									<text>任务截止时间:</text>
									<text>{{item.endTime}}</text>
								</view>
								<view class="clearing-form">
									<view v-if="item.payType == 1" class="done">月结</view>
									<view v-if="item.payType == 2" class="done">日结</view>
									<view v-if="item.payType == 3" class="done">周结</view>
									<view v-if="item.payType == 4" class="done">完工结</view>
								</view>
							</view>
						</view>

					</view>
				</view>

				<view class="contre" v-for="(item, index) in tobecompletedlistall" :key="index" v-if="item.state == 4">
					<view class="order-number">
						<view class="top">
							<view class="left">
								<view>
									<text>申请编号：</text>
								</view>
								<view>
									<text>{{item.id}}</text>
								</view>
							</view>
							<view class="right">
								<text v-if="item.state == 1" class="done">待确认</text>
								<text v-if="item.state == 2" class="done">待完成</text>
								<text v-if="item.state == 3" class="done">已拒绝</text>
								<text v-if="item.state == 4" class="done">已完成</text>
							</view>
						</view>
						<view class="transverse-line">
							<!-- 线条 -->
						</view>
						<!-- 列表 -->
						<view class="lists">
							<view class="top-company">
								<text class="iconfont icon-renwu1"></text>
								<text>{{item.rwFbf}}</text>
							</view>
							<view class="task">
								<text>{{item.jobsName}}</text>
								<text class="price-red">{{item.money / 100}}元{{item.dw}}</text>
							</view>
							<view class="site">
								<text>{{item.rwDd}}</text>
							</view>
							<!-- 任务截止时间，结算 -->
							<view class="task-narrate">
								<view class="task-time">
									<text>任务截止时间:</text>
									<text>{{item.endTime}}</text>
								</view>
								<view class="clearing-form">
									<view v-if="item.payType == 1" class="done">月结</view>
									<view v-if="item.payType == 2" class="done">日结</view>
									<view v-if="item.payType == 3" class="done">周结</view>
									<view v-if="item.payType == 4" class="done">完工结</view>
								</view>
							</view>
						</view>
						<view class="transverse-line">
							<!-- 线条 -->
						</view>

						<view class="computational-costs">
							<view class="audit-detail">
								<view class="audit-expenses">审核费用</view>
								<view class="audit-expenses-price">{{item.moneyLast / 100}}元{{item.dw}}</view>
							</view>
							<view class="audit-cause">
								<text>审核原因</text>
								<text>{{item.remark}}</text>
							</view>
						</view>

					</view>
				</view>
				<view class="no_data">
					<text>
						暂无更多数据~
					</text>
				</view>
			</view>

			<view v-if="current === 1">
				<!-- <van-tab title="待确认"> -->
				<view>
					<view class="contre" v-for="(item, index) in tobeconfirmeds" :key="index">
						<view class="order-number">
							<view class="top">
								<view class="left">
									<view>
										<text>申请编号：</text>
									</view>
									<view>
										<text>{{item.id}}</text>
									</view>
								</view>
								<view class="right">
									<text v-if="item.state == 1" class="done">待确认</text>
									<text v-if="item.state == 2" class="done">待完成</text>
									<text v-if="item.state == 3" class="done">已拒绝</text>
									<text v-if="item.state == 4" class="done">已完成</text>
								</view>
							</view>
							<view class="transverse-line">
								<!-- 线条 -->
							</view>
							<!-- 列表 -->
							<view class="lists">
								<view class="top-company">
									<text class="iconfont icon-renwu1"></text>
									<text>{{item.rwFbf}}</text>
								</view>
								<view class="task">
									<text>{{item.jobsName}}</text>
									<text class="price-red">{{item.money / 100}}元{{item.dw}}</text>
								</view>
								<view class="site">
									<text>{{item.rwDd}}</text>
								</view>
								<!-- 任务截止时间，结算 -->
								<view class="task-narrate">
									<view class="task-time">
										<text>任务截止时间:</text>
										<text>{{item.endTime}}</text>
									</view>
									<view class="clearing-form">
										<view v-if="item.payType == 1" class="done">月结</view>
										<view v-if="item.payType == 2" class="done">日结</view>
										<view v-if="item.payType == 3" class="done">周结</view>
										<view v-if="item.payType == 4" class="done">完工结</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="no_data">
					<text>
						暂无更多数据~
					</text>
				</view>
			</view>

			<view v-if="current === 2">
				<!-- 待完成 -->

				<view class="contre" v-for="(item, index) in tobecompletedlists" :key="index">
					<view class="order-number">
						<view class="top">
							<view class="left">
								<view>
									<text>申请编号：</text>
								</view>
								<view>
									<text>{{item.id}}</text>
								</view>
							</view>
							<view class="right">
								<text v-if="item.state == 1" class="done">待确认</text>
								<text v-if="item.state == 2" class="done">待完成</text>
								<text v-if="item.state == 3" class="done">已拒绝</text>
								<text v-if="item.state == 4" class="done">已完成</text>
							</view>
						</view>
						<view class="transverse-line">
							<!-- 线条 -->
						</view>
						<!-- 列表 -->
						<view class="lists">
							<view class="top-company">
								<text class="iconfont icon-renwu1"></text>
								<text>{{item.rwFbf}}</text>
							</view>
							<view class="task">
								<text>{{item.jobsName}}</text>
								<text class="price-red">{{item.money / 100}}元{{item.dw}}</text>
							</view>
							<view class="site">
								<text>{{item.rwDd}}</text>
							</view>
							<!-- 任务截止时间，结算 -->
							<view class="task-narrate">
								<view class="task-time">
									<text>任务截止时间:</text>
									<text>{{item.endTime}}</text>
								</view>
								<view class="clearing-form">
									<view v-if="item.payType == 1" class="done">月结</view>
									<view v-if="item.payType == 2" class="done">日结</view>
									<view v-if="item.payType == 3" class="done">周结</view>
									<view v-if="item.payType == 4" class="done">完工结</view>
								</view>
							</view>
						</view>
						<view class="transverse-line">
							<!-- 线条 -->
						</view>
						<view class="accomplish">

							<view class="accomplish-done" @tap="accomplish_number(item.id)">完成批次</view>
							<view class="accomplish-done" @tap="achievement_uploading(item.id)">成果交付</view>

						</view>

					</view>


				</view>
				<view class="no_data">
					<text>
						暂无更多数据~
					</text>
				</view>
				<!-- 待完成结束 -->
			</view>

			<view v-if="current === 3">
				<!-- <van-tab title="已完成"> -->
				<view class="contre" v-for="(item, index) in finished" :key="index">
					<view class="order-number">
						<view class="top">
							<view class="left">
								<view>
									<text>申请编号：</text>
								</view>
								<view>
									<text>{{item.id}}</text>
								</view>
							</view>
							<view class="right">
								<text v-if="item.state == 1" class="done">待确认</text>
								<text v-if="item.state == 2" class="done">待完成</text>
								<text v-if="item.state == 3" class="done">已拒绝</text>
								<text v-if="item.state == 4" class="done">已完成</text>
							</view>
						</view>
						<view class="transverse-line">
							<!-- 线条 -->
						</view>
						<!-- 列表 -->
						<view class="lists">
							<view class="top-company">
								<text class="iconfont icon-renwu1"></text>
								<text>{{item.rwFbf}}</text>
							</view>
							<view class="task">
								<text>{{item.jobsName}}</text>
								<text class="price-red">{{item.money / 100}}元{{item.dw}}</text>
							</view>
							<view class="site">
								<text>{{item.rwDd}}</text>
							</view>
							<!-- 任务截止时间，结算 -->
							<view class="task-narrate">
								<view class="task-time">
									<text>任务截止时间:</text>
									<!-- <text>20.022</text> -->
									<text>{{item.endTime}}</text>
								</view>
								<view class="clearing-form">
									<view v-if="item.payType == 1" class="done">月结</view>
									<view v-if="item.payType == 2" class="done">日结</view>
									<view v-if="item.payType == 3" class="done">周结</view>
									<view v-if="item.payType == 4" class="done">完工结</view>
								</view>
							</view>
						</view>
						<view class="transverse-line">
							<!-- 线条 -->
						</view>

						<view class="computational-costs">
							<view class="audit-detail">
								<view class="audit-expenses">审核费用</view>
								<view class="audit-expenses-price">{{item.moneyLast / 100}}元{{item.dw}}</view>
							</view>
							<view class="audit-cause">
								<text>审核原因</text>
								<text>{{item.remark}}</text>
							</view>
						</view>

					</view>
				</view>
				<view class="no_data">
					<text>
						暂无更多数据~
					</text>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		format
	} from '../../common/utils/util.js'
	export default {

		data() {
			return {
				items: ['全部', '待确认', '待完成', '已完成'],
				current: 0,
				pageNo: 1,
				pageNo1: 1,
				pageNo2: 1,
				pageNo3: 1,
				pageSize: 15,
				tobecompletedlistall: [],
				tobecompletedlists: [],
				tobeconfirmeds: [],
				finished: [],
				aaa: [{
					state: 2,
					id: 121,
					dw: '元',
					rwFbfF: '合肥',
					jobsName: '2116',
					money: 1000,
					rwDd: '房间爱卡',
				}, {
					state: 1,
					id: 121,
					dw: '元',
					rwFbfF: '合肥',
					jobsName: '2116',
					money: 1000,
					rwDd: '房间爱卡',
				}, ]

			}
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			// console.log(1)
			this.getAllList()
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			// debugger

			if (this.$data.current == 0) {

				this.pageNo = this.$data.pageNo + 1

				this.getAllList()
			} else if (this.$data.current == 1) {

				this.pageNo1 = this.$data.pageNo1 + 1

				this.getConfirmeds()
			} else if (this.$data.current == 2) {

				this.pageNo2 = this.$data.pageNo2 + 1

				this.getCompletedlists()
			} else if (this.$data.current == 3) {

				this.pageNo3 = this.$data.pageNo3 + 1

				this.getFinished()
			}
		},

		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
					// console.log(this.$data.current)
					if (this.$data.current == 0) {

						this.$data.pageNo = 1,
							this.$data.tobecompletedlistall = []

						this.getAllList()
					} else if (this.$data.current == 1) {

						this.$data.pageNo1 = 1,
							this.$data.tobeconfirmeds = []

						this.getConfirmeds()
					} else if (this.$data.current == 2) {

						this.$data.pageNo2 = 1,
							this.$data.tobecompletedlists = []

						this.getCompletedlists()
					} else if (this.$data.current == 3) {

						this.$data.pageNo3 = 1,
							this.$data.finished = []

						this.getFinished()
					}
				}
			},
			
			accomplish_number(e) {
				// console.log(e)
				let id = e
				wx.navigateTo({
					url: '/pages/batch/batch?apply=' + id
				})

			},
			achievement_uploading(e) {
				let id = e
				uni.navigateTo({
					url: "/pages/achievement/achievement?id=" +id
				})
			},

			// 获取所有请求列表
			getAllList() {
				// let userInfo = uni.getStorageSync("userInfo");
				this.$request('/jobs/apply/list', {
					// 传参参数名：参数值,如果没有，就不需要传
					// openId : userInfo.openId,
					pageNo: this.$data.pageNo,
					pageSize: this.$data.pageSize,
					stateList: [1, 2, 4]
				}).then(res => {
					if (res.code == 1) {
						// 打印调用成功回调
						// console.log(res)
						this.tobecompletedlistall = this.$data.tobecompletedlistall.concat(res.obj.rows)
						this.$data.tobecompletedlistall.map(item => {
							item.endTime = format(item.endTime, 'YY-MM-DD')
						})
			
					}

				})

			},

			// 获取待确认请求列表
			getConfirmeds() {
				// let userInfo = uni.getStorageSync("userInfo");
				this.$request('/jobs/apply/list', {
					// 传参参数名：参数值,如果没有，就不需要传
					// openId : userInfo.openId,
					pageNo: this.$data.pageNo1,
					pageSize: this.$data.pageSize,
					stateList: [1]
				}).then(res => {
					if (res.code == 1) {
						// 打印调用成功回调
						console.log(res)
						this.tobeconfirmeds = this.$data.tobeconfirmeds.concat(res.obj.rows)
						this.$data.tobeconfirmeds.map(item => {
							item.endTime = format(item.endTime, 'YY-MM-DD')
						})
						// console.log(bannerImage)
					}

				})
			},

			// 获取待完成请求列表
			getCompletedlists() {
				// let userInfo = uni.getStorageSync("userInfo");
				this.$request('/jobs/apply/list', {
					// 传参参数名：参数值,如果没有，就不需要传
					// openId : userInfo.openId,
					pageNo: this.$data.pageNo2,
					pageSize: this.$data.pageSize,
					stateList: [2]
				}).then(res => {
					if (res.code == 1) {
						// 打印调用成功回调
						console.log(res)
						this.tobecompletedlists = this.$data.tobecompletedlists.concat(res.obj.rows)
						this.$data.tobecompletedlists.map(item => {
							item.endTime = format(item.endTime, 'YY-MM-DD')
						})
						// console.log(bannerImage)
					}

				})
			},

			// 获取已完成请求列表
			getFinished() {
				// let userInfo = uni.getStorageSync("userInfo");
				this.$request('/jobs/apply/list', {
					// 传参参数名：参数值,如果没有，就不需要传
					// openId : userInfo.openId,
					pageNo: this.$data.pageNo3,
					pageSize: this.$data.pageSize,
					stateList: [4]
				}).then(res => {
					if (res.code == 1) {
						// 打印调用成功回调
						console.log(res)
						this.finished = this.$data.finished.concat(res.obj.rows)
						this.$data.finished.map(item => {
							item.endTime = format(item.endTime, 'YY-MM-DD')
						})
						// console.log(bannerImage)
					}
				
				})
			},



		}
	}
</script>

<style>
	@import "./myapplication.css"
</style>
