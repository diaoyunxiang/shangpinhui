<<template>
     <div class="block">
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="5"
      layout="total, prev, pager, next"
      :total=total>
    </el-pagination>
  </div>
</template>
<script>
export default {
   name: 'Pagination',
   components: {
     
   },
   methods: {
      handleSizeChange(val) {
        
      },
      handleCurrentChange(val) {
        
        this.$emit("changePageNo",val)
      },
    },
    props:{
        total:Number
    },
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    }
};
</script>
<style lang='' scoped>
</style>