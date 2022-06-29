<template>
 <div style="height:100%;">
   <div class="tree-region-style">
   <el-input placeholder="请输入字典名称"></el-input> 
   <div class="tree-region">
       <el-tree :data="dictTypeTree" :props="defaultProps" @node-click="getTreeEventNode"/>
    </div>
   </div>
   <div class="content">
   <!-- 搜索栏   -->
    <div class="top-style">
      <h2>此处预留样式栏盒子</h2>
    </div> 
    <div class="serach-input">
    <label class="serach-propties">字典名称:</label>    
    <el-input placeholder="请输入字典名称" suffix-icon="el-icon-text"/>
    <label class="serach-propties">字典代码:</label>    
    <el-input placeholder="请输入字典代码" suffix-icon="el-icon-text"/>
    <!-- 搜索按钮区域 -->
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="primary" icon="el-icon-search" @click="getRegionList()">搜索</el-button>
        <el-button type="primary" class="serach-button" icon="el-icon-error" @click="getRegionListReset()">重置</el-button>
    </div>
    </div>
   <!-- 操作数据按钮区域 -->
    <div class="operator-button-region">
      <el-button type="primary" class="operator-button" icon="el-icon-circle-plus" @click="handleAddRegion();dialogFormVisible=true">新增</el-button>
      <el-button type="danger" class="operator-button" icon="el-icon-error" @click="handleDeleteRegion()">批量删除</el-button>
    </div>
    <div class="form-data">
    <!-- 表单新增或编辑对话框   -->
    <el-dialog title="字典信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="上级字典" :label-width="formLabelWidth">
          <el-input v-model="form.location" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典名称" :label-width="formLabelWidth">
          <el-input v-model="form.provinceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典代码" :label-width="formLabelWidth">
          <el-input v-model="form.cityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典值" :label-width="formLabelWidth">
          <el-input v-model="form.regionName" autocomplete="off"></el-input>
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
    <el-table :data="dictDataList" style="width: 100%" ref="multipleTable"  v-loading="loading" @selection-change="handleRegionIds">
    <el-table-column type="selection" width="55"/>
    <el-table-column align="center" label="字典名称" width="140" prop="dictName" key="dictName">
       <!-- 添加列事件 -->
      <template slot-scope="scope">
           <a @click="handleRegionInfo(scope.row.id);dialogFormVisible = true">{{scope.row.dictName}}</a>
      </template>
    </el-table-column>  
    <el-table-column align="center" label="字典代码" width="190" prop="dictCode" key="dictCode"/>
    <el-table-column align="center" label="字典值" width="180" prop="dictValue" key="dictValue"/>
    <el-table-column align="center" label="状态" width="90" prop="status" key="status"/>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEditRegion(scope.row);dialogFormVisible=true">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDeleteRegion();handleRegionIds(scope.row)">删除</el-button>
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
 </div>
</template>

<script>
import {dictTree,getDictTypeTopData,getDictDataByType} from '@/api/system/dict'
export default {
   name:'DictInfo',
   data(){
    return{
      //字典类型树
      dictTypeTree:[],
      defaultProps: {
          id:'id',
          children: 'children',
          label: 'label'
        },
      //字典数据列表
      dictDataList: null,
      //表单参数
      form:{},
      //总数
      total:null,
      //分页参数
      data:{
        pageNum: 1,
        pageSize: 10,
        //字典ID
        id:undefined,
        //字典代码
        dictCode:undefined,
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
    }
  },
   methods:{
    //获取节点树
    getDictTree(){
      dictTree().then(response=>{
        if(200 == response.code){
          this.dictTypeTree = response.data;
        }
      });
      this.loading = false;
    },
    //获取节点点击事件数据
    getTreeEventNode(val){
        this.resetDictDataList();
        let data = this.data;  
        //判断level是否等于0(顶级节点)
        if(val.level != undefined && val.level == 0){
          data.id = val.id; 
          getDictTypeTopData(data).then(response =>{
            this.dictDataList = response.data[0];
            this.total = response.count;
          });
        }else{
          data.dictCode = val.code; 
          //根据字典类型获取字典数据
          getDictDataByType(data).then(response=>{
            this.dictDataList = response.data[0];
            this.total = response.count;
          });
        } 
        this.loading = false;
    },
    //重置列表
    resetDictDataList(){
      this.dictDataList = null;
    },
    //获取地区列表
    getRegionList(){
      let data= this.data;
      listRegion(data).then(response => {
        console.log(response);
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
      console.log(row);
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
            this.$msgbox('更新地区信息成功', '系统提示', {
              confirmButtonText: '确定',
              type: 'warning'
          });
          this.dialogFormVisible = false;     
          this.getRegionList();    
          }
          });
        //新增用户  
        }else{
        addRegion(this.form).then(response =>{
        if(response.code==200){
            this.$msgbox('保存地区信息成功', '系统提示', {
              confirmButtonText: '确定',
              type: 'warning'
          });
          this.dialogFormVisible = false;
          this.getRegionList();     
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
    }
    },
    created(){
     this.getDictTree();
   }

}
</script>

<style scoped>
.content{
  margin-top: -780px;
  margin-left: 200px;
}

</style>