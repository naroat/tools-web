<script setup lang="ts">
import { ref,reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
// import { copy } from '@/utils/string'
const info = reactive({
  title: "抛硬币",
})

const genStatus = ref(false)
const isHeads = ref(true)

const throwCoin = () => {
  genStatus.value = true
  isHeads.value = Math.random() < 0.5;
  setTimeout(() => {
    genStatus.value = false;
  }, 2500); // 休眠5秒，5000毫秒
}
//copy
// const copyRes = async (resStr: string) => {
//   copy(resStr)
// }
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <div style="flex-grow: 3; display: flex; justify-content: center;">
				<!-- coin -->
				<div class="rotate-wrap" :class="[genStatus == true ? (isHeads == true ? 'rotate-wrap-ani-z' : 'rotate-wrap-ani-f') : '']">
					<div class="front circle" :class="[isHeads == true ? 'is-head' : '']"></div>
					<div class="reverse circle" :class="[isHeads == false ? 'is-head' : '']"></div>
				</div>
			</div>
			<div class="flex justify-center">
				<el-button type="primary" class="w-48" size="large" @click="throwCoin" v-if="!genStatus">抛硬币</el-button>
				<el-button type="primary" class="w-48" size="large" disabled v-else>抛硬币...</el-button>
			</div>
    </div>

		<!-- desc -->
		<ToolDetail title="描述">
			<el-text>
				面临艰难的选择？ 我们邀请您在线掷硬币！
			</el-text> 
		</ToolDetail>

  </div>
</template>

<style scoped>

.rotate-wrap {
	width: 100px;
	height: 100px;
	margin: 100px;
	transform-style: preserve-3d;
	position: relative;
}
.rotate-wrap-ani-z{
	/* animation: rotate 5s; */
	animation: rotateZ 2.5s linear infinite;
}
.rotate-wrap-ani-f{
	/* animation: rotate 5s; */
	animation: rotateF 2.5s linear infinite;
}
.rotate-wrap:hover {
	animation-play-state: paused;
}
.rotate-wrap .front, .rotate-wrap .reverse{
	width: 100px;
	height: 100px;
	background-size: cover;
}
.rotate-wrap .front{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-image: url('/public/images/coin/dollar.png');
}
.rotate-wrap .reverse{
	background-image: url('/public/images/coin/xingxing.png');
}

.circle{
	border-radius: 50%;
}
.line{
	height: 200px;
	width: 1px;
	position:absolute;
	top: 0;
	left: 50%;
	background: red;
	transform: translateZ(0px);
}
.is-head{
	transform: translateZ(1px);
}

@keyframes rotateZ {
	0%{
		transform: rotateX(0deg);
	}
	20%{
		transform: rotateX(720deg) scale(1.2);
	}
	50%{
		transform: rotateX(1080deg) scale(1.5);
	}
	80%{
		transform: rotateX(1440deg) scale(1.2);
	}
	100% {
		transform: rotateX(2160deg);
	}
}

@keyframes rotateF {
	0%{
		transform: rotateX(0deg);
	}
	20%{
		transform: rotateX(720deg) scale(1.2);
	}
	50%{
		transform: rotateX(1080deg) scale(1.5);
	}
	80%{
		transform: rotateX(1440deg) scale(1.2);
	}
	100% {
		transform: rotateX(1980deg);
	}
}
</style>