<template>
     <div>
        <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
        <div id="line-echarts" class="echarts-region" style="width: 600px;height:400px;"></div>
        <div id="cake-echarts" class="echarts-region" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
export default {
    name:'ApiNumber',
    methods:{
      initEcharts(){
      //基于准备好的dom，初始化echarts实例
      var LineChart = this.$echarts.init(document.getElementById('line-echarts'));
      var CakeChart = this.$echarts.init(document.getElementById('cake-echarts'));
      // 指定图表的配置项和数据
      var LineOption = {
        title: {
          text: '接口调用统计图'
        },
        tooltip: {},
        legend: {
          data: ['调用成功','调用失败']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {
           
          },
        series: [
          {
            name: '调用成功',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20],
            areaStyle: {}
          },
          {
            name: '调用失败',
            type: 'line',
            data: [2,3,5,1,6,6],
            areaStyle: {}
          }
        ]
      };
      var CakeOption = {
        title: {
          text: '接口调用统计图'
        },
       legend: {
          orient: 'vertical',
          x: 'left',
          data: ['A', 'B', 'C', 'D', 'E']
        },
       series: [
        {
          type: 'pie',
          // radius: ['50%', '70%'],
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
          data: [
            { value: 335, name: 'A' },
            { value: 310, name: 'B' },
            { value: 234, name: 'C' },
            { value: 135, name: 'D' },
            { value: 1548, name: 'E' }
          ]
        }
       ]
      };
      // 使用刚指定的配置项和数据显示图表。
      LineChart.setOption(LineOption);
      CakeChart.setOption(CakeOption);
      }
    },
    mounted() {
      this.initEcharts();
    },
   
}
</script>
<style scoped>
.echarts-region{
    margin-top: 100px;
}
</style>