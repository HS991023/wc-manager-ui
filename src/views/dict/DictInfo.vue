<template>
 <div style="height:100%;">
   <div class="tree-region-style">
   <el-input placeholder="请输入字典名称"></el-input> 
   <div class="tree-region">
       <el-tree :data="dictTypeTree" :props="defaultProps" @node-click="getTreeEventNode" :highlight-current="highlight">
       </el-tree> 
    </div>
   </div>
   <div class="content">
    <!-- 搜索栏 -->
    <div class="serach-input">
    <label class="serach-propties">字典名称:</label>    
    <el-input placeholder="请输入字典名称" suffix-icon="el-icon-text" v-model="data.dictName"/>
    <label class="serach-propties">字典代码:</label>    
    <el-input placeholder="请输入字典代码" suffix-icon="el-icon-text" v-model="data.dictCode"/>
    <!-- 搜索按钮区域 -->
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="primary" icon="el-icon-search" @click="getDictDataList()">搜索</el-button>
        <el-button type="primary" class="serach-button" icon="el-icon-error" @click="getResetDictDataList()">重置</el-button>
    </div>
    </div>
   <!-- 操作数据按钮区域 -->
    <div class="operator-button-region">
      <el-button type="primary" plain class="operator-button" icon="el-icon-circle-plus" @click="handleAddDict();dialogFormVisible=true">新增</el-button>
      <el-button type="danger" plain class="operator-button" icon="el-icon-error" @click="handleDeleteDict()">批量删除</el-button>
    </div>
    <div class="form-data">
    <!-- 表单新增或编辑对话框   -->
    <el-dialog title="字典信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="字典名称" :label-width="formLabelWidth">
          <el-input v-model="form.dictName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典代码" :label-width="formLabelWidth">
          <el-input v-model="form.dictCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典值" :label-width="formLabelWidth">
          <el-input v-model="form.dictValue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典状态" :label-width="formLabelWidth">
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
    <!-- 表格组件 -->
    <div class="table-data"> 
    <el-table :data="dictDataList" style="width: 100%" ref="multipleTable"  v-loading="loading" @selection-change="handleDictIds">
    <el-table-column type="selection" width="55"/>
    <el-table-column align="center" label="字典名称" width="140" prop="dictName" key="dictName">
       <!-- 添加列事件 -->
      <template slot-scope="scope">
           <a @click="handleDictInfo(scope.row);dialogFormVisible = true">{{scope.row.dictName}}</a>
      </template>
    </el-table-column>  
    <el-table-column align="center" label="字典代码" width="190" prop="dictCode" key="dictCode"/>
    <el-table-column align="center" label="字典值" width="180" prop="dictValue" key="dictValue"/>
    <el-table-column align="center" label="状态" width="90" prop="status" key="status"/>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEditDict(scope.row);dialogFormVisible=true">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDeleteDict();handleDictIds(scope.row)">删除</el-button>
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
import {dictTree,getDictTypeTopData,getDictDataByType,getDictTypeInfo,getDictDataInfo,
addDictTypeInfo,addDictDataInfo,updateDictTypeInfo,updateDictDataInfo,removeDictType,removeDictData} from '@/api/system/dict'
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
      //正在操作的字典数据列表类型(0为字典类型列表 1为字典数据列表)
      dictDataListType:undefined,
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
        dictName:undefined,
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
      //选中的树节点是否高亮
      highlight: true
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
        //重置搜索条件
        this.serachReset();
        //重置字典信息列表
        this.resetDictDataList();
        let data ={
          pageNum: 1,
          pageSize: 10,
          //字典ID
          id:undefined,
          dictName:undefined,
          //字典代码
          dictCode:undefined,
      };
        //判断level是否等于0(顶级节点)
        if(val.level != undefined && val.level == 0){
          this.dictDataListType = 0;
          data.id = val.id; 
          getDictTypeTopData(data).then(response =>{
            if(response.code == 200){
               if(response.count == 0){
                  this.dictDataList = null;
                  this.total = response.count;
               }else{
                  this.dictDataList = response.data[0];
                  this.total = response.count;
               }
            }
          });
        }else{
          this.dictDataListType = 1;
          data.dictCode = val.code; 
          //根据字典类型获取字典数据
          getDictDataByType(data).then(response=>{
            if(response.code == 200){
              if(response.count == 0){
                  this.dictDataList = null;
                  this.total = response.count;
               }else{
                  this.dictDataList = response.data[0];
                  this.total = response.count;
               }
            }
          });
        } 
        this.loading = false;
    },
    //获取字典数据列表
    getDictDataList(){
        this.resetDictDataList();
        let data = this.data;  
        let type = this.dictDataListType;
        //判断为字典类型信息还是为字典数据信息
        if(type != undefined && type == 0){
          getDictTypeTopData(data).then(response =>{
            if(response.code == 200){
              if(response.count == 0){
                  this.dictDataList = null;
                  this.total = response.count;
               }else{
                  this.dictDataList = response.data[0];
                  this.total = response.count;
               }
              this.dictDataListType = 0;
            }
          });
        }else{
          //根据字典类型获取字典数据
          getDictDataByType(data).then(response=>{
            if(response.code == 200){
              if(response.count == 0){
                  this.dictDataList = null;
                  this.total = response.count;
               }else{
                  this.dictDataList = response.data[0];
                  this.total = response.count;
               }
              this.dictDataListType = 1;
            }
          });
        } 
        this.loading = false;
    },
    //获取重置后的字典数据列表
    getResetDictDataList(){
        this.resetDictDataList();
        this.serachReset();
        let data = {
           pageNum: 1,
           pageSize: 10,
        }
        let type = this.dictDataListType
        //判断为字典类型信息还是为字典数据信息
        if(type != undefined && type == 0){
          getDictTypeTopData(data).then(response =>{
            if(response.code == 200){
              if(response.count == 0){
                  this.dictDataList = null;
                  this.total = response.count;
               }else{
                  this.dictDataList = response.data[0];
                  this.total = response.count;
               }
              this.dictDataListType = 0;
            }
          });
        }else{
          //根据字典类型获取字典数据
          getDictDataByType(data).then(response=>{
            if(response.code == 200 && null !=response.data[0]){
              if(response.count == 0){
                  this.dictDataList = null;
                  this.total = response.count;
               }else{
                  this.dictDataList = response.data[0];
                  this.total = response.count;
               }
              this.dictDataListType = 1;
            }
          });
        } 
        this.loading = false;
    },
    //重置列表
    resetDictDataList(){
      this.dictDataList = undefined;
    },
    //查询字典详情
    handleDictInfo(row){
      this.reset();
      //分类为0,1,2,3的请求字典类型信息反之请求字典数据信息
      if(row.type == 0 || row.type == 1 || row.type == 2 || row.type == 3
        ||row.classify == 3){
         getDictTypeInfo(row.id).then(response =>{
           if(response.code == 200){
            this.form = response.data;
           }
         });
      }else{
        getDictDataInfo(row.id).then(response=>{
           if(response.code == 200){
            this.form = response.data;
           }
        })
      }
    },
    //新增字典按钮
    handleAddDict(){
      //重置表单
      this.reset();
      this.showFormButton = true;
    },
    //编辑字典按钮
    handleEditDict(row) {
      console.log(row);
      //重置表单
      this.reset();
      this.form = this.handleDictInfo(row);
      this.showFormButton = true;
    },
    //提交表单
    submitForm(){
      //判断新增的数据为字典类型信息还是为字典数据信息
      if(this.dictDataListType == 0){
        this.$refs["form"].validate(valid => {
        if (valid) {
          //更新字典类型信息
          if(this.form.id != undefined) {
            updateDictTypeInfo(this.form).then(response =>{
            if(response.code==200){
              this.$msgbox('更新成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false;     
            this.getResetDictDataList();    
            }
            });
          //新增字典类型信息  
          }else{
          console.log(this.form);  
          addDictTypeInfo(this.form).then(response =>{
          if(response.code==200){
              this.$msgbox('保存成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false;
            this.getResetDictDataList();     
            }
          });        
          }}});
      }else if(this.dictDataListType == 1){
        this.$refs["form"].validate(valid => {
        if (valid) {
          //更新字典数据信息
          if (this.form.id != undefined) {
            updateDictDataInfo(this.form).then(response =>{
            if(response.code==200){
              this.$msgbox('更新成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false;     
            this.getResetDictDataList();    
            }
            });
          //新增字典数据信息
          }else{
          console.log(this.form);  
          addDictDataInfo(this.form).then(response =>{
          if(response.code==200){
              this.$msgbox('保存成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false;
            this.getResetDictDataList();     
            }
        });        
        }}});
      }
    },
    //获取字典信息ID 
    handleDictIds(val){
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
    //删除字典(逻辑删除)
    handleDeleteDict() {
      //判断新增的数据为字典类型信息还是为字典数据信息
      if(this.dictDataListType == 0){
        this.$confirm('此操作将删除字典, 是否继续?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          //发送删除请求
          var dictIds = this.ids;
          removeDictType(dictIds.toString()).then(response=>{
            if(response.code==200){
                this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getDictTree();
              this.getDictDataList();
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
        }else{
          this.$confirm('此操作将删除字典, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            //发送删除请求
            var dictIds = this.ids;
            removeDictData(dictIds.toString()).then(response=>{
              if(response.code==200){
                  this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getDictTree();
                this.getDictDataList();
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
        }
    },
    //清除多选
    toggleSelection(rows) {
      if (null != rows) {
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
        dictName:undefined,
        dictCode:undefined,
        dictValue:undefined,
        status:undefined,
      }
    },
    //搜索条件重置
    serachReset(){
        this.data.id = undefined;
        this.data.dictName = undefined;
        this.data.dictCode = undefined;
    },
    //更改每页大小dictName
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
::v-deep .tree-region-style{
  margin-top: 54px !important;
}
::v-deep .serach-input{
  margin-top: 62px !important
}
::v-deep .table-data{
  margin-top: 78px !important;
}

.table-data{
  margin-top: -23px !important;
}

.content{
   float: left;
   width: 84%;
   height: 100%;
   margin-top: 10px;
   margin-left: 15px;
}

</style>