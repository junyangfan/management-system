<script lang="ts">
export default {
  name: 'ImportFileModal',
}
</script>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CustomRequest } from '@/utils/aliOSS'
import { Form, message, UploadFile } from 'ant-design-vue'

interface Props {
  templateUrl: string
  desc: string[]
  onSubmit: (url: string) => Promise<boolean | string>
}

const props = defineProps<Props>()

const visible = ref(false)
const uploading = ref(false)

const formRef = reactive<{ file: UploadFile<{ url: string }>[] }>({
  file: [],
})

const rulesRef = reactive({
  file: [
    {
      required: true,
      message: '请上传附件',
    },
  ],
})

const { validate, validateInfos, resetFields } = Form.useForm(formRef, rulesRef)

const init = () => {
  visible.value = true
  resetFields()
}

const handleOk = async () => {
  uploading.value = true
  try {
    await validate()
    const url = formRef.file[0].response?.url as string
    const data = await props.onSubmit(url)
    message.info(data ? '导入成功' : '导入失败')
    visible.value = false
  } catch (err) {
    message.error('操作失败')
  }
  uploading.value = false
}
</script>

<template>
  <slot name="trigger" :onClick="init" />
  <a-modal title="导入" v-model:visible="visible" :ok-button-props="{ loading: uploading }" @ok="handleOk">
    <a-form>
      <a-form-item label="附件" v-bind="validateInfos.file">
        <a-upload accept=".xlsx,.xls,.csv" :custom-request="CustomRequest" v-model:file-list="formRef.file">
          <a-button type="primary">上传附件</a-button>
        </a-upload>
      </a-form-item>
    </a-form>
    <div class="content">
      <a-space :size="30">
        <a class="color-blue" target="_blank" :href="templateUrl"> 导入模板.xls </a>
        <span>(请下载模板填写后再上传）</span>
      </a-space>
    </div>
    <div v-if="desc.length > 0" class="content">
      <div class="color-red">导入说明：</div>
      <div v-for="(v, i) in desc" :key="i">{{ i + 1 }}、{{ v }}</div>
    </div>
  </a-modal>
</template>

<style lang="less" scoped>
.content {
  margin: 20px 20px 20px 40px;
}
.color-red {
  color: red;
}
.color-blue {
  color: blueviolet;
  text-decoration: underline;
}
</style>
