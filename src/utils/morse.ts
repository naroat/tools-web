import { encode, decode } from 'imorse'

const morseCodeMap = {  
  'A': '.-',  
  'B': '-...',  
  'C': '-.-.',  
  'D': '-..',  
  'E': '.',  
  'F': '..-.',  
  'G': '--.',  
  'H': '....',  
  'I': '..',  
  'J': '.---',  
  'K': '-.-',  
  'L': '.-..',  
  'M': '--',  
  'N': '-.',  
  'O': '---',  
  'P': '.--.',  
  'Q': '--.-',  
  'R': '.-.',  
  'S': '...',  
  'T': '-',  
  'U': '..-',  
  'V': '...-',  
  'W': '.--',  
  'X': '-..-',  
  'Y': '-.--',  
  'Z': '--..',  
  '0': '-----',  
  '1': '.----',  
  '2': '..---',  
  '3': '...--',  
  '4': '....-',  
  '5': '.....',  
  '6': '-....',  
  '7': '--...',  
  '8': '---..',  
  '9': '----.',  
  '.': '.-.-.-',  
  ':': '---...',  
  ',': '--..--',  
  ';': '-.-.-.',  
  '?': '..--..',  
  "=": '-...-',  
  "'": '.----.',  
  '"': '.-..-.',  
  '!': '-.-.--',  
  '/': '-..-.',  
  '\\': '-.---..',  
  '(': '-.--.',  
  ')': '-.--.-',  
  '+': '.-.-.',  
  '-': '-....-',  
  '_': '..--.-',  
  '@': '.--.-.',
  '$': '...-..-',
  '&': '.-...',
}; 

/**
 * 文本转摩斯密码(包含中文转)
 * @returns 
 */
export function toMorse(text: string) { 
  let morseCode = '';  
  for (let char of text.toUpperCase()) {  
    if (/[\u4e00-\u9fa5]/g.test(char)) {
      //中文转摩斯电码
      morseCode += encode(char) || '?'
    } else {
      morseCode += morseCodeMap[char] || '?'; // 对于不在映射表中的字符，我们将其替换为问号  
    }
    morseCode += ' '
  }
  return morseCode;  
}

/**
 * 摩斯电码转文本
 */
export function toText(morse: string) {
  let text = '';
  let morseArr = morse.split(' ').filter(item => item.trim() !== "")
  for (let i = 0; i < morseArr.length; i++) {
    if (morseArr.length > 7) {
      //摩斯电码转中文
      //text += decode(morseArr[i].replace('/', ''))
      text += decode(morseArr[i])
    } else {
      text += Object.keys(morseCodeMap).find(key => morseCodeMap[key] === morseArr[i]) || '?'
    }
  }
  return text
}

//中文转摩斯电码
export function chineseToMorse(chinese: string): string {
  //先转换成ascii码
  let asciiCode = chinese.charCodeAt(0).toString()
  console.log(asciiCode)
  //转换
  return asciiCode.split('').map(char => morseCodeMap[char] || '').join('');  
}

//摩斯电码转中文
export function morseToChinese() {

}

const MorseUtils = {
  toMorse,
  toText
}
export default MorseUtils