import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routers';

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: routers
})

export default router
