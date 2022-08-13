// pages/book/book.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    bookName:'',
    current: 1,
    size: 10
  },
  search: function (value) {
    this.clear()
    return new Promise((resolve, reject) => {
       this.getBookList(value)
    })
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
  // console.log("book")
 const {bookName,current,size}=this.data
  this.getBookList(bookName,current,size)
},
getBookList(bookName,current,size){
  const that=this
  this.setData({
    'bookName':bookName
  })
  wx.request({
    url: app.globalData.baseURL+"/liber/book/list",
    data:{
      "bookName":bookName,
      "current": current,
      "size": size
  },
    header:{
      'Content-Type': "application/json; charset=utf-8",
      'Authorization':app.globalData.token,
    },
    success(res){
      if(res.data.data.total<=that.data.listData.length){
        wx.showModal({
          showCancel:false,
          title:"提示",
          content:"已经没有更多的数据可以获取了",
          confirmText:"我知道了"
        })
      }else{
      let records=res.data.data.records
      that.setData({
        current:res.data.data.current+1,
      })
      that.setData({
        'listData':current>1? that.data.listData.concat(records):records
      });
    }
      // console.log(that.data.listData)
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
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
    this.getBookList('')
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