<template>
 <div style="height:100%;">
   <div class="tree-region-style">
   <el-input placeholder="请输入字典名称"></el-input> 
   <div class="tree-region">
       <el-tree :data="dictTypeTree" :props="defaultProps" @node-click="getDictTree"></el-tree>
    </div>
   </div>
   <div class="content">
   <!-- 搜索栏   -->
    <div class="top-style">
      <h2>此处预留样式栏盒子</h2>
    </div> 
    <div class="serach-input">
    <label class="serach-propties">地区名称:</label>    
    <el-input placeholder="请输入地区名称" suffix-icon="el-icon-text"/>
    <label class="serach-propties">地区类型:</label>    
    <el-input placeholder="请输入地区类型" suffix-icon="el-icon-text"/>
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
    <el-dialog title="地区信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form">
        <el-form-item label="省份名称" :label-width="formLabelWidth">
          <el-input v-model="form.provinceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市名称" :label-width="formLabelWidth">
          <el-input v-model="form.cityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域名称" :label-width="formLabelWidth">
          <el-input v-model="form.regionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地理位置" :label-width="formLabelWidth">
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
    <el-table :data="regionList" style="width: 100%" ref="multipleTable"  v-loading="loading" @selection-change="handleRegionIds">
    <el-table-column type="selection" width="55"/>
     <el-table-column fixed label="地区ID" align="center" prop="id" key="userId" v-if="false"/>
    <el-table-column label="省份名称" width="180" prop="provinceName" key="provinceName">
       <!-- 添加列事件 -->
      <template slot-scope="scope">
           <a @click="handleRegionInfo(scope.row.id);dialogFormVisible = true">{{scope.row.provinceName}}</a>
      </template>
    </el-table-column>  
    <el-table-column label="城市名称" width="180" prop="cityName" key="cityName"/>
    <el-table-column label="区域名称" width="180" prop="regionName" key="regionName"/>
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
import {dictTree} from '@/api/system/dict'
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
    }
  },
   methods:{
    getDictTree(){
      dictTree().then(response=>{
        if(200 == response.code){
          this.dictTypeTree = response.data;
        }
      })
    },
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