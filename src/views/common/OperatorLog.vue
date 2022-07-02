<template>
<div>
    <!-- 搜索栏 -->
    <div class="serach-input">
    <label class="serach-propties">操作模块:</label>    
    <el-input placeholder="请选择操作模块" suffix-icon="el-icon-text"/>
    <label class="serach-propties">操作功能:</label>    
    <el-input placeholder="请选择操作功能" suffix-icon="el-icon-text"/>
    <label class="serach-propties">执行动作:</label>    
    <el-input placeholder="请选择执行动作" suffix-icon="el-icon-text"/>
    <!-- 搜索按钮区域 -->
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="primary" icon="el-icon-search" @click="getOperatorLogList()">搜索</el-button>
        <el-button type="primary" class="serach-button" icon="el-icon-error" @click="getOperatorLogListReset()">重置</el-button>
    </div>
    </div>
    <!-- 表格组件 -->
    <div class="table-data"> 
    <el-table :data="operatorList" style="width: 100%" ref="multipleTable"  v-loading="loading">
    <el-table-column align="center" label="操作模块" width="160" prop="operatorModule" key="operatorModule"/>
    <el-table-column align="center" label="操作功能" width="180" prop="operatorFunction" key="operatorFunction"/>
    <el-table-column align="center" label="执行动作" width="180" prop="operatorAction" key="operatorAction"/>
    <el-table-column align="center" label="请求方式" width="130" prop="requestMode" key="requestMode"/>
    <el-table-column align="center" label="操作用户" width="180" prop="createBy" key="createBy"/>
    <el-table-column align="center" label="请求结果" width="180" prop="result" key="result"/>
    <el-table-column align="center" label="请求时间" width="180" prop="createTime" key="createTime"/>
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
import {listOperatorLog} from '@/api/system/operatorlog'
export default {
    name:'OperatorLog',
    data() {
       return {
        //表格数据
        operatorList: null,
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
        },
        //是否加载中
        loading: true,
        //溢出时隐藏
        showOverflowTooltip:true,
    }
    },
    methods: {
      //查询操作日志信息列表
      getOperatorLogList(){
        let data= this.data;
        listOperatorLog(data).then(response => {
          if(response.count== 0){
            this.operatorList = undefined;
          }else{
             this.operatorList = response.data[0];
             this.total = response.count;
          }
            this.loading = false;
        }).catch(error=>{
        })
      },
      //操作日志信息列表重置
      getOperatorLogListReset(){
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        listOperatorLog(resetData).then(response => {
            this.operatorList = response.data[0];
            this.total = response.count;
            this.loading = false;
        });
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val;
        this.getOperatorLogList();  
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val;
        this.getOperatorLogList(); 
      }
    },
    created(){
      this.getOperatorLogList();
    },
    mounted(){
    }
}
</script>

<style scoped>
::v-deep .table-data{
  margin-top: 1px !important;
}
</style>