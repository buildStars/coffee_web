import {
    reqFindAddress,
    reqaddAddress,
    reqFindAddressByAid,
    reqEditAddress,
    reqDeleteAddress
} from "@/api"

const state = {
    address: []
}
const mutations = {
    FINDADRRESS(state, address) {
        state.address = address
    }
}
const actions = {
    async findAddress({
        commit
    }, msg) {
        let res = await reqFindAddress(msg)
        if (res.code == 20000) {
            let address = res.result
            address = address.map((addr) => {
                addr.address = addr.province + addr.city + addr.county + addr.addressDetail
                return addr
            })

            commit('FINDADRRESS', address)
            return Promise.resolve(res)
        }

    },
    async addAddress({
        commit
    }, msg) {
        let res = await reqaddAddress(msg)

        return Promise.resolve(res)
    },
    async findAddressByAid({
        commit
    }, msg) {
        let res = await reqFindAddressByAid(msg)
        return Promise.resolve(res)
    },
    async editAddress({
        commit
    }, msg) {
        let res = await reqEditAddress(msg)
        return Promise.resolve(res)
    },
    async deleteAddress({
        commit
    }, msg) {
        let res = await reqDeleteAddress(msg)
        return Promise.resolve(res)
    },


}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}