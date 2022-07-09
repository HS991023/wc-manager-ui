<template>
    <div>
    <!-- 搜索栏  -->
    <div class="serach-input">
      <label class="serach-propties">用户名:</label>    
      <el-input placeholder="请输入用户名" suffix-icon="el-icon-text" v-model="data.nickName"/>
      <label class="serach-propties">账号:</label>    
      <el-input placeholder="请输入账号"  suffix-icon="el-icon-text" v-model="data.userName"/>
      <label class="serach-propties">性别:</label>    
      <el-input placeholder="请输入性别" suffix-icon="el-icon-text"/>
      <label class="serach-propties">状态:</label>    
      <el-input  placeholder="请输入状态" suffix-icon="el-icon-text"/>
    <!-- 搜索按钮区域 -->
    <div class="serach-button-region"> 
      <el-row>
      <el-button class="serach-button" type="success" icon="el-icon-search"  plain @click="getUserList()">搜索</el-button>
      <el-button class="serach-button" type="warning" icon="el-icon-refresh" plain @click="getUserListReset()">重置</el-button>
      </el-row>
    </div>
    </div>
   <!-- 操作数据按钮区域 -->
    <div class="operator-button-region">
      <el-button class="operator-button" type="primary" icon="el-icon-circle-plus" plain @click="handleAddUser();dialogFormVisible=true">新增</el-button>
      <el-button class="operator-button" type="danger"  icon="el-icon-error" plain @click="handleDeleteUser()">批量删除</el-button>
    </div>
    <div class="form-data">
    <!-- 表单新增或编辑对话框   -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" :required="true">
          <el-input v-model="form.nickName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth" :required="true">
          <el-input v-model="form.userName" autocomplete="off"/>
        </el-form-item>
        <!-- <div class="user-avater">
           <el-avatar shape="square" :size="100"></el-avatar>      
        </div> -->
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="form.sex" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" :required="true">
          <el-input v-model="form.passWord" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" :required="true">
            <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" :required="true">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.cellPhone" autocomplete="off"/>
        </el-form-item> 
        <el-form-item label="邮件" :label-width="formLabelWidth">
          <el-input v-model="form.mail" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-input v-model="form.birthday" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="个性签名" :label-width="formLabelWidth">
          <el-input v-model="form.sign" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="from-button-region" v-if="showFormButton">
        <el-button class="button" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" class="button" @click="submitForm()">确 定</el-button>
      </div>
      </div>
    </el-dialog>
    </div>
    <!-- 表格 -->
    <div class="table-data">     
    <el-table :data="userList" style="width: 100%" max-height="100%" ref="multipleTable" v-loading="loading" @selection-change="handleUserIds" :header-cell-style="rowClass">
      <!-- 多选框 -->
      <el-table-column type="selection" width="55"/>
      <el-table-column align="center" prop="nickName" key="nickName" label="用户名" width="100">
        <!-- 添加列事件 -->
        <template slot-scope="scope">
            <div class="table-column-region" @click="handleUserInfo(scope.row.id);dialogFormVisible = true">{{scope.row.nickName}}</div>
        </template>
      </el-table-column>  
      <el-table-column align="center" prop="userName" key="userName" label="账号" width="100"/>
      <el-table-column align="center" prop="sex" key="sex" label="性别" width="100"/>
      <el-table-column align="center" prop="address" key="address" label="地址" width="100"/>
      <el-table-column align="center" prop="cellPhone" key="cellPhone" label="手机号码" width="100" :show-overflow-tooltip="showOverflowTooltip"/>
      <el-table-column align="center" prop="mail" key="mail" label="邮件" width="100" :show-overflow-tooltip="showOverflowTooltip"/>
      <el-table-column align="center" prop="accountType" key="accountType" label="账户类型" width="100"/>
      <el-table-column align="center" prop="status" key="status" label="状态" width="70"/>
      <el-table-column align="center" prop="createTime" key="createTime" label="注册日期" width="170"/>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="mini" icon="el-icon-edit"  @click="handleEidtUser(scope.row);dialogFormVisible = true">编辑</el-button>
        <el-button class="delete-button" type="text" size="mini"  icon="el-icon-delete" @click="handleDeleteUser();handleUserIds(scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    </div>
    <!-- 分页组件 -->
    <div class="pageHelper" v-if="total !=0 && total>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.data.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="this.data.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    </div>   
