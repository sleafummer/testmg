<template>
	<view>
		<view class="search_result">
			<!-- 搜索框 -->
			<view class="page_row">
				<view class="search">
					<input v-model="keyword" placeholder="搜索任务" type="text" class="search_w" confirm-type="text" />
				</view>
				<view class="sousuo" @tap="search">搜索</view>

			</view>
		</view>
		<view class="contre" v-for="(item, index) in search_jobs" :key="index">
			<view class="lists" @tap="entertaskdetail(item.id)">
				<view class="top-company">
					<text class="iconfont icon-renwu1"></text>
					<text>{{item.rwFbf}}</text>
				</view>
				<view class="task">
					<text>{{item.name}}</text>
					<text class="price-red">{{item.money / 100}}{{item.dw}}</text>
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
			<!-- </block> -->
		</view>
	</view>
</template>

<script>
	import {
		format,
		filters,
		viewStatus,
		authStatus
	} from '../../common/utils/util.js'
	export default {
		data() {
			return {
				search_show: true,
				value: "",
				keyword: null,
				classId: null,
				search_jobs: [],
				pageNo: 1,
				pageSize: 20,
				payType: null
			};
		},

		// 监听页面加载，其参数为上个页面传递的数据，参数类型为object（用于页面传参）
		onLoad: function(options) {
			this.getListjobslist()
		},
		components: {},
		props: {},

		onLoad(options) {
			this.keyword = options.keyword
			this.classId = options.id
			this.payType = options.payType
			// console.log(options.keyword)
			// this.keyword = keyword
			// console.log(keyword)
			this.getListjobslist()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {

			pageNo: this.$data.pageNo + 1

			this.getListjobslist()

		},
		methods: {
			search() {
				let keyword = this.keyword ? this.keyword : null
				// console.log(this.$data.keyword)
				this.search_jobs = [],
					this.getListjobslist()
			},
			// 获取任务列表
			getListjobslist() {
				this.$request('/jobs/list/by/cur', {
					// 传参参数名：参数值,如果没有，就不需要传
					"name": this.$data.keyword,
					"pageNo": this.$data.pageNo,
					"pageSize": this.$data.pageSize,
					"classId": this.$data.classId,
					"payType": this.$data.payType
				}).then(res => {
					// 打印调用成功回调
					// if(res.code == 1){}
					this.search_jobs = this.$data.search_jobs.concat(res.obj.rows)
					this.$data.search_jobs.map(item => {
						item.endTime = format(item.endTime, 'YY-MM-DD')
					})
					// console.log(bannerImage)
				})
			},
			entertaskdetail(e) {
				let curUser = uni.getStorageSync('curUser');
				if (curUser == null || curUser == "") {

					// this.showLoginModel = true
					return false;
				}

				let authStatusa = authStatus();
				if (!authStatusa) {
					return false;
				}


				if (authStatusa) {
					let status = viewStatus();
					if (status == 0) {
						Toast('请等待管理员审核');
						return false;
					}
				}
				// let authStatus = utils.authStatus();
				// if(!authStatus){
				//   return false;
				// }  
				let job_id = e
				wx.navigateTo({
					url: '/pages/taskdetail/taskdetail?id=' + job_id
				})
			},
		}
	};
</script>
<style>
	@import "./search_result.css";
</style>
