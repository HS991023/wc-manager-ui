<template>
  <div>
    <div class="serach-input">
      <label class="serach-propties">用户昵称:</label>    
      <el-input placeholder="请输入用户昵称" suffix-icon="el-icon-text" v-model="data.nickName"/>
      <label class="serach-propties">登录IP:</label>    
      <el-input placeholder="请选择登录IP" suffix-icon="el-icon-text" v-model="data.ip"/>
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="success" plain icon="el-icon-search" @click="getOnlineUserList()">搜索</el-button>
        <el-button class="serach-button" type="warning" plain icon="el-icon-refresh" @click="geOnlineUseListReset()">重置</el-button>
    </div>
    </div>
    <div class="table-data"> 
      <el-table :data="onlineUserList" style="width: 100%" ref="multipleTable"  v-loading="loading" :header-cell-style="rowClass">
        <el-table-column align="center" label="会话ID" width="180" prop="jti" key="jti" />
        <el-table-column align="center" label="在线用户" width="130" prop="nickName" key="nickName"/>
        <el-table-column align="center" label="客户端" width="130" prop="browserName" key="browserName"/>
        <el-table-column align="center" label="客户端版本" width="130" prop="browserVersion" key="browserVersion"/>
        <el-table-column align="center" label="操作系统" width="130" prop="operatorSystem" key="operatorSystem"/>
        <el-table-column align="center" label="登录IP" width="130" prop="loginIp" key="loginIp"/>
        <el-table-column align="center" label="登录地区" width="130" prop="address" key="address"/>
        <el-table-column align="center" label="登录时间" width="180" prop="loginTime" key="loginTime"/>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" style="color:#f12626cf" @click="handleKickOut(scope.row)">强制踢出</el-button>
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
import {onLineUserList,kickOutUser} from '@/api/system/onlineuser'
export default {
    name:'WcManagerUiOnlineUser',
    data() {
       return {
        //表格数据
        onlineUserList: null,
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
           nickName:undefined,
           ip:undefined
        },
        //是否加载中
        loading: true,
        //溢出时隐藏
        showOverflowTooltip:true,
    }
    },
    methods: {
      //查询在线用户信息列表
      getOnlineUserList(){
        let data= this.data   
        onLineUserList(data).then(response => {
          if(response.count== 0){
             this.onlineUserList = undefined   
          }else{
             this.onlineUserList = response.data   
          }
           this.total = response.count   
           this.loading = false   
        }).catch(error=>{
        })
      },
      //在线用户信息列表重置
      geOnlineUseListReset(){
        this.data.nickName = undefined   
        this.data.ip = undefined   
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        onLineUserList(resetData).then(response => {
            this.onlineUserList = response.data   
            this.total = response.count   
            this.loading = false   
        })   
      },
      //踢出用户
      handleKickOut(val){
        kickOutUser(val.jti).then(response=>{
          this.getOnlineUserList()   
          this.$msgbox('踢出成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            })   
        }).catch(()=>{

        })
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val   
        this.getOnlineUseList()     
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val   
        this.getOnlineUseList()    
      },
      //设置表头颜色
      rowClass({ row, rowIndex}) {
        return 'background:#FAFAFA'
      }
    },
    created(){
      this.getOnlineUserList()   
    },
    mounted(){
    }
}
</script>

<style scoped>
::v-deep .table-data{
  margin-top: 1px !important   
}
</style>