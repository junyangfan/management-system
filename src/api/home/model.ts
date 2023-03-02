import { IImage } from '@/enum'

export interface HomeReq {
  id?: string
  name?: string
  current: number
  size: number
}

export interface HomeRsp {
  id: string
  name: string
}
