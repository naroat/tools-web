//对外暴露配置路由(常量路由)
export const constantRoute = [
  //首页
  {
    path: '/',
    component: () => import('@/components/Home/Home.vue'),
    name: 'home',
    meta: {
      keywords: 'tools-web,在线工具,开发人员工具,时间戳转换,加密,解密,md5,进制转换,二维码,正则表达式,json格式化,照片处理,字数统计',
      description: 'tools-web,在线工具,在线工具大全,开发人员工具,日常生活工具,办公助手,时间戳转换,加密,解密,md5,进制转换,二维码,正则表达式,json格式化,照片处理,字数统计',
    }
  },
  //工具
  {
    path: '/timetran',
    component: () => import('@/components/Tools/TimeTran/TimeTran.vue'),
    name: 'timetran',
    meta: {
      title: "时间戳转换",
      keywords: '时间,日期转换时间戳,Unix时间戳',
      description: 'Unix时间戳转换可以把Unix时间转成北京时间。',
    }
  },
  {
    path: '/MD5',
    component: () => import('@/components/Tools/MD5/MD5.vue'),
    name: 'MD5',
    meta: {
      title: "MD5在线加密",
      keywords: 'md5加密，md5在线加密，md5',
      description: '在线md5加密，一键生成md5加密字符串，可生成16位或32位md5加密字符串，md5双重加密',
    }
  },
  {
    path: '/json',
    component: () => import('@/components/Tools/JsonTran/JsonTran.vue'),
    name: 'json',
    meta: {
      title: "Json在线转换",
      keywords: 'json编辑器，json格式化,json压缩,json转义,json去转义',
      description: 'json编辑器,json解析,json格式化,json压缩,json转义,json去转义',
    }
  },
  {
    path: '/reg',
    component: () => import('@/components/Tools/RegTest/RegTest.vue'),
    name: 'reg',
    meta: {
      title: "正则表达式测试",
      keywords: '正则表达式测试工具,常用正则表达式,在线正则表达式',
      description: '正则表达式测试工具,常用正则表达式,在线正则表达式',
    }
  },
  {
    path: '/unicode',
    component: () => import('@/components/Tools/Unicode/Unicode.vue'),
    name: 'unicode',
    meta: {
      title: "Unicode转中文",
      keywords: '在线Unicode编码转换，中文转Unicode，Unicode转中文',
      description: '在线Unicode编码转换，中文转Unicode，Unicode转中文，在文本框里输入要转换的内容，然后点击要转换的类型按钮，转换完成后即可看到对应的内容。..',
    }
  },
  {
    path: '/wordcount',
    component: () => import('@/components/Tools/WordCount/WordCount.vue'),
    name: 'wordcount',
    meta: {
      title: "在线字数统计",
      keywords: '在线字数计算器,计算字数,在线字数统计器,字数计数器',
      description: '在线字数计数器,主要是方便计算字数，以控制文字数量的小工具(小说作者、论文、文案文档、文字编辑必备工具)。',
    }
  },
  {
    path: '/ip',
    component: () => import('@/components/Tools/Ip/Ip.vue'),
    name: 'ip',
    meta: {
      title: "IP查询",
      keywords: 'ip,ip查询,ip地址查询,ip138,查ip,我的ip,公网ip,ip归属地查询',
      description: '公网ip地址归属地查询',
    }
  },
  {
    path: '/scaletran',
    component: () => import('@/components/Tools/ScaleTran/ScaleTran.vue'),
    name: 'scaletran',
    meta: {
      title: "常用进制转换",
      keywords: '进制转换,进制转换工具,10进制转2进制,2进制转10进制,10进制转62进制,62进制转10进制',
      description: '常用进制转换工具，支持32进制以上进制转换',
    }
  },
  {
    path: '/signimage',
    component: () => import('@/components/Tools/SignImage/SignImage.vue'),
    name: 'signimage',
    meta: {
      title: "在线编辑图片",
      keywords: '图片裁剪，图片滤镜，图片旋转，图片编辑，美化图片',
      description: '图片裁剪，图片滤镜，图片旋转，图片编辑，美化图片',
    }
  },
  {
    path: '/random_password',
    component: () => import('@/components/Tools/RandomPassword/RandomPassword.vue'),
    name: 'random_password',
    meta: {
      title: "随机密码生成",
      keywords: '在线生成随机密码，批量生成随机密码，密码生成',
      description: '在线随机密码生成',
    }
  },
  {
    path: '/urlencode',
    component: () => import('@/components/Tools/UrlEncode/UrlEncode.vue'),
    name: 'urlencode',
    meta: {
      title: "URL编码/解码",
      keywords: 'url编码，url解码，url加密，url解密',
      description: '在线url编码，在线url解码工具',
    }
  },
  {
    path: '/ascii',
    component: () => import('@/components/Tools/ASCII/ASCII.vue'),
    name: 'ascii',
    meta: {
      title: "ASCII码表",
      keywords: 'ascii，ascii码表,ascii对照表，ascii控制字符，ascii打印字符，ascii扩展码',
      description: 'ascii全面对照表，包含控制字符，打印字符，扩展码',
    }
  },
  {
    path: '/uuid',
    component: () => import('@/components/Tools/UUID/UUID.vue'),
    name: 'uuid',
    meta: {
      title: "UUID生成器",
      keywords: 'UUID生成器',
      description: 'uuid生成器，批量uuid生成',
    }
  },
  {
    path: '/barrage',
    component: () => import('@/components/Tools/Barrage/Barrage.vue'),
    name: 'barrage',
    meta: {
      title: "手持弹幕",
      keywords: '手持弹幕，弹幕工具',
      description: '手持弹幕是一种新型的互动沟通工具，可以方便地为各种户外活动、演出嘉年华等活动增加趣味性和互动性。手持弹幕具有轻便、易携带、易操作等优点，可以让每个参与者都变成活动的一部分。同时，手持弹幕还可以通过预先编写的文本、表情等形式，表达参与者的情感和想法，实现沟通互动。在社交媒体时代，手持弹幕的使用也带来了更广泛的社交效应，增加了活动的互动性和传播度。无论是举办方还是参与者，手持弹幕都是一个非常有价值的互动工具。',
    }
  },
  {
    path: '/palettes',
    component: () => import('@/components/Tools/Palettes/Palettes.vue'),
    name: 'palettes',
    meta: {
      title: "色板",
      keywords: '色板，颜色板',
      description: '在线复制颜色，好看的颜色组合色板',
    }
  },
  {
    path: '/unit',
    component: () => import('@/components/Tools/Unit/Unit.vue'),
    name: 'unit',
    meta: {
      title: "单位转换",
      keywords: '在线单位换算,长度单位换算,面积单位换算,时间单位换算,重量单位换算,温度单位换算,压力单位换算,热量单位换算,功率单位换算。',
      description: '在线单位换算,长度单位换算,面积单位换算,时间单位换算,重量单位换算,温度单位换算,压力单位换算,热量单位换算,功率单位换算。',
    }
  },
  {
    path: '/qrcode',
    component: () => import('@/components/Tools/Qrcode/Qrcode.vue'),
    name: 'qrcode',
    meta: {
      title: "二维码生成",
      keywords: '二维码,qrcode,二维码制作,二维码生成,微信二维码',
      description: '在线生成二维码,logo二维码',
    }
  },
  {
    path: '/decision',
    component: () => import('@/components/Tools/Decision/Decision.vue'),
    name: 'decision',
    meta: {
      title: "帮我决定",
      keywords: '选择困难，难以决定，今天吃什么，现在做什么，自定义选项都给你安排的明明白白',
      description: '选择困难症，自定义选择内容',
    }
  },
  {
    path: '/morse',
    component: () => import('@/components/Tools/Morse/Morse.vue'),
    name: 'morse',
    meta: {
      title: "摩斯电码",
      keywords: 'morse电码,摩斯电码',
      description: '摩斯电码编码解码',
    }
  },
  {
    path: '/random',
    component: () => import('@/components/Tools/Random/Random.vue'),
    name: 'random',
    meta: {
      title: "生成随机数",
      keywords: '随机数生成,随机数',
      description: '可定制范围内进行随机数字，可用于抽奖、点名等用途',
    }
  },
  {
    path: '/numberToChinese',
    component: () => import('@/components/Tools/NumberToChinese/NumberToChinese.vue'),
    name: 'numberToChinese',
    meta: {
      title: "数字转金额大写",
      keywords: '数字转中文,数字转大写,中文转数字,大写转数字,数字中文互转',
      description: '在线数字一键转换成人民币大写，中文大写金额数字应用正楷或行书填写',
    }
  },
  {
    path: '/diff',
    component: () => import('@/components/Tools/Diff/Diff.vue'),
    name: 'diff',
    meta: {
      title: "文本对比",
      keywords: '中文比对,代码比对，代码对比，文本比对，英文比对',
      description: '文本差异比对支持中文、英文、代码比对',
    }
  },
  {
    path: '/markdown',
    component: () => import('@/components/Tools/Markdown/Markdown.vue'),
    name: 'markdown',
    meta: {
      title: "markdown编辑器",
      keywords: '在线创建或编辑markdown, 实时预览，导出markdown',
      description: '在线markdown编辑器',
    }
  },
  {
    path: '/textToImg',
    component: () => import('@/components/Tools/TextToImg/TextToImg.vue'),
    name: 'textToImg',
    meta: {
      title: "文本转图片",
      keywords: '文本生成图片，文本生成长图，推广长图',
      description: '把文本转换成图片，生成长图，具有超多个性文字排版',
    }
  },
  {
    path: '/webInfo',
    component: () => import('@/components/Tools/WebInfo/WebInfo.vue'),
    name: 'webInfo',
    meta: {
      title: "网站favicon获取",
      keywords: '获取网站logo,获取网站icon,获取网站favicon,获取网站标题,获取网站关键词,获取网站描述',
      description: '获取网站logo、icon、favicon、标题、关键词、描述等信息',
    }
  },
  {
    path: '/bar',
    component: () => import('@/components/Tools/Chart/Bar/Bar.vue'),
    name: 'bar',
    meta: {
      title: "柱状图",
      keywords: '柱状图',
      description: '在线制作柱状图，像做表格一样制作可视化图表，支持导出静态或动态图表',
    }
  },
  {
    path: '/line',
    component: () => import('@/components/Tools/Chart/Line/Line.vue'),
    name: 'line',
    meta: {
      title: "折线图",
      keywords: '折线图',
      description: '在线制作折线图，像做表格一样制作可视化图表，支持导出静态或动态图表',
    }
  },
  {
    path: '/Pie',
    component: () => import('@/components/Tools/Chart/Pie/Pie.vue'),
    name: 'pie',
    meta: {
      title: "饼图",
      keywords: '饼图',
      description: '在线制作饼图，像做表格一样制作可视化图表，支持导出静态或动态图表',
    }
  },
  {
    path: '/Scatter',
    component: () => import('@/components/Tools/Chart/Scatter/Scatter.vue'),
    name: 'scatter',
    meta: {
      title: "散点图",
      keywords: '散点图',
      description: '在线制作散点图，像做表格一样制作可视化图表，支持导出静态或动态图表',
    }
  },
  {
    path: '/Coin',
    component: () => import('@/components/Tools/Coin/Coin.vue'),
    name: 'coin',
    meta: {
      title: "抛硬币",
      keywords: '抛硬币,硬币',
      description: '在线抛硬币，选择困难那么交给硬币来帮你选择吧',
    }
  },
  {
    path: '/Dice',
    component: () => import('@/components/Tools/Dice/Dice.vue'),
    name: 'dice',
    meta: {
      title: "投骰子",
      keywords: '投骰子,骰子,自定义骰子',
      description: '在线投骰子，可自定义骰子数量，简单好用的骰子工具',
    }
  },
  {
    path: '/TextRemoveDuplicate',
    component: () => import('@/components/Tools/TextRemoveDuplicate/TextRemoveDuplicate.vue'),
    name: 'textRemoveDuplicate',
    meta: {
      title: "文本去重",
      keywords: '文本去重,文本排重，文本去除重复',
      description: '可以删除或去除文本或字符串中的重复行',
    }
  },
  {
    path: '/ImgCut',
    component: () => import('@/components/Tools/ImgCut/ImgCut.vue'),
    name: 'imgCut',
    meta: {
      title: "图片分割",
      keywords: '图片分割,图片切割,四宫格,九宫格,十六宫格',
      description: '将图片分割成四宫格、九宫格、十六宫格，支持自定义行与列',
    }
  },
  {
    path: '/HttpStatusCode',
    component: () => import('@/components/Tools/HttpStatusCode/HttpStatusCode.vue'),
    name: 'HttpStatusCode',
    meta: {
      title: "HTTP状态码",
      keywords: 'http状态码',
      description: '所有http状态对应的名称和含义解释',
    }
  },
  {
    path: '/jwt',
    component: () => import('@/components/Tools/JWT/JWT.vue'),
    name: 'jwt',
    meta: {
      title: "JWT解析",
      keywords: 'jwt解析,jwt解码，JSON Web Token解析',
      description: '解析和解码JSON Web Token（jwt）',
    }
  },
  {
    path: '/HtmlEntity',
    component: () => import('@/components/Tools/HtmlEntity/HtmlEntity.vue'),
    name: 'HtmlEntity',
    meta: {
      title: "html实体转义",
      keywords: 'html实体转义',
      description: 'html实体转义，实体转义成html',
    }
  },
  {
    path: '/ColorPicker',
    component: () => import('@/components/Tools/ColorPicker/ColorPicker.vue'),
    name: 'ColorPicker',
    meta: {
      title: "Color选择器",
      keywords: '颜色选择器,Color选择器',
      description: '颜色选择器、在各种颜色空间如十六进制、rgb、hsl、css等等之间转换颜色',
    }
  },
  {
    path: '/asciiWordPic',
    component: () => import('@/components/Tools/ASCIIWordPic/ASCIIWordPic.vue'),
    name: 'asciiWordPic',
    meta: {
      title: "Color选择器",
      keywords: '颜色选择器,Color选择器',
      description: '颜色选择器、在各种颜色空间如十六进制、rgb、hsl、css等等之间转换颜色',
    }
  },
  // 关于
  {
    path: '/about',
    component: () => import('@/components/Home/About.vue'),
    name: 'about',
    meta: {
      title: "关于",
      keywords: '关于ranblogs,关于工具站',
      description: '',
    }
  },
  //其他路由
  {
    path: '/404',
    component: () => import('@/components/404/404.vue'),
    name: '404',
    meta: {
      title: "404"
    }
  },
  {
    //重定向
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
