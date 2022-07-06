<template>
     <div>
        <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
        <div id="line-echarts" class="echarts-line-region" style="width:100%;height:400px;"></div>
        <div id="cake-echarts" class="echarts-cake-region" style="width: 538px;height:400px;"></div>
    </div>
</template>

<script>
import {interfaceCallData} from '@/api/system/interfacecall'
export default {
    name:'ApiNumber',
    data(){
      return{
           //列表数据
           data:[],
           //折线图选项
           LineOption:{
              title: {
                text: '接口调用统计图'
              },
              tooltip: {},
              legend: {
                data: ['调用成功','调用失败']
              },
              xAxis: {
                data: [],
                axisLabel: {
                  interval: 0, //全部显示x轴
                  formatter: function (params) {
                  var newParamsName = ''; // 拼接后的新字符串
                  var paramsNameNumber = params.length; // 实际标签数
                  var provideNumber = 3; // 每行显示的字数
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 如需换回，算出要显示的行数
                  if (paramsNameNumber > provideNumber) {
                    /** 循环每一行,p表示行 */
                    for (var i = 0; i < rowNumber; i++) {
                      var tempStr = ''; // 每次截取的字符串
                      var start = i * provideNumber; // 截取位置开始
                      var end = start + provideNumber; // 截取位置结束
                      // 最后一行的需要单独处理
                      if (i == rowNumber - 1) {
                        tempStr = params.substring(start, paramsNameNumber);
                      } else {
                        tempStr = params.substring(start, end) + '\n';
                      }
                      newParamsName += tempStr;
                      }
                    } else {
                      newParamsName = params;
                    }
                    return newParamsName;}
                }
              },
              yAxis: {
              },
              series: [
                {
                  name: '调用成功',
                  type: 'line',
                  data: []
                },
                {
                  name: '调用失败',
                  type: 'line',
                  data: [],
                }
              ],
          },
          //饼图选项
          CakeOption:{
              title: {
                text: ''
              },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: []
              },
            series: [
               {
                type: 'pie',
                radius: '90%',
                avoidLabelOverlap: true,
                label: {
                  show: true,
                },
                labelLine: {
                  show: true
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                },
                data: []
              }
            ]}};
    },
    methods:{
      //初始化echarts
      initEcharts(){
         var LineChart = this.$echarts.init(document.getElementById('line-echarts'));
         LineChart.setOption(this.LineOption);
         var CakeChart = this.$echarts.init(document.getElementById('cake-echarts'));
         CakeChart.setOption(this.CakeOption);
         //刷新数据
         this.refreshEcharts(LineChart,CakeChart);
      },
      //刷新图
      refreshEcharts(LineChart,CakeChart){
        let LineOption = this.LineOption;
        let CakeOption = this.CakeOption;
        interfaceCallData().then(response=>{
            if(response.code == 200){
                this.data = response.data ;
                //初始化x轴 调用成功数
                this.data.forEach(obj=>{
                    //折线图标签
                    LineOption.xAxis.data.push(obj.interfaceName);
                    //调用成功数
                    LineOption.series[0].data.push(obj.interfaceCallSuccessCount);
                    //调用失败数
                    LineOption.series[1].data.push(obj.interfaceCallFailCount);
                     //饼图选项
                    // CakeOption.legend.data.push(obj.interfaceName);
                    var data = {
                      value:obj.interfaceCallSuccessCount+obj.interfaceCallFailCount,
                      name:obj.interfaceName
                    }
                    //饼图数据
                    CakeOption.series[0].data.push(data);
                });
                LineChart.setOption(LineOption);
                CakeChart.setOption(CakeOption);
            }
        });
      }
  },
  //初始化图表
  mounted(){
      this.initEcharts();
  }
}
</script>
<style scoped>
.echarts-line-region{
    float: left; 
    margin-top: 100px;
}
.echarts-cake-region{
    float: left; 
    margin-top: 30px;
    margin-left: 283px;
}
</style>