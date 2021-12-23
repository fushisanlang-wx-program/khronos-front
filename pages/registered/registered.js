// registered.js
var username
var password
var passwordre
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
  passwordre: function (e) {
    var value = e.detail.value; 
    this.setData({
      passwordre: value,
    })
  },
  registered: function (e) {
    var that = this;
    if (that.data.username.length == 0 || that.data.password.length == 0 || that.data.passwordre.length == 0) { 
      wx.showToast({
        icon: 'none',
        title: '用户名或密码不能为空！',
        duration: 2000,
      })
     } else if (that.data.password != that.data.passwordre) {
        wx.showToast({
          icon: 'none',
          title: '两次密码不同',
          duration: 2000,
        })
    } else {
      wx.request({ 
        url: 'https://tools.fushisanlang.cn/khronos/user/add',
        method: "get",
        header: {
          'content-type': 'application/json'
        },
        data: {
          username: this.data.username, 
          passstr: this.data.password,
          passstrre: this.data.passwordre,
        },
      
        success: function (res) { 
            that.setData({
              code: res.data.code,
              session: res.cookies,
            })
          if (that.data.code == 200 && res.data.code != 405) {
            wx.request({ 
              url: 'https://tools.fushisanlang.cn/khronos/user/login',
              method: "get",
              header: {
                'content-type': 'application/json'
              },
              data: {
                username: that.data.username, 
                passstr: that.data.password,
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
                    title:  res.data.Message,
                  })
                }
      
              }
            })
            
          } else {
            var message = res.data.Message
            if (typeof(message) == 'undefined') {
              message = '输入信息异常'
            }
            wx.showToast({
              icon: 'none',
              title: message,
            })
          }

        }
      })
    }
  },
})