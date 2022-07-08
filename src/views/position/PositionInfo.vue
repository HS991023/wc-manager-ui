<template>
<div>
    <div class="serach-input">
    <label class="serach-propties">隶属公厕:</label>    
    <el-input placeholder="请输入隶属公厕" suffix-icon="el-icon-text"/>
    <label class="serach-propties">坑位序号:</label>    
    <el-input placeholder="请输入坑位序号" suffix-icon="el-icon-text"/>
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="success" plain icon="el-icon-search" @click="getPositionList()">搜索</el-button>
        <el-button class="serach-button" type="warning" plain icon="el-icon-refresh" @click="getPositionListReset()">重置</el-button>
    </div>
    </div>
    <div class="operator-button-region">
      <el-button type="primary" plain class="operator-button" icon="el-icon-circle-plus" @click="handleAddPosition();dialogFormVisible=true">新增</el-button>
      <el-button type="danger" plain class="operator-button" icon="el-icon-error" @click="handleDeletePosition()">批量删除</el-button>
    </div>
    <div class="form-data">
    <el-dialog title="坑位信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="坑位名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="坑位编码" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="隶属公厕" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="坑位状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="绑定设备" :label-width="formLabelWidth">
          <el-input v-model="form.location" autocomplete="off"></el-input>
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
    <el-table :data="positionList" style="width: 100%" ref="multipleTable" v-loading="loading" @selection-change="handlePositionIds">
    <el-table-column type="selection" width="55"/>
    <el-table-column label="坑位名称" width="180" prop="name" key="name"/>
    <el-table-column label="坑位编码" width="180" prop="number" key="number"/>
    <el-table-column label="隶属公厕" width="180"/>
    <el-table-column label="地区位置" width="180"/>
    <el-table-column label="是否绑定设备" width="180"/>
    <el-table-column label="状态" width="60" prop="status" key="status"/>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text" icon="el-icon-edit"  @click="handleEditPosition(scope.row);dialogFormVisible=true">编辑</el-button>
        <el-button size="mini" type="text" icon="el-icon-delete" class="delete-button" @click="handleDeletePosition(),handlePositionIds(scope.row)">删除</el-button>
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
import {listPosition,positionInfo,addPosition,updatePosition,removePosition} from '@/api/business/position'
export default {
    name:'WcManagerUiPositionInfo',
    data(){
      return{
         //表格数据
        positionList: null,
        //表单参数
        form:{},
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
          
        },
        //坑位ID列表
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
      //获取坑位列表
      getPositionList(){
        let data= this.data
        listPosition(data).then(response => {
          if(response.count== 0){
            this.total = response.count
            this.positionList = undefined
          }else{
             this.positionList = response.data[0]
             this.total = response.count
          }
            this.loading = false
        }).catch(error=>{
            console.log(error)
        })
      },
      //坑位列表重置
      getPositionListReset(){
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        listPosition(resetData).then(response => {
            this.positionList = response.data[0]
            this.total = response.count
            this.loading = false
        })
      },
      //查询坑位详情
      handlePositionInfo(id){
        this.reset()
        this.showFormButton = false
        positionInfo(id).then(response=>{
          this.form = response.data
        })
      },
      //新增坑位按钮
      handleAddPosition(){
        //重置表单
        this.reset()
        this.showFormButton = true
      },
      //编辑坑位按钮
      handleEditPosition(row) {
        //重置表单
        this.reset()
        this.form = this.handlePositionInfo(row.id)
        this.showFormButton = true
      },
      //提交表单
      submitForm(){
        this.$refs["form"].validate(valid => {
        if (valid) {
          //更新坑位
          if (this.form.id != undefined) {
            updatePosition(this.form).then(response =>{
            if(response.code==200){
             this.$msgbox('更新坑位信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false     
            this.getPositionList()
            }
            })
          //新增坑位
          }else{
          addPosition(this.form).then(response =>{
          if(response.code==200){
             this.$msgbox('保存坑位信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            })
            this.dialogFormVisible = false
            this.getPositionList()
            }
          })       
          }
        }})
      },
      //获取坑位ID 
      handlePositionIds(val){
         //批量ID
         if(val instanceof Array){
          this.ids = val.map(item=>{
          return item.id
          })
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
      //删除坑位(逻辑删除)
      handleDeletePosition() {
        this.$confirm('此操作将删除坑位, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          var positionIds = this.ids;
          removePosition(positionIds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             });
             this.getPositionList()
            }
          })
        }).catch(() => {
          //清除已选择的状态
          this.toggleSelection();
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
          number:undefined,
          location:undefined,
          type:undefined,
          status:undefined
        }
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val
        this.getPositionList() 
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val
        this.getPositionList() 
      }
    },
    created(){
      this.getPositionList(); 
    }
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