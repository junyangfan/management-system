import { Input, InputNumber, RangePicker, Select, Textarea, TreeSelect } from 'ant-design-vue'
import { Component } from 'vue'
import { StatusEnum } from '@/enum'

export type ValueEnum = 'input' | 'textarea' | 'number' | 'select' | 'time' | 'treeSelect'

export interface ConfigExtra {
  key: string
  type: ValueEnum
  itemProps?: Record<string, any>
  divider?: string
}

export interface FormConfig {
  key: string
  label?: string
  type: ValueEnum
  itemProps?: Record<string, any>
  specialOptions?: (formData: Record<string, any>) => StatusEnum[]
  extra?: ConfigExtra[]
  // 清空其他字段值
  clearFieldOnChange?: string[] | string
  toolTips?: string[]
  itemEmits?: Record<string, any>
}

export const FormItemMap: Record<
  ValueEnum,
  {
    component: Component
    getValue: (e: any) => any
  }
> = {
  input: {
    component: Input,
    getValue: (e) => {
      const value = e.target.value.trim()
      return value ? value : undefined
    },
  },
  textarea: {
    component: Textarea,
    getValue: (e) => {
      const value = e.target.value.trim()
      return value ? value : undefined
    },
  },
  number: {
    component: InputNumber,
    getValue: (e) => e,
  },
  select: {
    component: Select,
    getValue: (e) => e,
  },
  time: {
    component: RangePicker,
    getValue: (e) => e,
  },
  treeSelect: {
    component: TreeSelect,
    getValue: (e) => e,
  },
}
