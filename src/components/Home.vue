<template>
<div class="container-home " style="overflow:hidden;">
  <!--侧边拉展开收缩区域 -->
   <div class="side-switch-region" ref="sideswitchregion">
        <div class="el-icon-s-fold"></div>
        <!-- <i class="el-icon-caret-right"></i> -->
   </div>
   <!-- 面包屑区域 -->
   <div class="crumbs-region" ref="crumbsregion">
      <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item,index) in breadList"
        :key="index"
        :to="{ path: item.path }"
      >{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
   </div>
  <!-- 标签栏 -->
  <div class="tabs-region" ref="tabsregion">
    <!-- 只有一个打开的标签页时，不允许关闭，隐藏关闭标签 -->
    <el-tabs v-model="menuTabsValue" type="card"
             :closable="this.menuTabs.length > 1"
             @tab-remove="removeTab">
      <el-tab-pane v-for="item in menuTabs"
                   :key="item.id"
                   :label="item.label"
                   :name="item.path">
      </el-tab-pane>
    </el-tabs>
  </div>
  <el-container style="height: 100%; border: 1px solid #eee">
  <el-aside id="side" style="height: 100% background-color: rgb(238, 241, 246)">
        <!-- 动态渲染菜单栏 -->
        <el-menu router style="height: 100%" :collapse="isCollapse">
          <TreeMenu :tree-data="treeData"/>
        </el-menu>
  </el-aside>
  <el-container>
  <!-- 用户登录信息头像及下拉框 -->
  <el-header style="text-align: right; font-size: 12px">
    <div class="userInfo-down">
    <el-col :span="12">
    <el-dropdown>
      <span class="el-dropdown-link">
        <div class="basic--circle">
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
        <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-col>
    </div>
    </el-header>
    <!-- 插入路由展示 -->
    <el-main ref="main" id="main">
      <keep-alive :include="keepAliveUrl(menuTabs)"
                  :exclude="noKeepAlive"/>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
import {MessageBox} from 'element-ui';
import {logoutUser} from '@/api/system/user'
import {getRouters} from '@/directives/modules/permission.js'
import TreeMenu from "@/components/common/TreeMenu.vue"; //动态菜单组件
export default {
    name:'Home',
    data() {
      return {
        //默认侧边栏展开
        isCollapse: false,
        //只保持一个菜单打开
        opened: true,
        // 处理始终不需要缓存的页
        noKeepAlive: 'show', 
        // 路由集合
        breadList:[], 
      }
    },
    components:{TreeMenu},
    methods:{
      //退出登录
      logout(){
        logoutUser().then(response =>{
           MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              location.href = '/login';
            }).catch(() => {
              
            });
        })
      },
      isHome(route) { 
        return route.path === "show";
      },
      //面包屑
      getBreadcrumb() {
        //拿到显示的路由路径
        let matched = this.$route.matched; 
        //当前路由等于首页
        if(!this.isHome(matched[0])){
          matched = [{ path: "/show", name:'首页' ,meta: { title: "首页" } }].concat(matched);
        }
        this.breadList = matched; 
      },
      //删除标签栏导航
      removeTab (targetName) {
        // 如果当前激活的菜单和删除的一致，路由跳转到上一个打开的路由
        if (targetName == this.menuTabsValue) {
          this.menuTabs.forEach((item, index) => {
            if(item.path === targetName) {
              this.$router.push(this.menuTabs[(index-1)].path)
              this.$store.commit('UPADTEMENUTABS', this.menuTabs[(index - 1)].path)
            }
          });
        }
        //否则直接删除
        this.$store.commit('DELETEMENUTABS', targetName)
      },
      //动态更新keep-alive的incloud
      keepAliveUrl () {
        var result = this.menuTabs.map(item => {
          return item.menuUrl
        })
        return result.join(',')
      }
   },
   computed:{
		 treeData:function() {  
          //通过方法访问
         return this.$store.getters.permission_routes; 
    },
    // 点击标签栏导航时触发，vuex中menuTabsValue会在第一次登录系统时给一个默认的值
    // 由于vuex中存的值不允许直接改变值，直接绑定v-model会报错，所以用这种get，set的形式改写
    menuTabsValue: {
      get () {
        return this.$store.getters.menuTabsValue
      },
      set (val) {
        // 页面刷新时val是0，不要触发跳转
        if (val != 0) {
          this.$store.commit('UPADTEMENUTABS', val)
          this.$router.push(val)
        }
      }
    },
    menuTabs () {
      return this.$store.getters.menuTabs
    },
  },
  //路由改变的时候监听
  watch:{ 
        $route() {
            this.getBreadcrumb();
        }
  },
  created(){
    this.getBreadcrumb();
    //解决vuex动态菜单权限数据刷新后消失问题
    let token = sessionStorage.getItem('token');
    getRouters(token);
  }
}
</script>

<style scoped>
.el-menu {
  height: 100%;
}

.banner{
  width: 120px;
  height: 30px;
  margin-left: -100px;
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

.user-info{
  font-size: 15px;
}

.userInfo-down{
  float: right;
  margin-left: 20px;
}

.container-home{
    width: 100%;
    height: 100vh;
}

::v-deep .el-breadcrumb{
  font-size: 14px !important;
  line-height: 16px !important;
}

::v-deep .el-tabs__item {
    height: 32px !important;
    font-size:11px !important;
    font-weight:400 !important;
    line-height:35px !important;
}

::v-deep .el-tabs__header{
    margin: 0;
}

::v-deep .el-submenu__title{
   color: #fcfcfc;
}

::v-deep .el-submenu .el-menu-item:focus{
   background-color: transparent !important;
}

::v-deep .el-submenu .el-menu-item{
   padding-left: 61px !important;
}
</style>

