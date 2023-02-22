<template>
  <div>
    <h1>查封登记</h1>
    <!-- <el-button class="logout" id="logout-button" type="primary" @click="logout">退出</el-button> -->
    <el-button type="primary" @click="startZydj">发起流程</el-button>
    <div class="tasks">
      <h1>待处理任务</h1>
      <el-table :data="handleList">
        <el-table-column type="index" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createTime" label="发起时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handle(scope.row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
     <el-pagination
          v-model:page-size="page.size"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="Number(page.total || 0)"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { getCurrentInstance, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import router from "../../router";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
const route = useRouter();
const { proxy } = getCurrentInstance();
const claimList = reactive([]);
const handleList = reactive([]);
const store = useStore();
const page = reactive({
  total: "", //总数据量
  size: 20, //每页显示的数据量   默认为10
  number: "",
});
const userId = Cookies.get("userId");
console.log(userId)
let slbh = "";
const startZydj = () => {
  axios.post("/test/slbh").then((res) => {
    console.log("res", res.data);
    slbh = res.data.slbh;
    proxy.$http
      .post(
        "/flow/CFDJ/qd2?key=CFDJ&user=" +
          userId +
          "&name=查封收件.json&slbh=" +
          slbh
      )
      .then((res) => {
        const code = res.data.code;
        console.log("code", res);
        if (code === 0) {
          ElMessage({
            message: "流程发起成功",
            type: "success",
          });
          // initClaims();
          // initHandles();
          handleCurrentChange(1);
        } else {
          // ElMessage.error("流程发起失败1");
        }
      })
      .catch(function (err) {
        console.log(err);
        // ElMessage.error("流程发起失败2");
      });
  });
  // console.log("slbh", slbh);
};


const claim = (taskId) => {
  console.log(taskId);
  proxy.$http
    .post("/flow/CFDJ/qsrw?taskId=" + taskId + "&userId=" + userId)
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        ElMessage({
          message: "任务认领成功",
          type: "success",
        });
        // initClaims();
        handleCurrentChange(1);
        // initHandles();
      } else {
        ElMessage.error("任务认领失败");
      }
    })
    .catch(function (err) {
      console.log(err);
      ElMessage.error("任务认领失败");
    });
};

const getUrlByName = (description) => {
  switch (description) {
    case "收件":
      return "sj";
    case "初审":
      return "cs";
    case "登簿":
      return "db";
    case "归档":
      return "gd";
  }
};

const handle = (task) => {
    const description = task.description;
  console.log("123456", task);
  if (task.name == "收件") {
    store.dispatch("gblc", "");
  } else if (task.name == "初审") {
    store.dispatch("gblc", "cs");
  } else if (task.name == "登簿") {
    store.dispatch("gblc", "db");
  } else if (task.name == "归档") {
    store.dispatch("gblc", "gd");
  }
  //
  proxy.$http
    .get(
      "/flow/formJson?taskName=" +
      getUrlByName(task.name) +
      "&taskId=" +
      task.id
    )
    .then((res) => {
      router.push({
        path: "/cfdj" + "/" + getUrlByName(task.name),
        query: { id: task.id, slbh: description },
      });
    });
};
const handleSizeChange = (val) => {
  page.size = val;
  handleCurrentChange(1);
  // console.log(page.size);
};
const handleCurrentChange = (val) => {
  page.number = val;
  // console.log(val);
  handleList.length = 0;
  let pageNumber = val;
  let pageSize = page.size;
  //待处理
  proxy.$http
    .get(
      "/flow/CFDJ/cscx2?userId=" +
        userId +
        "&processDefinitionKey=CFDJ" +
        "&pageNumber=" +
        pageNumber +
        "&pageSize=" +
        pageSize
    )
    .then((res) => {
      console.log('fy',res)
      const code = res.data.code;
      if (code === 0) {
        const tasks = res.data.data;
        page.total = tasks[tasks.length - 1].count;
        // console.log("res", tasks);
        // console.log("tasks", page.total);
        for (let i = 0; i < tasks.length - 1; i++) {
          let aaa = tasks[i];
          aaa.xh = (page.number - 1) * page.size + i + 1;
          handleList.push(tasks[i]);
        }
        // console.log("list", handleList);
        // tasks.forEach((task) => {
        // });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};
const logout = () => {
  window.localStorage.removeItem("token");
  router.push({
    path: "/login",
  });
};

onMounted(() => {
  //   initClaims();
  handleCurrentChange(1);
});
</script>

<style scoped>
.logout {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>