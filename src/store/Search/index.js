import {reqSearch} from '@/api'
const state ={

}
const mutations={
    
}
const actions ={
    async search({commit},msg){
        let res = await reqSearch(msg)

        return Promise.resolve(res)
    }
}
const getters ={}

export default {
    state,
    mutations,
    actions,
    getters
}