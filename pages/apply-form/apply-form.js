// pages/apply-form.js

const app = getApp()

const beginTimeCheck = (value) => {
  if (value == 0) {
    return false
  } else {
    return true
  }
}

const endTimeCheck = (value) => {
  console.log("结束时间检查", value)
  if (value == 0) {
    return false
  } else {
    return true
  }
}


const purposeCheck = (value) => {
  if (value == '') {
    return false
  } else {
    return true
  }
}

const orgCheck = (value) => {
  if (value == '') {
    return false
  } else {
    return true
  }
}

const tutorCheck = (value) => {
  if (value == '') {
    return false
  } else {
    return true
  }
}

const phoneCheck = (value) => {
  if (value == '' || !reg_tel.test(value)) {
    return false
  } else {
    return true
  }
}


const MSG_ERR = {
  begin_time: '请选择开始时间',
  end_time: '请选择结束时间',
  purpose: '申请目的必填',
  org: '组织名称必填',
  tutor: '指导老师必填',
  phone: '联系电话必填',
  phone_reg: '电话号码格式有误'
}
import validate from './../../utils/form-validate'
import Toast from './../../miniprogram_npm/@vant/weapp/toast/toast'
import {
  submit
} from '../../network/application'



const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/; //11位手机号码正则



Page({
  /**
   * 页面的初始数据
   */
  data: {
    // data里的数据，可以不提前声明，它就像一个普通对象，当调用this.setData时，增加新的属性，覆盖已有属性
    apl_no: 0,
    pro_form_name: '', // 申请表名称
    pro_no: '', // 申请流程编号
    place_no: '', // 目的场地编号
    place_name: '', // 目的场地名
    s_no: '', // 申请人学号,
    s_name: '', // 申请人姓名,
    begin_time: 0, // 开始时间, 毫秒数
    end_time: 0, // 结束时间， 毫秒数
    min_endTime: 0, // 结束时间最小值，毫秒数，begin_time + 3600000
    endTime_avaliable: false, // 结束时间picker是否可用
    end_time_show: null, // 用来展示时间，方便修改开始时间后，结束时间重置
    purpose: '', // 场地用途
    org_name: '', // 组织名称
    tutor_name: '', // 指导老师
    s_phone: '', // 联系电话
    MSG_ERR,
    submitType: 'submit',  // 默认是初次提交方式， 补正是  correct
    rules: {
      purpose: {
        validator: purposeCheck
      },
      beginTime: {
        validator: beginTimeCheck
      },
      endTime: {
        validator: endTimeCheck
      },
      org: {
        validator: orgCheck
      },
      tutor: {
        validator: tutorCheck
      },
      phone: {
        validator: phoneCheck
      }
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 使用事件渠道进行两页面数据通信
    const eventChannel = this.getOpenerEventChannel()
    // 只是绑定事件，并不是说 在 onLoad 就设置 data
    eventChannel.on("acceptDataFromHome", (data) => {
      this.setData(
        data
      )
    })

    // 接收从申请表详情页来的数据，准备补正
    eventChannel.on("correctApl", (data) => {
      this.setData({
        apl_no: data.apl_no,
        pro_no: data.aplProcedure.pro_no,
        pro_form_name: data.aplProcedure.pro_form_name,
        place_name:data.place.place_name,
        purpose: data.purpose,
        s_phone: data.s_phone,
        tutor_name: data.tutor_name,
        org_name: data.org_name,
        begin_time: new Date(data.begin_time).getTime(),
        min_endTime:  new Date(data.begin_time).getTime() + 3600000,
        end_time: new Date(data.end_time).getTime(),
        submitType: 'correct'
      })
      console.log(data)
    })

    app.watch(this, {
      begin_time: function (newVal) {
        this.setData({
          end_time: 0,
          min_endTime: newVal + 3600000
        })
      }
    })

    const that = this
    // 读取 localStorage 的 s_no 和 s_name
    wx.getStorage({
      key: 'student',
      success(res) {
        const data = JSON.parse(res.data)
        that.setData({
          s_no: data.s_no,
          s_name: data.s_name
        })
      }
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

  


  timeFormatter(d) {
    const year = d.getFullYear();
    const month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
    const day = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
    const hour = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
    const minute = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
    const ss = (d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${ss}`
  },

  selectEndTime() {
    if (this.data.begin_time != 0) {
      this.setData({
        endTime_avaliable: true
      })
    } else {
      this.setData({
        endTime_avaliable: false
      })
      Toast({
        message: '请先选择开始时间',
        position: 'bottom'
      });
    }
  },

  // 表单验证
  validate,

  /**
   * 表单提交
   */
  formSubmit(e) {
    const selectors = e.currentTarget.dataset.selectors
    // console.log(selectors)
    if (this.validate(selectors)) {
      Toast.loading({
        message:'提交中',
        duration: 0
      })
      console.log('验证通过')
      const aplObj = this.getAplObj()
      submit(aplObj, this.data.submitType).then(res => {
        if (res.status == 200) {
          wx.showToast({
            title: '提交成功',
            duration: 800
          })
          setTimeout(() => {
            if(this.data.submitType == 'submit'){
              wx.navigateBack()
            }else if(this.data.submitType == 'correct'){
              wx.navigateBack({
                delta: 2,
              })
            }
          }, 800)
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'error',
            duration: 800
          })
        }
      }).catch(err => {
        console.log(err)
        wx.showToast({
          title: '提交异常',
          icon: 'error',
          duration: 800
        })
        
      }).finally(()=>{
        Toast.clear()
      })
    } else {
      console.log("失败")
    }
    // console.log(e)
  },

  /**
   * 获取申请表对象
   */
  getAplObj() {
    // 流程对象
    const aplProcedure = {
      pro_no: this.data.pro_no
    }
    // 学生对象
    const student = {
      s_no: this.data.s_no
    }
    // 场地对象
    const place = {
      place_no: this.data.place_no
    }
    return {
      apl_no: this.data.apl_no,
      aplProcedure,
      student,
      place,
      org_name: this.data.org_name,
      s_phone: this.data.s_phone,
      purpose: this.data.purpose,
      tutor_name: this.data.tutor_name,
      begin_time: this.timeFormatter(new Date(this.data.begin_time)),
      end_time: this.timeFormatter(new Date(this.data.end_time))
    }
  }
})