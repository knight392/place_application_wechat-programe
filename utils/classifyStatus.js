/**
 * 根据 cur_status 分类
 * @param {Number} num cur_status
 */
export function classify(num) {
  let status = ''
  if(num == 1){
    status = '审批中'
  }else if(num == 2){
    status = '审批通过'
  }else if(num == 3){
    status = '需补正'
  }else if(num == 4){
    status = '审批拒绝'
  }else if(num == 5){
    status = '审批中断'
  }
  return status
}

/**
 * 根据 cur_status 分字体颜色
 * @param {Number} num 
 */
export function classifyColor(num){
  let color = "#758bfd"
  if(num == 1){
    color = '#758bfd' // 紫
  }else if(num == 2){
    color = '#67C23A' // 绿
  }else if(num == 3){
    color = '#E6A23C' // 黄
  }else if(num == 4 || num == 5){
    color = '#F56C6C' // 红
  }
  return color;
}