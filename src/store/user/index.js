import {
    reqGetCode,
    reqLogOut,
    reqUserInfo,
    reqUserLogin,
    reqUserRegister
} from "@/api";


const actions = {
    async getCode(state, phone) {
        let result = await reqGetCode(phone);
        if (result.code = 200) {
            state.commit("GETCODE", result.data)
        }

    },
    async userRegister(state, user) {
        let result = await reqUserRegister(user);

        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    async userLogin(state, data) {
        let result = await reqUserLogin(data);
        if (result.code = 200) {
            localStorage.setItem("token", result.data.token);

            return "ok";
        } else {
            return Promise.reject(new Error('faile'));
        }
    },

    // 获取用户信息
    async getUserInfo(state) {
        let result = await reqUserInfo();
        if (result.code = 200) {
            state.commit("GETUSERINFO", result.data);
            return "ok";
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 退出登录
    async logOut(state) {
        let result = await reqLogOut();
        if (result.code == 200) {
            state.commit("clear")
            return "ok";
        } else {
            return Promise.reject(new Error('faile'));
        }

    },

};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },

    GETUSERINFO(state, data) {
        state.userInfo = data;
    },
    // 清空所有数据
    clear(state) {
        state.userInfo = "";
        localStorage.removeItem("token")

    }
};
const getters = {
  
};
const state = {
    code: '',
    userInfo: {}
};
export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state
}