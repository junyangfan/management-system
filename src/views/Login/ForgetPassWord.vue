<script lang="ts">
export default {
  name: 'ForgetPassWord',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'
import { ForgetPassWord } from '@/api/user/api'
import { message } from 'ant-design-vue'
interface State {
  visible: boolean
  email: string
  userName: string
  confirmLoading: boolean
}

const state = reactive<State>({
  visible: false,
  email: '',
  userName: '',
  confirmLoading: false,
})

const initModal = () => {
  state.visible = true
}

// 确认
const handleOk = async () => {
  if (!state.userName || !state.email) {
    message.warning('请填写账号和邮箱!')
    return
  }
  state.confirmLoading = true
  try {
    await ForgetPassWord({
      userName: state.userName,
      email: state.email,
    })
    message.success('新密码已发至您的邮箱,请注意查收~')
    state.visible = false
  } catch (error) {
    console.log(error)
  }
  state.confirmLoading = false
}
</script>

<template>
  <div class="forget"><span class="reset" @click="initModal">重置密码</span></div>
  <a-modal
    width="600px"
    :keyboard="false"
    :maskClosable="false"
    :closable="false"
    destroyOnClose
    @ok="handleOk"
    :confirmLoading="state.confirmLoading"
    v-model:visible="state.visible"
    title="重置密码"
  >
    <a-typography-text type="danger">
      注：修改密码后，新密码会发送至创建时所填写的邮箱里，请注意查收！
    </a-typography-text>
    <div class="row">
      <span><span class="star">*</span> 账号：</span>
      <a-input style="width: 300px" v-model:value="state.userName" placeholder="请输入账号" />
    </div>
    <div class="row">
      <span><span class="star">*</span> 邮箱：</span>
      <a-input style="width: 300px" v-model:value="state.email" placeholder="请输入邮箱" />
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
.forget {
  width: 100%;
  text-align: right;
  color: rgba(0, 0, 0, 0.4);

  .reset {
    cursor: pointer;

    &:hover {
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
