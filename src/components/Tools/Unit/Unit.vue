<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
import { useRoute } from "vue-router"
import Length from './Length.vue'
import Area from './Area.vue'
import Heat from './Heat.vue'
import Power from './Power.vue'
import Pressure from './Pressure.vue'
import Temperature from './Temperature.vue'
import Time from './Time.vue'
import Weight from './Weight.vue'
const info = reactive({
  title: "单位转换",
  activeName: 'lengthTab',
})

const route = useRoute()

const handleClick = () => {

}

onMounted(() => {
  if (route.query.active) {
    switch (route.query.active) {
      case 'area':
        info.activeName = 'areaTab'
        break;
      case 'weight':
        info.activeName = 'weightTab'
        break;
      case 'time':
        info.activeName = 'timeTab'
        break;
      case 'temperature':
        info.activeName = 'temperatureTab'
        break;
      case 'pressure':
        info.activeName = 'pressureTab'
        break;
      case 'heat':
        info.activeName = 'heatTab'
        break;
      case 'power':
        info.activeName = 'powerTab'
        break
      default:
        info.activeName = 'lengthTab'
        break;
    }
  }
})
</script>

<template>
  <div>
    <DetailHeader :title="info.title"></DetailHeader>
    <div>
      <div  class="p-4 rounded-2xl bg-white">
        <el-tabs v-model="info.activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="长度" name="lengthTab">
            <Length/>
          </el-tab-pane>
          <el-tab-pane label="面积" name="areaTab">
            <Area/>
          </el-tab-pane>
          <!-- <el-tab-pane label="体积" name="lengthTab">体积</el-tab-pane> -->
          <el-tab-pane label="重量" name="weightTab">
            <Weight/>
          </el-tab-pane>
          <el-tab-pane label="时间" name="timeTab">
            <Time/>
          </el-tab-pane>
          <!-- <el-tab-pane label="角度" name="fourth">角度</el-tab-pane> -->
          <!-- <el-tab-pane label="速度" name="fourth">速度</el-tab-pane> -->
          <el-tab-pane label="温度" name="temperatureTab">
            <Temperature/>
          </el-tab-pane>
          <el-tab-pane label="压力" name="pressureTab">
            <Pressure/>
          </el-tab-pane>
          <el-tab-pane label="热量" name="heatTab">
            <Heat/>
          </el-tab-pane>
          <el-tab-pane label="功率" name="powerTab">
            <Power/>
          </el-tab-pane>
          <!-- <el-tab-pane label="字节" name="fourth">字节</el-tab-pane> -->
        </el-tabs>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail title="描述">
      <el-text>
        在线单位换算、长度单位换算、面积单位换算、时间单位换算、温度单位换算、压力单位换算、热量单位换算、功率单位换算。
      </el-text> 
    </ToolDetail>

  </div>
</template>

<style scoped>
.custom-box{
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem/* 12px */;
}
.custom-box-single{
  display: flex;
  width: 45%;
}
.custom-box-text{
  text-align: center;
  width: 5rem/* 80px */;
}
</style>