<script lang="ts">
export default {
  name: 'ModifyPassWord',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { LockOutlined } from '@ant-design/icons-vue'
import { ModifyPassWord } from '@/api/user/api'
import { useRouter } from 'vue-router'
import { resetStore } from '@/store'

interface State {
  visible: boolean
  newPassword: string
  oldPassword: string
  confirmLoading: boolean
}

const router = useRouter()
const state = reactive<State>({
  visible: false,
  newPassword: '',
  oldPassword: '',
  confirmLoading: false,
})

const initModal = () => {
  state.visible = true
}

// 确认
const handleOk = async () => {
  if (!state.oldPassword || !state.newPassword) {
    message.warning('请填写旧密码和新密码!')
    return
  }
  state.confirmLoading = true
  try {
    await ModifyPassWord({
      oldPassword: state.oldPassword,
      newPassword: state.newPassword,
    })
    state.visible = false
    message.success('修改密码成功，请重新登录~')
    resetStore()
    router.push('/login')
  } catch (error) {
    console.log(error)
  }
  state.confirmLoading = false
}
</script>

<template>
  <a-menu-item @click="initModal">
    <a-space><lock-outlined />修改密码</a-space>
  </a-menu-item>
  <a-modal
    width="600px"
    :keyboard="false"
    :maskClosable="false"
    :closable="false"
    destroyOnClose
    @ok="handleOk"
    :confirmLoading="state.confirmLoading"
    v-model:visible="state.visible"
    title="修改密码"
  >
    <div class="row">
      <span><span class="star">*</span> 旧密码：</span>
      <a-input style="width: 300px" v-model:value="state.oldPassword" placeholder="请输入旧密码" />
    </div>
    <div class="row">
      <span><span class="star">*</span> 新密码：</span>
      <a-input style="width: 300px" v-model:value="state.newPassword" placeholder="请输入新密码" />
    </div>
  </a-modal>
</template>

<style lang="less" scoped>
.row {
  display: flex;
  align-items: center;
  margin-top: 10px;

  span {
    width: 80px;
    text-align: right;

    .star {
      color: red;
    }
  }
}
</style>
