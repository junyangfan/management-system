import AliOSS from 'ali-oss'
import { UploadProps } from 'ant-design-vue'
import { RcFile } from 'ant-design-vue/lib/vc-upload/interface'
import CryptoJS from 'crypto-js'

const config = {
  region: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
}

const client = new AliOSS(config)

export const CustomRequest: UploadProps['customRequest'] = async ({ onProgress, onSuccess, onError, file }) => {
  const fileCopy = file as RcFile
  const filePath = `oss/${fileCopy.lastModified}/` + CryptoJS.MD5(new Date().getTime())
  try {
    const res: any = await client.multipartUpload(filePath, fileCopy, {
      progress: (p: any) => {
        onProgress && onProgress({ percent: p })
      },
    })
    onSuccess && onSuccess({ url: res.res.requestUrls[0].split('?')[0] })
  } catch (error: any) {
    onError && onError(error)
  }
}
