<template>
  <div style="display: flex">
    <div class="formcontent">
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
      <el-dialog v-model="dialogFormVisible" title="选择收费">
        <el-form :model="form" label-width="120px">
          <el-form-item label="下一个表单">
            <el-input v-model="input" placeholder="抵押初审.json" />
            <!--<el-select
              v-model="form.namedata"
              @change="databd"
              placeholder="转移初审.json"
            >
               <el-option
                v-for="(item, index) in proxy.namedata"
                :label="item"
                :key="index"
                :value="item"
              />
            </el-select> -->
          </el-form-item>
          <el-form-item label="下一位初审人">
            <el-select
              v-model="form.region"
              @change="dataslr"
              placeholder="请选择初审人"
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
  oldjfbh: "",
  oldxmmc: "",
  olddh: "",
  oldyys: "",
  oldqs: "",
  oldtdzzs: "",
  oldshrq: "",
  oldysje: "",
  oldssje: "",
  oldskrq: "",
  jfbm: "",
});

const formJson = reactive({});
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;

var slbh = $router.currentRoute._rawValue.query.slbh;
;
// 获取表单
const getformJson = () => {
  proxy.$http
    .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
    .then((res) => {
      vFormRef.value.setFormJson(res.data);
      // 获取表单空数据
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
const fromname = () => {
  proxy.$http.get("/flow/form").then((res) => {
    const namedata = res.data;
    proxy.namedata = namedata;
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
const confirm = () => {
  proxy.$http
    .get(
      " /flow/DYDJ/audit?variate=yes&taskId=" +
        taskId +
        "&taskName=" +
        taskName.slice(-2) +
        "&users=csusers&user=" +
        proxy.ID +
        "&name=抵押初审.json"
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
          path: "/dydj",
        });
      } else {
        ElMessage.error("操作失败");
      }
    })
    .catch(function (err) {
      ElMessage.error("操作失败");
    });
};



onMounted(() => {
//   getInputData();
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
