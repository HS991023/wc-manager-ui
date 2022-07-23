<template>
 <div>
    <div class="serach-input">
      <label class="serach-propties">菜单名称:</label>    
      <el-input placeholder="请输入菜单名称" suffix-icon="el-icon-text" v-model="data.resName"/>
      <label class="serach-propties">权限代码:</label>    
      <el-input placeholder="请输入权限代码" suffix-icon="el-icon-text" v-model="data.permission"/>
      <div class="serach-select-region">
          <label class="serach-propties">菜单类型:</label> 
          <el-select v-model="data.resType" placeholder="请选择">
            <el-option
              v-for="item in resTypeList"
              :key="item.dictValue"
              :label="item.dictName"
              :value="item.dictValue">
            </el-option>
          </el-select>
      </div>
      <div class="serach-select-region">
          <label class="serach-propties">状态:</label> 
          <el-select v-model="data.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.dictValue"
              :label="item.dictName"
              :value="item.dictValue">
            </el-option>
          </el-select>
      </div>
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="success" plain icon="el-icon-search" @click="getResList()" v-hasPermi="'system:res:query'">搜索</el-button>
        <el-button class="serach-button" type="warning" plain icon="el-icon-refresh" @click="getResListReset()" v-hasPermi="'system:res:query'">重置</el-button>
    </div>
    </div>
    <div class="operator-button-region">
      <el-button type="primary" plain class="operator-button" icon="el-icon-circle-plus" @click="handleAddRole();dialogFormVisible=true" v-hasPermi="'system:res:add'">新增</el-button>
    </div>
    <div class="form-data">
    <el-dialog title="菜单信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="superMenu">   
           <!-- clear点击清空的实现  ref属性注册，用于操作dom元素-->
            <el-select v-model="chooseName" placeholder="请选择" clearable @clear="handleClear" ref="selectUpResId" >
              <el-option hidden :key="form.pid" value="一级菜单" :label="chooseName"></el-option>
              <!-- data数据， props配置选项 expand-on-click-node是否在点击节点的时候展开或者收缩节点  check-on-click-node是否在点击节点的时候选中节点 node-click节点被点击时的回调-->
              <el-tree
                :data="menuTree"
                :props="defaultProps"
                :expand-on-click-node="false"
                :check-on-click-node="true"
                @node-click="handleNodeClick"
              />
            </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号" :label-width="formLabelWidth" prop="orderNumber">
          <el-input v-model="form.orderNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源URI" :label-width="formLabelWidth" prop="resUrl">
          <el-input v-model="form.resUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限代码" :label-width="formLabelWidth" prop="permission">
          <el-input v-model="form.permission" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth" prop="resType">
            <el-radio-group v-model="resType">
              <el-radio :label="0">目录</el-radio>
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮</el-radio>
              <el-radio :label="3">内嵌页面</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单状态" :label-width="formLabelWidth" prop="status">
           <el-radio-group v-model="status">
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
    <el-table :data="resList" style="width: 100%" max-height="580px" ref="multipleTable" row-key="id" v-loading="loading" :header-cell-style="rowClass"
    lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column fixed="left" label="菜单名称" width="200" prop="name" key="name"/>
    <el-table-column align="center" label="序号" width="100" prop="orderNumber" key="orderNumber"/>
    <el-table-column align="center" label="菜单图标" width="180" prop="icon" key="icon"/>
    <el-table-column align="center" label="资源URI" width="180" prop="resUrl" key="resUrl"/>
    <el-table-column align="center" label="权限代码" width="180" prop="permission" key="permission"/>
    <el-table-column align="center" label="菜单类型" width="130" prop="resType" key="resType"/>
    <el-table-column align="center" label="状态"    width="100" prop="status" key="status"/>
    <el-table-column align="center" label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEditRole(scope.row);dialogFormVisible=true"  v-hasPermi="'system:res:edit'">编辑</el-button>
        <el-button class="delete-button" size="mini" type="text" icon="el-icon-delete" @click="handleDeleteRes(scope.row)" v-hasPermi="'system:res:delete'">删除</el-button>  
      </template>
    </el-table-column>
    </el-table>    
    </div>
    </div>
</template>

