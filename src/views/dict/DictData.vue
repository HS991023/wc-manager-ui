<template>
    <div>

    </div>
</template>

<script>
export default {
    name: 'WcManagerUiDictData',
    data() {
        return {
            
        };
    },
    mounted() {
        //接收字典类型页面发送过来的数据
        this.$bus.$on('reviceDictTypeData',val=>{
            console.log(val);
        });
    },
    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>