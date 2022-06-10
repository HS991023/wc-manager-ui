<template>
<div class="container-home " style="overflow:hidden;">
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px"  style="height: 100% background-color: rgb(238, 241, 246)">
    <!-- <div class="banner"><img src="" alt=""></div>   -->
    <!-- 默认打开菜单 -->
    <el-menu :default-openeds="[]">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-meun el-icon-user-solid"></i>用户管理</template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="1-1"><router-link to="/userInfo">用户信息</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="/onlineUser">在线用户</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-meun  el-icon-s-custom"></i>角色管理</template>
        <el-menu-item index="2-1"><router-link to="/roleInfo">角色信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-meun el-icon-s-home"></i>部门管理</template>
          <el-menu-item index="3-1"><router-link to="/deptInfo">部门信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-meun el-icon-s-order"></i>菜单管理</template>
          <el-menu-item index="4-1"><router-link to="/meunInfo">菜单信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-meun el-icon-menu"></i>地区管理</template>
        <el-menu-item index="5-1"><router-link to="/regionInfo">地区信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-meun el-icon-delete-solid"></i>公厕管理</template>
        <el-menu-item index="6-1"><router-link to="/wcInfo">公厕信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"><i class="el-icon-meun el-icon-info "></i>坑位管理</template>
        <el-menu-item index="7-1"><router-link to="/positionInfo">坑位信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title"><i class="el-icon-meun el-icon-s-promotion"></i>设备管理</template>
        <el-menu-item index="8-1"><router-link to="/deviceInfo">设备信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="9">
        <template slot="title"><i class="el-icon-meun el-icon-s-ticket"></i>公共模块</template>
        <el-menu-item index="9-1"><router-link to="/loginLog">登录日志</router-link></el-menu-item>
        <el-menu-item index="9-2"><router-link to="/operatorLog">操作日志</router-link></el-menu-item>
        <el-menu-item index="9-3"><router-link to="/apiNumber">接口调用次数</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="10">
        <template slot="title"><i class="el-icon-meun el-icon-s-ticket"></i>字典管理</template>
        <el-menu-item index="10-1"><router-link to="/dictInfo">字典信息</router-link></el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
    <!-- 用户登录信息头像及下拉框 -->
    <div class="userInfo-down">
    <el-col :span="12">
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="demo-basic--circle">
        <div class="block">
        <el-avatar shape="square">
          <img src="../assets/avater.png" alt="">
        </el-avatar>
        </div>
      </div>
      </span>
      <el-dropdown-menu slot="dropdown" style="
      margin-top: -13px;
      margin-right: -20px;
      text-align: center;
      ">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-col>
    </div>
    </el-header>
    <!-- 插入路由展示 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
  export default {
    name:'Home',
    data() {
      return {
      }
    }
  };
</script>

<style scoped>
.banner{
  width: 120px;
  height: 30px;
  margin-left: -100px;
}
.container-home{
    width: 100%;
    height: 100vh;
}
.el-menu {
  height: 100%;
}
.el-header {
    position:absolute; 
    color: #333;
    line-height: 60px;
    right: 0px;
}
.title-message{
  float: left;
  font-size: 26px;
}
.el-card__body, .el-main {
    padding: 10px;
}
.el-menu-item a{
  text-decoration: none;
  color: black;
}
.userInfo-down{
  float: right;
  margin-left: 20px;
}
.user-info{
  font-size: 15px;
}
</style>

