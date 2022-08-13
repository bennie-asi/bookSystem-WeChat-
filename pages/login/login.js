// pages/login/login.js
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    captchaImg:null,
    code:'',
    token:'',
  },

  formSubmit:function(e){
    let that=this
    wx.request({
      url: app.globalData.baseURL+'/login',
      data:{
        'username':e.detail.value.username,
        'password':e.detail.value.password,
        'code':e.detail.value.code,
        'token':this.data.token,
      },
      dataType:'json',
      header:{
        'content-type':'application/x-www-form-urlencoded;charset=utf-8'
      },
      method:"POST",
      success:function(res){
      let code=res.data.code
      let msg=res.data.msg
        if(code==200){
          const jwt=res.header.Authorization
          app.globalData.token=jwt
          wx.setStorageSync('token', jwt)
          wx.showToast({
            title: '登录成功',
            icon:'success',
            duration:1000
          })
          // 登录后跳转到主页
          wx.switchTab({
            url: '../index/index',
            fail:function(res){
              wx.redirectTo({
                url: '../login/login',
              })
            }
          })
        }else{
          that.getCaptcha()
          wx.showModal({
            showCancel:false,
            title:'登录失败',
            content:msg,
          })
        }
      },
      fail:function(res){
        wx.showModal({
          title:'连接服务器失败',
          content:res.data.msg
        })
      }
    })
  },
  getCaptcha:function(){
    var that=this;
    wx.request({
      url: app.globalData.baseURL+'/captcha',
      method:'GET',
      success:function(res){
        var base64=res.data.data.captchaImg;
        if(base64){
          base64=base64.replace(/[\r\n]/g, '');
        }
        that.setData({
          'captchaImg':base64
        });
        that.setData({
          'code':''
        })
        that.setData({
          'token':res.data.data.token
        })
      },
      fail:function(res){
        console.log(res);
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  toIndex(){
    wx.getStorage({
      key:'token',
      success(res){
        // console.log(res)
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
    
  },
  onLoad: function (options) {
    this.getCaptcha();
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
    this.toIndex()
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