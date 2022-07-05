<template>
     <div>
        <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
       <div id="main" class="echarts-region" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
export default {
    name:'ApiNumber',
    methods:{
      initEcharts(){
      //基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'));
      // 指定图表的配置项和数据
      var option = {
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
        yAxis: {},
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
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
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