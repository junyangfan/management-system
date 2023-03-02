import Layout from '@/layout/index.vue'

export default [
  {
    path: '/home',
    component: Layout,
    meta: {
      title: '目录1',
      singleMenu: true,
      icon: 'cm-tihuoguanli',
    },
    children: [
      {
        path: '',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: '目录1', icon: 'cm-fayunqingdan1' },
      },
    ],
  },
]
