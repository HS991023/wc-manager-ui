<template>
 <div>
    <div class="serach-input">
      <label class="serach-propties">菜单名称:</label>    
      <el-input placeholder="请输入菜单名称" suffix-icon="el-icon-text" v-model="data.resName"/>
      <label class="serach-propties">权限代码:</label>    
      <el-input placeholder="请输入权限代码" suffix-icon="el-icon-text" v-model="data.permission"/>
      <label class="serach-propties">菜单类型:</label>    
      <el-input placeholder="请输入菜单类型" suffix-icon="el-icon-text" v-model="data.resType"/>
      <label class="serach-propties">状态:</label>    
      <el-input placeholder="请输入状态" suffix-icon="el-icon-text" v-model="data.status"/>
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="success" plain icon="el-icon-search" @click="getResList()">搜索</el-button>
        <el-button class="serach-button" type="warning" plain icon="el-icon-refresh" @click="getResListReset()">重置</el-button>
    </div>
    </div>
    <div class="operator-button-region">
      <el-button type="primary" plain class="operator-button" icon="el-icon-circle-plus" @click="handleAddRole();dialogFormVisible=true">新增</el-button>
      <el-button type="danger"  plain class="operator-button" icon="el-icon-error" @click="handleDeleteRes()">批量删除</el-button>
    </div>
    <div class="form-data">
    <el-dialog title="菜单信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" :label-width="formLabelWidth">
          <el-input v-model="form.resUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限代码" :label-width="formLabelWidth">
          <el-input v-model="form.permission" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-input v-model="form.resType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
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
    <el-table :data="resList" style="width: 100%" ref="multipleTable" row-key="id" v-loading="loading" @selection-change="handleResIds" :header-cell-style="rowClass"
    lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column align="center" label="菜单名称" width="130" prop="name" key="name">
    </el-table-column>  
    <el-table-column align="center" label="菜单图标" width="180" prop="icon" key="icon"/>
    <el-table-column align="center" label="资源路径" width="180" prop="resUrl" key="resUrl"/>
    <el-table-column align="center" label="权限代码" width="180" prop="permission" key="permission"/>
    <el-table-column align="center" label="菜单类型" width="130" prop="resType" key="resType"/>
    <el-table-column align="center" label="状态"    width="70" prop="status" key="status"/>
    <el-table-column align="center" label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEditRole(scope.row);dialogFormVisible=true">编辑</el-button>
        <el-button class="delete-button" size="mini" type="text" icon="el-icon-delete" @click="handleDeleteRes();handleResIds(scope.row)">删除</el-button>  
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
import {resList,resInfo,addRes,updateRes,removeRes} from '@/api/system/res'
export default {
    name:'WcManagerUiMeunInfo',
    data() {
      return {
        //资源/菜单表格数据
        resList: [],
        //表单数据
        form:{},
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
           resName:undefined,
           permission:undefined,
           resType:undefined,
           status:undefined
        },
        //菜单ID列表
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
      }
    },
    methods: {
      //获取菜单列表
      getResList(){
        let data= this.data
        resList(data).then(response => {
          if(response.count== 0){
            this.resList = undefined
          }else{
             this.resList = response.data[0]
             this.total = response.count
          }
            this.loading = false
        })
      },
       //菜单列表重置
      getResListReset(){
        this.data.resName = undefined,
        this.data.permission = undefined,
        this.data.resType = undefined,
        this.data.status = undefined
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        resList(resetData).then(response => {
            this.resList = response.data[0]
            this.total = response.count
            this.loading = false;
        })
      },
      //查询菜单详情
      handleResInfo(id){
        this.reset()
        this.showFormButton = false
        resInfo(id).then(response=>{
          this.form = response.data
        })
      },
       //新增菜单按钮
      handleAddRole(){
        //重置表单
        this.reset()
        this.showFormButton = true;
      },
      //编辑按钮按钮
      handleEditRole(row) {
        //重置表单
        this.reset()
        this.form = this.handleResInfo(row.id)
        this.showFormButton = true
      },
      //提交表单
      submitForm(){
        this.$refs["form"].validate(valid => {
        if (valid) {
          //更新菜单
          if (this.form.id != undefined) {
            updateRes(this.form).then(response =>{
            if(response.code==200){
             this.$msgbox('更新菜单信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false
            this.getResList()
            }
            })
          //新增菜单
          }else{
          addRes(this.form).then(response =>{
          if(response.code==200){
             this.$msgbox('保存菜单信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false
            this.getResList()
            }
          })
          }
        }})
      },
      //获取菜单ID 多选
      handleResIds(val){
         //批量ID
         if(val instanceof Array){
          this.ids = val.map(item=>{
          return item.id;})
         }else{ 
          //单个
          if(val != undefined){
            this.ids = val.id
          }
          var rows = []
          rows.push(val)
          this.toggleSelection(rows)
         }
      },
      //删除菜单逻辑删除
      handleDeleteRes() {
        this.$confirm('此操作将删除菜单, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          var resIds = this.ids;
          removeRes(resIds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             });
             this.getResList()
            }
          })
        }).catch(() => {
          //清除已选择的状态
          this.toggleSelection()
          this.$message({
            type: 'info',
            message: '已取消删除'
          }); 
        });
      },
      //清除多选
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          });
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      //重置表单
      reset() {
        this.form={
          name: undefined,
          resUrl: undefined,
          permission: undefined,
          resType: undefined,
          pid: undefined,
          icon: undefined,
          status:undefined
        }
      },
      //加载菜单子节点数据
      load(tree, treeNode, resolve) {
        var data = [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        setTimeout(() => {
          resolve(
            data
            )
        }, 1000)
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val
        this.getResList()
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val
        this.getResList()
      },
      //设置表头颜色
     rowClass({ row, rowIndex}) {
        return 'background:#FAFAFA'
      }
    },
    created(){
      this.getResList()
    }
}
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
::v-deep .el-dialog{
  width: 37%;
}
::v-deep .el-dialog__body{
  padding: 8px 25px
}
::v-deep .el-dialog__footer{
  padding: 3px 87px 16px;
}
</style>