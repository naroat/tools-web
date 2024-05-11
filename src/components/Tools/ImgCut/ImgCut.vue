<script setup lang="ts">
import { onMounted, reactive, ref,computed, watch } from 'vue'
import { UploadProps,UploadRawFile,genFileId } from 'element-plus'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'

const info = reactive({
  title: "图片切割",
})

const fileList = ref()
const lineNum = ref(3)
const image = ref({} as any)
const cutImg = ref([] as string[])
const dataFileRef = ref()

//上传
const updateDataFile = async (params) => {
  let reader = new FileReader();
  reader.readAsDataURL(params.file);
  reader.addEventListener(
      'load',
      async () => {
          const imageTmp = new Image();
          imageTmp.onload = () => {
            image.value = imageTmp;
            cut();
          };
          imageTmp.src = reader.result as string;
      },
      false
  );
}

//当超出限制时，执行的钩子函数
//这里覆盖前一个文件
const handleExceed: UploadProps['onExceed'] = (files) => {
  dataFileRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  dataFileRef.value!.handleStart(file)
  dataFileRef.value!.submit()
}

//切割
const cut = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = image.value;

  const wpiece = Math.floor(img.naturalWidth / lineNum.value);
  const hpiece = Math.floor(img.naturalHeight / lineNum.value);
  const results = [] as string[];

  canvas.width = wpiece;
  canvas.height = hpiece;

  for (let r = 0; r < lineNum.value; r++) {
      for (let c = 0; c < lineNum.value; c++) {
          ctx?.drawImage(
              img,
              c * wpiece,
              r * hpiece,
              wpiece,
              hpiece,
              0,
              0,
              wpiece,
              hpiece
          );
          results.push(canvas.toDataURL());
      }
  }
  cutImg.value = results;
}

//计算切割样式
const cutImgStyle = computed(() => {
  const width = `width: ${image.value.width || 800}px;`;
  const grid = `grid: repeat(${lineNum.value}, 1fr) / repeat(${
    lineNum.value
  }, 1fr);`;
  return width + grid;
})

watch(cutImgStyle, () => {
  if (fileList.value) cut();
})

onMounted(() => {

})
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <el-upload
        v-model:file-list="fileList"
        class="dataFileRef flex"
        ref="dataFileRef"
        accept="image/*"
        :http-request="updateDataFile"
        :on-exceed="handleExceed"
        :limit="1"
      >
        <el-button type="primary">请上传需要切割的图片</el-button>
      </el-upload>
      <div class="flex mt-3">
        <div class="flex">
          <el-text>行数和列数</el-text>
          <el-input-number v-model="lineNum" :min="1" :max="10" class="ml-3"/>
        </div>
      </div>


      <div class="mt-3 min-h-md bg-gray-100 p-3 mb-3 flex flex-col" v-if="image.src">
        <!-- 预览 -->
        <div class="mb-3">
          <el-text>预览: </el-text>
          <div :style="cutImgStyle" class="grid gap-1 max-w-full">
              <img v-for="(src,index) in cutImg" :key="index" :src="src" alt="结果" />
          </div>
        </div>

        <!-- 原图 -->
        <div>
          <el-text>原图: </el-text>
          <div>
            <img :src="image.src" alt="原图" v-if="image.src"/>
          </div>
        </div>
      </div>
      <div v-else>
        <el-empty :image-size="200" description="无预览"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>