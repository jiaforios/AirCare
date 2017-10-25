// pages/mine/mine.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zcodeimgurlstr:null,
    call:null,
    phone:null,
    conpanyTips:null,
    devicewidth:0,
    deviceheight:0,
    picWidth:0,
    imgList: ['../../image/1.jpeg', '../../image/2.jpeg', '../../image/3.jpeg', '../../image/4.jpeg', '../../image/5.jpeg', '../../image/6.jpeg',]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          devicewidth: res.windowWidth,
          deviceheight: res.windowHeight,
          picWidth: (res.windowWidth-70)/3.0
        })
      }
    })
  this.setData({
    zcodeimgurlstr: app.globalData.zcodeimgurl,
    call: app.globalData.callPhone,
    phone: app.globalData.handPhone,
    conpanyTips: app.globalData.conpanyTips
  })
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

  // 退出登录
  logoutAction:function(){
      wx.showLoading({
        title: '正在退出登录',
      })

      setTimeout(function(){
        wx.hideLoading();
        app.globalData.islogout = "logout";

        wx.redirectTo({
          url: '../login/login',
        })
      },1000)
  },

  callAction:function(){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.call,
    })
  },
  phoneAction: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    })
  },
  previewImage: function(e){
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgList // 需要预览的图片http链接列表  
    }) 
  }
})