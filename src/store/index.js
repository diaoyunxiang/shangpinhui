import Vue from "vue";
import Vuex from 'vuex';
//需要使用插件一次
Vue.use(Vuex);
import home from './home';
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from "./user";
import trade from "./trade"
import pay from "./pay"
import myorder from './myorder'
export default new Vuex.Store({
     modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
        pay,
        myorder
     }
})
