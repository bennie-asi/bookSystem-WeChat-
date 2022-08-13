const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  exit:function(){
    let that=this
    wx.showModal({
      title:"退出",
      content:"确认退出登录吗？",
      success(res){
        if(res.confirm){
          that.logout();
          // console.log("ok")
        }else if(res.cancel){
          // console.log("no")
        }
      }
    })
  },
  logout:function(){
    wx.request({
      url: app.globalData.baseURL+'/logout',
      success(res){
        wx.clearStorageSync();
        app.globalData.token='';
        wx.redirectTo({
          url: '../login/login',
        })
      }
    })
  },
  getUserInfo:function(){
    wx.request({
      url: app.globalData.baseURL+"/sys/userInfo",
      header: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': app.globalData.token,
      },
      success(res){
        app.globalData.userInfo=res.data.data
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getUserInfo()
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