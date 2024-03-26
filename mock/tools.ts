//获取tools
function getTools() {
  return [
    {
      id: 1,
      title: '时间戳转换',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/Time.png',
      desc: '在线时间戳转换工具以及获取当前时间戳',
      url: '/timetran',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: 'MD5在线加密',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/Password%20fishing.png',
      desc: 'MD5在线加密,长度包含32位、16位',
      url: '/MD5',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: 'Json在线转换',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/json.png',
      desc: '在线编辑json, 语法检查',
      url: '/json',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: '正则测试工具',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/reg.png',
      desc: '正则表达式测试工具, 常用正则表达式',
      url: '/reg',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: 'Unicode转中文',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/union.png',
      desc: 'Unicode和中文的相互转换',
      url: '/unicode',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: '字数统计',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/ico_%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1_%E5%B7%A5%E4%BD%9C%E9%87%8F%E7%BB%9F%E8%AE%A1.png',
      desc: '在线统计字符串的字数、段落、标点符号数量',
      url: '/wordCount',
      cateId: 3,
      cate: '文本处理',
    },
    {
      id: 1,
      title: 'IP查询',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/IP.png',
      desc: '在线查询ip地址、ip归属地',
      url: '/ip',
      cateId: 6,
      cate: '查询相关',
    },
    {
      id: 1,
      title: '常用进制转换',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E8%BF%9B%E5%88%B6%E8%BD%AC%E6%8D%A2.png',
      desc: '在线进制转换工具,可在2到64进制之间相互转换',
      url: '/scaletran',
      cateId: 4,
      cate: '教育学术',
    },
    {
      id: 1,
      title: '在线图片处理',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/img.png',
      desc: '在线图片裁剪，标注，滤镜，画等操作',
      url: '/signimage',
      cateId: 5,
      cate: '设计工具',
    },
    {
      id: 1,
      title: '随机密码生成',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/keywords.png',
      desc: '密码生成器、随机字符串生成,批量生成',
      url: '/random_password',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: 'URL编码/解码',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/url.png',
      desc: 'URL在线编码解码工具（UrlEncode编码 和 UrlDecode解码）',
      url: '/urlencode',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: 'UUID生成器',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E7%BA%BF%E6%80%A7-%E7%94%9F%E6%88%90.png',
      desc: '批量生成UUID',
      url: '/uuid',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: '手持弹幕',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E5%BC%B9%E5%B9%95.png',
      desc: '手持滚动弹幕',
      url: '/barrage',
      cateId: 7,
      cate: '其他',
    },
    {
      id: 1,
      title: 'ASCII码表',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/icon_%E7%BC%96%E7%A0%81%E5%AF%B9%E7%85%A7.png',
      desc: 'ASCII码表,控制代码、标准ASCII字符和非标准ASCII字符对照表',
      url: '/ascii',
      cateId: 4,
      cate: '教育学术'
    },
    {
      id: 1,
      title: '单位换算',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E5%8D%95%E4%BD%8D%E6%8D%A2%E7%AE%97.png',
      desc: '在线重量、长度、面积、时间、角度、速度、温度、压力、热量、功率等换算',
      url: '/unit',
      cateId: 4,
      cate: '教育学术'
    },
    {
      id: 1,
      title: '色板',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E8%B0%83%E8%89%B2%E6%9D%BF.png',
      desc: '包含纯色、渐变与阶梯色和常用色彩组合',
      url: '/palettes',
      cateId: 5,
      cate: '设计工具'
    },
    {
      id: 1,
      title: '二维码生成',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E4%BA%8C%E7%BB%B4%E7%A0%81.png',
      desc: '在线生成带logo、透明、艺术的二维码',
      url: '/qrcode',
      cateId: 5,
      cate: '设计工具'
    },
    {
      id: 1,
      title: '帮我决定',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/choose.png',
      desc: '选择困难，难以决定，今天吃什么，现在做什么，自定义选项都给你安排的明明白白',
      url: '/decision',
      cateId: 7,
      cate: '其他'
    },
    {
      id: 1,
      title: '摩斯电码',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/medium.png',
      desc: '支持中文的摩斯电码编码解码',
      url: '/morse',
      cateId: 3,
      cate: '文本处理'
    },
    {
      id: 1,
      title: '生成随机数',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/randomnum.png',
      desc: '可定制范围内进行随机数字，可用于抽奖、点名等用途',
      url: '/random',
      cateId: 7,
      cate: '其他'
    },
    {
      id: 1,
      title: '数字转金额大写',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/text%20recognition.png',
      desc: '在线数字一键转换成人民币大写，中文大写转换数字',
      url: '/numberToChinese',
      cateId: 7,
      cate: '其他'
    },
    {
      id: 1,
      title: '文本对比',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/diff.png',
      desc: '文本差异比对支持中文、英文、代码比对',
      url: '/diff',
      cateId: 3,
      cate: '文本处理'
    },
    {
      id: 1,
      title: 'markdown编辑器',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/file-markdown-fill.png',
      desc: '在线创建或编辑markdown, 实时预览，导出markdown',
      url: '/markdown',
      cateId: 3,
      cate: '文本处理'
    },
    {
      id: 1,
      title: '文本转图片',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/text_to_img.png',
      desc: '把文本转换成图片，生成长图，具有超多个性文字排版',
      url: '/textToImg',
      cateId: 5,
      cate: '设计工具'
    },
    {
      id: 1,
      title: '网站favicon获取',
      logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/IP.png',
      desc: '获取网站logo、icon、favicon、标题、关键词、描述等信息',
      url: '/webInfo',
      cateId: 6,
      cate: '查询相关',
    },
    {
      id: 1,
      title: '柱状图',
      logo: '/src/assets/logo/bar.png',
      desc: '在线制作柱状图，像做表格一样制作可视化图表，支持导出静态或动态图表',
      url: '/bar',
      cateId: 8,
      cate: '数据图表',
    },
  ]
}

