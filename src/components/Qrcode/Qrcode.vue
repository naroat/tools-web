<script setup lang="ts">
import { reactive,ref } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import QRCodeVue3 from 'qrcode-vue3'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElMessage, type UploadFile } from 'element-plus'
const info = reactive({
  title: "二维码生成",
  content: '可在此输入文字或网址,右键图片另存为可保存图片',
  width: 200,
  height: 200,
  size: '200',
  sizeSelect: '',
  margin: 1,
  fileList: [],
  fileUrl: '',
  preColor: '#000',
  bgColor: '#fff',
  qrKey: 1,
  errorCorrectionLevel: 'Q',
})

const uploadLogo = ref()

//上传达到上限触发
const handleExceed = () => {
  ElMessage({
    message: '上传数量已达上限，请清除后重新上传',
    type: 'warning',
  })
}

//设置尺寸
const setQRSize = () => {
  info.width = parseInt(info.size)
  info.height = parseInt(info.size)
}

const handleChange = (file: UploadFile) => {
  info.fileList.push(file.url)
  info.fileUrl = info.fileList[0] ?? ''
}

const handleRemove = (file: UploadFile) => {
  info.fileList = uploadLogo.value.handleRemove(file)
}


//生成二维码
const gen = () => {
  //设置尺寸
  setQRSize()
  info.qrKey += 1
}
</script>

<template>
  <div class="flex flex-col mt-3 ml-4 flex-1 mr-3">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="flex justify-between w-full">
      <div class="w-4/6">
        <div class="flex mb-3">
          <div class="w-16 mr-2"><el-text>内容</el-text></div>
          <el-input v-model="info.content" type="textarea" rows="3" class="w-full" placeholder="可在此输入文字或网址"></el-input>
        </div>
        <div class="flex mb-3">
          <div class="w-16 mr-2"><el-text>尺寸</el-text></div>
          <el-input v-model="info.size" class="">
            <template #append>
              <el-select v-model="info.size" class="w-32">
                <el-option label="常规 200px" value="200" />
                <el-option label="常规 300px" value="300" />
                <el-option label="适中 350px" value="350" />
                <el-option label="较大 500px" value="500" />
                <!-- 分割线 start -->
                <div class="flex justify-center bg-gray-200 w-full">
                  <div class="h-[1px] bg-gray-200 w-4/5"></div>
                </div>
                <!-- 分割线 end -->
                <el-option label="超大 1000px" value="1000" />
                <el-option label="超大 1200px" value="1200" />
              </el-select>
            </template>
          </el-input>
        </div>
        <div class="flex mb-3">
          <el-text class="w-16">纠错级别</el-text>
          <el-select v-model="info.errorCorrectionLevel" class="w-36">
            <el-option label="L 可遮挡 7%" value="L" />
            <el-option label="M 可遮挡 15%" value="M" />
            <el-option label="Q 可遮挡 25%" value="Q" />
            <el-option label="H 可遮挡 30%" value="H" />
          </el-select>
        </div>
        <div class="flex mb-3">
          <div class="w-16"><el-text>边距</el-text></div>
          <el-input-number v-model="info.margin" :step="1" :min="0"/>
        </div>
        <div class="flex mb-3">
          <div class="w-16"><el-text>颜色</el-text></div>
          <!-- <div class="w-16 flex flex-col items-center bg-gray-100 p-1 rounded-md mr-2">
            <el-text>前景色</el-text>
            <el-color-picker v-model="info.preColor" />
          </div> -->
          <div class="w-16 flex flex-col items-center bg-gray-100 p-1 rounded-md">
            <el-text>背景色</el-text>
            <el-color-picker v-model="info.bgColor" />
          </div>
        </div>
        <div class="flex mb-3">
          <div class="w-16"><el-text>logo</el-text></div>
          <el-upload 
            ref="uploadLogo"
            action="#" 
            :auto-upload="false" 
            :limit="1" 
            list-type="picture-card" 
            accept=".png,.ico,.jpg,.jpeg"
            :on-change="handleChange"
            :on-exceed="handleExceed">
            <el-icon><Plus /></el-icon>
            <template #file="{ file }">
              <div class="border-2 w-full border-blue-400">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </div>
        <div class="flex mb-3">
          <div class="w-16"></div>
          <el-button type="primary" @click="gen">生成二维码</el-button>
        </div>
      </div>
      <div>
        <QRCodeVue3
          :key="info.qrKey"
          :width="info.width"
          :height="info.height"
          :value="info.content"
          :margin="info.margin"
          :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: info.errorCorrectionLevel }"
          :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
          :image="info.fileList[0]"
          :dotsOptions="{
            type: 'none',
            color: '#26249a',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#26249a' },
                { offset: 1, color: '#26249a' },
              ],
            },
          }"
          :backgroundOptions="{ color: info.bgColor }"
          :cornersSquareOptions="{ type: 'square', color: '#000000' }"
          :cornersDotOptions="{ type: undefined, color: '#000000' }"
          fileExt="png"
          myclass="my-qur"
          imgclass="img-qr"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-button{
  background-color:red;
}
</style>