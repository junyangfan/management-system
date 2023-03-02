import Layout from '@/layout/index.vue'

export default [
  {
    path: '/',
    redirect: '/welcome',
    component: Layout,
    meta: {
      title: '欢迎',
      singleMenu: true,
      icon: 'cm-huanyingye',
    },
    children: [
      {
        path: '/welcome',
        component: () => import('@/views/Welcome/index.vue'),
        meta: {
          title: '欢迎',
        },
      },
    ],
  },
  // {
  //   path: '/home',
  //   component: Layout,
  //   meta: {
  //     title: '首页',
  //     singleMenu: true,
  //     icon: 'cm-home',
  //   },
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/Home/index.vue'),
  //       meta: {
  //         title: '首页',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hidden: true,
    },
    component: () => import('@/views/Login/index.vue'),
  },
]
