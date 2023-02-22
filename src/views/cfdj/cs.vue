<template>
  <div style="display: flex">
    <div class="formcontent">
      <!-- <el-button type="primary" @click="saveFormJson">提交表单</el-button>
-->
      <!-- <el-button type="primary" @click="submit">提交</el-button> -->
      <!-- <el-button type="primary" @click="submitForm">提交数据</el-button> -->
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
      <el-dialog v-model="dialogFormVisible" title="选择收件">
        <el-form :model="form" label-width="120px">
          <el-form-item label="收件">
            <el-select
              v-model="form.region"
              @change="dataslr"
              placeholder="选择收件人"
            >
              <el-option
                v-for="(item, index) in proxy.region"
                :label="item"
                :key="index"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="下一个表单">
            <span class="bd" style="margin-left: 10px">查封登簿.json</span>
            <!-- <el-select
              v-model="form.namedata"
              @change="databd"
              placeholder="选择表单"
            >
              <el-option
                v-for="(item, index) in proxy.namedata"
                :label="item"
                :key="index"
                :value="item"
              /> 
            </el-select>-->
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
import { useStore } from "vuex";
import Cookies from "js-cookie";
import { nextTick } from "vue";
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const vFormRef = ref(null);
const getWidgetRef = reactive({});
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
  olddata: "",
  hnew: "",
  // newFormData: "",
  newFormData2: "",
  olddjdl: "",
  olddjxl: "",
  qlrxh: "",
  qlrmc: "",
  qlrzjzl: "",
  qlrzjhm: "",
  qlrgyfe: "",
  qlrdh: "",
});
const formJson = reactive({});
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
console.log(taskName);
console.log(taskId);
//js查询数据
var slbh = route.currentRoute._value.query.slbh;
console.log("slbh", slbh);
var data = {
  djsjd:
    "select SLBH, LCLX, LCMC, SJR, SJSJ, CNSJ, QXDM, TZRXM, TZFS, TZRDH, TZRYDDH, TZRDZYJ, TZRTXDZ, CXMM, SJMC, SJLX, SJSL, YS, SFSYBZ, SFEWSJ, SFBCSJ, ZRKS, ZRR, YXJ, SJBZ, BCSM,ZL,DJDL,DJXL,QXKZ,PRJID,LCLB from DJ_SJD where SLBH LIKE '" +
    slbh +
    "%' AND ROWNUM < 2",
  djcf:
    "select SLBH,XGZH,BDCDYH,CFJG,CFLX,CFWJ,CFWH,SUBSTR(to_char(CFQSSJ,'yyyy/MM/dd HH:mm:ss'),0,10) as CFQSSJ,SUBSTR(to_char(CFJSSJ,'yyyy/MM/dd HH:mm:ss'),0,10) as CFJSSJ,CFFW,DJJG,DBR,DJSJ,CFYY,JBR,JBRQ,YGR,LHXX,QLR,JBRQ,lwrq,GDH,DAMJ,QT,FJ,LIFECYCLE,CFBH,CFSX,CFQX,ZJBH from DJ_CF where SLBH LIKE '" +
    slbh +
    "%' AND ROWNUM < 2",
  djszqy:
    "select ITEMNOTE AS ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '所属辖区' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggjbr:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记经办人' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggdjdl:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记类型(大类)' AND ROWNUM<2) ORDER BY ITEMORDER",
  djcf:
    "select SLBH,XGZH,BDCDYH,CFJG,CFLX,CFWJ,CFWH,CFQSSJ,CFJSSJ,CFFW,DJJG,DBR,DJSJ,CFYY,JBR,JBRQ,YGR,LHXX,QLR,JBRQ,LWRQ,GDH,DAMJ,QT,FJ,LIFECYCLE,CFBH,CFSX,CFQX,ZJBH from DJ_CF where SLBH LIKE '" +
    slbh +
    "%'",
  ggzjlx:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggcfbhph:
    "select itemval,itemname from dic_item where diccode = (select diccode from dic_main where dicname='不动产登记业务控制' and dictype='通用字典') and itemname ='查封编号配号'",
  djQLR:
    "select A.QLRMC,bdcdj.f_ParseDic('证件类型',B.ZJLB) as ZJLB,A.ZJHM from dj_qlr A left join dj_qlrgl B on a.qlrid=b.qlrid where slbh= '" +
    slbh +
    "'",
};
var yf = {
  djcf:
    "select SLBH,XGZH,BDCDYH,CFJG,CFLX,CFWJ,CFWH,SUBSTR(to_char(CFQSSJ,'yyyy-MM-dd HH:mm:ss'),0,10) as CFQSSJ,SUBSTR(to_char(CFJSSJ,'yyyy-MM-dd HH:mm:ss'),0,10) as CFJSSJ,CFFW,DJJG,DBR,DJSJ,CFYY,JBR,JBRQ,YGR,LHXX,QLR,JBRQ,lwrq,GDH,DAMJ,QT,FJ,LIFECYCLE,CFBH,CFSX,CFQX,ZJBH from DJ_CF where SLBH LIKE '" +
    slbh +
    "%'",
};
//表单数据获取
const getInputData = () => {
  proxy.newFormData2 = formData;
  axios.post("/test/sqls", yf).then((res) => {
    console.log("yf", res);
    let yf = res.data.data;
    proxy.newFormData2.QSRQ = yf.djcf[0].CFQSSJ;
    proxy.newFormData2.JZRQ = yf.djcf[0].CFJSSJ;
    proxy.newFormData2.LWRQ = yf.djcf[0].LWRQ;
    proxy.newFormData2.JBRQ = yf.djcf[0].JBRQ;
  });
  axios.post("/test/sqls", data).then((res) => {
    console.log("jg", res);
    let sj = res.data.data;

    proxy.newFormData2.SLBH = slbh;
    proxy.newFormData2.DJDL = sj.djsjd[0].DJDL;
    proxy.newFormData2.DJXL = sj.djsjd[0].DJXL;
    proxy.newFormData2.BDCSZQY = sj.djszqy[0].ITEMNAME;
  
    proxy.newFormData2.TZRXM = sj.djsjd[0].TZRXM;
    proxy.newFormData2.YDDH = sj.djsjd[0].TZRYDDH;
    proxy.newFormData2.CSRQ = sj.djsjd[0].SJSJ;
    proxy.newFormData2.FSRQ = sj.djsjd[0].SJSJ;
    proxy.newFormData2.HDRQ = sj.djsjd[0].SJSJ;
 proxy.newFormData2.SJR = sj.djsjd[0].SJR;
    proxy.newFormData2.SJSJ = sj.djsjd[0].SJSJ;
    proxy.newFormData2.SLKS = sj.djsjd[0].ZRKS;
    proxy.newFormData2.CFBH = sj.djcf[0].CFBH;

    proxy.newFormData2.CFWH = sj.djcf[0].CFWH;
    proxy.newFormData2.CFQX = sj.djcf[0].CFQX;
    proxy.newFormData2.CXMM = sj.djsjd[0].CXMM;
    proxy.newFormData2.JBR = sj.djcf[0].JBR;
    proxy.newFormData2.CFWJ = sj.djcf[0].CFWJ;
    proxy.newFormData2.CFJG = sj.djcf[0].CFJG;
    proxy.newFormData2.YG = sj.djcf[0].YGR;
    proxy.newFormData2.DJSJ = sj.djcf[0].SJSJ;

    proxy.newFormData2.CFDJYY = sj.djcf[0].CFYY;

    vFormRef.value.setFormData(proxy.newFormData2);
    const bgjh = document.getElementsByClassName("cfqdxr")[1];
    let j = 1;
    let kj =
      "<tr style='width: 100%'>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:100px;'><input type='checkbox'></td>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:80px;'>" +
      j +
      "</td>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:190px;'>" +
      sj.djcf[0].XGZH +
      "</td>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:200px;'>" +
      sj.djsjd[0].ZL +
      "</td>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:150px;'>" +
      sj.djQLR[0].QLRMC +
      "</td>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:150px;'>" +
      sj.djcf[0].ZJBH +
      "</td>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:100px;'>" +
      sj.djcf[0].CFSX +
      "</td>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:100px;'>" +
      sj.djcf[0].CFLX +
      "</td>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:200px;'>" +
      sj.djcf[0].BDCDYH +
      "</td>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:230px;'>" +
      sj.djcf[0].BDCDYH +
      "</td>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:80px;'>" +
      sj.djcf[0].FJ +
      "</td>" +
      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:100px;'>" +
      "详情" +
      "</td>" +
      "</tr>";
    bgjh.innerHTML = kj;

    if (sj.djQLR.length > 1) {
      let dlrstr = document.getElementsByClassName(
        "container-wrapper neir dlrxr"
      )[0];
      console.log("dfd", dlrstr);

      let j = 1;
      let dlrbg =
        "<table class='qlr' border='0' cellspacing='0' cellpadding='0' style='width: 100%;'><tr style='width: 100%'>" +
        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:109px;'><input type='checkbox'></td>" +
        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:109px;'>" +
        j +
        "</td>" +
        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:328px;'>" +
        sj.djQLR[1].QLRMC +
        "</td>" +
        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:219px;'>" +
        sj.djQLR[1].ZJLB +
        "</td>" +
        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:219px;'>" +
        sj.djQLR[1].ZJHM +
        "</td>" +
        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:328px;'>" +
        '' +
        "</td>" +
        // "<td class='table-cell' colspan='1' rowspan='1' display= 'none'>" +
        // xgzhdata1[i].ZSLX +
        // "</td>" +
        "</tr></table>";

      dlrstr.innerHTML = dlrbg;
    }
  });
};

