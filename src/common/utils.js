//获取时间
export function getTime(time){
  let hour = parseInt(time / 3600)
  let minutes = parseInt(time % 3600 / 60)
  let second = parseInt(time % 60);

  hour >= 1 ? hour = hour + ":" : hour = '';

  minutes < 10 ? minutes = "0" + minutes : minutes = minutes;

  second < 10 ? second = "0" + second : second = second;

  return hour + minutes + ":" + second
}

export function formatDate(date, fmt) {
  //获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),//h和H h是12小时 H是24小时
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

//简单防抖
export function debounce(func,delay){
  let timer = null
  return function(...args){
    if(timer)clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}