//获取tools分类已经对应的工具
function getToolsCate() {
  return [
    {
      id: 2,
      title: '开发运维',
      icon: '',
      list: [
        {
          id: 1,
          title: '随机密码生成',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/keywords.png',
          desc: '密码生成器、随机字符串生成,批量生成',
          url: '/random_password',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'URL编码/解码',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/url.png',
          desc: 'URL在线编码解码工具（UrlEncode编码 和 UrlDecode解码）',
          url: '/urlencode',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'UUID生成器',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E7%BA%BF%E6%80%A7-%E7%94%9F%E6%88%90.png',
          desc: '批量生成UUID',
          url: '/uuid',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: '时间戳转换',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/Time.png',
          desc: '在线时间戳转换工具以及获取当前时间戳',
          url: '/timetran',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'MD5在线加密',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/Password%20fishing.png',
          desc: 'MD5在线加密,长度包含32位、16位',
          url: '/MD5',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'Json在线转换',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/json.png',
          desc: '在线编辑json, 语法检查',
          url: '/json',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: '正则测试工具',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/reg.png',
          desc: '正则表达式测试工具, 常用正则表达式',
          url: '/reg',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'Unicode转中文',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/union.png',
          desc: 'Unicode和中文的相互转换',
          url: '/unicode',
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
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/diff.png',
          desc: '文本差异比对支持中文、英文、代码比对',
          url: '/diff',
          cateId: 3,
          cate: '文本处理'
        },
        {
          id: 1,
          title: 'markdown编辑器',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/file-markdown-fill.png',
          desc: '在线创建或编辑markdown, 实时预览，导出markdown',
          url: '/markdown',
          cateId: 3,
          cate: '文本处理'
        },
        {
          id: 1,
          title: '摩斯电码',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/medium.png',
          desc: '支持中文的摩斯电码编码解码',
          url: '/morse',
          cateId: 3,
          cate: '文本处理'
        },
        {
          id: 1,
          title: '字数统计',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/ico_%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1_%E5%B7%A5%E4%BD%9C%E9%87%8F%E7%BB%9F%E8%AE%A1.png',
          desc: '在线统计字符串的字数、段落、标点符号数量',
          url: '/wordCount',
          cateId: 3,
          cate: '文本处理',
        }
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
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E5%8D%95%E4%BD%8D%E6%8D%A2%E7%AE%97.png',
          desc: '在线重量、长度、面积、时间、角度、速度、温度、压力、热量、功率等换算',
          url: '/unit',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '常用进制转换',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E8%BF%9B%E5%88%B6%E8%BD%AC%E6%8D%A2.png',
          desc: '在线进制转换工具,可在2到64进制之间相互转换',
          url: '/scaletran',
          cateId: 4,
          cate: '教育学术',
        },
        {
          id: 1,
          title: 'ASCII码表',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/icon_%E7%BC%96%E7%A0%81%E5%AF%B9%E7%85%A7.png',
          desc: 'ASCII码表,控制代码、标准ASCII字符和非标准ASCII字符对照表',
          url: '/ascii',
          cateId: 4,
          cate: '教育学术'
        },
      ]
    },
    {
      id: 5,
      title: '设计工具',
      icon: '',
      list: [
        {
          id: 1,
          title: '色板',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E8%B0%83%E8%89%B2%E6%9D%BF.png',
          desc: '包含纯色、渐变与阶梯色和常用色彩组合',
          url: '/palettes',
          cateId: 5,
          cate: '设计工具'
        },
        {
          id: 1,
          title: '二维码生成',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E4%BA%8C%E7%BB%B4%E7%A0%81.png',
          desc: '在线生成带logo、透明、艺术的二维码',
          url: '/qrcode',
          cateId: 5,
          cate: '设计工具'
        },
        {
          id: 1,
          title: '在线图片处理',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/img.png',
          desc: '在线图片裁剪，标注，滤镜，画等操作',
          url: '/signimage',
          cateId: 5,
          cate: '设计工具',
        },
        {
          id: 1,
          title: '文本转图片',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/text_to_img.png',
          desc: '把文本转换成图片，生成长图，具有超多个性文字排版',
          url: '/textToImg',
          cateId: 5,
          cate: '设计工具'
        }
      ]
    },
    {
      id: 6,
      title: '查询相关',
      icon: '',
      list: [
        {
          id: 1,
          title: 'IP查询',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/IP.png',
          desc: '在线查询ip地址、ip归属地',
          url: '/ip',
          cateId: 6,
          cate: '查询相关',
        },
        {
          id: 1,
          title: '网站favicon获取',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/text_to_img.png',
          desc: '获取网站logo、icon、favicon、标题、关键词、描述等信息',
          url: '/webInfo',
          cateId: 6,
          cate: '查询相关',
        }
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
          logo: '/src/assets/logo/bar.png',
          desc: '在线制作柱状图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/bar',
          cateId: 8,
          cate: '数据图表',
        }
      ]
    },
    {
      id: 7,
      title: '其他',
      icon: '',
      list: [
        {
          id: 1,
          title: '生成随机数',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/randomnum.png',
          desc: '可定制范围内进行随机数字，可用于抽奖、点名等用途',
          url: '/random',
          cateId: 7,
          cate: '其他'
        },
        {
          id: 1,
          title: '数字转金额大写',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/text%20recognition.png',
          desc: '在线数字一键转换成人民币大写，中文大写转换数字',
          url: '/numberToChinese',
          cateId: 7,
          cate: '其他'
        },
        {
          id: 1,
          title: '帮我决定',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/choose.png',
          desc: '选择困难，难以决定，今天吃什么，现在做什么，自定义选项都给你安排的明明白白',
          url: '/decision',
          cateId: 7,
          cate: '其他'
        },
        {
          id: 1,
          title: '手持弹幕',
          logo: 'https://baseran2.oss-cn-shenzhen.aliyuncs.com/toools-web/icon/%E5%BC%B9%E5%B9%95.png',
          desc: '手持滚动弹幕',
          url: '/barrage',
          cateId: 7,
          cate: '其他',
        }
      ]
    }
  ]
}

