<script setup lang="ts">
import { reactive, watch } from 'vue'

export interface Address {
  province?: string
  city?: string
  area?: string
  street?: string
  detailAddress?: string
}

interface Props {
  modelValue: Address | undefined
  // TODO: 地址枚举数据
  // options: any
  // 控制输入框显示
  notProvince?: boolean
  notCity?: boolean
  notArea?: boolean
  notStreet?: boolean
  notDetail?: boolean
}
const props = defineProps<Props>()

interface Emits {
  (event: 'update:modelValue', value: Address): void
}
const emits = defineEmits<Emits>()

const address = reactive(props.modelValue || {})
watch(address, (value) => emits('update:modelValue', value))
</script>
<template>
  <a-input-group compact>
    <a-input v-if="!notProvince" class="select" v-model:value="address.province" placeholder="省" />
    <a-input v-if="!notCity" class="select" v-model:value="address.city" placeholder="市" />
    <a-input v-if="!notArea" class="select" v-model:value="address.area" placeholder="区" />
    <a-input v-if="!notStreet" class="select" v-model:value="address.street" placeholder="街道" />
    <a-input v-if="!notDetail" class="input" v-model:value="address.detailAddress" placeholder="详细地址" />
  </a-input-group>
</template>

<style scoped lang="less">
.select {
  width: 120px;
  margin-right: 10px;
}
.input {
  width: 250px;
}
</style>
