import { GetEnum } from '@/api/basic/api'
import { GetEnumRsp, UserInfo } from '@/api/basic/model'
import { defineStore } from 'pinia'

// 全局枚举值参数配置
const ENUMS = ['area']

interface State {
  token: string
  userInfo: UserInfo | Record<string, any>
  // 枚举配置
  enums: GetEnumRsp | Record<string, any>
}

export default defineStore('app', {
  state: (): State => ({
    token: '',
    enums: {},
    userInfo: {},
  }),
  getters: {
    // 中国地区枚举
    areaOptions(): any[] {
      return this.enums?.area || []
    },
  },
  actions: {
    updateToken(token: string) {
      this.token = token
    },
    updateUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    updateEnums(enums: GetEnumRsp | Record<string, any>) {
      this.enums = enums
    },
    refreshEnums() {
      GetEnum({ enums: ENUMS })
        .then((rsp) => rsp)
        .catch(() => ({}))
        .then((rsp) => {
          this.updateEnums(rsp)
        })
    },
  },
  persist: {
    key: 'scmAppStorage',
    paths: ['token', 'userInfo', 'enums'],
  },
})
