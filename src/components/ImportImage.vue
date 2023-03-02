<script lang="ts">
export default {
  name: 'ImportImage',
}
</script>
<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, reactive } from 'vue'
import type { UploadFile, UploadChangeParam } from 'ant-design-vue'
import { CustomRequest } from '@/utils/aliOSS'
import { getBase64, generateRandom } from '@/utils'
import { FileType } from 'ant-design-vue/lib/upload/interface'

interface Props {
  maxCount?: number
  multiple?: boolean
  images?: string[]
  /**
   * 改变图片数据回调
   * @param url[] 图片Url数组
   */
  changeImages?: (url: string[]) => void
}

interface Emits {
  (event: 'update:images', value: string[]): void
}

interface State {
  images: UploadFile<{ url: string }>[]
  previewTitle: string
  previewImage: string
  previewVisible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

onMounted(() => {
  if (props.images?.length) {
    state.images = props.images.map((url) => {
      return {
        uid: generateRandom(),
        name: url.substring(url.lastIndexOf('/') + 1),
        url,
      }
    })
  }
})

const state = reactive<State>({
  images: [],
  previewTitle: '',
  previewImage: '',
  previewVisible: false,
})

const handleCancel = () => {
  state.previewVisible = false
  state.previewTitle = ''
}
const handlePreview = async (file: UploadFile) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj as FileType)) as string
  }
  state.previewImage = (file.url || file.preview) as string
  state.previewTitle = (file.name || (file.url && file.url.substring(file.url.lastIndexOf('/') + 1))) as string
  state.previewVisible = true
}

// 更新图片数据
const updateImages = (info: UploadChangeParam<UploadFile<any>>) => {
  const imageList = (info.fileList || []).map((file) => {
    if (file.response?.url) {
      return file.response.url
    }
    return file.url
  })
  // 图片上传完毕则调用回调
  if ((info.fileList || []).every((i) => !i.status || i.status === 'done')) {
    props.changeImages?.(imageList)
    emits('update:images', imageList)
  }
}
</script>

<template>
  <div class="clearfix">
    <a-upload
      accept="image/*"
      v-model:file-list="state.images"
      :customRequest="CustomRequest"
      list-type="picture-card"
      :multiple="multiple ? true : false"
      :maxCount="maxCount ? maxCount : 1"
      @preview="handlePreview"
      @change="updateImages"
    >
      <div v-if="state.images.length < (maxCount ? maxCount : 1)">
        <plus-outlined />
        <div style="margin-top: 8px">上传图片</div>
      </div>
    </a-upload>
    <a-modal :visible="state.previewVisible" :title="state.previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="图片" style="width: 100%" :src="state.previewImage" />
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
