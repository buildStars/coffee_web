import {
    requpdateUserBg,
    reqFindMy,
    login,
    reqFindAccountInfo,
    reqUpdatePwd,
    reqLogout,
    reqDestroyAccount,
    reqUpdateAvatar,
    reqUpdateNickName,
    reqUpdateDesc,
    reqEmailValidCode,
    reqCheckValidCode,
    reqRetrievePassword
} from "@/api"
import {
    setLocal,
    removeLocal,
    getLocal
} from '@/utils/LocalStorage'




const state = {
    userLogin: {},
    accountInfo: [],
    token: '',
    findMyMsg: [],
}
const mutations = {
    GOLOGIN(state, userLogin) {
        state.userLogin = userLogin
        state.token = userLogin.token
        setLocal('userLoginMsg-coffee', state.userLogin)
    },
    ACCOUNTINFO(state, accountInfo) {
        state.accountInfo = accountInfo
    },
    CLEARACCOUNTINFO(state) {
        state.accountInfo = []
        state.token = ''
        removeLocal('userLoginMsg-coffee')
    },
    GETTOKEN(state) {
        state.token = getLocal('userLoginMsg-coffee') && getLocal('userLoginMsg-coffee').token
    },
    FINDMY(state, findMyMsg) {
        state.findMyMsg = findMyMsg
    }

}
const actions = {
    async goLogin({
        commit
    }, msg) {
        let res = await login(msg)
        commit('GOLOGIN', res)

        return Promise.resolve(res)
    },
    async goLogout({
        commit
    }, msg) {

        let res = await reqLogout(msg)
        if (res.code == 'F001') {
            commit('CLEARACCOUNTINFO')
            return Promise.resolve(res)
        }

    },

    async destroyAccount({
        commit
    }, msg) {
        let res = await reqDestroyAccount(msg)
        if (res.code == 'G001') {
            commit('CLEARACCOUNTINFO')
            return Promise.resolve(res)
        }
    },
    async findAccountInfo({
        commit
    }, msg) {
        let res = await reqFindAccountInfo(msg)

        if (res.code == 'B001') {
            commit('ACCOUNTINFO', res.result)
        }
        return Promise.resolve(res)

    },
    async findMy({
        commit
    }, token) {
        let res = await reqFindMy(token)
        if (res.code == 'A001') {
            commit('FINDMY', res.result)
        }
    },
    async updateUserBg({
        commit
    }, msg) {

        let res = await requpdateUserBg(msg)
        if (res.code == 'I001') {
            return Promise.resolve(res)
        }
    },
    async updatePwd({
        commit
    }, msg) {
        let res = await reqUpdatePwd(msg)
        return Promise.resolve(res)
    },
    async updateAvatar({
        commit
    }, msg) {
        let res = await reqUpdateAvatar(msg)
        return Promise.resolve(res)
    },
    async updateNickName({
        commit
    }, msg) {
        let res = await reqUpdateNickName(msg)
        return Promise.resolve(res)
    },
    async updateDesc({
        commit
    }, msg) {
        let res = await reqUpdateDesc(msg)
        return Promise.resolve(res)
    },

    async emailValidCode({
        commit
    }, msg) {
        let res = await reqEmailValidCode(msg)
        return Promise.resolve(res)
    },
    async checkValidCode({
        commit
    }, msg) {
        let res = await reqCheckValidCode(msg)
        return Promise.resolve(res)
    },
    async retrievePassword({
        commit
    }, msg) {
        let res = await reqRetrievePassword(msg)
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