<template> 
   <div class="parent" style="overflow:hidden;">
        <div class="login-element" id="login">
        <h1>XXX管理平台</h1>
      <div class="form-info">
        <form ref="form" :model="form">
          <label class="text-label">用户名:</label>
          <el-input class="text-input" v-model="form.userName" placeholder="请输入内容"></el-input>
          <label class="text-label">密码:</label>
          <el-input @keyup.enter.native="doLogin(form)"  class="text-input" placeholder="请输入密码" v-model="form.passWord" show-password></el-input>
       </form>
       <el-button type="success" plain class="login-button"
        @click="doLogin(form)"
        >登录</el-button>
      </div> 
   </div>    
   </div> 
</template>

<script>
import router from '@/router'
export default {
    name:'Login',
    data(){
        return{
            form:{
             userName:'',
             passWord:''
            }  
        }
    },
    methods:{
        doLogin(form){
        var router = this.$router;
        var alert  =  this.$alert;
        var store = this.$store;
        if(form.userName != "" && form.passWord != ""){
            this.axios({
            method:'post',
            url:'/api/wc/system/doLogin',
            data:{ 
                username:this.form.userName,
                password:this.form.passWord
                },
            params:{
               
            },
            }).then(function(res){
                if(res.data.code == 200){
                let token = res.data.data;
                //登录成功存储token
                sessionStorage.setItem("token",token)
                //更改登录状态为true
                store.dispatch('doLogin');
                //跳转到欢迎页
                router.push({path:'/show'});
                }else{
                   alert('用户名或密码错误,请重新输入!', '提示', {
                    confirmButtonText: '确定'
                  });
                }
            }).catch(function(error){
                console.log(error) 
            })
        }else{
          alert('请完善表单信息', '提示', {
          confirmButtonText: '确定'
        });
      }
    }},
    mounted() {
    
    }
}
</script>

<style scoped>
.parent{
    width: 100%;
    height: 100vh;
    background-image: url(../assets/index-backround.jpg);
    background-repeat: no-repeat;
}
.login-element{
     margin: 300px auto; 
     text-align: center;
     width: 1000px;
     height: 100px;
}
.form-info{
    margin-left: 100px;
}
.text-label{
    float: left;
    height: 60px;
    line-height: 37px;
    margin-top: -2px;
}
.text-input{
    float: left;
    width: 300px;
    height: 33px;
}
.login-button{
  float: left;
  height: 35px;
  line-height: 13px;
  margin-left:23px;
  margin-top: -1px;
}
.login-button:hover{
    color:'#67C23A'
}
::v-deep  input{
    height: 33px;
    line-height: 33px;
}

.el-input {
    float: left;
    margin-left: 9px;
    margin-right: 10px;
    width: 300px !important;
}
</style>