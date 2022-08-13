// pages/bookInfo/bookInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: null,
    bookInfo: {
      author: "",
      bookName: "",
      copyIn: null,
      copySum: null,
      created: "",
      id: 4,
      isbn: "",
      press: "",
      pressTime: "",
      remark: "",
      statu: 0,
      updated: "",
    },
    copyList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'bookId': options.bookId
  
    })
  },
  getBookInfo: function () {
    const that = this
    wx.request({
      url: app.globalData.baseURL + "/liber/book/info/" + that.data.bookId,
      header: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': app.globalData.token,
      },
      success: function (res) {
        that.setData({
          bookInfo: res.data.data
        })
        // console.log(res.data.data)
      }

    })
  },
  tocopyNum:function(e){
    /* 跳转到tabBar界面 数据通过全局变量传递 */
    app.globalData.copyNum=e.currentTarget.dataset.copynum
    wx.switchTab({
      url: '../loan/loan',
    })
  },
  getCopyList(){
    const that = this
    wx.request({
      url: app.globalData.baseURL + "/liber/book/copyList/" + that.data.bookId,
      header: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': app.globalData.token,
      },
      success: function (res) {
        that.setData({
          copyList: res.data.data
        })
        // console.log(res.data.data)
      }

    })
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
    this.getBookInfo()
    this.getCopyList()
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