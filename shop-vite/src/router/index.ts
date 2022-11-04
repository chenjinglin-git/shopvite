import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
