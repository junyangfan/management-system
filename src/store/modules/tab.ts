import { defineStore } from 'pinia'
import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'

interface ITabs {
  title: string
  path: string
  closable: boolean
  componentName: string
}

// Tabs初始值，不可关闭
const TABS_INIT: ITabs[] = [
  {
    title: '欢迎',
    path: '/welcome',
    closable: false,
    componentName: 'Welcome',
  },
]

interface State {
  tabs: ITabs[]
}

export default defineStore('tab', {
  state: (): State => ({
    tabs: [...TABS_INIT],
  }),
  actions: {
    /**
     * 移除Tab
     * @param key 需要关闭的path路径
     * @param path 关闭后要跳转的目标路径(不传默认前一个)
     * @returns void
     */
    removeTab(key: string, path?: string) {
      const idx = this.tabs.findIndex((i) => i.path === key)
      if (idx !== -1) {
        this.tabs.splice(idx, 1)
        if (path) {
          router.push(path)
          return
        }
        router.push(this.tabs[idx - 1].path)
        return
      }
      if (path) {
        router.push(path)
      }
    },
    // 添加Tab
    addTab(to: RouteLocationNormalized) {
      const { path, matched, meta } = to
      if (path === '/login') {
        return
      }
      // 如果当前Tab没有当前跳转的路由，则需要添加
      if (!this.tabs.some((t) => t.path === path)) {
        this.tabs.push({
          title: meta.title as string,
          path: path,
          closable: true,
          componentName: matched[matched.length - 1].components?.default.name as string,
        })
      }
    },
    // 关闭其他Tab
    closeOtherTabs(tab: ITabs) {
      router.push(tab.path)
      this.tabs = [...TABS_INIT, tab]
    },
  },
  persist: false,
})
