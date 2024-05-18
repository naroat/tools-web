<script setup lang="ts">
import { onMounted,reactive, ref } from 'vue';
import { useScanStore } from '@/store/modules/scan'
// import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue';
import { useRouter } from "vue-router"
//store
const scanStore = useScanStore()
const router = useRouter()
// const getToolsCate = async () => {
//   try {
//     await toolsStore.getToolCate()
//   } catch (error: any) {
//     ElMessage.error(error.message)
//   }
// }

const loading = ref(false)
const setTagsDialog = ref(false)
// const checkedTags = reactive({})
//----- config -----
//----- ^ -----

//获取分类
//查询参数
const searchParam = reactive({
  title: '',
  tags: '',
  page: 1,
})
const getList = async (query) => {
  try {
    searchParam.title = query
    await scanStore.getList(searchParam)
  } catch (error) {
    console.log(error)
  }
}

//获取标签
const getTags = async () => {
  try {
    await scanStore.getTags()
    //设置标签checked
    // for (let index in scanStore.tags) {
    //   for (let childIndex in scanStore.tags[index].childTags) {
    //     let cheeckedTag = 'checkTag' + scanStore.tags[index].childTags[childIndex].id
    //   }
    //   console.log(scanStore.tags[index].childTags)
    // }
  } catch (error) {
    console.log(error)
  }
}

const optionClick = (path: string) => {
  console.log(path)
  // router.push(url)
}

//获取文件信息
const getFileInfo = async (fileId: number) => {
  try {
    await scanStore.getInfo({
      fileId: fileId,
    })
  } catch (error) {
    console.log(error)
  }
}

//set tags
const setTagsDia = async (fileId: number) => {
  //显示dialog
  setTagsDialog.value = true
  await getFileInfo(fileId)
}

//更新标签
const updateTag = async (fileId: number, tagId: number) => {
  console.log(fileId, tagId)
  try {
    await scanStore.updateTag({
      fileId: fileId,
      tagId: tagId
    })
    //获取当前文件标签
    await getFileInfo(fileId)
  } catch (error) {
    console.log(error)
  }
}

//分页 - 页码改变时
const pageChange = async (nowPage: number) => {
  searchParam.page = nowPage
  console.log(nowPage)
  await scanStore.getList(searchParam)
}

/**
 * open local app
 * 
 * index: 索引
 * data: 内容数据
 */
const open = (index: number, data: any) => {
  //缓存当前播放和播放索引
  scanStore.setNowPlay(data)
  scanStore.setNowIndex(index)
  router.push({
    path: '/about',
  })

  // let addr = router.resolve({
  //   path: '/about',
  //   params: {
  //     url: url
  //   }
  // }).href
  // window.open(addr, '_blank')
}

onMounted(() => {
  getList('');
  getTags();
})
</script>

<template>
  <div>
    <div class="mt-3 flex items-center">
      <el-select
        v-model="searchParam.title"
        filterable
        remote
        reserve-keyword
        remote-show-suffix
        :suffix-transition="false"
        :suffix-icon="Search"
        placeholder="输入关键词搜索"
        :remote-method="getList"
        :loading="loading"
        class="ml-3 mr-3 md:w-80 c-xs:w-60"
      >
        <el-optiond
          v-for="item in scanStore.list.data"
          :key="item.id"
          :label="item.title"
          :value="item.id"
          @click="optionClick(item.path)"
        >
        </el-optiond>
      </el-select>
      <!-- <el-button>扫描目录</el-button> -->
      <el-button>随机预览</el-button>
      <div class='ml-3'>
        <el-text>数量：111</el-text>
      </div>
    </div>

    <div class="flex w-full">
      <!-- 左侧列表 -->
      <div class="w-9/12">
        <div class="flex items-center justify-between h-40 bg-white mt-3 ml-3 rounded-lg p-3" v-for="(item, index) in scanStore.list.data" :key="index">
          <!-- left -->
          <div class="flex items-center">
            <!--  -->
            <div>
              <div v-if="scanStore.extVideo.includes(item.ext)">
                <video :src="scanStore.sourceUrl + item.title" style="height:150px;width:270px;"></video>
              </div>
              <div v-else>
                <el-empty description="无预览" :image-size="100"/>
              </div>
            </div>
            
            <!--  -->
            <div class="ml-3">
              <div class="flex items-center">
                  <el-button class="mr-2" type="warning" size="small">{{ item.ext }}</el-button>
                  <el-text>{{item.title}}</el-text>
              </div>
              <div class="mt-3">
                <el-text class="mt-3">{{ item.path }}</el-text>
              </div>
              <div class="mt-3">
                <el-tag type="danger" class="mt-2 mr-2" v-for="(childItem, childIndex) in item.scan_tag" :key="childIndex">{{ childItem.title }}</el-tag>
              </div>
            </div>
          </div>

          <!-- right -->
          <div class="flex flex-col justify-center">
            <el-button size="small" type="primary" class="w-20" @click="open(index, item)">open</el-button>
            <el-button size="small" type="primary" class="w-20 mt-2" style="margin-left: 0;" @click="setTagsDia(item.id)">set tags</el-button>
            <!-- <el-button size="small" type="primary" class="w-20 mt-2" style="margin-left: 0;" >move</el-button> -->
            <!-- <el-button size="small" type="primary" class="w-20 mt-2" style="margin-left: 0;">delete</el-button> -->
          </div>
        </div>
        <!-- 分页 -->
        <div class="mt-3 mb-3 ml-3 flex justify-end">
          <el-pagination 
            background 
            layout="prev, pager, next, jumper" 
            :page-count="scanStore.list.last_page"
            :total="scanStore.list.total" 
            :default-page-size="scanStore.list.per_page" 
            @current-change="pageChange"
            @size-change="pageChange"
            @prev-click="pageChange"
            @next-click="pageChange"/>
        </div>
      </div>
      <!-- 右侧栏目 -->
      <div class="w-3/12 mt-3 ml-3 mr-3  rounded-lg">
        <!-- tags -->
        <div class="p-3 bg-white" v-for="(item, index) in scanStore.tags" :key="index">
          <div>{{ item.title }}</div>
          <div class="flex flex-wrap">
            <el-tag type="danger" class="mt-2 mr-2" v-for="(childItem, childIndex) in item.childTags" :key="childIndex" @click="">{{ childItem.title }}</el-tag>
          </div>
        </div>
        
      </div>
    </div>
    <!-- set tags dialog -->
    <el-dialog v-model="setTagsDialog" title="set tags" width="800" @close="getList('')">
      <!-- tags -->
      <div class="p-3 bg-white" v-for="(item, index) in scanStore.tags" :key="index">
        <div>{{ item.title }}</div>
        <div class="flex flex-wrap">
          <el-check-tag type="danger" :checked="scanStore.fileInfoTags.includes(childItem.id)" @change="updateTag(scanStore.fileInfo.id, childItem.id)" class="mt-2 mr-2" v-for="(childItem, childIndex) in item.childTags" :key="childIndex">{{ childItem.title }}</el-check-tag>
        </div>
      </div>
      <!-- <el-button class="ml-3 mt-3" type="primary">保存</el-button> -->
    </el-dialog>
  </div>
</template>

<style scoped>
.self-card-div:after{
  content: "";
  width: 24%
}
</style>