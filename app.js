// app.js
App({
  onLaunch() {
   
  },

  globalData: {
    baseURL: "http://10.116.20.13:8081",
    token:'',
    copyNum:'',
    userInfo:''
  },
  onError(res) {
    console.log(res)
  },
  onShow() {
     this.checkToken()
  },
  onHide() {

  },
  onPageNotFound(res) {
    wx.showModal({
      title: '页面没有找到~',
      content: '错误信息：' + res
    })
  },
  checkToken: function () {
    let that=this;
    const token='token';
    wx.getStorage({
      key: token,
      success: function (res) {
        // 还存在jwt
        // console.log("还存在着jwt")
        that.globalData.token=wx.getStorageSync(token)
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
      fail: function (res) {
        // 首次登录
        // console.log("jwt不存在")
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })
  }
})