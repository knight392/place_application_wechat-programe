import {getSwiperData, getPlacesData} from '../../network/home'
import {baseURL} from '../../utils/request'
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    bannerList: [],
    baseURL,
    placeList: [],
    isLogin: false // 是否登录
  },
  // 事件处理函数
  bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs'
      })
  },

  /**
   * 生命周期函数-监听页面加载完成
   */
  onLoad() {
     // 获取轮播图数据
     getSwiperData().then(res => {
      this.setData({
        bannerList: res.data
      })
    }).catch(err => {
      console.log(err)
    })

    // 获取场地数据
    getPlacesData().then(res => {
      this.setData({
        placeList: res.data
      })
    }).catch(err => {
      console.log(err)
    })

  },

  /**
   * 生命周期函数-监听页面初次加载完成
   */
  onReady() {
     
  },

  /**
   * 生命周期函数-监听页面显示
   */
  onShow() {
    const that = this
    wx.getStorage({
      key:'student',
      success(){
        that.setData({
          isLogin: true
        })
      },
      fail() {
        that.setData({
          isLogin: false
        })
        console.log("失败")
      },
      complete() {
        console.log("结束")
      }
    })
  },

  /**
   * 生命周期函数-监听页面隐藏
   */
  onHide() {

  },
})
