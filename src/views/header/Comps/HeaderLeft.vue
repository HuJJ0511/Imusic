<template>
  <div class="header-left">
    <div class="user" v-if="loginStatu">
      <div class="user-img"><img :src="user_img" alt=""/></div>
      <div class="user-name">{{user_name}}</div>
      <el-button type="primary" @click="outLogin">退出</el-button>
    </div>
    <div class="login" v-else>
      <a herf="#" @click="dialogFormVisible = true"><img src="~assets/images/login/login.png" alt=""></a>
    </div>
      <el-dialog title="请登录~" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off" @keyup.enter.native="loginClick"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
             <el-input type="password" v-model="form.password" autocomplete="off" @keyup.enter.native="loginClick"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button class="user_login" type="primary" @click="loginClick" @keyup.enter="loginClick">登 录</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { getLogin,getLoginOut } from "network/login"

export default {
  data(){
    return{
      loginStatu: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        phone: '13421165596',
        password: ''
      },
      user_name: '',
      user_img: '',
      formLabelWidth: '80px'
    }
  },
  created(){
    //页面刷新时，查看Application里面有没有保存用户信息，有则赋值给页面
    if(window.localStorage.getItem('user')){
      const user = JSON.parse(window.localStorage.getItem('user'))
      console.log(user)
      this.user_name = user.name
      this.user_img = user.img
      this.loginStatu = true
      console.log('已经登录')
    }else{
      console.log('没有登录')
    }
    //调用登录enter键函数
    this.keyupEnter()
  },
  methods:{
     keyupEnter() {
        document.onkeydown = e =>{
          let body = document.getElementsByTagName('body')[0]
          if (e.keyCode === 13 && e.target.baseURI.match('/') && e.target === body) {
              console.log('enter')
              this.loginClick()
          }
        }
      },
    //用户登录
    loginClick(){
      // this.dialogFormVisible = false
      // this.loginStatu = true
      const user_phone = this.form.phone
      const user_password = this.form.password
      console.log("帐号：" + user_phone + "密码：" + user_password)
      var reg = /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}/
      if(user_phone != "" && user_password !=""){
        if(reg.test(user_phone)){
          this.getLogin(user_phone,user_password)
        }else{
          this.$toast.show("手机号码不符",2000)
        }
      }else{
        this.$toast.show("帐号密码不能为空",2000)
      }
    },
    getLogin(user_phone,user_password){
      getLogin(user_phone,user_password).then(res=>{
        console.log(res)
        if(res.code === 200){
          this.loginStatu = true
          this.dialogFormVisible = false
          this.user_name = res.profile.nickname
          this.user_img = res.profile.avatarUrl
          window.localStorage.setItem('login',true);
          // window.localStorage.setItem('user',this.user,this.user_img);
          const userObj = {
            name: this.user_name,
            img: this.user_img
          }
          window.localStorage.setItem('user',JSON.stringify(userObj));
        }else{
          this.$toast.show("密码错误",2000)
          this.form.password = ""
        }
      })
    },
    //退出登录
    outLogin(){
      this.loginStatu = false
      getLoginOut().then(res => {
        console.log(res)
        window.localStorage.removeItem('login');
        window.localStorage.removeItem('user')
      })
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
  cursor: pointer;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.el-button{
  background-color: #fff;
  color: #000;
  width: 40px;
  height: 26px;
  padding: 0;
  margin: 20px 0 0 5px;
}
/deep/.el-dialog{
  width: 400px
}
/deep/.el-dialog .el-input input{
  width: 200px
}
/deep/.el-dialog__footer{
  text-align: center;
}
/deep/.el-button+.el-button{
  margin-left: 30px;
}
</style>