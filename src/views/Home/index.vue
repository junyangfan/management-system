<script lang="ts">
export default {
  name: 'HomeList',
}
</script>
<script setup lang="ts">
import CloudTable from '@/components/CloudTable/index.vue'
import { IColumnType, RequestReq, RequestRsp } from '@/enum'
import { HomeList } from '@/api/home/api'
import { HomeRsp } from '@/api/home/model'
import SearchForm from './SearchForm.vue'
import ToolBar from './ToolBar.vue'

const columns: IColumnType[] = [
  {
    key: 'id',
    title: 'ID',
    width: 400,
    dataIndex: 'id',
    fixed: 'left',
  },
  {
    key: 'name',
    title: '名称',
    width: 400,
    dataIndex: 'name',
    notClose: true,
  },
  {
    key: 'time',
    title: '时间',
    width: 180,
    align: 'center',
    dataIndex: 'time',
  },
  {
    key: 'action',
    title: '操作',
    width: 120,
    align: 'center',
    notClose: true,
    fixed: 'right',
  },
]

const request = async ({ params, pagination }: RequestReq): Promise<RequestRsp<HomeRsp>> => {
  try {
    const data = await HomeList({ ...params, ...pagination })
    return { data: data.list, success: false, total: data.total }
  } catch (err) {
    return { data: [], success: false, total: 0 }
  }
}
</script>

<template>
  <CloudTable rowKey="id" :columns="columns" :request="request" :isHideRowSelection="true">
    <template #SearchForm="{ onSearch }">
      <SearchForm :onSearch="onSearch" />
    </template>
    <template #ToolBar="{ selectedRowKeys, refresh, dataSource }">
      <ToolBar :dataSource="dataSource" :selectedRowKeys="selectedRowKeys" :refresh="refresh" />
    </template>
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span :style="{ color: '#0093ff' }">NAME</span>
      </template>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button type="primary" size="small">操作 {{ record.action || '' }}</a-button>
      </template>
    </template>
  </CloudTable>
</template>

<style lang="less" scoped></style>
