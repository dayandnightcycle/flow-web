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
      <el-dialog v-model="dialogFormVisible" title="选择受理">
        <el-form :model="form" label-width="120px">
          <el-form-item label="下一个表单">
            <el-select
              v-model="form.namedata"
              @change="databd"
              placeholder="转移登簿缮证.json"
            >
              <!-- <el-option
                v-for="(item, index) in proxy.region"
                :label="item"
                :key="index"
                :value="item"
              /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="下一个登簿人">
            <el-select
              v-model="form.region"
              @change="dataslr"
              placeholder="选择登簿人"
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
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
  newFormData: "",
  newFormData1: "",
  hnew: "",
  newFormData: "",
  newFormData2: "",
  newFormData3: "",
  newFormData4: "",
  newFormData5: "",
  oldXGZH: "",
  oldTZRXM: "",
  oldDJDL: "",
  oldDJXL: "",
  oldDJYY: "",
  oldGYFS: "",
  oldZL: "",
  oldSLKS: "",
  oldYXJ: "",
  oldBDCSZQY: "",
  oldCXMM: "",
  oldTZRDH: "",
  oldTZRYDDH: "",
  oldDZYJ: "",
  shuju: "",
  oldQLRMC: "",
  oldQLRZJHM: "",
  oldXGZHZL: "",
  oldQLRZJZL: "",
  bdcdyh1: "",
  zrzh1: "",
  xmmc1: "",
  bdczh1: "",
  fwzl1: "",
  arr: "",
  //fw
  oldFJ: "",
  oldQT: "",
  oldJZWLX: "",
  oldHJZMJ: "",
  oldHFTMJ: "",
  oldHTNMJ: "",
  oldTDQLLX: "",
  oldTDQLXZ: "",
  oldQDFS: "",
  dyg: "",
  deg: "",
  dsg: "",
  selectcontent1: "",
  selectcontent2: "",
  selectcontent3: "",
});

