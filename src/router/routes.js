export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video/index.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/index.vue'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:art_id',
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/user-profile/index.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/chat',
    name: 'userChat',
    component: () => import('@/views/user-chat/index.vue'),
    meta: { requiresAuth: true }
  }
]
