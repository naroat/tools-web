import { watch } from 'vue'
import { locale, t } from '@/i18n'
import { toolsList } from '@/components/Tools/tools'
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './router'

/** 创建应用路由器，并在每次导航时将页面滚动到顶部。 */
const router = createRouter({
  // 使用 HTML5 History 模式；如需 Hash 模式，可切换为 createWebHashHistory。
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes: constantRoute,

  // 页面切换后重置滚动位置。
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

/**
 * 根据当前路由和语言更新页面标题及 SEO/Open Graph 元信息。
 */
function updatePageMetadata(): void {
  // 获取当前路由，并匹配对应工具配置，以便读取工具页面的标题和描述。
  const route = router.currentRoute.value
  const normalizedRoutePath = route.path.replace(/\/$/, '')
  const tool = toolsList().find((item) => {
    const toolPath = item.url.split('?')[0].replace(/\/$/, '')
    return toolPath === normalizedRoutePath
  })

  // 结合路由元信息、工具配置和当前语言，生成页面标题、描述及站点名称。
  const title = t(route.meta.title || tool?.title)
  const defaultDescription = import.meta.env.VITE_APP_DESC
  const description = locale.value === 'en'
    ? t(tool?.desc || route.meta.description || defaultDescription)
    : String(route.meta.description || defaultDescription || '')
  const siteName = t(import.meta.env.VITE_APP_TITLE)

  // 标题优先使用当前页面标题；缺少页面标题时回退到站点名称和站点描述。
  document.title = title
    ? `${title} - ${siteName}`
    : `${siteName} - ${t(defaultDescription)}`

  // 英文关键词由标题和描述组合生成，其他语言优先读取路由配置。
  const keywords = locale.value === 'en'
    ? `${title}, ${description}`
    : String(route.meta.keywords || '')

  // 将生成的关键词、描述和 Open Graph 信息写入页面 meta 标签，供搜索引擎及社交平台读取。
  document.querySelector('meta[name="keywords"]')?.setAttribute('content', keywords)
  document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
  document.querySelector('meta[property="og:site_name"]')?.setAttribute('content', siteName)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
}

// 路由切换或界面语言变化时，同步更新页面元信息。
router.afterEach(updatePageMetadata)
watch(locale, updatePageMetadata)

export default router
