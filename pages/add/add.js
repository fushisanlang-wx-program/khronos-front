// index.js
// 获取应用实例
const app = getApp()
var username
var password
Page({
  data: {
    date: "2022-01-01",
    date2: "2022-12-31",
  },
  onLoad: function () {
  },
  bindDateChange: function (e) {
    this.setData({
      new_plan_start:e.detail.value,
     date:e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },
  bindDateChangeStop: function (e) {
    this.setData({
      new_plan_stop:e.detail.value,
    date2:e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },
  planname: function (e) {
    var value = e.detail.value; 
    this.setData({
     
      new_plan_planname:value
    })
  },
  planall: function (e) {
    var value = e.detail.value; 
    this.setData({
      new_plan_planall:value,
    })
  },
  measure: function (e) {
    var value = e.detail.value;
    this.setData({
      new_plan_measure:value
    })
  },
  doAddPlan: function () {

    var that = this
    var new_plan_start = that.data.new_plan_start
    var new_plan_stop = that.data.new_plan_stop
    var new_plan_planname = that.data.new_plan_planname
    var new_plan_planall = that.data.new_plan_planall
    var new_plan_measure = that.data.new_plan_measure

    if (typeof(new_plan_start) == 'undefined') {
      new_plan_start = "2022-01-01";
    } 
    if (typeof(new_plan_stop) == 'undefined') {
      new_plan_stop = "2022-12-31";
    }

    if (typeof(new_plan_planname) == 'undefined') {
      new_plan_planname = "游泳"
    }

    if (typeof(new_plan_planall) == 'undefined') {
      new_plan_planall = "10000";
    }

    if (typeof(new_plan_measure) == 'undefined') {
      new_plan_measure = "米";
    }
 
    var date_1 = new Date(new_plan_start)
    var date_2 = new Date(new_plan_stop)
    var date_start = Date.parse(date_1) / 1000
    var date_stop = Date.parse(date_2) / 1000
    var session = wx.getStorageSync('LoginCookie')[0].split(";")[0]
    wx.request({
      url: 'https://tools.fushisanlang.cn/khronos/plan/add',
      method: "post",
      header: {
        'Cookie': session,
        'content-type': 'application/json'
      },
      data: {
        planname: new_plan_planname, //this.data.username 代表你data中username的值
        measure: new_plan_measure,
        planall: new_plan_planall,
        start: date_start,
        stop: date_stop
      },
      success: function (res) {
        if (res.data.Code == 200) {
          wx.showToast({
            title: '添加成功',
          })
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

  },
  Fu:function(){
    wx.redirectTo({
      url: '../../pages/fu/fu',
    })
  },
});