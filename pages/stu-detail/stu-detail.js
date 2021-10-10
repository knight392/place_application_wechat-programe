// pages/stu-detail/stu-detail.js

import {
  update
} from './../../network/user'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_no: '',
    s_name: '',
    s_dwmc: '',
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
        that.setData(data)
      },
      fail() {
        wx.switchTab({
          url: '/pages/mine/mine',
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

  // 退出登录
  logout() {
    wx.showToast({
      icon: 'loading',
      mask: true
    })

    wx.removeStorage({
      key: 'student',
      success(res) {
        console.log(res)
        wx.hideToast()
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    })
  },

  /**
   * 获取用户微信头像
   */
  getUserProfile() {
    const that = this
    wx.getUserProfile({
      desc: 'desc',
      lang: 'zh_CN',
      success: (result) => {
        const s_avatar = result.userInfo.avatarUrl
        // 上传新头像url
        update(this.data.s_no, s_avatar).then(res => {
          if (res.status == 200) {
            wx.setStorage({
              key: 'student',
              data: JSON.stringify({
                s_avatar,
                s_dwmc: this.data.s_dwmc,
                s_no: this.data.s_no,
                s_name: this.data.s_name
              }),
              success() {
                that.setData({
                  s_avatar
                })
                wx.showToast({
                  title: '更新成功',
                })
              }
            })
          } else {
            wx.showToast({
              title: '头像更新异常',
              icon: 'none'
            })
          }
        })
      }
    })
  }
})