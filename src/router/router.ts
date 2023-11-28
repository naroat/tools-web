//对外暴露配置路由(常量路由)
export const constantRoute = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/Home/Home.vue'),
  },
  {
    path: '/timetran',
    component: () => import('@/components/TimeTran/TimeTran.vue'),
    name: 'timetran'
  },
  {
    path: '/MD5',
    component: () => import('@/components/MD5/MD5.vue'),
    name: 'MD5'
  },
  {
    path: '/json',
    component: () => import('@/components/JsonTran/JsonTran.vue'),
    name: 'json'
  },
  {
    path: '/reg',
    component: () => import('@/components/RegTest/RegTest.vue'),
    name: 'reg'
  },
  {
    path: '/unicode',
    component: () => import('@/components/Unicode/Unicode.vue'),
    name: 'unicode'
  },
  {
    path: '/wordcount',
    component: () => import('@/components/WordCount/WordCount.vue'),
    name: 'wordcount'
  },
  {
    path: '/ip',
    component: () => import('@/components/Ip/Ip.vue'),
    name: 'ip'
  },
  {
    path: '/scaletran',
    component: () => import('@/components/ScaleTran/ScaleTran.vue'),
    name: 'scaletran'
  },
  {
    path: '/signimage',
    component: () => import('@/components/SignImage/SignImage.vue'),
    name: 'signimage'
  },
  {
    path: '/404',
    component: () => import('@/components/404/404.vue'),
    name: '404',
  },
  {
    //重定向
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
