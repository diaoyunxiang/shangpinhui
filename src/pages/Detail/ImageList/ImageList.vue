<template>
    <el-carousel :interval="400000000" type="card" height="56px" indicator-position="none" arrow="always"  @change="getIndex" :initial-index="0">
    <el-carousel-item v-for="(item,index) in skuImageList" :key="index" >
      <img class="medium" :src="item.imgUrl" @click="getIndex(index)">
    </el-carousel-item>
  </el-carousel>
</template>
</template>

<script>

 
  export default {
    name: "ImageList",
    props:['skuImageList'],
   
    methods: {
       getIndex(index){
        this.$bus.$emit("getIndex",index)
        
       }
    },
  }
</script>

<style lang="less" scoped>
.el-carousel__item img {
    
    
    margin: 0;
    border: 1px solid #ccc;
    
    width: 50px;
    height: 50px;
   
    &.active {
          border: 2px solid #f60;
          
        }

    &:hover {
          border: 2px solid #f60;
          
        }
  }
</style>