import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/Signin.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup.vue')
  },
  { // 検索結果
    path: '/search',
    name: 'search',
    component: () => import('../views/List.vue')
  },
  {
    path: '/city/:prefecturesID',
    name: 'city',
    component: () => import('../views/SelectCity.vue')
  },
  {
    path: '/term',
    name: 'term',
    component: () => import('../views/Term.vue')
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('../views/Mypage.vue')
  },
  { // 部屋情報
    path: '/room/:id',
    name: 'roomPage',
    component: () => import('../views/Room')
  },
  {
    path: '/room/:id/form',
    name: 'sendform',
    component: () => import('../views/SendForm')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
