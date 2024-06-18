<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import { ElMessage } from 'element-plus'
import { copy } from '@/utils/string'
import { isBinary, isOctal, isDecimal, isHexadecimal } from '@/utils/verify'
import { InfoFilled } from '@element-plus/icons-vue'
import { scale58ToBase, scale62ToBase, scale64ToBase, baseToScale58, baseToScale62, baseToScale64 } from '@/utils/math'

const info = reactive({
  title: "常用进制转换",
  content: '',
  chooseTranOptions: '10',
  tranOptions: [
    {
      value: '2',
      label: '2进制',
      tranValue: '',
      desc: '',
    },
    {
      value: '8',
      label: '8进制',
      tranValue: '',
      desc: '',
    },
    {
      value: '10',
      label: '10进制',
      tranValue: '',
      desc: '',
    },
    {
      value: '16',
      label: '16进制',
      tranValue: '',
      desc: '',
    },
    {
      value: '32',
      label: '32进制',
      tranValue: '',
      desc: '数字 + 大写字母，不包含 ILOU 字符',
    },
    {
      value: '58',
      label: '58进制',
      tranValue: '',
      desc: '数字 + 大小写字母，不包含 0OlI 字符',
    },
    {
      value: '62',
      label: '62进制',
      tranValue: '',
      desc: '数字 + 大小写字母',
    },
    {
      value: '64',
      label: '64进制',
      tranValue: '',
      desc: '数字 + 大小写字母以及两个特殊字符 +/',
    },
  ]
})

//高进制转换10进制 - int
const tailScaleToBase = (content: string, scale: number): number => {
  let res = 0
  switch(scale) {
    case 58:
      res = scale58ToBase(content)
      break;
    case 62:
      res = scale62ToBase(content)
      break;
    case 64:
      res = scale64ToBase(content)
      break;
    default:
      ElMessage({
        message: "参数错误",
        type: "warning",
        duration: 1500
      })
  }
  return res
}

//10进制转换高进制
const baseToTailScale = (num: number, scale: number): string => {
  let res = ''
  switch(scale) {
    case 58:
      res = baseToScale58(num)
      break;
    case 62:
      res = baseToScale62(num)
      break;
    case 64:
      res = baseToScale64(num)
      break;
    default:
      ElMessage({
        message: "参数错误",
        type: "warning",
        duration: 1500
      })
  }
  return res
}

//转换前 - check
const tranCheck = () => {
  if (!info.content) {
    ElMessage({
      message: "请输入转换数值",
      type: "warning",
      duration: 1500
    })
    return false
  }

  if (info.chooseTranOptions == '2' && isBinary(info.content) == false) {
    ElMessage({
      message: "不是二进制值",
      type: "warning",
      duration: 1500
    })
    return false
  }

  if (info.chooseTranOptions == '8' && isOctal(info.content) == false) {
    ElMessage({
      message: "不是八进制值",
      type: "warning",
      duration: 1500
    })
    return false
  }

  if (info.chooseTranOptions == '10' && isDecimal(info.content) == false) {
    ElMessage({
      message: "不是十进制值",
      type: "warning",
      duration: 1500
    })
    return false
  }

  if (info.chooseTranOptions == '16' && isHexadecimal(info.content) == false) {
    ElMessage({
      message: "不是十六进制值",
      type: "warning",
      duration: 1500
    })
    return false
  }

  return true
}

//转换
const tran = () => {
  //转换前 - check
  if (!tranCheck()) {
    return
  }

  //当前输入的内容转换成10进制
  let tranContent
  let chooseTranInt = parseInt(info.chooseTranOptions, 10)
  if (chooseTranInt <= 36) {
    tranContent = parseInt(info.content, chooseTranInt)
  } else {
    tranContent = tailScaleToBase(info.content, chooseTranInt)
  }
  
  //用上面转换的10进制内容转换对应进制
  for (let index in info.tranOptions) {
    let valueInt = parseInt(info.tranOptions[index].value, 10)
    if (valueInt <= 36) {
      info.tranOptions[index].tranValue = tranContent.toString(valueInt)
    } else {
      info.tranOptions[index].tranValue = baseToTailScale(tranContent, valueInt)
    }
  }
}

//copy
const copyRes = async (index: any) => {
  copy(info.tranOptions[index].tranValue)
}
</script>

<template>
  <div class="flex flex-col mt-3 flex-1 ">
    <DetailHeader :title="info.title"></DetailHeader>
    <div class="p-4 rounded-2xl bg-white">
      <div class="flex">
        <div class="mr-2 w-full">
          <el-input v-model="info.content">
            <template #prepend>
              <el-select v-model="info.chooseTranOptions" placeholder="Select"  class="choosetranoptions-select">
                <el-option
                  v-for="item in info.tranOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-input>
        </div>
        
        <el-button type="primary" @click="tran()">转换</el-button>
      </div>

      <div class="mt-3 min-h-md bg-gray-100 p-3 mb-3 flex flex-col">
        <el-table :data="info.tranOptions" border style="width: 100%">
          <el-table-column prop="label" label="进制" width="120">
            <template #default="scope">
              <div class="flex items-center">
                <span class="mr-1">{{ scope.row.label }}</span>
                <el-tooltip
                  v-if="scope.row.desc != ''"
                  class="box-item"
                  effect="dark"
                  :content="scope.row.desc"
                  placement="top-start"
                ><el-icon ><InfoFilled /></el-icon></el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tranValue" label="结果"/>
          <el-table-column prop="" label="操作" width="60">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click.prevent="copyRes(scope.$index)"
              >
                复制
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.choosetranoptions-select{
  @apply w-24
}
</style>