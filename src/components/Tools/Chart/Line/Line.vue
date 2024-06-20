<script setup lang="ts">
import {ref, reactive, onMounted } from 'vue'
import Spreadsheet from 'x-data-spreadsheet'
import 'x-data-spreadsheet/dist/locale/zh-cn';
import { UploadProps,UploadRawFile,genFileId } from 'element-plus'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'
// import { copy } from '@/utils/string'
import { toEchartsData, toSpreadsheetData } from '@/utils/echarts'
import * as echarts from 'echarts'
import * as XLSX from 'xlsx'
const info = reactive({
  title: "折线图",
})

const chartDom = ref<HTMLElement|null>()
const myChart = ref<echarts.ECharts>()
const dataFileRef = ref()

const setOptionName = ref(1)
//缩放比例
const sacleSize = ref(100)
//画布宽高
const widthCanvas = ref(720)
const heightCanvas = ref(400)
//下载文件类型
const downType = ref('1')
//图形属性颜色
const attrColor = ref('#5470c6')
//标题位置
const titlePos = ref('center')
//标题
const title = ref('Tools-Web')
//副标题
const subTitle = ref('在线图表制作工具')
//显示标题 - 开关
const titleSwitch = ref(true)
//显示副标题 - 开关
const subTitleSwitch = ref(true)

/** 水印 */
const watermarkSwitch = ref(false)  //开关
const waterMarkText = ref('Tools-Web');

//创建水印
const createWatermark = () => {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = canvas.height = 100;
  ctx!.textAlign = 'center';
  ctx!.textBaseline = 'middle';
  ctx!.globalAlpha = 0.08;
  ctx!.font = '20px Microsoft Yahei';
  ctx!.translate(50, 50);
  ctx!.rotate(-Math.PI / 4);
  ctx!.fillText(waterMarkText.value, 0, 0);
  return canvas
}

//操作图表
const canvasHandle = (type) => {
  // let element = document.getElementById('main')
  let element = chartDom.value
  switch(type) {
    case "scale":
      //缩放画布
      let scale = sacleSize.value / 100
      element!.style.transform = `scale(${scale})`
      break
    case "size":
      //图表尺寸
      element!.style.width = widthCanvas.value + 'px';
      element!.style.height = heightCanvas.value + 'px';
      reloadCanvas()
      break
    case "title":
      let fakerTitle = ''
      let fakerSubTitle = ''
      //修改标题相关配置
      if (titleSwitch.value === true) {
        fakerTitle = title.value
      }
      if (subTitleSwitch.value === true) {
        fakerSubTitle = subTitle.value
      }
      myChart.value?.setOption({
        title: {
          text: fakerTitle,
          subtext: fakerSubTitle,
          left: titlePos.value
        }
      })
      break
    case "color":
      //图表属性颜色
      myChart.value?.setOption({
        series: [
          {
            itemStyle: {
              color: attrColor.value
            }
          }
        ]
      })
      break;
    case "watermark":
      //水印
      if (watermarkSwitch.value === true) {
        myChart.value?.setOption({
          backgroundColor: {
            image: createWatermark(),
          }
        })
      } else {
        myChart.value?.setOption({
          backgroundColor: '#fff'
        })
      }
      break;
    case "data":
      //更新数据
      myChart.value?.setOption({
        xAxis: {
          data: colunmData.value,
        },
        series: [
          {
            data: valueData.value,
          }
        ]
      })
      break;
  }
}
const handleChange = () => {

}

//数据
const colunmData = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
const valueData = ref(['23', '24', '18', '25', '27', '28', '25']);
//选项
const option = {
  backgroundColor: '#fff',
  // backgroundColor: {
  //   // type: 'pattern',
  //   // image: canvas,
  //   // repeat: 'repeat'
  // },
  title: {
    text: title.value,
    subtext: subTitle.value,
    left: titlePos.value
  },
  xAxis: {
    data: colunmData.value,
  },
  yAxis: {},
  series: [
    {
      type: 'line',
      data: valueData.value,
      itemStyle: {
        color: attrColor.value
      }
    }
  ],
  tooltip: {}
};

//重新加载画布
const reloadCanvas = () => {
  myChart.value = echarts.init(chartDom.value)
  myChart.value.clear();
  myChart.value.resize({
    width: widthCanvas.value,
    height: heightCanvas.value
  })
  myChart.value.setOption(option)
}

//下载echarts图表图片
const downEchartsImg = () => {
  let ext = downType.value == '1' ? 'png' : 'jpeg'
  let imgUrl = myChart.value?.getDataURL({
    type: ext as "png" | 'jpeg',
    pixelRatio: 2,
  })

  if (imgUrl != undefined) {
    var downloadLink = document.createElement('a');
    downloadLink.href = imgUrl;
    downloadLink.download = 'echart.' + ext;
    downloadLink.click();
  }
}


