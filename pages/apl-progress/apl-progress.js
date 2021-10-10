// pages/progress/progress.js
import {getTeachersInProcedure} from '../../network/teacher'
import {getAplRecords} from '../../network/application'

let pro_no= '' // 流程编号
let apl_no= '' // 申请表标号
let cur_step = '' // 当前的审批进度
let place_name = ''  // 申请场地
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '申请填写'
      },
      {
        text: '申请提交'
      },
      // 插入
      // {
      //   text: 'xxx审批'
      // },
      {
        text: '已完成'
      },
    ],
    records:[
      {
        text: '加载中...',
        desc: '00-00-00 00:00:00'
      }
    ],
    cur_step: 0, // 当前进度
    place_name: '' // 申请场地
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    apl_no = options.apl_no
    pro_no = options.pro_no
    cur_step = options.cur_step
    place_name = options.place_name

    // 获取 该流程所包含的的教师
    getTeachersInProcedure(pro_no).then(res => {
      if(res.status == 200){
        console.log(res.data)
        let index = 2 // 代插入的初始数组下标
        const steps_arr = this.data.steps
        res.data.forEach(item => {
          steps_arr.splice(index ++, 0, {
            text: `${item.teacher_name}审批`
          })
        })
        this.setData({
          steps:steps_arr
        })
      }else{
        console.log(res.info)
      }
    }).catch(err => {
        console.log(err)
    })

    // 获取 申请表的记录
    getAplRecords(apl_no).then(res => {
      if(res.status == 200){
        const records = res.data.map(item => {
          return {
            text: item.status_info,
            desc: item.status_time.slice(0, -2)
          }
        })
        this.setData({
          records
        })
      }else{
        this.setData({
         records: [{
            text: '加载失败',
            desc: '00-00-00 00:00:00'
          }]
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      apl_no,
      pro_no,
      cur_step,
      place_name
    })
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