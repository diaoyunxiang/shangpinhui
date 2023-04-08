<<template>
    <div class="order-content">
            <div class="title">
              <h3>我的订单</h3>
            </div>
            <div class="chosetype">
              <table>
                <thead>
                  <tr>
                    <th width="29%">商品</th>
                    <th width="31%">订单详情</th>
                    <th width="13%">收货人</th>
                    <th>金额</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="orders">

              <table class="order-item" v-for="(item,index) in myOrderList.records" :key="index" border="1">
                <thead>
                  <tr>
                    <th colspan="5">
                      <span class="ordertitle">{{item.createTime}}　订单编号：{{item.outTradeNo}} <span
                          class="pull-right delete"><img src="./images/delete.png"></span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item2,index) in item.orderDetailList" :key="index">
                    <td width="60%">
                      <div class="typographic">
                        <img :src="item2.imgUrl" style="width:100px;height:100px">
                        <a  class="block-text">{{item.skuName}}</a>
                        <span>x1</span>
                        <a href="#" class="service">售后申请</a>
                      </div>
                    </td>
                    <td :rowspan="item.orderDetailList.length" v-if="index==0" width="8%" class="center">{{item.deliveryAddress}}</td>
                    <td :rowspan="item.orderDetailList.length" v-if="index==0" width="13%" class="center">
                      <ul class="unstyled">
                        <li>总金额¥{{item.totalAmount}}</li>
                        <li>在线支付</li>

                      </ul>
                    </td>
                    <td :rowspan="item.orderDetailList.length" v-if="index==0" width="8%" class="center">
                      <a href="#" class="btn">{{item.orderStatusName}}</a>
                    </td>
                    <td :rowspan="item.orderDetailList.length" v-if="index==0" width="13%" class="center">
                      <ul class="unstyled">
                        <li>
                          <a href="mycomment.html" target="_blank">评价|晒单</a>
                        </li>

                      </ul>
                    </td>
                  </tr>
                 
                </tbody>
              </table>

             
            </div>
            <div class="choose-order">
              <div class="pagination">
                <Pagination @changePageNo="changePageNo" :total="myOrderList.total" />
              
              
              </div>
            </div>
          </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
   name: 'MyOrder',
   data() {
    return {
      page:"1",//当前页数
      limit:"3"//一页几个
    }
   },
   methods: {
    getData(){
      this.$store.dispatch("myorder/getMyOrderList",{page:this.page,limit:this.limit})
    },
    changePageNo(val){
      console.log(val)
      this.page=val;
      this.getData();
    }
   },
   mounted() {
    this.getData();
   },
   computed: {
    ...mapState("myorder",["myOrderList"])
   },
};
</script>
<style lang='' scoped>
</style>