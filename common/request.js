// const baseURL = 'https://admintest.zhihuizp.com/kxk/app'
// const baseURL = 'https://kxkadmin.zhihuizp.com/kxk/app'
const baseURL = 'http://192.168.0.29:8082/kxk/app'
const ossURL = 'https://kxk-test.oss-cn-beijing.aliyuncs.com'
// uni.getSgetStorageSync({accessToken: "accessToken"})
// const accessToken = uni.getStorageSync('accessToken')
const request = (
	url = '',
	data = {},
	method_type = 'POST',
	header = {
		accessToken: uni.getStorageSync('accessToken') ? uni.getStorageSync('accessToken') : '',
		deviceType: 3
	}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: method_type,
			url: baseURL + url,
			data: data,
			header: header,
			dataType: 'json',
			success(res) {

				setTimeout(function() {
					uni.hideLoading();
				}, 200);
				if (res) {
					// console.log(!res)
				}

				if (res.data) {
					// console.log(!res.data)
				}

				if (res.data.code == 401) {
					// 未认证

					uni.redirectTo({
						url: '/pages/login/login'
					})
				}

				if (res.data.code == 1) {
					// console.log(1)

				}
				// console.log(res)
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
export default request
