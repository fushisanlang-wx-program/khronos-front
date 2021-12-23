// login.js
var username
var password
Page({
  
  username: function (e) {
    var value = e.detail.value;
    this.setData({
      username: value, 
    })
   },
  password: function (e) {
    var value = e.detail.value; 
    this.setData({
      password: value,
    })
   },
   Fu:function(){
    wx.redirectTo({
      url: '../../pages/fu/fu',
    })
  },
  registered:function(){
    wx.redirectTo({
      url: '../registered/registered',
    })
  },
  doLogin: function (e) {
    var that = this;
    if (that.data.username.length == 0 || that.data.password.length == 0) { 
      wx.showToast({
        icon: 'none',
        title: '用户名或密码不能为空！',
        duration: 2000,
      })
    } else {
      wx.request({ 
        url: 'https://tools.fushisanlang.cn/khronos/user/login',
        method: "get",
        header: {
          'content-type': 'application/json'
        },
        data: {
          username: this.data.username, 
          passstr: this.data.password,
        },
        success: function (res) { 
            that.setData({
              code: res.data.code,
              session: res.cookies,
            })
         
          if (that.data.code == 200) { 
            wx.showToast({
              title: '登录成功',
            })
            wx.setStorageSync('LoginCookie', res.cookies); 
            wx.redirectTo({
              url: '../index/index', 
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '用户名或密码错误',
            })
          }

        }
      })
    }
  },
})