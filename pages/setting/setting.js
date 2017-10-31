// pages/mine/mine.js
var app = getApp();
var util = require('../../utils/util.js');  

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
    dataTime:null,
    imgList: ['http://www.smart029.com.img.800cdn.com/images/7.jpg', 'http://www.smart029.com.img.800cdn.com/images/8.jpg', 'http://www.smart029.com.img.800cdn.com/images/9.jpg', 'http://www.smart029.com.img.800cdn.com/images/10.jpg', 'http://www.smart029.com.img.800cdn.com/images/11.jpg', 'http://www.smart029.com.img.800cdn.com/images/12.jpg', 'http://www.smart029.com.img.800cdn.com/images/1.jpg', 'http://www.smart029.com.img.800cdn.com/images/2.jpg', 'http://www.smart029.com.img.800cdn.com/images/3.jpg', 'http://www.smart029.com.img.800cdn.com/images/4.jpg', 'http://www.smart029.com.img.800cdn.com/images/5.jpg', 'http://www.smart029.com.img.800cdn.com/images/6.jpg', ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var eTime = util.formatTime(new Date());
    this.data.dataTime = eTime.substring(0, 10);
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
    const ctx = wx.createCanvasContext('myCanvas')

    // 新风监测
    ctx.beginPath()
    ctx.setFontSize(20)
    ctx.setFillStyle('black')
    ctx.fillText('新风监测系统', 10, 20)
    ctx.stroke()

    // 上线
    ctx.beginPath()
    ctx.setLineWidth(0.5)
    ctx.moveTo(0, 25)
    ctx.lineTo(170, 25)
    ctx.stroke()
    //下线
    ctx.beginPath()
    ctx.setLineWidth(0.5)
    ctx.moveTo(0, 30)
    ctx.lineTo(180, 30)
    ctx.stroke()
    //斜线
    ctx.beginPath()
    ctx.setLineWidth(0.5)
    ctx.moveTo(170, 25)
    ctx.lineTo(190, 35)
    ctx.stroke()
    // 后段线
    ctx.beginPath()
    ctx.setLineWidth(0.5)
    ctx.moveTo(190, 35)
    ctx.lineTo(this.data.devicewidth, 35)
    ctx.stroke()
    // 日期
    ctx.beginPath()
    ctx.setFontSize(13)
    ctx.setFillStyle('black')
    ctx.fillText(this.data.dataTime, this.data.devicewidth - 100, 32)
    ctx.stroke()


    ctx.draw()
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

  mapAction: function(){

    wx.navigateTo({
      url: '../map/map',
    })
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