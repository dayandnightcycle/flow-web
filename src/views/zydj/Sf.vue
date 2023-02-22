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
            <el-input v-model="input" placeholder="转移初审.json" />
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
var data = {
  xgzh:"SELECT a.XGZH,a.XGZLX,a.FSLBH,b.zl，c.qlrmc FROM DJ_XGDJGL a left join dj_sjd b on a.fslbh=b.slbh left join dj_qlrgl c on b.slbh=c.slbh   WHERE ZSLBH = '"+slbh+"' and c.qlrlx = '权利人'",
  djsjd: "select ZL,TZRYDDH,DJDL from DJ_SJD where SLBH = " + "'" + slbh + "'",
  djdjb:
    "Select SLBH,SQFBCZ,GYFS,DJLX,DJYY,DJRQ,SQRQ,XGZH from DJ_DJB where SLBH = " +
    "'" +
    slbh +
    "'",
  djsfd:
    "select SLBH, JFBH, XMMC, JFDW, TXDZ, DH, JFLX, JBR, JBRQ, JBYJ, SHR, SHYJ, SHRQ, YSJE, SSJE, SKR, SKRQ, SKYJ, SLR,SFBZ,YYS,GRSDS,QS,TDZZS from DJ_SFD where SLBH =" +
    "'" +
    slbh +
    "'",
  ggjflx:
    "select ItemVal,ItemName from Dic_Item where dicCode =(SELECT DICCODE FROM dic_main WHERE DICNAME = '交费类型' And RowNum<2) ORDER BY ITEMORDER",
  ggdjlx:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记类型(大类)' AND ROWNUM<2) ORDER BY ITEMORDER",
};
//表单数据获取
const getInputData = () => {
  axios.post("/test/sqls", data).then((res) => {
    // 获取sql查询到的数据
    console.log("res", res);
    proxy.newFormData = res.data.data;
        proxy.newFormData2 = formData;
    console.log("proxy.newFormData", proxy.newFormData2);
    proxy.newFormData2.XMMC = proxy.newFormData.djsfd[0].XMMC;
    proxy.newFormData2.JFLX = proxy.newFormData.djsfd[0].JFLX;
    proxy.newFormData2.YSJE = proxy.newFormData.djsfd[0].YSJE;
    proxy.newFormData2.SSJE = proxy.newFormData.djsfd[0].SSJE;
    proxy.newFormData2.JFRQ = proxy.newFormData.djsfd[0].JFRQ;
    proxy.newFormData2.SHRQ = proxy.newFormData.djsfd[0].YSJE;
    proxy.newFormData2.SKRQ = proxy.newFormData.djsfd[0].SKRQ;
    vFormRef.value.setFormData(proxy.newFormData2);
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
      // console.log(formData);
      proxy.newFormData2 = formData;
      // 将后端获取的受理编号赋值给新表单
      // 土地使用权人
      proxy.newFormData2.SLBH = $router.currentRoute._rawValue.query.slbh;
      proxy.newFormData2.JFBH = proxy.jfbm;
      proxy.newFormData2.LXDH = proxy.newFormData.djsjd[0].TZRYDDH;
      proxy.newFormData2.ZL = proxy.newFormData.xgzh[0].ZL;
      proxy.$http.get("/flow/ZYDJ/lcmc?taskId=" + taskId).then((res) => {
        console.log("res.data.data[0].userName;", res.data.data[0].userName);
        proxy.newFormData2.JFR = res.data.data[0].userName;
        proxy.newFormData2.HSR = res.data.data[0].userName;
        proxy.newFormData2.SFR = res.data.data[0].userName;
        proxy.newFormData2.SKR = res.data.data[0].userName;
        vFormRef.value.setFormData(proxy.newFormData2);
        // });
        // console.log("proxy.newFormData2.JFR", proxy.newFormData2.JFR);
        // proxy.newFormData2.YYS = proxy.oldyys;
        // proxy.newFormData2.QS = proxy.oldqs;
        // proxy.newFormData2.TDZZS = proxy.oldtdzzs;
        // proxy.newFormData2.SHRQ = proxy.oldshrq;
        // proxy.newFormData2.YSJE = proxy.oldysje;
        // proxy.newFormData2.SSJE = proxy.oldssje;
        // proxy.newFormData2.SKRQ = proxy.oldskrq;
        // 得到新表单数据
        // console.log(proxy.newFormData2);
        // 将新表单数据渲染
        // vFormRef.value.getFormData(proxy.newFormData2).then((formData) => {

        // });
      });
      //  console.log(getWidgetRef('select40740O').field.options.optionItems);
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
// 通过
const confirm = () => {
  proxy.$http
    .get(
      " /flow/ZYDJ/audit?variate=yes&taskId=" +
        taskId +
        "&taskName=" +
        taskName.slice(-2) +
        "&users=csusers&user=" +
        proxy.ID +
        "&name=转移初审.json"
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
      ElMessage.error("操作失败");
    });
};
const idGibm = () => {
  axios.post("/test/slbh").then((res) => {
    console.log("res", res.data);
    proxy.jfbm = res.data.jfbm;
    console.log(proxy.jfbm);
  });
};
const conserve = () => {
  //   if(glbm !== undefined || glbm !== null){
  // glbm=this.glbm
  //   }else{
  //     glbm=""
  //   }
  console.log(document.getElementsByClassName("el-input__inner"));
  console.log(proxy.newFormData2);
  let slbh = $router.currentRoute._rawValue.query.slbh;
  let jfbh = proxy.jfbm;
  let xmmc = document.getElementsByClassName("el-input__inner")[4].value;
  let jfdw = "";
  let txdz = "";
  let dh = proxy.newFormData2.LXDH;
  let jflx = document.getElementsByClassName("el-input__inner")[3].value;
  let jbr = proxy.newFormData2.JFR;
  // 日期格式不能为null或者2023-02-06，必须为2022-09-15T16:00:00.000+00:00
  // let jbrq = proxy.newFormData2.JFRQ;
  let jbrq = document.getElementsByClassName("el-input__inner")[13].value;
  let shr = proxy.newFormData2.HSR;
  // let shrq = proxy.newFormData2.SHRQ;
  let shrq = document.getElementsByClassName("el-input__inner")[15].value;
  let ysje = Number(
    document.getElementsByClassName("el-input__inner")[16].value
  );
  let ssje = Number(
    document.getElementsByClassName("el-input__inner")[17].value
  );
  let skr = proxy.newFormData2.SKR;
  // let skrq = proxy.newFormData2.SKRQ;
  let skrq = document.getElementsByClassName("el-input__inner")[19].value;
  let slr = proxy.newFormData2.SFR;
  let sfbz = "";

  // number格式
  // let qs = proxy.newFormData2.QS;
  //   let yys = proxy.newFormData2.YYS;
  // let grsds = proxy.newFormData2.GRSDS;
  // let tdzzs = proxy.newFormData2.TDZZS;
  let yys = 1;
  let grsds = 1;
  let qs = 1;
  let tdzzs = 1;

  //qlfwxg
  var data3 = {
    djsfd:
      "insert into dj_sfd(slbh,jfbh,xmmc,jfdw,txdz,dh,jflx,jbr,jbrq,shr,shrq,ysje,ssje,skr,skrq,slr,sfbz,yys,grsds,qs,tdzzs)values('" +
      slbh +
      "','" +
      jfbh +
      "','" +
      xmmc +
      "','" +
      jfdw +
      "','" +
      txdz +
      "','" +
      dh +
      "','" +
      jflx +
      "','" +
      jbr +
      "',to_date('" +
      jbrq +
      "','yyyy-MM-dd'),'" +
      shr +
      "',to_date('" +
      shrq +
      "','yyyy-MM-dd'),'" +
      ysje +
      "','" +
      ssje +
      "','" +
      skr +
      "',to_date('" +
      skrq +
      "','yyyy-MM-dd'),'" +
      slr +
      "','" +
      sfbz +
      "','" +
      yys +
      "','" +
      grsds +
      "','" +
      qs +
      "','" +
      tdzzs +
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
  idGibm();
});
</script>

<style>
.formcontent {
  width: 70%;
}
</style>
