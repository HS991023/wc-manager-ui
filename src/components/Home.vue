<template>
<div class="container-home " style="overflow:hidden;">
   <!--侧边拉展开收缩区域 -->
   <!-- <div class="side-switch-region" ref="sideswitchregion">
    <el-button type="primary" size="mini" icon="el-icon-share" @click="sideChange()"></el-button>
   </div> -->
   <!-- 面包屑区域 -->
   <div class="crumbs-region" ref="crumbsregion">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :key="item" v-for="item in crumbsList">
        {{item}}
      </el-breadcrumb-item>
    </el-breadcrumb>
   </div>
   <!-- 标签栏 -->
  <div class="tabs-region" ref="tabsregion">
    <el-tag
      :key="tag.routerPath"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @click="handleOpenTag(tag)"
      @close="handleCloseTag(tag)"
      effect="dark">
      {{tag.routerName}}
    </el-tag>
  </div>
  <el-container style="height: 100%; border: 1px solid #eee">
  <el-aside  id="side" :width="isCollapse?'55px':'210px'"  style="height: 100% background-color: rgb(238, 241, 246)">
    <!-- <div class="banner"><img src="" alt="">图片</div>   -->
    <el-menu :default-openeds="openIndex" @open="handleOpenMeun" @close="handleCloseMeun" 
    :unique-opened="opened" background-color="#1f2d3d" :collapse="isCollapse">
      <el-submenu index="1">
          <template slot="title"><i class="el-icon-meun el-icon-user-solid"></i>用户管理</template>
          <el-menu-item index="1-1" @click="handleMeunItem({routerPath:'/userInfo',routerName:'用户信息'},handleCrumbs('用户信息'))"><router-link to="/userInfo">用户信息</router-link></el-menu-item>
          <el-menu-item index="1-2" @click="handleMeunItem({routerPath:'/onlineUser',routerName:'在线用户'},handleCrumbs('在线用户'))"><router-link to="/onlineUser">在线用户</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-meun  el-icon-s-custom"></i>角色管理</template>
        <el-menu-item index="2-1" @click="handleMeunItem({routerPath:'/roleInfo',routerName:'角色信息'},handleCrumbs('角色信息'))"><router-link to="/roleInfo">角色信息</router-link></el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="3">
        <template slot="title"><i class="el-icon-meun el-icon-s-home"></i>部门管理</template>
          <el-menu-item index="3-1"><router-link to="/deptInfo">部门信息</router-link></el-menu-item>
      </el-submenu> -->
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-meun el-icon-s-order"></i>菜单管理</template>
          <el-menu-item index="4-1" @click="handleMeunItem({routerPath:'/meunInfo',routerName:'菜单信息'},handleCrumbs('菜单信息'))"><router-link to="/meunInfo">菜单信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-meun el-icon-menu"></i>地区管理</template>
        <el-menu-item index="5-1" @click="handleMeunItem({routerPath:'/regionInfo',routerName:'地区信息'},handleCrumbs(''))"><router-link to="/regionInfo">地区信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-meun el-icon-delete-solid"></i>公厕管理</template>
        <el-menu-item index="6-1" @click="handleMeunItem({routerPath:'/toiletInfo',routerName:'公厕信息'},handleCrumbs('公厕信息'))"><router-link to="/toiletInfo">公厕信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"><i class="el-icon-meun el-icon-info "></i>坑位管理</template>
        <el-menu-item index="7-1" @click="handleMeunItem({routerPath:'/positionInfo',routerName:'坑位信息'}),handleCrumbs('坑位信息')"><router-link to="/positionInfo">坑位信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="8">·
        <template slot="title"><i class="el-icon-meun el-icon-s-promotion"></i>设备管理</template>
        <el-menu-item index="8-1" @click="handleMeunItem({routerPath:'/deviceInfo',routerName:'设备信息'},handleCrumbs('设备信息'))"><router-link to="/deviceInfo">设备信息</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="9">
        <template slot="title"><i class="el-icon-meun el-icon-s-ticket"></i>公共模块</template>
        <el-menu-item index="9-1" @click="handleMeunItem({routerPath:'/loginLog',routerName:'登录日志'},handleCrumbs('登录日志'))"><router-link to="/loginLog">登录日志</router-link></el-menu-item>
        <el-menu-item index="9-2" @click="handleMeunItem({routerPath:'/operatorLog',routerName:'操作日志'},handleCrumbs('操作日志'))"><router-link to="/operatorLog">操作日志</router-link></el-menu-item>
        <el-menu-item index="9-3" @click="handleMeunItem({routerPath:'/interfaceCall',routerName:'接口调用次数'},handleCrumbs('接口调用次数'))"><router-link to="/interfaceCall">接口调用次数</router-link></el-menu-item>
      </el-submenu>
      <el-submenu index="10">
        <template slot="title"><i class="el-icon-meun el-icon-s-ticket"></i>字典管理</template>
        <el-menu-item index="10-1" @click="handleMeunItem({routerPath:'/dictInfo',routerName:'字典信息'},handleCrumbs('字典信息'))"><router-link to="/dictInfo">字典信息</router-link></el-menu-item>
      </el-submenu>
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
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
import {logoutUser} from '@/api/system/user'
import {MessageBox} from 'element-ui';
export default {
    name:'Home',
    data() {
      return {
        //默认侧边栏展开
        isCollapse: false,
        //只保持一个菜单打开
        opened: true,
        openIndex:[],
        //标签页方向
        tabPosition: 'top',
        //标签页数据列表 默认为展示页面
        dynamicTags: [{
            routerName:'展示页面',
            routerPath: '/show'
        }],
        //面包屑数据列表
        crumbsList:['首页']
      }
    },
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
      //侧边栏打开或关闭
      sideChange(){
         let res = this.isCollapse;
         if(!res){
            this.isCollapse = true;
         }else{
            this.isCollapse = false;
         }
      }
      ,
      //侧边栏展开收缩时动态更换位置及样式
      changeCrumbs(val){
         var crumbs = this.$refs.crumbsregion;
         var tabsregion = this.$refs.tabsregion;
         var sideswitchregion = this.$refs.sideswitchregion;
         var side = document.getElementById('side')
         var main = document.getElementById('main')
         if(val){
           sideswitchregion.style.left = '33px'
           sideswitchregion.icon = 'el-icon-caret-right'
           crumbs.style.left = '81px'
           tabsregion.style.left = '20px';
           main.style.marginLeft ='-123px';
         }else{
           sideswitchregion.style.left = '195px'
           sideswitchregion.icon = 'el-icon-caret-left'
           crumbs.style.left = '245px'
           tabsregion.style.left = '198px';
           main.style.marginLeft ='5px';
         }
      },
      //新增标签页
      handleMeunItem(val){
       //判断同一个标签是否存在
       let result = this.dynamicTags.some(ele => ele.routerPath === val.routerPath) 
       //如果存在则不再添加相同标签
       if(!result){
          //设置标签页最大长度
          if(this.dynamicTags.length >= 12){
            MessageBox.confirm('已达到最大标签页长度,请关闭标签页后再试!', '系统提示', {
                    type: 'warning'
                })
          }else{
             this.dynamicTags.push(val);
          };
       }
      },
      //打开时添加面包屑数据
      handleOpenMeun(val){
        switch (val) {
          case '1':
            this.resetCrumbs();
            this.crumbsList.push('用户管理');
            break;
          case '2':
            this.resetCrumbs();
            this.crumbsList.push('角色管理');
            break;
          case '3':
             this.resetCrumbs();
             this.crumbsList.push('部门管理');
            break  
          case '4':
             this.resetCrumbs();
             this.crumbsList.push('菜单管理');
            break  
          case '5':
             this.resetCrumbs();
             this.crumbsList.push('地区管理');
            break  
          case '6':
             this.resetCrumbs();
             this.crumbsList.push('公厕管理');
            break    
          case '7':
             this.resetCrumbs();
             this.crumbsList.push('坑位管理');
            break  
          case '8':
             this.resetCrumbs();
             this.crumbsList.push('设备管理');
            break  
          case '9':
             this.resetCrumbs();
             this.crumbsList.push('公共模块');
            break  
          case '10':
             this.resetCrumbs();
             this.crumbsList.push('字典管理');
            break 
          default:
            break;
        }
      },
      handleCloseMeun(val){
        // console.log(val);
      },
       //处理面包屑事件
      handleCrumbs(val){
          this.crumbsList[2] = (val);
      },
      //重置面包屑
      resetCrumbs(){
          this.crumbsList.length = 0;
          this.crumbsList[0] = '首页';
      },
       //打开标签页
      handleOpenTag(tag){
        this.$router.push({
          path: tag.routerPath
        });
      },
      //关闭标签页 展示数据最后一个
      handleCloseTag(tag) {
        let tabs = this.dynamicTags;
        //第一个标签不允许关闭
        if(tabs.length >1){
          //同时删除相关面包屑数据
          this.crumbsList.forEach((val,index)=>{
            if(val == tag.routerName){
               delete this.crumbsList[index];
            }
          })
          //获取关闭标签前一个打开的标签
          let tab = tabs[tabs.length-2];
          this.$router.push({
            path:tab.routerPath,
          })
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        };
      },
    },
    watch:{
      isCollapse:function(val1,val2){
        this.changeCrumbs(val1);
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

