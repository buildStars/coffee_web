import Vue from 'vue'
import Vuex from 'vuex'
import home from './Home'
import search from './Search'
import login from './Login'
import forget from './Forget'
import menu from './Menu'
import detail from './Detail'
import user from './User'
import order from './Order'
import like from './Like'
import myaddress from './Myaddress'
import shopbag from './Shopbag'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    menu,
    search,
    login,
    forget,
    detail,
    user,
    order,
    like,
    myaddress,
    shopbag
  }
})