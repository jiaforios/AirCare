// pages/history/history.js
var wxCharts = require('../../vender/charts/wxcharts.js');
var util = require('../../utils/util.js');  
var app = getApp();
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataArray:null,
      out_dataArray: null,
      inDeviceDataArr:null,
      outDeviceDataArr:null,
      deviceDataTimeArr:null,
  },
  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  }, 
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 20; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;

      var windowWidth = 375;
      try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }

      var dataArrin = that.data.inDeviceDataArr;
      lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: [0,0],
        series: [
          {
            name: '室内',
            data: [0,0],
          }

        ],
        yAxis: {
          title: '室内pm2.5 (ug/m3)',
          // format: function (val) {
          //   return val.toFixed(2);
          // },
          min: 0
        },
        enableScroll: true,
        width: windowWidth,
        height: 400
      });  



      var eTime = util.formatTime(new Date()); 
      var baseTime = eTime.substring(0,10);
      var sTime = baseTime + " " +'00:00:00';
      var in_deviceid = app.globalData.inDeviceId;
      var out_deviceid = app.globalData.outDeviceId;
      var inUrlStr = 'https://www.airmoniter.com/airQuality/queryAirQualitys.do?deviceId=' + in_deviceid + '&' + 'startDate=' + sTime + '&' + 'endDate=' + eTime
      var outUrlStr = 'https://www.airmoniter.com/airQuality/queryAirQualitys.do?deviceId=' + out_deviceid + '&' + 'startDate=' + sTime + '&' + 'endDate=' + eTime

      wx.request({
        url: inUrlStr,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            dataArray:res.data.data,
          })
          var arr = that.data.dataArray

          var inData = [];
          var inTimes = [];
          for (var i = 0; i<arr.length; i++){
            var obj = arr[i];
            var time = obj.dateTime;
            var inTime = time.substr(11,5);
            inData.push(obj.pm2); // 存储pm2.5
            inTimes.push(inTime); // 存储时间
          }
          inTimes = inTimes.reverse();
          that.setData({
            inDeviceDataArr: inData,
            deviceDataTimeArr: inTimes,
          })
          var series = null
          if (that.data.outDeviceDataArr) {
            series = [{
              name: '室外pm2.5',
              data: that.data.outDeviceDataArr,
            }, {
              name: '室内pm2.5',
              data: inData,
            }];
          } else {
            series = [{
              name: '室内pm2.5',
              data: inData,
            }];
          }

          lineChart.updateData({
            categories: inTimes,
            series: series
          });

        }
      })  

      wx.request({
        url: outUrlStr,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            out_dataArray: res.data.data,
          })
          var arr = that.data.out_dataArray

          var outData = [];
          var outTimes = [];
          for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            var time = obj.dateTime;
            var outTime = time.substr(11, 5);
            outData.push(obj.pm2); // 存储pm2.5
            outTimes.push(outTime); // 存储时间
          }
          outTimes = outTimes.reverse();
          that.setData({
            outDeviceDataArr: outData,
            deviceDataTimeArr: outTimes,
          })

          var series = null
          if (that.data.inDeviceDataArr){
            series = [{
              name: '室外pm2.5',
              data: outData,
            },{
                name: '室内pm2.5',
                data: that.data.inDeviceDataArr,
            }];
          }else{
            series = [{
              name: '室外pm2.5',
              data: outData,
            }];
          }
         
          lineChart.updateData({
            categories: outTimes,
            series: series
          });

        }
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
  
  }
})