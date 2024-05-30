<script setup lang="ts">
import { reactive,ref,onMounted } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import { copy } from '@/utils/string'
import { CopyDocument } from '@element-plus/icons-vue'
import { colord, extend } from 'colord';
import cmykPlugin from 'colord/plugins/cmyk';
import hwbPlugin from 'colord/plugins/hwb';
import namesPlugin from 'colord/plugins/names';
import lchPlugin from 'colord/plugins/lch';
import labPlugin from 'colord/plugins/lab';
extend([cmykPlugin, hwbPlugin, namesPlugin, lchPlugin, labPlugin]);

const info = reactive({
  title: "Color选择器",
})

const color = ref('#409eff')
const hex = ref()
const rgb = ref()
const hsl = ref()
const hsv = ref()
const hwb = ref()
const lab = ref()
const lch = ref()
const cmyk = ref()
const name = ref()


const change = () => {
  let colorObj = colord(color.value)
  hex.value = colorObj.toHex()
  rgb.value = colorObj.toRgbString()
  hsl.value = colorObj.toHslString()
  hsv.value = colorObj.toHsv()
  hwb.value = colorObj.toHwbString()
  lab.value = colorObj.toLab()
  lch.value = colorObj.toLchString()
  cmyk.value = colorObj.toCmykString()
  name.value = colorObj.toName({ closest: true }) //{ closest: true } 接近的
  console.log(colorObj.toHslString())
}

//copy
const copyRes = async (resStr: string) => {
  copy(resStr)
}


onMounted(() => {
  change()
})

