import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
