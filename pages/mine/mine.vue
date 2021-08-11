<template>
  <view class="mine">
    <view class="top">
      <!-- <view class="head-portrait">
      <image class="image" mode="widthFix" ></image>
    </view> -->
      <view class="name">
        <text>{{ userName }}</text>
      </view>
    </view>
    <view class="centre"> </view>
    <view class="bottom">
      <view class="operation" @tap="entermyapplication">
        <view class="operation-change">
          <text class="iconfont icon-shenqing-copy"></text>
          <text>我的申请</text>
        </view>
        <view>
          <text class="iconfont icon-dayuhao-copy"></text>
        </view>
      </view>
      <view class="operation" @tap="entermybill">
        <view class="operation-change">
          <text class="iconfont icon-zhangdan-copy"></text>
          <text>结算管理</text>
        </view>
        <view>
          <text class="iconfont icon-dayuhao-copy"></text>
        </view>
      </view>

      <!--身份证认证  -->
      <view class="operation" v-if="idCard && idCardF && idCardR">
        <view class="operation-change">
          <text class="iconfont icon-shenfenrenzheng1-copy"></text>
          <text>身份认证</text>
        </view>
        <view>
          <text>已认证</text>
        </view>
      </view>

      <view class="operation" @tap="enterauthen" v-else>
        <view class="operation-change">
          <text class="iconfont icon-shenfenrenzheng1-copy"></text>
          <text>身份认证</text>
        </view>
        <view>
          <text class="iconfont icon-dayuhao-copy"></text>
        </view>
      </view>

      <view class="operation" @tap="bc_binding">
        <view class="operation-change">
          <text class="iconfont icon-qia"></text>
          <text>卡号绑定</text>
        </view>
        <view>
          <text class="iconfont icon-dayuhao-copy"></text>
        </view>
      </view>
      <view class="operation" @tap="login_out">
        <view class="operation-change">
          <text class="iconfont icon-touxiang"></text>
          <text>退出登录</text>
        </view>
        <view>
          <text class="iconfont icon-dayuhao-copy"></text>
        </view>
      </view>
      <view class="operation" @tap="agreement_manage" v-if="false">
        <view class="operation-change">
          <text class="iconfont icon-yonghuxieyi-copy"></text>
          <text>协议管理</text>
        </view>
        <view>
          <text class="iconfont icon-dayuhao-copy"></text>
        </view>
      </view>
      <view class="operation" @tap="enteraboutus" v-if="false">
        <view class="operation-change">
          <text class="iconfont icon-guanyuwomen1-copy"></text>
          <text>关于我们</text>
        </view>
        <view>
          <text class="iconfont icon-dayuhao-copy"></text>
        </view>
      </view>
    </view>
    <!-- <view class="button">
    <button>
      退出登录
    </button>
  </view> -->

    <!-- 小程序客服 -->
    <!-- <button open-type="contact" session-from>
 <view class="transverse-fixing"> 
     <image class="diximg" src="/static/img/contact.png">
     
    </image>
 </view>
 </button> -->
    <!-- <kxkLogin></kxkLogin> -->
  </view>
</template>


<script>
// const {
//   checkLogin,
//   doLogin,
//   baseURL,
//   http
// } = getApp(); // pages/mine/mine.js
// import kxkLogin from "../component/login/login";

// import amap from '../../common/amap-wx.js';
import {
  format,
  filters,
  viewStatus,
  authStatus,
} from "../../common/utils/util.js";
export default {
  data() {
    return {
      idCard: uni.getStorageSync("curUser").idCard,
      idCardF: uni.getStorageSync("curUser").idCardF,
      idCardR: uni.getStorageSync("curUser").idCardR,
      userName: "暂无姓名",
    };
  },
  // 监听页面加载，其参数为上个页面传递的数据，参数类型为object（用于页面传参）
  onLoad: function (options) {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.userName = uni.getStorageSync("curUser").name;
  },
  onReady:function(){
  	uni.setNavigationBarTitle({
  	    title: uni.getStorageSync('oemName')
  	});
  },
  methods: {
    entermyapplication() {
      let curUser = uni.getStorageSync("curUser");
      if (curUser == null || curUser == "") {
        // this.showLoginModel = true
        return false;
      }

      let authStatusa = authStatus();
      if (!authStatusa) {
      	return false;
      }
      uni.navigateTo({
        url: "/pages/myapplication/myapplication",
      });
    },

    entermybill() {
      console.log(123123);
      let curUser = uni.getStorageSync("curUser");
      if (curUser == null || curUser == "") {
        // this.showLoginModel = true
        return false;
      }

      let authStatusa = authStatus();

      if (!authStatusa) {
        return false;
      }
      uni.navigateTo({
        url: "/pages/mybill/mybill",
      });
    },
    login_out() {
      uni.clearStorageSync("accessToken");
      uni.clearStorageSync("userInfo");
      uni.clearStorageSync("curUser");
	  uni.redirectTo({
        url: "/pages/login/login",
      });
    },
    enterauthen() {
      uni.navigateTo({
        url: "/pages/authen/authen",
      });
    },

    enteraboutus() {
      uni.navigateTo({
        url: "/pages/about/about",
      });
    },

    bc_binding() {
      let curUser = uni.getStorageSync("curUser");
      if (curUser == null || curUser == "") {
        // this.showLoginModel = true
        return false;
      }

      // let authStatusa = authStatus();
      // if (!authStatusa) {
      // 	return false;
      // }
      uni.navigateTo({
        url: "/pages/bank_card/bank_card",
      });
    },

    agreement_manage() {
      uni.navigateTo({
        url: "/pages/agreement/agreement",
      });
    },
  },
};
</script>
<style>
@import "./mine.css";
</style>
