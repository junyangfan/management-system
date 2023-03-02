import request from '@/api/request'
import { apiPrefix } from '@/config'
import { TableRsp } from '@/enum'
import { HomeReq, HomeRsp } from './model'

const prefix = `${apiPrefix()}/home`

export const HomeList = (params: HomeReq): Promise<TableRsp<HomeRsp>> => request.get(`${prefix}/list`, { params })
