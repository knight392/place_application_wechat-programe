// pages/mine/mine.js



Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_name: '',
    s_avatar: '/static/images/avatar.png'
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
    const that = this
    wx.getStorage({
      key: 'student',
      success(res) {
        const data = JSON.parse(res.data)
        that.setData({
          s_name: data.s_name,
          s_avatar: data.s_avatar ? data.s_avatar : '/static/images/avatar.png'
        })
      },
      fail() {
        that.setData({
          s_name: '',
          s_avatar: '/static/images/avatar.png'

        })
        console.log("失败")
      },
      complete() {
        console.log("结束")
      }
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

  },

  /**
   * 打开用户登录页面或用户详情页面
   */
  onUserTap() {
    if (this.data.s_name != '') {
      wx.navigateTo({
        url: '/pages/stu-detail/stu-detail',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  /**
   * 去申请页面
   */
  toAplPage(e){
    wx.switchTab({
      url: '/pages/my-apply/my-apply'
    })
  }
})