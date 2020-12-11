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
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/List.vue')
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('../views/SelectCity.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
