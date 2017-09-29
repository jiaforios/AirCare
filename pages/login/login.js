// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userPhone = wx.getStorageSync('userPhone');
    var islogOut = app.globalData.islogout;
    console.log(userPhone)
    console.log(islogOut);
// 登录过直接跳转
    if (userPhone && (islogOut != 'logout')){
      this.setData({
        phone:userPhone,
      })
      this.loginAction();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },


  phoneInputAction:function(input){
     this.setData({
        phone:input.detail.value,
     })
  },
  /** 登录按钮事件 */
    loginAction: function () {
      var that = this;
      console.log("登录操作 " + that.data.phone)
    // wx.navigateTo({
    //   url: '../realTime/realTime',
    // })
     wx.showLoading({
       title: '登录中',
     })

      wx.request({
        url: 'https://www.airmoniter.com/airQuality/queryCompanyInfo.do?phone=' + that.data.phone,

        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // console.log(res.data)
          // console.log("返回数据为pm2：" + res.data.data.pm2);
           var resultdata = res.data.data;
          //  wx.hideLoading();
           if(resultdata == null){
             wx.showToast({
               title: '登录失败，该手机号未注册设备！',
               duration:3000,
             })
           }else{
             wx.setStorageSync('userPhone', that.data.phone);
             app.globalData.inDeviceId = res.data.data.deviceId,
             app.globalData.outDeviceId = res.data.data.outDeviceId,
             app.globalData.zcodeimgurl = res.data.data.weixinQuickMark,
             app.globalData.callPhone = res.data.data.telePhone,
             app.globalData.handPhone = res.data.data.sellPhone,

             app.globalData.islogout = "login",
               wx.switchTab({
                 url: '../realTime/realTime',
               })
           }

        }
      })
   
  }
})