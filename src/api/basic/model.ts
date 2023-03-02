import { Option, StatusEnum } from '@/enum'

export interface GetEnumReq {
  enums: string[]
}

export interface GetEnumRsp {
  area: any[]
}

export interface UserInfo {
  avatarUrl: string
  email: string
  id: number
  name: string
  phoneId: string
  supplierId: number
}
