// pages/index/index.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    size:5,
    total:0,
    tableData:[],
    listData:[]
  },
  getBookList(){
    const {current,size}=this.data
    const that=this
    wx.request({
      url: app.globalData.baseURL+"/liber/book/list",
      data:{
        'current':current,
        'size':size,
      },
      header:{
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': app.globalData.token,
      },
      success(res){
        that.setData({
          'listData':res.data.data.records
        })
      }
    })
  },
  getNotify(){
    const {current,size}=this.data
    const that=this
    wx.request({
      url: app.globalData.baseURL+"/liber/notify/list",
      data:{
        'current':current,
        'size':size,
      },
      header:{
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': app.globalData.token,
      },
      success(res){
        that.setData({
          'tableData':res.data.data.records
        })
        that.setData({
          'current':res.data.data.current+1,
          'size':res.data.data.size,
          'total':res.data.data.total
        })
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
      this.getNotify()
      this.getBookList()
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