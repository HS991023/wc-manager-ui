<template>
    <div>
    <!-- 搜索栏  -->
    <div class="serach-input">
      <label class="serach-propties">用户名:</label>    
      <el-input placeholder="请输入用户名" suffix-icon="el-icon-text" v-model="data.nickName"></el-input>
      <label class="serach-propties">账号:</label>    
      <el-input placeholder="请输入账号"  suffix-icon="el-icon-text" v-model="data.userName"/>
      <div class="serach-select-region">
        <label class="serach-propties">性别:</label>    
           <el-select v-model="data.sex" placeholder="请选择">
                <el-option
                  v-for="item in sexList"
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
    <!-- 搜索按钮区域 -->
    <div class="serach-button-region"> 
      <el-row>
      <el-button class="serach-button" type="success" icon="el-icon-search"  plain @click="getUserList()" v-hasPermi="'system:user:query'">搜索</el-button>
      <el-button class="serach-button" type="warning" icon="el-icon-refresh" plain @click="getUserListReset()" v-hasPermi="'system:user:query'">重置</el-button>
      </el-row>
    </div>
    </div>
   <!-- 操作数据按钮区域 -->
    <div class="operator-button-region">
      <el-button class="operator-button" type="primary" icon="el-icon-circle-plus" plain @click="handleAddUser();dialogFormVisible=true" v-hasPermi="'system:user:add'">新增</el-button>
      <el-button class="operator-button" type="danger"  icon="el-icon-error" plain @click="handleDeleteUser()" v-hasPermi="'system:user:delete'">批量删除</el-button>
    </div>
    <div class="form-data">
    <!-- 表单新增或编辑对话框   -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules" :disabled="disabled">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="nickName">
          <el-input v-model="form.nickName" autocomplete="off" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth" prop="userName">
          <el-input v-model="form.userName" autocomplete="off" placeholder="请输入账号"/>
        </el-form-item>
        <div class="user-avater">
             <el-upload
              class="avatar-uploader"
              action=""
              :http-request="handleUploadFile"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
              <el-select v-model="sex" placeholder="请选择">
              <el-option
                v-for="item in sexList"
                :key="item.dictValue"
                :label="item.dictName"
                :value="item.dictValue">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="账号类型" :label-width="formLabelWidth" prop="accountType">
              <el-select v-model="accountType" placeholder="请选择">
              <el-option
                v-for="item in accountTypeList"
                :key="item.dictValue"
                :label="item.dictName"
                :value="item.dictValue">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="passWord">
          <el-input type="password" v-model="form.passWord" autocomplete="off" placeholder="请输入密码" show-password/>
        </el-form-item>
        <!-- 系统多租户代码 -->
        <el-form-item label="多租户代码" v-if="accountType == 1 || showTenantCode == true" :label-width="formLabelWidth" prop="tenantCode"
        :rules="[{ required: true, message: '管理员类型账号必须输入多租户代码'},]">
             <el-input v-model="form.tenantCode" autocomplete="off" placeholder="请输入多租户代码" :disabled="disabledTenantCode"/>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
              <el-select v-model="role" placeholder="请选择">
              <el-option
                v-for="item in roleSelect"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.dictValue"
              :label="item.dictName"
              :value="item.dictValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="cellPhone">
          <el-input v-model="form.cellPhone" autocomplete="off" placeholder="请输入手机号码"/>
        </el-form-item> 
        <el-form-item label="邮件" :label-width="formLabelWidth" prop="mail">
          <el-input v-model="form.mail" autocomplete="off" placeholder="请输入邮件"/>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
            <el-date-picker class="select-region"
              v-model="birthday"
              type="date"
              placeholder="选择日期"
              format="yyyy年 MM月 dd日"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" placeholder="请输入地址"/>
        </el-form-item>
        <el-form-item label="个性签名" :label-width="formLabelWidth">
          <el-input v-model="form.sign" autocomplete="off" placeholder="请输入个性签名"/>
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
    <!-- 表格 -->
    <div class="table-data">     
    <el-table :data="userList" style="width: 100%" max-height="100%" ref="multipleTable" v-loading="loading" @selection-change="handleUserIds" :header-cell-style="rowClass">
      <!-- 多选框 -->
      <el-table-column type="selection" width="55"/>
      <el-table-column align="center" prop="nickName" key="nickName" label="用户名" width="100">
        <!-- 添加列事件 -->
        <template slot-scope="scope">
            <div class="table-column-region" @click="handleUserInfo(scope.row.id);dialogFormVisible = true">{{scope.row.nickName}}</div>
        </template>
      </el-table-column>  
      <el-table-column align="center" prop="userName" key="userName" label="账号" width="100"/>
      <el-table-column align="center" prop="sex" key="sex" label="性别" width="100"/>
      <el-table-column align="center" prop="cellPhone" key="cellPhone" label="手机号码" width="120" :show-overflow-tooltip="showOverflowTooltip"/>
      <el-table-column align="center" prop="mail" key="mail" label="邮件" width="120" :show-overflow-tooltip="showOverflowTooltip"/>
      <el-table-column align="center" prop="accountType" key="accountType" label="账户类型" width="100"/>
      <el-table-column align="center" prop="status" key="status" label="状态" width="80"/>
      <el-table-column align="center" prop="createTime" key="createTime" label="注册日期" width="190"/>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="mini" icon="el-icon-edit"  @click="handleEidtUser(scope.row);dialogFormVisible = true" v-hasPermi="'system:user:edit'">编辑</el-button>
        <el-button class="delete-button" type="text" size="mini"  icon="el-icon-delete" @click="handleDeleteUser();handleUserIds(scope.row)" v-hasPermi="'system:user:delete'">删除</el-button>
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
import {roleSelect} from '@/api/system/role'
import {getDictDataByType} from '@/api/system/dict'
import {uploadFile,queryFileById}  from '@/api/common/upload'
import {userList,userInfo,addUser,updateUser,removeUser} from "@/api/system/user"   

