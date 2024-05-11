<script setup lang="ts">
import { ref,reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import DiceCore from "@/components/Tools/Dice/DiceCore.vue"
// import { copy } from '@/utils/string'
const info = reactive({
  title: "投骰子",
})
//骰子数量
const diceNum = ref(1)
const genStatus = ref(false)
const diceRef = ref()
const resetDiceKey = ref(0)

const shake = async () => {
  genStatus.value = true
  
  let res = await new Promise((resolve) => {
    for (let i = 0; i < diceNum.value; i++) {
      diceRef.value[i].throwDice()
    }
    resolve(true)
  })

  //等待执行完成
  setTimeout(() => {  
    console.log(res)
    genStatus.value = false
  }, 1200)
}

//重置骰子点数
const resetDice = () => {
  resetDiceKey.value++
}

</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <view class="grow-[1.5]"></view>
      <div class="flex justify-center grow-[3]">
        <div class="flex flex-wrap h-96 items-center">  
          <!-- 骰子组件 -->
          <DiceCore ref="diceRef" v-for="i in diceNum" :key="resetDiceKey" :class="[diceNum == 1 ? 'dice_full' : '', diceNum == 3 && i == 1 ? 'dice_full' : 'dice_default', diceNum == 5 && i == 3 ? 'dice_full' : 'dice_default']"/>
        </div>
      </div>
      <div class="">
        <div class="ml-5 flex justify-center">
          <el-text style="">骰子数量：</el-text>
          <div class="w-4/6">
            <el-slider class="w-72 ml-3" v-model="diceNum" :min="1" :max="6" :step="1" blockSize="18" :showValue="true"></el-slider>
          </div>
        </div>
      </div>
      <div class="mb-5 flex justify-center">
        <el-button type="primary" class="w-48" size="large" @click="shake" v-if="!genStatus">投骰子</el-button>
        <el-button type="primary" class="w-48" size="large" disabled v-else>投骰子...</el-button>
        <el-button type="primary" class="w-48" size="large" @click="resetDice">重置</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dice_default{
	flex: 0 0 50%; 
	display: flex; 
	justify-content: center;
}
.dice_full{
	flex: 0 0 100%;
	display: flex; 
	justify-content: center;
}
</style>