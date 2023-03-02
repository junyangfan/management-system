<script lang="ts">
export default {
  name: 'Icon',
}
</script>
<script setup lang="ts">
import { CSSProperties } from 'vue'
import iconfont from '../../iconfont.json'
import compileIcon from '@/utils/compileIcon'
import { createFromIconfontCN } from '@ant-design/icons-vue'

const {
  icons,
  project: { prefix },
} = iconfont.data

const IconFont = createFromIconfontCN({
  scriptUrl: compileIcon(icons, prefix) as string | string[] | undefined,
})

interface IIcon {
  /**
   * * icon 类型
   * @default -
   */
  type: string
  /**
   * * style 样式
   * @default -
   */
  style?: CSSProperties
  /**
   * * className
   * @default -
   */
  className?: string
}

const props = defineProps<IIcon>()
</script>

<template>
  <IconFont v-bind="{ ...props }"></IconFont>
</template>

<style lang="less" scoped></style>
