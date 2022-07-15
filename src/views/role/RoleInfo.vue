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
      <el-button class="operator-button" type="primary" plain icon="el-icon-circle-plus" @click="handleAddRole();dialogFormVisible=true">新增</el-button>
      <el-button class="operator-button" type="danger"  plain icon="el-icon-error" @click="handleDeleteRole()">批量删除</el-button>
    </div>
    <div class="form-data">
    <el-dialog title="角色信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" :disabled="disabled">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="form.roleName" autocomplete="off" placeholder="请输入角色名称"/>
        </el-form-item>
        <el-form-item label="角色代码" :label-width="formLabelWidth" prop="roleCode">
          <el-input v-model="form.roleCode" autocomplete="off" placeholder="请输入角色代码"/>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.roleExplain" autocomplete="off" placeholder="请输入角色描述"/>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
            <el-radio-group v-model="radio">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限" :label-width="formLabelWidth">
          <el-checkbox v-model="open" size="small">展开/折叠</el-checkbox>
          <el-checkbox v-model="checkeall" size="small">全选/全不选</el-checkbox>
          <el-checkbox v-model="linkage" size="small">父子联动</el-checkbox>
        </el-form-item>
        <!-- 选择菜单区域 -->
        <div class="select-meun-region">
          <el-tree
          node-key="id"
          ref="tree" 
          highlight-current
          :data="meunTree"
          :props="defaultProps"
          :check-strictly="checkstrictly"
          :default-expand-all="open"
          show-checkbox>
        </el-tree>
        </div>
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
    <el-table ref="multipleTable" :data="roleList" style="width: 100%" v-loading="loading"  @selection-change="handleRoleIds" :header-cell-style="rowClass">
      <el-table-column type="selection" width="55"/>
      <el-table-column label="角色名" prop="roleName" width="180">
        <template slot-scope="scope">
            <div class="table-column-region" @click="handleRoleInfo(scope.row.id);dialogFormVisible=true">{{scope.row.roleName}}</div>
        </template>
      </el-table-column>  
      <el-table-column label="角色代码" prop="roleCode" width="180"/>
      <el-table-column label="状态" prop="status" width="180"/>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEditRole(scope.row);dialogFormVisible = true">编辑</el-button>
        <el-button class="delete-button" size="mini" type="text" icon="el-icon-delete" @click="handleDeleteRole();handleRoleIds(scope.row)">删除</el-button>  
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
import {getMeunTree} from '@/api/common/tree'
import {getDictDataByType} from '@/api/system/dict'
import {roleList,roleInfo,addRole,updateRole,removeRole} from '@/api/system/role'
export default {
    name:'WcManagerUiRoleInfo',
    data() {
      return {
        //表格数据
        roleList: null,
        //表单禁用启用
        disabled: false,
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
        //展示折叠
        open: false,
        //全选
        checkeall: false,
        //父子联动
        linkage: false,
        checkstrictly: true,
        //菜单树
        meunTree:[],
        //启用禁用
        radio:undefined,
        statusList:[],
        defaultProps: {
          label: 'label',
          children: 'children'
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
        //校验规则
        rules: {
         roleName:[
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          roleCode:[
            { required: true, message: '请输入角色代码', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          status:[
            { required: true, message: '请选择状态', trigger: 'blur' },
          ]
    }
    }},
    methods: {
      //获取角色列表
      getRoleList(){
        let data= this.data  
        roleList(data).then(response => {
          if(response.count== 0){
            this.roleList = undefined  
          }else{
             this.roleList = response.data[0]  
             this.viewDictList()
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
        roleList(resetData).then(response => {
            this.roleList = response.data[0]  
            this.viewDictList()
            this.total = response.count  
            this.loading = false  
        })  
      },
      //查询角色详情
      handleRoleInfo(id){
        this.reset()  
        this.disabled = true
        this.showFormButton = false  
        this.getMeunTreeData()
        this.resetMeunAuthButton()
        roleInfo(id).then(response=>{
         this.form = response.data  
         //渲染已勾选的菜单权限
         this.viewResTree(this.form.menuAuthList)
         this.radio = this.form.status 
        })
      },
      //重置菜单权限树按钮
      resetMeunAuthButton(){
         this.open = false;
         this.checkeall = false;
         this.linkage = false;
      },
      //新增角色按钮
      handleAddRole(){
        this.reset()  
        this.disabled = false
        this.getMeunTreeData();
        this.resetMeunAuthButton()
        if(this.$refs.tree !=null){
            //取消选中
           this.$refs.tree.setCheckedKeys([]);
        }
        this.showFormButton = true  
      },
      //编辑角色按钮
      handleEditRole(row) {
        this.reset()  
        this.form = this.handleRoleInfo(row.id)  
        this.disabled = false
        this.showFormButton = true  
      },
      //提交表单
      submitForm(){
        //状态赋值给from
        this.form.status = this.radio
        //菜单权限列表赋值给from
        this.form.menuAuthList = this.$refs.tree.getCheckedKeys();
        this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != undefined) {
            updateRole(this.form).then(response =>{
                this.$msgbox('更新角色信息成功', '系统提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
              })  
              this.dialogFormVisible = false       
              this.getRoleList()      
            })  
          }else{
          addRole(this.form).then(response =>{
            this.$msgbox('保存角色信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            })  
            this.dialogFormVisible = false  
            this.getRoleList()   
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
             this.$message({
                type: 'success',
                message: '删除成功!'
             })  
             this.getRoleList()  
            
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
          status:undefined,
          //菜单权限ID列表
          menuAuthList:[]
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
      //设置表头颜色
     rowClass({ row, rowIndex}) {
        return 'background:#FAFAFA'
      },
      // 获取菜单权限树
     getMeunTreeData(){
        getMeunTree().then(res=>{
              this.meunTree = res.data
        })
     },
      //获取下拉框数据
     getSelectData(){
            //状态
            getDictDataByType('status').then(res=>{
              this.statusList = res.data
            })
      },
      //渲染菜单权限树
      viewResTree(menuAuthList){
        //更新菜单权限树为选中状态
         this.$refs.tree.setCheckedKeys(menuAuthList)
      },
      //回显列表字典值
      viewDictList(){
          var statuList = this.statusList;
          //列表回显为字典值    
        this.roleList.forEach(obj=>{
            //状态
            for (let j = 0; j < statuList.length; j++) {
                  const element = statuList[j];
                  if(element.dictValue == obj.status){
                    obj.status = element.dictName}
              }
        });},
      //遍历函数
      arrForEach (arr, arr1, str) {
            arr.forEach(item => {
              if (str) {
                arr1.push(item[str])
              } else {
                arr1.push(item)
              }
              if (item.children && item.children.length) {
                this.arrForEach(item.children, arr1, str)
              }
            })
          }
    },
    watch:{
       // 展开/折叠
       open:{
         handler(newValue,oldValue){
            this.open = newValue
            let nodesMap =  this.$refs.tree.store.nodesMap;
            for (let key in nodesMap) {
              nodesMap[key].expanded = newValue;
            }
       }},
       // 全选/全不选
       checkeall:{
          handler(newValue,oldValue){
          if (this.checkeall) {
              //全选
              let arr = []
              //遍历
              this.arrForEach(this.meunTree, arr, 'id')
              this.$refs.tree.setCheckedKeys(arr)
          }else{
              //取消选中
              this.$refs.tree.setCheckedKeys([]);
          }
         }
       },
       // 父子联动
       linkage:{
         handler(newValue,oldValue){
            if(newValue == true){
              this.checkstrictly = false;
            }
            if(newValue == false){
              this.checkstrictly = true;
            }
         }
       }
    },
    created(){
      this.getSelectData();
      this.getRoleList() 
    }
}
</script>

<style scoped>
::v-deep .select-meun-region{
    width: 90%;
    height: 100px;
    overflow-x: auto;
    margin-left: 43px;
    margin-top: -21px;
    margin-bottom: 10px;
    border: 1px solid #00000021;
}
::v-deep .form-data .el-input__inner{
  width: 285px;
}
::v-deep .from-button-region {
    margin-top: 11px;
    margin-bottom: -7px;
    margin-left: 230px;
    width: 200px;
    height: 35px;
}

::v-deep .el-tree-node__label{
    font-size: 13px;
}

::v-deep .el-dialog{
  width: 32%  
}
::v-deep .el-dialog__body{
  margin-left: -29px !important;
  padding: 8px 25px
}
::v-deep .el-dialog__footer{
  margin-left: -77px !important;
  padding: 3px 87px 16px  
}
</style>