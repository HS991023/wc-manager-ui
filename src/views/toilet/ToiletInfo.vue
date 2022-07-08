<template>
<div>
    <!-- 搜索栏 -->
    <div class="serach-input">
    <label class="serach-propties">公厕名称:</label>    
    <el-input placeholder="请输入公厕名称" suffix-icon="el-icon-text" v-model="data.toiletName"/>
    <label class="serach-propties">公厕编码:</label>    
    <el-input placeholder="请输入公厕编码" suffix-icon="el-icon-text" v-model="data.toiletCode"/>
    <!-- 搜索按钮区域 -->
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="success" plain icon="el-icon-search" @click="getToiletList()">搜索</el-button>
        <el-button class="serach-button" type="warning" plain icon="el-icon-refresh" @click="getToiletListReset()">重置</el-button>
    </div>
    </div>
   <!-- 操作数据按钮区域 -->
    <div class="operator-button-region">
      <el-button type="primary" plain class="operator-button" icon="el-icon-circle-plus" @click="handleAddToilet();dialogFormVisible=true">新增</el-button>
      <el-button type="danger"  plain class="operator-button" icon="el-icon-error" @click="handleDeleteToilet()">批量删除</el-button>
    </div>
    <div class="form-data">
    <!-- 表单新增或编辑对话框   -->
    <el-dialog title="公厕信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="公厕名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公厕编码" :label-width="formLabelWidth">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公厕类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公厕状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公厕位置" :label-width="formLabelWidth">
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
    <!-- 表格组件 -->
    <div class="table-data"> 
    <el-table :data="toiletList" style="width: 100%" ref="multipleTable"  v-loading="loading">
    <el-table-column type="selection" width="55"/>
    <el-table-column label="公厕名称"  width="180" prop="name" key="name">
        <!-- 添加列事件 -->
      <template slot-scope="scope">
           <a @click="handleToiletInfo(scope.row.id);dialogFormVisible = true;">{{scope.row.name}}</a>
      </template>
    </el-table-column>
    <el-table-column label="公厕类型" width="180" prop="type" key="type"/>
    <el-table-column label="公厕位置" width="180" prop="location" key="location"/>
    <el-table-column label="状态" width="180" prop="status" key="status"/>
    <el-table-column label="创建时间" width="180" prop="createTime" key="createTime"/>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEditToilet(scope.row);dialogFormVisible=true">编辑</el-button>
        <el-button size="mini" type="text" icon="el-icon-delete" class="delete-button" @click="handleToiletIds(scope.row);handleDeleteToilet();">删除</el-button> 
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
import {listToilet,toiletInfo,addToilet,updateToilet,removeToilet} from '@/api/business/toilet'
export default {
    name:'WcManagerUiToiletInfo',
    data(){
      return{
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
      //获取公厕列表
      getToiletList(){
        let data= this.data;
        listToilet(data).then(response => {
          if(response.count== 0){
            this.total = response.count;
            this.toiletList = undefined;
          }else{
             this.toiletList = response.data[0];
             this.total = response.count;
          }
            this.loading = false;
        }).catch(error=>{
            console.log(error);
        })
      },
      //公厕列表重置
      getToiletListReset(){
        this.data.toiletName = undefined;
        this.data.toiletCode = undefined;
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        listToilet(resetData).then(response => {
            this.toiletList = response.data[0];
            this.total = response.count;
            this.loading = false;
        });
      },
      //查询公厕详情
      handleToiletInfo(id){
        this.reset();
        this.showFormButton = false
        toiletInfo(id).then(response=>{
          this.form = response.data;
        })
      },
      //新增公厕按钮
      handleAddToilet(){
        //重置表单
        this.reset();
        this.showFormButton = true;
      },
      //编辑公厕按钮
      handleEditToilet(row) {
        console.log(row);
        //重置表单
        this.reset();
        this.form = this.handleToiletInfo(row.id);
        this.showFormButton = true;
      },
      //提交表单
      submitForm(){
        this.$refs["form"].validate(valid => {
        if (valid) {
          //更新用户
          if (this.form.id != undefined) {
            updateToilet(this.form).then(response =>{
            if(response.code==200){
             this.$msgbox('更新公厕信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false;     
            this.getToiletList();    
            }
            });
          //新增用户  
          }else{
          addToilet(this.form).then(response =>{
          if(response.code==200){
             this.$msgbox('保存公厕信息成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false;
            this.getToiletList();     
            }
          });        
          }
        }});
      },
      //获取公厕ID 
      handleToiletIds(val){
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
      //删除公厕(逻辑删除)
      handleDeleteToilet() {
        this.$confirm('此操作将删除公厕, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          var tolietds = this.ids;
          removeToilet(tolietds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             });
             this.getToiletList();
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
          name:undefined,
          code:undefined,
          location:undefined,
          type:undefined,
          status:undefined
        }
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val;
        this.getToiletList();  
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val;
        this.getToiletList(); 
      }
    },
    created(){
      this.getToiletList(); 
    },
    mounted(){
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