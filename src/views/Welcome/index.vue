<script lang="ts">
export default {
  name: 'Welcome',
}
</script>
<script setup lang="ts">
import Logo from '@/assets/logo.jpg'
import Icon from '@/components/Icon.vue'
</script>

<template>
  <div class="welcome">
    <div>
      <img :src="Logo" alt="logo" />
      <div>欢迎使用XXX管理平台</div>
      <div>
        使用前请详细阅读 <Icon type="cm-shoushoushi" class="icon_gesture"></Icon>
        <a target="_blank" href="https://fanjunyang.zone">【操作指南】</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.welcome {
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;

  .icon_gesture {
    transform: rotate(90deg);
  }

  div {
    font-size: 26px;
    text-align: center;
  }
}
</style>
