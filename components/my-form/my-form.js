// components/my-form/my-form.js
Component({
  /**
   * 组件的属性列表
   */
  relations: {
    './my-form-element': {
      type: 'descendant', // 关联的目标节点应为子孙节点
    }
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    validate() {
      const slot = this.selectComponent(".slot")
      console.log(slot)
    }
  }
})