/** 上传、编辑数据 */
//抽屉开关
const drawer = ref(false)
const rowsData = ref({})

const editData = () => {
  if (drawer.value == true) {
    drawer.value = false
  } else {
    drawer.value = true
    /** 在线excel */
    Spreadsheet.locale('zh-cn', (window.x_spreadsheet as any).$messages['zh-cn']);
    //const sheet = new Spreadsheet("#x-spreadsheet", {
    new Spreadsheet("#x-spreadsheet", {
      showToolbar: false, //隐藏顶部工具栏
      showBottomBar: false,//隐藏底部工具栏,
      view: {
        height: () => document.documentElement.clientHeight / 2,
        width: () => document.documentElement.clientWidth,
      }
    })
      .loadData({
        //样式
        styles: [
          { 
            bgcolor: '#f4f5f8', 
            textwrap: true, 
            color: '#900b09', 
            border: { 
              top: ['thin', '#0366d6'], 
              bottom: ['thin', '#0366d6'], 
              right: ['thin', '#0366d6'], 
              left: ['thin', '#0366d6'], 
            }, 
          }, 
        ], 
        //数据
        rows: rowsData.value
      }) // load data
      .change(data => {
        //表格数据改变后触发
        //规则: 获取第一列和第二列的数据
        let tmp = toEchartsData(data)
        colunmData.value = tmp[0]
        valueData.value = tmp[1]
        canvasHandle('data')
      });
      // sheet.validate()
  }
}

//上传数据文件
const fileList = ref()
const updateDataFile = async (params) => {
  const _file = params.file;
  const fileReader = new FileReader();
  fileReader.onload = (ev) => {
    try {
      if (!ev.target) {
        return
      }
      const data = ev.target.result;
      const workbook = XLSX.read(data, {
        type: 'binary'
      });
      let useCount = 0;
      let tmpColumnData:any[] = [];
      let tmpValueData:any[] = [];
      for (let sheet in workbook.Sheets) {
        //这里只需要第一个sheet
        if (useCount > 0) {
          continue;
        }
        //循环读取每个文件
        const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {header: ['0', '1']});
        //若当前sheet没有数据，则continue
        if(sheetArray.length == 0){
          continue;
        }

        for(let item in sheetArray){
          if (sheetArray[item] != undefined) {
              let tmp1 = sheetArray as []
              tmpColumnData.push(tmp1[item][0])
              tmpValueData.push(tmp1[item][1])
          }
        }
        useCount++
      }
      //更新数据
      colunmData.value = tmpColumnData
      valueData.value = tmpValueData
      //更新图表
      canvasHandle('data')
      //更新表格
      rowsData.value = toSpreadsheetData([
        colunmData, valueData
      ])
    } catch (e) {
      console.log('error')
      console.log(e)
    }
  }
  fileReader.readAsArrayBuffer(_file)
}

//当超出限制时，执行的钩子函数
//这里覆盖前一个文件
const handleExceed: UploadProps['onExceed'] = (files) => {
  dataFileRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  dataFileRef.value!.handleStart(file)
  dataFileRef.value!.submit()
}

//copy
// const copyRes = async (resStr: string) => {
//   copy(resStr)
// }

onMounted(() => {
  //init echart dom
  chartDom.value = document.getElementById('main')
  //设置画布宽高
  canvasHandle('size')
  //reload canvas
  reloadCanvas()
  //数据格式转换成
  rowsData.value = toSpreadsheetData([
    colunmData, valueData
  ])
  // console.log(rowsData.value)
})