export default {
    name:'WcManagerUiUserInfo',
    data() {
      return {
        //表格数据
        userList: null,
        //是否禁用表单
        disabled: false,
        //表单参数
        form:{},
        //总数
        total:null,
        //分页参数
        data:{
           pageNum: 1,
           pageSize: 10,
           nickName:undefined,
           userName:undefined,
           sex:undefined,
           status:undefined
        },
        //用户ID列表
        ids:[],
        //头像URL
        imageUrl:'', 
        //生日
        birthday:'',
        //账号类型
        accountType:'',
        accountTypeList:[],
        //状态
        status:'',
        statusList:[],
        //性别
        sex:'',
        sexList:[],
        //角色
        role:'',
        roleSelect:[],
        formLabelWidth: '120px',
        //是否显示系统多租户输入框
        showTenantCode:false,
        //是否禁用系统多租户输入框
        disabledTenantCode: true,
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
         nickName: [
            { required: true, message: '请输入用户昵称', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          accountType: [
            { required: true, message: '请选择账号类型', trigger: 'blur' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          cellPhone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 0 到 12 个字符', trigger: 'blur' }
          ],
          mail: [
            { required: false, message: '请输入邮件', trigger: 'blur' },
            { min: 5, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
          ],
          status:[
            { required: true, message: '请选择状态', trigger: 'blur' },
          ],
    }}},
    methods: {
      //获取用户列表
      getUserList(){
        let data= this.data    
        userList(data).then(response => {
          if(response.count== 0){
             this.userList = undefined    
          }else{
             this.userList = response.data[0]
             this.viewDictList() 
             this.total = response.count    
          }
            this.loading = false    
        })    
      },
      //用户列表重置
      getUserListReset(){
        this.data.nickName = undefined    
        this.data.userName = undefined   
        this.data.sex = undefined
        this.data.status = undefined 
        let resetData= {
           pageNum: 1,
           pageSize: 10,
        }
        userList(resetData).then(response => {
            this.userList = response.data[0]  
            this.viewDictList()       
            this.total = response.count    
            this.loading = false    
        })
        
      },
      //查询用户详情
      handleUserInfo(id){
        this.reset()    
        //禁用表单
        this.disabled = true
        this.showFormButton = false
        userInfo(id).then(response=>{
          this.form = response.data  
          let accountType = this.form.accountType;
          //账号类型为管理员时,显示多租户框
          if(accountType == 1){
             this.showTenantCode = true;
          }
          //判断是否需要显示多租户框
          this.viewDictData()
          //获取用户头像
          if(response.data.pictureId != null || response.data.pictureId != undefined){
              queryFileById(response.data.pictureId).then(res=>{
                 if(res.code==200){
                     if(res.data.url != null && res.data.url != undefined){
                  this.imageUrl = res.data.url
                     }
                 }
          })
          }else{
             this.imageUrl = undefined
          }
        })
      },
      //新增用户按钮
      handleAddUser(){
        //重置表单
        this.reset()
        //启用表单
        this.disabled = false
        //默认关闭系统多租户
        this.showTenantCode = false
        this.disabledTenantCode = false;
        this.clearSelectData()
        //重置头像
        this.imageUrl = undefined
        //重置生日
        this.birthday = undefined
        this.showFormButton = true 
      },
      //编辑用户按钮
      handleEidtUser(row) {
        //重置头像
        this.imageUrl = undefined
        //重置表单
        this.reset()   
        this.disabledTenantCode = true;
        this.form = this.handleUserInfo(row.id)  
        //启用表单
        this.disabled = false  
        this.showFormButton = true    
      },
      //提交表单
      submitForm(){
        this.$refs["form"].validate(valid => {
        //绑定下拉框数据到表单
        this.bindFrom()
        //绑定生日
        this.form.birthday = this.birthday 
        if (valid) {
          //替换字典值
          this.replaceDictData()
          //更新用户
          if (this.form.id != undefined) {
            updateUser(this.form).then(response =>{
            if(response.code==200){
                this.dialogFormVisible = false         
                this.getUserList()   
                this.$message({
                type: 'success',
                message: '更新成功'
               })       
            }else{
               var msg = response.msg;
               this.$msgbox(response.msg, '系统提示', {
                 confirmButtonText: '确定',
                 type: 'warning'})    
            }})    
         }else{
            addUser(this.form).then(response =>{
            if(response.code==200){
                this.dialogFormVisible = false    
                this.getUserList()
                this.$message({
                type: 'success',
                message: '新增成功'
              })          
              }else{
                var msg = response.msg;
                this.$msgbox(response.msg, '系统提示', {
                  confirmButtonText: '确定',
                  type: 'warning'})    
              }})            
          }
        }})    
      },
      //获取用户ID 多选
      handleUserIds(val){
         //批量ID
         if(val instanceof Array){
          this.ids = val.map(item=>{
          return item.id    })    
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
      //删除用户逻辑删除
      handleDeleteUser() {
        this.$confirm('此操作将删除用户, 是否继续?', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          var userIds = this.ids    
          removeUser(userIds.toString()).then(response=>{
            if(response.code==200){
               this.$message({
                type: 'success',
                message: '删除成功!'
             })    
             this.getUserList()    
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
          nickName:undefined,
          userName:undefined,
          sex:undefined,
          passWord:undefined,
          roleId:undefined,
          status:undefined,
          cellPhone:undefined,
          mail:undefined,
          birthday:undefined,
          address:undefined,
          sign:undefined,
          pictureId: undefined,
          accountType: undefined,
          tenantCode:undefined
        }
      },
      //更改每页大小
      handleSizeChange(val) {
        this.data.pageSize = val    
        this.getUserList()         
      },
      //更改当前页
      handleCurrentChange(val) {
        this.data.pageNum = val    
        this.getUserList()      
      },
      //清除下拉框值
      clearSelectData(){
        this.status = undefined
        this.sex = undefined
        this.accountType = undefined
        this.role = undefined
      },
      //列表回显字典
      viewDictList(){
         var sexList  = this.sexList;
         var statuList = this.statusList;
         var accountTypeList = this.accountTypeList;
         //列表回显为字典值    
        this.userList.forEach(obj=>{
            //性别
            for (let index = 0; index < sexList.length; index++) {
                 const element = sexList[index];
                 if(element.dictValue == obj.sex){
                    obj.sex = element.dictName }
            }
            //状态
            for (let j = 0; j < statuList.length; j++) {
                 const element = statuList[j];
                 if(element.dictValue == obj.status){
                    obj.status = element.dictName}
             }
            //账户类型
            for (let index = 0; index < accountTypeList.length; index++) {
                 const element = accountTypeList[index];
                 if(element.dictValue == obj.accountType){
                    obj.accountType = element.dictName}
            } 
        });
      },
      //下拉框数据绑定到表单
      bindFrom(){
          this.form.sex = this.sex
          this.form.status = this.status
          this.form.accountType = this.accountType
          this.form.roleId = this.role
      },
      //表单字典标签替换为字典值
      replaceDictData(){
         this.sexList.forEach(value=>{
            if(this.sex == value.dictName){
               this.form.sex = value.dictValue
            }
          })
          this.statusList.forEach(value=>{
            if(this.status == value.dictName){
               this.form.status = value.dictValue
            }
          })
         this.accountTypeList.forEach(value=>{
            if(this.accountType == value.dictName){
               this.form.accountType = value.dictValue
            }
          })
        this.roleSelect.forEach(value=>{
            if(this.role == value.roleName){
               this.form.roleId = value.id
            }
          })
      },
      //回显字典数据及生日数据
      viewDictData(){
         this.birthday = this.form.birthday
         this.sexList.forEach(value=>{
            if(this.form.sex == value.dictValue){
               this.sex = value.dictName
            }
          })
          this.statusList.forEach(value=>{
            if(this.form.status == value.dictValue){
               this.status = value.dictName
            }
          })
          this.accountTypeList.forEach(value=>{
            if(this.form.accountType == value.dictValue){
               this.accountType = value.dictName
            }
          })
         this.roleSelect.forEach(value=>{
            if(this.form.roleId == value.id){
               this.role = value.roleName
            }
          })
      },
      //获取下拉框数据
      getSelectData(){
          //性别
          getDictDataByType('sex').then(res=>{
             this.sexList = res.data;
          })
          //状态
          getDictDataByType('status').then(res=>{
            this.statusList = res.data
          })
           //账号类型
          getDictDataByType('accout_type').then(res=>{
            this.accountTypeList = res.data
          })
          //角色
          roleSelect().then(res=>{
             this.roleSelect = res.data
          })
          
      },
      //设置表头颜色
      rowClass({ row, rowIndex}) {
        return 'background:#FAFAFA'
      },
      //空函数
      handleUploadFile(val){
         //进行文件上传操作 
            let fileFormData = new FormData();
            fileFormData.append('file',val.file);
            fileFormData.append('dataSource',0);
            uploadFile(fileFormData).then(res=>{
              if(res.code == 200){
                 this.imageUrl  = res.data.url;
                 this.form.pictureId = res.data.id;
              }
            })
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return isLt2M;
        }
        return isLt2M;
      }
    },
    watch:{
      accountType(newValue,oldValue){
          if(newValue == 1){
            this.$message.error('多租户代码只能设置一次,且不可修改,请谨慎设置!');
          }   
      }
    },
    created(){
      this.getSelectData()   
      this.getUserList() 
    },
}
</script>

<style scoped>
.user-avater{
  display: inline-block;   
  position: relative;  
  top: 73px;    
  left: 58px;    
  width: 110px;    
  height: 110px;    
  background-color: #fcfcfc;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  position:relative;
  top: 15px;
  display: inline-block; 
  width: 110px;
  height: 110px;
  }
::v-deep .el-dialog__body {
    margin-top: -76px !important;
}
::v-deep .el-dialog__footer{
  margin-top: -44px;
  padding: 1px 288px 11px;
}
</style>