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
 * 转换成echarts使用的数据 - 基础格式(适用于柱状图、折线图等)
 */
export function toEchartsData(data) {
  let tmpColumn: Array<any> = [];
  let tmpValue: Array<any> = [];
  for (let item in data.rows) {
    if (item == 'len') {
      continue
    }
    tmpColumn.push(data.rows[item]['cells'][0] ? data.rows[item]['cells'][0]['text'] : '')
    tmpValue.push(data.rows[item]['cells'][1] ? data.rows[item]['cells'][1]['text'] : '')
  }
  return [tmpColumn, tmpValue];
}

/**
 * 转换成echarts使用的数据 - 适用于饼图
 * 
 * @param data 
 * @returns 
 */
export function toEchartsPieData(data) {
  let tmpArr: Array<Object> = []
  for (let item in data.rows) {
    if (item == 'len') {
      continue
    }
    tmpArr.push({
      name: data.rows[item]['cells'][0] ? data.rows[item]['cells'][0]['text'] : '',
      value: data.rows[item]['cells'][1] ? data.rows[item]['cells'][1]['text'] : ''
    })
    // tmpColumn.push(data.rows[item]['cells'][0] ? data.rows[item]['cells'][0]['text'] : '')
    // tmpValue.push(data.rows[item]['cells'][1] ? data.rows[item]['cells'][1]['text'] : '')
  }
  return tmpArr;
}

/**
 * 数据格式转换 - 根据type转换格式
 * 对象格式{name: '', value: ''};  列格式： nameArr = [], valueArr = []
 * @param data 
 * @returns 
 */
export function tranObjAndColumn(data, type = 'toObj') {
  let returnData = [] as any[];
  if (type == 'toObj') {
    if (data.len === 0 || data[0].len === 0) {
      return returnData;
    }
    //转换成饼图使用的obj
    let nameArr = data[0];
    let valueArr = data[1];
    let tmpArr: Array<Object> = []

    for (let item in nameArr) {
      if (item == 'len') {
        continue
      }
      tmpArr.push({
        name: nameArr[item] ? nameArr[item] : '',
        value: valueArr[item] ? valueArr[item] : '',
      })
    }
    returnData = tmpArr
  } else if (type == 'toColumn') {
    //饼图对象转换成列数组
    let nameArr = [] as string[]
    let valueArr = [] as number[]
    for (let item in data) {
      nameArr.push(data[item]?.name)
      valueArr.push(data[item]?.value)
    }
    returnData = [nameArr, valueArr]
  } else if (type == "toCoord") {
    //转换成坐标(散点图用到)
    if (data.len === 0 || data[0].len === 0) {
      return returnData;
    }
    //转换成饼图使用的obj
    let nameArr = data[0];
    let valueArr = data[1];
    let tmpArr: Array<any> = []

    for (let item in nameArr) {
      if (item == 'len') {
        continue
      }
      tmpArr.push([
        nameArr[item] ? nameArr[item] : 0,
        valueArr[item] ? valueArr[item] : 0,
      ])
    }
    returnData = tmpArr
  }
  return returnData;
}


const EchartsUtils = {
  toSpreadsheetData,
  toEchartsData,
  toEchartsPieData,
  tranObjAndColumn,
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