// components/datetime-picker/datetime-picker.js
// 当前时间
import formBehavior from './form-behavior.js'

const app = getApp()
const curDatetime = new Date();

Component({
  options: {
    styleIsolation: 'shared',
  },

  relations: {
    './my-form': {
      type: 'parent'
    }
  },
  behaviors: [
    formBehavior
  ],

  /**
   * 组件的属性列表
   */
  properties: {
    time: null,
    mode: {
      type: String,
      value: 'datetime'
    },
    placeholder: {
      type: String,
      value: '点击选择时间'
    },
    label: {
      type: String,
      value: '时间选择'
    },
    pickerTitle: {
      type: String,
      value: ''
    },
    required: {
      type: Boolean,
      value: false
    },
    errorMessage: {
      type: String,
      value: ''
    },
    minDate: {
      type: Number,
      // 最小值默认是程序运行时刻
      value: curDatetime.getTime()
    },
    maxDate: {
      type: Number,
      // 最大值默认值当前时间的后一年的12月31日
      value: new Date(curDatetime.getFullYear() + 1, 11, 31).getTime()
    },
    avaliable: {
      type: Boolean,
      value: true
    },
    value: {
      type: Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPicker: false,
    message: ''
  },

  lifetimes: {
    attached: function() {
      let that = this
      // 在组件实例进入页面节点树时执行
     app.watch(this, {
       value: function(newVal) {
        if(newVal == 0) {
          that.setData({
            time:null
          })
        }else{
          that.setData({
            time:that.timeFormatter(new Date(newVal))
          })
        }
       }
     })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 打开
    onOpen() {
      if(this.properties.avaliable){
        this.setData({
          showPicker: true
        })
      }
    },
    /**
     * 
     * @param {Date} d 
     */
    timeFormatter(d){
      const year = d.getFullYear();
      const month = (d.getMonth()+1) >= 10 ? (d.getMonth()+1) : '0' + (d.getMonth()+1);
      const day = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
      const hour = d.getHours() >= 10 ? d.getHours(): '0' + d.getHours();
      const minute = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
      return  `${year}-${month}-${day} ${hour}:${minute}`
    },

    // 选定
    onConfirm(e) {
      this.onHiden()
      // 设置time值
      this.setData({
        value: e.detail,
        message: ''
      })
    },
    

    // 取消
    onHiden() {
      this.setData({
        showPicker: false
      })
    }
  }
})