<template>
  <div>直播管理</div>
  <div>
    直播状态:<a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        请选择
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item> 直播中 </a-menu-item>
          <a-menu-item> 已结束 </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  <div class="container">
    <div class="content">
      <img src="https://img1.baidu.com/it/u=2555904807,2390319494&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=71376b0290cb4c6d23d6a6727172e567" alt="" />
      <p>秋冬修仙美衣搭配网红博主</p>
    </div>
    <div class="content">
      <img src="https://img1.baidu.com/it/u=2555904807,2390319494&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=71376b0290cb4c6d23d6a6727172e567" alt="" />
      <p>秋冬修仙美衣搭配网红博主</p>
    </div>
    <div class="content">
      <img src="https://img1.baidu.com/it/u=2555904807,2390319494&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=71376b0290cb4c6d23d6a6727172e567" alt="" />
      <p>秋冬修仙美衣搭配网红博主</p>
    </div>
    <div class="content">
      <img src="https://img1.baidu.com/it/u=2555904807,2390319494&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689958800&t=71376b0290cb4c6d23d6a6727172e567" alt="" />
      <p>秋冬修仙美衣搭配网红博主</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DownOutlined } from "@ant-design/icons-vue"
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-around;
  .content {
    width: 20%;
    height: 300px;
    display: flex;
    flex-direction: column;
    img {
      width: 100%;
      height: 70%;
    }
  }
}
</style>
