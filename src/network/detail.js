import { request } from './request'

//查找歌词
export function getLyric(iid){
  return request({
    url:'/lyric',
    params:{
      id: iid
    }
  })
}