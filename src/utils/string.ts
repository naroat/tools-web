import { ElMessage } from 'element-plus';
import clipboard3 from 'vue-clipboard3'

/**
 * 转义特殊字符
 * str: string: 需处理的字符串
 * reg: string: 需转义的特殊字符
 * 
 * @param reg 
 */
export function transferred(str: string, reg: string = "`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）;—|【】‘；：”“'。，、？") {
    let pattern = new RegExp("[" + reg + "]");
    let res = '';
    Array.from(str).forEach((char: any) => {
      res += char.replace(pattern, `\\${char}`);
    });
    return res;
}

/**
 * 复制文本
 * @param resStr 文本内容
 * @returns 
 */
export function copy(resStr: string) {
  try {
    //check
    if (resStr == '') {
      ElMessage({
        message: "无可复制内容",
        type: "warning",
        duration: 1500
      })
      return
    }
    //copy
    const {toClipboard} = clipboard3()
    toClipboard(resStr)
    ElMessage({
      message: "复制成功",
      type: "success",
      duration: 1500
    })
  } catch (error) {
    console.log("复制失败")
    console.log(error)
    ElMessage({
      message: "复制失败",
      type: "error",
      duration: 1500
    })
  }
}

const StringUtils = {
  transferred,
  copy
}

export default StringUtils