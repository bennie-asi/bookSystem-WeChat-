const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    captchaImg: null,
    code: '',
    token: '',
  },

  formSubmit: function (e) {
    wx.request({
      url: app.globalData.baseURL + '/register',
      data: {
        'username': e.detail.value.username,
        'password': e.detail.value.password,
        'email': e.detail.value.email,
        'phone': e.detail.value.phone,
        'major': e.detail.value.major,
        'code': e.detail.value.code,
        'token': this.data.token,
      },
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.data.status == 400) {
          wx.showModal({
            title: res.data.error,
            content: res.data.errors[0].defaultMessage
          })
          return
        }
        let code = res.data.code
        let msg = res.data.data
        if (code == 200) {
          // 注册后跳转到login
          wx.showModal({
            title: '注册成功',
            content: msg,
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1,
                })
              }
            }
          })

        } else {
          wx.showModal({
            title: '注册失败',
            content: res.data.msg,
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '连接服务器失败',
          content: res.data.msg
        })
      }
    })
  },
  getCaptcha: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseURL + '/captcha',
      method: 'GET',
      success: function (res) {
        var base64 = res.data.data.captchaImg;
        if (base64) {
          base64 = base64.replace(/[\r\n]/g, '');
        }
        that.setData({
          'captchaImg': base64
        });
        that.setData({
          'code': ''
        })
        that.setData({
          'token': res.data.data.token
        })
      },
      fail: function (res) {
        console.log(res);
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
  onPullDownRefresh: function () {},

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