import axios from 'axios'
import { Toast } from 'antd-mobile';
import { Response } from './entity.d';
const baseURL: string = process.env.NODE_ENV === 'production' ? 'api/' : '';
const timeout: number = 12000;
const reqeust = axios.create({
 timeout,
 transformRequest: [(data) => {
  data = JSON.stringify(data)
  return data
 }],
 transformResponse: [(data) => {
  if (typeof data === 'string' && data.startsWith('{')) {
   data = JSON.parse(data)
  }
  return data
 }]
});
// 请求拦截器
reqeust.interceptors.request.use((config) => {
 const { sid, uid } = JSON.parse(sessionStorage.getItem("user") || "{}");
 config.headers = {
  ...config.headers,
  SID: sid,
  UID: uid
 }
 config.url = `${baseURL}${config.url}`
 return config
}, (error) => {
 error.msg = '服务器异常，请联系管理员！'
 return Promise.resolve(error)
})

/**
 *响应拦截器
* 自定义状态处理
*/
reqeust.interceptors.response.use((response: Response) => {
 const { data } = response
 if (data.code !== 0) {
  const hasError = errorHandle(data)
  if (hasError) return Promise.reject(data)
 }
 return data;
}, (error) => {
 error = { response: {} }
 error.response.data = {}
 error.response.message = "请求超时或服务器异常，请检查网络或联系管理员！"
 return Promise.reject(error.response)
})

const errorHandle = (data: any) => {
 if (data.code === 201) {
  sessionStorage.clear()
  window.location.replace("/login");
  Toast.fail(data.message)
  return true;
 }
 Toast.fail(data.message)
 return true;
}
export default reqeust