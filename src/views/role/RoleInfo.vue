<template>
 <div>
    <div class="serach-input">
    <label class="serach-propties">角色名:</label>    
    <el-input placeholder="请输入角色名" suffix-icon="el-icon-text" v-model="data.roleName"/>
    <label class="serach-propties">角色代码:</label>    
    <el-input placeholder="请输入角色代码" suffix-icon="el-icon-text" v-model="data.roleCode"/>
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="success" plain icon="el-icon-search" @click="getRoleList()">搜索</el-button>
        <el-button class="serach-button" type="warning" plain icon="el-icon-refresh" @click="getRoleListReset()">重置</el-button>
    </div>
    </div>
    <div class="operator-button-region">
      <el-button type="primary" plain class="operator-button" icon="el-icon-circle-plus" @click="handleAddRole();dialogFormVisible=true">新增</el-button>
      <el-button type="danger" plain class="operator-button" icon="el-icon-error" @click="handleDeleteRole()">批量删除</el-button>
    </div>
    <div class="form-data">
    <el-dialog title="角色信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色代码" :label-width="formLabelWidth">
          <el-input v-model="form.roleCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.roleExplain" autocomplete="off"></el-input>
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
    <div class="table-data"> 
    <el-table  ref="multipleTable" :data="roleList" style="width: 100%" v-loading="loading"  @selection-change="handleRoleIds">
    <el-table-column type="selection" width="55"/>
    <el-table-column label="角色名" width="180" prop="roleName">
      <template slot-scope="scope">
           <div class="table-column-region" @click="handleRoleInfo(scope.row.id);dialogFormVisible = true  ">{{scope.row.roleName}}</div>
      </template>
    </el-table-column>  
    <el-table-column label="角色代码" width="180" prop="roleCode"/>
    <el-table-column label="状态" width="180" prop="status"/>
    <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEditRole(scope.row);dialogFormVisible = true">编辑</el-button>
      <el-button size="mini" type="text" icon="el-icon-delete" class="delete-button" @click="handleDeleteRole();handleRoleIds(scope.row)">删除</el-button>  
    </template>
    </el-table-column>
    </el-table>
    </div>
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
import {listRole,roleInfo,addRole,updateRole,removeRole} from '@/api/system/role'
export default {
    name:'WcManagerUiRoleInfo',
    data() {
      return {
        //表格数据
        roleList: null,
        //表单数据
        form:{},
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
           roleName:undefined,
           roleCode:undefined
        },
        //角色ID列表
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
      //获取角色列表
      getRoleList(){
        let data= this.data  
        listRole(data).then(response => {
          if(response.count== 0){
            this.roleList = undefined  
          }else{
             this.roleList = response.data[0]  
             this.total = response.count  
          }
            this.loading = false  
        })  
      },
       //角色列表重置
      getRoleListReset(){
        this.data.roleName = undefined  
        this.data.roleCode = undefined  
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        listRole(resetData).then(response => {
            this.roleList = response.data[0]  
            this.total = response.count  
            this.loading = false  
        })  
      },
      //查询角色详情
      handleRoleInfo(id){
        this.reset()  
        this.showFormButton = false  
        roleInfo(id).then(response=>{
         this.form = response.data  
        })
      },
       //新增角色按钮
      handleAddRole(){
        this.reset()  
        this.showFormButton = true  
      },
      //编辑角色按钮
      handleEditRole(row) {
        this.reset()  
        this.form = this.handleRoleInfo(row.id)  
        this.showFormButton = true  
      },
      //提交表单
      submitForm(){
        this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateRole(this.form).then(response =>{
            if(response.code==200){
             this.$msgbox('更新角色信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            })  
            this.dialogFormVisible = false       
            this.getRoleList()      
            }
            })  
          }else{
          addRole(this.form).then(response =>{
          if(response.code==200){
             this.$msgbox('保存角色信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            })  
            this.dialogFormVisible = false  
            this.getRoleList()       
            }
          })          
          }
        }})  
      },
       //获取角色ID 多选
      handleRoleIds(val){
         //批量ID
         if(val instanceof Array){
          this.ids = val.map(item=>{
          return item.id  })  
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
      //删除角色逻辑删除
      handleDeleteRole() {
        this.$confirm('此操作将删除角色, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
         var roleIds = this.ids  
         removeRole(roleIds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             })  
             this.getRoleList()  
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
      reset(){
        this.form={
          roleName:undefined,
          roleCode:undefined,
          roleExplain:undefined,
        }
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val  
        this.getRoleList()    
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val  
        this.getRoleList()   
      },
    },
    created(){
      this.getRoleList()  
    }
}
</script>

<style scoped>
::v-deep .el-dialog{
  width: 37%  
}
::v-deep .el-dialog__body{
  padding: 8px 25px
}
::v-deep .el-dialog__footer{
  padding: 3px 87px 16px  
}
</style>