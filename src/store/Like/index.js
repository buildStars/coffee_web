import {
    reqFindAllLike,
    reqremoveLike,
    reqFindLike,
    reqLike,
    reqNotlike
} from "@/api"

const state = {
    allLike: [],
    findLike: []
}
const mutations = {
    ALLLIKE(state, allLike) {
        state.allLike = allLike
    },
    FINDLIKE(state, res) {
        state.findLike = res
    }
}
const actions = {
    async findAllLike({
        commit
    }, msg) {
        let res = await reqFindAllLike(msg)
        if (res.code == 2000) {
            commit('ALLLIKE', res.result)
        }
    },
    async removeLike({
        commit
    }, msg) {
        let res = await reqremoveLike(msg)
        console.log(res);
        if (res.code == 900) {
            return Promise.resolve(res.msg)
        }
    },
    async findLike({
        commit
    }, msg) {
        let res = await reqFindLike(msg)
        commit('FINDLIKE', res.result)
    },
    async like({
        commit
    }, msg) {
        let res = await reqLike(msg)
        if (res.code == 800) {
            commit('FINDLIKE', [1])
            return Promise.resolve(res)
        }
    },
    async notlike({
        commit
    }, msg) {
        let res = await reqNotlike(msg)
        if (res.code == 900) {
            commit('FINDLIKE', [])
            return Promise.resolve(res)
        }

    },
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}