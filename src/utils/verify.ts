/**
 * 是否ip地址
 * @param ip 
 * @returns 
 */
export function isIp(ip: string): boolean {
  return /^((\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))(\.|$)){4}$/.test(ip) ? true : false;
}

/**
 * 是否二进制
 * @param data 
 */
export function isBinary(data: string): boolean {
  return /^([0-1]+)$/g.test(data) ? true : false;
}

/**
 * 是否八进制
 * @param data 
 * @returns 
 */
export function isOctal(data: string): boolean {
  return   /^([0-7]+)$/g.test(data) ? true : false;
}

/**
 * 是否十进制
 * @param data 
 * @returns 
 */
export function isDecimal(data: string): boolean {
  return   /^([0-9]+)$/g.test(data) ? true : false;
}

/**
 * 是否十六进制
 * @param data 
 * @returns 
 */
export function isHexadecimal(data: string): boolean {
  return   /^([0-9a-fA-F]+)$/g.test(data) ? true : false;
}

const StringUtils = {
  isIp,
  isBinary,
  isOctal,
  isDecimal,
  isHexadecimal
}

export default StringUtils