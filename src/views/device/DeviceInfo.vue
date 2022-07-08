<template>
<div>
    <div class="serach-input">
    <label class="serach-propties">设备名称:</label>    
    <el-input placeholder="请输入设备名称" suffix-icon="el-icon-text"/>
    <label class="serach-propties">设备编码:</label>    
    <el-input placeholder="请输入设备编码" suffix-icon="el-icon-text"/>
    <label class="serach-propties">设备状态:</label>    
    <el-input placeholder="请输入设备状态" suffix-icon="el-icon-text"/>
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="success" plain icon="el-icon-search" @click="getDeviceList()">搜索</el-button>
        <el-button class="serach-button" type="warning" plain icon="el-icon-refresh" @click="getDeviceListReset()">重置</el-button>
    </div>
    </div>
    <div class="operator-button-region">
      <el-button type="primary" plain  class="operator-button" icon="el-icon-circle-plus" @click="handleAddDevice();dialogFormVisible=true">新增</el-button>
      <el-button type="danger" plain class="operator-button" icon="el-icon-error" @click="handleDeleteDevice()">批量删除</el-button>
    </div>
    <div class="form-data">
    <el-dialog title="设备信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备编码" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备机器码" :label-width="formLabelWidth">
          <el-input v-model="form.indexCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备状态" :label-width="formLabelWidth">
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
    <el-table :data="deviceInfoList" style="width: 100%" ref="multipleTable"  v-loading="loading" @selection-change="handleDeviceIds">
    <el-table-column type="selection" width="55"/>
    <el-table-column label="设备名称" width="180" prop="name"/>
    <el-table-column label="设备编码" width="180" prop="code"/>
    <el-table-column label="设备机器码" width="180" prop="indexCode"/>
    <el-table-column label="设备状态" width="180" prop="status"/>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEditDevice(scope.row);dialogFormVisible=true">编辑</el-button>
        <el-button size="mini" type="text" icon="el-icon-delete" class="delete-button" @click="handleDeviceIds(scope.row);handleDeleteDevice()">删除</el-button>
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
import {listDevice,deviceInfo,addDevice,updateDevice,removeDevice} from '@/api/business/device'
export default {
    name:'WcManagerUiDeviceInfo',
    data(){
       return{
        //设备列表
        deviceInfoList: null,
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
        //设备ID列表
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
    methods:{
      //获取设备列表
      getDeviceList(){
        let data= this.data
        listDevice(data).then(response => {
          if(response.count== 0){
            this.total = response.count
            this.deviceInfoList = undefined
          }else{
             this.deviceInfoList = response.data[0]
             this.total = response.count
          }
            this.loading = false
        }).catch(error=>{
            console.log(error)
        })
      },
      //设备列表重置
      getDeviceListReset(){
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        listDevice(resetData).then(response => {
            this.deviceInfoList = response.data[0];
            this.total = response.count
            this.loading = false
        });
      },
      //查询设备详情
      handleDeviceInfo(id){
        this.reset()
        this.showFormButton = false
        deviceInfo(id).then(response=>{
          this.form = response.data
        })
      },
      //新增设备按钮
      handleAddDevice(){
        //重置表单
        this.reset()
        this.showFormButton = true
      },
      //编辑设备按钮
      handleEditDevice(row) {
        //重置表单
        this.reset()
        this.form = this.handleDeviceInfo(row.id)
        this.showFormButton = true
      },
      //提交表单
      submitForm(){
        this.$refs["form"].validate(valid => {
        if (valid) {
          //更新设备
          if (this.form.id != undefined) {
            updateDevice(this.form).then(response =>{
            if(response.code==200){
             this.$msgbox('更新设备信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false;     
            this.getDeviceList()
            }
            });
          //新增设备
          }else{
          addDevice(this.form).then(response =>{
          if(response.code==200){
             this.$msgbox('保存设备信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false
            this.getDeviceList()
            }
          });        
          }
        }});
      },
      //获取设备ID 
      handleDeviceIds(val){
         //批量ID
         if(val instanceof Array){
          this.ids = val.map(item=>{
          return item.id
          })
         }else{ 
          //单个
          if(val != undefined){
            this.ids = val.id;
          }
          var rows = []
          rows.push(val)
          this.toggleSelection(rows)
         }
      },
      //删除设备(逻辑删除)
      handleDeleteDevice() {
        this.$confirm('此操作将删除设备, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          var deviceIds = this.ids;
          removeDevice(deviceIds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             });
             this.getDeviceList()
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
          id:undefined,
          name:undefined,
          code:undefined,
          indexCode:undefined,
          status:undefined
        }
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val
        this.getDeviceList()
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val
        this.getDeviceList()
      }
    },
    created(){
      this.getDeviceList()
    },
}
</script>

<style scoped>
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