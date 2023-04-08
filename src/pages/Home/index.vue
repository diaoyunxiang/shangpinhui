<template>
  <div>
  <TypeNav/>
  <ListContainer/>
  <TodayRecommend/>
  <Rank/>
  <Like/>
  <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/><!--有两个floor组件直接在home进行遍历传参-->
  <Brand/>
  </div>
</template>
<script>
// 注册组件
import ListContainer from '@/pages/Home/ListContainer';
import TodayRecommend from '@/pages/Home/TodayRecommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import {mapState} from 'vuex'
export default {
  
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
    
  },
  mounted(){
  this.$store.dispatch("home/getFloorList");
  this.$store.dispatch("user/getUserInfo");
  
  },
  computed:{
    ...mapState({
    floorList:state=>state.home.floorList,
  })
  },
  
};
</script>
<style lang="less" scoped></style>
