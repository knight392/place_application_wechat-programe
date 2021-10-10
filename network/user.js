import {request} from '../utils/request'

/**
 * 学生登录
 * @param {*} s_no 
 * @param {*} s_password 
 */
export function login(s_no, s_password) {
 return  request('/studentLoginServlet', {s_no, s_password}, 'post')
}


/**
 * 用户头像更新
 * @param {*} s_no 
 * @param {*} s_avatar 
 */
export function update(s_no,s_avatar){
  return  request('/studentUpdateServlet', {s_no, s_avatar}, 'post')
}