import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home' }
  },
  {
    path: '/flow/:name',
    name: 'Flow Dashboard',
    component: () => import(/* webpackChunkName: "flow" */ '../views/FlowDashboard.vue'),
    props: true,
    meta: { title: 'Flow' }

  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    meta: { title: '404' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
})


export default router
