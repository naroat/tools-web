<script setup lang="ts">
import { reactive,ref,onMounted } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import { copy } from '@/utils/string'
import figlet from 'figlet';
const info = reactive({
  title: "ASCII字形生成器",
})
figlet.defaults({ fontPath: '//unpkg.com/figlet@1.6.0/fonts/' });

const content = ref('Tools-Web')
const contentRes = ref('')
const fontStyle = ref('Big')
const options = ref([
  {
    value: 'Alpha',
    label: 'Alpha',
  },
  {
    value: 'Avatar',
    label: 'Avatar',
  },
  {
    value: 'Banner',
    label: 'Banner',
  },
  {
    value: 'Banner3-D',
    label: 'Banner3-D',
  },
  {
    value: 'Basic',
    label: 'Basic',
  },
  {
    value: 'Bear',
    label: 'Bear',
  },
  {
    value: 'Big Money-ne',
    label: 'Big Money-ne',
  },
  {
    value: 'Big',
    label: 'Big',
  },
  {
    value: 'Block',
    label: 'Block',
  },
  {
    value: 'Epic',
    label: 'Epic',
  },
  {
    value: 'Ghost',
    label: 'Ghost',
  },
  {
    value: 'Knob',
    label: 'Knob',
  },
  {
    value: 'Linux',
    label: 'Linux',
  },
  {
    value: 'Mini',
    label: 'Mini',
  },
  {
    value: 'Mirror',
    label: 'Mirror',
  },
  {
    value: 'Peaks',
    label: 'Peaks',
  },
  {
    value: 'Slant',
    label: 'Slant',
  },
  {
    value: 'Small',
    label: 'Small',
  },
  {
    value: 'Stellar',
    label: 'Stellar',
  },
  {
    value: 'Thin',
    label: 'Thin',
  },
  {
    value: 'Wow',
    label: 'Wow',
  },
])

const gen = () => {
  figlet(content.value, 
  {
    font: fontStyle.value,
    width: 120,
    horizontalLayout: "default",
    verticalLayout: "default",
    whitespaceBreak: true,
  }, 
  function (err, data) {
    if (err) {
      console.log(';----', err)
      return;
    }
    contentRes.value = data
  })
}

//清空输入框
const clear = () => {
  content.value = ''
  contentRes.value = ''
}

onMounted(() => {
  gen()
})

</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white ">
      <div class="mb-6">
        <el-input v-model="content" :rows="4" type="textarea" placeholder="请输入内容"></el-input>
        <div class="mt-3 flex items-center">
          <div class="flex items-center mr-3">
            <el-text>风格</el-text>
            <el-select
              v-model="fontStyle"
              size="default"
              class="ml-2"
              @change="gen"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          
          <el-button type="primary" @click="gen()">生成</el-button>
          <el-button type="primary" @click="copy(contentRes)">复制结果</el-button>
          <el-button type="primary" @click="clear">清除</el-button>
        </div>
      </div>

      <div>
        <pre tabindex="0"><code>{{ contentRes }}</code></pre>
      </div>



      <!-- <el-divider content-position="left">描述</el-divider>
      <div>
        <el-text>
        </el-text>
      </div> -->
    </div>
  </div>
</template>

<style scoped>

</style>