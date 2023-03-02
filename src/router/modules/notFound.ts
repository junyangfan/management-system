export default [
  {
    path: '/404',
    name: 'NotFound',
    meta: {
      hidden: true,
    },
    component: () => import('@/views/NotFound/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    meta: {
      hidden: true,
    },
  },
]
