/**
 * 异步请求方法
 */

 // 基础URL，方便更改
// export const baseURL = 'http://127.0.0.1:8080'
export const baseURL = 'http://192.168.43.196:8080'

export function request (url, data = {}, method = 'GET') {
  url = baseURL + url
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      success(res) {
        resolve(res.data)
      },
      fail(err){
        reject(err)
      }
    })
  }) 
}