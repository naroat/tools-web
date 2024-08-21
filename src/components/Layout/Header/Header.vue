<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue';
import { useToolsStore } from '@/store/modules/tools'
import { useComponentStore } from '@/store/modules/component'
import 'element-plus/theme-chalk/display.css'
import { ToolsInfo } from '@/components/Tools/tools.type.ts';

import router from '@/router';
// const isNavDrawer = ref(false)
const loading = ref(false)
const options = ref<ToolsInfo[]>([])
//store
const toolsStore = useToolsStore()
const componentStore = useComponentStore()
//查询参数
const searchParam = reactive({
  cateId: 0,
  title: '',
  route: '',
})

//search
// const search = async () => {
//   try {
//     await toolsStore.getTools(searchParam)
//     //关闭抽屉
//     isNavDrawer.value = false
//   } catch (error) {
//     console.log(error)
//   }
// }

//选择分类
// const chooseCate = (cateId: number) => {
//   searchParam.cateId = cateId
//   search()
// }

//搜索工具
const searchTools = async (query: string) => {
  loading.value = true
  options.value = []
  if (query) {
    searchParam.title = query
    options.value = await toolsStore.getTools(searchParam)
  }
  loading.value = false
}

//保存到桌面
const createUrlShortcut = async () => {
  try {
    const blob = new Blob(
      [`[InternetShortcut]\nURL=${encodeURI(window.location.href)}`],
      { type: 'text/plain' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Tools-Web.url';
    a.click();
  } catch (error) {
    console.error('创建URL快捷方式失败:', error);
  }
}

const optionClick = (url: string) => {
  router.push(url)
}

onMounted(() => {
})
</script>

<template>
  <header class="h-24 w-full flex justify-between pt-2 pb-2 c-xs:h-16 c-xs:border-b-[1px] items-center">
    <div class="flex items-center w-full">
      <Transition name="fold" class="hidden c-sm:block c-md:hidden c-xs:block">
        <svg v-if="!componentStore.leftComDrawer" @click="componentStore.setleftComDrawerStatus(true)" t="1702978210636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7618" width="30" height="30">
          <path fill="#444" fill-opacity=".9" d="M895.936 256l-768-0.896 0.128-64L896 192l-0.064 64zM179.2 689.152l202.688-152a32 32 0 0 0 0-51.2L179.2 333.952a32 32 0 0 0-51.2 25.6v304a32 32 0 0 0 51.2 25.6z m12.8-89.6v-176l117.312 88L192 599.552zM896 544H480v-64H896v64z m-0.064 288l-768-0.896 0.128-64L896 768l-0.064 64z" p-id="7619"></path>
        </svg>
        <svg v-else @click="componentStore.setleftComDrawerStatus(false)" t="1702978577170" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1587" width="30" height="30">
          <path fill="#444" fill-opacity=".9" d="M128.064 192l768 0.896-0.128 64L128 256l0.064-64z m514.048 294.848a32 32 0 0 0 0 51.2l202.688 152a32 32 0 0 0 51.2-25.6v-304a32 32 0 0 0-51.2-25.6l-202.688 152zM832 424.448v176l-117.312-88L832 424.448zM128 480h416v64H128v-64z m0.064 288l768 0.896-0.128 64L128 832l0.064-64z" p-id="1588"></path>
        </svg>
      </Transition>

      <!-- c-md:block -->
      <Transition name="fold" class="hidden c-md:block">
        <svg v-if="!componentStore.leftCom" @click="componentStore.setLeftComStatus(true)" t="1702978577170" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1587" width="30" height="30">
          <path fill="#444" fill-opacity=".9" d="M128.064 192l768 0.896-0.128 64L128 256l0.064-64z m514.048 294.848a32 32 0 0 0 0 51.2l202.688 152a32 32 0 0 0 51.2-25.6v-304a32 32 0 0 0-51.2-25.6l-202.688 152zM832 424.448v176l-117.312-88L832 424.448zM128 480h416v64H128v-64z m0.064 288l768 0.896-0.128 64L128 832l0.064-64z" p-id="1588"></path>
        </svg>
        <svg v-else @click="componentStore.setLeftComStatus(false)" t="1702978210636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7618" width="30" height="30">
          <path fill="#444" fill-opacity=".9" d="M895.936 256l-768-0.896 0.128-64L896 192l-0.064 64zM179.2 689.152l202.688-152a32 32 0 0 0 0-51.2L179.2 333.952a32 32 0 0 0-51.2 25.6v304a32 32 0 0 0 51.2 25.6z m12.8-89.6v-176l117.312 88L192 599.552zM896 544H480v-64H896v64z m-0.064 288l-768-0.896 0.128-64L896 768l-0.064 64z" p-id="7619"></path>
        </svg>
      </Transition>

      <div class="ml-3 mr-1">
        <router-link to="/">
          <svg t="1715590310537" class="icon" viewBox="0 0 1053 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4287" width="25" height="25">
            <path d="M526.63454 58.067422a21.503527 21.503527 0 0 1-27.501109 0.175539l474.979265 381.50475a31.538506 31.538506 0 1 0 39.496274-49.150919L538.629705 9.004273a41.602742 41.602742 0 0 0-51.988799 0.234052L11.573871 398.671586a31.538506 31.538506 0 1 0 39.993635 48.79984L526.63454 58.067422z" fill="#2c2c2c" p-id="4288"></path><path d="M1013.60897 564.087832L538.629705 182.583083a41.602742 41.602742 0 0 0-51.988799 0.204795L11.573871 572.191883a31.538506 31.538506 0 1 0 39.993635 48.79984l66.763331-54.709653v361.61033A94.644775 94.644775 0 0 0 213.004869 1022.537175H441.732179v-247.275931a15.79851 15.79851 0 0 1 15.739997-15.79851h110.472541c8.68918 0 15.769253 7.080073 15.769253 15.79851v247.275931H812.441281a94.615518 94.615518 0 0 0 94.644775-94.615518V559.465305l66.997383 53.831959a31.538506 31.538506 0 1 0 39.525531-49.209432z m-169.629183 363.804568c0 17.436874-14.101633 31.538506-31.567763 31.538506h-165.591785v-184.198919a78.875522 78.875522 0 0 0-78.875522-78.904778h-110.472541a78.875522 78.875522 0 0 0-78.846265 78.904778v184.198919h-165.591786c-17.46613 0-31.597019-14.130889-31.597019-31.538506V514.527323L512.883986 242.851471l331.095801 265.941578v419.128608z" fill="#2c2c2c" p-id="4289" stroke="black" stroke-width="10"></path>
          </svg>
        </router-link>
      </div>
      
    
      <div class="c-xs:w-[85%] w-full mr-3">
        <!-- <el-input 
          v-model="searchParam.title" 
          placeholder="搜索工具" 
          class="h-10 ml-3" 
          @keyup.enter.native="search">
          <template #append>
            <el-button :icon="Search" @click="search"/>
          </template>
        </el-input> -->
        <el-select
          v-model="searchParam.title"
          filterable
          remote
          reserve-keyword
          remote-show-suffix
          :suffix-transition="false"
          :suffix-icon="Search"
          placeholder="输入关键词搜索，如文本、json、图片等"
          :remote-method="searchTools"
          :loading="loading"
          class="ml-3"
          size="large"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.title + ' - ' + item.desc"
            :value="item.id"
            @click="optionClick(item.url)"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class=" w-full md:w-auto flex md:block c-xs:w-auto">
      <ul class="flex mt-4 flex-col md:flex-row md:mt-0 justify-end items-center c-xs:mt-0">
        <!-- about -->
         <li class="ml-3 c-xs:hidden">
          <router-link to="/about">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="关于tools-web"
              placement="bottom"
            >
              <svg t="1715594765484" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5578" width="33" height="33"><path d="M511.899716 948.506609c-241.310951 0-437.636339-196.318224-437.636339-437.636339 0-241.323231 196.325387-437.639408 437.636339-437.639408s437.636339 196.316178 437.636339 437.639408C949.536055 752.188384 753.210667 948.506609 511.899716 948.506609zM511.899716 113.944122c-218.866776 0-396.926148 178.064488-396.926148 396.926148 0 218.856543 178.059372 396.926148 396.926148 396.926148 218.868823 0 396.926148-178.069605 396.926148-396.926148C908.825864 292.00861 730.768539 113.944122 511.899716 113.944122zM561.15656 335.324138c-29.853935 0-54.03773-24.189935-54.03773-54.047963 0-29.855982 24.184819-54.047963 54.03773-54.047963 29.838585 0 54.0408 24.191982 54.0408 54.047963C615.19736 311.134203 590.995145 335.324138 561.15656 335.324138zM424.962691 430.321746c0-4.394077 0-8.806573 0-13.19758 42.878576-17.016559 108.943224-10.793834 153.201218-26.418696 1.75804 0 3.510964 0 5.27719 0-21.329794 108.134813-66.391083 206.496028-76.599585 316.955792 2.425236 1.850138 2.086521 1.473561 5.287423 2.623757 33.247218 11.155061 52.320623-66.110697 73.948199-60.727083 21.644973 5.38873-13.548574 43.733037-18.47784 50.193169-19.400862 25.362644-56.465013 68.439742-100.376105 68.657706-31.008224 0.181125-63.159482-19.378349-58.101279-71.301929 5.056156-51.981908 34.219359-124.319423 50.172703-182.263114C472.184179 468.050022 488.801648 429.049776 424.962691 430.321746z" fill="#515151" p-id="5579"></path></svg>
            </el-tooltip>
          </router-link>
        </li>
        <!-- github -->
        <li class="ml-3">
          <el-tooltip
              class="box-item"
              effect="dark"
              content="GitHub仓库"
              placement="bottom"
            >
            <a href="https://github.com/naroat/tools-web" target="_blank">
              <svg t="1715594665374" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4334" width="33" height="33"><path d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512a426.410667 426.410667 0 0 0 291.754667 404.821333c21.333333 3.712 29.312-9.088 29.312-20.309333 0-10.112-0.554667-43.690667-0.554667-79.445333-107.178667 19.754667-134.912-26.112-143.445333-50.133334-4.821333-12.288-25.6-50.133333-43.733333-60.288-14.933333-7.978667-36.266667-27.733333-0.554667-28.245333 33.621333-0.554667 57.6 30.933333 65.621333 43.733333 38.4 64.512 99.754667 46.378667 124.245334 35.2 3.754667-27.733333 14.933333-46.378667 27.221333-57.045333-94.933333-10.666667-194.133333-47.488-194.133333-210.688 0-46.421333 16.512-84.778667 43.733333-114.688-4.266667-10.666667-19.2-54.4 4.266667-113.066667 0 0 35.712-11.178667 117.333333 43.776a395.946667 395.946667 0 0 1 106.666667-14.421333c36.266667 0 72.533333 4.778667 106.666666 14.378667 81.578667-55.466667 117.333333-43.690667 117.333334-43.690667 23.466667 58.666667 8.533333 102.4 4.266666 113.066667 27.178667 29.866667 43.733333 67.712 43.733334 114.645333 0 163.754667-99.712 200.021333-194.645334 210.688 15.445333 13.312 28.8 38.912 28.8 78.933333 0 57.045333-0.554667 102.912-0.554666 117.333334 0 11.178667 8.021333 24.490667 29.354666 20.224A427.349333 427.349333 0 0 0 938.666667 512c0-235.733333-190.933333-426.666667-426.666667-426.666667z" fill="#000000" p-id="4335"></path></svg>
            </a>
          </el-tooltip>
        </li>

        <li class="hover:text-blue-500 c-xs:hidden">
          <el-button type="primary" class="ml-3 bg-gradient-to-r from-cyan-500 to-blue-500" @click="createUrlShortcut">保存到桌面</el-button>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.fold-enter-active {
  transition: all 1s ease-out;
}

.fold-enter-from,
.fold-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


:deep(.el-select__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    cursor: default;
    @apply md:w-full;
}

.el-select :deep(.el-select__wrapper){
  background-color: rgba(46, 51, 56, 0.05);
  background-color: rgb(255, 255, 255);
}
</style>