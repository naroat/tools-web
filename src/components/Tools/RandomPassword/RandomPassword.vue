<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import { copy, genRandomStrByChars } from '@/utils/string'
import { ElMessage } from 'element-plus'
const info = reactive({
  title: "随机密码生成",
  char: '',
  pwLen: 10,
  pwNum: 5,
  resStr: '',
  autosize: {
    minRows: 5
  },
  checkedUpper: true,
  checkedLower: true,
  checkedNum: true,
  checkedSign: false,
  charNum: '0123456789',
  charUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  charLower: 'abcdefghijklmnopqrstuvwxyz',
  cahrSign: '~!@#$%^&*()_+',
})

//生成密码
const gen = () => {
  //包含字符验证
  if (info.char == '') {
    ElMessage({
      message: "包含字符不能为空",
      type: "warning",
      duration: 1500
    })
    return
  }

  //生成长度验证
  if (info.pwLen > 100) {
    ElMessage({
      message: "生成长度范围在1~100",
      type: "warning",
      duration: 1500
    })
    return
  }

  //生成数量验证
  if (info.pwNum > 100) {
    ElMessage({
      message: "生成数量范围在1~100",
      type: "warning",
      duration: 1500
    })
    return
  }
  
  //清空旧数据
  info.resStr = ''

  //按数量生成密码
  for (let i = 1; i <= info.pwNum; i++) {
    let ext = '\n'
    if (i == info.pwNum) {
      ext = ''
    }
    info.resStr += genRandomStrByChars(info.char, info.pwLen) + ext
  }
}

const changeCheckBox = (val: any, type: number) => {
  switch(type) {
    case 0: 
      //设置数字字符
      setChar(val, /\d+/g, info.charNum)
      break;
    case 1: 
      //设置小写字母字符
      setChar(val, /[a-z]/g, info.charLower)
      break;
    case 2: 
      //设置大写字母字符
      setChar(val, /[A-Z]/g, info.charUpper)
      break;
    case 3: 
      //设置特殊符号字符
      setChar(val, /[~!@#$%^&*()_+]/g, info.cahrSign)
      break;
    default:
      info.char = ''
      break;
  }
}

//设置字符
const setChar = (val: boolean, reg: RegExp, charType: string) => {
  if (val == true) {
      //添加
      info.char += charType
    } else {
      //清除
      info.char = info.char.replace(reg, "")
    }
}

//copy
const copyRes = async (resStr: string) => {
  copy(resStr)
}

onMounted(() => {
  //设置初始字符
  changeCheckBox(info.checkedNum, 0)
  changeCheckBox(info.checkedLower, 1)
  changeCheckBox(info.checkedUpper, 2)
  changeCheckBox(info.checkedSign, 3)
})
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <el-text>密码组合</el-text>
      <div>
        <el-checkbox v-model="info.checkedNum" label="数字(0-9)"  @change="(val: any) => (changeCheckBox(val, 0))"/>
        <el-checkbox v-model="info.checkedLower" label="小写字母(a-z)"  @change="(val: any) => (changeCheckBox(val, 1))"/>
        <el-checkbox v-model="info.checkedUpper" label="大写字母(A-Z)" @change="(val: any) => (changeCheckBox(val, 2))"/>
        <el-checkbox v-model="info.checkedSign" label="其他符号(~!@#$%^&*()-+_=,.)"  @change="(val: any) => (changeCheckBox(val, 3))"/>
      </div>
      <div>
        <el-input class="" v-model="info.char">
          <template #prepend>包含字符:</template>
        </el-input>
        <el-input v-model="info.pwLen" placeholder="范围1~100" class="mt-3" max="100" type="number">
          <template #prepend>生成长度:</template>
        </el-input>
        <el-input v-model="info.pwNum" placeholder="范围1~100" class="mt-3" max="100" type="number">
          <template #prepend>生成数量:</template>
        </el-input>
      </div>
      <div class="mt-3 mb-3">
        <el-button type="primary" @click="gen">生成密码</el-button>
        <el-button type="primary" @click="copyRes(info.resStr)">复制全部</el-button>
      </div>
      <!-- res -->
      <div>
        <el-input type="textarea" :autosize="info.autosize" v-model="info.resStr"></el-input>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>