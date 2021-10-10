// 
/**
 * 使用 selectros 找到表单中的 my-form-element组件,调用各自的validate方法
 * @param {*} selectors 
 * 返回表单的验证结果 true | false
 */
export default function(selectors) {
  const elements = this.selectAllComponents(selectors)
  let form_validate = true;
  console.log(elements)
  // 验证所有的输入组件数据
  for (let i = 0; i < elements.length; i++) {
    if (!elements[i].validate()) {
      form_validate = false;
    }
  }
  return form_validate
}