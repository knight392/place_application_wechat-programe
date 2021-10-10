// components/apl-card/apl-card.js
import {classify, classifyColor} from '../../utils/classifyStatus'
import {
  baseURL
} from '../../utils/request'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    aplCard: {
      type: Object,
      value: null
    }
  },

  lifetimes: {
    attached() {
      this.setData({
        status: classify(this.properties.aplCard.cur_status),
        begin_time: this.properties.aplCard.begin_time.slice(0, -5),
        end_time: this.properties.aplCard.end_time.slice(0, -5),
        img_path: baseURL + this.properties.aplCard.place.image.path,
        fontColor: classifyColor(this.properties.aplCard.cur_status)
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: '',
    begin_time: '',
    end_time: '',
    img_path: '',
    fontColor: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 导航到进度页面
     */
    toProgress() {
      wx.navigateTo({
        url: `/pages/apl-progress/apl-progress?apl_no=${this.data.aplCard.apl_no}&pro_no=${this.data.aplCard.aplProcedure.pro_no}&cur_step=${this.data.aplCard.cur_step}&place_name=${this.data.aplCard.place.place_name}`
      })
    },
    /**
     * 导航到详情页面
     */
    toDetail() {
      const data = this.data
      wx.navigateTo({
        url: '/pages/apl-detail/apl-detail',
        success(res) {
          res.eventChannel.emit("acceptApl", {
            begin_time: data.begin_time,
            end_time: data.end_time,
            apl: data.aplCard,
            status: data.status,
            fontColor: data.fontColor
          })
        }
      })
    }
  }


})