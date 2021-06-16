<template>
  <div class="musicView">
    <tab-control :tabs="tabs"/>
    <router-view />
  </div>
</template>

<script>
import tabControl from 'components/content/tabControl'

export default {
  components:{
    tabControl
  },
  data(){
    return {
       tabs:[
        {label:"个性推荐",name:"/home/recommend"},
        {label:"歌单",name:"/home/songs"},
        {label:"主播电台",name:"/home/anchor"},
        {label:"歌手",name:"/home/singer"}
      ]
    }
  }
}
</script>

<style>
.musicView{
  height: 680px;
  width: 100%;
  overflow-y: scroll;
}
</style>