<template>
<div>
    <!-- 搜索栏   -->
    <div class="serach-input">
    <label class="serach-propties">设备名称:</label>    
    <el-input placeholder="请输入设备名称" suffix-icon="el-icon-text"/>
    <label class="serach-propties">设备编码:</label>    
    <el-input placeholder="请输入设备编码" suffix-icon="el-icon-text"/>
    <label class="serach-propties">设备状态:</label>    
    <el-input placeholder="请输入设备状态" suffix-icon="el-icon-text"/>
    <!-- 搜索按钮区域 -->
    <div class="serach-button-region"> 
        <el-button class="serach-button" type="success" plain icon="el-icon-search" @click="getDictDataList()">搜索</el-button>
        <el-button class="serach-button" type="warning" plain icon="el-icon-refresh" @click="getResetDictDataList()">重置</el-button>
    </div>
    </div>
    <!-- 操作数据按钮区域 -->
    <div class="operator-button-region">
      <el-button type="primary" plain  class="operator-button" icon="el-icon-circle-plus" @click="handleAddDict();dialogFormVisible=true">新增</el-button>
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
    <el-table :data="deviceInfoList" style="width: 100%">
    <el-table-column type="selection" width="55"/>
    <el-table-column label="设备名称" width="180"/>
    <el-table-column label="设备编码" width="180"/>
    <el-table-column label="设备机器码" width="180"/>
    <el-table-column label="设备状态" width="180"/>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="text" icon="el-icon-delete" class="delete-button" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
export default {
    name:'DeviceInfo',
    data(){
       return{
        //设备列表
        deviceInfoList: null,
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
    }
}
</script>

<style>

</style>