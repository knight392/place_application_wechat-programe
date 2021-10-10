import {request} from '../utils/request'

/**
 * 提交申请表
 * @param {*} aplForm 申请表对象
 * @param {*} submitType 提交方式 submit | correct
 */
export function submit(aplForm, submitType = 'submit') {
  if(submitType == 'submit'){
    return request('/submitApplicationServlet', aplForm, 'post')
  }else if(submitType == 'correct'){
    return request('/updateApplicationServlet', aplForm, 'post')
  }
}


/**
 * 获取用户所有提交的申请表
 * @param {*} s_no 
 */
export function getAllApplications(s_no){
  return request('/getApplicationsServlet', {s_no}, 'get')
}


/**
 * 获取申请表对应的编号
 * @param {Numner} apl_no 
 */
export function getAplRecords(apl_no){
  return request('/getAplRecordsServlet', {apl_no}, 'get')
}