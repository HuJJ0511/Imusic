import { request } from './request'

export function getSongList(id){
  return request({
    url: '/playlist/detail',
    params:{
      id
    }
  })
}