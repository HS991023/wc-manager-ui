<template> 
   <div class="parent" style="overflow:hidden;">
        <div class="login-element" id="login">
        <h1>XXX管理平台</h1>
      <div class="form-info">
        <form ref="form" :model="form">
          <label class="text-label">用户名:</label>
          <el-input class="text-input" v-model="form.userName" placeholder="请输入内容"></el-input>
          <label class="text-label">密码:</label>
          <el-input  class="text-input" placeholder="请输入密码" v-model="form.passWord" show-password></el-input>
       </form>
       <el-button type="success" plain class="login-button" @click="doLogin(form)">登录</el-button>
      </div> 
   </div>    
   </div> 
</template>

<script>
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
         this.axios.get('/api').then(
					response => {
                    console.log('登录成功!');
                    //存储token
                    sessionStorage.setItem('token','asehwgoqk@wbwa')
                    //跳转到主页
                    this.$router.push({
					name:'Home'
				})
                },
				error => {
                        this.$alert('用户名或密码错误', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                            }
                        });
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
    }
},
mounted() {
    console.log(this);
},

}
</script>

<style scoped>
.parent{
    width: 100%;
    height: 100vh;
    background-image: url(../assets/index-backround1.jpg);
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
    height: 60px;
}
.login-button{
    float: left;
    margin-left: 20px;
}
.login-button:hover{
    color:'#67C23A'
}
</style>