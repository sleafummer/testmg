function format(ts, option) {
	var date = getDate(ts)
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()
	var week = date.getDay()
	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()

	//获取 年月日
	if (option == 'YY-MM-DD') return [year, month, day].map(formatNumber).join('-')

	//获取 年月
	if (option == 'YY-MM') return [year, month].map(formatNumber).join('-')

	//获取 年
	if (option == 'YY') return [year].map(formatNumber).toString()

	//获取 月
	if (option == 'MM') return [mont].map(formatNumber).toString()

	//获取 日
	if (option == 'DD') return [day].map(formatNumber).toString()

	//获取 年月日 周一 至 周日
	if (option == 'YY-MM-DD Week') return [year, month, day].map(formatNumber).join('-') + ' ' + getWeek(week)

	//获取 月日 周一 至 周日
	if (option == 'MM-DD Week') return [month, day].map(formatNumber).join('-') + ' ' + getWeek(week)

	//获取 周一 至 周日
	if (option == 'Week') return getWeek(week)

	//获取 时分秒
	if (option == 'hh-mm-ss') return [hour, minute, second].map(formatNumber).join(':')

	//获取 时分
	if (option == 'hh-mm') return [hour, minute].map(formatNumber).join(':')

	//获取 分秒
	if (option == 'mm-dd') return [minute, second].map(formatNumber).join(':')

	//获取 时
	if (option == 'hh') return [hour].map(formatNumber).toString()

	//获取 分
	if (option == 'mm') return [minute].map(formatNumber).toString()

	//获取 秒
	if (option == 'ss') return [second].map(formatNumber).toString()

	//默认 时分秒 年月日
	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

function getWeek(n) {
	switch (n) {
		case 1:
			return '星期一'
		case 2:
			return '星期二'
		case 3:
			return '星期三'
		case 4:
			return '星期四'
		case 5:
			return '星期五'
		case 6:
			return '星期六'
		case 7:
			return '星期日'
	}
}
var filters = {
	toFix: function(value) {
		return value.toFixed(2) // 此处2为保留两位小数，保留几位小数，这里写几    
	},
	toStr: function(value) {
		return value.toString()
	},
	toNum: function(value) {
		return value.toNumber()
	},
}

// module.exports = {
// 	format: format,
// 	toFix: filters.toFix,
// 	toStr: filters.toStr,
// 	toNum: filters.toNum,//暴露接口调用
// }

function authStatus() {
	let curUser = uni.getStorageSync('curUser');
	let routes = getCurrentPages();
	uni.setStorageSync('currentroute', routes[routes.length - 1].route)
	let idcard = curUser.idCard;
	let idcardF = curUser.idCardF;
	let idcardR = curUser.idCardR;

	if (!idcard || !idcardF || !idcardR) {
		uni.navigateTo({
			url: '/pages/authen/authen',
		})
		return false;
	}

	let bankCard = curUser.bankCard;
	if (bankCard == null || bankCard == "") {
		uni.navigateTo({
			url: '/pages/bank_ocr/bank_ocr',
		})
		return false;
	}
	let pages = getCurrentPages();
	let page = pages[pages.length - 1];
	let router = page.route
	//  console.log(router)
	let signStatus = curUser.signStatus
	if (signStatus == null || signStatus == "" || signStatus == 0) {
		uni.navigateTo({
			url: '/pages/sign/sign?currentRouter=' + router,
		})
		return false;
	}

	let faceAuthImg = curUser.faceAuthImg
	let faceAuthStatus = curUser.faceAuthStatus
	if (faceAuthStatus == 0 || faceAuthStatus == null || faceAuthStatus == "" || faceAuthImg == null || faceAuthImg == "") {
		uni.navigateTo({
			url: '/pages/face/face?currentRouter=' + router,
		})
		return false;
	}
	return true;
}

function viewStatus() {
	let curUser = uni.getStorageSync('curUser');
	let accessToken = uni.getStorageSync('accessToken') ? uni.getStorageSync('accessToken') : '';
	if (curUser != null) {
		// return new Promise((resolve, reject) => {
		uni.request({
			url: "/user/by/cur",
			method_type: 'POST',
			dataType: 'json',
			data: {

			},
			header: {
				accessToken: accessToken,
				deviceType: 3
			},
			success: (res) => {
				console.log(res)
				if (res.code == 1) {
					// resolve(res.obj.viewStatus)
					console.log(159)
					uni.setStorageSync('curUser', res.obj)
				} else {
					console.log(357)
				}
			}
		})
		// }
	} else {
		return 0;
	}

}

export {
	format,
	filters,
	viewStatus,
	authStatus
}
