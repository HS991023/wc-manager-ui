<template>
<div>
   <!-- 搜索栏   -->
    <div class="top-style">
      <h2>此处预留样式栏盒子</h2>
    </div> 
    <div class="serach-input">
    <label class="serach-propties">隶属公厕:</label>    
    <el-input
        placeholder="请输入隶属公厕"
        suffix-icon="el-icon-text"
        >
    </el-input>
    <label class="serach-propties">坑位序号:</label>    
    <el-input
        placeholder="请输入坑位序号"
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
    <!-- 坑位编码    -->
    <el-table-column
      label="坑位编码"
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
    <!-- 隶属公厕 -->
    <el-table-column
      label="隶属公厕"
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
    <!-- 地区位置 -->
    <el-table-column
      label="地区位置"
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
     <!-- 是否绑定设备 -->
     <el-table-column
      label="是否绑定设备"
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
    <!-- 状态 -->
     <el-table-column
      label="状态"
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
</template>

<script>
export default {
    name:'PositionInfo'
}
</script>

<style>

</style>