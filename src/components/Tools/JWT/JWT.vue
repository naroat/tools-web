<script setup lang="ts">
import { reactive,ref,onMounted } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import {jwtDecode} from 'jwt-decode'
const info = reactive({
  title: "JWT解析",
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b29scy5yYW5ibG9ncy5jb20iLCJzdWIiOiJhcnlhIiwiYXVkIjoidGFvcmFuIiwiaWF0IjoxNzE3MDM2MzMzLCJleHAiOjE3MTcwMzY5MzN9.9v_eDdsPnvcY7qZatNnKvN9VEf7t7o72OgwhLS6gy6w',
})

const decodeHeader = ref()
const decodePayload = ref()
const invalidToken = ref(false)

//解析
const parser = () => {
  try {
    decodePayload.value = JSON.stringify(jwtDecode(info.token), null, '\t')
    decodeHeader.value = JSON.stringify(jwtDecode(info.token, {header: true}), null, '\t')
  } catch (e) {

    console.log('Invalid token', e)
    invalidToken.value = true
  }  
}

//清空输入框
const clear = () => {
  info.token = ''
  decodeHeader.value = ''
  decodePayload.value = ''
}

onMounted(() => {
  parser()
})
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white ">
      <div class="mb-6">
        <el-input v-model="info.token" :rows="5" type="textarea" placeholder="请输入Token" @change="parser"></el-input>
        <el-text type="danger" v-if="invalidToken">Invalid token</el-text>
        <div class="mt-3">
          <el-button type="primary" @click="parser">解析</el-button>
          <el-button type="primary" @click="clear">清除</el-button>
        </div>
      </div>

      <!-- header -->
      <div v-if="decodeHeader">
        <div class="mb-3">Header(头部)</div>
        <el-input
          v-model="decodeHeader"
          type="textarea"
          :autosize="true"
          class="w-full"
        />
      </div>


      <!-- payload -->
      <div v-if="decodePayload">
        <div class="mb-3 mt-3">Payload(载荷)</div>
        <el-input
          v-model="decodePayload"
          type="textarea"
          :autosize="true"
          v-if="decodePayload"
          class="w-full"
        />
      </div>
      <el-divider content-position="left">描述</el-divider>
      <div>
        <el-text>
          1. JWT 是 JSON Web Tokens 的缩写，是目前最流行的跨域认证解决方案，是一个开放式标准(RFC 7519)，用于在各方之间以JSON对象安全传输信息。<br/>
          2. Header(头部)<br/>
          &nbsp;&nbsp;- typ(type): 用来标识整个token字符串是一个JWT字符串<br/>
          &nbsp;&nbsp;- alg(algorithm): 用来说明这个JWT签发的时候所使用的签名和摘要算法<br/>
          3. Payload(载荷)<br/>
          &nbsp;&nbsp;- iss (Issuer)：签发者<br/>
          &nbsp;&nbsp;- sub (Subject)：主题<br/>
          &nbsp;&nbsp;- aud (Audience)：接收者<br/>
          &nbsp;&nbsp;- exp (Expiration time)：过期时间<br/>
          &nbsp;&nbsp;- nbf (Not Before)：生效时间<br/>
          &nbsp;&nbsp;- iat (Issued At)：签发时间<br/>
          &nbsp;&nbsp;- jti (JWT ID)：编号<br/>
        </el-text>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>