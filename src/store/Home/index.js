import {
    reqGetBanner,
    reqGetHotProduct
} from "@/api"
const state = {
    banner: [],
    hotProduct: []
}
const mutations = {
    GETBANNER(state, banner) {
        state.banner = banner
    },
    GETHOTPRODUCT(state, hotProduct) {
        state.hotProduct = hotProduct
    }
}
const actions = {
    async getBanner({
        commit
    }) {

        let res = await reqGetBanner()
        
        if (res.code == 300) {
            commit('GETBANNER', res.result)
        }
    },
    async getHotProduct({
        commit
    }) {

        let res = await reqGetHotProduct()
        if (res.code == 500) {
        
            commit('GETHOTPRODUCT', res.result)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}