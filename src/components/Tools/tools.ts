import type { ToolsReqData } from '@/components/Tools/tools.type.ts'

//获取tools分类与对应的工具
export function getToolsCate() {
  return [
    {
      id: 2,
      title: '开发运维',
      icon: '',
      list: [
        {
          id: 1,
          title: '随机密码生成',
          logo: '/images/logo/keywords.png',
          desc: '密码生成器、随机字符串生成,批量生成',
          url: '/random_password/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'URL编码/解码',
          logo: '/images/logo/url.png',
          desc: 'URL在线编码解码工具（UrlEncode编码 和 UrlDecode解码）',
          url: '/urlencode/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'UUID生成器',
          logo: '/images/logo/uuid.png',
          desc: '批量生成UUID',
          url: '/uuid/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: '时间戳转换',
          logo: '/images/logo/Time.png',
          desc: '在线时间戳转换工具以及获取当前时间戳',
          url: '/timetran/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'MD5在线加密',
          logo: '/images/logo/md5.png',
          desc: 'MD5在线加密,长度包含32位、16位',
          url: '/MD5/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'Json在线转换',
          logo: '/images/logo/json.png',
          desc: '在线编辑json, 语法检查',
          url: '/json/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: '正则测试工具',
          logo: '/images/logo/reg.png',
          desc: '正则表达式测试工具, 常用正则表达式',
          url: '/reg/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'Unicode转中文',
          logo: '/images/logo/union.png',
          desc: 'Unicode和中文的相互转换',
          url: '/unicode/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'HTTP状态码',
          logo: '/images/logo/http_code.png',
          desc: 'http状态对应的名称和含义解释',
          url: '/HttpStatusCode/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'JWT解析',
          logo: '/images/logo/jwt_parse.png',
          desc: '解析和解码JSON Web Token（jwt）',
          url: '/jwt/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'html实体转义',
          logo: '/images/logo/HtmlEntity.png',
          desc: 'html实体转义，实体转义成html',
          url: '/HtmlEntity/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'js代码格式化/压缩',
          logo: '/images/logo/HtmlEntity.png',
          desc: 'JS格式化/压缩工具,提供在线JS格式化、JS压缩、JS混淆、JS解密',
          url: '/JSForamt/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'Html代码格式化/压缩',
          logo: '/images/logo/HtmlEntity.png',
          desc: 'html格式化/压缩工具,提供在线html格式化、html压缩',
          url: '/HtmlFormat/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'Css代码格式化/压缩',
          logo: '/images/logo/HtmlEntity.png',
          desc: 'css格式化/压缩工具,提供在线css格式化、css压缩',
          url: '/CssFormat/',
          cateId: 2,
          cate: '开发运维',
        }
      ]
    },
    {
      id: 3,
      title: '文本处理',
      icon: '',
      list: [
        {
          id: 1,
          title: '文本对比',
          logo: '/images/logo/diff.png',
          desc: '文本差异比对支持中文、英文、代码比对',
          url: '/diff/',
          cateId: 3,
          cate: '文本处理'
        },
        {
          id: 1,
          title: 'markdown编辑器',
          logo: '/images/logo/file-markdown-fill.png',
          desc: '在线创建或编辑markdown, 实时预览，导出markdown',
          url: '/markdown/',
          cateId: 3,
          cate: '文本处理'
        },
        {
          id: 1,
          title: '字数统计',
          logo: '/images/logo/wordCount.png',
          desc: '在线统计字符串的字数、段落、标点符号数量',
          url: '/wordCount/',
          cateId: 3,
          cate: '文本处理',
        },
        {
          id: 1,
          title: '文本去重',
          logo: '/images/logo/textRemoveDuplicate.png',
          desc: '可以删除或去除文本或字符串中的重复行',
          url: '/textRemoveDuplicate/',
          cateId: 3,
          cate: '文本处理',
        },
        {
          id: 1,
          title: 'ASCII字形生成器',
          logo: '/images/logo/ascii_word_pic.png',
          desc: '在线生成字形ASCII画',
          url: '/asciiWordPic/',
          cateId: 3,
          cate: '文本处理',
        },
      ]
    },
    {
      id: 4,
      title: '教育学术',
      icon: '',
      list: [
        {
          id: 1,
          title: '单位换算',
          logo: '/images/logo/unit.png',
          desc: '在线重量、长度、面积、时间、角度、速度、温度、压力、热量、功率等换算',
          url: '/unit/',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '摩斯电码',
          logo: '/images/logo/medium.png',
          desc: '支持中文的摩斯电码编码解码',
          url: '/morse/',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '常用进制转换',
          logo: '/images/logo/scaletran.png',
          desc: '在线进制转换工具,可在2到64进制之间相互转换',
          url: '/scaletran/',
          cateId: 4,
          cate: '教育学术',
        },
        {
          id: 1,
          title: 'ASCII码表',
          logo: '/images/logo/ascii.png',
          desc: 'ASCII码表,控制代码、标准ASCII字符和非标准ASCII字符对照表',
          url: '/ascii/',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '长度单位转换',
          logo: '/images/logo/length.png',
          desc: '长度转换工具-支持国际长度单位，中国传统长度单位，英制长度单位',
          url: '/unit/?active=length',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '面积单位转换',
          logo: '/images/logo/area.png',
          desc: '面积转换工具-支持国际面积单位，中国传统面积单位，英制面积单位',
          url: '/unit/?active=area',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '重量单位转换',
          logo: '/images/logo/weight.png',
          desc: '重量转换工具-支持国际重量单位，中国传统重量单位，英制重量单位(常衡制和金衡制)',
          url: '/unit/?active=weight',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '时间单位转换',
          logo: '/images/logo/time_unit.png',
          desc: '时间单位转换工具-支持国际时间单位',
          url: '/unit/?active=time',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '温度单位转换',
          logo: '/images/logo/temperature.png',
          desc: '温度单位转换工具-支持国际温度单位',
          url: '/unit/?active=temperature',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '压力单位转换',
          logo: '/images/logo/pressure.png',
          desc: '压力单位转换工具-Pa/kPa/hPa/MPa/bar/torr/psi等',
          url: '/unit/?active=pressure',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '热量单位转换',
          logo: '/images/logo/heat.png',
          desc: '热量单位转换工具-Wh/mWh/kWh/MWh/J/kJ等',
          url: '/unit/?active=heat',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '功率单位转换',
          logo: '/images/logo/power.png',
          desc: '功率单位转换工具-W/mW/kW/MW/GW等',
          url: '/unit/?active=power',
          cateId: 4,
          cate: '教育学术'
        },
      ]
    },
    {
      id: 5,
      title: '图片处理',
      icon: '',
      list: [
        {
          id: 1,
          title: '二维码生成',
          logo: '/images/logo/qrcode.png',
          desc: '在线生成带logo、透明、艺术的二维码',
          url: '/qrcode/',
          cateId: 5,
          cate: '图片处理'
        },
        {
          id: 1,
          title: '在线图片处理',
          logo: '/images/logo/img.png',
          desc: '在线图片裁剪，标注，滤镜，画等操作',
          url: '/signimage/',
          cateId: 5,
          cate: '图片处理',
        },
        {
          id: 1,
          title: '文本转图片',
          logo: '/images/logo/text_to_img.png',
          desc: '把文本转换成图片，生成长图，具有超多个性文字排版',
          url: '/textToImg/',
          cateId: 5,
          cate: '图片处理'
        },
        {
          id: 1,
          title: '图片分割',
          logo: '/images/logo/imgCut.png',
          desc: '将图片分割成四宫格、九宫格、十六宫格，支持自定义行与列',
          url: '/imgCut/',
          cateId: 5,
          cate: '图片处理',
        },
      ]
    },
    {
      id: 8,
      title: '数据图表',
      icon: '',
      list: [
        {
          id: 1,
          title: '柱状图',
          logo: '/images/logo/bar.png',
          desc: '在线制作柱状图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/bar/',
          cateId: 8,
          cate: '数据图表',
        },{
          id: 1,
          title: '折线图',
          logo: '/images/logo/line.png',
          desc: '在线制作折线图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/line/',
          cateId: 8,
          cate: '数据图表',
        },
        {
          id: 1,
          title: '饼图',
          logo: '/images/logo/pie.png',
          desc: '在线制作饼图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/pie/',
          cateId: 8,
          cate: '数据图表',
        },
        {
          id: 1,
          title: '散点图',
          logo: '/images/logo/scatter.png',
          desc: '在线制作散点图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/scatter/',
          cateId: 8,
          cate: '数据图表',
        }
      ]
    },
    {
      id: 9,
      title: '选择随机',
      icon: '',
      list: [
        {
          id: 1,
          title: '生成随机数',
          logo: '/images/logo/random.png',
          desc: '可定制范围内进行随机数字，可用于抽奖、点名等用途',
          url: '/random/',
          cateId: 9,
          cate: '选择随机'
        },
        {
          id: 1,
          title: '帮我决定',
          logo: '/images/logo/choose.png',
          desc: '选择困难，难以决定，今天吃什么，现在做什么，自定义选项都给你安排的明明白白',
          url: '/decision/',
          cateId: 9,
          cate: '选择随机'
        },
        {
          id: 1,
          title: '抛硬币',
          logo: '/images/logo/coin.png',
          desc: '在线抛硬币，选择困难那么交给硬币来帮你选择吧',
          url: '/coin/',
          cateId: 9,
          cate: '选择随机',
        },
        {
          id: 1,
          title: '投骰子',
          logo: '/images/logo/dice.png',
          desc: '在线投骰子，可自定义骰子数量，简单好用的骰子工具',
          url: '/dice/',
          cateId: 9,
          cate: '选择随机',
        },
      ]
    },
    // {
    //   id: 6,
    //   title: '查询相关',
    //   icon: '',
    //   list: [
    //     {
    //       id: 1,
    //       title: 'IP查询',
    //       logo: '/images/logo/IP.png',
    //       desc: '在线查询ip地址、ip归属地',
    //       url: '/ip',
    //       cateId: 6,
    //       cate: '查询相关',
    //     },
    //     {
    //       id: 1,
    //       title: '网站favicon获取',
    //       logo: '/images/logo/text_to_img.png',
    //       desc: '获取网站logo、icon、favicon、标题、关键词、描述等信息',
    //       url: '/webInfo',
    //       cateId: 6,
    //       cate: '查询相关',
    //     }
    //   ]
    // },
    {
      id: 7,
      title: '其他工具',
      icon: '',
      list: [
        {
          id: 1,
          title: '数字转金额大写',
          logo: '/images/logo/numberToChinese.png',
          desc: '在线数字一键转换成人民币大写，中文大写转换数字',
          url: '/numberToChinese/',
          cateId: 7,
          cate: '其他工具'
        },
        {
          id: 1,
          title: '手持弹幕',
          logo: '/images/logo/dm.png',
          desc: '手持滚动弹幕',
          url: '/barrage/',
          cateId: 7,
          cate: '其他工具',
        },
        {
          id: 1,
          title: '色板',
          logo: '/images/logo/palettes.png',
          desc: '包含纯色、渐变与阶梯色和常用色彩组合',
          url: '/palettes/',
          cateId: 7,
          cate: '其他工具'
        },
        {
          id: 1,
          title: 'Color选择器',
          logo: '/images/logo/color_picker.png',
          desc: '颜色选择器、在各种颜色空间如十六进制、rgb、hsl、css等等之间转换颜色',
          url: '/ColorPicker/',
          cateId: 7,
          cate: '其他工具'
        }
      ]
    }
  ]
}

