// pages/apl-detail/apl-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apl: null, // 申请表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 使用事件渠道进行两页面数据通信
    const eventChannel = this.getOpenerEventChannel()
    // 只是绑定事件，并不是说 在 onLoad 就设置 data
    eventChannel.on("acceptApl", (data) => {
      // 接受 申请表信息
      this.setData(
        data
      )
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
   * 导航到 apl-form 进行申请表补正
   */
  rewriteApplication(){
    const data = this.data
    wx.navigateTo({
      url: '/pages/apply-form/apply-form',
      success(res) {
        res.eventChannel.emit("correctApl", data.apl)
      }
    })
  }
})