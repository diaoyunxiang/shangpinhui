import { reqMyOrderList } from "@/api";

const actions={
    // 获取个人订单
    async getMyOrderList(state,{page,limit}){
        let result=await reqMyOrderList(page,limit);
        if(result.code==200){
            state.commit("GETMYORDERLIST",result.data);
        }

    }
};
const mutations={ 
    GETMYORDERLIST(state,data){
        state.myOrderList=data;

    }
};
const getters={};
const state={
   myOrderList:{},
};
export default {
    namespaced:true,
    actions,
    getters,
    mutations,
    state
}