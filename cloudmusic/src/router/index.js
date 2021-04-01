import Vue from 'vue'
import VueRouter from 'vue-router'

import index from '../views/index/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  }
]

const router = new VueRouter({
  routes
})

export default router
