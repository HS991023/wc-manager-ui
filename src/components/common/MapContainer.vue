<template>
  <div id="GaodeMapContainer">
    <input id="myInput" v-model="inputValue" type="text" placeholder="请输入位置,输入后自动搜索" aria-label="请输入要搜索的位置,输入完移开输入框即可自动搜索">
  </div>
</template>
<script>
let areaPolygons = [] // 查询的行政区域
export default {
  name:'MapContainer',  
  data() {
    return {
      myMap: "", // 地图实例
      district: '',  // 行政区划搜索实例
      inputValue: '',  // 用来搜索行政区
      timer: null  // 防抖处理
    };
  },
  watch: {
    inputValue() {
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.seachArea()
      }, 1500)
    }
  },
  mounted() {
    // 初始化一个地图
    this.initMap();
  },
  methods: {
    initMap() {
      //  实例化
      this.myMap = new AMap.Map("GaodeMapContainer", {
        resizeEnable: true,
        center: [116.724762,39.904896], //中心点坐标(东经， 北纬) (jinan)
        zoom: 3, //级别
        zooms: [5, 23],  //设置地图级别范围
        pitch: 0, // 地图俯仰角度，有效范围 0 度- 83 度
        viewMode: "3D", // 地图模式
        terrain:true,
      });
      // 异步加载多个插件 -- 同时引入工具条插件，比例尺插件和鹰眼插件
      AMap.plugin(
        [
          "AMap.ToolBar", // 工具条，控制地图的缩放、平移等
          "AMap.Scale", // 比例尺，显示当前地图中心的比例尺
          // "AMap.OverView",
          "AMap.MapType", // 图层切换，用于几个常用图层切换显示
          "AMap.Geolocation", // 定位，提供了获取用户当前准确位置、所在城市的方法
          "AMap.MouseTool", // 鼠标工具插件
          "AMap.DistrictSearch", // 行政区查询服务，提供了根据名称关键字、citycode、adcode 来查询行政区信息的功能
          "Map3D"
        ], () => {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          this.myMap.addControl(new AMap.ToolBar());
 
          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          this.myMap.addControl(new AMap.Scale());
 
          // // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          // this.myMap.addControl(new AMap.OverView({isOpen: true}));
 
          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          // this.myMap.addControl(new AMap.MapType());
 
          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          this.myMap.addControl(new AMap.Geolocation());
          
          // 测距、测面积使用
          this.mouseTool = new AMap.MouseTool(this.myMap);
 
          /**
           *  行政区搜索使用
           */
          this.district = new AMap.DistrictSearch({
            level: 'city',// 关键字对应的行政区级别，country：国家 province：省/直辖市 city：市 district：区/县 biz_area：商圈
            showbiz: true,  // 是否显示商圈，默认值true 可选为true/false，为了能够精准的定位到街道，特别是在快递、物流、送餐等场景下，强烈建议将此设置为false
            extensions: 'all', //否返回行政区边界坐标点，默认值：base，不返回行政区边界坐标点，取值：all，返回完整行政区边界坐标点
            subdistrict: 3, //  0：不返回下级行政区 1：返回下一级行政区 2：返回下两级行政区 3：返回下三级行政区(默认值 1)
          });
        }
      );
    },
    /**
     *  可以监听input框 去调用该方法
     *  最好是做个防抖处理
     *  行政区域查询
     */
    seachArea() {
      if(!this.inputValue) {
        this.myMap.remove(areaPolygons)//清除上次结果
        return
      }
      this.district.search(this.inputValue, (status, result) => {
        this.myMap.remove(areaPolygons)//清除上次结果
        areaPolygons = [];
        var bounds = result.districtList[0].boundaries;
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            var polygon = new AMap.Polygon({
              strokeWeight: 2,
              path: bounds[i],
              fillOpacity: 0,
              fillColor: '#80d8ff',
              strokeColor: 'red'
            });
            areaPolygons.push(polygon);
          }
        }
        //添加高度面 - 3D
        var object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
        this.myMap.add(object3Dlayer);
        var wall = new AMap.Object3D.Wall({
          path: bounds,
          height: 300,
          color: "#0088ffcc",
        });
        wall.transparent = true;
        wall.backOrFront = "both";
        object3Dlayer.add(wall);
        //  - 3D 结束
        this.myMap.add(areaPolygons)
        this.myMap.setFitView(areaPolygons);//视口自适应
      });
    },
  },
};
</script>
<style scoped>
#GaodeMapContainer {
  width: 100%;
  height: 100%;
  position: relative;
}
#myInput {
  position: absolute;
  left: 5%;
  top: 2.5%;
  width: 160px;
  height: 28px;
  z-index: 999;
  font-size: 13px;
  line-height: 22px;
  border: 1.5px solid skyblue;
}
::v-deep .amap-geolocation-con .amap-geo{
  margin-bottom: 28px;
  margin-left: 5px;
}
</style>

