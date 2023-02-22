<template>
  <div style="display: flex">
    <div class="formcontent">
      <div class="gd">
        <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
        </v-form-render>
        <el-button type="primary" @click="preservation"> 保存</el-button>
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
import Cookies from "js-cookie";
import { nextTick } from "vue";
import { useRouter } from "vue-router";
// export default {
//   components: {
//     LiuChen,
//   },
// };
import { useStore } from "vuex";
const store = useStore();
const { proxy } = getCurrentInstance();
const vFormRef = ref(null);
const formData = reactive({});
const optionData = reactive({});
const form = reactive({
  gridData: "",
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
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
const formJson = reactive({});
const pass = () => {
  const param = [
    {
      name: "gd",
      value: true,
    },
  ];
  proxy.$http
    .get(
      "/flow/SCDJ/audit?variate=yes&taskId=" + taskId + "&taskName=" + taskName.slice(-2)
    )
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        ElMessage({
          message: "已通过",
          type: "success",
        });
        router.push({
          path: "/scdj",
        });
      } else {
        ElMessage.error("操作失败");
      }
    })
    .catch(function (err) {
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
    .get("/flow/ZYDJ/audit?variate=no&taskId=" + taskId + "&taskName=gd")
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        ElMessage({
          message: "已拒绝",
          type: "success",
        });
        router.push({
          path: "/zydj",
        });
      } else {
        ElMessage.error("操作失败");
      }
    })
    .catch(function (err) {
      ElMessage.error("操作失败");
    });
};

const logout = () => {
  window.localStorage.removeItem("token");
  router.push({
    path: "/login",
  });
};
// 获取表单
const getformJson = () => {
  proxy.$http
    .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
    .then((res) => {
      vFormRef.value.setFormJson(res.data);
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