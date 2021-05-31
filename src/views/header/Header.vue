<template>
  <div class="header">
    <el-header>
      <header-left/>
      <header-center/>
      <header-right/>
    </el-header>
  </div>
</template>

<script>
import HeaderLeft from './Comps/HeaderLeft'
import HeaderCenter from './Comps/HeaderCenter'
import HeaderRight from './Comps/HeaderRight'

export default {
  data(){
    return{
     
    }
  },
  components:{
    HeaderLeft,
    HeaderCenter,
    HeaderRight
  }
}
</script>

<style>
.el-header{
  display: flex;
  background-color: rgba(86, 146, 254,.9);
  color: #333;
  justify-content: space-between;
}
</style>