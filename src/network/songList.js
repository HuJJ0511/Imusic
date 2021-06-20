import { request } from './request'

export function getSongList(id){
  return request({
    url: '/playlist/detail',
    params:{
      id
    }
  })
}

export function getSongListPlayList(id,limit,offset){
  return request({
    url: '/comment/playlist',
    params:{
      id,
      limit,
      offset
    }
  })
}