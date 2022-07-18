<template>
   <div>
    <div class="serach-input">
      <label class="serach-propties">字典名称:</label>    
      <el-input placeholder="请输入字典名称" suffix-icon="el-icon-text" v-model="data.nickName"/>
      <label class="serach-propties">字典代码:</label>    
      <el-input placeholder="请输入字典代码" suffix-icon="el-icon-text" v-model="data.userName"/>
      <label class="serach-propties">状态:</label>    
      <el-input  placeholder="请输入状态" suffix-icon="el-icon-text"/>
    <div class="serach-button-region"> 
        <el-row>
        <el-button class="serach-button" type="success" icon="el-icon-search"  plain @click="getDictDataList()">搜索</el-button>
        <el-button class="serach-button" type="warning" icon="el-icon-refresh" plain @click="getDictDataListReset()">重置</el-button>
        </el-row>
    </div>
    </div>
    <div class="operator-button-region">
      <el-button type="primary" class="operator-button" plain icon="el-icon-circle-plus" @click="handleAddDictData();dialogFormVisible=true">新增</el-button>
      <el-button type="danger"  class="operator-button" plain icon="el-icon-error" @click="handleDeleteDictData()">批量删除</el-button>
    </div>
    <div class="form-data">
    <el-dialog title="字典信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="字典标签" :label-width="formLabelWidth" prop="dictName">
          <el-input v-model="form.dictName" autocomplete="off" placeholder="请输入字典标签"/>
        </el-form-item>
        <el-form-item label="字典键值" :label-width="formLabelWidth" prop="dictValue">
          <el-input v-model="form.dictValue" autocomplete="off" placeholder="请输入字典键值"/>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-radio-group v-model="radio">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
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
    <el-table :data="dictDataInfoList" style="width: 100%" max-height="100%" ref="multipleTable"  v-loading="loading" @selection-change="handleDictDataIds" :header-cell-style="rowClass">
    <el-table-column type="selection" width="55"></el-table-column> 
    <el-table-column align="center" fixed label="字典标签" prop="dictName" key="dictName"  width="122">
      <template slot-scope="scope">
           <div class="table-column-region" @click="handleDictDataInfo(scope.row.id);dialogFormVisible = true;">{{scope.row.dictName}}</div>
      </template>
    </el-table-column>  
    <el-table-column align="center" fixed prop="dictValue" key="dictValue" label="字典值" width="122"/>
    <el-table-column align="center" fixed prop="status" key="status" label="状态" width="122"/>
    <el-table-column align="center" fixed prop="createTime" key="createTime" label="创建时间" width="180" :show-overflow-tooltip="showOverflowTooltip"/>
    <el-table-column label="操作">
    <template slot-scope="scope">
       <el-button size="mini" type="text" icon="el-icon-edit"  @click="handleEidtDictData(scope.row);dialogFormVisible = true">编辑</el-button>
       <el-button size="mini" type="text" icon="el-icon-delete" class="delete-button" @click="handleDeleteDictData();handleDictDataIds(scope.row)">删除</el-button>
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
import {getDictDataByList,getDictDataInfo,addDictDataInfo,updateDictDataInfo,removeDictData} from '@/api/system/dict'
import {getDictType,setDictType} from '@/utils/sessionStorge'
export default {
    name: 'WcManagerUiDictData',
    data() {
        return {
        dictDataInfoList: null,
        //表单参数
        form:{},
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
           //字典类型
           dictType: getDictType()
        },
        //字典数据信息ID列表
        ids:[],
        //启用禁用
        radio:undefined,
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
         dictName: [
            { required: true, message: '请输入字典标签', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
         dictValue: [
            { required: true, message: '请输入字典键值', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
         status: [
            { required: true, message: '请选择字典状态', trigger: 'blur' },
          ],
      }
      };
    },
    methods: {
      getDictDataList(){
        getDictDataByList(this.data).then(response => {
          if(response.count== 0){
            this.dictDataInfoList = undefined
          }else{
             this.dictDataInfoList = response.data[0]
             this.total = response.count
          }
            this.loading = false
        });
      },
      getDictDataListReset(){
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
      getDictDataByList(resetData).then(response => {
            this.dictDataInfoList = response.data[0]
            this.total = response.count
            this.loading = false
        })
      },
      handleDictDataInfo(id){
        this.reset()
        this.showFormButton = false
        getDictDataInfo(id).then(response=>{
          this.form = response.data
          this.radio = this.form.status 
        })
      },
      handleAddDictData(){
        //重置表单
        this.reset()
        this.radio = undefined
        this.showFormButton = true
      },
      handleEidtDictData(row) {
        //重置表单
        this.reset()
        this.form = this.handleDictDataInfo(row.id)
        this.showFormButton = true
      },
      //提交表单
      submitForm(){
        //状态赋值给from
        this.form.status = this.radio
        this.$refs["form"].validate(valid => {
        if (valid) {
          //更新字典数据
          if (this.form.id != undefined) {        
            updateDictDataInfo(this.form).then(response =>{
            if(response.code==200){
             this.$msgbox('更新字典数据成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            })
            this.dialogFormVisible = false;    
            this.getDictDataList()}
            })
          //新增字典数据  
          }else{
          addDictDataInfo(this.form).then(response =>{
          if(response.code==200){
             this.$msgbox('保存字典类型成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false
            this.getDictDataList() }
          })}
        }})
      },
      //获取ID多选
      handleDictDataIds(val){
         //批量ID
         if(val instanceof Array){
          this.ids = val.map(item=>{
          return item.id;})
         }else{ 
          //单个删除
          if(val != undefined){
            this.ids = val.id
          }
          var rows = []
          rows.push(val)
          this.toggleSelection(rows)
         }
      },
      //删除字典数据
      handleDeleteDictData() {
        this.$confirm('此操作将删除字典数据信息, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          var dictDataIds = this.ids
          removeDictData(dictDataIds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             })
             this.getDictDataList()
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
            dictLabel: undefined,
            dictValue: undefined,
            status: undefined,
        }
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val
        this.getDictDataList() 
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val
        this.getDictDataList() 
      },
      //设置表头颜色
     rowClass({ row, rowIndex}) {
        return 'background:#FAFAFA'
      }
    },
    mounted() {
       //接收字典类型页面发送过来的数据
       this.$bus.$on('reviceDictTypeData',val=>{
          setDictType(val.dictCode)
       }),
       this.getDictDataList()
    },
};
</script>

<style scoped>
.from-button-region{
  margin-left: 210px !important;
  margin-bottom: -4px !important;
}
.form-data .el-input{
  width: 281px !important;
}
::v-deep .el-dialog{
  width: 36%;
}
::v-deep .el-dialog__body{
  margin-top: 6px !important;
  margin-left: -23px !important;
  padding: 8px 35px
}
::v-deep .el-dialog__footer{
  margin-top: -29px !important;
  padding: 3px 87px 16px;
}
</style>