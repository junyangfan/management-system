<script lang="ts">
export default {
  name: 'Login',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import AgreementModal from './Agreement.vue'
import { message } from 'ant-design-vue'
import { userSingIn } from '@/api/user/api'
import { UserInfo } from '@/api/basic/model'
import { appStore } from '@/store'
import { useRouter } from 'vue-router'
import ForgetPassWord from './ForgetPassWord.vue'
import Logo from '@/assets/logo.jpg'
import LoginBg from '@/assets/login-bg.jpg'

const store = appStore()
const router = useRouter()

interface State {
  username: string
  password: string
  agreement: boolean
  loading: boolean
}
const state = reactive<State>({
  username: '',
  password: '',
  agreement: false,
  loading: false,
})

const onFinish = async () => {
  try {
    if (!state.agreement) {
      message.warning('请阅读并同意协议~')
      return
    }
    // const rsp = await userSingIn({
    //   name: state.username,
    //   password: state.password,
    // })
    // if (rsp && rsp.token) {
    //   const { token, ...args } = rsp
    //   store.updateToken(rsp.token)
    //   store.updateUserInfo(args as UserInfo)
    //   router.push('/')
    // }
    if (state.username !== 'admin' || state.password !== '123456') {
      message.error(`用户名：admin 密码：123456`)
      return
    }
    state.loading = true
    const { token, ...args } = { token: '123456' }
    store.updateToken(token)
    store.updateUserInfo(args as UserInfo)
    router.push('/')
    state.loading = false
  } catch (error) {
    console.log(error)
  }
}

const onFinishFailed = () => {
  console.error('登陆失败')
}

// 同意协议
const onAgree = (isAgree: boolean) => (state.agreement = isAgree)
</script>

<template>
  <div class="login_container">
    <img :src="LoginBg" alt="bg" class="bg" />
    <div class="login_info">
      <div class="info_detail">
        <img :src="Logo" alt="logo" />
        <span class="detail_title">商家平台</span>
        <a-form
          :model="state"
          name="basic"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item label="账号" name="username" :rules="[{ required: true, message: '账号不能为空!' }]">
            <a-input v-model:value="state.username" />
          </a-form-item>

          <a-form-item label="密码" name="password" :rules="[{ required: true, message: '密码不能为空!' }]">
            <a-input-password v-model:value="state.password" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
            <div>
              <ForgetPassWord></ForgetPassWord>
            </div>
            <a-button class="login" size="large" type="primary" html-type="submit" :loading="state.loading">
              登录
            </a-button>
          </a-form-item>
          <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
            <div class="login_agreement">
              <a-checkbox v-model:checked="state.agreement"></a-checkbox>
              已阅读并同意<AgreementModal @onAgree="onAgree"></AgreementModal>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .bg {
    // width: 100%;
    flex-basis: 60%;
    width: 200px;
    height: 100%;
    object-fit: cover;
    outline: none !important;

    &:hover {
      outline: none !important;
    }
  }

  .login_info {
    width: 650px;
    height: 100%;
    background-color: #fff;
    padding: 0 200px 0 60px;
    display: flex;
    align-items: center;

    .info_detail {
      width: 100%;

      .detail_title {
        font-size: 26px;
      }

      img {
        height: 60px;
        margin-bottom: 20px;
      }

      .sign_item {
        display: flex;
        justify-content: space-between;
      }

      .login {
        width: 100%;
        margin-top: 10px;
      }
    }
  }

  .login_agreement {
    text-align: center;
  }
}
</style>