const getformJson = () => {
  // 获取表单json
  proxy.$http
    .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
    .then((res) => {
      vFormRef.value.setFormJson(res.data);
      // 获取表单空数据
      vFormRef.value.getFormData().then((formData) => {
        // 将新表单数据渲染
        vFormRef.value.getFormData(proxy.newFormData2).then((formData) => {});
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

//读取第一个下拉框数据
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

//获取第二个下拉框name的数据
const databd = (val) => {
  proxy.dataxz = val;
};
// 通过
const confirm = () => {
  proxy.$http
    .get(
      " /flow/CFDJ/audit?variate=yes&taskId=" +
        taskId +
        "&taskName=" +
        taskName.slice(-2) +
        "&users=dbusers&user=" +
        proxy.ID +
        "&name=" +
        document.getElementsByClassName("bd")[0].innerText
    )
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        store.dispatch("gblc", "db");
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
      ElMessage.error("1操作失败");
    });
};

//数据保存到数据库中
const conserve = () => {
  console.log("11111111");
  //放到djsjd数据库
  let slbh = route.currentRoute._rawValue.query.slbh;
  let spbh = "";
  let spyj = "";
  let spr = "";
  let sprq = "";
  let spzt = "";
  let sptxr = "";
  let mdlid = "";
  let stepname = "登簿";
  let submitby = "";
  let submittime = "";
  let acceptby = "";
  let accepttime = "";
  let savetime = "";
  let submittype = "";
  let completetime = "";
  let stepstate = "";
  let steptype = "";
  let stepnum = "";
  let steplimtt = "";
  let biztype = "";
  let wrkid = "";
  let prjid = "";
  let mdltype = "";
  //初审点提交写入sql
  var data2 = {
    djspb1:
      "insert into dj_spb (spbh,slbh,spdx,spyj,spr,sprq,spzt,sptxr)values('SP-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 10),'" +
      slbh +
      "','" +
      "初审意见" +
      "','" +
      spyj +
      "','" +
      spr +
      "','" +
      sprq +
      "','" +
      spzt +
      "','" +
      sptxr +
      "')",
    djspb2:
      "insert into dj_spb (spbh,slbh,spdx,spyj,spr,sprq,spzt,sptxr)values('SP-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 10),'" +
      slbh +
      "-1','" +
      "初审意见" +
      "','" +
      spyj +
      "','" +
      spr +
      "','" +
      sprq +
      "','" +
      spzt +
      "','" +
      sptxr +
      "')",
    djspb3:
      "insert into dj_spb (spbh,slbh,spdx,spyj,spr,sprq,spzt,sptxr)values('SP-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 10),'" +
      slbh +
      "','" +
      "审核意见" +
      "','" +
      spyj +
      "','" +
      spr +
      "','" +
      sprq +
      "','" +
      spzt +
      "','" +
      sptxr +
      "')",
    djspb4:
      "insert into dj_spb (spbh,slbh,spdx,spyj,spr,sprq,spzt,sptxr)values('SP-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 10),'" +
      slbh +
      "-1','" +
      "审核意见" +
      "','" +
      spyj +
      "','" +
      spr +
      "','" +
      sprq +
      "','" +
      spzt +
      "','" +
      sptxr +
      "')",
    djspb5:
      "insert into dj_spb (spbh,slbh,spdx,spyj,spr,sprq,spzt,sptxr)values('SP-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 10),'" +
      slbh +
      "','" +
      "批准意见" +
      "','" +
      spyj +
      "','" +
      spr +
      "','" +
      sprq +
      "','" +
      spzt +
      "','" +
      sptxr +
      "')",
    djspb6:
      "insert into dj_spb (spbh,slbh,spdx,spyj,spr,sprq,spzt,sptxr)values('SP-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 10),'" +
      slbh +
      "-1','" +
      "批准意见" +
      "','" +
      spyj +
      "','" +
      spr +
      "','" +
      sprq +
      "','" +
      spzt +
      "','" +
      sptxr +
      "')",
    wfmactinst1:
      "insert into wfm_actinst(wrkid,prjid,mdltype,mdlid,stepname,submitby,submittime,acceptby,accepttime,savetime,submittype,completetime,stepstate,steptype,stepnum,steplimit,biztype)values('Wrk-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
      slbh +
      "','" +
      mdltype +
      "','" +
      mdlid +
      "','" +
      stepname +
      "','" +
      submitby +
      "'," +
      "to_date(to_char(sysdate,'yyyy/MM/dd hh24:mi:ss'),'yyyy/MM/dd hh24:mi:ss'),'" +
      acceptby +
      "','" +
      savetime +
      "','" +
      accepttime +
      "','" +
      submittype +
      "','" +
      completetime +
      "','" +
      "待接收" +
      "','" +
      stepnum +
      "','" +
      steplimtt +
      "','" +
      biztype +
      "','" +
      steptype +
      "')",
    wfmactinst2:
      "update wfm_actinst set savetime =to_date(to_char(sysdate,'yyyy/MM/dd hh24:mi:ss'),'yyyy/MM/dd hh24:mi:ss'),stepstate = '" +
      "已完成" +
      "'where prjid = '" +
      slbh +
      "' and stepname='收件'",
  };
  let config = {
    headers: { "Content-Type": "application/json" },
  };
  axios
    .post("/test/sqls", data2, config)
    .then((res) => {
      console.log("res", res);
      let sj = res.data.data;
      if (sj == null) {
      } else {
        ElMessage({
          message: "已保存",
          type: "success",
        });
      }
    });
};
onMounted(() => {
  getformJson();

  show();
  fromname();
  setTimeout(() => {
    getInputData();
  }, 3500);

  // submitForm();
});
</script>

<style>
.formcontent {
  width: 76.34%;
}
.cfqdxr {
  line-height: 26px;
}
.el-form-item.is-error .el-input__wrapper{
  box-shadow: 0 0 0 1px transparent !important;
}
.el-form-item.is-error .el-select-v2__wrapper, .el-form-item.is-error .el-select-v2__wrapper:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus{
   box-shadow: 0 0 0 1px transparent !important;
}
.slh {
  background: #fff !important;
  font-size: 14px;
  padding: 9px 1px;
}
.cfqdxr{
  line-height: 26px;
}
 td{
    word-wrap: break-word;
    word-break: normal;
    }
</style>
