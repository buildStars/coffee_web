import {
    register,
    login
} from "@/api"
const state = {
    regMsg: {}
}
const mutations = {
    GOREGISTER(state, regMsg) {
        state.regMsg = regMsg
    }
}
const actions = {
    async goRegister({
        commit
    }, msg) {
        let res = await register(msg)
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