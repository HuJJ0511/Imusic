<template>
  <div class="header-left">
    <div class="user" v-if="loginStatu">
      <div class="user-img"><img src="~assets/images/try/江门第一帅.jpg" alt=""/></div>
      <div class="user-name">江门第一帅</div>
      <el-button type="primary" @click="outLogin">退出</el-button>
    </div>
    <div class="login" v-else>
      <a herf="#" @click="loginClick"><img src="~assets/images/login/login.png" alt=""></a>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loginStatu: false
    }
  },
  methods:{
    loginClick(){
      this.loginStatu = true
    },
    outLogin(){
      this.loginStatu = false
    }
  }
}
</script>

<style scoped>
.header-left{
  display: flex;
  padding-top: 5px;
  width: 200px;
}
.login{
  width: 22%;
  height: 40px;
  margin-top: 5px;
}
.login img{
  width: 100%;
  height: 100%;
}
.user{
  display: flex;
}
.user-img{
  height: 40px;
  width: 40px;
  margin-top: 5px;
  border-radius: 50%;
  overflow: hidden;
}
.user-img img{
  width: 100%;
  height: 100%;
}
.user-name{
  height: 40px;
  width: 80px;
  margin: 25px 0 0 5px;
  font-size: 14px;
}
.el-button{
  background-color: #fff;
  color: #000;
  width: 40px;
  height: 26px;
  padding: 0;
  margin: 20px 0 0 5px;
}
</style>