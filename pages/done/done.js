// pages/planlist/planlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    measure: "0",
    planall: "100",
    plandone: "0",
    planname: "ss",
    start: "1000",
    stop: "123504",
    process: 0,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this
    var process = option.plandone / option.planall
    if (process > 1) {
      process = 1
    }
    process = process * 100
    that.setData({
      measure: option.measure,
      planall: option.planall,
      plandone: option.plandone,
      start: getLocalTime(option.start),
      planname: option.planname,
      stop: getLocalTime(option.stop),
      process: process,
      plandoneNew: 0, //改变page--data中username的值
    })

  },
  Fu:function(){
    wx.redirectTo({
      url: '../../pages/fu/fu',
    })
  },
  doneNew: function (e) {
    var value = e.detail.value; //获取输入的内容
    this.setData({
      plandoneNew: value, //改变page--data中username的值
    })


  },
  donePlan: function () {

    var doneNew
    if (this.data.plandoneNew <= 0) {
      wx.showToast({
        icon: 'none',
        title: '输入错误',
      })

    } else {
      doneNew = this.data.plandoneNew
      var session = wx.getStorageSync('LoginCookie')[0].split(";")[0]
      wx.request({
        url: 'https://tools.fushisanlang.cn/khronos/plan/done',
        method: "post",
        header: {
          'Cookie': session,
          'content-type': 'application/json'
        },
        data: {
          planname: this.data.planname, //this.data.username 代表你data中username的值
          plandone: doneNew
        },
        success: function (res) {
          if (res.data.Code == 200) {
            wx.showToast({
              title: '记录成功',
            })
            wx.redirectTo({
              url: '../../pages/index/index',
            })

          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.Message,
            })
          }
        }
      })


    }


  }
})

function getLocalTime(nS) {
  var da = nS * 1000;
  da = new Date(da);
  var year = da.getFullYear() + '年';
  var month = da.getMonth() + 1 + '月';
  var date = da.getDate() + '日';
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