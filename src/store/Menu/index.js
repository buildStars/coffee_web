import {
    reqGetType,
    reqGetHotProduct,
    reqGetTypeProduct
} from "@/api"

const state = {
    type: [],
    hotProduct: [],
    typeProduct: []
}
const mutations = {
    GETTYPE(state, type) {
        state.type = type
    },
    GETHOTPRODUCT(state, hotProduct) {
        state.hotProduct = hotProduct
    },
    GETTYPEPRODUCT(state, typeProduct) {
        state.typeProduct = typeProduct
    }
}
const actions = {

    async getType({
        commit
    }) {
        let res = await reqGetType()

        if (res.code == 400) {

            commit('GETTYPE', res.result)
        }
    },
    async getHotProduct({
        commit
    }) {

        let res = await reqGetHotProduct()
        if (res.code == 500) {

            commit('GETHOTPRODUCT', res.result)
        }
    },
    async getTypeProduct({
        commit
    }, msg) {
  
        let res = await reqGetTypeProduct(msg)
        if (res.code == 500) {
            console.log(res);
            commit('GETTYPEPRODUCT', res.result)
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