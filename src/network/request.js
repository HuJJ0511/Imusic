import axios from 'axios'

export function request(config){
  //1.创建axios实例
  const baseUrl = axios.create({
    baseURL: '/api',//基本路径
    setTimeout: 30000//超时
  })

  //2.axios的拦截器
  //2.1.请求拦截的作用
  baseUrl.interceptors.request.use(config => {
    return config
  },err =>{

  })

  //2.2.响应拦截
  baseUrl.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  })

  return baseUrl(config)
}