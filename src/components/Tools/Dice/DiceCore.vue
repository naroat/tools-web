<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

//定义emit
const emit = defineEmits(['throwEnd'])
//是否正在掷筛子
const isDicing = ref(false)
//当前显示的动画图片索引
const aniIndex = ref(0)
//掷筛子动画所用到的图片(4张骰子旋转过程中的图)
const diceAnimationImages = ref([
  '/public/images/dice/dice_run1.png',
  '/public/images/dice/dice_run2.png',
  '/public/images/dice/dice_run3.png',
  '/public/images/dice/dice_run4.png'
])
//骰子每一个点的对应的图片
const diceImages = ref({
  //1点的图片
  1: '/public/images/dice/dice1.png',
  //2点的图片
  2: '/public/images/dice/dice2.png',
  //3点的图片
  3: '/public/images/dice/dice3.png',
  //4点的图片
  4: '/public/images/dice/dice4.png',
  //5点的图片
  5: '/public/images/dice/dice5.png',
  //6点的图片
  6: '/public/images/dice/dice6.png'
})
//当前掷筛子掷到的点数（默认1点）
const currentPoint = ref(1)
//定时器
const timer = ref(0)

const getDicePoint = async () => {
  let point = 1;
  //从1~6随机一个数
  point = Math.floor(Math.random() * 6 + 1);
  return point;
}
//掷骰子
const throwDice = async () => {
  //如果当前骰子正在滚动则不能掷骰子
  if (isDicing.value) {
    return
  }
  //从接口获取点数
  currentPoint.value = await getDicePoint();
  //开启骰子动画
  await startAnimation();
  //动画完毕之后可以通知父组件当前掷到的点数
  emit('throwEnd', currentPoint.value);
}
//开启动画效果
const startAnimation = async () => {
  return new Promise((resolve) => {
    //设置筛子开始运动
    isDicing.value = true;
    //记录动画次数
    let num = 0;
    //每隔100毫秒来回切换一张“动”图形成掷骰子的动画
    timer.value = setInterval(() => {
      let index = aniIndex.value;
      index++;
      if (index >= diceAnimationImages.value.length) {
        index = 0;
      }
      aniIndex.value = index;
      num++;
      //差不多执行1.2秒钟的时候可以停止了
      if (num > 12) {
        //关闭定时器
        clearInterval(timer.value);
        //设置骰子停止
        isDicing.value = false;
        //返回结果
        resolve(true);
      }
    }, 100);
  })
}

onBeforeUnmount(() => {
  //组件销毁之前清除定时器
  clearInterval(timer.value);
})

defineExpose({
  throwDice
})
</script>

<template>
	<!-- 骰子组件 -->
	<div class="dice-wrap" @tap="throwDice">
		<!-- 筛子运动时候的展示的图片 -->
		<el-image v-if="isDicing" :src="diceAnimationImages[aniIndex]" class="dice-icon" loading="lazy"></el-image>
		<!-- 筛子静止时候的显示的对应点数的图片 -->
		<el-image v-else :src="diceImages[currentPoint]" class="dice-icon" loading="lazy"></el-image>
	</div>
</template>

<style scoped>
.dice-wrap {
	width: 100px;
	height: 100px;
}

.dice-icon {
  width: 100px;
  height: 100px;
}
</style>