import type { App } from 'vue'
import { watch } from 'vue'
import { locale } from '@/i18n'
import zhCN from '@kangc/v-md-editor/lib/lang/zh-CN'
import enUS from '@kangc/v-md-editor/lib/lang/en-US'
//v-md-editor
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

export function setupMdEditor(app: App) {
  watch(locale, value => {
    VueMarkdownEditor.lang.use(value === 'en' ? 'en-US' : 'zh-CN', value === 'en' ? enUS : zhCN)
  }, { immediate: true, flush: 'sync' })
  app.use(VueMarkdownEditor)
}

export default setupMdEditor
