<template>
    <div>
    <!-- 搜索栏   -->
    <div class="top-style">
      <h2>此处预留样式栏盒子</h2>
    </div> 
    <div class="serach-input">
    <label class="serach-propties">用户名:</label>    
    <el-input
        placeholder="请输入用户名"
        suffix-icon="el-icon-text"
        >
    </el-input>
    <label class="serach-propties">账号:</label>    
    <el-input
        placeholder="请输入账号"
        suffix-icon="el-icon-text"
        >
    </el-input>
    <label class="serach-propties">性别:</label>    
    <el-input
        placeholder="请输入性别"
        suffix-icon="el-icon-text"
        >
    </el-input>
    <label class="serach-propties">状态:</label>    
    <el-input
        placeholder="请输入状态"
        suffix-icon="el-icon-text"
        >
    </el-input>
     <el-button class="serach-button" type="primary" icon="el-icon-search">搜索</el-button>
    </div>
   <!-- 操作数据按钮区域 -->
    <div class="operator-button-region">
      <el-button type="primary" class="operator-button" icon="el-icon-circle-plus" @click="handleAddUser();dialogFormVisible = true ">新增</el-button>
      <el-button type="danger" class="operator-button" icon="el-icon-error">批量删除</el-button>
    </div>
    <div class="form-data">
    <!-- 表单新增或编辑对话框   -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 用户头像 -->
        <div class="user-avater">
           <el-avatar shape="square" :size="100" ></el-avatar>      
        </div>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.cellPhone" autocomplete="off"></el-input>
        </el-form-item> 
        <el-form-item label="邮件" :label-width="formLabelWidth">
          <el-input v-model="form.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-input v-model="form.birthday" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="个性签名" :label-width="formLabelWidth">
          <el-input v-model="form.sign" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="from-button-region">
        <el-button class="button" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" class="button" @click="submitForm">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    </div>
    <!-- 表格 -->
    <div class="table-data">     
    <el-table :data="userList" style="width: 100%" max-height="400" v-loading="loading" >
    <!-- 多选框 -->
    <el-table-column type="selection" width="55"></el-table-column> 
    <el-table-column fixed label="用户编号" align="center" prop="id" key="userId" v-if="false"/>
    <el-table-column fixed label="用户名" prop="nickName" key="nickName"  width="100">
      <!-- 添加列事件 -->
      <template slot-scope="scope">
           <a @click="handleUserInfo(scope.row.id);dialogFormVisible = true">{{scope.row.nickName}}</a>
      </template>
    </el-table-column>  
    <el-table-column fixed prop="userName"  key="userName" label="账号" width="100"/>
    <el-table-column fixed prop="sex" key="sex" label="性别" width="100"/>
    <el-table-column fixed prop="address" key="address" label="地址" width="100"/>
    <el-table-column fixed prop="cellPhone" key="cellPhone" label="手机号码" width="100" :show-overflow-tooltip="showOverflowTooltip"/>
    <el-table-column fixed prop="mail" key="mail" label="邮件" width="100" :show-overflow-tooltip="showOverflowTooltip"/>
    <el-table-column fixed prop="accountType" key="accountType" label="账户类型" width="100"/>
    <el-table-column fixed prop="status" key="status" label="状态" width="70"/>
    <el-table-column fixed prop="createTime" key="createTime" label="注册日期" width="140"/>
    <el-table-column label="操作">
    <template slot-scope="scope">
       <el-button size="mini" @click="handleEidtUser(scope.$index, scope.row);dialogFormVisible = true">编辑</el-button>
       <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
       <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">状态</el-button>  
    </template>
    </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="pageHelper">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
    </div>
    </div>   
</template>

<script>
import {listUser,userInfo} from "@/api/system/user";
export default {
    name:'UserInfo',
    data() {
      return {
        //表格数据
        userList: null,
        total:null,
        //表单参数
        form:{},
        data:{
           pageNum: 0,
           pageSize: 10
        },
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        formLabelWidth: '120px',
        loading: true,
        dialogTableVisible: false,
        dialogFormVisible: false,
        showOverflowTooltip:true,
    }},
    methods: {
      //获取用户列表
      getUserList(){
        let data= this.data;
        listUser(data).then(response => {
          this.userList = response.data[0];
          this.total = response.count;
          this.loading = false;
        });
      },
      //查询用户详情
      handleUserInfo(id){
        this.reset();
        userInfo(id).then(response=>{
          this.form = response.data;
        })
      },
      //新增用户
      handleAddUser(){
        this.reset();
      },
      //编辑用户
      handleEidtUser(index, row) {
        this.handleUserInfo(row.id);
      },
      //重置表单
      reset() {
        this.form={
          nickName:undefined,
          userName:undefined,
          sex:undefined,
          passWord:undefined,
          roleName:undefined,
          status:undefined,
          cellPhone:undefined,
          mail:undefined,
          birthday:undefined,
          address:undefined,
          sign:undefined
        }
      },
      //删除用户
      handleDelete(index, row) {
        console.log(index, row);
      },
      //提交表单事件
      submitForm(){
        this.dialogFormVisible = false;
        console.log(this.form);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    created(){
      this.getUserList();
    }
}
</script>

<style scoped>
.user-avater{
  display: inline-block;
  position: relative;
  top: 40px;
  left: 56px;
  width: 100px;
  height: 100px;
  background-color:pink;
}
</style>