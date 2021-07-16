export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video/index.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/index.vue')
      }
    ]
  }
]