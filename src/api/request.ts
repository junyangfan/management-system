import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry'
import { message } from 'ant-design-vue'
import { MD5 } from 'crypto-js'
import { axiosConfig } from '@/config'
import { appStore, resetStore } from '@/store'
import router from '@/router'

const CancelToken = axios.CancelToken

const { baseUrlDev, baseUrlTest, baseUrlProd, timeout, withCredentials, retries, shouldResetTimeout, retryDelay } =
  axiosConfig

// 请求列表
const pendingReqKeys = new Map()

// 配置通用请求头
const headers = {
  'Content-Type': 'application/json',
}

// 接口url配置
const baseUrlConfig: Record<string, string> = {
  DEV: baseUrlDev,
  TEST: baseUrlTest,
  PROD: baseUrlProd,
}

// 创建axios实例
const axiosService = axios.create({
  baseURL: baseUrlConfig[import.meta.env.VITE_APP_ENV],
  timeout,
  withCredentials,
  paramsSerializer: { indexes: null },
})

axiosRetry(axiosService, {
  retries,
  shouldResetTimeout,
  retryDelay: (retryCount) => retryCount * retryDelay,
  retryCondition: (error) => {
    // return axiosRetry.isNetworkOrIdempotentRequestError(error)
    return error.message.includes('timeout')
  },
})

axiosService.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {
      ...headers,
      ...config.headers,
      token: appStore().token ?? '',
    } as any
    reqIntercept(config)
    return config
  },
  (error) => errorHandler(error),
)

axiosService.interceptors.response.use(
  (response: AxiosResponse) => {
    const { config, data } = response
    // 登录失效，重新登录
    if (data.errorCode === '02501') {
      resetStore()
      router.push('/login')
    }
    rspIntercept(config)
    // 错误处理
    if (data && !data.success) {
      return errorHandler(data)
    }

    // do something.....
    return data.data
  },
  (error) => {
    const { response, config } = error
    rspIntercept(config)
    if (response) {
      return errorHandler(error)
    }
    if (axios.isCancel(error)) {
      return
    }
    return errorHandler(error)
  },
)

// 请求拦截调用
const reqIntercept = (config: AxiosRequestConfig) => {
  if (!config) {
    return
  }
  const key = getReqKey(config)
  if (pendingReqKeys.has(key)) {
    return (config.cancelToken = new CancelToken((cancel) => cancel()))
  }
  pendingReqKeys.set(key, null)
}

// 响应拦截调用
const rspIntercept = (config: AxiosRequestConfig) => {
  if (!config) {
    return
  }
  const key = getReqKey(config)
  const fn = pendingReqKeys.get(key)
  fn && fn()
  pendingReqKeys.delete(key)
}

// 获取请求key
const getReqKey = (config: AxiosRequestConfig) => {
  // 请求方式、请求地址、请求参数生成的字符串来作为是否重复请求的依据
  const { method, url, params, data } = config
  const rParams = typeof params !== 'string' ? JSON.stringify(params) : params
  const rData = typeof data !== 'string' ? JSON.stringify(data) : data
  return MD5([method, url, rParams, rData].join('&')).toString()
}

// 错误处理
const errorHandler = (error: any) => {
  message.error(error.msg || '请求超时，请稍后再试~')
  return Promise.reject(error)
}

export default axiosService
