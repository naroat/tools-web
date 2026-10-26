<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div class="tool-content">
        <div class="input-section">
          <el-tabs v-model="activeCategory">
            <el-tab-pane :label="t('基础颜色')" name="basic">
              <div class="color-grid">
                <div 
                  v-for="color in basicColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane :label="t('渐变色')" name="gradient">
              <div class="gradient-grid">
                <div 
                  v-for="(gradient, index) in gradients" 
                  :key="index"
                  class="gradient-item"
                  :style="{ background: gradient.value }"
                  @click="copyGradient(gradient)"
                >
                  <div class="gradient-info">
                    <span class="gradient-name">{{ t(gradient.name) }}</span>
                    <span class="gradient-value">{{ gradient.value }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="Material Design" name="material">
              <div class="color-grid">
                <div 
                  v-for="color in materialColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane :label="t('扁平化')" name="flat">
              <div class="color-grid">
                <div 
                  v-for="color in flatColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane :label="t('霓虹色')" name="neon">
              <div class="color-grid">
                <div 
                  v-for="color in neonColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane :label="t('自然色')" name="nature">
              <div class="color-grid">
                <div 
                  v-for="color in natureColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane :label="t('金属色')" name="metal">
              <div class="color-grid">
                <div 
                  v-for="color in metalColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane :label="t('复古色')" name="vintage">
              <div class="color-grid">
                <div 
                  v-for="color in vintageColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane :label="t('季节色')" name="seasonal">
              <div class="color-grid">
                <div 
                  v-for="color in seasonalColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane :label="t('莫兰迪色')" name="morandi">
              <div class="color-grid">
                <div 
                  v-for="color in morandiColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane :label="t('马卡龙色')" name="macaron">
              <div class="color-grid">
                <div 
                  v-for="color in macaronColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane :label="t('工业风')" name="industrial">
              <div class="color-grid">
                <div 
                  v-for="color in industrialColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            
            <el-tab-pane :label="t('中国传统色')" name="chinese">
              <div class="color-grid">
                <div 
                  v-for="color in chineseColors" 
                  :key="color.hex"
                  class="color-item"
                  :style="{ backgroundColor: color.hex }"
                  @click="copyColor(color)"
                >
                  <div class="color-info">
                    <span class="color-name">{{ t(color.name) }}</span>
                    <span class="color-hex">{{ color.hex }}</span>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail :title="t('描述')">
      <el-text>{{ t("在线色板工具，提供基础颜色、渐变色、Material Design 颜色、扁平化颜色、霓虹色、自然色、金属色、复古色、季节色、莫兰迪色、马卡龙色、工业风和中国传统色，点击颜色可复制颜色值，方便设计和开发使用。") }}</el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'

import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'

const title = "色板工具"

const activeCategory = ref('basic');

// 基础颜色
const basicColors = [
  { name: '红色', hex: '#FF0000' },
  { name: '绿色', hex: '#00FF00' },
  { name: '蓝色', hex: '#0000FF' },
  { name: '黄色', hex: '#FFFF00' },
  { name: '紫色', hex: '#800080' },
  { name: '橙色', hex: '#FFA500' },
  { name: '黑色', hex: '#000000' },
  { name: '白色', hex: '#FFFFFF' },
  { name: '灰色', hex: '#808080' },
  { name: '棕色', hex: '#A52A2A' },
  { name: '粉色', hex: '#FFC0CB' },
  { name: '青色', hex: '#00FFFF' },
  { name: '品红', hex: '#FF00FF' },
  { name: '橄榄绿', hex: '#808000' },
  { name: '海军蓝', hex: '#000080' },
  { name: '银色', hex: '#C0C0C0' },
];

// 渐变色
const gradients = [
  { name: '蓝到紫', value: 'linear-gradient(90deg, #3B82F6, #8B5CF6)' },
  { name: '红到黄', value: 'linear-gradient(90deg, #EF4444, #F59E0B)' },
  { name: '绿到蓝', value: 'linear-gradient(90deg, #10B981, #3B82F6)' },
  { name: '紫到粉', value: 'linear-gradient(90deg, #8B5CF6, #EC4899)' },
  { name: '黄到绿', value: 'linear-gradient(90deg, #F59E0B, #10B981)' },
  { name: '红到橙', value: 'linear-gradient(90deg, #EF4444, #F97316)' },
  { name: '蓝到青', value: 'linear-gradient(90deg, #3B82F6, #06B6D4)' },
  { name: '紫到红', value: 'linear-gradient(90deg, #8B5CF6, #EF4444)' },
];

// Material Design颜色
const materialColors = [
  { name: 'Material Red', hex: '#F44336' },
  { name: 'Material Pink', hex: '#E91E63' },
  { name: 'Material Purple', hex: '#9C27B0' },
  { name: 'Material Deep Purple', hex: '#673AB7' },
  { name: 'Material Indigo', hex: '#3F51B5' },
  { name: 'Material Blue', hex: '#2196F3' },
  { name: 'Material Light Blue', hex: '#03A9F4' },
  { name: 'Material Cyan', hex: '#00BCD4' },
  { name: 'Material Teal', hex: '#009688' },
  { name: 'Material Green', hex: '#4CAF50' },
  { name: 'Material Light Green', hex: '#8BC34A' },
  { name: 'Material Lime', hex: '#CDDC39' },
  { name: 'Material Yellow', hex: '#FFEB3B' },
  { name: 'Material Amber', hex: '#FFC107' },
  { name: 'Material Orange', hex: '#FF9800' },
  { name: 'Material Deep Orange', hex: '#FF5722' },
];

// 扁平化颜色
const flatColors = [
  { name: 'Flat Turquoise', hex: '#1ABC9C' },
  { name: 'Flat Green Sea', hex: '#16A085' },
  { name: 'Flat Peter River', hex: '#3498DB' },
  { name: 'Flat Belize Hole', hex: '#2980B9' },
  { name: 'Flat Amethyst', hex: '#9B59B6' },
  { name: 'Flat Wisteria', hex: '#8E44AD' },
  { name: 'Flat Wet Asphalt', hex: '#34495E' },
  { name: 'Flat Midnight Blue', hex: '#2C3E50' },
  { name: 'Flat Sun Flower', hex: '#F1C40F' },
  { name: 'Flat Orange', hex: '#F39C12' },
  { name: 'Flat Carrot', hex: '#E67E22' },
  { name: 'Flat Alizarin', hex: '#E74C3C' },
  { name: 'Flat Clouds', hex: '#ECF0F1' },
  { name: 'Flat Silver', hex: '#BDC3C7' },
  { name: 'Flat Concrete', hex: '#95A5A6' },
  { name: 'Flat Asbestos', hex: '#7F8C8D' },
];

// 霓虹色
const neonColors = [
  { name: 'Neon Pink', hex: '#FF1493' },
  { name: 'Neon Blue', hex: '#00FFFF' },
  { name: 'Neon Green', hex: '#39FF14' },
  { name: 'Neon Yellow', hex: '#FFFF00' },
  { name: 'Neon Orange', hex: '#FF6600' },
  { name: 'Neon Purple', hex: '#9932CC' },
  { name: 'Neon Red', hex: '#FF073A' },
  { name: 'Neon Cyan', hex: '#00FFFF' },
  { name: 'Neon Magenta', hex: '#FF00FF' },
  { name: 'Neon Lime', hex: '#32CD32' },
  { name: 'Neon Turquoise', hex: '#40E0D0' },
  { name: 'Neon Lavender', hex: '#E6E6FA' },
];

// 自然色
const natureColors = [
  { name: 'Forest Green', hex: '#228B22' },
  { name: 'Earth Brown', hex: '#8B4513' },
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Sunset Orange', hex: '#FF8C00' },
  { name: 'Ocean Blue', hex: '#1E90FF' },
  { name: 'Moss Green', hex: '#8A9A5B' },
  { name: 'Sandy Beige', hex: '#F5DEB3' },
  { name: 'Leaf Green', hex: '#008000' },
  { name: 'Clay Brown', hex: '#B22222' },
  { name: 'Dolphin Gray', hex: '#878787' },
  { name: 'Coral Pink', hex: '#FF7F50' },
  { name: 'Pine Green', hex: '#01796F' },
];

// 金属色
const metalColors = [
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Bronze', hex: '#CD7F32' },
  { name: 'Copper', hex: '#B87333' },
  { name: 'Platinum', hex: '#E5E4E2' },
  { name: 'Brass', hex: '#B5A642' },
  { name: 'Steel Blue', hex: '#4682B4' },
  { name: 'Aluminum', hex: '#A9A9A9' },
  { name: 'Chrome', hex: '#E0E0E0' },
  { name: 'Titanium', hex: '#818589' },
  { name: 'Zinc', hex: '#E8E8E8' },
  { name: 'Lead', hex: '#696969' },
];

// 复古色
const vintageColors = [
  { name: 'Sepia', hex: '#704214' },
  { name: 'Mustard', hex: '#FFDB58' },
  { name: 'Burgundy', hex: '#800020' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Mauve', hex: '#E0B0FF' },
  { name: 'Peach', hex: '#FFDAB9' },
  { name: 'Sage', hex: '#9CAF88' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Coral', hex: '#FF7F50' },
  { name: 'Lavender', hex: '#E6E6FA' },
];

// 季节色
const seasonalColors = [
  { name: 'Spring Green', hex: '#00FF7F' },
  { name: 'Summer Yellow', hex: '#FFFF00' },
  { name: 'Autumn Orange', hex: '#FF8C00' },
  { name: 'Winter Blue', hex: '#1E90FF' },
  { name: 'Cherry Blossom', hex: '#FFB7C5' },
  { name: 'Beach Sand', hex: '#F4A460' },
  { name: 'Fall Leaf', hex: '#8B4513' },
  { name: 'Snow White', hex: '#FFFFFF' },
  { name: 'Tulip Red', hex: '#FF0000' },
  { name: 'Sunflower Yellow', hex: '#FFD700' },
  { name: 'Pumpkin Orange', hex: '#FF7F50' },
  { name: 'Icicle Blue', hex: '#B0E0E6' },
];

// 莫兰迪色
const morandiColors = [
  { name: '莫兰迪灰', hex: '#9B9B9B' },
  { name: '莫兰迪粉', hex: '#E8D8D1' },
  { name: '莫兰迪蓝', hex: '#A8B8C8' },
  { name: '莫兰迪绿', hex: '#A8B8A8' },
  { name: '莫兰迪黄', hex: '#E8D8A8' },
  { name: '莫兰迪紫', hex: '#B8A8C8' },
  { name: '莫兰迪棕', hex: '#B8A89B' },
  { name: '莫兰迪橙', hex: '#E8C8A8' },
  { name: '莫兰迪青', hex: '#A8C8C8' },
  { name: '莫兰迪红', hex: '#C8A8A8' },
  { name: '莫兰迪灰蓝', hex: '#9B9BA8' },
  { name: '莫兰迪灰绿', hex: '#9BA89B' },
];

// 马卡龙色
const macaronColors = [
  { name: '马卡龙粉', hex: '#FFB6C1' },
  { name: '马卡龙蓝', hex: '#87CEFA' },
  { name: '马卡龙绿', hex: '#98FB98' },
  { name: '马卡龙黄', hex: '#FFFACD' },
  { name: '马卡龙紫', hex: '#E6E6FA' },
  { name: '马卡龙橙', hex: '#FFA07A' },
  { name: '马卡龙青', hex: '#E0FFFF' },
  { name: '马卡龙红', hex: '#FFC0CB' },
  { name: '马卡龙灰', hex: '#F0F0F0' },
  { name: '马卡龙棕', hex: '#F5DEB3' },
  { name: '马卡龙天蓝', hex: '#87CEEB' },
  { name: '马卡龙薄荷', hex: '#98FB98' },
];

// 工业风
const industrialColors = [
  { name: '工业黑', hex: '#2C2C2C' },
  { name: '工业灰', hex: '#666666' },
  { name: '工业银', hex: '#999999' },
  { name: '工业红', hex: '#B22222' },
  { name: '工业蓝', hex: '#4682B4' },
  { name: '工业黄', hex: '#DAA520' },
  { name: '工业绿', hex: '#228B22' },
  { name: '工业橙', hex: '#FF8C00' },
  { name: '工业棕', hex: '#8B4513' },
  { name: '工业青', hex: '#008080' },
  { name: '工业紫', hex: '#8A2BE2' },
  { name: '工业白', hex: '#F5F5F5' },
];

// 中国传统色
const chineseColors = [
  { name: '胭脂红', hex: '#E44B4E' },
  { name: '黛青', hex: '#4A6C8C' },
  { name: '琉璃黄', hex: '#FFD700' },
  { name: '玉脂白', hex: '#F7F7F7' },
  { name: '水墨黑', hex: '#1A1A1A' },
  { name: '竹青', hex: '#9DB47E' },
  { name: '朱砂红', hex: '#C93756' },
  { name: '石青', hex: '#557799' },
  { name: '金黄', hex: '#E6B422' },
  { name: '藕荷粉', hex: '#E8B4B8' },
  { name: '松绿', hex: '#3A5F0B' },
  { name: '琥珀色', hex: '#E6C200' },
];

// 复制颜色
const copyColor = (color: { name: string; hex: string }) => {
  navigator.clipboard.writeText(color.hex).then(() => {
    ElMessage.success(t('已复制 {name} 的颜色值: {value}', { name: t(color.name), value: color.hex }));
  }).catch(() => {
    ElMessage.error(t('复制失败'));
  });
};

// 复制渐变色
const copyGradient = (gradient: { name: string; value: string }) => {
  navigator.clipboard.writeText(gradient.value).then(() => {
    ElMessage.success(t('已复制 {name} 的渐变值: {value}', { name: t(gradient.name), value: gradient.value }));
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

.input-section {
  width: 100%;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.color-item {
  height: 120px;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.color-item:hover {
  transform: translateY(-5px);
}

.color-info {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease;
}

.color-name {
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.color-hex {
  display: block;
  font-size: 12px;
  font-family: monospace;
}

.gradient-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.gradient-item {
  height: 120px;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.gradient-item:hover {
  transform: translateY(-5px);
}

.gradient-info {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease;
}

.gradient-name {
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.gradient-value {
  display: block;
  font-size: 12px;
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
}

@media (max-width: 768px) {
  .color-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  .gradient-grid {
    grid-template-columns: 1fr;
  }
}
</style>
