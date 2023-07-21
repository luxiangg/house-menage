<template>
  <div class="box">
    <h4>审核管理</h4>
    <p class="btns"><button>发布审核</button><button>求租求购审核</button></p>
    <p class="seles">
      <a-select style="width: 120px; margin-right: 10px" @change="selectChange">
        <a-select-option value="发布类型">发布类型</a-select-option>
        <a-select-option value="二手房出租">二手房出租</a-select-option>
        <a-select-option value="房屋出租">房屋出租</a-select-option>
        <a-select-option value="我想买个房">我想买个房</a-select-option>
        <a-select-option value="我想租个房">我想租个房</a-select-option>
        <a-select-option value="垃圾房产">垃圾房产</a-select-option>
        <a-select-option value="新楼盘">新楼盘</a-select-option>
      </a-select>
      <a-select style="width: 120px; margin-right: 10px" @change="provinceChange">
        <a-select-option v-for="(item, index) in province" :key="index" :value="item">{{ item }}</a-select-option>
      </a-select>
      <a-select style="width: 120px; margin-right: 10px" @change="cityChange">
        <a-select-option v-for="(item, index) in city" :key="index" :value="item">{{ item }}</a-select-option>
      </a-select>
      <a-select style="width: 120px; margin-right: 10px" @change="areaChange">
        <a-select-option v-for="(item, index) in area" :key="index" :value="item">{{ item }}</a-select-option>
      </a-select>
      <button @click="inquire">查询</button>
    </p>
    <p class="pros">
      <button @click="examine('no')">未审核</button>
      <button @click="examine('yes')">审核通过</button>
      <button @click="examine('nome')">审核未通过</button>
    </p>
    <div>
      <a-modal :open="open" title="详情" :confirm-loading="confirmLoading" @ok="handleOk">
        <span class="details">用户姓名：{{ obj.username }}</span>
        <span class="details">年龄：{{ obj.rank }}岁</span>
        <span class="details">手机号：{{ obj.tel }}</span>
        <span class="details">用户所在地：{{ obj.prov }}/省 {{ obj.city }} {{ obj.district }}</span>
        <span class="details">房产名称：{{ obj.name }}</span>
        <span class="details">房产面积：{{ obj.area }}</span>
        <span class="details">房产证件图片：</span><img :src="obj.serial" alt="" class="picture pictureimg" />
      </a-modal>
    </div>
    <div class="main">
      <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'Controls'">
            <span>
              <button @click="delStaff(record.id, 'yes')">审核通过</button>
              <button @click="delStaff(record.id, 'no')">审核不通过</button>
              <a-button type="primary" @click="showModal(record.id)">详情</a-button>
            </span>
          </template>
          <template v-else-if="column.key === 'serial'">
            <img :src="record.serial" alt="" class="picture" />
          </template>
        </template>

        <template #headerCell="{ column }">
          <template v-if="column.key === 'Controls'">
            <span style="width: 300px; text-align: center"> 操作 </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import request from "../../../../utils/request"
