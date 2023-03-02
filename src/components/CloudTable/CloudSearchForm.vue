<script lang="ts">
export default {
  name: 'CloudSearchForm',
}
</script>
<script setup lang="ts">
import { onMounted, reactive, onActivated, ref } from 'vue'
import { FilterOutlined } from '@ant-design/icons-vue'
import { FormConfig } from './model'
import CloudFormItem from './CloudFormItem.vue'
import { useRoute } from 'vue-router'
import { RequestReq } from '@/enum'

interface Props {
  // 初始状态
  emptyState: Record<string, any>
  // 加载数据回调
  onSearch: (req: RequestReq) => void
  // 获取搜索框里的数据
  getParams: (state: Record<string, any>) => Record<string, any>
  // 正常搜索
  normalForm: FormConfig[]
  // 高级搜索
  advancedForm?: FormConfig[]
  // 初始值
  initValue?: Record<string, any>
}

const route = useRoute()
const props = defineProps<Props>()

onMounted(() => {
  if (route.query && Object.keys(route.query).length) {
    Object.assign(formState, route.query)
    onSearch()
    return
  }
  onSearch()
})

onActivated(() => {
  if (route.query && Object.keys(route.query).length) {
    Object.assign(formState, props.emptyState, route.query)
    onSearch()
  }
})

const formState = reactive({
  ...props.emptyState,
  ...(props.initValue ? props.initValue : {}),
})

// 控制高级搜索模态框展示
const advancedVisible = ref<boolean>(false)

// 点击高级搜索
const onAdvanced = () => {
  advancedVisible.value = true
}
// 隐藏高级搜索
const onAdvancedCancel = () => {
  advancedVisible.value = false
}

// 高级搜索查询
const onAdvancedSearch = () => {
  onSearch()
}

// 查询
const onSearch = () => {
  const params = props.getParams(formState)
  props.onSearch({
    params,
    pagination: {
      current: 1,
      size: 20,
    },
  })
  onAdvancedCancel()
}

// 重置
const reset = () => {
  Object.assign(formState, props.emptyState)
  onSearch()
}
</script>

<template>
  <slot name="Extra" :search="onSearch"></slot>
  <a-form :model="formState" layout="vertical">
    <!-- 正常搜索 -->
    <a-row :gutter="[16, 8]">
      <a-col :span="config.type === 'time' ? 8 : 4" v-for="config in normalForm" :key="config.key">
        <CloudFormItem
          :key="config.key"
          :config="config"
          :formState="formState"
          @change="(key, value) => (formState[key] = value)"
        />
      </a-col>
    </a-row>
    <div :style="{ textAlign: 'right' }">
      <a-space>
        <a-button v-if="advancedForm?.length" type="link" @click="onAdvanced">
          高级搜索
          <template #icon><filter-outlined /></template>
        </a-button>
        <a-button type="primary" html-type="submit" @click="onSearch"> 查询 </a-button>
        <a-button @click="reset">重置</a-button>
      </a-space>
    </div>
  </a-form>
  <!-- 高级搜索弹窗 -->
  <a-modal
    v-model:visible="advancedVisible"
    title="高级搜索"
    destroyOnClose
    :keyboard="false"
    :maskClosable="false"
    :closable="false"
    width="900px"
  >
    <template #footer>
      <a-button @click="onAdvancedCancel">取消</a-button>
      <a-button type="primary" @click="onAdvancedSearch">查询</a-button>
    </template>
    <a-row :gutter="[16, 8]">
      <a-col :span="config.type === 'time' ? 16 : 8" v-for="config in advancedForm" :key="config.key">
        <CloudFormItem
          :key="config.key"
          :config="config"
          :formState="formState"
          @change="(key, value) => (formState[key] = value)"
        />
      </a-col>
    </a-row>
  </a-modal>
</template>

<style lang="less" scoped></style>
