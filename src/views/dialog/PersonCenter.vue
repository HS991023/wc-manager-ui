<template>
<div>
    <div class="form-data">
    <!-- 表单新增或编辑对话框   -->
    <el-dialog title="个人中心" :visible.sync="dialogFormVisible">
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
</div>
</template>

<script>
import {userInfo,updateUser} from "@/api/system/user"
import {roleSelect} from '@/api/system/role'  
import {getDictDataByType} from '@/api/system/dict'
import {uploadFile,queryFileById}  from '@/api/common/upload'
import {getCurrnetLoginUserInfo} from '@/utils/sessionStorge'
export default {
    name: 'WcManagerUiPersonCenter',
    data() {
      return {
        //是否禁用表单
        disabled: false,
        //表单参数
        form:{},
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
        //是否关闭表单对话框
        dialogFormVisible: true,
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
      //查询用户详情
      handleUserInfo(){
        //获取用户ID
        var userInfoResult= getCurrnetLoginUserInfo();
        this.reset()    
        //禁用表单
        userInfo(userInfoResult.id).then(response=>{
          this.form = response.data  
          this.viewDictData()
          //获取用户头像
          if(response.data.pictureId != null || response.data.pictureId != undefined){
              queryFileById(response.data.pictureId).then(res=>{
                 if(res.code==200){
                  this.imageUrl = res.data.url
                 }
          })
          }else{
             this.imageUrl = undefined
          }
        })
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
         }
        }})    
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
          accountType: undefined
        }
      },
      //清除下拉框值
      clearSelectData(){
        this.status = undefined
        this.sex = undefined
        this.accountType = undefined
        this.role = undefined
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
    created(){
        this.getSelectData();
        this.handleUserInfo();
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