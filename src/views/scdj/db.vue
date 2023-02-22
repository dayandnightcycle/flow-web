<template>
  <div style="display: flex">
    <div class="formcontent">
      <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
      </v-form-render>
      <div @click="show">
        <el-button type="primary" @click="preservation"> 保存</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">通过</el-button>
        <el-button type="danger" @click="refuse">拒绝</el-button>
      </div>
      <el-dialog v-model="dialogFormVisible" title="选择受理">
        <el-form :model="form" label-width="120px">
          <el-form-item label="受理">
            <el-select v-model="form.region" @change="dataslr" placeholder="选择受理人">
              <el-option v-for="(item, index) in proxy.region" :label="item" :key="index" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="下一个表单">
            <el-select v-model="form.namedata" @change="databd" placeholder="选择表单">
              <el-option v-for="(item, index) in proxy.namedata" :label="item.label" :key="index" :value="item.value" />
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const { proxy } = getCurrentInstance();
const vFormRef = ref(null);
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const formData = reactive({});
const optionData = reactive({});
const form = reactive({
  region: "",
  dataxz: "",
  ID: "",
  gridData: "",
  namedata: "首次登记发证.json",
});
var data = {
  // xssjd: "select SLBH,DJDL, LCLX, LCMC, SJR, SJSJ, CNSJ, QXDM, TZRXM, TZFS, TZRDH, TZRYDDH, TZRDZYJ, TZRTXDZ, CXMM, SJMC, SJLX, SJSL, YS, SFSYBZ, SFEWSJ, SFBCSJ, ZRKS, ZRR, YXJ, SJBZ, BCSM, FCSLH, FCDJLX,JYBH, FCHID,DJDL,ZL,HTBH,PCH from DJ_SJD where SLBH = '" + slbh + "'",
  // ggsjr: "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '收件人' AND ROWNUM<2) ORDER BY ITEMORDER",
  // ggssxq: "select ITEMNOTE,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '所属辖区' AND ROWNUM<2) ORDER BY ITEMORDER",
  // ggtzfs: "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '通知方式' AND ROWNUM<2) ORDER BY ITEMORDER",
  // ggzrks: "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '责任科室' AND ROWNUM<2) ORDER BY ITEMORDER",
  // ggzrr: "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '责任人' AND ROWNUM<2) ORDER BY ITEMORDER",
  // ggyxj: "select ITEMVAL, ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '优先级' AND ROWNUM<2) ORDER BY ITEMORDER",
  // ggsjlx: "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '收件类型' AND ROWNUM<2) ORDER BY ITEMORDER",
  // ggsf: "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '是否' AND ROWNUM<2) ORDER BY ITEMORDER",
  // ggdjdl: "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记类型(大类)' AND ROWNUM<2) ORDER BY ITEMORDER",
  // ggjflx: "select ItemVal,ItemName from Dic_Item where dicCode =(SELECT DICCODE FROM dic_main WHERE DICNAME = '交费类型' And RowNum<2) order by ItemOrder",
  // sxsfd: "select SLBH, JFBH, XMMC, JFDW, TXDZ, DH, JFLX, JBR, JBRQ, JBYJ, SHR, SHYJ, SHRQ, YSJE, SSJE, SKR, SKRQ, SKYJ, SLR from DJ_SFD where SLBH='" + slbh + "'",
  // ggzj: "SELECT ITEMNAME FROM DIC_ITEM WHERE ITEMVAL = '1' AND DICCODE IN (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型')",
  // ggzjlx: "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型' AND ROWNUM<2) ORDER BY ITEMORDER"
}
const formJson = reactive({});
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
function myFunction() {
  /* 获取文本内容 */
  var text = document.getElementById("input42368").value;
  /* 弹出内容 */
  alert("文本为: " + text);
}
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
// 获取表单
const getformJson = () => {
  proxy.$http
    .get("/flow/formJson?taskName=" + taskName.slice(-2) + "sz&taskId=" + taskId)
    .then((res) => {
      vFormRef.value.setFormJson(res.data);
    });
};
const fromname = () => {
  proxy.$http.get("/flow/form").then((res) => {
    let arr = [];
    for (let i = 0; i < res.data.length; i++) {
      arr.push({ label: res.data[i], value: res.data[i] })
    }
    proxy.namedata = arr;
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
  form.namedata = val;
};
const preservation = () => {

}
// 通过
const confirm = () => {
  proxy.$http
    .get(
      " /flow/SCDJ/audit?variate=yes&taskId=" +
      taskId +
      "&taskName=" +
      taskName.slice(-2) + 'sz' +
      "&users=fzusers&user=" +
      proxy.ID +
      "&name=" +
      form.namedata
    )
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        store.dispatch("gblc", "fz");
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
      ElMessage.error("操作失败");
    });
};

onMounted(() => {
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
