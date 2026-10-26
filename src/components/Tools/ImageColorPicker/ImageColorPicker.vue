<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="tool-content">
        <div class="upload-section">
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
          </el-form>
        </div>
        
        <div class="image-section">
          <div v-if="imageUrl" class="image-container">
            <img 
              ref="image" 
              :src="imageUrl" 
              @load="handleImageLoad"
              @click="handleImageClick"
              class="preview-image"
              crossorigin="anonymous"
            />
            <canvas 
              ref="canvas" 
              class="hidden-canvas"
            ></canvas>
          </div>
          <div v-else class="no-image">{{ t("请上传图片") }}</div>
        </div>
        
        <div class="color-section">
          <h3>{{ t("颜色信息") }}</h3>
          <div v-if="selectedColor" class="color-info">
            <div class="color-preview" :style="{ backgroundColor: selectedColor.hex }"></div>
            <div class="color-details">
              <div class="color-item">
                <span class="color-label">HEX:</span>
                <span class="color-value">{{ selectedColor.hex }}</span>
                <el-button type="text" size="small" @click="copyColor(selectedColor.hex)">{{ t("复制") }}</el-button>
              </div>
              <div class="color-item">
                <span class="color-label">RGB:</span>
                <span class="color-value">{{ selectedColor.rgb }}</span>
                <el-button type="text" size="small" @click="copyColor(selectedColor.rgb)">{{ t("复制") }}</el-button>
              </div>
              <div class="color-item">
                <span class="color-label">HSL:</span>
                <span class="color-value">{{ selectedColor.hsl }}</span>
                <el-button type="text" size="small" @click="copyColor(selectedColor.hsl)">{{ t("复制") }}</el-button>
              </div>
            </div>
          </div>
          <div v-else class="no-color">{{ t("点击图片获取颜色") }}</div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线传图取色工具，上传图片后点击图片任意位置获取颜色值，支持 HEX、RGB、HSL 三种颜色格式，可用于设计和开发中获取颜色参考。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const title = "传图取色"

const imageUrl = ref('');
const image = ref<HTMLImageElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const selectedColor = ref<{
  hex: string;
  rgb: string;
  hsl: string;
} | null>(null);

// 处理文件上传
const handleFileChange = (file: any) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target?.result as string;
    selectedColor.value = null;
  };
  reader.readAsDataURL(file.raw);
};

// 处理图片加载完成
const handleImageLoad = () => {
  if (image.value && canvas.value) {
    const ctx = canvas.value.getContext('2d');
    if (ctx) {
      // 设置canvas尺寸与图片一致
      canvas.value.width = image.value.width;
      canvas.value.height = image.value.height;
      // 绘制图片到canvas
      ctx.drawImage(image.value, 0, 0);
    }
  }
};

// 处理图片点击事件
const handleImageClick = (e: MouseEvent) => {
  if (!image.value || !canvas.value) {
    return;
  }
  
  try {
    const rect = image.value.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (image.value.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (image.value.height / rect.height));
    
    const ctx = canvas.value.getContext('2d');
    if (ctx) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const [r, g, b] = pixel;
      
      // 转换为各种颜色格式
      const hex = rgbToHex(r, g, b);
      const rgb = `rgb(${r}, ${g}, ${b})`;
      const hsl = rgbToHsl(r, g, b);
      
      selectedColor.value = {
        hex,
        rgb,
        hsl
      };
    }
  } catch (error) {
    console.error('取色失败:', error);
    ElMessage.error(t('取色失败，可能是图片跨域问题'));
  }
};

// RGB转HEX
const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};

// RGB转HSL
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }
  
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `hsl(${h}, ${s}%, ${l}%)`;
};

// 复制颜色值
const copyColor = (color: string) => {
  navigator.clipboard.writeText(color).then(() => {
    ElMessage.success(t('已复制到剪贴板'));
  }).catch(() => {
    ElMessage.error(t('复制失败'));
  });
};
</script>

<style scoped>
.tool-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.upload-section {
  width: 100%;
}

.image-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
}

.image-container {
  position: relative;
  max-width: 100%;
  max-height: 400px;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  cursor: crosshair;
}

.hidden-canvas {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
}

.no-image {
  text-align: center;
  color: #999;
  padding: 100px 0;
}

.color-section {
  width: 100%;
  margin-top: 20px;
}

.color-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.color-info {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.color-preview {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.color-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.color-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-label {
  width: 60px;
  font-weight: bold;
  color: #666;
}

.color-value {
  flex: 1;
  font-family: monospace;
  background-color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
}

.no-color {
  text-align: center;
  color: #999;
  padding: 40px 0;
  background-color: #f9f9f9;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .tool-content {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .upload-section {
    width: 100%;
  }
  
  .image-section {
    width: 60%;
  }
  
  .color-section {
    width: 40%;
  }
}
</style>
