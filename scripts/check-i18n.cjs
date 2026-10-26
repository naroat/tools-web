// 验证语言偏好、响应式切换、翻译回退和工具目录的英文覆盖率。
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')
const vue = require('vue')
const messages = require('../src/i18n/en.json')

function loadModule(file, dependencies, globals = {}) {
  const exports = {}
  const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText
  vm.runInNewContext(code, {
    exports,
    require(name) {
      assert.ok(name in dependencies, `Unexpected dependency: ${name}`)
      return dependencies[name]
    },
    ...globals,
  })
  return exports
}

let saved = null
const document = { documentElement: { lang: '' } }
const storage = {
  getItem: () => saved,
  setItem: (_key, value) => { saved = value },
}
const i18n = loadModule('src/i18n/index.ts', { vue, './en.json': messages }, {
  document, localStorage: storage,
})
i18n.initializeLocale()
assert.equal(i18n.locale.value, 'zh-CN')
assert.equal(document.documentElement.lang, 'zh-CN')
assert.equal(i18n.t('收藏工具'), '收藏工具')
const label = vue.computed(() => i18n.t('收藏工具'))
assert.equal(label.value, '收藏工具')
i18n.setLocale('en')
assert.equal(label.value, 'Favorites')
assert.equal(document.documentElement.lang, 'en')
assert.equal(saved, 'en')
assert.equal(i18n.t('未知的用户文本'), '未知的用户文本')
assert.equal(i18n.t('切换到{mode}模式', { mode: 'Work' }), 'Switched to Work mode')
i18n.initializeLocale()
assert.equal(i18n.locale.value, 'en')
saved = 'invalid'
i18n.initializeLocale()
assert.equal(i18n.locale.value, 'zh-CN')
storage.getItem = storage.setItem = () => { throw new Error('Storage disabled') }
i18n.initializeLocale()
i18n.setLocale('en')
assert.equal(i18n.locale.value, 'en')

const tools = loadModule('src/components/Tools/tools.ts', { '@/i18n': i18n })
for (const category of tools.getToolsCate()) {
  for (const text of [category.title, ...category.list.flatMap(tool => [tool.title, tool.desc, tool.cate])]) {
    assert.ok(!/[\u4e00-\u9fff]/.test(i18n.t(text)), `Missing catalog translation: ${text}`)
  }
}
const query = { cateId: 0, route: '', title: 'password' }
assert.ok(tools.getTools(query).some(tool => tool.url === '/randompassword/'))
query.title = '密码'
assert.ok(tools.getTools(query).some(tool => tool.url === '/randompassword/'))
i18n.setLocale('zh-CN')
assert.equal(label.value, '收藏工具')
console.log('i18n checks passed: defaults, persistence, reactivity, fallback, storage failures and bilingual search.')
