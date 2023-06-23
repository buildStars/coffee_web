import {
    reqFindOrder,
    reqReceive,
    reqRemoveOrder,
    reqPay
} from "@/api"
const state = {
    order: [],
}
const mutations = {
    GETORDER(state, order) {
        state.order = order
    }
}
const actions = {
    async getOrder({
        commit
    }, msg) {
        let res = await reqFindOrder(msg)
        if (res.code == 70000) {
            //整理结果 整理成相同订单号的对像数组，且包含总价格 数量 给订单使用
            let res1 = []
            res.result.forEach((item) => {
                let index = res1.findIndex((e) => e.oid == item.oid)
                if (index < 0) {
                    let obj = {
                        oid: item.oid,
                        totalCount: item.count,
                        totalPrice: item.price * item.count,
                        result: []
                    }
                    obj.result.push(item)
                    res1.push(obj)
                } else {
                    res1[index].totalCount += item.count
                    res1[index].totalPrice += item.count * item.price
                    res1[index].result.push(item)
                }
            })
            res1.reverse()
            commit('GETORDER', res1)
        }
    },

    async toReceive({
        commit
    }, msg) {
        let res = await reqReceive(msg)
        if (res.code == 80000) {
            return Promise.resolve(res)
        }
    },

    async toRemoveOrder({
        commit
    }, msg) {
        let res = await reqRemoveOrder(msg)
        if (res.code == 90000) {
            return Promise.resolve(res)
        }
    },

    async pay({commit},msg){
        let res = await reqPay(msg)
        return Promise.resolve(res)
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}