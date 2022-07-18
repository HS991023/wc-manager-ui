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
        <el-button class="serach-button" type="success" icon="el-icon-search"  plain @click="getDictTypeList()">搜索</el-button>
        <el-button class="serach-button" type="warning" icon="el-icon-refresh" plain @click="getDictTypeListReset()">重置</el-button>
        </el-row>
    </div>
    </div>
    <div class="operator-button-region">
      <el-button type="primary" class="operator-button" plain icon="el-icon-circle-plus" @click="handleAddDictType();dialogFormVisible=true">新增</el-button>
      <el-button type="danger"  class="operator-button" plain icon="el-icon-error" @click="handleDeleteDictType()">批量删除</el-button>
    </div>
    <div class="form-data">
    <el-dialog title="字典信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="字典序号" :label-width="formLabelWidth" prop="orderNumber">
          <el-input v-model="form.orderNumber" autocomplete="off" placeholder="请输入字典序号"/>
        </el-form-item>
        <el-form-item label="字典名称" :label-width="formLabelWidth" prop="dictName">
          <el-input v-model="form.dictName" autocomplete="off" placeholder="请输入字典名称"/>
        </el-form-item>
        <el-form-item label="字典类型" :label-width="formLabelWidth" prop="dictCode">
          <el-input v-model="form.dictCode" autocomplete="off" placeholder="请输入字典类型"/>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
           <el-radio-group v-model="radio">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
         <el-input v-model="form.remark" autocomplete="off" placeholder="请输入字典备注"/>
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
    <el-table :data="dictTypeInfoList" style="width: 100%" max-height="100%" ref="multipleTable"  v-loading="loading" @selection-change="handleDictTypeIds" :header-cell-style="rowClass">
      <el-table-column align="center" type="selection" width="55"></el-table-column> 
      <el-table-column align="center" label="字典编号" prop="orderNumber" key="orderNumber"  width="122"/>
      <el-table-column align="center" label="字典名称" prop="dictName" key="dictName"  width="122">
        <template slot-scope="scope">
            <div class="table-column-region" @click="jumpDictDataView(scope.row);dialogFormVisible = true;">{{scope.row.dictName}}</div>
        </template>
      </el-table-column>  
      <el-table-column align="center" label="字典类型" prop="dictCode"  key="dictCode"  width="122"/>
      <el-table-column align="center" label="状态" prop="status" key="status" width="122"/>
      <el-table-column align="center" label="备注" prop="remark" key="remark"  width="122"/>
      <el-table-column align="center" label="创建时间" prop="createTime" key="createTime"  width="180" :show-overflow-tooltip="showOverflowTooltip"/>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text" icon="el-icon-edit"  @click="handleEidtDictType(scope.row);dialogFormVisible = true">编辑</el-button>
        <el-button size="mini" type="text" icon="el-icon-delete" class="delete-button" @click="handleDeleteDictType();handleDictTypeIds(scope.row)">删除</el-button>
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
import {dictTypeList,getDictTypeInfo,addDictTypeInfo,updateDictTypeInfo,removeDictType} from "@/api/system/dict"
export default {
    name:'WcManagerUiDictType',
    data() {
      return {
        dictTypeInfoList: null,
        //表单参数
        form:{},
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
        },
        //字典类型数据ID列表
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
         orderNumber: [
            { required: true, message: '请输入序号', trigger: 'blur' },
          ],
         dictName: [
            { required: true, message: '请输入字典名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
         dictCode: [
            { required: true, message: '请输入字典类型', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
         status: [
            { required: true, message: '请选择字典状态', trigger: 'blur' },
          ],
         remark:[
            { required: true, message: '请输入字典备注', trigger: 'blur' },
            { min: 1, max: 12, message: '长度在 0 到 12 个字符', trigger: 'blur' }
          ],
      }
    }},
    methods: {
      getDictTypeList(){
        let data= this.data
        dictTypeList(data).then(response => {
          if(response.count== 0){
            this.dictTypeInfoList = undefined
          }else{
             this.dictTypeInfoList = response.data[0]
             this.total = response.count
          }
            this.loading = false
        });
      },
      getDictTypeListReset(){
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        dictTypeList(resetData).then(response => {
            this.dictTypeInfoList = response.data[0]
            this.total = response.count
            this.loading = false
        })
      },
      handleDictTypeInfo(id){
        this.reset()
        this.showFormButton = false
        getDictTypeInfo(id).then(response=>{
          this.form = response.data
          this.radio = this.form.status 
        })
      },
      handleAddDictType(){
        //重置表单
        this.reset()
        this.radio = undefined
        this.showFormButton = true
      },
      handleEidtDictType(row) {
        //重置表单
        this.reset()
        this.form = this.handleDictTypeInfo(row.id)
        this.showFormButton = true
      },
      //提交表单
      submitForm(){
          //状态赋值给from
        this.form.status = this.radio
        this.$refs["form"].validate(valid => {
        if (valid) {
          //更新字典类型数据
          if (this.form.id != undefined) {           
            updateDictTypeInfo(this.form).then(response =>{
            if(response.code==200){
             this.$msgbox('更新字典类型成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            })
            this.dialogFormVisible = false;    
            this.getDictTypeList()}
            })
          //新增字典类型数据  
          }else{
          addDictTypeInfo(this.form).then(response =>{
          if(response.code==200){
             this.$msgbox('保存字典类型成功', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            this.dialogFormVisible = false
            this.getDictTypeList()
            }
          })
          }
        }})
      },
      //获取ID多选
      handleDictTypeIds(val){
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
      //删除字典类型数据
      handleDeleteDictType() {
        this.$confirm('此操作将删除字典类型数据, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          var dictTypeIds = this.ids
          removeDictType(dictTypeIds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             })
             this.getDictTypeList()
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
            orderNumber:undefined,
            dictName: undefined,
            dictCode: undefined,
            status: undefined,
            remark: undefined,
        }
      },
      //跳转到字典数据页面
      jumpDictDataView(val){
        this.$router.push({
          path:'/dictData'
        })
        //发送给字典数据页面
        this.$bus.$emit('reviceDictTypeData',val)
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val
        this.getDictTypeList() 
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val
        this.getDictTypeList() 
      },
      //设置表头颜色
      rowClass({ row, rowIndex}) {
        return 'background:#FAFAFA'
      }
    },
    created(){
      this.getDictTypeList()
    }
}
</script>

<style scoped>
.form-data .el-input{
  width: 272px !important;
}
::v-deep .el-dialog{
  width: 32%;
}
::v-deep .el-dialog__body{
  margin-top: 1px !important;
  margin-left: -32px !important;
  padding: 8px 25px
}
::v-deep .el-dialog__footer{
  padding: 10px 25px 9px;
}
</style>