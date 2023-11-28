// 时间转换工具类

const TimeUtils = {
  Jh_getTimeStamp,
  Jh_timeStampToTime,
  Jh_convertTimeStamp,
  Jh_timeStampToYMD,
  Jh_isToday,
  Jh_getYearMonth,
  Jh_getPrevYear,
  Jh_getNextYear,
  Jh_getPrevYearMonth,
  Jh_getNextYearMonth,
  Jh_compareTimes,
  Jh_isBetweenTimes,
  Jh_isBetweenTimesByCurrent,
  Jh_isBetweenTimesByCurrentAndEndTime,
  getEndTime,
  startOfDay,
  endOfDay
}

export default TimeUtils

/**
 * 获取当前日期0点(iso格式)
 * @returns {string}
 */
export function startOfDay(isoDateStr: string): string {
  if (!isoDateStr) return ''
  return isoDateStr.substring(0, 10) + ' 00:00:00'
}

/**
 * 获取当前日期的午夜(iso格式)
 * @returns {string}
 */
export function endOfDay(isoDateStr: string): string {
  if (!isoDateStr) return ''
  return isoDateStr.substring(0, 10) + ' 23:59:59'
}

/**
 * @description: 获取当前毫秒级时间戳（13位）
 * @return {*}
 */
export function Jh_getTimeStamp(): number {
  // let timestamp2 = Date.parse(new Date())
  // const timestamp = Date.now()
  const timestamp = new Date().getTime()
  return timestamp
}

/**
 * 将某个时间戳转化成 指定格式时间
 * @param {date} time 时间  new Date().getTime()
 * @param {string} cFormat {y}-{m}-{d} {h}:{i}:{s} {w}
 */

export function Jh_timeStampToTime(time: string | number | Date, cFormat: string): string {
  if (arguments.length === 0) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (('' + time).length === 10) time = parseInt(time as string) * 1000
    date = new Date(time)
  }

  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    w: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|w)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'w') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 将某个时间转化成时间戳
 * 时间格式：2019-05-20 00:00:00 或 2019年5月1日 00:00:00
 * 返回值：1556640000000，13位时间戳
 */
export function Jh_convertTimeStamp(time: string): number {
  // 用正则主要是把“2019-05-20 00:00:00”转换成“2019/05/20 00:00:00”兼容ios
  let newTime = time.replace(/-|\./g, '/')
  // console.log(newTime);
  // newTime = newTime.replace(/\./g, "-");
  newTime = newTime.replace(/年/g, '/')
  newTime = newTime.replace(/月/g, '/')
  newTime = newTime.replace(/日/g, '')
  if (newTime.length === 4) {
    newTime = newTime + '/01/01 00:00:00'
  }
  if (newTime.length === 7) {
    newTime = newTime + '/01 00:00:00'
  }
  if (newTime.length === 10) {
    newTime = newTime + ' 00:00:00'
  }
  if (newTime.length === 16) {
    newTime = newTime + ':00'
  }
  return Date.parse(newTime)
}

/**
 * 毫秒级时间戳（13位）转年月日，不传time默认当前时间戳
 * @param time 毫秒级时间戳（13位），不传time默认当前时间戳
 * @param format 指定format，不传format默认：'{y}/{m}/{d}'
 * @return 指定format时间，默认格式：2020/02/02
 */
export function Jh_timeStampToYMD(time?: number | null, format?: string | null) {
  time = time ? time : Jh_getTimeStamp()
  if (format) {
    return Jh_timeStampToTime(time, format)
  }
  return Jh_timeStampToTime(time, '{y}/{m}/{d}')
}

// 某个时间是否是今天 time格式：2020-07-19 20:33:00
export function Jh_isToday(time: string): boolean {
  let newTime = time.replace(/-/g, '')
  newTime = newTime.substring(0, 8)
  let currentTime: number | string = new Date().getTime()
  currentTime = Jh_timeStampToTime(currentTime, '{y}{m}{d}')
  return newTime === currentTime.toString()
}

// 获取当前年月  time格式：2020-07
export function Jh_getYearMonth(): string {
  const timestamp = new Date().getTime()
  return Jh_timeStampToTime(timestamp, '{y}-{m}')
}

// 获取 指定年的上一年 time格式：2020 | 2020年
export function Jh_getPrevYear(time: string): string {
  let tempYear: number | string = time.substring(0, 4)
  tempYear = parseInt(tempYear)
  tempYear = tempYear - 1
  const text = time.substring(4, 5)
  let prevTime = ''
  if (text === '年') {
    prevTime = tempYear + '年'
  } else {
    prevTime = tempYear + text
  }
  return prevTime
}

// 获取 指定年的下一年 time格式：2020 | 2020年
export function Jh_getNextYear(time: string): string {
  let tempYear: number | string = time.substring(0, 4)
  tempYear = parseInt(tempYear)
  tempYear = tempYear + 1
  const text = time.substring(4, 5)
  let nextTime = ''
  if (text === '年') {
    nextTime = tempYear + '年'
  } else {
    nextTime = tempYear + text
  }
  return nextTime
}

