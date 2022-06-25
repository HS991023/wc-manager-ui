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
    <!-- 搜索按钮组件 -->
    <SerachButton/>
    </div>
    <!-- 操作数据组件 -->
    <OperatorDataButton/>
    <!-- 表单新增或编辑   -->
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
          <el-input v-model="form.gender" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item> 
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="from-button-region">
        <el-button @click="dialogFormVisible = false" class="button">取 消</el-button>
        <el-button type="primary" @click="submitForm" class="button">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <div class="table-data">     
    <el-table :data="userList" style="width: 100%" max-height="400">
    <!-- 多选框 -->
    <el-table-column type="selection" width="55"></el-table-column> 
    <el-table-column fixed label="用户编号" align="center" key="userId" prop="id" v-if="false"/>
    <el-table-column fixed prop="nickName"  key="nickName" label="用户名" width="180"/>
    <el-table-column fixed prop="userName"  key="userName" label="账号" width="180"/>
    <el-table-column fixed prop="sex" key="userSex" label="性别" width="180"/>
    <el-table-column label="操作">
    <template slot-scope="scope">
       <el-button size="mini" @click="handleEdit(scope.$index, scope.row);dialogFormVisible = true">编辑</el-button>
       <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
       <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">状态</el-button>  
    </template>
    </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="pageHelper">
      <el-pagination
      layout="prev, pager, next"
      :total="100">
    </el-pagination>
    </div>
    </div>
    </div>   
</template>

<script>
import { listUser} from "@/api/system/user";
export default {
    name:'UserInfo',
    data() {
      return {
        userList: null,
        total:null,
        data:{
           pageNum: 0,
           pageSize: 10
        },
        form: {
          nickName:'',
          userName:'',
          gender:'',
          roleName:'',
          status:''
        },
        formLabelWidth: '120px',
        dialogTableVisible: false,
        dialogFormVisible: false,
    }},
    methods: {
      //获取用户列表
      getUserList(){
        let data= this.data;
        listUser(data).then(response => {
          this.userList = response.data[0];
          this.total = response.count;
          this.loading = false;
        }
      );
      },
      handleEdit(index, row) {
        this.form = {
          nickName:'张三',
          userName:'admin',
          gender:'男'
        };
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      //提交表单事件
      submitForm(){
        this.dialogFormVisible = false;
        console.log(this.form);
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