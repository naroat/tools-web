<script setup lang="ts">
import { reactive } from 'vue'
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
// import { copy } from '@/utils/string'
const info = reactive({
  title: "ASCII码表",
})
// ascii: https://ascii.co.uk/table
const tableDataControlCodes = reactive([
  {dec:"0",oct:"000",hex:"0",code:"NUL",desc:"空字符"},
  {dec:"1",oct:"001",hex:"1",code:"SOH",desc:"标题开始"},
  {dec:"2",oct:"002",hex:"2",code:"STX",desc:"正文开始"},
  {dec:"3",oct:"003",hex:"3",code:"ETX",desc:"正文结束"},
  {dec:"4",oct:"004",hex:"4",code:"EOT",desc:"传输结束"},
  {dec:"5",oct:"005",hex:"5",code:"ENQ",desc:"询问"},
  {dec:"6",oct:"006",hex:"6",code:"ACK",desc:"收到通知"},
  {dec:"7",oct:"007",hex:"7",code:"BEL",desc:"铃"},
  {dec:"8",oct:"010",hex:"8",code:"BS",desc:"退格"},
  {dec:"9",oct:"011",hex:"9",code:"HT",desc:"水平制表符"},
  {dec:"10",oct:"012",hex:"A",code:"LF",desc:"换行键"},
  {dec:"11",oct:"013",hex:"B",code:"VT",desc:"垂直制表符"},
  {dec:"12",oct:"014",hex:"C",code:"FF",desc:"换页键"},
  {dec:"13",oct:"015",hex:"D",code:"CR",desc:"回车键"},
  {dec:"14",oct:"016",hex:"E",code:"SO",desc:"移出"},
  {dec:"15",oct:"017",hex:"F",code:"SI",desc:"移入"},
  {dec:"16",oct:"020",hex:"10",code:"DLE",desc:"数据链路转义"},
  {dec:"17",oct:"021",hex:"11",code:"DC1",desc:"设备控制 1"},
  {dec:"18",oct:"022",hex:"12",code:"DC2",desc:"设备控制 2"},
  {dec:"19",oct:"023",hex:"13",code:"DC3",desc:"设备控制 3"},
  {dec:"20",oct:"024",hex:"14",code:"DC4",desc:"设备控制 4"},
  {dec:"21",oct:"025",hex:"15",code:"NAK",desc:"拒绝接收"},
  {dec:"22",oct:"026",hex:"16",code:"SYN",desc:"同步空闲"},
  {dec:"23",oct:"027",hex:"17",code:"ETB",desc:"传输块结束"},
  {dec:"24",oct:"030",hex:"18",code:"CAN",desc:"取消"},
  {dec:"25",oct:"031",hex:"19",code:"EM",desc:"介质中断"},
  {dec:"26",oct:"032",hex:"1A",code:"SUB",desc:"替换"},
  {dec:"27",oct:"033",hex:"1B",code:"ESC",desc:"换码符"},
  {dec:"28",oct:"034",hex:"1C",code:"FS",desc:"文件分隔符"},
  {dec:"29",oct:"035",hex:"1D",code:"GS",desc:"组分隔符"},
  {dec:"30",oct:"036",hex:"1E",code:"RS",desc:"记录分离符"},
  {dec:"31",oct:"037",hex:"1F",code:"US",desc:"单元分隔符"}
])

