<template>

  <div class="tree-region-style">
    <div class="tree-region">
       <el-tree :data="dictTypeTree" :props="defaultProps" @node-click="getDictTree"></el-tree>
    </div>
  </div>
</template>

<script>
import {dictTree} from '@/api/system/dict'
export default {
   name:'DictInfo',
   data(){
    return{
      //字典类型树
      dictTypeTree:[],
      defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
   },
   methods:{
    getDictTree(){
      dictTree().then(response=>{
        if(200 == response.code){
          this.dictTypeTree = response.data;
        }
      })
    }
    },
   created(){
    this.getDictTree();
   }
}
</script>

<style>

</style>