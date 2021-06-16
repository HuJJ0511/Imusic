<template>
  <div class="recommend">
    <recommend-swiper />
    <personalized />
  </div>
</template>

<script>
import recommendSwiper from './recommendComps/swiper'
import personalized from './recommendComps/personalized'
export default {
  name: 'recommend',
  components:{
    recommendSwiper,
    personalized
  },
  methods:{
  },
  beforeRouteEnter(to,from,next){
  if(to.name === "songlist"){
    to.meta.keepAlive = false
    console.log(to.meta)
   }
   next()
  }
}
</script>

<style>
.recommend{
  padding: 10px;
}

</style>