// components/my-form-element/my-form-element.js
Component({

  /**
   * 组件的属性列表
   */
  './my-form': {
    type: 'ancestor', // 关联的目标节点应为子孙节点
  },
  properties: {
    value: {
      type:String,
      value: ''
    },
    icon: {
      type: String,
      value:''
    },
    label: {
      type: String,
      value:''
    },
    type: {
      type: String,
      value:'text'
    },
    placeholder: {
      type: String,
      value:''
    },
    rule: {
      type:Object,
      value: null
    },
    clearable: {
      type:Boolean,
      value: false
    },
    required: {
      type: Boolean,
      value: false
    },
    errorMessage: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    message: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 有效性验证函数
    validate() {
      if( this.properties.rule == null || this.properties.rule.validator == null ){
        return
      }
      const res = this.properties.rule.validator(this.properties.value)
     
      if(!res){
        this.setData({
          message: this.properties.errorMessage
        })
      }else{
        this.setData({
          message: ''
        })
      }
      return res
    }
  }
})