<script>
import {getDictDataByType} from '@/api/system/dict'
import {getMeunTree} from '@/api/common/tree'
import {resList,resInfo,addRes,updateRes,removeRes} from '@/api/system/res'
export default {
    name:'WcManagerUiMeunInfo',
    data() {
      return {
        //资源/菜单表格数据
        resList: [],
        //表单数据
        form:{},
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
           resName:undefined,
           permission:undefined,
           resType:undefined,
           status:undefined
        },
        //菜单ID列表
        ids:[],
        //菜单树
        menuTree:[],
        //选择的节点名称
        chooseName:'',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        //状态
        status:'',
        statusList:[],
        //菜单类型
        resType:'',
        resTypeList:[],
        //列表下拉刷新辅助变量
        tableTreeRefreshTool: {},
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
        //  superMenu: [
        //     { required: true, message: '请选择上级菜单', trigger: 'blur' },
        //   ],
        //   name: [
        //     { required: true, message: '请输入菜单名称', trigger: 'blur' },
        //     { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        //   ],
        //   orderNumber: [
        //     { required: true, message: '请输入序号', trigger: 'blur' },
        //     { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        //   ],
        //   resUrl: [
        //     { required: true, message: '请输入资源路径', trigger: 'blur' },
        //     { min: 5, max: 12, message: '长度在 0 到 12 个字符', trigger: 'blur' }
        //   ],
        //   permission: [
        //     { required: true, message: '请输入权限代码', trigger: 'blur' },
        //     { min: 5, max: 100, message: '长度在 0 到 50个字符', trigger: 'blur' }
        //   ],
        //   resType: [
        //     { required: true, message: '请选择菜单类型', trigger: 'blur' },
        //   ],
        //   status:[
        //     { required: true, message: '请选择状态', trigger: 'blur' },
        //   ],
    }
      }
    },
    methods: {
      //获取菜单列表
      getResList(){
        let data= this.data
        resList(data).then(response => {
          if(response.count== 0){
            this.resList = undefined
          }else{
             this.resList = response.data[0]
             this.viewDictList()
             this.total = response.count
          }
            this.loading = false
        })
      },
       //菜单列表重置
      getResListReset(){
        this.data.resName = undefined,
        this.data.permission = undefined,
        this.data.resType = undefined,
        this.data.status = undefined
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        resList(resetData).then(response => {
            this.resList = response.data[0]
            this.viewDictList()
            this.total = response.count
            this.loading = false;
        })
      },
      //查询菜单详情
      handleResInfo(id){
        this.reset()
        this.showFormButton = false
        this.getMeunTreeData()
        resInfo(id).then(response=>{
          this.form = response.data
          this.chooseName  = this.form.name
          this.viewDictData()
        })
      },
       //新增菜单按钮
      handleAddRole(){
        //重置下拉框
        this.clearSelectData();
        //重置表单
        this.reset();
        //重置树
        this.handleClear();
        this.getMeunTreeData()
        this.showFormButton = true;
      },
      //编辑按钮按钮
      handleEditRole(row) {
        //重置表单
        this.reset()
        this.form = this.handleResInfo(row.id)
        this.showFormButton = true
      },
      //提交表单
      submitForm(){
        this.$refs["form"].validate(valid => {
        this.bindFrom();
        if (valid) {
          //更新菜单
          if (this.form.id != undefined) {
            this.replaceDictData();
            updateRes(this.form).then(response =>{
            if(response.code==200){
                this.dialogFormVisible = false
                this.getResList()
                //刷新列表树子节点
                this.refreshChildData(this.form.pid)
                this.$message({
                type: 'success',
                message: '更新成功'
               })   
            }
            })
          //新增菜单
          }else{
            addRes(this.form).then(response =>{
             if(response.code==200){
                this.dialogFormVisible = false
                this.getResList()
                //刷新列表树子节点
                this.refreshChildData(this.form.pid)
                this.$message({
                type: 'success',
                message: '新增成功'
               })   
           }
          })
          }
        }})
      },
      //删除菜单逻辑删除
      handleDeleteRes(row) {
        this.$confirm('此操作将删除菜单, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          var resIds = row.id
          removeRes(resIds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             });
             this.getResList()
             //刷新列表树子节点
             this.refreshChildData(row.pid)
            }
          })
        }).catch(() => {
          //清除已选择的状态
          this.toggleSelection()
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
            this.$refs.multipleTable.toggleRowSelection(row)
          });
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      //重置表单
      reset() {
        this.form={
          superRes:undefined,//上级资源ID
          name: undefined,
          resUrl: undefined,
          permission: undefined,
          resType: undefined,
          orderNumber:undefined,
          pid: undefined,
          icon: undefined,
          status:undefined
        }
      },
      //加载菜单子节点数据
      load(tree, treeNode, resolve) {
        // 在之前声明的全局变量中，增加一个key为 本条数据的id，id可替换为你数据中的任意唯一值
        this.tableTreeRefreshTool[tree.id] = {}
        // 重要！保存resolve方法，以便后续使用
        this.tableTreeRefreshTool[tree.id].resolve = resolve
        //查询菜单下属子菜单
        let data={
           pageNum: 1,
           pageSize: 100,
           pid: tree.id
        }
        resList(data).then(response=>{
           let res = response.data[0]
           this.viewDictList(res)
           //渲染结果
           resolve(
            res
           );
        })
      },
      //刷新菜单子节点数据
      refreshChildData(pid){
        const curr = this.tableTreeRefreshTool[pid]
        if(curr){
            //查询菜单下属子菜单
            let data={ pageNum: 1, pageSize: 100, pid: pid }
            resList(data).then(response=>{
              let res = response.data[0]
              this.viewDictList(res)
              //渲染结果
              curr.resolve(res);
            }) 
        }
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val
        this.getResList()
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val
        this.getResList()
      },
      //设置表头颜色
     rowClass({ row, rowIndex}) {
        return 'background:#FAFAFA'
      },
     //获取下拉框数据
     getSelectData(){
        //状态
        getDictDataByType('status').then(res=>{
          this.statusList = res.data
        })
        //类型
        getDictDataByType('res_type').then(res=>{
          this.resTypeList = res.data
        })
     },
     //获取菜单权限树
     getMeunTreeData(){
        var token = sessionStorage.getItem("token")
        getMeunTree(token).then(res=>{
              var result = [{
                id: "0",
                label: "主类目",
                code: undefined,
                colum: null,
                level: 0,
                children:res.data
              }]
              this.menuTree = result
        })
     },
     // 节点点击事件
    handleNodeClick(data) {
        // 配置树形组件点击节点后，设置选择器的值，配置组件的数据
        this.chooseName = data.label
        this.form.pid = data.id
        // 选择器执行完成后，使其失去焦点隐藏下拉框效果
        this.$refs.selectUpResId.blur()
    },
    //选择器配置可以清空选项，用户点击清空按钮触发
    handleClear () {
        // 将选择器的值置空
        this.chooseName = ''
        this.form.pid = ''
    },
    //列表回显字典
    viewDictList(res){
        var statuList = this.statusList;
        var resTypeList = this.resTypeList;
         //列表回显为字典值    
        this.resList.forEach(obj=>{
            //状态
            for (let j = 0; j < statuList.length; j++) {
                 const element = statuList[j];
                 if(element.dictValue == obj.status){
                    obj.status = element.dictName}
             }
             //类型
            for (let j = 0; j < resTypeList.length; j++) {
                 const element = resTypeList[j];
                 if(element.dictValue == obj.resType){
                    obj.resType = element.dictName}
             }
        });
        if(null != res && undefined != res){
          res.forEach(obj=>{
            //状态
              for (let j = 0; j < statuList.length; j++) {
                  const element = statuList[j];
                  if(element.dictValue == obj.status){
                      obj.status = element.dictName}
              }
              //类型
              for (let j = 0; j < resTypeList.length; j++) {
                  const element = resTypeList[j];
                  if(element.dictValue == obj.resType){
                      obj.resType = element.dictName}
              }
          })
        }
      },
      //下拉框数据绑定到表单
      bindFrom(){   
         this.form.status = this.status
         this.form.resType = this.resType
      },
      //表单字典标签替换为字典值
      replaceDictData(){
         this.form.status = this.status
         this.form.resType = this.resType
      },
      //详情回显字典数据
      viewDictData(){
         this.resType = this.form.resType
         this.status = this.form.status
        
      },
       //清除下拉框值
      clearSelectData(){
        this.status = undefined
      },
    },
    created(){
      this.getSelectData()
      this.getResList()
    }
}
</script>

<style scoped>
::v-deep .el-dialog{
  width: 35%;
}
::v-deep .el-dialog__body{
  padding: 8px 50px
}
::v-deep .el-dialog__footer{
  padding: 3px 138px 16px;
}

::v-deep .form-data .el-input__inner{
  width: 308px !important;
}

::v-deep .form-data .el-form-item{
    display: inline-block;
    margin-left: -5px !important;
    margin-top: 2px;
}

::v-deep .from-button-region{
  margin-left: 150px !important;
  height: 28px !important;
}

::v-deep .form-data .el-input__icon {
    line-height: 27px !important;
    margin-left: 52px;
}

::v-deep .el-input__suffix{
  left: 224px !important;
}

::v-deep .el-select-dropdown__list{
   padding: 4px 4px !important;
}

::v-deep .el-tree-node__content{
  width: 251px !important;
  /* padding-left: 5px !important; */
}

::v-deep .el-tree-node__label{
  font-size: 12.5px;
}

::v-deep .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
::v-deep .el-icon-arrow-down {
    font-size: 12px;
}

</style>