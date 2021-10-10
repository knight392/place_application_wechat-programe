// components/waterfall/waterfall.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemGap: {
      type: Number,
      value: 20
    },
    datas: {
      type: Array,
      value: []
    },
     // 是否登录
    isLogin:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fixWidth: 0, // 图片固定宽度
    leftHeight: 0, // 左列表高度
    rightHeight: 0, // 又列表高度
    leftData: [], // 左列表数据
    rightData: [], // 右列表数据
    datasIndex: 0, // 数据数组当前渲染下标
  },


  /**
   * 生命周期
   */
  lifetimes: {
    async attached() {
      // 获取 image 的固定宽度
      let width = await this.getFixWidth();
      this.setData({
        fixWidth: width
      })
    },
    ready() {
      // 不知为啥 一开始没有数据
      let timer = setInterval(() => {
        if (this.data.datas.length != 0 && this.data.fixWidth != 0) {
          clearInterval(timer)
          this.initImage()
        }
      }, 10)

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 初始化 place 的位置
     */
    initImage() {
      this.data.datas.forEach(() => {
        this.loadImage()
      })
    },


    /**
     * 获取 innerList 的固定宽度
     */
    getFixWidth() {
      return new Promise((resolve) => {
        this.createSelectorQuery().select("#leftList").boundingClientRect((rect) => {
          resolve(rect.width)
        }).exec()
      })
    },

    /**
     * 加载 datas 中的数据到leftList或rightList上
     */
    loadImage() {
      let {
        leftHeight,
        rightHeight
      } = this.data
      let curIndex = this.data.datasIndex
      // 浮点数不能做 == 比较

      if (leftHeight <= rightHeight) {
        const images = this.data.leftData;
        const item = this.data.datas[curIndex];
        images.push(item)
        // 计算缩放后的比例
        const imageHeight = this.data.fixWidth * item.image.height / item.image.width;
        leftHeight += imageHeight
        this.setData({
          leftData: images,
          leftHeight: leftHeight
        })
      } else {
        const images = this.data.rightData;
        const item = this.data.datas[curIndex];
        images.push(item)
        // 计算缩放后的比例
        const imageHeight = this.data.fixWidth * item.image.height / item.image.width;
        rightHeight += imageHeight
        this.setData({
          rightData: images,
          rightHeight: rightHeight
        })
      }
      this.setData({
        datasIndex: curIndex + 1
      })
    },

    /**
     * 路由跳转到申请表页
     * @param {*} e
     */
    toAplForm(e) {

      if (this.properties.isLogin) {
        const place = e.currentTarget.dataset.place
        wx.navigateTo({
          url: '/pages/apply-form/apply-form',
          success(res) {
            // 向申请表页面传入place_no place_name pro_no pro_form s_no s_name
            res.eventChannel.emit("acceptDataFromHome", {
              place_no: place.place_no,
              place_name: place.place_name,
              pro_no: place.aplProcedure.pro_no,
              pro_form_name: place.aplProcedure.pro_form_name
            })
          }
        })
      } else {
        wx.showToast({
          title: '请完成登录',
          icon: 'none',
          duration: 800
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }, 800)
      }
    }
  }
})