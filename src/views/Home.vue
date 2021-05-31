<template>
  <div class="home-view">
    <home-top/>
    <center/>
    <home-bottom/>
  </div>
</template>

<script>
import homeTop from 'views/header/Header'
import center from 'views/center/Center'
import homeBottom from 'views/footer/Footer'

export default {
  components: {
    homeTop,
    center,
    homeBottom
  }
}
</script>

<style scoped>
.home-view{
  height: 800px;
  width: 1200px;
  position: relative;
  margin: 100px auto;
}
</style>