import request from '@/api/request'
import { apiPrefix } from '@/config'
import { User, UserModifyReq, UserSingInReq, UserSingInRsp, ForgetPassWordReq, ModifyPassWordReq } from './model'

const prefix = `${apiPrefix()}/user`
// 是否是开发环境
const isDev = import.meta.env.VITE_APP_ENV === 'DEV'

// 用户登录
export const userSingIn = (req: UserSingInReq): Promise<UserSingInRsp> =>
  request.post(`${isDev ? '/api' : ''}/signIn`, req)

// 退出登录
export const userSingOut = (): Promise<boolean> => request.post(`${prefix}/signOut`)

// 修改用户信息
export const UserModifyInfo = (data: UserModifyReq): Promise<boolean> => request.post(`${prefix}/modifyInfo`, data)

// 修改用户密码
export const UserModifyPassword = (data: { newPassword: string; oldPassword: string }): Promise<boolean> =>
  request.post(`${prefix}/modifyPassword`, data)

// 用户详情
export const UserDetail = (): Promise<User> => request.post(`${prefix}/detail`)

// 重置密码
export const ForgetPassWord = (req: ForgetPassWordReq): Promise<void> =>
  request.post(`${isDev ? '/api' : ''}/forgotPassword`, req)

// 修改密码
export const ModifyPassWord = (req: ModifyPassWordReq): Promise<void> => request.post(`${prefix}/modifyPassword`, req)
