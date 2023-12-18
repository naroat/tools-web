<script setup lang="ts">
import { reactive, onMounted,ref } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
// import { copy } from '@/utils/string'
const info = reactive({
  title: "帮我决定",
  scope: '', //多个用`,`隔开
  randomVal: '',
  checked: '0',
  food: '沙县,烧腊,小炒肉,兰州拉面,汤饭,黄焖鸡,卤肉饭,蛋炒饭,羊肉粉,螺蛳粉,猪脚饭,白切鸡,肯德基,火锅,烧烤,泡面,西北风,煎饼果子',
  subject: '电影,听音乐,游戏,逛街,看电视,睡觉,吃饭,清洁,锻炼,学习,发呆,散步,购物,回家,唱歌',
})

const chooseStatus = ref(false)

const changeCheckBox = (val: any) => {
  switch(val) {
    case '0': 
      info.scope = info.food
      break;
    case '1': 
      info.scope = info.subject
      break;
    default:
      info.scope = ''
      break;
  }
}

const init = () => {
  changeCheckBox(info.checked)
}

//选择
const choose = () => {
  chooseStatus.value = true
  let count = 0
  let scopeList = info.scope.split(',')
  const chooseInterval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * scopeList.length); 
      info.randomVal = scopeList[randomNum]
      count++
      if (count > 10) {
        clearTimeout(chooseInterval)
        chooseStatus.value = false
      }
  }, 50)
}

//clear
const clear = () => {
  info.scope = ''
  info.checked = ''
  info.randomVal = ''
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="flex flex-col mt-3 ml-4 flex-1 mr-10">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="">
      <div>
        <el-radio-group v-model="info.checked" @change="changeCheckBox">
          <el-radio label="0" size="large">吃什么</el-radio>
          <el-radio label="1" size="large">干什么</el-radio>
        </el-radio-group>
      </div>

      <div>
        <el-input type="textarea" v-model="info.scope" :rows="5"></el-input>
      </div>

      <div class="text-5xl h-24 leading-[6rem]" v-if="info.randomVal != ''">
        {{ info.randomVal }}
        <!-- <el-text class=""></el-text> -->
      </div>

      <div class="mt-3">
        <el-button @click="choose" v-if="!chooseStatus" type="primary">帮我决定</el-button>
        <el-button @click="choose" type="primary" disabled v-else>决定中...</el-button>
        <el-button @click="clear">清空</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>