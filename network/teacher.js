import {request} from '../utils/request'

/**
 * 获取流程中的包含的教师
 * @param {String} pro_no 流程编号
 */
export function getTeachersInProcedure(pro_no){
  return request('/getTeachersInProcedure', {pro_no}, 'get')
}