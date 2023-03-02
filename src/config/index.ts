import { isProd } from '@/utils'

// 接口api通用前缀
export const apiPrefix = () => {
  const config: Record<string, string> = {
    DEV: '/api',
    // DEV: '',
    TEST: '/api',
    PROD: '/api',
  }
  return config[import.meta.env.VITE_APP_ENV]
}

// axios配置
export const axiosConfig: AxiosConfig = {
  // baseUrlDev: 'http://127.0.0.1:8060', // 开发环境地址
  baseUrlDev: '', // 开发环境地址
  baseUrlTest: 'https://aaa.com', // 测试环境地址
  baseUrlProd: 'https://bbb.com', // 正式环境地址
  timeout: isProd() ? 3000 : 5000, // 超时时间
  withCredentials: false, // 是否允许携带cookie
  retries: 0, // 请求失败重试次数
  shouldResetTimeout: true, // 重试的时候是否重置超时时间
  retryDelay: 0, // 每个请求之间的重试延迟时间(ms)
}

interface AxiosConfig {
  baseUrlDev: string
  baseUrlTest: string
  baseUrlProd: string
  timeout: number
  withCredentials: boolean
  retries: number
  shouldResetTimeout: boolean
  retryDelay: any
}
