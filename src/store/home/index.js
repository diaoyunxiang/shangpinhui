import { reqBanners, reqCategoryList ,reqFloors} from "@/api";
// state:仓库存储数据的地方

const state={
    categoryList:[],
    bannerList:[],
    floorList:[]
};
// mutations:修改state的唯一地方
const mutations={
    // 存储到变量中
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList

    },
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList

    },
    FLOORLIST(state,floorList){
        state.floorList=floorList
    },
};
// action:处理action，可以写业务逻辑
const actions={
    // promise语法
   async categoryList(state){
        let result=await reqCategoryList();
        if(result.code===200){
            // 发送获取的数据给mutations进行处理
            state.commit("CATEGORYLIST",result.data)
        }
    },
    async getBannerList(state){
        let result=await reqBanners();
        if(result.code===200){
            // 发送获取的数据给mutations进行处理
            state.commit("BANNERLIST",result.data)
        }
    },
    async getFloorList(state){
        let result=await reqFloors();
        if(result.code===200){
            state.commit("FLOORLIST",result.data);
        }
    },
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