const tableDataStandard = reactive([
  {dec:"32",oct:"040",hex:"20",code:"Space",desc:"空格"},
  {dec:"33",oct:"041",hex:"21",code:"!",desc:""},
  {dec:"34",oct:"042",hex:"22",code:"\"",desc:""},
  {dec:"35",oct:"043",hex:"23",code:"#",desc:""},
  {dec:"36",oct:"044",hex:"24",code:"$",desc:""},
  {dec:"37",oct:"045",hex:"25",code:"%",desc:""},
  {dec:"38",oct:"046",hex:"26",code:"&",desc:""},
  {dec:"40",oct:"050",hex:"28",code:"(",desc:""},
  {dec:"41",oct:"051",hex:"29",code:")",desc:""},
  {dec:"42",oct:"052",hex:"2A",code:"*",desc:""},
  {dec:"43",oct:"053",hex:"2B",code:"+",desc:""},
  {dec:"44",oct:"054",hex:"2C",code:",",desc:""},
  {dec:"45",oct:"055",hex:"2D",code:"-",desc:""},
  {dec:"46",oct:"056",hex:"2E",code:".",desc:""},
  {dec:"47",oct:"057",hex:"2F",code:"\/",desc:""},
  {dec:"48",oct:"060",hex:"30",code:"0",desc:""},
  {dec:"49",oct:"061",hex:"31",code:"1",desc:""},
  {dec:"50",oct:"062",hex:"32",code:"2",desc:""},
  {dec:"51",oct:"063",hex:"33",code:"3",desc:""},
  {dec:"52",oct:"064",hex:"34",code:"4",desc:""},
  {dec:"53",oct:"065",hex:"35",code:"5",desc:""},
  {dec:"54",oct:"066",hex:"36",code:"6",desc:""},
  {dec:"55",oct:"067",hex:"37",code:"7",desc:""},
  {dec:"56",oct:"070",hex:"38",code:"8",desc:""},
  {dec:"57",oct:"071",hex:"39",code:"9",desc:""},
  {dec:"58",oct:"072",hex:"3A",code:":",desc:""},
  {dec:"59",oct:"073",hex:"3B",code:";",desc:""},
  {dec:"60",oct:"074",hex:"3C",code:"<",desc:""},
  {dec:"61",oct:"075",hex:"3D",code:"=",desc:""},
  {dec:"62",oct:"076",hex:"3E",code:">",desc:""},
  {dec:"63",oct:"077",hex:"3F",code:"?",desc:""},
  {dec:"64",oct:"100",hex:"40",code:"@",desc:""},
  {dec:"65",oct:"101",hex:"41",code:"A",desc:""},
  {dec:"66",oct:"102",hex:"42",code:"B",desc:""},
  {dec:"67",oct:"103",hex:"43",code:"C",desc:""},
  {dec:"68",oct:"104",hex:"44",code:"D",desc:""},
  {dec:"69",oct:"105",hex:"45",code:"E",desc:""},
  {dec:"70",oct:"106",hex:"46",code:"F",desc:""},
  {dec:"71",oct:"107",hex:"47",code:"G",desc:""},
  {dec:"72",oct:"110",hex:"48",code:"H",desc:""},
  {dec:"73",oct:"111",hex:"49",code:"I",desc:""},
  {dec:"74",oct:"112",hex:"4A",code:"J",desc:""},
  {dec:"75",oct:"113",hex:"4B",code:"K",desc:""},
  {dec:"76",oct:"114",hex:"4C",code:"L",desc:""},
  {dec:"77",oct:"115",hex:"4D",code:"M",desc:""},
  {dec:"78",oct:"116",hex:"4E",code:"N",desc:""},
  {dec:"79",oct:"117",hex:"4F",code:"O",desc:""},
  {dec:"80",oct:"120",hex:"50",code:"P",desc:""},
  {dec:"81",oct:"121",hex:"51",code:"Q",desc:""},
  {dec:"82",oct:"122",hex:"52",code:"R",desc:""},
  {dec:"83",oct:"123",hex:"53",code:"S",desc:""},
  {dec:"84",oct:"124",hex:"54",code:"T",desc:""},
  {dec:"85",oct:"125",hex:"55",code:"U",desc:""},
  {dec:"86",oct:"126",hex:"56",code:"V",desc:""},
  {dec:"87",oct:"127",hex:"57",code:"W",desc:""},
  {dec:"88",oct:"130",hex:"58",code:"X",desc:""},
  {dec:"89",oct:"131",hex:"59",code:"Y",desc:""},
  {dec:"90",oct:"132",hex:"5A",code:"Z",desc:""},
  {dec:"91",oct:"133",hex:"5B",code:"[",desc:""},
  {dec:"92",oct:"134",hex:"5C",code:"\\",desc:""},
  {dec:"93",oct:"135",hex:"5D",code:"]",desc:""},
  {dec:"94",oct:"136",hex:"5E",code:"^",desc:""},
  {dec:"95",oct:"137",hex:"5F",code:"_",desc:""},
  {dec:"96",oct:"140",hex:"60",code:"`",desc:""},
  {dec:"97",oct:"141",hex:"61",code:"a",desc:""},
  {dec:"98",oct:"142",hex:"62",code:"b",desc:""},
  {dec:"99",oct:"143",hex:"63",code:"c",desc:""},
  {dec:"100",oct:"144",hex:"64",code:"d",desc:""},
  {dec:"101",oct:"145",hex:"65",code:"e",desc:""},
  {dec:"102",oct:"146",hex:"66",code:"f",desc:""},
  {dec:"103",oct:"147",hex:"67",code:"g",desc:""},
  {dec:"104",oct:"150",hex:"68",code:"h",desc:""},
  {dec:"105",oct:"151",hex:"69",code:"i",desc:""},
  {dec:"106",oct:"152",hex:"6A",code:"j",desc:""},
  {dec:"107",oct:"153",hex:"6B",code:"k",desc:""},
  {dec:"108",oct:"154",hex:"6C",code:"l",desc:""},
  {dec:"109",oct:"155",hex:"6D",code:"m",desc:""},
  {dec:"110",oct:"156",hex:"6E",code:"n",desc:""},
  {dec:"111",oct:"157",hex:"6F",code:"o",desc:""},
  {dec:"112",oct:"160",hex:"70",code:"p",desc:""},
  {dec:"113",oct:"161",hex:"71",code:"q",desc:""},
  {dec:"114",oct:"162",hex:"72",code:"r",desc:""},
  {dec:"115",oct:"163",hex:"73",code:"s",desc:""},
  {dec:"116",oct:"164",hex:"74",code:"t",desc:""},
  {dec:"117",oct:"165",hex:"75",code:"u",desc:""},
  {dec:"118",oct:"166",hex:"76",code:"v",desc:""},
  {dec:"119",oct:"167",hex:"77",code:"w",desc:""},
  {dec:"120",oct:"170",hex:"78",code:"x",desc:""},
  {dec:"121",oct:"171",hex:"79",code:"y",desc:""},
  {dec:"122",oct:"172",hex:"7A",code:"z",desc:""},
  {dec:"123",oct:"173",hex:"7B",code:"{",desc:""},
  {dec:"124",oct:"174",hex:"7C",code:"|",desc:""},
  {dec:"125",oct:"175",hex:"7D",code:"},",desc:""},
  {dec:"126",oct:"176",hex:"7E",code:"~",desc:""},
  {dec:"127",oct:"177",hex:"7F",code:"DEL",desc:"删除"},
])

