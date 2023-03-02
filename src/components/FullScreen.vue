<script lang="ts">
export default {
  name: 'FullScreen',
}
</script>
<script setup lang="ts">
import { api } from 'vue-fullscreen'
import { FullscreenOutlined } from '@ant-design/icons-vue'
const fullScreen = async () => {
  const status = api.isFullscreen
  if (!status) {
    await api.toggle()
  }
}
</script>

<template>
  <a-button @click="fullScreen" class="full_screen">
    <template #icon><fullscreen-outlined /></template>
  </a-button>
</template>

<style lang="less" scoped>
.full_screen {
  width: 24px;
  height: 24px;
}
</style>
