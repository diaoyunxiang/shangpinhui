// 引入库
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

let originpush = VueRouter.prototype.push;
let originreplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originpush.call(this, location, resolve, reject);
    } else {
        originpush.call(this, location, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originreplace.call(this, location, resolve, reject);
    } else {
        originreplace.call(this, location, () => {}, () => {});
    }
}

Vue.use(VueRouter);
const router = new VueRouter({
    // 配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {
            y: 0
        }
    },
});
// 全局守卫，前置守卫
router.beforeEach(async (to, from, next) => {
    next();
    try {
        await store.dispatch("user/getUserInfo")
        let name = store.state.user.userInfo.name;
        if (localStorage.getItem("token")) {

            if (to.path == '/login'||to.path=='/register') {
                next('/home')
            } else {
                next();
            }
        } else {
            
            next();
        }
    } catch (error) {
        if (localStorage.getItem("token")) {
        await store.dispatch("user/logOut");}
        
        if(to.path=='/login'||to.path=='/home'||to.path=='/search'||to.path=='/register'||to.path=='/detail')
        {next();}
        else{
            alert("请先登录");
            next('/login')
        
    }
    }
   


})
export default router;