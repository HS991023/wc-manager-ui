<template>
<div class="main">
    <div class="serach-input">
      <label class="serach-propties">公厕名称:</label>    
      <el-input placeholder="请输入公厕名称" suffix-icon="el-icon-text" v-model="data.toiletName"/>
      <label class="serach-propties">公厕编码:</label>    
      <el-input placeholder="请输入公厕编码" suffix-icon="el-icon-text" v-model="data.toiletCode"/>
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="success" plain icon="el-icon-search" @click="getToiletList()" v-hasPermi="'system:toilet:query'">搜索</el-button>
        <el-button class="serach-button" type="warning" plain icon="el-icon-refresh" @click="getToiletListReset()" v-hasPermi="'system:toilet:query'">重置</el-button>
    </div>
    </div>
    <div class="operator-button-region">
      <el-button type="primary" plain class="operator-button" icon="el-icon-circle-plus" @click="handleAddToilet();dialogFormVisible=true" v-hasPermi="'system:toilet:add'">新增</el-button>
      <el-button type="danger"  plain class="operator-button" icon="el-icon-error" @click="handleDeleteToilet()" v-hasPermi="'system:toilet:delete'">批量删除</el-button>
    </div>
    <div class="form-data">
    <el-dialog title="公厕信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="公厕名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入公厕名称"/>
        </el-form-item>
        <el-form-item label="公厕编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="form.code" autocomplete="off" placeholder="请输入公厕编码"/>
        </el-form-item>
        <el-form-item label="公厕类型" :label-width="formLabelWidth" prop="type">
          <el-input v-model="form.type" autocomplete="off" placeholder="请选择公厕类型"/>
        </el-form-item>
        <el-form-item label="公厕状态" :label-width="formLabelWidth" prop="status">
           <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.dictValue"
              :label="item.dictName"
              :value="item.dictValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公厕位置" :label-width="formLabelWidth" prop="location">
          <el-input v-model="form.location" autocomplete="off" placeholder="请选择公厕位置"/>
          <el-button class="map-select-button" type="primary" icon="el-icon-edit" size="mini" @click="handleDialog"></el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="from-button-region" v-if="showFormButton">
        <el-button class="button" @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="button" type="primary"  @click="submitForm()">确 定</el-button>
      </div>
      </div>
    </el-dialog>
    </div>
    <div class="table-data"> 
    <el-table :data="toiletList" style="width: 100%" ref="multipleTable" v-loading="loading" :header-cell-style="rowClass">
      <el-table-column type="selection" width="55"/>
      <el-table-column label="公厕名称"  width="180" prop="name" key="name">
        <template slot-scope="scope">
            <div class="table-column-region" @click="handleToiletInfo(scope.row.id);dialogFormVisible = true">{{scope.row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column label="公厕类型" width="180" prop="type" key="type"/>
      <el-table-column label="公厕位置" width="180" prop="location" key="location"/>
      <el-table-column label="状态"    width="180" prop="status" key="status"/>
      <el-table-column label="创建时间" width="180" prop="createTime" key="createTime"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEditToilet(scope.row);dialogFormVisible=true" v-hasPermi="'system:toilet:edit'">编辑</el-button>
          <el-button class="delete-button" size="mini" type="text" icon="el-icon-delete"  @click="handleToiletIds(scope.row);handleDeleteToilet()" v-hasPermi="'system:toilet:delete'">删除</el-button> 
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div class="pageHelper" v-if="total !=0 && total>0" v-hasPermi="'system:toilet:query'">
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
    <!-- 地图组件 -->
    <div class="map-region">
       <MapPlugin  v-if="openDialog" ref="testDialog"></MapPlugin>
    </div>
  </div>
</template>

<script>
import {getDictDataByType} from '@/api/system/dict'
import MapPlugin from '@/views/map/MapPlugin.vue'
import {toiletList,toiletInfo,addToilet,updateToilet,removeToilet} from '@/api/business/toilet'
export default {
    name:'WcManagerUiToiletInfo',
    components:{MapPlugin},
    data(){
      return{
        //是否展示地图组件
        openDialog: false,
        //表格数据
        toiletList: null,
        //表单参数
        form:{},
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
           toiletName:undefined,
           toiletCode:undefined,
        },
        //公厕ID列表
        ids:[],
        //状态
        status:'',
        statusList:[],
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
            name: [
                { required: true, message: '请输入公厕名称', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
              ],
            code: [
                { required: true, message: '请输入公厕编码', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
              ],
            status: [
                { required: true, message: '请选择状态', trigger: 'blur' },
            ],
      }
      }
    },
    methods:{
      //获取公厕列表
      getToiletList(){
        let data= this.data  
        toiletList(data).then(response => {
          if(response.count== 0){
            this.total = response.count  
            this.toiletList = undefined  
          }else{
             this.toiletList = response.data[0]  
             //字典值列表回显
             this.viewDictList()
             this.total = response.count  
          }
            this.loading = false  
        }).catch(error=>{
            console.log(error)  
        })
      },
      //公厕列表重置
      getToiletListReset(){
        this.data.toiletName = undefined  
        this.data.toiletCode = undefined  
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
      toiletList(resetData).then(response => {
            this.toiletList = response.data[0]  
            //字典值列表回显
            this.viewDictList()
            this.total = response.count  
            this.loading = false  
        })  
      },
      //查询公厕详情
      handleToiletInfo(id){
        this.reset()  
        this.showFormButton = false
        toiletInfo(id).then(response=>{
          this.form = response.data  
          this.viewDictData()
        })
      },
      //新增公厕按钮
      handleAddToilet(){
        //重置表单
        this.reset()  
        this.clearSelectData()
        this.showFormButton = true  
      },
      //编辑公厕按钮
      handleEditToilet(row) {
        //重置表单
        this.reset()  
        this.form = this.handleToiletInfo(row.id)  
        this.showFormButton = true  
      },
      //提交表单
      submitForm(){
        //绑定下拉框数据到表单
        this.bindFrom()
        this.$refs["form"].validate(valid => {
        if (valid) {
          //替换字典值
          this.replaceDictData()
          //更新用户
          if (this.form.id != undefined) {
            updateToilet(this.form).then(response =>{
            if(response.code==200){
                this.dialogFormVisible = false       
                this.getToiletList()   
                this.$message({
                type: 'success',
                message: '更新成功'
               })      
            }
            })  
          //新增用户  
          }else{
          addToilet(this.form).then(response =>{
          if(response.code==200){
              this.dialogFormVisible = false  
              this.getToiletList()     
              this.$message({
                type: 'success',
                message: '新增成功'
               })     
          }})          
          }
        }})  
      },
      //获取公厕ID 
      handleToiletIds(val){
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
      //删除公厕(逻辑删除)
      handleDeleteToilet() {
        this.$confirm('此操作将删除公厕, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          var tolietds = this.ids  
          removeToilet(tolietds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             })  
             this.getToiletList()  
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
          location:undefined,
          type:undefined,
          status:undefined
        }
      },
      //处理地图组件是否弹出
      handleDialog() {
        //弹出地图组件
        this.openDialog = true;
        this.$bus.$emit("mapplugin",this.openDialog);
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val  
        this.getToiletList()    
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val  
        this.getToiletList()   
      },
      //设置表头颜色
      rowClass({ row, rowIndex}) {
        return 'background:#FAFAFA'
      },
       //清除下拉框值
      clearSelectData(){
        this.status = undefined
      },
      //列表回显字典
      viewDictList(){
         var statuList = this.statusList;
         //列表回显为字典值    
        this.toiletList.forEach(obj=>{
            //状态
            for (let j = 0; j < statuList.length; j++) {
                 const element = statuList[j];
                 if(element.dictValue == obj.status){
                    obj.status = element.dictName}
             }
        });
      },
      //下拉框数据绑定到表单
      bindFrom(){
          this.form.status = this.status
      },
      //表单字典标签替换为字典值
      replaceDictData(){
          this.statusList.forEach(value=>{
            if(this.status == value.dictName){
               this.form.status = value.dictValue
            }
          })
      },
      //回显字典数据及生日数据
      viewDictData(){
          this.statusList.forEach(value=>{
            if(this.form.status == value.dictValue){
               this.status = value.dictName
            }
          })
      },
      //获取下拉框数据
      getSelectData(){
          //状态
          getDictDataByType('status').then(res=>{
            this.statusList = res.data
          }) 
      },
    },
     watch: {
        dialogFormVisible: {
            handler:function () {
               //地图组件监听经纬度
              this.$bus.$on("SendPostitionData", (data) => {
                   if(null !=data && undefined != data){
                     let location = data.lng +','+data.lat;
                     this.form.location = location;
                   } 
              })
           },
        }
    },
    created(){
      this.getSelectData()
      this.getToiletList()   
    },
    mounted(){
    }
}
</script>


<style scoped>
.main{
  /* position: relative; */
}
::v-deep .form-data .el-input{
   width: 172px !important;
}
::v-deep .form-data .el-dialog{
  width: 42%  
}
::v-deep .form-data .el-dialog__body{
  margin-top: 5px !important;
  margin-left: -25px !important;
  padding: 8px 25px
}
::v-deep .form-data .el-dialog__footer{
  padding: 3px 165px 9px  
}

/* 地图选择按钮样式 */
::v-deep .map-select-button{
  position: absolute;
  top: 6px;
  left: 135px;
  width: 35px;
  height: 29px;
}

/* 地图组件位置 */
::v-deep .map-region .el-dialog__wrapper{
  left: 160px !important;
}
</style>