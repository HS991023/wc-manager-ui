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
        if(form.userName != "" && form.passWord != ""){
            var router = this.$router;
            this.axios({
            method:'post',
            url:'/api/wc/system/doLogin',
            data:{ 
                username:this.form.userName,
                password:this.form.passWord
                },
            params:{
               
            },
            headers:{'token':'xxx'},
            }).then(function(res){
                //跳转到欢迎页
                router.push({name:'Show'});
                let token = res.data.data;
                let tokenres = token.split("Bearer ")[1];
                sessionStorage.setItem("token",tokenres)
            }).catch(function(error){
                console.log(error) 
            })
        }else{
         this.$alert('请完善表单信息', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }},
    mounted() {
        // console.log(this.axios);
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
    line-height: 40px;
}
.text-input{
    float: left;
    width: 300px;
    height: 20px;
}
.login-button{
    float: left;
    margin-left: 20px;
}
.login-button:hover{
    color:'#67C23A'
}
</style>