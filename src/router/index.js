import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import {
  getLocal
} from '@/utils/LocalStorage'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'


  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      tabbarShow: true,
      reqToken: false
    }
  }, {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/Menu'),
    meta: {
      tabbarShow: true,
      reqToken: false
    }
  }, {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search'),
    meta: {
      tabbarShow: false,
      reqToken: false
    }
  },
  {
    path: '/shopbag',
    name: 'shopbag',
    component: () => import('@/views/Shopbag'),
    meta: {
      tabbarShow: true,

      reqToken: false
    }
  }, {
    path: '/orderPay',
    name: 'orderPay',
    component: () => import('@/views/OrderPay'),
    meta: {
      tabbarShow: false,
      reqToken: true
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/My'),
    meta: {
      tabbarShow: true,
      reqToken: true
    }
  }, {
    path: '/account',
    name: 'account',
    component: () => import('@/views/Account'),
    meta: {
      tabbarShow: false,
      reqToken: true
    }
  }, {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order'),
    meta: {
      tabbarShow: false,
      reqToken: true
    }
  },
  {
    path: '/like',
    name: 'like',
    component: () => import('@/views/Like'),
    meta: {
      tabbarShow: false,
      reqToken: true
    }
  }, {
    path: '/myaddress',
    name: 'myaddress',
    component: () => import('@/views/Myaddress'),
    meta: {
      tabbarShow: false,
      reqToken: true
    }
  }, {
    path: '/addAddress',
    name: 'addAddress',
    component: () => import('@/views/addAddress'),
    meta: {
      tabbarShow: false,
      reqToken: true
    }
  }, {
    path: '/editAddress',
    name: 'editAddress',
    component: () => import('@/views/EditAddress'),
    meta: {
      tabbarShow: false,
      reqToken: true
    }
  }, {
    path: '/secure',
    name: 'secure',
    component: () => import('@/views/Secure'),
    meta: {
      tabbarShow: false,
      reqToken: true
    }
  }, {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/Detail'),
    meta: {
      tabbarShow: false,
      reqToken: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      tabbarShow: false,
      reqToken: false
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/Forget'),
    meta: {
      tabbarShow: false,
      reqToken: false
    }
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //获取token
  let token = getLocal('userLoginMsg-coffee') && getLocal('userLoginMsg-coffee').token

  if (token) { //判定token  如果有token 获取用户信息 判定token是否有效
    if (to.path == '/orderPay') {
      if (from.path == '/order') {
        next('/shopbag')
      }
    }
    next()


  } else { //没有token

    store.commit('CLEARACCOUNTINFO') //清楚信息
    if (to.meta.reqToken == true) { //是否需要token

      router.replace('/login')
    } else {
      next()

    }
  }

})
export default router