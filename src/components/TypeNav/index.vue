<template>
  <div class="type-nav">
    <div class="container">
      <!--控制TypeNav的显现与否 -->
      <div @mouseenter="TypeNavshow" @mouseleave="TypeNavleave">
        <h2 class="all">全部商品分类</h2>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div
        class="sort"
        v-show="show"
        @mouseenter="TypeNavshow"
        @mouseleave="TypeNavleave"
      >
        <div class="all-sort-list2" @click="goSearch">
          <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId">
            <h3>
              <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                c1.categoryName
              }}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl
                  class="fore"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dt>
                    <a
                      :data-categoryName="c2.categoryName"
                      :data-category2Id="c2.categoryId"
                      >{{ c2.categoryName }}</a
                    >
                  </dt>
                  <dd>
                    <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                      <a
                        :data-categoryName="c3.categoryName"
                        :data-category3Id="c3.categoryId"
                        >{{ c3.categoryName }}</a
                      >
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "TypeNav",
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    this.show = true;
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList.slice(0, 15),
    }),
  },

  methods: {
    goSearch(event) {
      let element = event.target;
      //html中会把大写转为小写
      //获取目前鼠标点击标签的categoryname,category1Id,category2Id,category3Id，
      // 通过四个属性是否存在来判断是否为a标签，以及属于哪一个等级的a标签

      let { categoryname, category1id, category2id, category3id } = element.dataset;

      //categoryname存在，表示为a标签

      if (categoryname) {
        //category1Id一级a标签
        //整理路由跳转的参数
        let location = { name: "search" }; //跳转路由name
        let query = { categoryName: categoryname }; //路由参数

        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          //category2Id二级a标签
          query.category2id = category2id;
        } else if (category3id) {
          //category3Id三级a标签
          query.category3Id = category3id;
        }
        //整理完参数
        location.query = query;
        //路由跳转
      
       location.query.keyword=this.$route.query.keyword
      
        this.$router.push(location);
      }
    },
    //TypeNav展现
    TypeNavshow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    //TypeNav消失
    TypeNavleave() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solId #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 464px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 31px;
            font-size: 14px;
            font-weight: 400;
            overflow: hIdden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solId #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solId #eee;
                padding: 6px 0;
                overflow: hIdden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hIdden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solId #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .item:hover {
          background: skyblue;
        }
      }
    }
  }
}
</style>
