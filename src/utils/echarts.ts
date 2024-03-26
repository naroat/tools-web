/**
 * 转换成Spreadsheet数据格式
 */
export function toSpreadsheetData(data, type = 'bar') {
  let res = {}
  let columnLen = data[0].value.length
  switch(type) {
    case 'bar':
      for (let i = 0; i < columnLen; i++) {
        res[i] = {
          cells: {
            0: {text: data[0].value[i] ?? ''},
            1: {text: data[1].value[i] ?? ''}
          }
        }
      }
      break;
    default:
      break;
  }
  return res
}

/**
 * 转换成echarts使用的数据
 */
export function toEchartsData(data) {
  let tmpColumn: Array<string> = [];
  let tmpValue: Array<string> = [];
  for (let item in data.rows) {
    if (item == 'len') {
      continue
    }
    tmpColumn.push(data.rows[item]['cells'][0] ? data.rows[item]['cells'][0]['text'] : '')
    tmpValue.push(data.rows[item]['cells'][1] ? data.rows[item]['cells'][1]['text'] : '')
  }
  return [tmpColumn, tmpValue];
}

const EchartsUtils = {
  toSpreadsheetData,
  toEchartsData,
}
export default EchartsUtils

/**

1: { 
  cells: { 
    0: { text: 'testingtesttestetst' }, 
    2: { text: 'testing' }, 
  }, 
}, 
2: { 
  cells: { 
    0: { text: 'render', style: 0 }, 
    1: { text: 'Hello' }, 
    2: { text: 'haha', merge: [1, 1] }, 
  } 
}, 
8: { 
  cells: { 
    8: { text: 'border test', style: 0 }, 
  } 
} 

 */