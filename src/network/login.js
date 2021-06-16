import { request } from "./request";

export function getLogin(phone,password,timestamp=new Date().getTime()){
  return request({
    url: '/login/cellphone',
    params: {
      phone,
      password,
      timestamp
    }
  })
}

export function getLoginOut(){
  return request({
      url: '/logout',
  })
}