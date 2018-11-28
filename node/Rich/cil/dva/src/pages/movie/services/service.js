import request from '../../../utils/request'
// 筛选电影
export function FetchList () {
  return request('/Movie/GetMovieList')
}
// 单个电影
export function FetchVod (id) {
  return request(`/Movie/GetMovieVod/${id}`)
}
// 获取分组
export function FetchGroup (id) {
  return request('/Movie/GetGroup')
}
// 创建分组
export function CreateGroup (data) {
  return request('/Movie/CreateGroup', { method: 'post', data })
}
// 修改分组
export function UpdateGroup (data) {
  return request('/Movie/UpdateGroup', { method: 'post', data })
}
// 获取专题
export function FetchTopic (id) {
  return request('/Movie/getTopic')
}
