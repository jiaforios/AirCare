// pages/realTime/realTime.js
var app = getApp();
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
      evaViewHeight:0,
      out_co2: 0,
      out_pm10: 0,
      out_humidity: 0,
      out_pm2: 0,
      out_temperature: 0,
      out_tvoc: 0,
      out_evaViewHeight: 0,
      inPhone:0,
      outPhone:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      console.log("inhone = " + app.globalData.inDeviceId);

    setInterval(function () {
      //循环执行代码  
      wx.request({
        url: 'https://www.airmoniter.com/airQuality/queryAirQuality.do?deviceId=50028',

        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // console.log(res.data)
          // console.log("返回数据为pm2：" + res.data.data.pm2);
          that.setData({
            pm2: res.data.data.pm2,
            pm10: res.data.data.pm10,
            co2: res.data.data.co2,
            temperature: res.data.data.temperature,
            humidity: res.data.data.humidity,
            tvoc: res.data.data.tvoc,
            evaViewHeight:res.data.data.pm2,
          })
        }
      })

      wx.request({
        url: 'https://www.airmoniter.com/airQuality/queryAirQuality.do?deviceId=50122',

        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // console.log(res.data)
          // console.log("返回数据为pm2：" + res.data.data.pm2);
          that.setData({
            out_pm2: res.data.data.pm2,
            out_pm10: res.data.data.pm10,
            out_co2: res.data.data.co2,
            out_temperature: res.data.data.temperature,
            out_humidity: res.data.data.humidity,
            out_tvoc: res.data.data.tvoc,
            out_evaViewHeight: res.data.data.pm2,
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