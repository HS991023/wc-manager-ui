<template>
     <div class="main">
        <div class="date-select-region">
          <el-date-picker
            v-model="value"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            align="right"
            type="date"
            size="small"
            :editable="editable"
            :clearable="clearable"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            @change="sendRequest">
          </el-date-picker>
        </div>
        <div id="line-echarts" class="echarts-line-region" style="width:100%;height:400px;"></div>
        <div id="cake-echarts" class="echarts-cake-region" style="width: 538px;height:400px;"></div>
        <!-- 无数据时展示 -->
        <div class="no-data">
             <el-empty description="暂无数据" v-if="show"></el-empty>
        </div>
    </div>
</template>

<script>
import {interfaceCallData} from '@/api/system/interfacecall'
export default {
    name:'ApiNumber',
    data(){
      return{
        value:'',
        //文本框不可输入
        editable: false,
        //是否显示清除按钮
        clearable: false,
        //无数据时展示
        show: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
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
                fontSize: '13',
                fontWeight: 'bold'
              }
            },
            data: []
          }
        ]}};
    },
    methods:{
      //选择日期后发送请求
      sendRequest(){
        this.reset();
        this.refreshEcharts(this.value);
      },
      //初始化echarts
      initEcharts(){
         var LineChart = this.$echarts.init(document.getElementById('line-echarts'));
         LineChart.setOption(this.LineOption);
         var CakeChart = this.$echarts.init(document.getElementById('cake-echarts'));
         CakeChart.setOption(this.CakeOption);
      },
      //刷新图标数据
      refreshEcharts(value){
        if(undefined == value || null === value){
           value = this.value;
        }
        //获取实例
        var LineChart = this.$echarts.getInstanceByDom(document.getElementById('line-echarts'));
        var CakeChart = this.$echarts.getInstanceByDom(document.getElementById('cake-echarts'));
        let LineOption = this.LineOption;
        let CakeOption = this.CakeOption;
        interfaceCallData(value).then(response=>{
            if(response.code == 200){
                this.data = response.data ;
                if(response.count >0){
                   this.show = false;
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
                    };
                    //饼图数据
                    CakeOption.series[0].data.push(data);
                });
                LineChart.setOption(LineOption);
                CakeChart.setOption(CakeOption);
                }else{
                  LineChart.clear();
                  CakeChart.clear();
                  this.show = true;
                }
            }
        });
      },
      //重置数据
      reset(){
           //先清空
        var LineChart = this.$echarts.getInstanceByDom(document.getElementById('line-echarts'));
        var CakeChart = this.$echarts.getInstanceByDom(document.getElementById('cake-echarts'));
        let LineOption = this.LineOption;
        let CakeOption = this.CakeOption;
        //折线图标签
        LineOption.xAxis.data.length = 0;
        //调用成功数
        LineOption.series[0].data.length = 0;
        //调用失败数
        LineOption.series[1].data.length = 0;
        //饼图数据
        CakeOption.series[0].data.length = 0;
        LineChart.setOption(LineOption);
        CakeChart.setOption(CakeOption);
      }
  },
  created(){
    //默认当天日期
    this.value = new Date().toLocaleDateString().split('/').map(item=>{if (item<10){return '0'+ item}else {return item}}).join('-');
  },
  mounted(){
     //初始化图表
     this.initEcharts();
     //挂载数据
     this.refreshEcharts();
  }
}
</script>
<style scoped>
.main{
  position: relative;
}
.date-select-region{
   position:absolute;
   top: 80px;
   left: 886px;
}
::v-deep .date-select-region .el-input__inner{
  height: 34px !important;
  width: 180px !important;
}
.echarts-line-region{
    float: left; 
    margin-top: 100px;
}
.echarts-cake-region{
    float: left; 
    margin-top: 30px;
    margin-left: 283px;
}
.no-data{
    float: left; 
    margin-top: -768px;
    margin-left: 500px;
}
</style>