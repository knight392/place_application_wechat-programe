// components/my-form/my-form.js
const children = [];
Component({
  /**
   * 组件的属性列表
   */
  relations: {
    './my-datetime-picker': {
      type: 'child', // 关联的目标节点应为子孙节点
      linked(target){
        children.push(target)
      }
    },
    './my-input': {
      type:'child',
      linked(target){
        children.push(target)
      }
    } 
  },
 

  /**
   * 组件的初始数据
   */
  data:{
    // 深拷贝
    // children
  },

  lifetimes: {
    attached(){
      // 是浅拷贝
      this.setData({
        children
      })
    }
  },



  
  /**
   * 组件的方法列表
   */
  methods: {
    validate() {
      // if(this.properties.selectors === ''){return true}
      // const elements = this.selectAllComponents(this.properties.selectors)
      let form_validate = true;
      // 验证所有的输入组件数据
      for (let i = 0; i < this.data.children.length; i++) {
        // 没办法不能获取 methods 对象，只能把子组件 validate 再写一遍 
        if(this.data.children[i].data.rule?.validator){
          if (!this.data.children[i].data.rule.validator(this.data.children[i].data.value)) {
            this.data.children[i].setData({
              message: this.data.children[i].properties.errorMessage
            })
            form_validate = false;
          }else{
            this.data.children[i].setData({
              message: ''
            })
          }
        }
      }
      return form_validate
    }
  }
})
