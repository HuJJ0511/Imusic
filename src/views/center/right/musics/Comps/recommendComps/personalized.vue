<template>
  <div class="personalized">
    <div class="personalized-top">
      <div class="top-frist">官方歌单</div>
      <div class="top-second">官方甄选订阅歌单</div>
      <div class="top-third" @click="goSongList">更多</div>
    </div>
    <div class="personalized-context">
      <div class="personalized-item" v-for="(item,index) in personalized" :key="index">
        <div class="personalized-item-img" @click="getSongListId(item.id)">
          <img :src="item.picUrl">
          <div class="el-icon-headset">{{item.playCount}}</div>
        </div>
        <div class="personalized-item-text">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonalized } from 'network/home'

export default {
  data(){
    return{
      personalized: []
    }
  },
  created(){
    this.getPersonalized()
  },
  methods:{
    getPersonalized(){
      getPersonalized().then(res => {
        console.log(res)
        this.personalized = res.result
      })
    },
    getSongListId(id){
      this.$router.push({
        name: 'songlist',
        params:{
          songListId: id
        }
      })
      // console.log(id)
      // getSongList(id).then(res => {
      //   console.log(res)
      // })
    },
    goSongList(){
      this.$bus.$emit('ChangeTab')
      this.$router.push('/home/songs')
    }
  }
}
</script>

<style>
.personalized{
  width: 100%;
  height: 500px;
  /* border: 1px solid red; */
}
.personalized-top{
  display: flex;
  width: 100%;
  height: 50px;
  /* border: 1px solid blue; */
}
.personalized-top>div{
}
.top-frist{
  font-size: 26px;
  color: #fff;
}
.top-second{
  font-size: 12px;
  margin: 18px 0 0 5px;
}
.top-third{
  position: relative;
  right: -738px;
  font-size: 14px;
  margin-top: 15px;
  cursor: pointer;
}
.personalized-context{
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.personalized-item{
  /* border: 1px solid green; */
  height: 220px;
  width: 180px;
  transition:all .5s ease;
}
.personalized-item:hover{
  transform:translateY(-10px);
}
.personalized-item-img{
  border-radius: 10px;
  overflow: hidden;
  height: 180px;
  width: 100%;
  cursor: pointer;
}
.personalized-item-img img{
  height: 100%;
  width: 100%;
}
.personalized-item-text{
  font-size: 14px;
  text-align: center
}
.el-icon-headset {
  position: relative;
  top: -20px;
  left: 10px;
  font-size: 14px;
  color: #ccc;
}
</style>