export default [
  {
    url: '/v1/tools',
    method: 'get',//请求方式
    response: (request) => {
      //接收参数
      const { cateId, title } = request.query
      //调用获取用户信息函数,用于判断是否有此用户
      let list = getTools()
      //标题筛选
      if (title != '') {
        list = list.filter(item => {
          let tmpValue = item.title.toLowerCase()
          return tmpValue.indexOf(title.toLowerCase()) !== -1;
        });
      }
      //分类筛选
      if (cateId > 0) {
        list = list.filter(item => {
          return item.cateId == cateId;  
        });
      }
      return { code: 200, message: 'ok', data: list }
    },
  },
  {
    url: '/v1/tool/cates',
    method: 'get',//请求方式
    response: ({ body }) => {
      const list = getToolsCate()
      return { code: 200, message: 'ok', data: list }
    },
  },
  {
    url: '/v1/tool/recommends',
    method: 'get',//请求方式
    response: () => {
      let list = [] as any
      //获取推荐数量
      let num = 10
      const toolList = getTools()
      //使用Set数据结构来存储已经生成的随机数  
      const set = new Set();
      
      while (set.size < num) {  
         // 生成随机数 
        const randomNum = Math.floor(Math.random() * toolList.length); 
        // 如果随机数不在Set中，则添加到Set中并赋值给randomNumber变量  
        if (!set.has(randomNum)) { 
          set.add(randomNum);  
          list.push(toolList[randomNum])
        }  
      }  
      return { code: 200, message: 'ok', data: list }
    },
  }
]