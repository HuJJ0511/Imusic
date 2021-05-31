<template>
  <div id="home">
    <Home/>
  </div>
</template>

<script>
import Home from 'views/Home'

export default {
  name: 'App',
  components:{
    Home
  }
}
</script>

<style>
@import "assets/css/base.css";
#home{
  background-image: url("assets/images/bg/bg.jpg");
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}


</style>
