import {
    reqGetDetail,
    reqAddShopcart
} from "@/api"
const state = {
    detail: []
}
const mutations = {
    GETDETAIL(state, detail) {
        state.detail = detail
    }
}
const actions = {

    async getDetail({
        commit
    }, msg) {
        let res = await reqGetDetail(msg)

        if (res.code == 600) {
            commit('GETDETAIL', res.result)
            return Promise.resolve(res)
        }
    },

    async addShopcart({
        commit
    }, msg) {
        let res = await reqAddShopcart(msg)
        if (res.code == 3000) {
            return Promise.resolve(res)
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