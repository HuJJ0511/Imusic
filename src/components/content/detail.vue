<template>
  <div class="detail">
    <div class="detail-left">
      <div class="detail-song-img">
        <img :src="songImg" alt="">
      </div>
    </div>
    <div class="detail-right">
      <div class="song-title">
        <div class="detail-songName">
          <span>{{songName}}</span>
          <div class="el-icon-video-camera" @click="getSingingMv" v-show="active"></div>
        </div>
        <div class="detail-singer">歌手：{{singer}}</div>
        <div class="detail-album">专辑：{{album}}</div>
      </div>
      <div class="lyric" ref="lyricMove">
        <div :style="lyricMove">
          <div class="lyric-sroll" v-for="(item,i) in lyricObj" :key="i"
           :class="{'lyric-ative': currentRow === i ? 'red':''}" :data-index='i' ref="lyric">{{item.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLyric } from 'network/detail'
import { getSongMv } from 'network/vedio'

export default {
  name: 'detail',
  data(){
    return{
      iid: null,
      lyric: null,
      lyricObj: [],
      songImg: "",
      songName: null,
      singer: null,
      album: null,
      currentTime: null,
      lyricMove:'',
      currentRow: null,
      mv: null,
      active: null
    }
  },
  mounted(){
    const params = this.$route.params
    this.iid = params.id
    this.songImg = params.img
    this.songName = params.songName
    this.singer = params.singer
    this.album = params.album
    console.log(params.mv)
    if(params.mv != 0){
      this.mv = params.mv
      this.active = true
    }else{
      this.active = false
    }

    getLyric(this.iid).then(res => {
      if (res.lrc != null) {
        this.lyric = res.lrc.lyric
        this.getLyricObj(this.lyric)
      }
      // console.log(res)
    })

    this.$bus.$on("getCurrentTime",res => {
      this.currentTime = res.toFixed(1)
    })
  },
  methods:{
    getLyricObj(lyric){
      if (lyric != null) {
        let arr = lyric.split("\n");//原歌词文本已经进行换行，直接通过换行符“\n”数组
        let row = arr.length;//获取歌词行数
        for(let i = 0;i < row;i++){
          let lyric_row = arr[i]//获取每一行歌词
          let lyric_arr = lyric_row.split("]")//通过“]”对时间和文本进行分离
          let text = lyric_arr.pop();//获取歌词文本
          //下面是对歌词对应时间处理
          lyric_arr.forEach(element => {
            let obj = {};
            let time_arr = element.substr(1,element.length - 1).split(":");//去掉多余的[],把分秒分离
            console.log(time_arr[0]*60)
            let s = (time_arr[0] * 60 + (time_arr[1]-0)).toFixed(1);//把时间换成秒
            obj.time = s;
            // console.log(obj.time)
            obj.text = text;
            this.lyricObj.push(obj)
          });
        }
        //设置歌词排序
        this.lyricObj.sort((a,b) => {
          return a.time - b.time
        })
        // console.log(this.lyricObj)
      }else{
        console.log(lyric)
      }
    },
    //获取mv地址跳转到mv界面,且音乐暂停
    getSingingMv(){
      console.log(this.mv)
      getSongMv(this.mv).then(res => {
        this.$router.push({
          name: '/songmv',
          params:{
            mvUrl: res.data.url,
            poster: this.songImg
          }
        })
      })
      this.$bus.$emit("getActive")
    }
  },
  watch:{
    currentTime(){
      // this.lyricObj.forEach((element,index) => {
      //   if(this.currentTime <= element.time){
      //     // this.lyricMove.top = -index * 2.5 + 6 + "rem";
      //     console.log(1)
      //     this.lyricMove = 'top:' + (-index * 2.5 + 6) + "rem";
      //     this.currentRow = index
      //   }
      // })
      // console.log(1)
      // console.log(this.lyricObj.length)
      // for(let i = 0;i < this.lyricObj.length;i++){
      //   if(this.duration > parseFloat(this.lyricObj[i].time) && this.duration <= parseFloat(this.lyricObj[i+1].time)){
      //     console.log(1)
      //   }
      // }
      // 匹配歌词
        for (let i = 0; i < this.lyricObj.length; i++) {
            if (this.currentTime > (parseInt(this.lyricObj[i].time))) {
              const index = this.$refs.lyric[i].dataset.index
              if (i === parseInt(index)) {
                this.currentRow = i
                // this.$refs.lyricMove.style.transform = `translateY(${170 - (30 * (i + 1))}px)`
                let lyricOffsetTop = this.$refs.lyric[this.currentRow].offsetTop-220
                this.$refs.lyricMove.scrollTop = lyricOffsetTop
              }
            }
          }
      }
  },
  beforeRouteEnter(to,from,next){
    if(from.path === "/songmv"){
      to.meta.keepAlive = true
      console.log(to.meta)
    }else if(from.path === "/search"){
      to.meta.keepAlive = false
      console.log(to.meta)
    }else if(to.name === "songlist"){
      to.meta.keepAlive = true
    }
    // if(from.path==='/songmv'){
    //   // console.log(to.meta)
    //   to.meta.keepAlive = true
    // }else{
    //   // to.meta.isBack = false
    //   to.meta.keepAlive = false
    //   // this.getLyricObj(this.lyric)
    // }
    next();
  },
}
</script>

<style>
.detail{
  width: 100%;
  height: 100%;
  /* overflow-y: scroll; */
  padding: 10px;
  display: flex;
}
.detail-left,.detail-right{
  height:100%;
  width: 50%;
}
.detail-left{

}
.detail-song-img{
  width: 260px;
  height: 260px;
  margin: 200px auto 0;
}
.detail-song-img img{
  width: 100%;
  height: 100%;
}
.detail-right{
  
}
.song-title{
  width: 100%;
  height: 120px;
  padding-top: 10px;
}
.song-title>div{
  width:100%;
  text-align: center;
}
.detail-songName{
  height: 50px;
  padding-top: 10px;
  display: flex;
  justify-content: center;
}
.detail-songName span{
  font-size: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.el-icon-video-camera{
  width:20px;
  height: 20px;
  margin: 16px 0 0 0;
  cursor: pointer;
}
.detail-singer{
  padding-top: 10px;
}
.detail-singer,.detail-album{
  height: 30px;
  font-size: 14px;
}
.lyric{
  white-space: pre-wrap;
  font-size: 15px;
  /* height: 100%; */
  overflow-y: scroll;
  height: 400px;
  text-align: center;
  margin-top: 15px;
  position: relative;
}
.lyric>div{
  position: absolute;
  left: 0;
  right: 0;
}
.lyric-ative{
  color: red;
  font-size: 22px;
}
</style>