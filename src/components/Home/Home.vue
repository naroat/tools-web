<script setup lang="ts">
import { reactive } from 'vue';
import { RouterLink } from "vue-router"
const info = reactive({
  cates: [
    {
      id: 1,
      value: '全部工具',
    },
    {
      id: 2,
      value: '文本处理'
    },
    {
      id: 3,
      value: '查询相关'
    },
    {
      id: 4,
      value: '教育学术'
    },
    {
      id: 5,
      value: '设计工具'
    },
    {
      id: 6,
      value: '开发运维'
    }
  ],
  tools: [
    {
      id: 1,
      value: '时间戳转换',
      img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '在线时间戳转换工具以及获取当前时间戳',
      url: '/timetran',
      cate: '开发运维',
    },
    {
      id: 1,
      value: 'MD5在线加密',
      img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: 'MD5在线加密,长度包含32位、16位',
      url: '/MD5',
      cate: '开发运维',
    },
    {
      id: 1,
      value: 'Json在线转换',
      img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '在线编辑json, 语法检查',
      url: '/json',
      cate: '开发运维',
    },
    {
      id: 1,
      value: '正则测试工具',
      img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '正则表达式测试工具, 常用正则表达式',
      url: '/reg',
      cate: '开发运维',
    },
    {
      id: 1,
      value: 'Unicode转中文',
      img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: 'Unicode和中文的相互转换',
      url: '/unicode',
      cate: '开发运维',
    },
    {
      id: 1,
      value: '字数统计',
      img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '在线统计字符串的字数、段落、标点符号数量',
      url: '/wordCount',
      cate: '文本处理',
    },
    {
      id: 1,
      value: 'IP查询',
      img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '在线查询ip地址、ip归属地',
      url: '/ip',
      cate: '查询相关',
    },
    {
      id: 1,
      value: '常用进制转换',
      img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '制转换器是一个在线进制转换工具,可在二进制、八进制、十进制、十六进制、三十二进制以及36以内任意进制之间相互转换',
      url: '/scaletran',
      cate: '教育学术',
    },
    {
      id: 1,
      value: '在线图片处理',
      img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      desc: '在线图片处理',
      url: '/signimage',
      cate: '设计工具',
    }
  ]
})
</script>

<template>
  <div>
    <!-- cates -->
    <div class="mr-3">
      <ul class="flex bg-gray-100  h-10 rounded leading-10 pl-3">
        <li v-for="(item, index) in info.cates" :key="index" class="flex items-center">
           <el-text>{{ index != 0 ? '&nbsp;&nbsp;&nbsp;&nbsp;' : '' }} </el-text>
           <el-text class="hover:text-blue-400 hover:underline hover:decoration-4 hover:underline-offset-[6px]">{{ item.value }}</el-text>
        </li>
      </ul>
    </div> 

    <!-- card -->
    <div class="mr-3 mt-3 flex justify-between flex-wrap self-card-div" :gutter="10">
        <router-link v-for="(item, index) in info.tools" :key="index" :to="item.url" class="flex flex-col mt-3 border-solid rounded border-gray border w-[32.5%] p-2 bg-gray-50 hover:shadow-md">
          <div class="flex items-center">
            <el-image :src="item.img" class="w-10 h-10 min-h-[2.5rem] min-w-[2.5rem] rounded-full"></el-image>
            <div class="flex flex-col ml-2">
              <div class="flex">
                <div class="font-semibold text-lg ">{{ item.value }}</div>
                <!-- <div>加入收藏</div> -->
              </div>
              <el-text line-clamp="2">{{ item.desc }}</el-text>
            </div>
          </div>
          <el-divider border-style="double" class="m-1" />
          <div class="flex items-center justify-between">
            <el-text size="small">http://tools.ranblogs.com/timeTran</el-text>
          </div>
        </router-link>
    </div>
    
  </div>
</template>

<style scoped>
.self-card-div:after{
  content: "";
  width: 32.5%
}
</style>