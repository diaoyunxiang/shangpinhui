<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
          <span>{{userInfo.name}}</span>
           <a to="/login" @click="removeAccount">&nbsp&nbsp退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <router-link to="/###">我的尚品汇</router-link>
          <router-link to="/###">尚品汇会员</router-link>
          <router-link to="/###">企业采购</router-link>
          <router-link to="/###">关注尚品汇</router-link>
          <router-link to="/###">合作招商</router-link>
          <router-link to="/###">商家后台</router-link>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="gosearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';


export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
 
  methods: {
    gosearch() {
      if(this.keyword){
      let location={name:"search"};
      let query={keyword:this.keyword};
      let {categoryName, category1Id, category2Id, category3Id}=this.$route.query;
      query.category1Id = category1Id;
      query.category2Id = category2Id;
      query.category3Id = category3Id;
      query.categoryName=categoryName;
      location.query=query;
      this.$router.push(location);}
      else{
        alert("不能填空值");
      }
    },
    // 退出登录
    async removeAccount(){
      try {
        await this.$store.dispatch("user/logOut");
        this.$router.push("/home")
      } catch (error) {
        alert(error.message)
      }
      
      
    }
  },
  mounted() {
    this.$bus.$on("clear",()=>{
      this.keyword='';
    }),
     this.$store.dispatch("user/getUserInfo");
    
  },
  computed: {
    ...mapState("user",["userInfo"]),
    
  },
};
</script>
<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
