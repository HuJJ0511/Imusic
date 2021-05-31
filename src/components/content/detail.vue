<template>
  <div class="detail">
    <div class="detail-left">
      <div class="detail-song-img">
        <img :src="songImg" alt="">
      </div>
    </div>
    <div class="detail-right">
      <div class="lyric">{{lyric}}</div>
    </div>
  </div>
</template>

<script>
import { getLyric } from 'network/detail'

export default {
  data(){
    return{
      iid: null,
      lyric: null,
      songImg: ""
    }
  },
  mounted(){
    const params = this.$route.params
    this.iid = params.id
    this.songImg = params.img

    getLyric(this.iid).then(res => {
      console.log(res)
      this.lyric = res.lrc.lyric
    })
  }
}
</script>

<style>
.detail{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
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
  width: 250px;
  height: 250px;
  margin: 200px auto 0;
}
.detail-song-img img{
  width: 100%;
  height: 100%;
}
.detail-right{
  
}
.lyric{
  white-space: pre-wrap;
  font-size: 14px;
  /* height: 100%; */
}
</style>