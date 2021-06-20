<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="item in tabs" 
    :label="item.label" :name="item.name" 
    :key="item.name" />
  </el-tabs>
</template>

<script>

export default {
  props:{
    tabs:{
      type: Array
    }
  },
  data(){
    return{
      activeName: '/home/recommend'
    };
  },
  mounted(){
    this.$bus.$on('ChangeTab',() => {
      this.activeName = '/home/songs'
    })
  },
  methods: {
     handleClick(tab, event,name) {
      this.$router.replace(tab.name);
      this.activeName = tab.name;
    }
  }
}
</script>

<style scoped>
.el-tabs__item{
  font-size: 12px;
}
::v-deep .el-tabs__nav-scroll{
	width: 32%;
	margin: 0 auto;
}
::v-deep .el-tabs__nav-wrap::after{
  width: 34%;
  left: 32%;
}
</style>