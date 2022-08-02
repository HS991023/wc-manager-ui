<template>
   <!-- 项目展示页 -->
   <div class="main">
     <div class="project-title">
        <h2>欢迎访问公厕管理平台</h2>
     </div>
    <el-divider></el-divider>
    <!-- 项目描述 -->
    <div class="project-desc">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>公厕管理平台项目描述</span>
                </div>
                <div>
                  公厕管理平台是一套基于RBAC思想,设计的标准化低耦合的后台权限管理系统,该项目可作为后端权限管理模版,并在此基础上进行横向扩展
                  <br/><br/>
                  项目业务点描述:
                  <br/><br/>
                  1.依托权限管理实现各地区公厕的登记管理
                  <br/><br/>
                  2.支持多租户
                  <br/><br/>
                  3.公厕可进行地区展示,及地图定位功能
                  <br/><br/>
                  4.借助于物联网设备实现公厕的实时使用情况及动态上图可视化
                </div>
          </el-card>
    </div>
    <!-- 技术栈 -->
    <div class="technology-stack">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>前端技术栈</span>
                </div>
                <div>
                 前端技术: 1、Vue2 2、ECharts5.3.3 3、Element UI2.15.8 4、Axios3.4.1
                </div>
            </el-card>
        </div>
    <div class="technology-stack">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>后端技术栈</span>
            </div>
            <div>
                后端技术: 1、JDK1.8 2、SpringBoot2.5.1 3、Druid1.2.8 4、MyBatis2.2.0 
                <br/><br/>
                5、MyBatis-Plus3.4.2  6、Knife4j3.0.3 7、JJWT0.9.0  8、XXL-JOB2.3.0
                <br/><br/>
            9、Redis2.5.1 10、阿里云OSS对象存储
            </div>
        </el-card>
    </div>
    <div class="update-log">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>更新日志</span>
            </div>
            <div>
               1. 2022.07.28 系统基本功能完善(eg:剩余多租户及公厕实时使用情况及动态上图延期处理)V1.0.0
               2. 2022.08.02 优化系统功能(eg:剩余公厕实时使用情况及动态上图延期处理)V1.0.1
            </div>
        </el-card>
    </div>
    <!-- 功能描述 -->
    <div class="function-desc">
         <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>功能描述</span>
            </div>
            <div>
                1. 基于RBAC思想的权限管理 
                <br/><br/>
                2. 系统字典管理
                <br/><br/>
                3.系统实时操作日志
                <br/><br/>
                4.系统实时登录日志
                <br/><br/>
                5.在线用户实时查看及强制踢出
                <br/><br/>
                6.系统接口调用次数可视化展示
                <br/><br/>
                7.公厕管理
                <br/><br/>
                8.坑位管理
                <br/><br/>
                9.设备管理
                <br/><br/>
                10.地区管理
            </div>
        </el-card>
    </div>
   </div>
</template>

<script>
export default {
    name:'WcManagerUiShow',

}
</script>

<style>
/* 主样式 */
.main{
    margin-top: 90px;
    margin-left: -13px;
    height: 90px !important;
}

/* 项目title */
.project-title{
    margin-top: -26px;
    width: 100%;
    height: 20px;
    border-left: 2px solid #fcfcfc;
}

/* 项目主体 */
.project-desc,
.technology-stack{
    margin-bottom: 10px;
}

/* 项目描述字体颜色 */
.project-desc span,
.project-desc .el-card__body{
    color:#317a7a !important;
}

/* 技术栈字体颜色 */
.technology-stack span,
.technology-stack .el-card__body{
    color:#2c1a74 !important;
}

/* 更新日志字体颜色 */
.update-log span,
.update-log .el-card__body{
    color:#bf1f16 !important;
}


/* 技术栈盒子样式 */
.technology-stack,
.update-log,
.technology-stack .box-card{
   width: 600px;
}

/* 功能描述盒子样式 */
.function-desc{
    margin-top: -455px;
    float: right;
    width: 598px;
    height: 100%;
}

/* 功能描述字体样式 */
.function-desc span,
.function-desc .el-card__body{
    color:#eb9e0e !important;
}

/* 卡片样式 */
.text {
    font-size: 14px;
}
.item {
    margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.box-card {
    width: 100%;
}

</style>