import { reqAddUpdateShopCart, reqGoodsInfo } from "@/api";
import { getUuid } from "@/utils/uuid";

const state={
    goodsInfo:{},
    uuid_token:getUuid(),
};
const actions={
   async getGoodsInfo(state,skuid){
        let result= await reqGoodsInfo(skuid);
        if(result.code===200){
            state.commit("GOODSINFO",result.data)
        }

    },
    // 将产品添加到数购物车中
    async getShopCart(state,{skuId,skuNum}){
        let result=await reqAddUpdateShopCart(skuId,skuNum);
        if(result.code==200){
            return "ok";
        }else{
            return Promise.reject(new Error('faile'));
        }
       
    }
};
const mutations={
    GOODSINFO(state,goodsInfo){
        state.goodsInfo=goodsInfo;
    }
};
const getters={
    categoryView(state){
        return state.goodsInfo.categoryView||{};
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo||[{}];
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[];

    }
   
};
export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}