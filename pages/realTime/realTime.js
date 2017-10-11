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
      devicewidth:0,
      deviceheight: 0,
      out_color:null,
      in_color: null,
      out_pince:null,
      in_pince:null,
      in_location:null,
      out_location:null,
      bannerDesc:'新风净化系统',
      imgUrls: [
        {
          desc:'新风净化系统',
          url: 'http://www.smart029.com/skin/images/one.png'
        }, {
          desc:'中央吸层系统',
          url: 'http://www.smart029.com/skin/images/two.png'
        }, {
          desc:'全屋净水系统',
          url: 'http://www.smart029.com.img.800cdn.com/skin/images/three.png'
        }
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular:true,
      userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this

    


      console.log("inhone = " + app.globalData.inDeviceId);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          devicewidth:res.windowWidth,
          deviceheight:res.windowHeight,
        })
      }
    })
    
    that.setData({
      in_location: app.globalData.in_adress,
      out_location: app.globalData.out_adress

    })
    var in_deviceid = app.globalData.inDeviceId;
    var out_deviceid = app.globalData.outDeviceId;
    setInterval(function () {
      //循环执行代码  
      wx.request({
        url: 'https://www.airmoniter.com/airQuality/queryAirQuality.do?deviceId=' + in_deviceid,

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

          if (res.data.data.pm2<50){
            that.setData({
              in_color:'rgb(51,200,37)',
              in_pince:"优",
            })
          } else if (res.data.data.pm2 < 100) {
            that.setData({
              in_color: 'rgb(154,205,50)',
              in_pince: "良",
            })
          } else if (res.data.data.pm2 < 150) {
            that.setData({
              in_color: 'rgb(222,93,0)',
              in_pince: "轻度污染",
            })
          } else if (res.data.data.pm2 < 200) {
            that.setData({
              in_color: 'rgb(212,0,0)',
              in_pince: "中度污染",

            })
          } else if (res.data.data.pm2 < 300) {
            that.setData({
              in_color: 'rgb(153,0,169)',
              in_pince: "重度污染",
            })
          }else{
            that.setData({
              in_color: 'rgb(129,0,38)',
              in_pince: "严重污染",
            })
          }
         

        }
      })

      wx.request({
        url: 'https://www.airmoniter.com/airQuality/queryAirQuality.do?deviceId=' + out_deviceid,

        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            out_pm2: res.data.data.pm2,
            out_pm10: res.data.data.pm10,
            out_co2: res.data.data.co2,
            out_temperature: res.data.data.temperature,
            out_humidity: res.data.data.humidity,
            out_tvoc: res.data.data.tvoc,
            out_evaViewHeight: res.data.data.pm2,
          })
          
          if (res.data.data.pm2 < 50) {
            that.setData({
              out_color: 'rgb(51,200,37)',
              out_pince: "优",
            })
          } else if (res.data.data.pm2 < 100) {
            that.setData({
              out_color: 'rgb(154,205,50)',
              out_pince: "良",
            })
          } else if (res.data.data.pm2 < 150) {
            that.setData({
              out_color: 'rgb(222,93,0)',
              out_pince: "轻度污染",
            })
          } else if (res.data.data.pm2 < 200) {
            that.setData({
              out_color: 'rgb(212,0,0)',
              out_pince: "中度污染",
            })
          } else if (res.data.data.pm2 < 300) {
            that.setData({
              out_color: 'rgb(153,0,169)',
              out_pince: "重度污染",
            })
          } else {
            that.setData({
              out_color: 'rgb(129,0,38)',
              out_pince: "严重污染",
            })
          }
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
  
  },
  
  // 根据pm2.5 数值显示结果
  contentShowWithValue:function(value,res){
    if (value < 50) {
      res = 'rgb(51,200,37)'
    } else if (value < 100) {
        res =  'rgb(154,205,50)'
    } else if (value < 150) {
      res = 'rgb(222,93,0)'
    } else if (value < 200) {
      res = 'rgb(212,0,0)'
    } else if (value < 300) {
      res = 'rgb(153,0,169)'
    } else {
      res = 'rgb(129,0,38)'
    }
  },
  pageChangeAction: function(event){
     var that = this;
     switch (event.detail.current){
        case 0:{
          that.setData({
            bannerDesc:'新风净化系统'
          })
        }
        break;
        case 1: {
          that.setData({
            bannerDesc: '中央吸层系统'
          })
        }
          break;
        case 2: {
          that.setData({
            bannerDesc: '全屋净化系统'
          })
        }
          break;

     }
  },


  phoneAction:function(){


  }

})