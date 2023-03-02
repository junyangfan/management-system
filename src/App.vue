<script setup lang="ts">
import zhCN from 'ant-design-vue/lib/locale/zh_CN'
import Icon from '@/components/Icon.vue'
import QRCode from '@/assets/qrcode.svg'
</script>

<template>
  <div id="app">
    <a-config-provider :locale="zhCN">
      <router-view />
    </a-config-provider>
    <div class="service">
      <div class="qr_code">
        <Icon type="cm-kefu" class="artificial"></Icon>
        <div class="code_info">
          <div style="display: flex; flex-direction: column; align-items: center">
            <img :src="QRCode" class="img" />
            <!-- <div>扫码联系客服</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  position: relative;

  .service {
    z-index: 999;
    position: absolute;
    bottom: 140px;
    right: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 1px solid #ef7a2b;
    cursor: pointer;

    .qr_code {
      position: relative;
      width: 100%;
      height: 100%;

      .artificial {
        position: absolute;
        top: 3px;
        left: 3px;
        font-size: 32px;
      }

      .code_info {
        display: none;
        position: absolute;
        left: -105px;
        bottom: 0;
        width: 100px;
        height: 100px;

        .img {
          width: 100%;
          height: 100%;
        }
      }
    }

    &:hover {
      .qr_code {
        .code_info {
          display: block;
        }
      }
    }
  }
}
</style>
