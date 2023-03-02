<script lang="ts">
export default {
  name: 'CMTable',
}
</script>
<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { TableProps } from 'ant-design-vue/lib/table'
import { CalendarOutlined, ArrowUpOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import KindTip from '@/components/KindTip.vue'
import { TipOptions, IColumnType, PaginationEnum, RequestReq, RequestRsp, Key } from '@/enum'
import { checkType } from '@/utils'

interface Props {
  // 表格列
  columns: IColumnType[]
  // 表格选中每一行Key
  rowKey: TableProps['rowKey']
  // 表格行是否隐藏
  isHideRowSelection?: boolean
  // 是否隐藏分页
  isHidePagination?: boolean
  // 是否可展开
  isHaveExpand?: boolean
  // 初始值
  initValue?: Record<string, any>
  // 发起请求
  request?: (req: RequestReq) => Promise<RequestRsp>
  // 温馨提示
  tipOptions?: TipOptions
  // 自定义传递的数据
  dataSource?: any[]
  // 定义表格高度
  scrollY?: number
  // 列表选择回调
  rowSelectChange?: (selectedRowKeys: Key[], selectedRows: any[]) => void
  // 分页、筛选、排序变化时回调
  onTableChange?: (params: Record<string, any>, pagination: PaginationEnum) => void
  // 是否默认展开所有行
  isDefaultExpandAllRows?: boolean
  // 嵌套表格是否可以全选
  isSelectRowStrictly?: boolean
  // 树形结构列名
  treeChildrenColumnName?: string
  //  默认展开的行的Key，不传的话默认展开全部
  expandedRowKeys?: string[]
}

interface State {
  loading: boolean
  dataSource: any[]
  selectedRows: any[]
  selectedRowKeys: Key[]
  pagination: PaginationEnum
  params: Record<string, any>
  checkColumn: CheckColumn[]
  expandedRowKeys: Key[]
}

interface CheckColumn {
  key: string
  title: string
  checked: boolean
}

const props = defineProps<Props>()

const state = reactive<State>({
  loading: false,
  dataSource: [],
  selectedRows: [],
  selectedRowKeys: [],
  params: props.initValue || {},
  pagination: {
    current: 1,
    size: 20,
    total: 0,
  },
  checkColumn: [],
  expandedRowKeys: [],
})

// 刷新
const refresh = () => {
  onSearch({
    params: state.params,
    pagination: state.pagination,
  })
}

// 勾选
const onRowSelectChange = (selectedRowKeys: Key[], selectedRows: any[]) => {
  state.selectedRows = selectedRows
  state.selectedRowKeys = selectedRowKeys
  if (props.rowSelectChange && checkType(props.rowSelectChange) === 'function') {
    props.rowSelectChange(selectedRowKeys, selectedRows)
  }
}

// 分页、筛选、排序变化时触发
const onTableChange: TableProps['onChange'] = (pagination): void => {
  const { params } = state
  if (props.onTableChange && checkType(props.onTableChange) === 'function') {
    props.onTableChange(params, {
      current: pagination.current || 1,
      size: pagination.pageSize || 20,
    })
    return
  }
  onSearch({
    params,
    pagination: {
      current: pagination.current || 1,
      size: pagination.pageSize || 20,
    },
  })
}

const onSearch = (req: RequestReq) => {
  // 防止重复请求
  if (!state.loading) {
    // 返回顶部
    backTopClick()
    state.loading = true
    state.selectedRowKeys = []
    state.selectedRows = []
    state.params = req.params
    // 请求返回数据
    if (props.request) {
      props.request(req).then((rsp) => {
        state.dataSource = rsp.data
        handleExpandRowKey(rsp.data)
        state.loading = false
        state.pagination = {
          current: req.pagination.current,
          size: req.pagination.size,
          total: rsp.total,
        }
      })
    }
  }
}

// 处理展开的行
const handleExpandRowKey = (dataList: any[]) => {
  if (props.isDefaultExpandAllRows) {
    if (props.expandedRowKeys) {
      state.expandedRowKeys = props.expandedRowKeys
      return
    }
    state.expandedRowKeys = (dataList || []).map((i) => {
      return String(i[props.rowKey as string])
    })
  }
}

const expandedRowsChange = (expandedRows: Key[]) => {
  state.expandedRowKeys = expandedRows
}

// 查找指定的位置
const findColumnKey = (key: string): CheckColumn => state.checkColumn.find((i) => i.key === key) as CheckColumn

// 过滤展示的列
const showColumn = computed<IColumnType[]>(() => {
  return props.columns.filter((i) => {
    return !findColumnKey(i.key as string) || findColumnKey(i.key as string)?.checked
  })
})

const showColumnChange = (e: any, key: string) => {
  // 如果有notClose为true的，说明绝对不会一列不剩
  if (props.columns.some((i) => i.notClose)) {
    return
  }
  if (!props.columns.some((i) => findColumnKey(i.key as string)?.checked)) {
    message.warning('请至少保留一列！')
    findColumnKey(key)['checked'] = !e.target.checked
  }
}

onMounted(() => {
  if ((props.dataSource || []).length) {
    handleExpandRowKey(props.dataSource || [])
  }
  // 处理要展示的字段
  state.checkColumn = (props.columns || [])
    .filter((i) => !i.notClose)
    .map((c) => {
      return {
        title: c.title,
        key: c.key,
        checked: true,
      }
    }) as CheckColumn[]
})

// 查找滚动节点
const queryScrollBar = () => document.querySelector('.layout_main_content') as HTMLElement
// 返回顶部点击
const backTopClick = () => (document.querySelector('.cm_ant_back_top') as HTMLElement).click()
// 返回顶部Target
const backTopTarget = () => document.querySelector('.layout_main_content') as Document | HTMLElement | Window
</script>

<template>
  <!-- 温馨提示 -->
  <KindTip v-if="tipOptions" :tipOptions="tipOptions"></KindTip>
  <!-- 支持自定义其他DOM -->
  <slot name="Extra"></slot>
  <!-- 搜索 -->
  <slot name="SearchForm" :initValue="initValue" :onSearch="onSearch" />
  <!-- 工具栏 -->
  <div class="cm_tool_bar">
    <div class="tool_bar_left">
      <slot
        name="ToolBar"
        :initValue="initValue"
        :selectedRows="state.selectedRows"
        :selectedRowKeys="state.selectedRowKeys"
        :refresh="refresh"
        :dataSource="props.dataSource || state.dataSource"
      />
    </div>
    <div class="tool_bar_right">
      <a-popover trigger="click" :arrowPointAtCenter="true" placement="topRight" :overlayStyle="{ maxWidth: '500px' }">
        <template #content>
          <a-checkbox
            v-for="{ key, title } in state.checkColumn"
            :key="key"
            :style="{ marginLeft: 0 }"
            v-model:checked="findColumnKey(key)['checked']"
            @change="(e) => showColumnChange(e, key)"
          >
            {{ title }}
          </a-checkbox>
        </template>
        <a-button type="primary">
          <template #icon><calendar-outlined /></template>
          管理展示列
        </a-button>
      </a-popover>
    </div>
  </div>
  <!-- 表格 -->
  <a-table
    :sticky="{
      offsetScroll: !isHidePagination && ((props.dataSource || []).length || (state.dataSource || []).length) ? 64 : 0,
      getContainer: () => queryScrollBar(),
    }"
    :expandedRowKeys="state.expandedRowKeys"
    @expandedRowsChange="expandedRowsChange"
    :defaultExpandAllRows="isDefaultExpandAllRows ? true : false"
    :childrenColumnName="treeChildrenColumnName ? treeChildrenColumnName : 'children'"
    :columns="showColumn"
    :dataSource="props.dataSource || state.dataSource || []"
    :loading="state.loading"
    bordered
    :rowKey="props.rowKey"
    :scroll="{ x: 'max-content', y: scrollY }"
    @change="onTableChange"
    :rowSelection="
      isHideRowSelection
        ? undefined
        : {
            selectedRowKeys: state.selectedRowKeys,
            onChange: onRowSelectChange,
            fixed: true,
            checkStrictly: isSelectRowStrictly ? true : false,
          }
    "
    :pagination="!isHidePagination ? {
      current: state.pagination.current,
      total: state.pagination.total,
      pageSize: state.pagination.size,
      showTotal: (total: number) => `共${total}条`,
    } : false"
  >
    <template #bodyCell="{ column, record }">
      <slot name="bodyCell" :column="column" :record="record" :refresh="refresh" />
    </template>
    <template #headerCell="{ column, title }">
      <slot name="headerCell" :column="column" :title="title" />
    </template>
    <template v-if="isHaveExpand" #expandedRowRender="{ record, expanded }">
      <slot name="expandedRowRender" :record="record" :expanded="expanded" :refresh="refresh" />
    </template>
  </a-table>
  <!-- 回到顶部 -->
  <a-back-top :target="backTopTarget">
    <div class="cm_ant_back_top"><arrow-up-outlined /></div>
  </a-back-top>
</template>

<style lang="less" scoped>
.cm_ant_back_top {
  z-index: 101;
  width: 100%;
  height: 100%;
  background-color: #1890ff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 50%;
  color: #ffffff;
}
:deep(.ant-table-sticky-holder) {
  top: 48px !important;
}
:deep(.ant-table-pagination) {
  position: sticky;
  bottom: 0;
}
:deep(.ant-table-pagination.ant-pagination) {
  margin: 0 !important;
  padding: 16px 0;
  z-index: 100;
  background-color: #fff;
}
.cm_tool_bar {
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 8px 0;
  .tool_bar_left {
    flex: 1;
  }
}
</style>
