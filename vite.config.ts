/* eslint-disable camelcase */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      // 配置组件按需引入
      Components({
        dirs: ['src/components'],
        resolvers: [AntDesignVueResolver()],
        dts: 'src/typing/components.d.ts',
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 此处也可设置直角、边框色、字体大小等
            // 'primary-color': '#16c3d4',
            // 'border-color-base': '#16c3d4',
            // 'link-color': '#16c3d4', // link color
            // 'success-color': '#16c3d4', // success state color
            // 'warning-color': '#16c3d4', // warning state color
            // 'error-color': '#16c3d4', // error state color
            // 'font-size-base': '14px', // major text font size
            // 'heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
            // 'text-color': 'rgba(0, 0, 0, 0.85)', // major text color
            // 'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
            // 'disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
            // 'border-radius-base': '2px', // major border radius
            // 'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // major shadow for layers
          },
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    base: env.VITE_PUBLIC_PATH, // 设置打包路径
    server: {
      https: false, // 是否开启 https
      port: 7266, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域

      // 设置代理，根据我们项目实际情况配置
      proxy: {
        '/api': {
          target: 'https://xxx.com',
          changeOrigin: true,
          // headers: {
          //   token:
          //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJDbG91ZE1hbGwiLCJleHAiOjE2NzgyNDE2NDcsInVzZXJOYW1lIjoiUlk4ODgiLCJ1c2VySWQiOiIxNjIwMzM1MjcxMDM5MTcyNjEwIiwidmVyc2lvbiI6IjE2NzU2NDk2NDcxMTEifQ.bmS6rq0rzLRtKcuwOAihZe7G6ytbB5bKSbAQpRhwAJbLl6-7H0-yTFZv7ck8IZAWJfF73uRuO_xEgUXcT3qjVZdeU1Twk6dzqh5acBu15wo5mbfTA5_W9JDAl_npy32rMFCNJ4jEq_cDYtPyO2JSBoNH65QJ6ceo6ocSFWmVMB4vYtZOUwCC-2SPlunrV9eJdefr0jzYDCcKrWRtCcIjYlVzixJZJ2jCxcNYaKBsJ4PaRDbFnp3UWJwb7BU0xsAZPOx-KuxCuBGSGuw04DgA9SPv2o6a4DwU-tUukzHaeQwy-4stEnpXAotjRZeMQav-wsHpzXHOPsygBw5Z3qDMCA',
          // },
          // rewrite: (path) => path.replace('/api/', '/')
        },
      },
    },
    build: {
      target: 'es2015', // 设置最终构建的浏览器兼容目标
      sourcemap: false, // 构建后是否生成 source map 文件
      chunkSizeWarningLimit: 2000, //  chunk 大小警告的限制（以 kbs 为单位）
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console & debugger
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  })
}