const tableDataNonStandard = reactive([
  {dec:"128",oct:"200",hex:"80",code:"\u20ac",desc:""},
  {dec:"129",oct:"201",hex:"81",code:"\u0081",desc:""},
  {dec:"130",oct:"202",hex:"82",code:"\u201a",desc:""},
  {dec:"131",oct:"203",hex:"83",code:"\u0192",desc:""},
  {dec:"132",oct:"204",hex:"84",code:"\u201e",desc:""},
  {dec:"133",oct:"205",hex:"85",code:"\u2026",desc:""},
  {dec:"134",oct:"206",hex:"86",code:"\u2020",desc:""},
  {dec:"135",oct:"207",hex:"87",code:"\u2021",desc:""},
  {dec:"136",oct:"210",hex:"88",code:"\u02c6",desc:""},
  {dec:"137",oct:"211",hex:"89",code:"\u2030",desc:""},
  {dec:"138",oct:"212",hex:"8A",code:"\u0160",desc:""},
  {dec:"139",oct:"213",hex:"8B",code:"\u2039",desc:""},
  {dec:"140",oct:"214",hex:"8C",code:"\u0152",desc:""},
  {dec:"141",oct:"215",hex:"8D",code:"\u008d",desc:""},
  {dec:"142",oct:"216",hex:"8E",code:"\u017d",desc:""},
  {dec:"143",oct:"217",hex:"8F",code:"\u008f",desc:""},
  {dec:"144",oct:"220",hex:"90",code:"\u0090",desc:""},
  {dec:"145",oct:"221",hex:"91",code:"\u2018",desc:""},
  {dec:"146",oct:"222",hex:"92",code:"\u2019",desc:""},
  {dec:"147",oct:"223",hex:"93",code:"\u201c",desc:""},
  {dec:"148",oct:"224",hex:"94",code:"\u201d",desc:""},
  {dec:"149",oct:"225",hex:"95",code:"\u2022",desc:""},
  {dec:"150",oct:"226",hex:"96",code:"\u2013",desc:""},
  {dec:"151",oct:"227",hex:"97",code:"\u2014",desc:""},
  {dec:"152",oct:"230",hex:"98",code:"\u02dc",desc:""},
  {dec:"153",oct:"231",hex:"99",code:"\u2122",desc:""},
  {dec:"154",oct:"232",hex:"9A",code:"\u0161",desc:""},
  {dec:"155",oct:"233",hex:"9B",code:"\u203a",desc:""},
  {dec:"156",oct:"234",hex:"9C",code:"\u0153",desc:""},
  {dec:"157",oct:"235",hex:"9D",code:"\u009d",desc:""},
  {dec:"158",oct:"236",hex:"9E",code:"\u017e",desc:""},
  {dec:"159",oct:"237",hex:"9F",code:"\u0178",desc:""},
  {dec:"160",oct:"240",hex:"A0",code:" ",desc:"\u63d2\u5165\u7a7a\u683c"},
  {dec:"161",oct:"241",hex:"A1",code:"\u00a1",desc:""},
  {dec:"162",oct:"242",hex:"A2",code:"\u00a2",desc:""},
  {dec:"163",oct:"243",hex:"A3",code:"\u00a3",desc:""},
  {dec:"164",oct:"244",hex:"A4",code:"\u00a4",desc:""},
  {dec:"165",oct:"245",hex:"A5",code:"\u00a5",desc:""},
  {dec:"166",oct:"246",hex:"A6",code:"\u00a6",desc:""},
  {dec:"167",oct:"247",hex:"A7",code:"\u00a7",desc:""},
  {dec:"168",oct:"250",hex:"A8",code:"\u00a8",desc:""},
  {dec:"169",oct:"251",hex:"A9",code:"\u00a9",desc:""},
  {dec:"170",oct:"252",hex:"AA",code:"\u00aa",desc:""},
  {dec:"171",oct:"253",hex:"AB",code:"\u00ab",desc:""},
  {dec:"172",oct:"254",hex:"AC",code:"\u00ac",desc:""},
  {dec:"173",oct:"255",hex:"AD",code:"\u00ad",desc:""},
  {dec:"174",oct:"256",hex:"AE",code:"\u00ae",desc:""},
  {dec:"175",oct:"257",hex:"AF",code:"\u00af",desc:""},
  {dec:"176",oct:"260",hex:"B0",code:"\u00b0",desc:""},
  {dec:"177",oct:"261",hex:"B1",code:"\u00b1",desc:""},
  {dec:"178",oct:"262",hex:"B2",code:"\u00b2",desc:""},
  {dec:"179",oct:"263",hex:"B3",code:"\u00b3",desc:""},
  {dec:"180",oct:"264",hex:"B4",code:"\u00b4",desc:""},
  {dec:"181",oct:"265",hex:"B5",code:"\u00b5",desc:""},
  {dec:"182",oct:"266",hex:"B6",code:"\u00b6",desc:""},
  {dec:"183",oct:"267",hex:"B7",code:"\u00b7",desc:""},
  {dec:"184",oct:"270",hex:"B8",code:"\u00b8",desc:""},
  {dec:"185",oct:"271",hex:"B9",code:"\u00b9",desc:""},
  {dec:"186",oct:"272",hex:"BA",code:"\u00ba",desc:""},
  {dec:"187",oct:"273",hex:"BB",code:"\u00bb",desc:""},
  {dec:"188",oct:"274",hex:"BC",code:"\u00bc",desc:""},
  {dec:"189",oct:"275",hex:"BD",code:"\u00bd",desc:""},
  {dec:"190",oct:"276",hex:"BE",code:"\u00be",desc:""},
  {dec:"191",oct:"277",hex:"BF",code:"\u00bf",desc:""},
  {dec:"192",oct:"300",hex:"C0",code:"\u00c0",desc:""},
  {dec:"193",oct:"301",hex:"C1",code:"\u00c1",desc:""},
  {dec:"194",oct:"302",hex:"C2",code:"\u00c2",desc:""},
  {dec:"195",oct:"303",hex:"C3",code:"\u00c3",desc:""},
  {dec:"196",oct:"304",hex:"C4",code:"\u00c4",desc:""},
  {dec:"197",oct:"305",hex:"C5",code:"\u00c5",desc:""},
  {dec:"198",oct:"306",hex:"C6",code:"\u00c6",desc:""},
  {dec:"199",oct:"307",hex:"C7",code:"\u00c7",desc:""},
  {dec:"200",oct:"310",hex:"C8",code:"\u00c8",desc:""},
  {dec:"201",oct:"311",hex:"C9",code:"\u00c9",desc:""},
  {dec:"202",oct:"312",hex:"CA",code:"\u00ca",desc:""},
  {dec:"203",oct:"313",hex:"CB",code:"\u00cb",desc:""},
  {dec:"204",oct:"314",hex:"CC",code:"\u00cc",desc:""},
  {dec:"205",oct:"315",hex:"CD",code:"\u00cd",desc:""},
  {dec:"206",oct:"316",hex:"CE",code:"\u00ce",desc:""},
  {dec:"207",oct:"317",hex:"CF",code:"\u00cf",desc:""},
  {dec:"208",oct:"320",hex:"D0",code:"\u00d0",desc:""},
  {dec:"209",oct:"321",hex:"D1",code:"\u00d1",desc:""},
  {dec:"210",oct:"322",hex:"D2",code:"\u00d2",desc:""},
  {dec:"211",oct:"323",hex:"D3",code:"\u00d3",desc:""},
  {dec:"212",oct:"324",hex:"D4",code:"\u00d4",desc:""},
  {dec:"213",oct:"325",hex:"D5",code:"\u00d5",desc:""},
  {dec:"214",oct:"326",hex:"D6",code:"\u00d6",desc:""},
  {dec:"215",oct:"327",hex:"D7",code:"\u00d7",desc:""},
  {dec:"216",oct:"330",hex:"D8",code:"\u00d8",desc:""},
  {dec:"217",oct:"331",hex:"D9",code:"\u00d9",desc:""},
  {dec:"218",oct:"332",hex:"DA",code:"\u00da",desc:""},
  {dec:"219",oct:"333",hex:"DB",code:"\u00db",desc:""},
  {dec:"220",oct:"334",hex:"DC",code:"\u00dc",desc:""},
  {dec:"221",oct:"335",hex:"DD",code:"\u00dd",desc:""},
  {dec:"222",oct:"336",hex:"DE",code:"\u00de",desc:""},
  {dec:"223",oct:"337",hex:"DF",code:"\u00df",desc:""},
  {dec:"224",oct:"340",hex:"E0",code:"\u00e0",desc:""},
  {dec:"225",oct:"341",hex:"E1",code:"\u00e1",desc:""},
  {dec:"226",oct:"342",hex:"E2",code:"\u00e2",desc:""},
  {dec:"227",oct:"343",hex:"E3",code:"\u00e3",desc:""},
  {dec:"228",oct:"344",hex:"E4",code:"\u00e4",desc:""},
  {dec:"229",oct:"345",hex:"E5",code:"\u00e5",desc:""},
  {dec:"230",oct:"346",hex:"E6",code:"\u00e6",desc:""},
  {dec:"231",oct:"347",hex:"E7",code:"\u00e7",desc:""},
  {dec:"232",oct:"350",hex:"E8",code:"\u00e8",desc:""},
  {dec:"233",oct:"351",hex:"E9",code:"\u00e9",desc:""},
  {dec:"234",oct:"352",hex:"EA",code:"\u00ea",desc:""},
  {dec:"235",oct:"353",hex:"EB",code:"\u00eb",desc:""},
  {dec:"236",oct:"354",hex:"EC",code:"\u00ec",desc:""},
  {dec:"237",oct:"355",hex:"ED",code:"\u00ed",desc:""},
  {dec:"238",oct:"356",hex:"EE",code:"\u00ee",desc:""},
  {dec:"239",oct:"357",hex:"EF",code:"\u00ef",desc:""},
  {dec:"240",oct:"360",hex:"F0",code:"\u00f0",desc:""},
  {dec:"241",oct:"361",hex:"F1",code:"\u00f1",desc:""},
  {dec:"242",oct:"362",hex:"F2",code:"\u00f2",desc:""},
  {dec:"243",oct:"363",hex:"F3",code:"\u00f3",desc:""},
  {dec:"244",oct:"364",hex:"F4",code:"\u00f4",desc:""},
  {dec:"245",oct:"365",hex:"F5",code:"\u00f5",desc:""},
  {dec:"246",oct:"366",hex:"F6",code:"\u00f6",desc:""},
  {dec:"247",oct:"367",hex:"F7",code:"\u00f7",desc:""},
  {dec:"248",oct:"370",hex:"F8",code:"\u00f8",desc:""},
  {dec:"249",oct:"371",hex:"F9",code:"\u00f9",desc:""},
  {dec:"250",oct:"372",hex:"FA",code:"\u00fa",desc:""},
  {dec:"251",oct:"373",hex:"FB",code:"\u00fb",desc:""},
  {dec:"252",oct:"374",hex:"FC",code:"\u00fc",desc:""},
  {dec:"253",oct:"375",hex:"FD",code:"\u00fd",desc:""},
  {dec:"254",oct:"376",hex:"FE",code:"\u00fe",desc:""},
  {dec:"255",oct:"377",hex:"FF",code:"\u00ff",desc:""},
])