//工具list
export function toolsList() {
  let list = [] as any[]
  let toolsCate = getToolsCate()
  for (let item in toolsCate) {
    for (let _item in toolsCate[item].list) {
      list.push(toolsCate[item].list[_item])
    }
  }
  return list
}

/**
 * url为键名的工具list map
 * @returns 
 */
export function urlKeyMap() {
  // let toolsMapByUrlKey = new Map()
  // let list = toolsList()
  // for (let item in list) {
  //   toolsMapByUrlKey.set(list[item].url, list[item])
  // }
  // return toolsMapByUrlKey
}

//获取工具
export function getTools(data: ToolsReqData) {
  //接收参数
  const { cateId, title } = data
  //获取工具list
  let list = toolsList()

  //标题筛选
  if (title != '') {
    list = list.filter(item => {
      let tmpValue = item.title.toLowerCase()
      let tmpDesc = item.desc.toLowerCase()
      console.log(tmpValue.indexOf(title.toLowerCase()))
      return tmpValue.indexOf(title.toLowerCase()) !== -1 || tmpDesc.indexOf(title.toLowerCase()) !== -1;
    });
  }
  //分类筛选
  if (cateId > 0) {
    list = list.filter(item => {
      return item.cateId == cateId;  
    });
  }
  return list
}

const ToolsExport = {
  getTools,
  getToolsCate,
  toolsList,
};

export default ToolsExport;