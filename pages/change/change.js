// index.js
// 获取应用实例
const app = getApp()
var username
var password
Page({
  data: {
    date: "2021-01-01",
    date2: 1,
    plannameOld: 0,

    planallOld:0,
    measureOld:0

  },
  onLoad: function (option) {
   
    var that = this
    that.setData({
      plannameOld: option.planname,
      date: getLocalTime(option.start),
      date2: getLocalTime(option.stop),
      planallOld:option.planall,
      measureOld:option.measure
    })

  },
  bindDateChange: function (e) {
    wx.setStorageSync('new_plan_start', e.detail.value);

    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },
  bindDateChangeStop: function (e) {
    wx.setStorageSync('new_plan_stop', e.detail.value);
    this.setData({
      date2: e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },

  planall: function (e) {
    var value = e.detail.value; //获取输入的内容
    this.setData({
      planallOld: value,
    })
    
  },
  measure: function (e) {
    var value = e.detail.value; //获取输入的内容
    this.setData({
      measureOld: value,
    })
    
  },
  Fu:function(){
    wx.redirectTo({
      url: '../../pages/fu/fu',
    })
  },
  doChangePlan: function () {
    var that = this
    var date_1 = new Date(that.data.date)
    var date_2 = new Date(that.data.date2)
    var date_start = Date.parse(date_1) / 1000
    var date_stop = Date.parse(date_2) / 1000
    var session = wx.getStorageSync('LoginCookie')[0].split(";")[0]
    wx.request({
      url: 'https://tools.fushisanlang.cn/khronos/plan/change',
      method: "post",
      header: {
        'Cookie': session,
        'content-type': 'application/json'
      },
      data: {
        planname: that.data.plannameOld, 
        measure: that.data.measureOld,
        planall: that.data.planallOld,
        start: date_start,
        stop: date_stop
      },
      success: function (res) {
        if (res.data.Code == 200) {
          
          wx.redirectTo({
            url: '../../pages/index/index',
          })

        } else {
        console.log(res.data)

          wx.showToast({
            icon: 'none',
            title: res.data.Message,
          })
        }
      }
    })

  }
});



function getLocalTime(nS) {
  var da = nS * 1000;
  da = new Date(da);
  var year = da.getFullYear() + '-'; 
  
  var month = da.getMonth() + 1 + '-';
  if (da.getMonth() < 10) {
    month = '0' + month }
  var date = da.getDate() ;
  if (da.getDate()< 10 ) {
    date = "0" + date
  }
  return [year, month, date].join('')
}
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}