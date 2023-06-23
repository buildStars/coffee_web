import {
    reqShopcartCount,
    reqAllShopcart,
    reqModifyShopcartCount,
    reqDeleteShopcart,
    reqCommitShopcart
} from '@/api'
const state = {
    allShopcart: [],
    shopcartCount: 0
}
const mutations = {
    SHOPCARTCOUNT(state, res) {
        state.shopcartCount = res
    },
    ALLSHOPCART(state, res) {
        state.allShopcart = res.map(item => {
            item.checked = false
            return item
        })
    },
    DELETESHOPCART(state, sids) {
        sids.forEach(item => {
            let index = state.allShopcart.findIndex(e => e.sid == item)
            state.allShopcart.splice(index, 1)
        })

    },
    ALLCHANGE(state, check) {
        if (check) {
            state.allShopcart.forEach((item) => {
                item.checked = true;
            });
        } else {
            state.allShopcart.forEach((item) => {
                item.checked = false;
            });
        }
    }
}
const actions = {
    async shopcartCount({
        commit
    }, msg) {

        let res = await reqShopcartCount(msg)
        if (res.code == 4000) {
            commit('SHOPCARTCOUNT', res.result)
        }

    },

    async allShopcart({
        commit
    }, msg) {

        let res = await reqAllShopcart(msg)
        if (res.code == 5000) {
            commit('ALLSHOPCART', res.result)
        }
    },

    async modifyShopcartCount({
        commit
    }, msg) {
        let res = await reqModifyShopcartCount(msg)
    },

    async deleteShopcart({
        commit
    }, msg) {
        let res = await reqDeleteShopcart(msg)
        if (res.code == 7000) {
            return Promise.resolve(res)
        }
    },
    async commitShopcart({
        commit
    }, msg) {
        let res = await reqCommitShopcart(msg)
        if(res.code ==50000){
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