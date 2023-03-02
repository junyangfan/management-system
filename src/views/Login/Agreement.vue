<script lang="ts">
export default {
  name: 'Agreement',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits(['onAgree'])

interface State {
  visible: boolean
}

const state = reactive<State>({
  visible: false,
})

const initModal = () => {
  state.visible = true
}

const agree = () => {
  state.visible = false
  emit('onAgree', true)
}
</script>

<template>
  <a @click="initModal">隐私协议</a>
  <a-modal
    width="800px"
    :keyboard="false"
    :maskClosable="false"
    destroyOnClose
    v-model:visible="state.visible"
    title="隐私协议"
  >
    <template #footer>
      <a-button type="primary" @click="agree">已阅读并同意协议</a-button>
    </template>
    <div class="agreement_content">
      balibalibali.......................... balibalibali..........................
      balibalibali.......................... balibalibali..........................
      balibalibali.......................... balibalibali..........................
      balibalibali.......................... balibalibali..........................
      balibalibali.......................... balibalibali..........................
      balibalibali.......................... balibalibali..........................
      balibalibali.......................... balibalibali..........................
      balibalibali.......................... balibalibali..........................
      balibalibali.......................... balibalibali..........................
      balibalibali.......................... balibalibali..........................
      balibalibali.......................... balibalibali..........................
      balibalibali.......................... balibalibali..........................
    </div>
  </a-modal>
</template>

<style lang="less" scoped>
.agreement_content {
  height: 400px;
  overflow: auto;
}
</style>
