<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import { Codemirror } from "vue-codemirror"
import { lineNumbers } from '@codemirror/view';

const info = reactive({
  title: "正则表达式测试",
  extensions: [lineNumbers()],
  reg: '',
  content: `一些测试实例:
邮箱1：demo@163.com
邮箱2：demo2@163.com
手机号：13012341234
url: http://tools.ranblogs.com、https://ranblogs.com
IP: 192.168.0.1
时间：2023-11-24
`,
  matchRes: '',
  matchNum: 0,
  isAll: true,
  isCase: false,
  isParseErr: false,
  parseErr: '',
  regList: [
    {
      id: 1,
      title: '匹配手机号',
      reg: '(13\\d|14[579]|15[^4\\D]|17[^49\\D]|18\\d)\\d{8}'
    },
    {
      id: 1,
      title: '匹配网址URL',
      reg: '(http|ftp|https):\\\/\\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?'
    },
    {
      id: 1,
      title: '匹配Email',
      reg: `\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}`
    },
    {
      id: 1,
      title: '匹配中文字符',
      reg: "[\u4e00-\u9fa5]"
    },
    {
      id: 1,
      title: '匹配双字节字符(包含汉字)',
      reg: "[^\x00-\xff]+"
    },
    {
      id: 1,
      title: '匹配18位身份证号',
      reg: "\\d{17}[0-9Xx]|\\d{15}"
    },
    {
      id: 1,
      title: '匹配整数',
      reg: "[1-9]\\d*"
    },
    {
      id: 1,
      title: '匹配IP(IPV4)',
      reg: "\\d{0,3}\\.\\d{0,3}\\.\\d{0,3}\\.\\d{0,3}"
    },
    {
      id: 1,
      title: '匹配日期(年-月-日)',
      reg: "(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)"
    },
  ]
})

//使用正则
const useReg = (reg: string) => {
  info.reg = reg
}

const clearOldRes = () => {
  info.matchNum = 0
  info.matchRes = ''
}

//测试匹配(执行匹配)
const execMatch = () => {
  //清除旧结果
  clearOldRes()
  //check
  if (info.reg == '') {
    return
  }
  
  let rule = ''
  //是否全局
  rule = info.isAll === true ? 'g' : ''
  //是否区分大小写
  rule += info.isCase === true ? 'i' : ''

  let pattern = new RegExp(info.reg, rule);
  let matchArr = info.content.match(pattern)
  
  if (info.isAll === true) {
    if (matchArr?.length) {
      info.matchNum = matchArr?.length
      for (let index in matchArr) {
        info.matchRes += matchArr[index] + `\n`
      }
    }
  } else {
    if (matchArr?.[0]) {
      info.matchRes = matchArr[0]
      info.matchNum = 1
    }
  }
}
</script>

<template>
  <div class="flex flex-col mt-3 ml-4 flex-1 mr-10">
    <DetailHeader :title="info.title"></DetailHeader>

    <div>
      <div>
        <codemirror
          v-model="info.content"
          placeholder=""
          :style="{ height: '300px' }"
          :autofocus="true"
          :indent-with-tab="true" 
          :tabSize="2"
          :extensions="info.extensions"
        />
      </div>

      <div class="mt-4">
        <el-text class="font-bold">常用正则：</el-text>
        <ul class="flex flex-wrap">
          <li v-for="(item, index) in info.regList" :key="index">
            <el-button link type="primary" @click="useReg(item.reg)" class="mr-2 mt-2">{{ item.title }}</el-button>
          </li>
        </ul>
        <div class="flex items-center mt-4">
          <el-input v-model="info.reg" class="mr-2" placeholder="正则表达式"></el-input>
          
          <div class="mr-2">
            <el-checkbox v-model="info.isAll" label="全局搜索" size="large"/>
          </div>
          <div class="mr-2">
            <el-checkbox v-model="info.isCase" label="忽略大小写" size="large" /> 
          </div>

          <el-button type="primary" @click="execMatch">测试匹配</el-button>
        </div>
      </div>

      <div class="mt-3 min-h-md bg-gray-100 p-3 mb-3">
        <el-text>共找到 {{ info.matchNum }} 处匹配结果</el-text>
        <el-input type="textarea" :rows="4" readonly v-model="info.matchRes"></el-input>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>