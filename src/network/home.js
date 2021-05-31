import { request } from './request'

export function getSwiper(){
  return request({
      url:"/banner",
  })
}

export function getSearchAll(keywords,limit=30,offset=0,type=1){
  return request({
    url:"/search",
    params:{
      keywords,
      limit,
      offset,
      type,
    }
  })
}

export function getMusicUrl(id){
  return request({
    url:"/song/url",
    params:{
      id
    }
  })
}

export function getSongDetail(iid){
  return request({
    url:"/song/detail",
    params: {
      ids: iid
    }
  })
}