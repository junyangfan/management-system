import { message } from 'ant-design-vue'
import { ShopAttr, AttributeOptionsType, StatusEnum } from '@/enum'
import { Address } from '@/api/user/model'
import { h, CSSProperties } from 'vue'

// 时间处理统一用 dayjs 库（https://dayjs.gitee.io/docs/zh-CN/parse/now）

/**
 * 处理展示价格
 * @param value 需要处理的数字
 * @param hundred 是否除以100
 * @returns 格式化后的介个
 */
export const showPrice = (value?: number, hundred = true) => {
  if (checkType(value) !== 'number') {
    return '-'
  }
  return (Number(value) / (hundred ? 100 : 1)).toFixed(2)
}

/**
 * 获取枚举值的label属性
 * @param value 值
 * @param options 枚举数组
 * @returns 对应的label
 */
export const computeStatus = (value: string | number | undefined | null, options: StatusEnum[]): string => {
  if (['null', 'undefined'].includes(checkType(value))) {
    return ''
  }
  return options.find((o) => String(o.value) === String(value))?.label || ''
}

/**
 * 校验类型
 * @param para 需要检查类型的值
 * @returns 返回对应的类型
 */
export const checkType = (para: unknown) => {
  return Object.prototype.toString.call(para).slice(8, -1).toLocaleLowerCase()
}

/**
 * 校验电话号码是否正确
 * @param tel 电话号码 number | string
 * @returns boolean
 */
export const checkPhone = (tel: number | string): boolean => {
  return /^1[3456789]\d{9}$/.test(String(tel))
}

/**
 * 校验身份证号码
 * @param card 身份证号码 number | string
 * @returns boolean
 */
export const checkIdCard = (card: number | string): boolean => {
  return /(^\d{17}(\d|X|x)$)/.test(String(card))
}

/**
 * 格式化属性
 * @param str 属性字符串
 * @param sign 分隔符
 * @returns 按指定格式返回
 */
export const formatAttr = (str: string, sign = '，') => {
  return JSON.parse(str || '[]')
    .map((i: ShopAttr) => `${i.key}: ${i.value}`)
    .join(sign)
}

/**
 * 换行格式化属性
 * @param str 属性字符串
 * @param retStr 数据有问题返回的字符串，默认空
 * @param oStyle 外层样式
 * @param iStyle 内层样式数组
 * @returns 按指定格式返回
 */
export const formatAttrWrap = (str: string, retStr = '', oStyle?: CSSProperties, iStyle?: CSSProperties[]) => {
  if (!['string'].includes(checkType(str))) {
    return retStr
  }
  return h(
    'div',
    oStyle ? oStyle : {},
    JSON.parse(str || '[]').map((i: ShopAttr, idx: number) => {
      return h('div', iStyle && iStyle[idx] ? iStyle[idx] : {}, `${i.key}: ${i.value}`)
    }),
  )
}

// 是否是正式环境
export const isProd = () => import.meta.env.VITE_APP_ENV === 'PROD'

/**
 * 分割textarea字符串
 * @param str 要分割的字符串
 * @returns 字符串数组
 */
export function splitStr(str: string | undefined): string[] | undefined {
  return str ? str.split(/[\n\s,，;；]/g).filter((i) => i && i.trim()) : undefined
}

/**
 * 批量复制内容到粘贴板
 * textList : 需要复制的内容列表
 * sign : 分隔符
 */
export const batchCopyToClip = (textList: Array<string | number>, sign = ',') => {
  const text = textList.join(sign)
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
  } else {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.style.position = 'fixed'
    textarea.style.clipPath = 'rect(0 0 0 0)'
    textarea.style.top = '10px'
    textarea.value = text
    textarea.select()
    document.execCommand('copy', true)
    document.body.removeChild(textarea)
  }
  message.success('复制成功')
}

/**
 * 处理特殊聚合行
 * @param record 每行数据
 * @param field 嵌套层级字段
 * @param colNum 聚合行的列数
 * @returns 行属性
 */
export const showSpecialRowCell = (record: any, field = 'children', colNum = 20) => {
  if (record[field]) {
    return { colSpan: colNum }
  }
  return { colSpan: 1 }
}

/**
 * 处理正常聚合行
 * @param record 每行数据
 * @param field 嵌套层级字段
 * @returns 行属性
 */
export const showNormalRowCell = (record: any, field = 'children') => {
  if (record[field]) {
    return { colSpan: 0 }
  }
  return { colSpan: 1 }
}

/**
 * 随机生成颜色
 * @returns 颜色字符串，例如：(#FFB6C1)
 */
export const randomColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return '#' + r.toString(16) + g.toString(16) + b.toString(16)
}

/**
 * 一维数组转二维数组
 * @param num 每个数组的个数
 * @param arr 需要转换的数组
 * @returns 新数组
 */
export const arrOneTransTwo = (num: number, arr: any[]) => {
  const newArr: Array<Array<any>> = []
  while (arr.length > 0) {
    newArr.push(arr.splice(0, num))
  }
  return newArr
}

/**
 * 获取图片的Base64
 * @param file 图片
 * @returns base64
 */
export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

/**
 * 生成随机字符串
 * @param num 字符串长度(默认36位)
 * @returns 字符串
 */
export const generateRandom = (num?: number) => {
  const n = URL.createObjectURL(new Blob()).slice(num ? num : -36)
  URL.revokeObjectURL(n)
  return n
}

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export const localGet = (key: string) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key) as string)
  } catch (error) {
    return value
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const localSet = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export const localDel = (key: string) => {
  window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export const localClear = () => {
  window.localStorage.clear()
}
