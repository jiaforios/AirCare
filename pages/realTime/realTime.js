// pages/realTime/realTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      co2:0,
      pm10:0,
      humidity:0,
      pm2:0,
      temperature:0,
      tvoc:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
    setInterval(function () {
      //循环执行代码  
      console.log("2秒")
      wx.request({
        url: 'https://www.airmoniter.com/airQuality/queryAirQuality.do?deviceId=50028',

        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          console.log("返回数据为pm2：" + res.data.data.pm2);
          that.setData({
            pm2: res.data.data.pm2,
            pm10: res.data.data.pm10,
            co2: res.data.data.co2,
            temperature: res.data.data.temperature,
            humidity: res.data.data.humidity,
            tvoc: res.data.data.tvoc,
          })
        }
      })
    }, 2000)

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
  
  }
})