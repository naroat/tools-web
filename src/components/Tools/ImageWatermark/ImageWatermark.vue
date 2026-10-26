<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="tool-content">
        <div class="input-section">
          <el-form label-position="top">
            <el-form-item :label="t('上传图片')">
              <el-upload
                class="upload-demo"
                action="#"
                :auto-upload="false"
                :on-change="handleFileChange"
                :show-file-list="false"
                accept="image/*"
              >
                <el-button type="primary">{{ t("点击上传") }}</el-button>
                <template #tip>
                  <div class="el-upload__tip">{{ t("支持 JPG、PNG、GIF 等格式的图片") }}</div>
                </template>
              </el-upload>
            </el-form-item>
            
            <el-form-item :label="t('水印文字')">
              <el-input
                v-model="watermarkText"
                :placeholder="t('请输入水印文字')"
              />
            </el-form-item>
            
            <el-form-item :label="t('水印设置')">
              <div class="settings-grid">
                <el-form-item :label="t('位置')" class="setting-item">
                  <el-select v-model="position" size="small">
                    <el-option :label="t('左上角')" value="top-left" />
                    <el-option :label="t('右上角')" value="top-right" />
                    <el-option :label="t('左下角')" value="bottom-left" />
                    <el-option :label="t('右下角')" value="bottom-right" />
                    <el-option :label="t('居中')" value="center" />
                  </el-select>
                </el-form-item>
                
                <el-form-item :label="t('字体大小')" class="setting-item">
                  <el-input-number v-model="fontSize" :min="12" :max="100" size="small" />
                </el-form-item>
                
                <el-form-item :label="t('透明度')" class="setting-item">
                  <el-slider v-model="opacity" :min="0" :max="1" :step="0.1" />
                </el-form-item>
                
                <el-form-item :label="t('颜色')" class="setting-item">
                  <el-color-picker v-model="textColor" size="small" />
                </el-form-item>
              </div>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="addWatermark">{{ t("添加水印") }}</el-button>
              <el-button @click="clearImage">{{ t("清空") }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="preview-section">
          <h3>{{ t("预览") }}</h3>
          <div class="preview-container">
            <div v-if="imageUrl" class="image-wrapper">
              <img :src="imageUrl" class="original-image" />
              <canvas 
                ref="canvas" 
                class="watermark-canvas"
                :width="imageWidth" 
                :height="imageHeight"
              ></canvas>
            </div>
            <div v-else class="no-image">{{ t("请上传图片") }}</div>
          </div>
          
          <div v-if="watermarkedUrl" class="download-section">
            <el-button type="success" @click="downloadImage">{{ t("下载图片") }}</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线图片水印添加工具，上传图片后添加自定义文字水印，支持设置水印位置、字体大小、透明度和颜色，可下载带水印的图片。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

import { ref, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const title = "图片水印添加"

const imageUrl = ref('');
const watermarkedUrl = ref('');
const watermarkText = ref('水印');
const position = ref('bottom-right');
const fontSize = ref(24);
const opacity = ref(0.5);
const textColor = ref('#ffffff');
const imageWidth = ref(0);
const imageHeight = ref(0);
const canvas = ref<HTMLCanvasElement | null>(null);

// 处理文件上传
const handleFileChange = (file: any) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      imageWidth.value = img.width;
      imageHeight.value = img.height;
      imageUrl.value = e.target?.result as string;
      watermarkedUrl.value = '';
    };
    img.src = e.target?.result as string;
  };
  reader.readAsDataURL(file.raw);
};

// 添加水印
const addWatermark = async () => {
  if (!imageUrl.value || !watermarkText.value) {
    ElMessage.warning(t('请上传图片并输入水印文字'));
    return;
  }
  
  await nextTick();
  
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d');
    if (ctx) {
      // 清除画布
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      
      // 绘制原始图片
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        
        // 设置水印样式
        ctx.font = `${fontSize.value}px Arial`;
        ctx.fillStyle = `${textColor.value}${Math.floor(opacity.value * 255).toString(16).padStart(2, '0')}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 计算水印位置
        let x = canvas.value!.width / 2;
        let y = canvas.value!.height / 2;
        
        switch (position.value) {
          case 'top-left':
            x = fontSize.value * 1.5;
            y = fontSize.value * 1.5;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            break;
          case 'top-right':
            x = canvas.value!.width - fontSize.value * 1.5;
            y = fontSize.value * 1.5;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'top';
            break;
          case 'bottom-left':
            x = fontSize.value * 1.5;
            y = canvas.value!.height - fontSize.value * 1.5;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            break;
          case 'bottom-right':
            x = canvas.value!.width - fontSize.value * 1.5;
            y = canvas.value!.height - fontSize.value * 1.5;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            break;
        }
        
        // 绘制水印文字
        ctx.fillText(watermarkText.value, x, y);
        
        // 生成带水印的图片URL
        watermarkedUrl.value = canvas.value!.toDataURL('image/png');
      };
      img.src = imageUrl.value;
    }
  }
};

// 下载图片
const downloadImage = () => {
  if (!watermarkedUrl.value) {
    return;
  }
  
  const link = document.createElement('a');
  link.href = watermarkedUrl.value;
  link.download = `watermarked_${Date.now()}.png`;
  link.click();
};

// 清空
const clearImage = () => {
  imageUrl.value = '';
  watermarkedUrl.value = '';
  watermarkText.value = '水印';
  position.value = 'bottom-right';
  fontSize.value = 24;
  opacity.value = 0.5;
  textColor.value = '#ffffff';
  imageWidth.value = 0;
  imageHeight.value = 0;
  
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    }
  }
};
</script>

<style scoped>
.tool-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-section {
  width: 100%;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.setting-item {
  margin-bottom: 0;
}

.preview-section {
  width: 100%;
  margin-top: 20px;
}

.preview-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.preview-container {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-wrapper {
  position: relative;
  max-width: 100%;
  max-height: 400px;
}

.original-image {
  max-width: 100%;
  max-height: 400px;
  display: block;
}

.watermark-canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.no-image {
  text-align: center;
  color: #999;
  padding: 100px 0;
}

.download-section {
  margin-top: 20px;
  text-align: center;
}

@media (min-width: 768px) {
  .tool-content {
    flex-direction: row;
  }
  
  .input-section {
    width: 40%;
  }
  
  .preview-section {
    width: 60%;
  }
}
</style>
