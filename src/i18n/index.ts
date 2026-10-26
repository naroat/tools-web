import { readonly, ref } from 'vue'
import messages from './en.json'

export type Locale = 'zh-CN' | 'en'
export const LOCALE_STORAGE_KEY = 'tools-web-locale'
const currentLocale = ref<Locale>('zh-CN')
const english: Record<string, string> = messages

/** 获取已保存的语言；首次访问、无效值或存储不可用时默认中文。 */
export function initializeLocale(): void {
  try {
    currentLocale.value = localStorage.getItem(LOCALE_STORAGE_KEY) === 'en' ? 'en' : 'zh-CN'
  } catch {
    currentLocale.value = 'zh-CN'
  }
  document.documentElement.lang = currentLocale.value
}

/** 切换界面语言并保存偏好；存储不可用时仍可在当前页面切换。 */
export function setLocale(value: Locale): void {
  currentLocale.value = value
  document.documentElement.lang = value
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, value)
  } catch {
    // 浏览器禁用存储时保留本次会话中的选择。
  }
}

/** 翻译界面文案，缺少英文翻译时保留原文；不修改工具输入或输出。 */
export function t(value: unknown, params: Record<string, string | number> = {}): string {
  const text = value == null ? '' : String(value)
  const translated = currentLocale.value === 'en' ? (english[text] ?? english[text.trim()] ?? text) : text
  return translated.replace(/\{(\w+)\}/g, (match, key: string) => params[key] == null ? match : String(params[key]))
}

export const locale = readonly(currentLocale)
