<!-- 全局Loading -->
<script lang="ts">
export default {
  name: 'Loading',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'

interface Props {
  loadingText?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="loading_container">
    <div class="loading loading_icon">
      <slot name="icon"></slot>
      <template v-if="!$slots.icon"><LoadingOutlined /></template>
    </div>
    <div class="loading loading_text">{{ loadingText ?? '加载中...' }}</div>
  </div>
</template>

<style lang="less" scoped>
.loading_container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);

  .loading {
    font-size: 36px;
    margin-top: 20px;
  }

  .loading_icon {
    font-size: 50px;
    // color: #54adff;
  }
}
</style>
