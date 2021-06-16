<template>
  <el-container class="center">
    <mian-aside></mian-aside>
    <div class="right">

      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </el-container>
</template>

<script>
import mianAside from './left/Aside'

export default {
  components:{
    mianAside
  },
  data () {
    return {
        
    }
  },
  
}
</script>

<style scoped>
.center{
  height: 680px;
}
.el-main{
  padding: 8px;
}
.right{
  width: calc(100% - 200px);
  background-color: rgba(255, 255, 255, .6);
  height: 100%;
}

</style>