//copy
// const copyRes = async (resStr: string) => {
//   copy(resStr)
// }
</script>

<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader :title="info.title"></DetailHeader>

    <div class="p-4 rounded-2xl bg-white">
      <el-table :data="tableDataControlCodes" class="w-full">
        <el-table-column label="ASCII 控制字符 (字符编码: 0-31)" align="center">
          <el-table-column prop="dec" label="十进制DEC" width="120" />
          <el-table-column prop="oct" label="八进制OCT" width="120" />
          <el-table-column prop="hex" label="十六进制HEX" width="120" />
          <el-table-column prop="code" label="符号" width="120" />
          <el-table-column prop="desc" label="描述" />
        </el-table-column>
      </el-table>

      <el-table :data="tableDataStandard" class="w-full mt-3">
        <el-table-column label="ASCII 打印字符 (字符编码: 32-127)" align="center">
          <el-table-column prop="dec" label="十进制DEC" width="120" />
          <el-table-column prop="oct" label="八进制OCT" width="120" />
          <el-table-column prop="hex" label="十六进制HEX" width="120" />
          <el-table-column prop="code" label="符号" width="120" />
          <el-table-column prop="desc" label="描述" />
        </el-table-column>
      </el-table>

      <el-table :data="tableDataNonStandard" class="w-full mt-3">
        <el-table-column label="ASCII扩展码 (字符编码: 128-255)" align="center">
          <el-table-column prop="dec" label="十进制DEC" width="120" />
          <el-table-column prop="oct" label="八进制OCT" width="120" />
          <el-table-column prop="hex" label="十六进制HEX" width="120" />
          <el-table-column prop="code" label="符号" width="120" />
          <el-table-column prop="desc" label="描述" />
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>

</style>