// pages/loan/loan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    copyNum: '',
    userInfo:{},
    code:''
  },
  getUserInfo:function(){
    const that=this
    wx.request({
      url: app.globalData.baseURL+"/sys/userInfo",
      header: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': app.globalData.token,
      },
      success(res){
        that.setData({
          'userInfo':res.data.data
        })
      }

    })
  },
  submitForm:function(e){
    const {code,userInfo,copyNum}=this.data
    const that=this
    wx.request({
      url: app.globalData.baseURL+"/liber/loan/save",
      method:"POST",
      data:{
        'code':code,
        'username':userInfo.username,
        'copies':[{"copyNum":copyNum}]
      },
      header:{
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': app.globalData.token,
      },
      success(res){
        wx.showModal({
          showCancel:false,
          title:res.data.code==200?"借阅成功":"借阅失败",
          content:res.data.cod==200?(res.data.data):(res.data.msg)
        })
      }
    })
  },
  a(){

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
    this.setData({
      'copyNum': app.globalData.copyNum
    })
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