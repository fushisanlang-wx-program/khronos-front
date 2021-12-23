// pages/index/index.js
Page({
  data: {
      arr: []
  },

  onLoad: function () {
     
    var that=this;
    var a = wx.getStorageSync('LoginCookie')
    if (a=="") {
      wx.setStorageSync('LoginCookie',"[gfsessionid=1;]")
      //SETSTORAGE
    }
    
    wx.request({
      url: 'https://tools.fushisanlang.cn/khronos/plan/get',
      header: {
        'Cookie': wx.getStorageSync('LoginCookie')[0].split(";")[0],
        'content-type': 'application/json',
      },
      success: function (res) { 
        if (res.statusCode != 200 || res.data.Code == 401 ) { 
          wx.redirectTo({
            url: '/pages/login/login',
          })
        } else {     
          that.setData({arr:res.data})
        }
      }
    })
 },


  Info:function(event) {
    wx.redirectTo({
      url: '../../pages/info/info?measure=' + event.currentTarget.dataset.measure  + '&planall=' + event.currentTarget.dataset.planall + '&planname=' + event.currentTarget.dataset.planname   + '&start=' + event.currentTarget.dataset.start + '&plandone=' + event.currentTarget.dataset.plandone + '&stop=' + event.currentTarget.dataset.stop ,
    })

    
  },

Add:function(){
  wx.redirectTo({
    url: '../../pages/add/add',
  })
},
Fu:function(){
  wx.redirectTo({
    url: '../../pages/fu/fu',
  })
},
})
