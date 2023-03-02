/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'qs';
declare module 'antd';
declare module 'crypto-js';
declare module 'ali-oss';
declare module 'lodash';
declare module 'vue3-print-nb';