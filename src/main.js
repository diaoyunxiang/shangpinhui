import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Pagination from "@/components/Pagination"
import {reqCategoryList} from '@/api'
import store from '@/store'

// 模拟发送mock
import '@/mock/mockserver'
//引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
new Vue({
  render: h => h(App),
  // 注册路由
  router,
  store,
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus=this;
  },
 
}).$mount('#app')
