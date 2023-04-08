<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in cartList" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked == 1" @click="changeIsChecked(item.skuId,item.isChecked)" />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler(-1, -1, item)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="handler(0, $event.target.value * 1, item)"
            />
            <a href="javascript:void(0)" class="plus" @click="handler(1, 1, item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="removeShop(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @click="changeAllChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{allChecked}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade" >结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState("shopcart", ["cartList"]),
    // 计算总价格
    totalPrice() {
      let sum = 0;
      this.cartList.forEach((element) => {
        if (element.isChecked == 1) {
          sum += element.skuNum * element.skuPrice;
        }
      });
      return sum;
    },
    // 勾选的商品的数量
    allChecked() {
      let su = 0;
      this.cartList.forEach((element) => {
        if (element.isChecked == 1) {
          su += 1;
        }
      });
      return su;
    },
    // 商品是否全部勾选
    // 只要有一个是！=1就返回false
    isAllChecked() {
      return this.cartList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    getData() {
      // 获取个人购物车数据
      this.$store.dispatch("shopcart/getCartList");
    },
    handler: throttle(async function (type, num, item) {
      //  商品的数量 1-加,-1减,0用户自己修改

      if (type == -1) {
        if (item.skuNum <= 1) {
          num = 0;
        }
      } else if (type == 0) {
        // 非法的中文输入或者负数
        if (isNaN(num) || num < 1) {
          num = 0;
        } else {
          // 小数取整
          num = parseInt(num) - item.skuNum;
        }
      }
      try {
        await this.$store.dispatch("detail/getShopCart", {
          skuId: item.skuId,
          skuNum: num,
        });
        // 刷新页面获得修改后的结果
        this.getData();
      } catch (error) {}
    }, 500),
    async removeShop(id) {
      try {
        await this.$store.dispatch("shopcart/DeleteCartById", id);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改某个产品是否选中
    async changeIsChecked(skuId,isChecked){
      try {
        await this.$store.dispatch("shopcart/UpdateCheckedById",{skuId:skuId,isChecked:isChecked==1?0:1} );
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除所有选择的商品
    deleteAllChecked(){
      this.cartList.forEach(element => {
        if(element.isChecked==1)
        {this.removeShop(element.skuId);}
        
      });
      this.getData();

    },
    // 让所有产品都选中
    changeAllChecked(){
      // 判断是否全部选中
      let a=this.isAllChecked?"1":"0";
      this.cartList.forEach(element => {
       this.changeIsChecked(element.skuId,a)     
      });
      this.getData();
    }

    

  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