import { process } from "@/interface/model/process"
import { objType } from "@/interface/model/process"
const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "手机号",
    dataIndex: "tel",
    key: "tel",
  },
  {
    title: "小区名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "地址",
    dataIndex: "total_prices",
    key: "total_prices",
  },
  {
    title: "面积",
    dataIndex: "area",
    key: "area",
  },
  {
    title: "房产证件图片",
    dataIndex: "serial",
    key: "serial",
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "发布类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "操作",
    dataIndex: "Controls",
    key: "Controls",
  },
]
//渲染页面的数组
const dataSource = ref<Array<process>>([])
let arr = ref<Array<process>>([])
onMounted(() => {
  list()
  PAM()
})
//请求列表数据
const list = async () => {
  const data = (await request.get("/dev/audit")).data.data
  //获取到的数据排序存入到数组
  arr.value = data.sort((a: process, b: process) => {
    return a.id - b.id
  })
  dataSource.value = data.sort((a: process, b: process) => {
    return a.id - b.id
  })
}
//Provinces and municipalities获得省市区
let province = ref<Array<string>>([])
let city = ref<Array<string>>([])
let area = ref<Array<string>>([])
const PAM = async () => {
  const data = (await request.get("/dev/audit")).data.data
  data.forEach((item: any) => {
    province.value.push(item.prov)
    city.value.push(item.city)
    area.value.push(item.district)
  })
  //去重
  const provinceAr = ref<Array<string>>([])
  province.value.forEach((item) => {
    if (provinceAr.value.indexOf(item) == -1) {
      provinceAr.value.push(item)
    }
    province.value = provinceAr.value
  })
  const cityAr = ref<Array<string>>([])
  city.value.forEach((item) => {
    if (cityAr.value.indexOf(item) == -1) {
      cityAr.value.push(item)
    }
    city.value = cityAr.value
  })
  const areaAr = ref<Array<string>>([])
  area.value.forEach((item) => {
    if (areaAr.value.indexOf(item) == -1) {
      areaAr.value.push(item)
    }
    area.value = areaAr.value
  })
}
//编辑
const delStaff = async (id: number, style: string) => {
  if (style == "yes") {
    await request.post("/dev/set/audit", { id, state: "审核通过" })
    list()
  } else if (style == "no") {
    await request.post("/dev/set/audit", { id, state: "审核未通过" })
    list()
  } else {
    console.log(style)
  }
}
//审核 当type点击到某一个对应项时；页面进行不同的渲染
const examine = (type: string) => {
  if (type == "no") {
    const filterArr = arr.value.filter((item: process) => {
      return item.state == "未审核"
    })
    dataSource.value = filterArr
  } else if (type == "yes") {
    const filterArr = arr.value.filter((item: process) => {
      return item.state == "审核通过"
    })
    dataSource.value = filterArr
  } else if (type == "nome") {
    const filterArr = arr.value.filter((item: process) => {
      return item.state == "审核未通过"
    })
    dataSource.value = filterArr
  } else {
    return
  }
}
//下拉框事件
const typeSelect = ref<string>("")
const selectChange = (selectVal: string) => {
  typeSelect.value = selectVal
}
const provinceSelect = ref<string>("")
const provinceChange = (selectVal: string) => {
  provinceSelect.value = selectVal
}
const citySelect = ref<string>("")
const cityChange = (selectVal: string) => {
  citySelect.value = selectVal
}
const areaSelect = ref<string>("")
const areaChange = (selectVal: string) => {
  areaSelect.value = selectVal
}
//查询
const inquire = () => {
  //当类型省市区都不为空则严格筛选所选中得
  if (typeSelect.value != "" && provinceSelect.value != "" && citySelect.value != "" && areaSelect.value != "") {
    const filterArr = arr.value.filter((item: process) => {
      return item.type == typeSelect.value && item.prov == provinceSelect.value && item.city == citySelect.value && item.district == areaSelect.value
    })
    dataSource.value = filterArr
    //当类型省市区都为空则筛选内容为原数组
  } else if (typeSelect.value == "" && provinceSelect.value == "" && citySelect.value == "" && areaSelect.value == "") {
    dataSource.value = arr.value
    //当类型省不为空则严格筛选所选中得
  } else if (typeSelect.value != "" && provinceSelect.value != "") {
    const filterArr = arr.value.filter((item: process) => {
      return item.type == typeSelect.value && item.prov == provinceSelect.value
    })
    dataSource.value = filterArr
    //当类型省市不为空则严格筛选所选中得
  } else if (typeSelect.value != "" && provinceSelect.value != "" && citySelect.value != "") {
    const filterArr = arr.value.filter((item: process) => {
      return item.type == typeSelect.value && item.prov == provinceSelect.value && item.city == citySelect.value
    })
    dataSource.value = filterArr
    //当都不符合条件则符合其中符合一项页面渲染
  } else {
    const filterArr = arr.value.filter((item: process) => {
      return item.type == typeSelect.value || item.prov == provinceSelect.value || item.city == citySelect.value || item.district == areaSelect.value
    })
    dataSource.value = filterArr
  }
}
//表单
const open = ref<boolean>(false)
//加载log
const confirmLoading = ref<boolean>(false)
//详情数据
let obj = ref<objType>({})
//点击查看弹出蒙版并且请求数据渲染页面
const showModal = async (e: string) => {
  open.value = true
  const data = (await request.get("/dev/audit/detail", { params: { id: e } })).data.data[0]
  obj.value = data
}
//点击OK关闭蒙版
const handleOk = () => {
  open.value = false
}
</script>

<style>
.box {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.box h4 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #f4f1f1;
  font-weight: normal;
}
.box .btns {
  width: 100%;
  height: 30px;
  display: flex;
}
.box .btns button {
  width: 100px;
  border: none;
  color: #ffffff;
  background: #ccc;
}
.box .seles button {
  background: rgb(1, 250, 250);
  border: none;
  width: 60px;
  height: 25px;
  font-size: 12px;
  color: #ffff;
}
.box .pros button {
  border: 1px solid black;
  color: black;
  width: 80px;
  background: #ffff;
  margin: 0 1px;
  font-size: 12px;
}
.main button {
  border: none;
  background: none;
  color: blue;
}
.picture {
  width: 100px;
  height: 100px;
}
.pictureimg {
  display: inline-block;
  margin-left: 100px;
}
.details {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: block;
}
</style>
