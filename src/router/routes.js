// 需要的组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 二级路由
import MyOrder from '@/pages/Center/MyOrder.vue'
import Group from '@/pages/Center/Group.vue'
export default 
    [{
        path: '/center',
        component: Center,
        meta: {
            show: true
        },
        name:'center',
        children:[
            {
                path:"myorder",
                component:MyOrder

        },
        {
            path:"group",
            component:Group

    },
    {
        path:"/center",
        redirect:"/center/myorder"
    }
        ]

        
    },{
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            show: true
        },
        name:'paysuccess'
    },{
        path: '/pay',
        component: Pay,
        meta: {
            show: true
        },
        name:'pay'
    },{
        path: '/trade',
        component: Trade,
        meta: {
            show: true
        },
        name:'trade'
    },{
        path: '/shopcart',
        component: ShopCart,
        meta: {
            show: true
        },
        name:'shopcart'
    },{
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: {
            show: true
        },
        name:'addcartsuccess'
    },{
            path: '/home',
            component: Home,
            meta: {
                show: true
            }
        }, {
            path: '/login',
            component: Login,
            meta: {
                show: true
            }
        }, {
            path: '/register',
            component: Register,
            meta: {
                show: false
            }
        }, {
            path: '/search',
            component: Search,
            meta: {
                show: true
            },
            // 传参准备
            name: 'search'
        }, {
            path: '/detail/:skuid',
            component: Detail,
            meta: {
                show: true
            }

        },
        // 对一开始访问进行重定向
        {
            path: '*',
            redirect: '/home'
        }
    ]