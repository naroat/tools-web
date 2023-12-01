//获取tools
function getTools() {
  return [
    {
      id: 1,
      title: '时间戳转换',
      logo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '在线时间戳转换工具以及获取当前时间戳',
      url: '/timetran',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: 'MD5在线加密',
      logo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: 'MD5在线加密,长度包含32位、16位',
      url: '/MD5',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: 'Json在线转换',
      logo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '在线编辑json, 语法检查',
      url: '/json',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: '正则测试工具',
      logo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '正则表达式测试工具, 常用正则表达式',
      url: '/reg',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: 'Unicode转中文',
      logo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: 'Unicode和中文的相互转换',
      url: '/unicode',
      cateId: 2,
      cate: '开发运维',
    },
    {
      id: 1,
      title: '字数统计',
      logo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '在线统计字符串的字数、段落、标点符号数量',
      url: '/wordCount',
      cateId: 3,
      cate: '文本处理',
    },
    {
      id: 1,
      title: 'IP查询',
      logo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '在线查询ip地址、ip归属地',
      url: '/ip',
      cateId: 6,
      cate: '查询相关',
    },
    {
      id: 1,
      title: '常用进制转换',
      logo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '在线进制转换工具,可在2到64进制之间相互转换',
      url: '/scaletran',
      cateId: 4,
      cate: '教育学术',
    },
    {
      id: 1,
      title: '在线图片处理',
      logo: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '在线图片裁剪，标注，滤镜，画等操作',
      url: '/signimage',
      cateId: 5,
      cate: '设计工具',
    }
  ]
}

//获取tools分类
function getToolsCate() {
  return [
    {
      id: 2,
      title: '开发运维'
    },
    {
      id: 3,
      title: '文本处理'
    },
    {
      id: 4,
      title: '教育学术'
    },
    {
      id: 5,
      title: '设计工具'
    },
    {
      id: 6,
      title: '查询相关'
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
      //获取请求体携带过来的用户名与密码
      //调用获取用户信息函数,用于判断是否有此用户
      const list = getToolsCate()
      return { code: 200, message: 'ok', data: list }
    },
  }
]