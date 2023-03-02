<script setup lang="ts">
import { IImage } from '@/enum'
import PreviewImage from './PreviewImage.vue'

interface Props {
  images: IImage[]
  itemSerialNumber?: string
  rejectReason?: string
  returnReason?: string
  isHoverScale?: boolean
}
defineProps<Props>()
</script>

<template>
  <a-space style="width: 100%">
    <PreviewImage :images="images" :is-hover-scale="isHoverScale" />
    <a-space direction="vertical" align="start">
      <slot name="content" />
      <template v-if="!$slots.content">
        <a-tooltip>
          <template #title>
            {{ itemSerialNumber }}
          </template>
          <a-typography-text class="two-line" :content="`实物序列号：${itemSerialNumber}`" />
        </a-tooltip>
        <a-typography-text class="text" :content="`退货原因：${returnReason}`" />
        <a-typography-text class="text" :content="`不合格原因：${rejectReason}`" />
      </template>
    </a-space>
  </a-space>
</template>

<style scoped lang="less">
.two-line {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 12px;
  margin: 0;
  text-align: left;
}
.text {
  font-size: 12px;
  margin: 0;
}
</style>
