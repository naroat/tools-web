//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './router'
//创建路由器
const router = createRouter({
  //路由模式hash
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
router.beforeEach((to, from, next) => {
  if (to.meta.title && to.meta.title != '') {
    console.log(from)
    let oldTitle = document.title
    document.title = <string>to.meta.title + ' - ' + oldTitle
  }
  next()
})
export default router
