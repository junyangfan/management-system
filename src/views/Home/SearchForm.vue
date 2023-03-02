<script lang="ts">
export default {
  name: 'HomeListSearchForm',
}
</script>
<script setup lang="ts">
import CloudSearchForm from '@/components/CloudTable/CloudSearchForm.vue'
import { RequestReq, FormConfig } from '@/enum'
import { appStore } from '@/store'
import { splitStr } from '@/utils'
const store = appStore()
interface Props {
  onSearch: (req: RequestReq) => void
}
defineProps<Props>()
const emptyState = {
  id: undefined,
  name: undefined,
  status: undefined,
  time: undefined,
}

const normalForm: FormConfig[] = [
  {
    label: 'ID',
    type: 'textarea',
    key: 'id',
  },
  {
    label: 'Name',
    type: 'input',
    key: 'name',
  },
  {
    label: '状态',
    type: 'select',
    key: 'status',
    itemProps: {
      options: [
        {
          label: '运行中',
          value: 'running',
        },
        {
          label: '停止',
          value: 'stop',
        },
      ],
      showSearch: true,
    },
  },
  {
    label: '时间',
    type: 'time',
    key: 'time',
  },
]

const getParams = (formState: Record<string, any>) => {
  return {
    id: splitStr(formState.id),
    name: formState.name,
    status: formState.status,
    startTime: formState.time && formState.time[0],
    endTime: formState.time && formState.time[1],
  }
}
</script>

<template>
  <CloudSearchForm
    :emptyState="emptyState"
    :onSearch="onSearch"
    :normalForm="normalForm"
    :getParams="getParams"
  ></CloudSearchForm>
</template>

<style lang="less" scoped></style>
