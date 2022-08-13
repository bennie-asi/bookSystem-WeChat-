// pages/return/return.js
let util = require('../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    userInfo: {},
    hiddenmodalput: true,
    code: '',
    id: '',
    url: '',
    current: 1,
    size: 10
  },
  clear(){
    this.setData({
      'listData':[]
    }),
    this.setData({
      'size':1,
    })
  },
  lower(){
    // console.log("return")

    const {current,size} = this.data
    this.getReturnList(current,size)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'userInfo': app.globalData.userInfo
    })
  },
  getReturnList: function (current,size) {
    const that = this
    const {
      username
    } = this.data.userInfo
    wx.request({
      url: app.globalData.baseURL + "/liber/return/list",
      data: {
        'username': username,
        'current':current,
        'size':size
      },
      method: "GET",
      header: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': app.globalData.token,
      },
      success(res) {
        if (res.data.code == 200) {
          if(res.data.data.total<=that.data.listData.length){
            wx.showModal({
              showCancel:false,
              title:"提示",
              content:"已经没有更多的数据可以获取了",
              confirmText:"我知道了"
            })
          }else{
          let records=that.formatDate(res.data.data.records)
          that.setData({
            current:that.data.current+1,
          })
          that.setData({
            'listData': current>1? that.data.listData.concat(records):records
          });
        }
          
        } else {
          wx.showModal({
            showCancel: false,
            title: "出错啦",
            content: "获取待还书籍出错啦~"
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  formatDate(data) {
    /* 格式化时间使用 */
    let fdata = data
    fdata.forEach(element => {
      element.loanTime = util.formatTime(element.loanTime)
      element.preReturnTime = util.formatTime(element.preReturnTime);
    });
    return fdata
  },
  renew(e) {
    /* 续借 */
    this.setData({
      'id':e.currentTarget.dataset.id
    })
    this.setData({
      'hiddenmodalput': !this.data.hiddenmodalput
    })
    this.setData({
      'url': app.globalData.baseURL + "/liber/return/renew"
    })
  },
  returnBook(e) {
    /* 归还图书 */
    // console.log(e)
    this.setData({
      'id': e.currentTarget.dataset.id
    })
    this.setData({
      'hiddenmodalput': !this.data.hiddenmodalput
    })
    this.setData({
      'url': app.globalData.baseURL + "/liber/return/returnBook"
    })
  },
  confirm(){
    const that=this
    wx.request({
      url: this.data.url,
      header:{
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': app.globalData.token,
      },
      data:{
        'code':that.data.code,
        'id':that.data.id
      },
      method:'POST',
      success(res){
        wx.showModal({
          showCancel:false,
          title:res.data.code==200?"成功":"失败",
          content:res.data.code==200?res.data.data:res.data.msg
        })
        if(res.data.code==200){
          that.setData({
            'hiddenmodalput':!that.data.hiddenmodalput
          })
        }
      },
    })
  },
  cancel(){
    this.setData({
      'hiddenmodalput':!this.data.hiddenmodalput
    })
  },
  a(){

  },
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getReturnList()

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.clear()
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