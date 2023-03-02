import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import appStore from './modules/app'
import tabStore from './modules/tab'

const store = createPinia()

store.use(
  createPersistedState({
    storage: localStorage,
  }),
)

export default store

export { appStore, tabStore }

// 重置所有仓库状态
export const resetStore = () => {
  appStore().$reset()
  tabStore().$reset()
}
