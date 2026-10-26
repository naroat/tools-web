<script setup lang="ts">
import { t, locale } from '@/i18n'

import { computed, watch, reactive, ref, shallowRef, onBeforeUnmount, onMounted } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import '@wangeditor/editor/dist/css/style.css' // 引入富文本 css
import { i18nChangeLanguage } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'  //富文本组件
import { copy } from '@/utils/string'
const info = reactive({
  title: "在线文本编辑/HTML获取",
  mode: 'default',
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容
const content = ref(``)
// html
const html = ref('')

// 工具栏配置
const toolbarConfig = {
  excludeKeys: [
    "uploadImage",
    "group-video",
    "insertLink",
  ]
}

//编辑器配置
const editorConfig = computed(() => ({ placeholder: t('请输入内容...') }))

// 重新创建编辑器的菜单时保留绑定的 HTML 内容。
watch(locale, value => {
  i18nChangeLanguage(value === 'en' ? 'en' : 'zh-CN')
  editorRef.value?.destroy()
  editorRef.value = undefined
}, { immediate: true, flush: 'sync' })

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  // html = editor.getHtml()
}

const handleChange = (editor) => {
  html.value = editor.getHtml()
}


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

onMounted(() => {

})

//copy
const copyRes = async (resStr: string) => {
  copy(resStr)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white h-[510px]">
      <div class="border z-10 mt-3 h-96">
        <Toolbar :key="'toolbar-' + locale"
          class=""
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="info.mode"
        />
        <Editor :key="'editor-' + locale"
          class="border"
          v-model="content"
          :defaultConfig="editorConfig"
          :mode="info.mode"
          @onCreated="handleCreated"
          @onChange="handleChange"
        />
      </div>
      
    </div>

    <div class="p-4 mt-3 rounded-2xl bg-white">
      <el-button type="primary" @click="copyRes(html)">{{ t("复制HTML") }}</el-button>
      <el-input
        v-model="html"
        disabled
        class="mt-3"
        type="textarea"
        autosize
        :placeholder="t('html预览处')"
      />
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线富文本编辑, html实时预览，在线编辑文本，文本编辑获取html") }}</el-text>
    </ToolDetail>

  </div>
</template>

<style scoped>
.downext-select{
  @apply w-24
}
</style>