</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white text-center">
      <ul class="w-3/4">
        <li class='flex items-center mb-3'>
          <div class="w-36 text-right pr-3">选择颜色:</div>
          <div class="w-full text-left">
            <el-color-picker v-model="color" size="large" @change="change"/>
          </div>
        </li>

        <li class='flex items-center mb-3'>
          <div class="w-36 text-right pr-3">Hex:</div>
          <div class="w-full pl-3 p-1  text-left bg-[#f5f5fb] flex items-center justify-between">
            <div>
              {{ hex }}
            </div>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="复制到剪贴板"
              placement="top"
            >
              <el-button :icon="CopyDocument" text bg type="primary" @click="copyRes(hex)"> </el-button>
            </el-tooltip>
          </div>
        </li>

        <li class='flex items-center mb-3'>
          <div class="w-36 text-right pr-3">RGB:</div>
          <div class="w-full pl-3 p-1  text-left bg-[#f5f5fb] flex items-center justify-between">
            <div>
              {{ rgb }}
            </div>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="复制到剪贴板"
              placement="top"
            >
              <el-button :icon="CopyDocument" text bg type="primary" @click="copyRes(rgb)"> </el-button>
            </el-tooltip>
          </div>
        </li>

        <li class='flex items-center mb-3'>
          <div class="w-36 text-right pr-3">HSL:</div>
          <div class="w-full pl-3 p-1  text-left bg-[#f5f5fb] flex items-center justify-between">
            <div>
              {{ hsl }}
            </div>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="复制到剪贴板"
              placement="top"
            >
              <el-button :icon="CopyDocument" text bg type="primary" @click="copyRes(hsl)"> </el-button>
            </el-tooltip>
          </div>
        </li>

        <li class='flex items-center mb-3'>
          <div class="w-36 text-right pr-3">HSV:</div>
          <div class="w-full pl-3 p-1  text-left bg-[#f5f5fb] flex items-center justify-between">
            <div>
              {{ hsv }}
            </div>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="复制到剪贴板"
              placement="top"
            >
              <el-button :icon="CopyDocument" text bg type="primary" @click="copyRes(JSON.stringify(hsv))"> </el-button>
            </el-tooltip>
          </div>
        </li>

        <li class='flex items-center mb-3'>
          <div class="w-36 text-right pr-3">HWB:</div>
          <div class="w-full pl-3 p-1  text-left bg-[#f5f5fb] flex items-center justify-between">
            <div>
              {{ hwb }}
            </div>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="复制到剪贴板"
              placement="top"
            >
              <el-button :icon="CopyDocument" text bg type="primary" @click="copyRes(hwb)"> </el-button>
            </el-tooltip>
          </div>
        </li>

        <li class='flex items-center mb-3'>
          <div class="w-36 text-right pr-3">LAB:</div>
          <div class="w-full pl-3 p-1  text-left bg-[#f5f5fb] flex items-center justify-between">
            <div>
              {{ lab }}
            </div>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="复制到剪贴板"
              placement="top"
            >
              <el-button :icon="CopyDocument" text bg type="primary" @click="copyRes(JSON.stringify(lab))"> </el-button>
            </el-tooltip>
          </div>
        </li>

        <li class='flex items-center mb-3'>
          <div class="w-36 text-right pr-3">LCH:</div>
          <div class="w-full pl-3 p-1  text-left bg-[#f5f5fb] flex items-center justify-between">
            <div>
              {{ lch }}
            </div>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="复制到剪贴板"
              placement="top"
            >
              <el-button :icon="CopyDocument" text bg type="primary" @click="copyRes(lch)"> </el-button>
            </el-tooltip>
          </div>
        </li>

        <li class='flex items-center mb-3'>
          <div class="w-36 text-right pr-3">CMYK:</div>
          <div class="w-full pl-3 p-1  text-left bg-[#f5f5fb] flex items-center justify-between">
            <div>
              {{ cmyk }}
            </div>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="复制到剪贴板"
              placement="top"
            >
              <el-button :icon="CopyDocument" text bg type="primary" @click="copyRes(cmyk)"> </el-button>
            </el-tooltip>
          </div>
        </li>

        <li class='flex items-center mb-3'>
          <div class="w-36 text-right pr-3">Name:</div>
          <div class="w-full pl-3 p-1  text-left bg-[#f5f5fb] flex items-center justify-between">
            <div>
              {{ name }}
            </div>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="复制到剪贴板"
              placement="top"
            >
              <el-button :icon="CopyDocument" text bg type="primary" @click="copyRes(name)"> </el-button>
            </el-tooltip>
          </div>
        </li>
      </ul>
      
      

      <!-- <el-divider content-position="left">描述</el-divider>
      <div class="text-left">
        <el-text>
          在 CSS 中，颜色无处不在，它可以作为文字、背景、阴影、表格、边框、链接等属性。我们在 CSS 中使用的大多数颜色都是 Hex 和 RGB，其实表示颜色的方式有很多；
          <div class="indent-8">
              - RGB: RGB 值也是我们常用的颜色表示方式。RGB 指的就是红-绿-蓝，这个顺序非常重要。每种颜色使用 0 到 255 之间的数字指定。最常见的 RGB 值黑色：rgb(0,0,0) 和白色：rgb(255,255,255)。RGB表示法使我们以更易读的形式来访问与十六进制值相同的颜色范围。
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;- Hex: 可以使用十六进制值来表示 CSS 中的颜色，这也是我们用的最多的颜色表示方式。十六进制使用 16 个符号表示，使用 0 - 9 表示值 0 到 9，A - F 表示值 10 到 15<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;- HSL: HSL 全称是 Hue-Saturation-Lightness，分别表示色调、饱和度和亮度。它基于 RGB 色轮的。每种颜色都有一个角度以及饱和度和亮度值的百分比值<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;- HSV: HSV色彩空间是对传统RGB模型的一种改进，引入了三个主要组件来定义颜色：色调（H）、饱和度（S）和明度（V）。与RGB模型不同，后者基于颜色的主导波长、饱和度和亮度提供了更直观的颜色描述方式。
          &nbsp;&nbsp;&nbsp;&nbsp;- HWB: HWB 全称为Hue-Whiteness-Blackness，表示色调、白度和黑度。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;- LAB: LAB 是一个可以在 Photoshop 等软件中访问的颜色空间，它代表了人类可以看到的整个颜色范围。它使用三个轴表示：亮度、a 轴和b 轴。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;- LCH: LCH 代表亮度、色度和色调。它与 Lab 具有相同的 L 值，但不是使用坐标 a* 和 b*，而是使用 C（色度）和 H（色调）。色调可以是 0 到 360 之间的值。色度代表颜色的量，它类似于 HSL 中的饱和度。但是色度值可以超过 100，理论上它是无上限的。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;- CMYK: CMYK 代表 Cyan、Magenta、Yellow 和 Key，它们与打印机中的墨水颜色相匹配。虽然屏幕通常以 RGB 来显示颜色，而打印机通常使用青色、品红色、黄色和黑色的组合来表示颜色，这些是最常见的墨水颜色。<br/>
        </el-text>
      </div> -->

    </div>
  </div>
</template>

<style scoped>

</style>