<template>
  <div>
    <el-footer>
        <div class="slider-block">
          <el-slider v-model="currentTime" :show-tooltip="false" :max="duration" :disabled="!isSong" @change="changeCurrentTime"></el-slider>
        </div>
      <div class="footer-context">
         <div class="footer-left">
           <div class="no-song" v-if="!isSong">
              <div class="song-img">
                <img src="~assets/images/footerImg/song.png" alt="">
              </div>
              <div class="song-text">
                <p>歌手 - 歌名</p>
              </div>
              <div class="song-time">
                00:00/00:00
              </div>
           </div>
           <div class="singing" v-else>
            <div class="song-img">
              <img :src="songImg" alt="" @click="getDetail">
            </div>
            <div class="song-text">
              <p>{{songName}} - {{singer}}</p>
            </div>
            <div class="song-time">
              {{currentTime | showTime}}/{{duration | showTime}}
            </div>
           </div>
         </div>

         <div class="footer-center">
           <div class="footer-center-items">
            <div class="el-icon-arrow-left"></div>
            <div class="center" @click="setActive">
              <div class="el-icon-video-play" v-show="isActive"></div>
              <div class="el-icon-video-pause" v-show="!isActive"></div>
            </div>
            <div class="el-icon-arrow-right"></div>
            <audio :src="MusicUrl" autoplay="autoplay" ref="audio" @canplay="getDuration" @timeupdate="updateTime"/>
           </div>
         </div>

         <div class="footer-right">
           <div class="sbox"><el-button type="info" plain class="btn-left">倍数</el-button></div>
           <div  class="sbox"><el-button type="info" plain>标准</el-button></div>
           <div class="sbox bell-block">
             <div class="el-icon-bell"></div>
             <div class="block">
              <el-slider v-model="SongVolume" vertical height="80px" @change="changeVolume"/>
             </div>
           </div>
           <div class="el-icon-sort sbox"></div>
           <div class="el-icon-s-operation sbox"></div>
           <div class="el-icon-s-unfold sbox"></div>
         </div>
      </div>
    </el-footer>
  </div>
</template>

<script>
import { getMusicUrl,getSongDetail } from 'network/home'
import { getTime } from 'common/utils'

export default {
  data(){
    return{
      iid: null,//歌曲id
      MusicUrl: null,//歌曲的url
      isActive: true,//歌曲状态
      songName: null,//歌曲名字
      singer: null,//歌手
      songImg: "",//歌曲图片
      isSong: false,//是否有歌曲播放
      duration: null,//歌曲总时长
      currentTime: null,//歌曲实时时间
      SongVolume: 30,//默认音量
    }
  },
  mounted(){
    this.$bus.$on('getMusicId',res => {
      this.iid = res
      console.log(this.iid)
    })
  },
  watch:{
    iid(){
      this.getMusicUrl(this.iid);
    },
    currentTime(){
      this.getOverTime()
    }
  },
  methods:{
    setActive(){
      if(this.MusicUrl != null){
        this.isActive = !this.isActive
        if(this.$refs.audio.paused){
          this.$refs.audio.play()
          console.log("我是播放")
        }else{
          this.$refs.audio.pause()
          console.log("我是暂停")
        }
      }
    },
    //获取音频详情
    getMusicUrl(iid){
      getMusicUrl(iid).then(res => {
        this.MusicUrl = res.data[0].url;
        this.isActive = false;
        getSongDetail(iid).then(res => {
          this.songName = res.songs[0].name
          this.singer = res.songs[0].ar[0].name
          this.songImg = res.songs[0].al.picUrl
          console.log(this.songName + "-" + this.singer)
          this.duration = this.$refs.audio.duration
          this.currentTime = this.$refs.audio.currentTime
          console.log(this.currentTime + "/" + this.duration)
          this.isSong = true
          console.log(res)
        })
      })
    },
    getDuration(){
      this.duration = this.$refs.audio.duration;
      console.log(this.$refs.audio.duration)
    },
    updateTime() {
      this.currentTime = this.$refs.audio.currentTime;  //获取audio当前播放时间
    },
    changeCurrentTime(){
      if(this.currentTime <= this.duration){
        this.$refs.audio.currentTime = this.currentTime
      }
    },
    changeVolume(){
      this.$refs.audio.volume = this.SongVolume / 100
    },
    getOverTime(){
      if(this.currentTime >= this.duration){
        this.isActive = true
      }
    },
    getDetail(){
      this.$router.push({
        name:'/detail',
        params:{
          id:this.iid,
          img:this.songImg
        }
      }).catch(err => err)
    }
  },
  filters:{
    showTime(value){
      //将date进行格式化
        return getTime(value, 'mm:ss')
    }
  }
}
</script>

<style>
.el-footer {
  background-color: #B3C0D1;
  color: #333;
}
.footer-context{
  position: relative;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid green; */
  width: 100%;
  height: 85%;
  top: 5px;
}
.song-img{
  /* border: 1px solid blue; */
  height: 100%;
  width: 53px;
}
.song-img img{
  width: 100%;
  height: 100%;
}
.song-text,.song-time{
  height: 50%;
  width: 200px;
  /* border: 1px solid pink; */
  position: relative;
  left: 60px;
  font-size: 14px;
}
.song-text{
  top: -46px;
  color: rgb(243, 230, 230);
  overflow: hidden;
}
.song-time{
  top: -46px;
  color: rgb(243, 230, 230);
}
.footer-center{
  display: flex;
  text-align: center;
}
.footer-right{
  display: flex;
}
.footer-right .sbox{
  margin: 18px 10px;
}
.footer-center-items{
  width: 80%;
  height: 100%;
  display: flex;
}
.no-song,.singing{
  height: 100%;
  width: 100%;
}
.singing img{
  cursor: pointer;
}
</style>

<style scoped>
.bell-block:hover .el-slider{
  display: block;
}
.footer-left,.footer-center,.footer-right{
  /* border: 1px solid red; */
  height: 100%;
  width: 300px;
}
.el-icon-arrow-left,.center,.el-icon-arrow-right{
  /* border: 1px solid pink; */
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 36px;
}
.el-icon-arrow-left,.el-icon-arrow-right{
  top: 6px;
}
.center{
  top: 4px;
}
.el-icon-video-play,.el-icon-video-pause{
  width: 100%;
  height: 100%;
}
.el-button{
  height: 20px;
  width: 44px;
  border-radius: 12px;
  padding: 2px 5px;
  font-size: 12px;
}
.center{
  margin: 0 3px;
}
p{
  display: inline-block;
  white-space: nowrap;
}
p:hover{
  animation: move 4s infinite alternate linear;
}

@keyframes move {
  0% {
      left: 0;
      transform: translate(0, 0);
  }
  100% {
      left: 100%;
      transform: translate(-100%, 0);
  }
}
.slider-block{
  top: 0px;
  left: -20px;
  position: relative;
  width: 1200px;
}
/deep/ .el-slider__runway{
  height: 3px;
  margin: 0;
}
.block{
  width: 0;
}
/deep/.sbox .el-slider{
  top: -86px;
  left: 0;
  display: none;
}
/deep/.el-slider__button{
  width: 12px;
  height: 12px;
}
/deep/.el-slider.is-vertical .el-slider__runway{
  width: 4px;
}

</style>