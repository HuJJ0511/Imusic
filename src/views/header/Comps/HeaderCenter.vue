<template>
  <div class="header-center">
    <div><i class="el-icon-arrow-left" @click="topBack"></i></div>
    <div><i class="el-icon-refresh"></i></div>
    <div class="search"><el-input v-model="input" placeholder="请输入内容" class="input-search" @keyup.enter.native="getSearch" /></div>
    <div><i class="el-icon-microphone"></i></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      input: ""
    }
  },
  methods:{
    //判断输入内容是否为空
    getSearch(){
      if(this.input === ""){
        this.$toast.show("你不写，我咋知道你要找啥？别搞我好吗！",2000)
        return
      }else{
        this.$router.push("/search" + this.input).catch(err => err)
      }
    },
    //返回上一页
    topBack(){
      this.input = ""
      this.$router.back()
    }
  }
}
</script>

<style>
.header-center{
  display: flex;
  width: 500px;
  height: 100%;
  padding: 20px 5px 0;
}
.el-icon-arrow-left{
  font-size: 24px;
  }
.el-icon-refresh{
font-size: 24px;
  margin-left: 5px;
}
.el-input{
  margin-left: 5px;
}
.el-input input{
  height: 25px;
  width: 300px;
}
.el-icon-microphone{
  font-size: 24px;
  margin-left: 10px;
}
</style>