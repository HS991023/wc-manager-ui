<template>
 <div>
    <div class="serach-input">
      <label class="serach-propties">地区名称:</label>    
      <el-input placeholder="请输入地区名称" suffix-icon="el-icon-text"/>
      <label class="serach-propties">地区类型:</label>    
      <el-input placeholder="请输入地区类型" suffix-icon="el-icon-text"/>
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="success" plain icon="el-icon-search" @click="getRegionList()" v-hasPermi="'system:region:query'">搜索</el-button>
        <el-button class="serach-button" type="warning" plain icon="el-icon-refresh" @click="getRegionListReset()" v-hasPermi="'system:region:query'">重置</el-button>
    </div>
    </div>
    <div class="operator-button-region">
      <el-button type="primary" plain class="operator-button" icon="el-icon-circle-plus" @click="handleAddRegion();dialogFormVisible=true" v-hasPermi="'system:region:add'">新增</el-button>
      <el-button type="danger"  plain class="operator-button" icon="el-icon-error" @click="handleDeleteRegion()" v-hasPermi="'system:region:delete'">批量删除</el-button>
    </div>
    <div class="form-data">
    <el-dialog title="地区信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="省份名称" :label-width="formLabelWidth" prop="provinceName">
          <el-input v-model="form.provinceName" autocomplete="off" placeholder="请输入省份名称"></el-input>
        </el-form-item>
        <el-form-item label="城市名称" :label-width="formLabelWidth" prop="cityName">
          <el-input v-model="form.cityName" autocomplete="off" placeholder="请输入城市名称"></el-input>
        </el-form-item>
        <el-form-item label="区域名称" :label-width="formLabelWidth" prop="regionName">
          <el-input v-model="form.regionName" autocomplete="off" placeholder="请输入区域名称"></el-input>
        </el-form-item>
        <el-form-item label="地理位置" :label-width="formLabelWidth" prop="location">
          <el-input v-model="form.location" autocomplete="off" placeholder="请输入地理位置"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="from-button-region" v-if="showFormButton">
        <el-button class="button" @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="button" type="primary" @click="submitForm()">确 定</el-button>
      </div>
      </div>
    </el-dialog>
    </div>
    <div class="table-data"> 
    <el-table :data="regionList" style="width: 100%" ref="multipleTable" v-loading="loading" :header-cell-style="rowClass" @selection-change="handleRegionIds">
    <el-table-column type="selection" width="55"/>
    <el-table-column label="省份名称" width="180" prop="provinceName" key="provinceName">
      <template slot-scope="scope">
           <div class="table-column-region" @click="handleRegionInfo(scope.row.id);dialogFormVisible = true">{{scope.row.provinceName}}</div>
      </template>
    </el-table-column>  
    <el-table-column label="城市名称" width="180" prop="cityName" key="cityName"/>
    <el-table-column label="区域名称" width="180" prop="regionName" key="regionName"/>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text" icon="el-icon-edit"  @click="handleEditRegion(scope.row);dialogFormVisible=true" v-hasPermi="'system:region:edit'">编辑</el-button>
        <el-button class="delete-button" size="mini" type="text" icon="el-icon-delete" @click="handleDeleteRegion();handleRegionIds(scope.row)" v-hasPermi="'system:region:delete'">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
    <div class="pageHelper" v-if="total !=0 && total>0" v-hasPermi="'system:region:query'">
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
import {regionList,regionInfo,addRegion,updateRegion,removeRegion} from '@/api/business/region'
export default {
    name:'WcManagerUiRegionInfo',
    data() {
       return {
        //表格数据
        regionList: null,
        //表单参数
        form:{},
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
        },
        //地区ID列表
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
         provinceName: [
            { required: true, message: '请输入省份名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
         cityName: [
            { required: true, message: '请输入城市名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
         regionName: [
            { required: true, message: '请输入区域名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
         location: [
            { required: true, message: '请输入位置', trigger: 'blur' },
         ]
    }
    }
    },
    methods: {
      //获取地区列表
      getRegionList(){
        let data= this.data;
        regionList(data).then(response => {
          if(response.count== 0){
            this.regionList = undefined;
          }else{
             this.regionList = response.data[0];
             this.total = response.count;
          }
            this.loading = false;
        }).catch(error=>{
            console.log(error);
        })
      },
      //地区列表重置
      getRegionListReset(){
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        listRegion(resetData).then(response => {
            this.regionList = response.data[0];
            this.total = response.count;
            this.loading = false;
        });
      },
      //查询地区详情
      handleRegionInfo(id){
        this.reset();
        this.showFormButton = false
        regionInfo(id).then(response=>{
          this.form = response.data;
        })
      },
      //新增地区按钮
      handleAddRegion(){
        //重置表单
        this.reset();
        this.showFormButton = true;
      },
      //编辑地区按钮
      handleEditRegion(row) {
        //重置表单
        this.reset();
        this.form = this.handleRegionInfo(row.id);
        this.showFormButton = true;
      },
      //提交表单
      submitForm(){
        this.$refs["form"].validate(valid => {
        if (valid) {
          //更新用户
          if (this.form.id != undefined) {
            updateRegion(this.form).then(response =>{
            if(response.code==200){
                this.dialogFormVisible = false;     
                this.getRegionList();  
                this.$message({
                type: 'success',
                message: '更新成功'
               })     
            }
            });
          //新增用户  
          }else{
           addRegion(this.form).then(response =>{
              if(response.code==200){
                  this.dialogFormVisible = false;
                  this.getRegionList(); 
                  this.$message({
                type: 'success',
                message: '新增成功'
               })   
              }
          });        
          }
        }});
      },
      //获取地区ID 
      handleRegionIds(val){
         //批量ID
         if(val instanceof Array){
          this.ids = val.map(item=>{
          return item.id;
          });
         }else{ 
          //单个
          if(val != undefined){
            this.ids = val.id;
          }
          var rows = [];
          rows.push(val);
          this.toggleSelection(rows);
         };
      },
      //删除地区(逻辑删除)
      handleDeleteRegion() {
        this.$confirm('此操作将删除地区, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          var regionIds = this.ids;
          removeRegion(regionIds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             });
             this.getRegionList();
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
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //重置表单
      reset() {
        this.form={
          id:undefined,
          provinceName:undefined,
          cityName:undefined,
          regionName:undefined,
          location:undefined,
          status:undefined
        }
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val;
        this.getRegionList();  
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val;
        this.getRegionList(); 
      },
      //设置表头颜色
      rowClass({ row, rowIndex}) {
        return 'background:#FAFAFA'
      }
    },
    created(){
      this.getRegionList();
    },
    mounted(){
    }
}
</script>

<style scoped>
::v-deep .form-data .el-dialog__body{
   margin-top: 3px !important;
   padding: 8px 39px !important; 
}

.form-data .el-input{
  width: 271px !important;
}

::v-deep .from-button-region{
    margin-bottom: -3px !important;
    margin-left: 23px;
}
::v-deep .el-dialog{
  width: 30%;
}
::v-deep .el-dialog__footer{
  padding: 10px 199px 13px;
}
</style>