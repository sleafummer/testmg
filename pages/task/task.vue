<template>
	<view class="myapplication">
		<view class="information" v-if="!showJobs">
			<view class="text">
				<text>点击完善身份证和银行卡信息！</text>
			</view>
			<view class="button">
				<button style="width: 400rpx; background-color: #4388f2" @tap="enterauthen">
					去完善资料
				</button>
			</view>

			<view class="transverse-fixing">
				<image class="diximg" src="/static/img/contact.png"></image>
			</view>
		</view>

		<view v-if="showJobs">
			<!-- 搜索框 -->
			<view class="page_row">
				<view class="search">
					<input v-model="keyword" placeholder="搜索任务" type="text" class="search_w" confirm-type="text" />
					<!-- <van-search @change="change" shape="round" :value="value" placeholder="搜索任务" @focus="focus" @blur="blur"></van-search> -->
				</view>
				<view class="sousuo" @tap="search_task">搜索</view>
			</view>

			<!--任务列表-->

			<view class="contre" v-for="(item, index) in listjobslist" :key="index">
				<view class="lists" @tap="entertaskdetail(item.id)">
					<view class="top-company">
						<text class="iconfont icon-renwu1"></text>
						<text>{{ item.rwFbf }}</text>
					</view>
					<view class="task">
						<text>{{ item.name }}</text>
						<text class="price-red">{{ item.money / 100 }}元{{ item.dw }}</text>
					</view>
					<view class="site">
						<text>{{ item.rwDd }}</text>
					</view>
					<!-- 任务截止时间，结算 -->
					<view class="task-narrate">
						<view class="task-time">
							<text>任务截止时间:</text>
							<text>{{ item.endTime }}</text>
						</view>
						<view class="clearing-form">
							<!-- <view class="done">月结</view> -->
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
			</view>
			<!-- </block> -->
		</view>
	</view>
</template>


<script>
	import {
		format,
		filters,
		viewStatus,
		authStatus,
	} from "../../common/utils/util.js";
	export default {
		data() {
			return {
				listjobslist: [],
				pageNo: 1,
				keyword: null,
				showJobs: true,
			};
		},

		// 监听页面加载，其参数为上个页面传递的数据，参数类型为object（用于页面传参）
		onLoad: function(options) {
			this.setShowJobs();
			console.log(123132);
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.pageNo = this.$data.pageNo + 1;

			this.getListjobslist();
		},
		onReady:function(){
			uni.setNavigationBarTitle({
			    title: uni.getStorageSync('oemName')
			});
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.setShowJobs();
			if (this.$data.showJobs) {
				this.listjobslist = [];
				this.getListjobslist();
			}
		},
		created() {
			// this.listjobslist=[];
		},
		// 调用方法
		methods: {
			// 获取任务列表
			getListjobslist() {
				this.$request("/jobs/list/by/cur", {
					// 传参参数名：参数值,如果没有，就不需要传
					pageNo: this.$data.pageNo,
					pageSize: 15,
				}).then((res) => {
					// 打印调用成功回调
					this.listjobslist = this.$data.listjobslist.concat(res.obj.rows);
					this.$data.listjobslist.map((item) => {
						item.endTime = format(item.endTime, "YY-MM-DD");
					});
				});
			},
			search_task() {
				let keyword = this.keyword ? this.keyword : "";
				// console.log(keyword)
				wx.navigateTo({
					url: "/pages/search_result/search_result?keyword=" + keyword,
				});
			},

			entertaskdetail(e) {
				let curUser = uni.getStorageSync("curUser");
				if (curUser == null || curUser == "") {
					return false;
				}

				let authStatusa = authStatus();
				if (!authStatusa) {
					return false;
				}
				let job_id = e;
				wx.navigateTo({
					url: "/pages/taskdetail/taskdetail?id=" + job_id,
				});
			},

			setShowJobs() {
				this.$request("/user/by/cur", {}).then((res) => {
					// 打印调用成功回调
					// let curUser = uni.getStorageSync("curUser");
					let curUser = res.obj
					if (curUser == null || curUser == "") {
						this.showJobs = false;
					} else {
						let faceAuthStatus = curUser.faceAuthStatus;
						let signStatus = curUser.signStatus;

						if (
							faceAuthStatus == 0 ||
							faceAuthStatus == null ||
							faceAuthStatus == "" ||
							signStatus == 0 ||
							signStatus == null ||
							signStatus == ""
						) {

							this.showJobs = false;
							uni.redirectTo({
								url: '/pages/mine/mine'
							})
						} else {
							uni.redirectTo({
								url: '/pages/task/task'
							})
							this.showJobs = true;
						}
					}
				});
			},

			enterauthen() {
				let curUser = uni.getStorageSync("curUser");
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
						uni.showToast({
							title: "请等待管理员审核",
							duration: 2000,
						});
						return false;
					}
				}
			},
		},
	};
</script>

<style>
	@import "./task.css";
</style>
