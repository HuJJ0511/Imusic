<template>
  <div class="recommend">
    <el-carousel :interval="4000" type="card" height="180px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
          <img :src="item.imageUrl" alt="" class="swiper-img" @click="getSwiperId(item.targetId)">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getSwiper } from 'network/home'

export default {
  name: 'recommend',
  data(){
    return{
      banners: []
    }
  },
  created(){
    this.getSwiper()
  },
  methods:{
    getSwiper(){
      getSwiper().then(res=>{
        //获取轮播图数据
        this.banners = res.banners
        console.log(this.banners)
      })
    },
    getSwiperId(id){
      //获取轮播图id，传footer播放
      this.$bus.$emit('getMusicId',id)
    }
  }
}
</script>

<style>
.recommend{
  padding: 10px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.swiper-img{
  width: 100%;
  height: 100%;
}
</style>