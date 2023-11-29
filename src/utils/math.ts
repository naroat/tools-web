/**
 * 10进制转58进制
 */
export function baseToScale58(num: number) {
  var base = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  var result = '';
  while (num > 0) {
    var mod = num % 58;
    result = base[mod] + result;
    num = Math.floor(num / 58);
  }
  return result;
}

/**
 * 58进制转10进制
 * @param base58
 */
export function scale58ToBase(base58: string) {
  var base = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  var result = 0;
  var digitValue;
  for (var i = 0; i < base58.length; i++) {
    digitValue = base.indexOf(base58[i]);
    result = result * 58 + digitValue;  }
  return result;
}

/**
 * 10进制转62进制
 * 
 * @param num 
 * @returns 
 */
export function baseToScale62(num: number) {
  var base62 = ''
  while(num > 0){
    var remainder = num % 62;
    base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(remainder) + base62;
    var num = Math.floor(num / 62);
  }
  return base62
}

/**
 * 62转10进制
 */
export function scale62ToBase(base62: string) {
  var num = 0;
  for(var i = 0; i < base62.length; i++){
    num += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(base62.charAt(i)) * Math.pow(62, base62.length - i - 1);
  }
  return num
}

/**
 * 10转64进制
 * @returns 
 */
export function baseToScale64(num: number) {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/';
  var result = '';
  do {
    result = chars[num % 64] + result;
    num = Math.floor(num / 64);
  } while (num > 0);
  return result;
}

/**
 * 64转10进制
 * @param base64
 */
export function scale64ToBase(base64: string) {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/';
  var result = 0;
  var index;
  for (var i = 0; i < base64.length; i++) {
    index = chars.indexOf(base64[i]);
    result += index * Math.pow(64, base64.length - i - 1);
  }
  return result;
}

const MathUtils = {
  baseToScale58,
  scale58ToBase,
  baseToScale62,
  scale62ToBase,
  baseToScale64,
  scale64ToBase
}
export default MathUtils