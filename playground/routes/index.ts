import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../pages/index.vue'),
    name: 'home',
  },
  {
    path: '/calender',
    component: () => import('../pages/calender/index.vue'),
    name: 'calender',
  },
]
