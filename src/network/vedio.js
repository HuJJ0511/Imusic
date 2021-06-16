import { request } from './request'

//查找歌词
export function getSongMv(id){
  return request({
    url:'/mv/url',
    params:{
      id
    }
  })
}