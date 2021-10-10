import {request} from '../utils/request'

export function getSwiperData() {
  return request('/stuSwiperServlet')
}

export function getPlacesData() {
  return request('/getPlacesAvailableServlet')
}