</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl flex">
      <div class="w-4/6">
        <div class="flex flex-row-reverse mb-4">
          <el-input-number v-model="sacleSize" :min="1" :max="100" :step="5" @change="canvasHandle('scale')" step-strictly/>
          <el-text>缩放：</el-text>
        </div>
        <!-- <div class="flex justify-center items-center"> -->
        <div class="flex justify-center items-center max-h-[500px] max-w-[1000px] overflow-auto">
          <div id="main" class="bg-white"></div>
        </div>
      </div>     
      <div class="w-2/6 bg-white ml-3 rounded-lg p-3">
        <div class="mb-3">
          <el-button class="w-full mb-3" type="primary" size="large" @click="downEchartsImg">下载图表</el-button>
          <div class="flex items-center ml-1">
            <el-text>文件类型</el-text>
            <el-radio-group v-model="downType" class="ml-4">
              <el-radio size="large" label="1">PNG</el-radio>
              <el-radio size="large" label="2">JPEG</el-radio>
            </el-radio-group>
          </div>
          <div class="flex w-full">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="支持上传：xls, xlsx, csv文件"
              placement="top-start"
            >
              <el-button class="w-1/2">
                <el-upload
                  v-model:file-list="fileList"
                  class="dataFileRef flex"
                  ref="dataFileRef"
                  accept=".xls,.xlsx,.csv"
                  :http-request="updateDataFile"
                  :on-exceed="handleExceed"
                  :limit="1"
                >
                上传数据
                </el-upload>
              </el-button>
              
            </el-tooltip>
            <el-button class="w-1/2" @click="editData">编辑数据</el-button>
          </div>
        </div>
        <el-collapse v-model="setOptionName" @change="handleChange" accordion>
          <el-collapse-item title="画布设置" name="1">
            <div class="flex">
              <el-text class="w-16 text-right">宽度</el-text>
              <el-input-number
                v-model="widthCanvas"
                :min="1"
                :max="4000"
                :step="10"
                controls-position="right"
                class="h-8 w-60 max-w-[60%] ml-3"
                @change="canvasHandle('size')"
              />
            </div>
            <div class="flex mt-3">
              <el-text class="w-16 text-right">高度</el-text>
              <el-input-number
                v-model="heightCanvas"
                :min="1"
                :max="4000"
                :step="10"
                controls-position="right"
                class="h-8 w-60 max-w-[60%] ml-3"
                @change="canvasHandle('size')"
              />
            </div>
          </el-collapse-item>
          <el-collapse-item title="标题设置" name="2">
            <div class="flex">
              <el-text class="w-16 text-right">位置</el-text>
              <el-radio-group v-model="titlePos" class="ml-3" @change="canvasHandle('title')">
                <el-radio-button label="left" value="left">左</el-radio-button>
                <el-radio-button label="center" value="center">中</el-radio-button>
                <el-radio-button label="right" value="right">右</el-radio-button>
              </el-radio-group>
            </div>
            <el-divider content-position="left" class="pl-10">标题</el-divider>
            <div class="flex">
              <el-text class="w-16 text-right">显示</el-text>
              <el-switch v-model="titleSwitch" class="ml-3" @change="canvasHandle('title')"/>
            </div>
            <div class="flex">
              <el-text class="w-16 text-right">标题</el-text>
              <el-input class="h-8 w-60 max-w-[60%] ml-3" v-model="title" @blur="canvasHandle('title')"></el-input>
            </div>
            <el-divider content-position="left">副标题</el-divider>
            <div class="flex">
              <el-text class="w-16 text-right">显示</el-text>
              <el-switch v-model="subTitleSwitch" class="ml-3" @change="canvasHandle('title')"/>
            </div>
            <div class="flex">
              <el-text class="w-16 text-right">副标题</el-text>
              <el-input class="h-8 w-60 max-w-[60%] ml-3" v-model="subTitle"  @blur="canvasHandle('title')"></el-input>
            </div>
          </el-collapse-item>
          <el-collapse-item title="图形属性" name="3">
            <div class="flex">
              <el-text class="w-16 text-right">颜色</el-text>
              <el-color-picker v-model="attrColor" class="ml-3" @change="canvasHandle('color')"/>
            </div>
          </el-collapse-item>
          <el-collapse-item title="水印设置" name="4">
            <div class="flex">
              <el-text class="w-16 text-right">显示</el-text>
              <el-switch v-model="watermarkSwitch" class="ml-3" @change="canvasHandle('watermark')"/>
            </div>
            <div class="flex">
              <el-text class="w-16 text-right">水印内容</el-text>
              <el-input class="h-8 w-60 max-w-[60%] ml-3" v-model="waterMarkText" @change="canvasHandle('watermark')"></el-input>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    
    <el-drawer id="x-spreadsheet" v-model="drawer" direction="btt" class="sheet" style="">
    </el-drawer>

    <!-- desc -->
    <ToolDetail title="描述">
      <el-text>
        折线图为日常最常用的图表之一，当必须呈现与时间相关的数据时，它是首选它最适合分析趋势。<br>
        在线图表制作工具，在线制作折线图<br>
        支持导入表格并在线编辑表格生成折线图，支持png和jpeg格式导出<br>
        支持超全的自定义配置，轻松实现你的个性化图表需求<br>
      </el-text> 
    </ToolDetail>
  </div>
</template>

<style scoped>
:deep(.el-drawer__body){
  display: none !important;
}
:deep(.el-drawer__header){
  display: none !important;
  margin-bottom: 0 !important;
}
:deep(.el-drawer){
  height: 50% !important;
}
:deep(.el-upload-list){
  display: none !important;
}
</style>