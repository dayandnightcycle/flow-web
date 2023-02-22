<template>
  <div style="width:100%;height:100%">
    <div class="hometab">
      <el-tabs v-model="activeName" type="border-card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="首次登记" name="first">
          <SCDJ />
        </el-tab-pane>
        <el-tab-pane label="转移登记" name="second">
          <ZYDJ />
        </el-tab-pane>
        <el-tab-pane label="查封登记" name="third">
          <CFDJ />
        </el-tab-pane>
        <el-tab-pane label="抵押登记" name="fourth">
          <DYDJ />
        </el-tab-pane>
        <el-tab-pane label="更正登记" name="five">
          <GZDJ />
        </el-tab-pane>
      </el-tabs>
    </div>
</div>
</template>
<script setup>
import SCDJ from './scdj/List.vue';
import ZYDJ from './zydj/List.vue'
import CFDJ from './cfdj/list.vue'
import DYDJ from './dydj/list.vue'
import GZDJ from './gzdj/List.vue'
import { ref, getCurrentInstance, watch } from "vue";
import { useRouter } from "vue-router";
const route = useRouter();

const activeName = ref('first');
watch(() => route.currentRoute.value, (newValue, oldValue) => {
  console.log('watch', newValue, oldValue);
}, { immediate: true })
</script>
<style>
.el-tabs__item {
  border-radius: 0;
}

.el-scrollbar__wrap {
  overflow-y: auto;
  overflow-x: hidden !important;
  height: 61vh;
  position: relative;
}

.el-scrollbar__wrap ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: rgba(100, 149, 237, 0.2);
}

.el-scrollbar__wrap ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(100, 149, 237, 0.1);
  border-radius: 10px;
  background-color: rgba(100, 149, 237, 0.1);
}

.el-scrollbar__wrap ::-webkit-scrollbar-thumb {
  height: 8px;
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgb(173, 176, 179);
  background-color: rgb(172, 172, 172);
}

.el-scrollbar__wrap ::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(232, 232, 233, 0.945);
  border-radius: 5px;
}
</style>