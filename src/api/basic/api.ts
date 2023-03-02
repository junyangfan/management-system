import request from '@/api/request'
import { apiPrefix } from '@/config'
import { GetEnumReq, GetEnumRsp } from './model'

const prefix = `${apiPrefix()}/common`

export const GetEnum = (params: GetEnumReq): Promise<GetEnumRsp> => request.get(`${prefix}/enum`, { params })