const formJson = reactive({});
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
// console.log(taskName);
// console.log(taskId);
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
//获取表单数据
var slbh = router.currentRoute._rawValue.query.slbh;
var data = {
   xgzh:"SELECT a.XGZH,a.XGZLX,a.FSLBH,b.zl，c.qlrmc FROM DJ_XGDJGL a left join dj_sjd b on a.fslbh=b.slbh left join dj_qlrgl c on b.slbh=c.slbh   WHERE ZSLBH = '"+slbh+"' and c.qlrlx = '权利人'",
  djsjd: "select * from DJ_SJD where SLBH LIKE '%" + slbh + "%' AND ROWNUM < 2",
  djdjb:
    "select DJYY,GYFS,SLBH,SQZSBS,SQFBCZ, SQRQ, SQNR, SQBZ, DJRQ, DBR, ZSR, FZJG, FZRQ, DAMJ, QT, FJ, XGZH, BDCDYH, LIFECYCLE,DJRQ,GDH,SPBZ from DJ_DJB where slbh='" +
    slbh +
    "'",
    qlfwxg:
    "select QLBH,SLBH,QLLX,QLXZ,JZMJ,TNJZMJ,FTJZMJ,QDJG,QDFS,JZMJMS,GHYTMS,GHYT,PGJE,JZWLX,GZWLX from QL_FWXG where SLBH = '" +
    slbh +
    "'",
   qltdxg:
    "select QLBH,SLBH,QLLX,QLXZ,SYQX,QSRQ,ZZRQ,TDYT,TDSYQR,GYTDMJ,DYTDMJ,FTTDMJ,JZZDMJ,JZWZDMJ from QL_TDXG where SLBH = '" +
    slbh +
    "'",
  djpzyj:
    "select SPBH,SLBH,SPDX,SPXH,SPR,SPRQ,SPRZGZH,SPJG,SPZT,SPYJ,SPTXR from DJ_SPB where SLBH = '" +
    slbh +
    "' AND SPDX = '批准意见'",
  djshyj:
    "select SPBH,SLBH,SPDX,SPXH,SPR,SPRQ,SPRZGZH,SPJG,SPZT,SPYJ,SPTXR from DJ_SPB where SLBH = '" +
    slbh +
    "' AND SPDX = '审核意见'",
  djcsyj:
    "select SPBH,SLBH,SPDX,SPXH,SPR,SPRQ,SPRZGZH,SPJG,SPZT,SPYJ,SPTXR from DJ_SPB where SLBH = '" +
    slbh +
    "' AND SPDX = '初审意见'",
  ggxsqx:
    "select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '限购限售控制' AND ROWNUM < 2) AND ITEMNAME = '限售' AND ROWNUM < 2",
  ggtsdy:
    "select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME = '核定提示打印审批表' AND ROWNUM < 2",
  ggbjrq:
    "select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME = '审批时间可编辑' AND ROWNUM < 2",
  ggsjhq:
    "select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME = '审批意见双击获取' AND ROWNUM < 2",
  ggdqfj:
    "select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME = '审批备注读取附记' AND ROWNUM < 2",
  ggmrtg:
    "select ITEMVAL,ITEMNOTE from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME = '审批意见自动填写' AND ROWNUM < 2",
  ggdjxl:
    "select ITEMVAL,ITEMNOTE from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '国有建设用地使用权及房屋所有权转移登记' AND ROWNUM<2) ORDER BY ITEMORDER",
  qlr:
    "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('权利人','抵押权人') AND B.SLBH = '" +
    slbh +
    "' ORDER BY B.SXH",
  qlrdlr:
    "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('权利人代理人','抵押权人代理人') AND B.SLBH = '" +
    slbh +
    "' ORDER BY B.SXH",
  ywr:
    "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('义务人','抵押人') AND B.SLBH = '" +
    slbh +
    "' ORDER BY B.SXH",
  ywrdlr:
    "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('义务人代理人','抵押人代理人') AND B.SLBH = '" +
    slbh +
    "' ORDER BY B.SXH",
  
};
//登记清单数据
var data2 = {
  choose:
    "select a.bdcdyh,b.zl,c.dyh,c.sjc,c.myc,c.fjh,c.hdj,c.qllx,c.qlxz,c.tnjzmj,c.ftjzmj,d.qdjg,d.ghytms,d.qdfs,d.jzwlx,d.gzwlx,e.qllx,e.qlxz,e.qsrq,e.zzrq,e.tdyt,e.gytdmj,e.dytdmj,e.fttdmj from dj_djb a left join dj_sjd b on a.slbh = b.slbh left join fc_h_qsdc c on a.bdcdyh = c.bdcdyh left join ql_fwxg d on a.slbh = d.slbh left join ql_tdxg e on a.slbh =e.slbh where a.slbh in (SELECT fslbh FROM DJ_XGDJGL WHERE ZSLBH = '" +
    slbh +
    "'AND PID IS NULL)",
};
let config = {
  headers: { "Content-Type": "application/json" },
};
let biaoliang = "";
const getInputData = () => {
  axios
    .post("/test/sqls", data, config)
    .then((res) => {
      // 获取sql查询到的数据
      proxy.newFormData = res.data.data;
      console.log("proxy.newFormData ", proxy.newFormData);
      // proxy.oldXGZH = res.data.data.djdjb[0].XGZH;
      // proxy.oldDJDL = res.data.data.djsjd[0].DJDL;
      // proxy.oldDJXL = res.data.data.djsjd[0].DJXL;
      // proxy.oldDJYY = res.data.data.djdjb[0].DJYY;
      // proxy.oldGYFS = res.data.data.djdjb[0].GYFS;
      // proxy.oldXGZHZL = res.data.data.djsjd[0].ZL;
      // proxy.oldQLRMC = res.data.data.qlr[0].QLRMC;
      // proxy.oldQLRZJHM = res.data.data.qlr[0].ZJHM;
      // proxy.oldQLRZJZL = res.data.data.qlr[0].ZJLB;
      // proxy.oldQLRDH = res.data.data.qlr[0].DH;
      // proxy.oldSLKS = res.data.data.djsjd[0].ZRKS;
      // proxy.oldYXJ = res.data.data.djsjd[0].YXJ;
      // proxy.oldBDCSZQY = res.data.data.djsjd[0].QXDM;
      // proxy.oldCXMM = res.data.data.djsjd[0].CXMM;
      // proxy.oldTZRXM = res.data.data.djsjd[0].TZRXM;
      // proxy.oldTZRDH = res.data.data.djsjd[0].TZRDH;
      // proxy.oldTZRYDDH = res.data.data.djsjd[0].TZRYDDH;
      // proxy.oldDZYJ = res.data.data.djsjd[0].TZRDZYJ;
      //房屋
      // proxy.oldQT = res.data.data.djdjb[0].QT;
      // proxy.oldFJ = res.data.data.djdjb[0].FJ;
      // proxy.oldJZWLX = res.data.data.qlfwxg[0].JZWLX;
      // proxy.oldHJZMJ = res.data.data.qlfwxg[0].JZMJ;
      // proxy.oldHFTMJ = res.data.data.qlfwxg[0].FTJZMJ;
      // proxy.oldHTNMJ = res.data.data.qlfwxg[0].TNJZMJ;
      // proxy.oldTDQLLX = res.data.data.qlfwxg[0].QLLX;
      // proxy.oldTDQLXZ = res.data.data.qlfwxg[0].QLXZ;
    });
  axios.post("/test/sqls", data2).then((res) => {
    // 获取sql查询到的数据
    console.log("res55555555555555", res.data.data);
    //一进表单就得到的房屋登记信息数据
    proxy.shuju = res.data.data.choose;
    // console.log("shuju", proxy.shuju);
  });
  setTimeout(() => {
    //第一个弹窗
    let srk = document.getElementsByClassName("el-textarea__inner")[6];
    let qxbutton = document.getElementsByClassName("el-button")[9];
    srk.addEventListener("dblclick", function (e) {
      biaoliang = "dyg";
   let station1 = document.getElementsByClassName("table-container")[12];
      station1.classList.add("black");
      qxbutton.onclick = function () {
        station1.classList.remove("black");
      };
      let jihe = document.getElementsByClassName("zb");
      for (let i = 0; i < jihe.length; i++) {
        let mm = jihe[i];
        mm.addEventListener("click", function (e) {
          if (e.target.innerText == mm.innerText) {
            proxy.selectcontent1 = mm.innerText;
          }
        });
      }
    });
    //第二个弹窗
    
    let srk2 = document.getElementsByClassName("el-textarea__inner")[7];
    srk2.addEventListener("dblclick", function (e) {
      biaoliang = "deg";
      let station2 = document.getElementsByClassName("table-container")[12];
      station2.classList.add("black");
      qxbutton.onclick = function () {
        station2.classList.remove("black");
      };
      let jihe = document.getElementsByClassName("zb");
      for (let i = 0; i < jihe.length; i++) {
        let mm = jihe[i];
        mm.addEventListener("click", function (e) {
          if (e.target.innerText == mm.innerText) {
            proxy.selectcontent2 = mm.innerText;
          }
        });
      }
    });
    //第三个弹窗
    let srk3 = document.getElementsByClassName("el-textarea__inner")[8];
    srk3.addEventListener("dblclick", function (e) {
      biaoliang = "dsg";
      let station3 = document.getElementsByClassName("table-container")[12];
      station3.classList.add("black");
      qxbutton.onclick = function () {
        station3.classList.remove("black");
      };
      let jihe = document.getElementsByClassName("zb");
      for (let i = 0; i < jihe.length; i++) {
        let mm = jihe[i];
        mm.addEventListener("click", function (e) {
          if (e.target.innerText == mm.innerText) {
            proxy.selectcontent3 = mm.innerText;
          }
        });
      }
    });
    let jihe = document.getElementsByClassName("zb");
    for (let i = 0; i < jihe.length; i++) {
      let mm = jihe[i];
      mm.addEventListener("click", function (e) {
        if (e.target.innerText == mm.innerText) {
          var selectcontent = mm.innerText;
        }
        let xznr = document.getElementsByClassName("bgcolor")[24];
        let qdxzx = document.getElementsByClassName("el-button")[8];
        let srk = document.getElementsByClassName("el-textarea__inner")[6];
        let srk2 = document.getElementsByClassName("el-textarea__inner")[7];
        let srk3 = document.getElementsByClassName("el-textarea__inner")[8];
        xznr.innerHTML = selectcontent;
        qdxzx.addEventListener("click", function (e) {
          if (biaoliang == "dyg") {
            srk.innerHTML = proxy.selectcontent1;
          } else if (biaoliang == "deg") {
            srk2.innerHTML = proxy.selectcontent2;
          } else if (biaoliang == "dsg") {
            srk3.innerHTML = proxy.selectcontent3;
          }
          let station1 = document.getElementsByClassName("table-container")[12];
          station1.classList.remove("black");
        });
      });
    }
  }, 3000);
};
// 获取表单
const getformJson = () => {
  proxy.$http
    .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
    .then((res) => {
      console.log("res.data", res.data);
      vFormRef.value.setFormJson(res.data);
      console.log(formData);
      proxy.newFormData2 = formData;
      console.log(proxy.newFormData2);
      //收件单
      proxy.newFormData2.SLBH = $router.currentRoute._rawValue.query.slbh;
      proxy.newFormData2.XGZH = proxy.newFormData.xgzh[0].XGZH;
      proxy.newFormData2.XGZHZL = proxy.newFormData.xgzh[0].ZL;
      proxy.newFormData2.XGZLX = proxy.newFormData.xgzh[0].XGZLX;
       proxy.newFormData2.QLRMC = proxy.newFormData.xgzh[0].QLRMC;
      proxy.newFormData2.DJDL = proxy.newFormData.djsjd[0].DJDL;
      proxy.newFormData2.DJXL = proxy.newFormData.djsjd[0].DJXL;
      proxy.newFormData2.DJYY = proxy.newFormData.djdjb[0].DJYY;
      proxy.newFormData2.SJSJ = proxy.newFormData.djsjd[0].SJSJ;
      proxy.newFormData2.CNSJ = proxy.newFormData.djsjd[0].CNSJ;
      proxy.newFormData2.GYFS = proxy.newFormData.djdjb[0].GYFS;   
      //权利人
      proxy.newFormData2.XH = proxy.newFormData.qlr[0].SXH;
      proxy.newFormData2.MC = proxy.newFormData.qlr[0].QLRMC;
      proxy.newFormData2.ZJHM = proxy.newFormData.qlr[0].ZJHM;
      proxy.newFormData2.QLRZJZL = proxy.newFormData.qlr[0].ZJLB;
      proxy.newFormData2.DH = proxy.newFormData.qlr[0].DH;
      //登簿缮证中权利人
      proxy.newFormData2.XM = proxy.newFormData.qlr[0].QLRMC;
       proxy.newFormData2.ZJZL=proxy.newFormData.qlr[0].ZJLB
      //权利人代理人
       proxy.newFormData2.DLRXH = proxy.newFormData.qlrdlr[0].SXH;
      proxy.newFormData2.DLRMC = proxy.newFormData.qlrdlr[0].QLRMC;
      proxy.newFormData2.DLRZJHM = proxy.newFormData.qlrdlr[0].ZJHM;
      proxy.newFormData2.DLRZJZL = proxy.newFormData.qlrdlr[0].ZJLB;
      proxy.newFormData2.DLRDH = proxy.newFormData.qlrdlr[0].DH;
     //义务人
      //  proxy.newFormData2.YWRXH = proxy.newFormData.ywr[0].SXH;
      // proxy.newFormData2.YWRMC = proxy.newFormData.ywr[0].QLRMC;
      // proxy.newFormData2.YWRZJHM = proxy.newFormData.ywr[0].ZJHM;
      // proxy.newFormData2.YWRZJZL = proxy.newFormData.ywr[0].ZJLB;
      // proxy.newFormData2.YWRDH = proxy.newFormData.ywr[0].DH;
      //义务人代理人
      proxy.newFormData2.YWRDLRXH = proxy.newFormData.ywrdlr[0].SXH;
      proxy.newFormData2.YWRDLRMC = proxy.newFormData.ywrdlr[0].QLRMC;
      proxy.newFormData2.YWRDLRZJHM = proxy.newFormData.ywrdlr[0].ZJHM;
      proxy.newFormData2.YWRDLRZJZL = proxy.newFormData.ywrdlr[0].ZJLB;
      proxy.newFormData2.YWRDLRDH = proxy.newFormData.ywrdlr[0].DH;

      proxy.newFormData2.SLKS = proxy.newFormData.djsjd[0].ZRKS;
      proxy.newFormData2.YXJ = proxy.newFormData.djsjd[0].YXJ;
      proxy.newFormData2.BDCSZQY = proxy.newFormData.djsjd[0].QXDM;
      proxy.newFormData2.CXMM = proxy.newFormData.djsjd[0].CXMM;
      proxy.newFormData2.TZRXM = proxy.newFormData.djsjd[0].TZRXM;
      proxy.newFormData2.TZRDH = proxy.newFormData.djsjd[0].TZRDH;
      proxy.newFormData2.YDDH = proxy.newFormData.djsjd[0].TZRYDDH;
      proxy.newFormData2.DZYJ = proxy.newFormData.djsjd[0].TZRDZYJ;
      proxy.newFormData2.ZL = proxy.newFormData.xgzh[0].ZL;
       proxy.newFormData2.LCLB = proxy.newFormData.djsjd[0].LCLB;
      // 房屋登记信息
    proxy.newFormData2.TDSYQL = proxy.newFormData.qltdxg[0].TDSYQR;
     proxy.newFormData2.SYQX = proxy.newFormData.qltdxg[0].SYQX;
      proxy.newFormData2.FJQLLX = proxy.newFormData.qltdxg[0].QLLX;
       proxy.newFormData2.FJQLXZ = proxy.newFormData.qltdxg[0].QLXZ;
    proxy.newFormData2.PGJE = proxy.newFormData.qlfwxg[0].PGJE;
    proxy.newFormData2.JZWLX = proxy.newFormData.qlfwxg[0].JZWLX;
    proxy.newFormData2.GZWLX = proxy.newFormData.qlfwxg[0].GZWLX;
    proxy.newFormData2.QDFS = proxy.newFormData.qlfwxg[0].QDFS;
    proxy.newFormData2.JYJG = proxy.newFormData.qlfwxg[0].QDJG;
    proxy.newFormData2.FHTMJ = proxy.newFormData.qlfwxg[0].FTJZMJ;
    proxy.newFormData2.HTNMJ = proxy.newFormData.qlfwxg[0].TNJZM;
    proxy.newFormData2.HJZMJH = proxy.newFormData.qlfwxg[0].JZMJ;
    proxy.newFormData2.TDQLLX = proxy.newFormData.qlfwxg[0].QLLX;
    proxy.newFormData2.TDQLXZ = proxy.newFormData.qlfwxg[0].QLXZ;
    proxy.newFormData2.DYTDMJ = proxy.newFormData.qltdxg[0].DYTDMJ;
  proxy.newFormData2.FTTDMJ= proxy.newFormData.qltdxg[0].FTTDMJ;
  proxy.newFormData2.JZWZDMJ = proxy.newFormData.qltdxg[0].JZWZDMJ;
  proxy.newFormData2.ZDMJ = proxy.newFormData.qltdxg[0].JZZDMJ;
  proxy.newFormData2.TDYT = proxy.newFormData.qltdxg[0].TDYT;
    proxy.newFormData2.GHYT = proxy.newFormData.qlfwxg[0].GHYT;
      //房屋登记信息数据
      proxy.newFormData2.tdsyqr = proxy.newFormData.qltdxg[0].TDSYQR;
      proxy.newFormData2.BDCDYH = proxy.shuju[0].BDCDYH;
      proxy.newFormData2.bdcdyh = proxy.shuju[0].BDCDYH;
      proxy.newFormData2.DYH = proxy.shuju[0].DYH;
      proxy.newFormData2.FJH = proxy.shuju[0].FJH;
      proxy.newFormData2.zl = proxy.shuju[0].ZL;
      proxy.newFormData2.GHYT = proxy.shuju[0].GHYTMS;
      proxy.newFormData2.ghyt = proxy.shuju[0].GHYTMS;
      proxy.newFormData2.XQ = "详情";
      proxy.newFormData2.QDFS = proxy.shuju[0].QDFS;
      proxy.newFormData2.JYJG = proxy.shuju[0].QDJG;
      proxy.newFormData2.TDQLLX = proxy.shuju[0].QLLX;
      proxy.newFormData2.TDQLXZ = proxy.shuju[0].QLXZ;
      proxy.newFormData2.TDYT = proxy.shuju[0].TDYT;
      proxy.newFormData2.HTNMJ = proxy.shuju[0].TNJZMJ;
      proxy.newFormData2.tdqllx = proxy.shuju[0].QLLX;
      proxy.newFormData2.tdqlxz = proxy.shuju[0].QLXZ;
      proxy.newFormData2.tdyt = proxy.shuju[0].TDYT;
      proxy.newFormData2.qdfs = proxy.shuju[0].QDFS;
      proxy.newFormData2.jyjg = proxy.shuju[0].QDJG;
      proxy.newFormData2.htnmj = proxy.shuju[0].TNJZMJ;
      // 得到新表单数据
      console.log(proxy.newFormData2);
      // 将新表单数据渲染
      vFormRef.value.setFormData(proxy.newFormData2);

      // proxy.newFormData1 = formData;
      // proxy.newFormData1.textarea84988 = proxy.newFormData.djcsyj[0].SPYJ;
      // proxy.newFormData1.input28814 = proxy.newFormData.djcsyj[0].SPR;
      // proxy.newFormData1.input81874 = proxy.newFormData.djcsyj[0].SPRQ;
      // proxy.newFormData1.input98971 = proxy.newFormData.djcsyj[0].SPBH;
      // proxy.newFormData1.textarea48288 = proxy.newFormData.djpzyj[0].SPYJ;
      // proxy.newFormData1.input60425 = proxy.newFormData.djpzyj[0].SPR;
      // proxy.newFormData1.input103529 = proxy.newFormData.djpzyj[0].SPRQ;
      // proxy.newFormData1.input93637 = proxy.newFormData.djpzyj[0].SPBH;
      // proxy.newFormData1.textarea52474 = proxy.newFormData.djshyj[0].SPYJ;
      // proxy.newFormData1.input105208 = proxy.newFormData.djshyj[0].SPR;
      // proxy.newFormData1.input115736 = proxy.newFormData.djshyj[0].SPRQ;
      // proxy.newFormData1.input32898 = proxy.newFormData.djshyj[0].SPBH;
      // vFormRef.value.setFormData(proxy.newFormData1);
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
        "&users=dbszusers&user=" +
        proxy.ID +
        "&name=转移登簿缮证.json"
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
  console.log(document.getElementsByClassName("el-input__inner"));
  console.log(document.getElementsByClassName("el-textarea__inner"));
  let slbh = $router.currentRoute._rawValue.query.slbh;
  let spbh1 = "TD1_" + slbh;
  let spbh2 = "TD2_" + slbh;
  let spbh3 = "TD3_" + slbh;
  let spdx = "";
  let csspyj = document.getElementsByClassName("el-textarea__inner")[6].value;
  let fsspyj = document.getElementsByClassName("el-textarea__inner")[7].value;
  let hdspyj = document.getElementsByClassName("el-textarea__inner")[8].value;
  let csspr = document.getElementsByClassName("el-input__inner")[95].value;
  let fsspr = document.getElementsByClassName("el-input__inner")[98].value;
  let hdspr = document.getElementsByClassName("el-input__inner")[101].value;
  let cssprq = document.getElementsByClassName("el-input__inner")[96].value;
  let fssprq = document.getElementsByClassName("el-input__inner")[99].value;
  let hdsprq = document.getElementsByClassName("el-input__inner")[102].value;
  let spzt = "";
  let sptxr = "";
  let bdczh = "";
  let ssjc = "";
  let jgjc = "";
  let fznd = "";
  let zsh = "";
  let fzjg = "";
  let zslx = "";
  let cssprzgzh = document.getElementsByClassName("el-input__inner")[97].value;
  let fssprzgzh = document.getElementsByClassName("el-input__inner")[100].value;
  let hdsprzgzh = document.getElementsByClassName("el-input__inner")[103].value;
  //qlfwxg
  var data3 = {
    djspb:
      "insert into dj_spb(spbh,slbh,spdx,spyj,spr,sprq,spzt,sptxr,sprzgzh)values('" +
      spbh1 +
      "','" +
      slbh +
      "','" +
      spdx +
      "','" +
      csspyj +
      "','" +
      csspr +
      "',to_date(to_char('" +
      cssprq +
      "'),'yyyy-MM-dd'),'" +
      spzt +
      "','" +
      sptxr +
      "','" +
      cssprzgzh +
      "')",
    djspb:
      "insert into dj_spb(spbh,slbh,spdx,spyj,spr,sprq,spzt,sptxr,sprzgzh)values('" +
      spbh2 +
      "','" +
      slbh +
      "','" +
      spdx +
      "','" +
      fsspyj +
      "','" +
      fsspr +
      "',to_date(to_char('" +
      fssprq +
      "'),'yyyy-MM-dd'),'" +
      spzt +
      "','" +
      sptxr +
      "','" +
      fssprzgzh +
      "')",
    djspb:
      "insert into dj_spb(spbh,slbh,spdx,spyj,spr,sprq,spzt,sptxr,sprzgzh)values('" +
      spbh3 +
      "','" +
      slbh +
      "','" +
      spdx +
      "','" +
      hdspyj +
      "','" +
      hdspr +
      "',to_date(to_char('" +
      hdsprq +
      "'),'yyyy-MM-dd'),'" +
      spzt +
      "','" +
      sptxr +
      "','" +
      hdsprzgzh +
      "')",
    djdjb:
      "update dj_djb set bdczh='" +
      bdczh +
      "',ssjc='" +
      ssjc +
      "',jgjc='" +
      jgjc +
      "',fznd='" +
      fznd +
      "',zsh='" +
      zsh +
      "',fzjg='" +
      fzjg +
      "',zslx='" +
      zslx +
      "'where slbh='" +
      slbh +
      "'",
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
  getformJson();
  getInputData();
  show();
  fromname();
});
</script>

<style>
.formcontent {
  width: 70%;
}
.black {
  display: block !important;
}
.el-checkbox__inner {
  background: #fff !important;
}
</style>