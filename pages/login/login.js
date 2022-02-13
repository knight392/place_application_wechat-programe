const snoREG = /^\d{9}$/
const checkSno = (value) => {
  if (value == '' || !snoREG.test(value)) {
    return false
  } else {
    return true
  }
}
const checkPass = (value) => {
  if (value == '') {
    return false
  } else {
    return true
  }
}

import {
  login
} from '../../network/user'
import validate from './../../utils/form-validate'

import Toast from './../../miniprogram_npm/@vant/weapp/toast/toast';
let backPath = ''    // 可以在 url 后面 传入登录成功后的返回路径
// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sno: '', // 学号
    pass: '', // 密码
    rules: {
      sno: {
        validator: checkSno,
        trigger: "blur"
      },
      pass: {
        validator: checkPass,
        trigger: "blur"
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 通过option 来获取 url 后面的参数
    backPath = options.path
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

  // 必须要设置成本对象this的方法
  validate,
  /**
   * 表单提交
   */
  loginSubmit(event) {
    const selectors = event.currentTarget.dataset.selectors
    if (this.validate(selectors)) {
      // 提交表单
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        mask: true,
        message: '加载中',
        selector: '#login-loading',
      });
      setTimeout(() => {
        login(this.data.sno, this.data.pass).then(res => {
          toast.clear()
          if (res.status != 200) {
            Toast({
              message: "学号或密码有误",
              selector: "#login-fail",
              position: 'bottom'
            })
          } else {
            // 保存数据到 localstorage
            const data = res.data
            const that = this
            console.log(data)
            wx.setStorage({
              key: 'student',
              data: JSON.stringify({
                s_no: data.s_no,
                s_name: data.s_name,
                s_dwmc: data.s_dwmc,
                s_avatar: data.s_avatar // 如果头像没空不会保存该属性
              }),
              success() {
                if (backPath) {
                  wx.switchTab({
                    url: backPath,
                  })
                } else {
                  // 页面跳转
                  wx.navigateBack()
                }
              }
            })
          }
        }).catch(err => {
          toast.clear()
          console.log(err)
          Toast.fail({
            message: "登录异常",
            selector: "#login-fail2"
          })
        })
      }, 100)


    } else {
      // 报错
      console.log("失败")
      Toast({
        message: "登录信息不完整",
        selector: "#login-fail",
        position: 'bottom'
      })
    }
    console.log(this.data.sno, this.data.pass)
  }
})