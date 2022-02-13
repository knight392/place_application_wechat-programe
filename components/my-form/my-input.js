// components/my-form-element/my-form-element.js
import formBehavior from './form-behavior.js'

Component({

  /**
   * 组件的属性列表
   */
  behaviors: [
    formBehavior
  ],

  relations: {
    './my-form': {
      type: 'parent'
    }
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
  
  }
})
