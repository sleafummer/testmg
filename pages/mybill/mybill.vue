<template>

	<view class="mybill">
		<view class="top">
			<view class="account-balance">
				<text>待结算金额(元)</text>
			</view>
			<view class="balance">
				<text>{{notPayMoney / 100}}</text>
			</view>
			<view class="paymony">
				<text>已结算金额</text>
				<text>￥{{payMoney / 100}}</text>
			</view>
		</view>

		<view class="contre">
			<view class="billing-details">
				<text class="iconfont icon-tubiaozhizuo-">账单明细</text>
			</view>
			<!-- <view class="screen">
      <text>筛选</text>
    </view> -->
		</view>

		<view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#4388F2"></uni-segmented-control>
			<view v-if="current === 0">
				<view class="bottom" v-for="(item, index) in settelmentList" :key="index">
					<view class="screen-balance">
						<view class="icons">
							<text class="iconfont icon-touxiang"></text>
						</view>
						<view class=" information">
							<view class=" information-name">
								<text>{{item.companyName}}</text>
							</view>
							<view class=" information-time">
								<text>{{item.createTime}}</text>
							</view>
						</view>
					</view>
					<view class="pay-calculation">
						<text>{{filters.toFix(item.moneyLast / 100)}}</text>
					</view>
				</view>
				<!-- </block> -->
				<view class="notdata">
					<text>暂无更多数据~</text>
				</view>
			</view>
			<view v-if="current === 1">
				<view class="bottom" v-for="(item, index) in settelmentList_no" :key="index">
					<view class="screen-balance">
						<view class="icons">
							<text class="iconfont icon-touxiang"></text>
						</view>
						<view class=" information">
							<view class=" information-name">
								<text>{{item.companyName}}</text>
							</view>
							<view class="information-time">
								<text>{{item.createTime}}</text>
							</view>
						</view>
					</view>
					<view class="pay-calculation">
						<text>{{filters.toFix(item.moneyLast / 100)}}</text>
					</view>
				</view>
				</block>
				<view class="notdata">
					<text>暂无更多数据~</text>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	import {
		format,
		filters
	} from '../../common/utils/util.js'
	export default {
		data() {
			return {
				items: ['已结算金额', '待结算金额'],
				current: 0,
				notPayMoney: null,
				payMoney: null,
				settelmentList: [],
				settelmentList_no: [],
				pageNo: 1,
				pageNo0: 1,
				total: 0
			}
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			// console.log(1)
			this.getPaySettelemnt()
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			console.log(1)
			if (this.$data.current === 0) {

				this.pageNo = this.$data.pageNo + 1

				this.getPaySettelemnt();
			} else if (this.$data.current === 1) {

				this.pageNo0 = this.$data.pageNo0 + 1

				this.getPaySettelemnt_no();
			}

		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				// console.log(this.current)
				if (this.$data.current == 0) {

					this.$data.pageNo = 1,
						this.$data.settelmentList = []


					this.getPaySettelemnt()
				} else if (this.$data.current == 1) {

					this.$data.pageNo0 = 1,
						this.$data.settelmentList_no = []

					this.getPaySettelemnt_no()
				}
			},

			// 获取已结算请求列表
			getPaySettelemnt() {

				this.$request('/job/apply/settlement/list/by/userid', {
					// 传参参数名：参数值,如果没有，就不需要传
					userId: uni.getStorageSync('userInfo').id,
					pageNo: this.$data.pageNo,
					pageSize: 20,
					settlementStatus: 1
				}).then(res => {
					if (res.code == 1) {
						// 打印调用成功回调
						console.log(res)
						this.settelmentList = this.$data.settelmentList.concat(res.obj.rows)
						this.$data.settelmentList.map(item => {
							item.endTime = format(item.endTime, 'YY-MM-DD')
						})
						// console.log(bannerImage)
						this.total = res.obj.total
					}
				})
			},

			// 获取未结算请求列表
			getPaySettelemnt_no() {

				this.$request('/job/apply/settlement/list/by/userid', {
					// 传参参数名：参数值,如果没有，就不需要传
					userId: uni.getStorageSync('userInfo').id,
					pageNo: this.$data.pageNo0,
					pageSize: 20,
					settlementStatus: 0
				}).then(res => {
					if (res.code == 1) {
						// 打印调用成功回调
						console.log(res)
						this.settelmentList_no = this.$data.settelmentList_no.concat(res.obj.rows)
						// console.log(bannerImage)
						this.$data.settelmentList_no.map(item => {
							item.endTime = format(item.endTime, 'YY-MM-DD')
						})
						this.total = res.obj.total
					}
				})
			},

			// 获取已完成请求列表
			getPayMoney() {

				this.$request('/job/apply/settlement/money/count', {
					// 传参参数名：参数值,如果没有，就不需要传
					userId: uni.getStorageSync('userInfo').id,

				}).then(res => {
					if (res.code == 1) {
						// 打印调用成功回调
						console.log(res)
						this.notPayMoney = res.obj.notPayMoney,
						this.payMoney = res.obj.payMoney
					}
				})
			},

		}
	}
</script>
<style>
	@import "./mybill.css";
</style>
