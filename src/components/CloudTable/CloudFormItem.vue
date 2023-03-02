<script lang="ts">
export default {
  name: 'CloudFormItem',
}
</script>
<script setup lang="ts">
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { FormConfig, FormItemMap } from './model'
import dayjs from 'dayjs'

interface Props {
  // 单个搜索条件配置
  config: FormConfig
  // 数据
  formState: Record<string, any>
}

interface Emit {
  (event: 'change', key: string, value: any): void
}
defineProps<Props>()
defineEmits<Emit>()

// 每个搜索条件默认配置
const defaultItemProps: Record<string, any> = {
  // 时间选择器默认配置
  time: {
    ranges: {
      当天: [dayjs().startOf('d'), dayjs().endOf('d')],
      本星期: [dayjs().startOf('w'), dayjs().endOf('w')],
      本月: [dayjs().startOf('M'), dayjs().endOf('M')],
    },
    valueFormat: 'YYYY-MM-DD HH:mm:ss',
    showTime: true,
  },
}
</script>

<template>
  <a-form-item :key="config.key" :colon="false" class="search_item">
    <!-- 小提示 -->
    <template #label>
      <template v-if="config.toolTips?.length">
        {{ config.label }}&nbsp;
        <a-tooltip color="white">
          <template #title>
            <a-typography-paragraph v-for="tip in config.toolTips" :key="tip">
              {{ tip }}
            </a-typography-paragraph>
          </template>
          <question-circle-outlined />
        </a-tooltip>
      </template>
      <template v-else>
        {{ config.label }}
      </template>
    </template>
    <div>
      <!-- 搜索额外配置 -->
      <template v-if="config.extra">
        <div :style="{ display: 'flex', alignItems: 'center' }">
          <template v-for="{ type, key, itemProps, divider } in config.extra" :key="key">
            <component
              :is="FormItemMap[type].component"
              :value="formState[key]"
              v-bind="{
                ...(defaultItemProps[type] || {}),
                ...(itemProps || {}),
              }"
              @change="(e: any) => {
                $emit('change', key, FormItemMap[type].getValue(e))
              }"
              allow-clear
            />
            <template v-if="divider">&nbsp;&nbsp;{{ divider }}&nbsp;&nbsp;</template>
          </template>
        </div>
      </template>
      <!-- 选择器配置 -->
      <template v-else-if="config.type === 'select' && config.specialOptions">
        <a-select
          :options="config.specialOptions(formState)"
          :value="formState[config.key]"
          @change="(e: any) => {
            if (config.clearFieldOnChange) {
              $emit('change', config.clearFieldOnChange, undefined)
            }
            $emit('change', config.key, FormItemMap[config.type].getValue(e))
          }"
          allow-clear
        />
      </template>
      <template v-else>
        <component
          :key="config.key"
          :is="FormItemMap[config.type].component"
          :value="formState[config.key]"
          v-bind="{
            ...(defaultItemProps[config.type] || {}),
            ...(config.itemProps || {}),
          }"
          @change="
            (e: any) => {
              if (config.clearFieldOnChange) {
                $emit('change', config.clearFieldOnChange, null);
              }
              $emit('change', config.key, FormItemMap[config.type].getValue(e));
            }
          "
          v-on="config.itemEmits || {}"
          allow-clear
        />
      </template>
    </div>
  </a-form-item>
</template>

<style lang="less" scoped>
.search_item {
  display: flex;
  flex-direction: column;
  margin-bottom: 0 !important;
}

.search_item:deep(.ant-form-item-label) {
  align-self: flex-start;
}
</style>
