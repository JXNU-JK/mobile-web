import Vue from 'vue'
import Router from 'vue-router'
import * as local from '@/services/localData/localStorage.js'

const login = resolve => require.ensure([],
  () => resolve(require('@/page/login/login.vue')), 'home')
const home = resolve => require.ensure([],
  () => resolve(require('@/page/home/home.vue')), 'home')
const question = resolve => require.ensure([],
  () => resolve(require('@/page/test/question.vue')), 'test')
const result = resolve => require.ensure([],
  () => resolve(require('@/page/result/result.vue')), 'result')
const testMain = resolve => require.ensure([],
  () => resolve(require('@/page/test/test-main.vue')), 'test')
const userCenter = resolve => require.ensure([],
  () => resolve(require('@/page/usercenter/usercenter.vue')), 'usercenter')
const userInfo = resolve => require.ensure([],
  () => resolve(require('@/page/usercenter/userInfo.vue')), 'usercenter')
const testHistory = resolve => require.ensure([],
  () => resolve(require('@/page/usercenter/test-history.vue')), 'usercenter')
const collectHistory = resolve => require.ensure([],
  () => resolve(require('@/page/usercenter/collect-history.vue')), 'usercenter')
const integration = resolve => require.ensure([],
  () => resolve(require('@/page/usercenter/integration.vue')), 'usercenter')
const joke = resolve => require.ensure([],
  () => resolve(require('@/page/joke/joke.vue')), 'joke')

Vue.use(Router)

const router = new Router({
  base: '/joke/',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/testMain',
      name: 'testMain',
      component: testMain
    },
    {
      path: '/question',
      name: 'question',
      component: question
    },
    {
      path: '/result',
      name: 'result',
      component: result
    },
    {
      path: '/usercenter',
      name: 'userCenter',
      component: userCenter
    },
    {
      path: '/userinfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/history',
      name: 'testHistory',
      component: testHistory
    },
    {
      path: '/collect',
      name: 'collectHistory',
      component: collectHistory
    },
    {
      path: '/integration',
      name: 'integration',
      component: integration
    },
    {
      path: '/joke',
      name: 'joke',
      component: joke
    }
  ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    local.getLoginState((res) => {
      if (res && JSON.parse(res) === true) {
        next()
      } else {
        window.location.href = '/mobile'
      }
    })
  } else {
    local.getUserInfo((res) => {
      if (res) {
        router.replace({name: 'home'})
      } else {
        next()
      }
    })
  }
})

export default router
