import requests from "./requests";

export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList', //路径
    method: 'get' //请求方式
});
// 引用方式import {reqCategoryList} from '@/api'

//模拟发送Ajax请求
import mockAjax from './mockAjax'
import { method } from "lodash";

// 获取广告轮播列表
export const reqBanners = () => mockAjax.get('/banners')

// 获取首页楼层列表
export const reqFloors = () => mockAjax.get('/floors')

// search模块获取数据
export const reqSearch = (params) =>requests({
    url: '/list',
    method: 'post',
    data: params
})

// 获取detail商品的详细信息
export const reqGoodsInfo=(skuid)=>requests.get(`/item/${skuid}`)
// 购物车添加某个商品
export const reqAddUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

// 获取购物车列表商品
export const reqCartList=()=>requests({url:"cart/cartList",method:"get"})
// 删除购物车里的商品
export const reqDeleteCartById=(skuid)=>requests({url:`/cart/deleteCart/${skuid}`,method:"delete"})
// 修改产品的选中状态
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})
// 获取验证码
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:"get"})
// 注册
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:"post"})

// 登录
export const reqUserLogin=(data)=>requests({url:'/user/passport/login',data,method:'post'})
// 获取用户信息
export const reqUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:"get"})
// 退出登录
export const reqLogOut=()=>requests({url:'/user/passport/logout',method:"get"})
//获取用户地址信息
export const reqUserAddress=()=>requests({url:"/user/userAddress/auth/findUserAddressList",method:"get"})
// 添加用户地址
export const addUserAddress=(data)=>requests({url:"/user/userAddress/auth/save",data,method:"post"})
// 获取商品清单
export const reqOrderList=()=>requests({url:"/order/auth/trade",method:"get"})
// 提交订单
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})
//获取订单详情
export const reqPayInfo=(orderId)=>requests({url:`payment/weixin/createNative/${orderId}`,method:"get"})
// 判断是否支付
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})
// 获取个人订单
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:"get"})



