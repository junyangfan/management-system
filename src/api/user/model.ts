import { IImage } from '@/enum'

export interface ModifyPassWordReq {
  oldPassword: string
  newPassword: string
}

export interface ForgetPassWordReq {
  userName: string
  email: string
}

export interface UserSingInReq {
  name: string
  password: string
}

export interface UserSingInRsp {
  token: string
}

export interface UserModifyReq {
  bdManager: string
  cateEntityList: number[]
  company: string
  id: string
  idCardImg: string[]
  legalPerson: string
  legalPersonIdCard: string
  license: string[]
  local: string
  returnAddress: Address
  returnContacts: string
  returnPhone: string
  shipAddress: Address
  shipContacts: string
  shipPhone: string
  uscc: string
  userName: string
  supplierName: string
  email: string
}

export interface User {
  bdManager: string
  cateEntityList: number[]
  company: string
  createTime: string
  id: string
  idCardImg: IImage[]
  legalPerson: string
  legalPersonIdCard: string
  license: IImage[]
  local: string
  returnAddress: Address
  returnContacts: string
  returnPhone: string
  shipAddress: Address
  shipContacts: string
  shipPhone: string
  uscc: string
  userName: string
  supplierName: string
  email: string
}

export interface Address {
  area?: string
  city?: string
  detailAddress?: string
  province?: string
  street?: string
}
