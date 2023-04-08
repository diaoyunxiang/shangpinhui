import { reqSearch } from "@/api";


// state:仓库存储数据的地方
const state={
    searchInfo:{},
    attrsList:[],
    trademarkList:[]

};
// mutations:修改state的唯一地方
const mutations={
    SEARCHINFO(state,end){
        state.searchInfo=end,
        state.attrsList=end.attrsList,
        state.attrsList=end.attrsList,
        state.trademarkList=end.trademarkList

    }
    
};
// action:处理action，可以写业务逻辑
const actions={
   async getsearchInfo(state,params={}){
    let result=await reqSearch(params);
    if(result.code===200){
        state.commit("SEARCHINFO",result.data)
       
    }
   }
};
// getters：理解为计算属性
const getters={};
export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}