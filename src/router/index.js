import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/'
import Layout from '@/views/layout/'
import Home from '@/views/home/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'
import Images from '@/views/images/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: { auth: true }
      },
      {
        path: '/article',
        name: 'article',
        component: Article,
        meta: { auth: true }
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish,
        meta: { auth: true }
      },
      {
        path: '/images',
        name: 'image',
        component: Images,
        meta: { auth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (to.meta.auth) {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
  // ...
})

export default router
