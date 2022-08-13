// pages/self/self.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      currentPass: '',
      password: '',
      checkPass: '',
    },
    userInfo: {
      username: 'Demo',

    },
    errorMsg: '', //验证表单显示错误信息

    rules: [{
        name: 'currentPass',
        rules: {
          required: true,
          message: '旧密码不能为空'
        },
      },
      {
        name: 'password',
        rules: {
          required: true,
          message: '新密码不能为空'
        }
      },
      {
        name: 'checkPass',
        rules: {
          required: true,
          message: '确认新密码不能为空'
        },
      }
    ]
  },
  externalClasses: ['form_item', 'form_item_region'],
  // 表单赋值
  formInputChange(e) {
    // console.log(e)
    const {
      field
    } = e.currentTarget.dataset;
    this.setData({
      [`form.${field}`]: e.detail.value
    })
  },
  weSubmitForm() {
    const {
      currentPass,
      password,
      checkPass
    } = this.data.form
    const that=this
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            errorMsg: errors[firstError[0]].message
          })
        }
      } else if (valid) {
        wx.showModal({
          title: '更改密码',
          content: '确认更改密码吗？',
          success: function (res) {
            if (res.confirm) {
              wx.request({
                url: app.globalData.baseURL + '/sys/user/updatePass',
                method:"POST",
                data:{
                  'currentPass':currentPass,
                  'password':password,
                  'checkPass':checkPass
                },
                header:{
                  'Content-Type': "application/json; charset=utf-8",
                  'Authorization':app.globalData.token,
                },
                success(res){
                  that.showModal(res)
                }
              })
            }
          }
        })

      }

    })
  },
  showModal(res){
    wx.showModal({
      title:res.data.code==400?'改密出错':'改密成功',
      content:res.data.code==400?res.data.msg:res.data.data,
      showCancel:false
    })
  },
  restForm() {
    this.setData({
      'form.currentPass': '',
      'form.password': '',
      'form.checkPass': ''
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserInfo()
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