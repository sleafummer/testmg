<template>
	<!--index.wxml-->

	<view class="box">
		<view class="orientation">
			<!-- 定位 -->
			<view class="location">
				<text class="iconfont icon-dingwei1">{{city}}</text>
			</view>
			<!-- 搜索框 -->
			<view class="page_row">
				<view class="search">
					<input v-model="keyword" placeholder="搜索任务" type="text" class="search_w" confirm-type="text" />
				</view>
				<view class="sousuo" @tap="search_task">搜索</view>

			</view>
		</view>

		<!-- 轮播图 -->
		<swiper class="u-wrp-bnr" indicator-dots="true" autoplay="true" interval="5000" duration="1000" circular="true">
			<swiper-item v-for="(item, index) in bannerImage" :key="index">
				<image :src="item.imgUrl" class="u-img-slide" mode="aspectFill"></image>
			</swiper-item>

		</swiper>
		<!-- 最新任务，月结专区，新税服务 -->
		<view class="parent-all">
			<view class="image-parent" v-for="(item, index) in platemessage" :key="index">
				<image class="image" @tap="enter_next_page(index)" mode="widthFix" :src="item.imgUrl"></image>
				<view class="child">{{item.title}}</view>
			</view>

		</view>
		<view class="grayline">
			<!-- 灰色 -->
		</view>
		<view class="recommendation">
			<text class="iconfont icon-tubiaozhizuo-">精品推荐</text>
		</view>
		<view class="recommendation-brush">

			<view class="boutique_list" v-for="(item, index) in jobClassList" :key="index">
				<image class="image" @tap="enter_tap(item.id)" :src="item.imgUrl"></image>
			</view>

		</view>

		<view class="grayline">
			<!-- 灰色中控地带 -->
		</view>

		<view class="daily-special">
			<text class="iconfont icon-tubiaozhizuo-">每日推荐</text>
		</view>
		<!-- 列表 -->
		<view class="lists" @tap="entertaskdetail(item.id)" v-for="(item, index) in listjobslist" :key="index">
			<view class="top-company">
				<text class="iconfont icon-renwu1"></text>
				<text>{{item.rwFbf}}</text>
			</view>
			<view class="task">
				<text>{{item.name}}</text>
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
			<view class="transverse-line">
				<!-- 线条 -->
			</view>
		</view>
		<!-- </block> -->

		<uni-popup ref="popup_await" type="dialog">
			<uni-popup-dialog type="input" title="请等待管理员审核" message="成功消息" :duration="2000" :before-close="true" @close="dialogClose"
			 @confirm="dialogConfirm">
			</uni-popup-dialog>
		</uni-popup>
		<!-- <kxkLogin></kxkLogin> -->
	</view>
</template>

<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=f01713baaeacc78c6033fc517ea91d5e"></script>

