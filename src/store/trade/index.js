import {
    reqUserAddress,
    reqOrderList,
    addUserAddress
} from "@/api";

const actions = {
    // 获取用户地址
    async getAddress(state) {
       
        let result = await reqUserAddress();
        if (result.code == 200) {
            state.commit("GETADDRESS", result.data);
        }
    },
    // 获取商品信息
    async getOrderList(state) {
        let result = await reqOrderList();
        if (result.code == 200) {
            state.commit("GETORDERLIST", result.data)
        }
    }
};
const mutations = {
    GETADDRESS(state, data) {
        state.userAddress = data

    },
    GETORDERLIST(state, data) {
        state.orderList = data
    }
};
const getters = {};
const state = {
    userAddress: [],
    orderList: {}
};
export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state
}