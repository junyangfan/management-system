<script lang="ts">
export default {
  name: 'PreviewImage',
}
</script>
<script setup lang="ts">
import { computed, CSSProperties, onUnmounted, ref, watch } from 'vue'
// https://github.com/fengyuanchen/viewerjs
import { IImage } from '@/enum'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

interface Props {
  images: IImage[]
  /**
   * 控制图片样式
   */
  iStyle?: CSSProperties
}

const props = defineProps<Props>()

// 返回主图index
const coverIdx = computed(() => {
  const idx = (props.images || []).findIndex((i) => i.cover)
  return idx < 0 ? 0 : idx
})

const divRef = ref(null)

const viewer = computed(() => {
  if (!divRef.value) return null
  const options = {
    inline: false,
    button: true,
    navbar: true,
    title: false,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    initialViewIndex: coverIdx.value,
  }
  return new Viewer(divRef.value, options)
})

watch(viewer, (_, oldVal) => oldVal?.destroy())

onUnmounted(() => {
  viewer.value?.destroy()
})

const onPreview = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
  viewer.value?.update()
  viewer.value?.show()
}
</script>

<template>
  <template v-if="images && (images || []).length > 0">
    <a-image
      :preview="{ visible: false }"
      :style="{ objectFit: 'contain', width: '80px', height: '80px', ...iStyle }"
      :src="images[coverIdx]?.url"
      @click="onPreview"
    />
    <div ref="divRef" class="viewer" :style="{ display: 'none' }">
      <img v-for="(o, i) in images" :key="i" :src="o.url" />
    </div>
  </template>
</template>

<style lang="less" scoped></style>