<script>
	import {
		format,
		filters,
		viewStatus,
		authStatus
	} from '../../common/utils/util.js'
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
				value: 2,
				bannerImage: [], //创建一个数组
				platemessage: [],
				jobClassList: [],
				listjobslist: [],
				pageNo: 1,
				keyword: '',
				showLoginModel: true,
				city: uni.getStorageSync('city') ? uni.getStorageSync('city') : '',
			};
		},
		// async created() {
		created() {
			this.getBannerImage() // 获取轮播图
			this.getTaskImage()
			this.getBoutiqueImage()
			// this.listjobslist =  await this.getListjobslist()
			this.getListjobslist()
			
			if (!this.$data.city) {
				this.get_location()

				// console.log(ahahha )
			}
			// console.log(this.$data.listjobslist[0].endTime)
		},
		// 监听页面加载，其参数为上个页面传递的数据，参数类型为object（用于页面传参）

		onLoad: function(options) {

		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {

			uni.getStorage({
				key: 'accessToken', //数据key值，也就是你存储数据时的名称
				success: function(res) {
					//数据成功获取，用户已登录
					console.log(res.data);
					// console.log('su')
				},
				fail: function(res) {
					console.log('err')
					//数据未获取成功，用户没有登录，这里我们直接跳转到登录页面
					uni.redirectTo({
						url: '/pages/login/login',
					});
				}
			});
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			console.log(uni.getStorageSync('oemName'))
			uni.setNavigationBarTitle({
			    title: uni.getStorageSync('oemName')
			});
			// console.log("onReady")
			//   let curUser =  wx.getStorageSync('curUser');
			//   // console.log("curUser的值是：" + curUser)
			//   if(curUser == null  || curUser == ""){
			//    this.setData({
			//      showWxLoginDialog : true
			//    });

			//   }

		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {

			this.pageNo= this.$data.pageNo + 1

			this.getListjobslist()

		},

		// 调用方法
		methods: {

			// 获取位置封装的函数
			get_location() {
				uni.request({
					url: "https://restapi.amap.com/v3/ip?key=e7fdc6374e40cb73028614d80a6dcd33",
					method: '',
					success(res) {
						console.log(res)
						if (res.data.status == 1) {
							this.city = res.data.city
							uni.setStorageSync('city', res.data.city)
						}
					}

				})
			},

			// 搜索任务并进入搜索界面
			search_task() {
				let keyword = this.keyword ? this.keyword : null
				console.log(keyword)
				uni.navigateTo({
					url: '/pages/search_result/search_result?keyword=' + keyword
				})
				// console.log(search_content)
			},

			// 进入任务详情页,先判断有没有身份验证
			entertaskdetail(e) {
				let job_id = e
				wx.navigateTo({
					url: '/pages/taskdetail/taskdetail?id=' + job_id
				})
			},

			// 获取轮播图
			getBannerImage() {
				this.$request('/layout/list', {
					// 传参参数名：参数值,如果没有，就不需要传
					"pageNo": 1,
					"pageSize": 20,
					"type": 0
				}).then(res => {
					// 打印调用成功回调
					// console.log(res)
					this.bannerImage = res.obj.rows
				})
				// console.log(bannerImage)
			},
			// async fn () {
			//  axios.get()
			//  await new Promise((resolve,reject)=>{
			//   http()
			//  })
			//  ConnectSocketOption
			// },
			enter_next_page(index) {
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
						// Toast('请等待管理员审核');
						this.$refs.popup_await.open()
						return false;
					}
				}

				if (index === 0) {
					wx.navigateTo({
						url: '/pages/search_result/search_result'
					})
				} else if (index === 1) {
					wx.navigateTo({
						url: '/pages/search_result/search_result?payType=1'
					})
				} else if (index === 2) {
					wx.navigateTo({
						url: '/pages/taxadministration/taxadministration'
					})
				}
			},

			enter_tap(e) {
				console.log(e)
				if (e != 1206846558742638594) {
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
							// Toast('请等待管理员审核');
							this.$refs.popup_await.open()
							return false;
						}
					}
				}

				let id = e
				wx.navigateTo({
					url: '/pages/search_result/search_result?id=' + id
				})
			},
			// 获取任务图片
			getTaskImage() {
				this.$request('/layout/list', {
					// 传参参数名：参数值,如果没有，就不需要传
					"pageNo": 1,
					"pageSize": 10,
					"type": 2
				}).then(res => {
					// 打印调用成功回调
					this.platemessage = res.obj.rows
				})
			},

			// 获取精品推荐图片
			getBoutiqueImage() {
				this.$request('/job/class/list', {
					// 传参参数名：参数值,如果没有，就不需要传
					"pageNo": 1,
					"pageSize": 10,
				}).then(res => {
					// 打印调用成功回调
					console.log(res)
					this.jobClassList = res.obj.rows
				})
			},

			// 获取任务列表
			async getListjobslist() {
				let res = await this.$request('/jobs/list/by/cur', {
					// 传参参数名：参数值,如果没有，就不需要传
					"pageNo": this.$data.pageNo,
					"pageSize": 15,
				})
				// console.log(res)
				try {
					if (res.code !== 1) {
						// console.log(res)
					}
				} catch (err) {
					res = []
					console.log(1)
				}

				this.listjobslist = this.$data.listjobslist.concat(res.obj.rows)
				this.$data.listjobslist.map(item => {
					item.endTime = format(item.endTime, 'YY-MM-DD')
				})
				return this.$data.listjobslist
			},
			// let res = await axios.get('')

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

	}
</script>
<style>
	@import "./index.css";
</style>
