<template>
<div>
    <div class="serach-input">
      <label class="serach-propties">浏览器:</label>    
      <el-input placeholder="请选择浏览器" suffix-icon="el-icon-text"/>
      <label class="serach-propties">操作系统:</label>    
      <el-input placeholder="请选择操作系统" suffix-icon="el-icon-text"/>
      <label class="serach-propties">登录用户:</label>    
      <el-input placeholder="请选择登录用户" suffix-icon="el-icon-text"/>
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="success" plain icon="el-icon-search" @click="getLoginLogList()" v-hasPermi="'system:login:log:query'">搜索</el-button>
        <el-button class="serach-button" type="warning" plain icon="el-icon-refresh" @click="getLoginLogListReset()" v-hasPermi="'system:login:log:query'">重置</el-button>
    </div>
    </div>
    <div class="table-data"> 
    <el-table :data="loginLogList" style="width: 100%" max-height="610px" ref="multipleTable"  v-loading="loading" :header-cell-style="rowClass">
      <el-table-column align="center" label="数据ID" width="160" prop="id" key="id" :show-overflow-tooltip="showOverflowTooltip"/>
      <el-table-column align="center" label="浏览器" width="180" prop="browserName" key="browserName"/>
      <el-table-column align="center" label="浏览器版本" width="180" prop="browserVersion" key="browserVersion"/>
      <el-table-column align="center" label="操作系统" width="130" prop="operatorSystem" key="operatorSystem"/>
      <el-table-column align="center" label="登录用户" width="180" prop="createBy" key="createBy"/>
      <el-table-column align="center" label="请求结果" width="180" prop="result" key="result"/>
      <el-table-column align="center" label="登录时间" width="180" prop="createTime" key="createTime"/>
    </el-table>
    </div>
    <div class="pageHelper" v-if="total !=0 && total>0" v-hasPermi="'system:login:log:query'">
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
import {loginlogList} from '@/api/system/loginlog'
export default {
    name:'WcManagerUiLoginLog',
    data() {
       return {
        //表格数据
        loginLogList: null,
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
      getLoginLogList(){
        let data= this.data
        loginlogList(data).then(response => {
          if(response.count== 0){
            this.loginLogList = undefined;
          }else{
             this.loginLogList = response.data[0]
             this.total = response.count
          }
            this.loading = false;
        }).catch(error=>{
            console.log(error)
        })
      },
      //操作日志信息列表重置
      getLoginLogListReset(){
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        loginlogList(resetData).then(response => {
            this.loginLogList = response.data[0];
            this.total = response.count
            this.loading = false
        });
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val
        this.getLoginLogList() 
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val
        this.getLoginLogList()
      },
      //设置表头颜色
      rowClass({ row, rowIndex}) {
        return 'background:#FAFAFA'
      }
    },
    created(){
      this.getLoginLogList()
    }
}
</script>

<style scoped>
::v-deep .table-data{
  margin-top: 1px !important;
}
</style>