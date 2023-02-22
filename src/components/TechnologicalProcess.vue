<template>
  <el-row class="tac">
    <el-col display="flex">
      <div class="mb-2">流程</div>
      <el-menu
        :default-active="defaultactive"
        class="el-menu-vertical-demo"
        style="flex: 1"
      >
        <el-menu-item
          v-for="item in lclist"
          :index="item.index"
          @click="menuclick(item)"
        >
          <el-icon>
            <document />
          </el-icon>
          <span>{{ item.mc }}-{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { pinyin } from "pinyin-pro";
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import router from "../router";
import { useRouter } from "vue-router";

let lclist = ref();
const { proxy } = getCurrentInstance();
let defaultactive = ref();
const route = useRouter();
const urid = route.currentRoute._value.query.id;
const uid = route.currentRoute._value.href;
let arr = uid.split("/");
const getlcmc = () => {
  proxy.$http
    .get("/flow/" + arr[1].toUpperCase() + "/lcmc?taskId=" + urid)
    .then((res) => {
      let arr = JSON.parse(res.request.response);
      let array = arr.data;
      let aaa = [];
      for (let i = 0; i < array.length; i++) {
        aaa.push({
          name: array[i].userName,
          mc: array[i].mc,
          index: String(i),
        });
      }
      lclist.value = aaa;
      defaultactive.value = aaa[aaa.length - 1].index;
    });
};

const menuclick = (item) => {
  let mc = pinyin(item.mc, { pattern: "first" });
  let array = mc.split(" ");
  let ywmc = array.join("");
  console.log("ywmc", ywmc);

  console.log("item", item);
  router.push({
    path: "/" + arr[1] + "/" + ywmc,
    query:route.currentRoute._value.query,
  });
};

onMounted(() => {
  getlcmc();
});
</script>
<style>
.tac {
  width: 10%;
}

.mb-2 {
  font-size: 18px;
  font-weight: 600;
  padding-left: 20px;
  margin-top: 20px;
}
</style>
