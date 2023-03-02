<script setup lang="ts">
import PreviewImage from './PreviewImage.vue'
import { IImage } from '@/enum'
interface Props {
  images?: IImage[]
  title?: string
  sku?: string
  skuPrefix?: string
  spu?: string
  spuPrefix?: string
  extra?: string
}
defineProps<Props>()
</script>

<template>
  <a-space style="width: 90%">
    <PreviewImage v-if="images && images.length" :images="images" />
    <a-space direction="vertical" :size="2">
      <slot name="content" />
      <template v-if="!$slots.content">
        <a-tooltip v-if="title">
          <template #title>
            {{ title }}
          </template>
          <a-typography-text v-if="title" class="two-line" :content="`名称：${title}`" />
        </a-tooltip>
        <a-typography-text v-if="sku" class="text" :content="`${skuPrefix ? skuPrefix : 'SKU'}：${sku}`" />
        <a-typography-text v-if="spu" class="text" :content="`${spuPrefix ? spuPrefix : 'SPU'}：${spu}`" />
        <a-typography-text v-if="extra" class="text" :content="extra" />
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
