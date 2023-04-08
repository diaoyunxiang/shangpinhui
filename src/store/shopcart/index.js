import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const actions={
    async getCartList(state){
        let result=await reqCartList();
        if(result.code==200){
        
            
            state.commit("GETCARTLIST",result.data);
        }},
        // 删除购物车的商品
    async DeleteCartById(state,skuId){
        let result=await reqDeleteCartById(skuId);
        if(result.code==200){
            return "ok";
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 修改购物车选择状态
    async UpdateCheckedById(state,{skuId,isChecked}){
        let result=await reqUpdateCheckedById(skuId,isChecked);
        if(result.code==200){
            return "ok";
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
};
const mutations={
    GETCARTLIST(state,data){
        if(data.length==0){
            state.cartList=[];
        }else
       { state.cartList=data[0].cartInfoList;}
    }
};
const getters={};
const state={
    cartList:[],
};
export default {
    namespaced:true,
    actions,
    mutations,
    getters,
    state
}