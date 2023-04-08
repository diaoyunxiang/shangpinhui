import { reqPayInfo, reqSubmitOrder } from "@/api";

const actions={
    async submitOrder(state,{tradeNo,data}){
       let result= await reqSubmitOrder(tradeNo,data);
       if (result.code = 200) {
      
        state.commit("GETORDERID", result.data);
        return "ok";
    } else {
        return Promise.reject(new Error('faile'));
    }
    },
    // 获取订单详情
    async getOrderInfo(state,orderId){
        let result=await reqPayInfo(orderId);
        if(result.code==200){
            state.commit("GETORDERINFO",result.data)
        }
    }
};
const mutations={
    GETORDERID(state,id){
        state.orderId=id;

    },
    GETORDERINFO(state,data){
        state.data=data;
    }


};
const getters={};
const state={
    orderId:'',
    data:{},
};
export default {
    namespaced:true,
    actions,
    getters,
    mutations,
    state
}