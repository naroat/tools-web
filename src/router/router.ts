//对外暴露配置路由(常量路由)
export const constantRoute = [
  {
    path: '/',
    component: () => import('@/components/Home/Home.vue'),
    name: 'home',
    meta: {
      title: ""
    }
  },
  {
    path: '/timetran',
    component: () => import('@/components/TimeTran/TimeTran.vue'),
    name: 'timetran',
    meta: {
      title: "时间戳转换"
    }
  },
  {
    path: '/MD5',
    component: () => import('@/components/MD5/MD5.vue'),
    name: 'MD5',
    meta: {
      title: "MD5在线加密"
    }
  },
  {
    path: '/json',
    component: () => import('@/components/JsonTran/JsonTran.vue'),
    name: 'json',
    meta: {
      title: "Json在线转换"
    }
  },
  {
    path: '/reg',
    component: () => import('@/components/RegTest/RegTest.vue'),
    name: 'reg',
    meta: {
      title: "正则表达式测试"
    }
  },
  {
    path: '/unicode',
    component: () => import('@/components/Unicode/Unicode.vue'),
    name: 'unicode',
    meta: {
      title: "Unicode转中文"
    }
  },
  {
    path: '/wordcount',
    component: () => import('@/components/WordCount/WordCount.vue'),
    name: 'wordcount',
    meta: {
      title: "在线字数统计"
    }
  },
  {
    path: '/ip',
    component: () => import('@/components/Ip/Ip.vue'),
    name: 'ip',
    meta: {
      title: "IP查询"
    }
  },
  {
    path: '/scaletran',
    component: () => import('@/components/ScaleTran/ScaleTran.vue'),
    name: 'scaletran',
    meta: {
      title: "常用进制转换"
    }
  },
  {
    path: '/signimage',
    component: () => import('@/components/SignImage/SignImage.vue'),
    name: 'signimage',
    meta: {
      title: "在线编辑图片"
    }
  },
  {
    path: '/404',
    component: () => import('@/components/404/404.vue'),
    name: '404',
    meta: {
      title: "404"
    }
  },
  {
    //重定向
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
