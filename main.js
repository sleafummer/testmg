import Vue from 'vue'
import App from './App'
// import Vant from 'vant';
// import 'vant/lib/index.css'

// 封装的请求，全局应用
import request from 'common/request.js'
Vue.prototype.$request = request

import outrequest from 'common/outrequest.js'
Vue.prototype.$outrequest = outrequest
// import location from 'common/location.js'
// Vue.prototype.$location = location

// import Button from 'vant/lib/button';

import utils from'common/utils/util.js'
Vue.prototype.$utils = utils

Vue.config.productionTip = false

App.mpType = 'app'

// app.use(Vant)

const app = new Vue({
    ...App
})
app.$mount()
