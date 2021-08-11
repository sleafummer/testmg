<template>
	<!-- 完成批次 -->
	<view class="accomplish-batch">
		<view class="index" v-for="(item, index) in batchList" :key="index">
			<view class="coding">
				<view class="icon">
					<uni-icons type="smallcircle" size="16" color="#4388F2"></uni-icons>
				</view>
				<view class="number">
					<view class="number-number">
						<text>
							{{item.batchNo}}
						</text>
					</view>
					<view class="number-time">
						<text>
							{{item.createTime}}
						</text>
					</view>
				</view>

			</view>
			<view class="batch">
				<text></text>
			</view>
			<view class="price">
				<text>{{item.moneyLast/100}}元</text>
			</view>
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
				apply: null,
				batchList: []
			}
		},
		// onLoad: function(options) {
		// 	this.id = options.id;
		// 	this.getListjobslist()
		// },
		onLoad: function(options) {
			// console.log(options)
			this.apply = options.apply
			this.query()
		},

		methods: {
			query() {
				this.$request('/job/apply/settlement/list/by/applyid', {

					applyId: this.$data.apply

				}).then(res => {
					if (res.code == 1) {

						this.batchList = res.obj
						this.$data.batchList.map(item => {
							item.endTime = format(item.endTime, 'YY-MM-DD')
						})
					}
				});
			}

		}

	}
	// pages/batch/batch.js
</script>
<style>
	@import "./batch.css";
</style>
