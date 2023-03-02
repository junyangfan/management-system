import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import Router from '@/router'
import Store from '@/store'
import '@/style.css'
// import 'ant-design-vue/dist/antd.less'
// https://github.com/HuiWang111/browser-print
import Print from '@browser-print/vue3'

createApp(App).use(Antd).use(Router).use(Store).use(Print).mount('#app')
