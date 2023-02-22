<template>
  <div style="display: flex">
    <div class="formcontent">
      <div class="gd">
        <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
        </v-form-render>
        <el-button class="logout" id="logout-button" type="primary" @click="logout">退出</el-button>
        <el-button type="primary" @click="conserve">保存</el-button>
        <el-button type="primary" @click="pass">通过</el-button>
        <el-button type="danger" @click="refuse">拒绝</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import router from "../../router";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { nextTick } from "vue";
import { useStore } from "vuex";
const $router = useRouter();
const { proxy } = getCurrentInstance();
const vFormRef = ref(null);
const formData = reactive({});
const optionData = reactive({});
const form = reactive({
  gridData: "",
  shdata: "",
});
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
const formJson = reactive({});
var slbh = $router.currentRoute._rawValue.query.slbh;


// 获取表单
const getformJson = () => {
  proxy.$http
    .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
    .then((res) => {
      vFormRef.value.setFormJson(res.data);
    });
};
const pass = () => {
  const param = [
    {
      name: "gd",
      value: true,
    },
  ];
  proxy.$http
    .get(
      "/flow/DYDJ/audit?variate=yes&taskId=" +
      taskId +
      "&taskName=" +
      taskName.slice(-2)
    )
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        ElMessage({
          message: "已通过",
          type: "success",
        });
        router.push({
          path: "/dydj",
        });
      } else {
        ElMessage.error("操作失败");
      }
    })
    .catch(function (err) {
      console.log(err);
      ElMessage.error("操作失败");
    });
};

const refuse = () => {
  const param = [
    {
      name: "gd",
      value: false,
    },
  ];
  proxy.$http
    .get(
      "/flow/DYDJ/audit?variate=no&taskId=" +
      taskId +
      "&taskName=" +
      taskName.slice(-2)
    )
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        ElMessage({
          message: "已拒绝",
          type: "success",
        });
        router.push({
          path: "/dydj",
        });
      } else {
        ElMessage.error("操作失败");
      }
    })
    .catch(function (err) {
      console.log(err);
      ElMessage.error("操作失败");
    });
};

const logout = () => {
  window.localStorage.removeItem("token");
  router.push({
    path: "/login",
  });
};

onMounted(() => {
  getformJson();
});
</script>

<style scoped>
.logout {
  position: absolute;
  right: 5px;
  top: 5px;
}

.formcontent {
  width: 70%;
}
</style>
