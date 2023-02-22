<template>
  <div>
    <h1>抵押登记</h1>
    <el-button type="primary" @click="startZydj">发起流程</el-button>
    <!-- <div class="tasks">
        <h1>待认领任务</h1>
        <el-table :data="claimList">
          <el-table-column type="index" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="description" label="描述" />
          <el-table-column prop="createTime" label="发起时间" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" type="success" @click="claim(scope.row.id)"
                >认领</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div> -->
    <div class="tasks">
      <h1>待处理任务</h1>
      <el-table :data="handleList">
        <el-table-column prop="xh" label="序号" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createTime" label="发起时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handle(scope.row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination v-model:page-size="page.size" :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper" :total="Number(page.total || 0)"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
</div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCurrentInstance, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import router from "../../router";
import Cookies from "js-cookie";
const store = useStore();
const route = useRouter();
// import { ref } from "vue";
// import { sl } from "element-plus/es/locale";
const { proxy } = getCurrentInstance();
const claimList = reactive([]);
const handleList = reactive([]);
const page = reactive({
  total: "", //总数据量
  size: 20, //每页显示的数据量   默认为10
  number: "",
});
0;
const userId = Cookies.get("userId");
let slbh = "";
let qlrid = "";
let wrkid = "";
let exeid = "";
let bgbm = "";
let glbm = "";
const startZydj = () => {
  proxy.$http.post("/test/slbh").then((res) => {
    console.log("res", res);
    slbh = res.data.slbh;
    // wrkid = res.data.wrkid;
    // exeid = res.data.exeid;
    // bgbm = res.data.bgbm;
    proxy.$http
      .post(
        "/flow/DYDJ/qd2?key=GYJSYDSYQJFWSYQDYDJ&user=" +
        userId +
        "&name=抵押收件.json&slbh=" +
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
  // console.log(taskId);
  proxy.$http
    .post("/flow/DYDJ/qsrw?taskId=" + taskId + "&userId=" + userId)
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        ElMessage({
          message: "任务认领成功",
          type: "success",
        });
        // initClaims();
        // initHandles();
        handleCurrentChange(1);
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
    case "受理":
      return "sl";
    case "收费":
      return "sf";
    case "初审":
      return "cs";
    case "复审":
      return "fs";
    case "核定":
      return "hd";
    case "登簿缮证":
      return "dbsz";
    case "发证":
      return "fz";
    case "归档":
      return "gd";
    default:
      return "";
  }
};

const handle = (task) => {
  const description = task.description;
  if (task.name == "收件") {
    store.dispatch("gblc", "");
  } else if (task.name == "受理") {
    store.dispatch("gblc", "sl");
  } else if (task.name == "收费") {
    store.dispatch("gblc", "sf");
  } else if (task.name == "初审") {
    store.dispatch("gblc", "cs");
  } else if (task.name == "登簿缮证") {
    store.dispatch("gblc", "dbsz");
  } else if (task.name == "发证") {
    store.dispatch("gblc", "fz");
  } else if (task.name == "归档") {
    store.dispatch("gblc", "gd");
  }
  console.log("name", task.name, task.id);
  proxy.$http.post("/test/qtbm").then((res) => {
    // console.log("res", res.data.slbh);
    // slbh = res.data.slbh;
    wrkid = res.data.wrkid;
    exeid = res.data.exeid;
    bgbm = res.data.bgbm;
    proxy.$http
      .get(
        "/flow/formJson?taskName=" +
        getUrlByName(task.name) +
        "&taskId=" +
        task.id
      )
      .then((res) => {
        router.push({
          path: "/dydj" + "/" + getUrlByName(task.name),
          query: {
            id: task.id,
            slbh: description,
            qlrid: qlrid,
            wrkid: wrkid,
            exeid: exeid,
            bgbm: bgbm,
            glbm: glbm,
          },
        });
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
      "/flow/DYDJ/cscx2?userId=" +
      userId +
      "&processDefinitionKey=GYJSYDSYQJFWSYQDYDJ" +
      "&pageNumber=" +
      pageNumber +
      "&pageSize=" +
      pageSize
    )
    .then((res) => {
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
  // initHandles();
  // handleSizeChange();
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
