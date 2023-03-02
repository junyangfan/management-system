import { ColumnType } from 'ant-design-vue/lib/table'
export type { FormConfig } from '@/components/CloudTable/model'
export type { Key } from 'ant-design-vue/lib/table/interface'
export type { Dayjs } from 'dayjs'

export interface IColumnType<RecordType = any> extends ColumnType<RecordType> {
  /**
   * 不能关闭？(true为不能)(false 或者不填这个字段为能)
   */
  notClose?: boolean
}

// 温馨提示配置
export interface TipOptions {
  content: string[]
  title?: string
  isNotAllShow?: boolean
  defaultShowNum?: number
}

// 图片
export interface IImage {
  url: string
  cover: boolean
}

// 地区格式
export interface Address {
  area: string
  city: string
  detail: string
  province: string
}

// 商品属性
export interface ShopAttr {
  key: string
  value: string
}

// 商品属性格式化查询类型
export interface AttributeOptionsType {
  key: string
  options: StatusEnum[]
}

// 枚举
export interface StatusEnum {
  label: string
  value: number | string
  color?: string
}

// 分页参数
export interface PaginationEnum {
  current: number
  size: number
  total?: number
}

// 请求参数
export interface RequestReq<T = Record<string, any>> {
  params: T
  pagination: PaginationEnum
}

// 接口通用返回结果
export interface RequestRsp<T = any> {
  data: T[]
  success: boolean
  total: number
  [key: string]: unknown
}

// Table返回参数
export interface TableRsp<T> {
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFirstPage: boolean
  isLastPage: boolean
  list: T[]
  nextPage: number
  pageNum: number
  pageSize: number
  pages: number
  prePage: number
  total: number
}

export interface CateEntity {
  children?: CateEntity[]
  parentCateId: number
  title: string
  value: number
}

export type Option<K extends string, T extends string | number = string> = {
  [key in K]: T
}

export type Options<T> = ({
  children?: Options<T>
} & T)[]
