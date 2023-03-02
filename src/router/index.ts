import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import base from './modules/base'
import claim from './modules/claim'
import notFound from './modules/notFound'
import { appStore } from '@/store'

// 路由白名单（在白名单内可以不走验证）
const WHITE_ROUTE_LIST: string[] = ['/login']

// 路由缓存黑名单，在黑名单内的路由不缓存
export const BLACK_LIST: string[] = []

export const routes: RouteRecordRaw[] = [
  ...base,
  // 新增的路由放在注释中间 -- start
  ...claim,
  // ...user,
  // 新增的路由放在注释中间 -- end
  ...notFound,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = appStore().token
  // 如果在路由白名单内或者 token 存在，则不走验证逻辑
  if (WHITE_ROUTE_LIST.includes(to.path) || token) {
    next()
  }
  // 跳转登录页
  else {
    next({ path: '/login' })
  }
})

export default router
