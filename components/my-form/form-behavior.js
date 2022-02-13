export default  Behavior( {
  properties: {
    rule: {
      type:Object,
      value: null
    },
  },
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