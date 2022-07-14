import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: "login",
    component: () => import('../views/login/login.vue'),
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/app/home',
    name: 'home',
    component: () => import('../views/home/home.vue')
  },
  {
    path: '/app/funcionarios',
    name: 'funcionarios',
    component: () => import('../views/list-employee/list-employee.vue')
  },
  {
    path: '/app/cadastro',
    name: 'created-employee',
    component: () => import('../views/created-employee/created-employee.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((routeTo, routeFrom, next) => {
  console.log(routeTo)
  let loginRequired = routeTo.matched.some((ruta) => ruta.meta.requireAuth);
  if (!loginRequired && !store.state.token) {

    return routeTo.path == '/' ? next() : next({
      path:'/'
    });
  }
  next();
})


export default router
