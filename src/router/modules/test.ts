import Layout from '@/layout/index.vue'

export default [
  {
    path: '/test',
    redirect: '/test/list',
    component: Layout,
    meta: {
      title: '测试',
      singleMenu: false,
      icon: 'cm-zhangdan',
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/xxx/index.vue'),
        meta: { title: '列表', icon: 'cm--invoice' },
      },
      {
        path: 'detail',
        component: () => import('@/views/yyy/index.vue'),
        meta: { title: '详情', icon: 'cm-fukuandanfapiao' },
      },
    ],
  },
]