</template>

<script>
import {userList,userInfo,addUser,updateUser,removeUser} from "@/api/system/user"    
export default {
    name:'WcManagerUiUserInfo',
    data() {
      return {
        //表格数据
        userList: null,
        //表单参数
        form:{},
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
           nickName:undefined,
           userName:undefined,
        },
        //用户ID列表
        ids:[],
        formLabelWidth: '120px',
        //是否加载中
        loading: true,
        dialogTableVisible: false,
        //是否关闭表单对话框
        dialogFormVisible: false,
        //溢出时隐藏
        showOverflowTooltip:true,
        //是否表单展示取消确定按钮
        showFormButton: true,
    }},
    methods: {
      //获取用户列表
      getUserList(){
        let data= this.data    
        userList(data).then(response => {
          if(response.count== 0){
            this.userList = undefined    
          }else{
             this.userList = response.data[0]    
             this.total = response.count    
          }
            this.loading = false    
        })    
      },
      //用户列表重置
      getUserListReset(){
        this.data.nickName = undefined    
        this.data.userName = undefined    
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        userList(resetData).then(response => {
            this.userList = response.data[0]    
            this.total = response.count    
            this.loading = false    
        })    
      },
      //查询用户详情
      handleUserInfo(id){
        this.reset()    
        this.showFormButton = false
        userInfo(id).then(response=>{
          this.form = response.data    
        })
      },
      //新增用户按钮
      handleAddUser(){
        //重置表单
        this.reset()    
        this.showFormButton = true    
      },
      //编辑用户按钮
      handleEidtUser(row) {
        //重置表单
        this.reset()    
        this.form = this.handleUserInfo(row.id)    
        this.showFormButton = true    
      },
      //提交表单
      submitForm(){
        this.$refs["form"].validate(valid => {
        if (valid) {
          //更新用户
          if (this.form.id != undefined) {
            updateUser(this.form).then(response =>{
            if(response.code==200){
             this.$msgbox('更新用户信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            })    
            this.dialogFormVisible = false         
            this.getUserList()        
            }
            })    
          //新增用户  
          }else{
          addUser(this.form).then(response =>{
          if(response.code==200){
             this.$msgbox('保存用户信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            })    
            this.dialogFormVisible = false    
            this.getUserList()         
            }
          })            
          }
        }})    
      },
      //获取用户ID 多选
      handleUserIds(val){
         //批量ID
         if(val instanceof Array){
          this.ids = val.map(item=>{
          return item.id    })    
         }else{ 
          //单个删除
          if(val != undefined){
            this.ids = val.id    
          }
          var rows = []    
          rows.push(val)    
          this.toggleSelection(rows)    
         }    
      },
      //删除用户逻辑删除
      handleDeleteUser() {
        this.$confirm('此操作将删除用户, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          var userIds = this.ids    
          removeUser(userIds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             })    
             this.getUserList()    
            }
          })
        }).catch(() => {
          //清除已选择的状态
          this.toggleSelection()    
          this.$message({
            type: 'info',
            message: '已取消删除'
          })     
        })    
      },
      //清除多选
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)    
          })    
        } else {
          this.$refs.multipleTable.clearSelection()    
        }
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
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val    
        this.getUserList()         
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val    
        this.getUserList()      
      },
      //设置表头颜色
     rowClass({ row, rowIndex}) {
        return 'background:#FAFAFA'
      }
    },
    created(){
      this.getUserList()    
    },
    mounted(){
    }
}
</script>

<style scoped>
/* .user-avater{
  display: inline-block;   
  position: relative;  
  top: 40px;    
  left: 56px;    
  width: 100px;    
  height: 100px;    
  background-color:pink    
}
::v-deep .el-dialog__body {
    margin-top: -29px;
    margin-left: -6px;
    padding: 22px 20px;
}
::v-deep .el-dialog__footer{
  margin-top: -44px;
  padding: 1px 288px 11px;
} */
</style>