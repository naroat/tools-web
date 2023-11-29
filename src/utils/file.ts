/**
 * base64 to blob
 * @param base64String 
 * @returns 
 */
export function base64ToBlod(base64String: string): string {
  //将Base64编码的文件转换为二进制格式
  const binaryData = window.atob(base64String.split(',')[1])
  const ia = new Uint8Array(binaryData.length)
  for (let i = 0; i < binaryData.length; i++) {
    //获取unicode值
    ia[i] = binaryData.charCodeAt(i)
  }
  //创建blob对象，以便将二进制数据转换为对象
  const blob = new Blob([ia], { type: 'image/png' })
  //转换url
  const url = URL.createObjectURL(blob); 
  return url
}

/**
 * 直接下载
 * @param url 下载的文件url
 * @param filename 文件名
 */
export function autoDown(url: string, filename: string) {
    const downloadLink = document.createElement('a');  
    downloadLink.href = url;  
    downloadLink.download = filename; // 指定下载的文件名  
    // 将下载链接添加到 DOM 中并模拟点击下载  
    document.body.appendChild(downloadLink);  
    downloadLink.click();  
    document.body.removeChild(downloadLink);
}

const FileUtils = {
  base64ToBlod,
  autoDown
}
export default FileUtils