<template lang="html">
<el-dialog 
  title="地图 操作说明:单击进行标点 双击查看详情 三击保存点位"
  :visible.sync="dialogVisible">
  <div style="width:100%;height:1000px">
    <div class="container">
      <div class="search-box">
        <input
          v-model="searchKey"
          type="search"
          id="search"
          placeholder="请输入需要搜索的位置">
        <button @click="searchByHand">搜索</button>
        <div class="tip-box" id="searchTip"></div>
      </div>
      <!--
        amap-manager： 地图管理对象
        vid：地图容器节点的ID
        zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
        center： 地图中心点坐标值
        plugin：地图使用的插件
        events： 事件
      -->
      <el-amap class="amap-box"
        :amap-manager="amapManager"
        :vid="'amap-vue'"
        :zoom="zoom"
        :zooms="zooms"
        :pitch="pitch"
        :plugin="plugin"
        :center="center"
        :events="events">
      <!-- 标记 -->
      <el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index" :events="markered.events"></el-amap-marker>
      <!-- 窗体信息 -->
      <el-amap-info-window v-if="window.visible" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
      </el-amap>
    </div>
 </div>
</el-dialog>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
let amapManager = new AMapManager()
export default {
  name:'AMap',
  data() {
    let self = this
    return {
      dialogVisible: true,  //是否打开弹窗
      address: null,
      searchKey: '',
      amapManager,
      //信息窗体
      window:{},
      markers: [],
      center: [116.397469,39.908821],  //中心点(默认北京)
      zoom: 4.5,
      zooms: [5, 23],    //设置地图级别范围
      lng: 0,
      lat: 0,
      pitch: 0,  // 地图俯仰角度，有效范围 0 度- 83 度
      loaded: false,
      markeredCount:0,  //点击次数
      searchOption: {   //搜索选项
        city: '全国',
        citylimit: true
      },
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initSearch()
          })
        },
        click(e) {
          self.markers = []
          let { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.center = [lng, lat]
          self.markers.push([lng, lat])
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                // console.log(result.regeocode.formattedAddress) 
                self.address = result.regeocode.formattedAddress
                self.searchKey = result.regeocode.formattedAddress
                self.$nextTick()
              }
            }
          })
        }
      },
      //标记事件
      markered: { 
        position: [0, 0], 
        events: {
          click: (e) => {
            this.marker = null;
            self.markerCilckCount(e);
          },
          dragend: (e) => { 
            //点标记拖拽移动结束触发事件
            console.log("---event---: dragend", e);
            this.marker.position = [e.lnglat.lng, e.lnglat.lat];
          },
        },
        visible: true,  
        draggable: false,
        template:'',
      },
      // 一些工具插件
      plugin: [
        {
          pName: 'Geocoder',
          events: {
            init (o) {
              //console.log("一些工具插件--地址"+o.getAddress())
            }
          }
        },
        {
          // 定位
          pName: 'Geolocation',
          events: {
            init(o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  // 设置经度
                  self.lng = result.position.lng
                  // 设置维度
                  self.lat = result.position.lat
                  // 设置坐标
                  self.center = [self.lng, self.lat]
                  self.markers.push([self.lng, self.lat])
                  // load
                  self.loaded = true
                  // 页面渲染好后
                  self.$nextTick()
                }
              })
            }
          }
        },
        {
          // 工具栏
          pName: 'ToolBar',
          events: {
            init(instance) {
               //console.log("工具栏:"+instance);
            }
          }
        },
        {
          // 鹰眼
          pName: 'OverView',
          events: {
            init(instance) {
               //console.log("鹰眼:"+instance);
            }
          }
        },
        {
          // 地图类型
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(instance) {
               //console.log("地图类型:"+instance);
            }
          }
        },
        {
          // 搜索
          pName: 'PlaceSearch',
          events: {
            init(instance) {
               //console.log("搜索:"+instance)
            }
          }
        }
      ]
    }
  },
  methods: {
    initSearch() {
      let vm = this
      let map = this.amapManager.getMap()
      AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {
        var poiPicker = new PoiPicker({
          input: 'search',
          placeSearchOptions: {
            map: map,
            pageSize: 10
          },
          suggestContainer: 'searchTip',
          searchResultsContainer: 'searchTip'
        })
        vm.poiPicker = poiPicker
        // 监听poi选中信息
        poiPicker.on('poiPicked', function(poiResult) {
          // console.log(poiResult)
           let source = poiResult.source
           let poi = poiResult.item
           if (source !== 'search') {
             poiPicker.searchByKeyword(poi.name)
           } else {
             poiPicker.clearSearchResults()
             vm.markers = []
             let lng = poi.location.lng
             let lat = poi.location.lat
             let address = poi.cityname + poi.adname + poi.name
             vm.center = [lng, lat]
             vm.markers.push([lng, lat])
             vm.lng = lng
             vm.lat = lat
             vm.address = address
             vm.searchKey = address
           }
        })
      })
    },
    searchByHand() {
      if (this.searchKey !== '') {
        this.poiPicker.searchByKeyword(this.searchKey)
      }
    },
    markerCilckCount(e){ //收藏点双击事件
      this.markeredCount++;
      let { lng, lat } = e.lnglat

      var window = {
        position: [lng,lat],
        content: this.address,
        events: {},
        visible: false
      }

      //双击查看详情 三击保存点位
      if(this.markeredCount == 2){  
          window.visible = true;
          //点击点坐标，出现信息窗体
          this.window = window;
      }
      if(this.markeredCount == 3){
          //发送地图坐标点
          this.$bus.$emit("SendPostitionData",{lng,lat});
          this.dialogVisible = false;
          //清零
          this.markeredCount = 0;
      }
    }
  },
  mounted() {
      this.$bus.$on("mapplugin", (data) => {
        this.dialogVisible = data;
    })
  }
}
</script>

<style lang="css" scoped>
::v-deep .container {
  width: 100%;
  height: 60%;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  border: 1px solid #999;
}
::v-deep .search-box {
  position: absolute;
  z-index: 5;
  width: 30%;
  left: 6%;
  top: 20px;
  height: 30px;
}
::v-deep .search-box input {
  float: left;
  width: 80%;
  height: 100%;
  border: 1px solid #30ccc1;
  padding: 0 8px;
  outline: none;
}
::v-deep .search-box button {
  float: left;
  width: 20%;
  height: 100%;
  background: #30ccc1;
  border: 1px solid #30ccc1;
  color: #fff;
  outline: none;
}
::v-deep .tip-box {
  width: 100%;
  max-height: 260px;
  position: absolute;
  top: 30px;
  overflow-y: auto;
  background-color: #fff;
}

/* 弹窗样式 */
::v-deep .el-dialog{
  margin-top: 43px !important;
  width: 80% !important;
  height: 615px !important;
}

/* 弹窗头部样式 */
::v-deep .el-dialog__header{
   margin-bottom: -198px;
}

/* 弹窗body样式 */
::v-deep .el-dialog__body{
  padding:0;
}

/* 切换图层组件位置 */
::v-deep .amap-maptypecontrol{
  top: 12px;
  right: 0px;
}

/* 鹰眼图位置 */
::v-deep .amap-overviewcontrol{
  right: -2px;
  bottom: 1x;
}

/* 定位图标位置 */
::v-deep .amap-geolocation-con .amap-geo{
  margin-bottom: 1px;
}
</style>
