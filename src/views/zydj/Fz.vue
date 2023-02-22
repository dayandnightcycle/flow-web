<template>
  <div style="display: flex">
    <div class="formcontent">
      <!-- <el-button type="primary" @click="saveFormJson">提交表单</el-button>
      <el-button type="primary" @click="submitForm">提交数据</el-button> -->
      <!-- <el-button type="primary" @click="submit">提交</el-button> -->
      <v-form-render
        :form-json="formJson"
        :form-data="formData"
        :option-data="optionData"
        ref="vFormRef"
      >
      </v-form-render>
      <div @click="show">
        <el-button type="primary" @click="conserve">保存</el-button>
        <el-button type="primary" @click="dialogFormVisible = true"
          >通过</el-button
        >
        <el-button type="danger" @click="refuse">拒绝</el-button>
      </div>
      <el-dialog v-model="dialogFormVisible" title="选择受理">
        <el-form :model="form" label-width="120px">
          <el-form-item label="下一个表单">
            <el-select
              v-model="form.namedata"
              @change="databd"
              placeholder="转移归档.json"
            >
              <!-- <el-option
                v-for="(item, index) in proxy.namedata"
                :label="item"
                :key="index"
                :value="item"
              /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="下一位归档人">
            <el-select
              v-model="form.region"
              @change="dataslr"
              placeholder="请选择归档人"
            >
              <el-option
                v-for="(item, index) in proxy.region"
                :label="item"
                :key="index"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="confirm"> 确认 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import router from "../../router";
import Cookies from "js-cookie";
import { nextTick } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const $router = useRouter();
const { proxy } = getCurrentInstance();
const vFormRef = ref(null);
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const store = useStore();
const formData = reactive({});
const optionData = reactive({});
const form = reactive({
  region: "",
  dataxz: "",
  ID: "",
  gridData: "",
  namedata: "",
  oldslbh: "",
  oldfjr: "",
  oldfjrq: "",
});

const formJson = reactive({});
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
// console.log(taskName);
// console.log(taskId);
var slbh = $router.currentRoute._rawValue.query.slbh;
var data = {
  djsjd: "select DJDL from DJ_SJD where SLBH = " + "'" + slbh + "'",
  djfjd:
    "select SLBH, QLR, LJR, LJRSFZJLX, LJRSFZJH, LJRYQLRDGX, FJR, FJRQ, FJBZ, LJRZW, LJRZP from DJ_FJD where SLBH = " +
    "'" +
    slbh +
    "'",
  djljr:
    "select LJBH, SLBH, LJR, LJRSFZJLX, LJRSFZJH, LJRYQLRDGX, LJRZW, LJRZP from DJ_FJD_LJR where SLBH = " +
    "'" +
    slbh +
    "'",
  ggzjlx:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型' AND DICTYPE='通用字典' AND ROWNUM<2) ORDER BY ITEMORDER",
};
//表单数据获取
const getInputData = () => {
  axios.post("/test/sqls", data).then((res) => {
    console.log("res.data.data", res.data.data);
    // 获取sql查询到的数据
    // proxy.newFormData = res.data.data.djsjd;
    // 获取受理编号
    // proxy.oldslbh = res.data.data.djfjd[0].SLBH;
    // proxy.oldfjr = res.data.data.djfjd[0].FJR;
    // proxy.oldfjrq = res.data.data.djfjd[0].FJRQ;
  });
};
// 获取表单
const getformJson = () => {
  proxy.$http
    .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
    .then((res) => {
      vFormRef.value.setFormJson(res.data);
      // 获取表单空数据
      // vFormRef.value.getFormData().then((formData) => {
      console.log(formData);
      proxy.newFormData2 = formData;
      // 将后端获取的受理编号赋值给新表单
      // 土地使用权人
      proxy.newFormData2.SLBH = $router.currentRoute._rawValue.query.slbh;
      // proxy.newFormData2.FJR = proxy.oldfjr;
      // proxy.newFormData2.FJRQ = proxy.oldfjrq;
      proxy.$http.get("/flow/ZYDJ/lcmc?taskId=" + taskId).then((res) => {
        proxy.newFormData2.FJR = res.data.data[0].userName;
        vFormRef.value.setFormData(proxy.newFormData2);
      });
    });
};
const fromname = () => {
  proxy.$http.get("/flow/form").then((res) => {
    const namedata = res.data;
    proxy.namedata = namedata;
  });
};
// 弹出弹框，获取审核人
const show = () => {
  nextTick(() => {
    proxy.$http.get("/flow/user/users").then((res) => {
      let gridData = res.data.data;
      proxy.gridData = gridData;
      let dlrcl = [];
      for (let i = 0; i < gridData.length; i++) {
        let dlr = gridData[i].last + gridData[i].first;
        dlrcl.push(dlr);
      }
      proxy.region = dlrcl;
    });
  });
};
// 获取审核人
const dataslr = (val) => {
  for (let i = 0; i < proxy.gridData.length; i++) {
    let dlr = proxy.gridData[i].last + proxy.gridData[i].first;
    if (dlr == val) {
      proxy.ID = proxy.gridData[i].id;
    }
  }
};

const databd = (val) => {
  proxy.dataxz = val;
};
// 通过
const confirm = () => {
  proxy.$http
    .get(
      " /flow/ZYDJ/audit?variate=yes&taskId=" +
        taskId +
        "&taskName=" +
        taskName.slice(-2) +
        "&users=gdusers&user=" +
        proxy.ID +
        "&name=转移归档.json"
      //  +
      // proxy.dataxz
    )
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        ElMessage({
          message: "已通过",
          type: "success",
        });
        router.push({
          path: "/home1",
        });
      } else {
        ElMessage.error("操作失败");
      }
    })
    .catch(function (err) {
      // console.log(err);
      ElMessage.error("操作失败");
    });
};

const conserve = () => {
  //   if(glbm !== undefined || glbm !== null){
  // glbm=this.glbm
  //   }else{
  //     glbm=""
  //   }
  let slbh = $router.currentRoute._rawValue.query.slbh;
  let ljr = "";
  let ljrsfzjlx = "";
  let ljrsfzjh = "";
  let ljryqlrdgx = "";
  let fjr = proxy.newFormData2.FJR;
  let fjrq = "";
  let fjbz = "";
  //qlfwxg
  var data3 = {
    djfjd:
      "insert into dj_fjd (slbh,ljr,ljrsfzjlx,ljrsfzjh,ljryqlrdgx,fjr,fjrq,fjbz)values('" +
      slbh +
      "','" +
      ljr +
      "','" +
      ljrsfzjlx +
      "','" +
      ljrsfzjh +
      "','" +
      ljryqlrdgx +
      "','" +
      fjr +
      "','" +
      fjrq +
      "','" +
      fjbz +
      "')",
  };
  let config = {
    headers: { "Content-Type": "application/json" },
  };
  axios
    .post("/test/sqls", data3, config)
    .then((res) => {
      console.log("res", res);
      if (res.data.code === 0) {
        ElMessage({
          message: "保存成功",
          type: "success",
        });
      } else {
        ElMessage.error("操作失败");
      }
    });
};
onMounted(() => {
  getInputData();
  getformJson();
  show();
  fromname();
});
</script>

<style>
.formcontent {
  width: 70%;
}
</style>
