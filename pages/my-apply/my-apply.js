// pages/my-apply/my-apply.js

import {
  getAllApplications
} from '../../network/application'
let active = 0 // 默认展示页面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    s_no: '',
    all_data: null, // 全部申请
    ing_data: null, // 申请中
    amend_data: null, // 序补正
    complete_data: null // 已完成
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
    this.setData({
      active
    })
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
          s_no: data.s_no
        })
        // 获取数据
        getAllApplications(data.s_no).then(res => {
          console.log(res)
          that.handelData(res.data)
        }).catch(err => {
          console.log(err)
        })
      },
      fail() {
        wx.redirectTo({
          url: '/pages/login/login?path=/pages/my-apply/my-apply'
        })
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
   * 数据分类
   */
  handelData(data) {
    const ing_data = []
    const amend_data = []
    const complete_data = []
    this.setData({
      all_data: null, // 全部申请
      ing_data: null, // 申请中
      amend_data: null, // 序补正
      complete_data: null // 已完成
    })
    // 分类
    data.forEach(value => {
      const status = value.cur_status
      // 申请中
      if (status == 1) {
        ing_data.push(value)
        // 完成 = 通过 + 失败 + 中断
      } else if (status == 2 || status == 4 || status == 5) {
        complete_data.push(value)
        // 需补正
      } else if (status == 3) {
        amend_data.push(value)
      }
      this.setData({
        all_data: data,
        ing_data,
        complete_data,
        amend_data
      })
    })
  }


})