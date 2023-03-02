<script lang="ts">
export default {
  name: '404',
}
</script>
<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { SendOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <div class="not_found">
    <Icon type="cm-yepian" class="no_icon"></Icon>
    <div class="no_text">
      <div>
        啊嗷~~，找不到页面了
        <Icon type="cm-404" class=""></Icon>
      </div>
      <a-button class="back_home" type="link" href="/"> <send-outlined />点我返回首页 </a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.not_found {
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-70deg, #9595f3, pink);

  .no_icon {
    font-size: 420px;
    margin-right: 100px;
  }

  .no_text {
    font-size: 40px;
  }

  .back_home {
    font-size: 36px;
    margin-top: 50px;
  }
}
</style>
