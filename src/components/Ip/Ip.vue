<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useToolsStore } from '@/store/modules/tools'
import { isIp } from '@/utils/verify'
import { ElMessage } from 'element-plus'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'

const info = reactive({
  title: "IP查询",
})

//store
const toolsStore = useToolsStore()
const params = reactive({
  ip: '',
})
//查询
const search = async (type: string) => {
  try {
    //通过点击获取ip信息
    if (type == 'click') {
      //验证是否ip地址
      if (!isIp(params.ip)) {
        ElMessage({
          message: "无效的ip地址",
          type: "warning",
          duration: 1500
        })
        return
      }
    }
    //获取信息
    await toolsStore.getIp(params)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  search('')
})
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="flex">
        <div class="mr-2 w-60">
          <el-input v-model="params.ip" ></el-input>
        </div>
       
        <el-button type="primary" @click="search('click')">查询</el-button>
      </div>
      <div class="mt-3 min-h-md bg-gray-100 p-3 mb-3 flex flex-col">
        <div class="bg-white p-2 font-bold text-xl">您的IP信息</div>
        <div class="bg-white p-2 flex">
          <div class="mr-1">运营商: </div>
          <div>{{ toolsStore.ipData.isp }}</div>
        </div>
        <div class="bg-white p-2 flex">
          <div class="mr-1">域名解析地址: </div>
          <div>{{ toolsStore.ipData.ip }}</div>
        </div>
        <div class="bg-white p-2 flex">
          <div class="mr-1">所在地理位置: </div>
          <div>{{ toolsStore.ipData.pos }}</div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>