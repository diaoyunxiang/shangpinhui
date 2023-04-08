// 对axios进行二次封装
import axios from "axios";
import { Promise } from "core-js";
// 引用进度条
import nProgress from "nprogress";
// 进度条样式
import 'nprogress/nprogress.css'
import store from '@/store'
const requests=axios.create({
    // 基础路径自动添加
    baseURL:"/api",
    // 请求5秒超时自动取消
    timeout:5000
})
// 请求拦截器
requests.interceptors.request.use((config)=>{// headers请求头
    // 进度条开始动
    nProgress.start();
    if(store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token;
       
    }
    // 携带token带给服务器
    if(localStorage.getItem("token")){
        config.headers.token=localStorage.getItem("token");
    }
    return config;

})
 // 成功的回调函数，服务器返回数据回来后，相应拦截器检测到，可修改
requests.interceptors.response.use((res)=>{
    // 进度条停止动
    nProgress.done();
    return res.data;
},(err)=>{
    return Promise.reject(new Error('faile'))
})
export default requests;