// 获取 指定年月的上一年月 time格式：2020-07 | 2020年07月
export function Jh_getPrevYearMonth(time: string): string {
  let tempYear: number | string = time.substring(0, 4)
  let tempMonth: number | string = time.substring(5, 7)
  tempYear = parseInt(tempYear)
  tempMonth = parseInt(tempMonth)
  tempMonth = tempMonth - 1
  if (tempMonth === 0) {
    tempYear = tempYear - 1
    tempMonth = 12
  }
  if (tempMonth < 10) {
    tempMonth = '0' + tempMonth
  }
  const text = time.substring(4, 5)
  let prevTime = ''
  if (text === '年') {
    prevTime = tempYear + '年' + tempMonth + '月'
  } else {
    prevTime = tempYear + text + tempMonth
  }
  return prevTime
}

// 获取 指定年月的下一年月 time格式：2020-07 | 2020年07月
export function Jh_getNextYearMonth(time: string): string {
  let tempYear: number | string = time.substring(0, 4)
  let tempMonth: number | string = time.substring(5, 7)
  tempYear = parseInt(tempYear)
  tempMonth = parseInt(tempMonth)
  tempMonth = tempMonth + 1
  if (tempMonth === 13) {
    tempYear = tempYear + 1
    tempMonth = 1
  }
  if (tempMonth < 10) {
    tempMonth = '0' + tempMonth
  }
  const text = time.substring(4, 5)
  let nextTime = ''
  if (text === '年') {
    nextTime = tempYear + '年' + tempMonth + '月'
  } else {
    nextTime = tempYear + text + tempMonth
  }
  return nextTime
}

/**
 * @param time Date/String/Number
 * @description getEndTime('2021-02-12')
 * @returns '距离2021年2月12日还有118天0小时30分12秒'
 */
export function getEndTime(time: string): string {
  const year = new Date(time).getFullYear()
  const month = new Date(time).getMonth() + 1
  const date = new Date(time).getDate()
  const now = new Date()
  const endDate = new Date(new Date(time).toLocaleDateString())
  const leftTime = endDate.getTime() - now.getTime()
  const leftsecond = parseInt((leftTime / 1000).toString())
  const day = Math.floor(leftsecond / (60 * 60 * 24))
  const hour = Math.floor((leftsecond - day * 24 * 60 * 60) / 3600)
  const minute = Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60)
  const second = Math.floor(leftsecond - day * 60 * 60 * 24 - hour * 60 * 60 - minute * 60)
  return `距离${year}年${month}月${date}日还有${day}天${hour}小时${minute}分${second}秒`
}

/**
 * 判断某个时间是否在开始时间和结束时间范围内
 * @param time 2020-07-19 20:33:00 | 2020/07/19 20:33:00
 * @return true | false
 */
export function Jh_isBetweenTimes(time: string, startTime: string, endTime: string): boolean {
  time = time.replace(/-/g, '/')
  startTime = startTime.replace(/-/g, '/')
  endTime = endTime.replace(/-/g, '/')
  const time2 = new Date(time)
  const startTime2 = new Date(startTime)
  const endTime2 = new Date(endTime)
  if (startTime2 <= time2 && time2 <= endTime2) {
    return true
  }
  return false
}

/**
 * 判断当前时间是否在某个时间段内
 * @param time 2020-07-19 20:33:00 | 2020/07/19 20:33:00
 * @return true | false
 */
export function Jh_isBetweenTimesByCurrent(beginTime: string, endTime: string): boolean {
  beginTime = beginTime.replace(/-/g, '/')
  endTime = endTime.replace(/-/g, '/')
  const beginTime2 = new Date(beginTime)
  const endTime2 = new Date(endTime)
  const currentTime = new Date()
  if (beginTime2 <= currentTime && currentTime <= endTime2) {
    return true
  }
  return false
}

/**
 * 判断某个时间是否在当前时间和结束时间范围内
 * @param time 2020-07-19 20:33:00 | 2020/07/19 20:33:00
 * @return true | false
 */
export function Jh_isBetweenTimesByCurrentAndEndTime(time: string, endTime: string): boolean {
  const currentTime = new Date()
  time = time.replace(/-/g, '/')
  endTime = endTime.replace(/-/g, '/')
  const time2 = new Date(time)
  const endTime2 = new Date(endTime)
  if (currentTime <= time2 && time2 <= endTime2) {
    return true
  }
  return false
}

/**
 * 比较两个时间大小
 * @param time1 2019-02-02 || 2019-02-02 00:00:00
 * @param time2 2019-02-02 || 2019-02-02 00:00:00
 * @return time1>time2 为true
 */
export function Jh_compareTimes(time1: string, time2: string): boolean {
  const newTime1 = Jh_convertTimeStamp(time1)
  const newTime2 = Jh_convertTimeStamp(time2)
  if (newTime1 > newTime2) {
    return true // 第一个大
  } else {
    return false // 第二个大
  }
}

/*
  使用方法：

  import { Jh_getTimeStamp, Jh_timeStampToTime } from '@/utils/timeUtils2'
  import TimeUtils2 from '@/utils/timeUtils2'

  // 时间戳转指定格式时间
  TimeUtils2.Jh_timeStampToTime(1554803832, '{y}年{m}月{d}日 {h}:{i}:{s} 星期{w}')                     1487065320000
  TimeUtils2.Jh_timeStampToTime(new Date().getTime(), '{y}年{m}月{d}日 {h}:{i}:{s} 星期{w}')

  */
