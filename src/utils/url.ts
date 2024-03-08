export function isUrl(str: string): boolean {  
  // const urlPattern = new RegExp(  
  //   '^(https?:\\/\\/)?'+ // protocol  
  //   '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension  
  //   '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address  
  //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path  
  //   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string  
  //   '(\\#[-a-z\\d_]*)?$','i'); // fragment locator  
  // return urlPattern.test(str);  
  const urlPattern = new RegExp(  
    '^(https?:\\/\\/)?'+ // protocol  
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,})','i'); // fragment locator  
  return urlPattern.test(str);  
}

const UrlUtils = {
  isUrl
}

export default UrlUtils