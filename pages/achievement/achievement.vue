<template>
	<view class="achievement">
		<view class="top-picture">
			<image class="image" src="/static/img/tip1.png">
			</image>
		</view>
		
		<view class="uploading-achievement">
			
			<view class="achiev-name">
				<text class="iconfont icon-tubiaozhizuo-"></text>
				<text>成果上传</text>
			</view>
			
			<view class="scan-img" @tap="upload_picture">
				<image v-if="settlementRecord" class="scan" :src="settlementRecord">
				</image>
				<!-- <view  class="uploading_border"> -->
				<view v-else class="uploading_border">
					<text class="border">+</text>
					<text class="next">支持JPG、PNG格式文件</text>
				</view>
			</view>
			
			<view class="button">
				<button v-if="settlementRecord" @tap="uploading" style="width:600rpx;background-color:#4388F2">提交</button>
				<button v-else disabled style="width:600rpx;background-color:#4388F2">提交</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [ // Uploader 根据文件后缀来判断是否为图片文件
					// 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
				],
				productInfo: {},
				settlementRecord: null,
				id: null,
				search_jobs: ""
			};
		},

		components: {},
		props: {},

		onLoad: function(options) {
			console.log(options.id)
			this.id = options.id
		},

		methods: {
			upload_picture: function(e) {
				var that = this
				var ossURL = 'https://kxk-test.oss-cn-beijing.aliyuncs.com'
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
									console.log(ress)

									that.settlementRecord = ossURL + "/" + res.obj.dir + "/" + fileName

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

			uploading() {
				this.submit()
				uni.navigateTo({
					url: '/pages/uploadingok/uploadingok',
				})
			},
			
			submit(){
			    this.$request('/jobs/apply/edit/settlement/record',{
			    
			        "id": this.$data.id,
			        "settlementRecord": this.$data.settlementRecord,
			    
			    }).then(res=>{
			      // console.log(res)
			      if(res.code == 1){
			       
			          this.search_jobs=res.obj.rows
			        
			      }
			    })
			  },
			
		}

	};
</script>
<style>
	@import "./achievement.css";
</style>
