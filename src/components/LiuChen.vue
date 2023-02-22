<template>
  <el-row class="tac">
    <el-col>
      <h5 class="mb-2">流程</h5>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <el-icon><document /></el-icon>
          <span>收件</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><document /></el-icon>
          <span>受理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <span>收费</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><document /></el-icon>
          <span>初审</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon><document /></el-icon>
          <span>登簿缮证</span>
        </el-menu-item>
        <el-menu-item index="6">
          <el-icon><document /></el-icon>
          <span>发证</span>
        </el-menu-item>
        <el-menu-item index="7">
          <el-icon><document /></el-icon>
          <span>归档</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import router from "../router";
import { ref } from "vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
// const zysjProcess = (key) => {
//   router.push({
//     path: "/" + key,
//   });
// };
</script>
<style >
.tac {
  width: 10%;
}
</style>