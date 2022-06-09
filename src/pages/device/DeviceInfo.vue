<template>
<div>
    <!-- 搜索栏   -->
    <div class="top-style">
      <h2>此处预留样式栏盒子</h2>
    </div> 
    <div class="serach-input">
    <label class="serach-propties">设备名称:</label>    
    <el-input
        placeholder="请输入设备名称"
        suffix-icon="el-icon-text"
        >
    </el-input>
    <label class="serach-propties">设备编码:</label>    
    <el-input
        placeholder="请输入设备编码"
        suffix-icon="el-icon-text"
        >
    </el-input>
    <label class="serach-propties">设备状态:</label>    
    <el-input
        placeholder="请输入设备状态"
        suffix-icon="el-icon-text"
        >
    </el-input>
    <el-button class="serach-button" type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <!-- 表格组件 -->
    <div class="table-data"> 
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
    <!-- 多选框 -->
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>  
    <!-- 设备名称    -->
    <el-table-column
      label="设备名称"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <!-- 设备编码 -->
    <el-table-column
      label="设备编码"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <!-- 设备机器码 -->
    <el-table-column
      label="设备机器码"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <!-- 设备状态 -->
     <el-table-column
      label="设备状态"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">状态</el-button>  
      </template>
    </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="pageHelper">
    <el-pagination
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
    </div>
    </div>
    </div>   
</template>

<script>
export default {
    name:'DeviceInfo'
}
</script>

<style>

</style>