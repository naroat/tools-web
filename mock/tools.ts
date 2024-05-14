//获取tools
function getTools() {
  let tools = [] as any[]
  let toolsCate = getToolsCate()
  for (let item in toolsCate) {
    for (let _item in toolsCate[item].list) {
      tools.push(toolsCate[item].list[_item])
    }
  }
  return tools
}

//获取tools分类与对应的工具
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
          logo: '/images/logo/keywords.png',
          desc: '密码生成器、随机字符串生成,批量生成',
          url: '/random_password',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'URL编码/解码',
          logo: '/images/logo/url.png',
          desc: 'URL在线编码解码工具（UrlEncode编码 和 UrlDecode解码）',
          url: '/urlencode',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'UUID生成器',
          logo: '/images/logo/uuid.png',
          desc: '批量生成UUID',
          url: '/uuid',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: '时间戳转换',
          logo: '/images/logo/Time.png',
          desc: '在线时间戳转换工具以及获取当前时间戳',
          url: '/timetran',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'MD5在线加密',
          logo: '/images/logo/md5.png',
          desc: 'MD5在线加密,长度包含32位、16位',
          url: '/MD5',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'Json在线转换',
          logo: '/images/logo/json.png',
          desc: '在线编辑json, 语法检查',
          url: '/json',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: '正则测试工具',
          logo: '/images/logo/reg.png',
          desc: '正则表达式测试工具, 常用正则表达式',
          url: '/reg',
          cateId: 2,
          cate: '开发运维',
        },
        {
          id: 1,
          title: 'Unicode转中文',
          logo: '/images/logo/union.png',
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
          logo: '/images/logo/diff.png',
          desc: '文本差异比对支持中文、英文、代码比对',
          url: '/diff',
          cateId: 3,
          cate: '文本处理'
        },
        {
          id: 1,
          title: 'markdown编辑器',
          logo: '/images/logo/file-markdown-fill.png',
          desc: '在线创建或编辑markdown, 实时预览，导出markdown',
          url: '/markdown',
          cateId: 3,
          cate: '文本处理'
        },
        {
          id: 1,
          title: '字数统计',
          logo: '/images/logo/wordCount.png',
          desc: '在线统计字符串的字数、段落、标点符号数量',
          url: '/wordCount',
          cateId: 3,
          cate: '文本处理',
        },
        {
          id: 1,
          title: '文本去重',
          logo: '/images/logo/textRemoveDuplicate.png',
          desc: '可以删除或去除文本或字符串中的重复行',
          url: '/textRemoveDuplicate',
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
          url: '/unit',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '摩斯电码',
          logo: '/images/logo/medium.png',
          desc: '支持中文的摩斯电码编码解码',
          url: '/morse',
          cateId: 4,
          cate: '教育学术'
        },
        {
          id: 1,
          title: '常用进制转换',
          logo: '/images/logo/scaletran.png',
          desc: '在线进制转换工具,可在2到64进制之间相互转换',
          url: '/scaletran',
          cateId: 4,
          cate: '教育学术',
        },
        {
          id: 1,
          title: 'ASCII码表',
          logo: '/images/logo/ascii.png',
          desc: 'ASCII码表,控制代码、标准ASCII字符和非标准ASCII字符对照表',
          url: '/ascii',
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
          url: '/qrcode',
          cateId: 5,
          cate: '图片处理'
        },
        {
          id: 1,
          title: '在线图片处理',
          logo: '/images/logo/img.png',
          desc: '在线图片裁剪，标注，滤镜，画等操作',
          url: '/signimage',
          cateId: 5,
          cate: '图片处理',
        },
        {
          id: 1,
          title: '文本转图片',
          logo: '/images/logo/text_to_img.png',
          desc: '把文本转换成图片，生成长图，具有超多个性文字排版',
          url: '/textToImg',
          cateId: 5,
          cate: '图片处理'
        },
        {
          id: 1,
          title: '图片分割',
          logo: '/images/logo/imgCut.png',
          desc: '将图片分割成四宫格、九宫格、十六宫格，支持自定义行与列',
          url: '/imgCut',
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
          url: '/bar',
          cateId: 8,
          cate: '数据图表',
        },{
          id: 1,
          title: '折线图',
          logo: '/images/logo/line.png',
          desc: '在线制作折线图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/line',
          cateId: 8,
          cate: '数据图表',
        },
        {
          id: 1,
          title: '饼图',
          logo: '/images/logo/pie.png',
          desc: '在线制作饼图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/pie',
          cateId: 8,
          cate: '数据图表',
        },
        {
          id: 1,
          title: '散点图',
          logo: '/images/logo/scatter.png',
          desc: '在线制作散点图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/scatter',
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
          url: '/random',
          cateId: 9,
          cate: '选择随机'
        },
        {
          id: 1,
          title: '帮我决定',
          logo: '/images/logo/choose.png',
          desc: '选择困难，难以决定，今天吃什么，现在做什么，自定义选项都给你安排的明明白白',
          url: '/decision',
          cateId: 9,
          cate: '选择随机'
        },
        {
          id: 1,
          title: '抛硬币',
          logo: '/images/logo/coin.png',
          desc: '在线抛硬币，选择困难那么交给硬币来帮你选择吧',
          url: '/coin',
          cateId: 9,
          cate: '选择随机',
        },
        {
          id: 1,
          title: '投骰子',
          logo: '/images/logo/dice.png',
          desc: '在线投骰子，可自定义骰子数量，简单好用的骰子工具',
          url: '/dice',
          cateId: 9,
          cate: '选择随机',
        },
      ]
    },
    {
      id: 6,
      title: '查询相关',
      icon: '',
      list: [
        // {
        //   id: 1,
        //   title: 'IP查询',
        //   logo: '/images/logo/IP.png',
        //   desc: '在线查询ip地址、ip归属地',
        //   url: '/ip',
        //   cateId: 6,
        //   cate: '查询相关',
        // },
        {
          id: 1,
          title: '网站favicon获取',
          logo: '/images/logo/text_to_img.png',
          desc: '获取网站logo、icon、favicon、标题、关键词、描述等信息',
          url: '/webInfo',
          cateId: 6,
          cate: '查询相关',
        }
      ]
    },
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
          url: '/numberToChinese',
          cateId: 7,
          cate: '其他工具'
        },
        {
          id: 1,
          title: '手持弹幕',
          logo: '/images/logo/dm.png',
          desc: '手持滚动弹幕',
          url: '/barrage',
          cateId: 7,
          cate: '其他工具',
        },
        {
          id: 1,
          title: '色板',
          logo: '/images/logo/palettes.png',
          desc: '包含纯色、渐变与阶梯色和常用色彩组合',
          url: '/palettes',
          cateId: 7,
          cate: '其他工具'
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
          let tmpDesc = item.desc.toLowerCase()
          return tmpValue.indexOf(title.toLowerCase()) !== -1 || tmpDesc.indexOf(title.toLowerCase()) !== -1;
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