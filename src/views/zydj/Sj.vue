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
      <div>
        <el-button type="primary" @click="conserve">保存</el-button>
        <el-button type="primary" @click="dialogFormVisible = true"
          >通过</el-button
        >
        <el-button type="danger" @click="refuse">拒绝</el-button>
      </div>
      <el-dialog v-model="dialogFormVisible" title="选择收件">
        <el-form :model="form" label-width="120px">
          <el-form-item label="下一个表单">
            <el-input v-model="input" placeholder="转移受理.json" />
            <!-- <el-select
              v-model="form.namedata"
              @change="databd"
              placeholder="转移受理.json"
            >
              <el-option
                v-for="(item, index) in proxy.namedata"
                :label="item"
                :key="index"
                :value="item"
              />
            </el-select> -->
          </el-form-item>
          <el-form-item label="下一位受理人">
            <el-select
              v-model="form.region"
              @change="dataslr"
              placeholder="请选择受理人"
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

    <div class="whole"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, watch } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import router from "../../router";
import Cookies from "js-cookie";
import { nextTick } from "vue";
import { createWebHashHistory, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Loading } from "@element-plus/icons-vue";
const $router = useRouter();
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
  namedata: "",
  hnew: "",
  formData: "",
  formData2: "",
  newFormData: "",
  newFormData2: "",
  newFormData3: "",
  newFormDataxx: "",
  optionData: "",
  bdcdyh: "",
  bdcqzh: "",
  slbh: "",
  qlr: "",
  zl: "",
  ywr: "",
  arr1: [],
  arr: [],
  qlrmc: "",
  qlrxz: "",
  zjzl: "",
  zjbm: "",
  xgzhxr: "",
  qlrid: "",
  qlrdlrid: "",
  ywrid: "",
  ywrdlrid: "",
  qlrglbm: "",
  qlrdlrglbm: "",
  ywrglbm: "",
  ywrdlrglbm: "",
});
const formJson = reactive({});
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
//js查询数据
const SLBH = $router.currentRoute._rawValue.query.slbh;
var data = {
  djsjd:
    "select SLBH,QXKZ,LCLX, LCMC, SJR, SJSJ, CNSJ, QXDM, TZRXM, TZFS, TZRDH, TZRYDDH, TZRDZYJ, TZRTXDZ, CXMM, SJMC, SJLX, SJSL, YS, SFSYBZ, SFEWSJ, SFBCSJ, ZRKS,ZRR,YXJ,SJBZ,BCSM,DJXL,FCSLH,FCDJLX,JYBH,FCHID,DJDL,ZL,HTBH,PCH,PRJID,XCZP,LCLB from DJ_SJD where SLBH = '" +
    SLBH +
    "'",
  djdjb:
    "select SLBH,SQFBCZ,GYFS,DJLX,DJYY,DJRQ,SQRQ,XGZH,LIFECYCLE from DJ_DJB where SLBH = ''",
  djtsgl: "select LIFECYCLE from DJ_TSGL where SLBH = ''",
  ggdjyy:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '房屋转移登记原因' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggzrks:
    "select ITEMNOTE AS ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '责任科室' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggsjr:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '收件人' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggyxj:
    "select ITEMVAL, ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '优先级' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggssxq:
    "select ITEMNOTE,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '所属辖区' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggtzfs:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '通知方式' AND ROWNUM<2) ORDER BY ITEMORDER",
  gggyfs:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '共有方式' AND ROWNUM < 2 ) ORDER BY ITEMORDER",
  ggdjxl:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '国有建设用地使用权及房屋所有权转移登记' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggdjlx:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记类型(大类)' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggzjlx:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggsjbz2:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '收件备注' AND ROWNUM<2) AND ITEMNOTE IS NOT NULL ORDER BY ITEMORDER",
  ggqygpy:
    "select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '设备' AND ROWNUM < 2) AND ITEMNAME = '现场拍照启用高拍仪' AND ROWNUM < 2",
  ggdjxlms:
    "select ITEMNOTE,ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '国有建设用地使用权及房屋所有权转移登记' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggxsqx:
    "select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '限购限售控制' AND ROWNUM < 2) AND ITEMNAME = '限售' AND ROWNUM < 2",
  gglclb:
    "select ItemVal,ItemName from DIC_ITEM where dicCode =(SELECT DICCODE FROM dic_main WHERE DICNAME = '流程类别' And RowNum<2)",
};
var slbh1 = router.currentRoute._rawValue.query.slbh;
var data4 = {
   xgzh:"SELECT a.XGZH,a.XGZLX,a.FSLBH,b.zl，c.qlrmc FROM DJ_XGDJGL a left join dj_sjd b on a.fslbh=b.slbh left join dj_qlrgl c on b.slbh=c.slbh   WHERE ZSLBH = '"+slbh1+"' and c.qlrlx = '权利人'",
  djsjd: "select * from DJ_SJD where SLBH= '" + slbh1 + "'",
  djtsgl:
    "select GLBM, SLBH, BDCLX, TSTYBM, BDCDYH, DJZL, GLMS, CSSJ from DJ_TSGL where SLBH = '" +
    slbh1 +
    "' AND (BDCLX = '房屋' OR  BDCLX = '多幢房屋')",
  djytsgl:
    "select GLBM, SLBH, BDCLX, TSTYBM, BDCDYH, DJZL, GLMS, CSSJ from DJ_TSGL where SLBH IN (SELECT FSLBH FROM DJ_XGDJGL WHERE ZSLBH = '" +
    slbh1 +
    "' AND PID IS NULL) AND (BDCLX = '房屋' OR  BDCLX = '多幢房屋')",
  qlfwxg:
    "select QLBH,SLBH,QLLX,QLXZ,JZMJ,TNJZMJ,FTJZMJ,QDJG,QDFS,JZMJMS,GHYTMS,GHYT,PGJE,JZWLX,GZWLX from QL_FWXG where SLBH = '" +
    slbh1 +
    "'",
  qltdxg:
    "select QLBH,SLBH,QLLX,QLXZ,SYQX,QSRQ,ZZRQ,TDYT,TDSYQR,GYTDMJ,DYTDMJ,FTTDMJ,JZZDMJ,JZWZDMJ from QL_TDXG where SLBH = '" +
    slbh1 +
    "'",
  djdjb:
    "select DJYY,GYFS,SLBH,SQZSBS,SQFBCZ, SQRQ, SQNR, SQBZ, DJRQ, DBR, ZSR, FZJG, FZRQ, DAMJ, QT, FJ, XGZH, BDCDYH, LIFECYCLE,DJRQ,GDH,SPBZ from DJ_DJB where SLBH = '" +
    slbh1 +
    "'",
  djydjb:
    "select SLBH, QT, FJ from DJ_DJB where SLBH IN (SELECT FSLBH FROM DJ_XGDJGL WHERE ZSLBH ='" +
    slbh1 +
    "' AND PID IS NULL)",
  fchqsdc:
    "select TSTYBM, ZDTYBM, ZH, HH, BDCDYH, LSZTYBM, LSFWBH, QLLX, QLXZ, HX, HXJG, ZXCD, GHYT, ZL, SJC, MYC, DYH, FJH, LJZH, QDJG, QDFS, SHBW, JZMJ, TNJZMJ, FTJZMJ, DXBFJZMJ, QTJZMJ, FTXS, TDZZRQ, TDYT, TDSYQR, GYTDMJ, FTTDMJ, DYTDMJ, FWLX, FWXZ, SJCS, CG, ZT, LIFECYCLE,TDQSRQ,TDSYQX, HLX, GZWLX from FC_H_QSDC where TSTYBM = (select TSTYBM from DJ_TSGL where SLBH = '" +
    slbh1 +
    "'and rownum <2)",
  zdqsdc:
    "select TSTYBM, ZDLX, ZDTYBM, SJZDTYBM, BDCDYH, DJH, QSDWDM, QSDWMC, ZLDWDM, ZLDWMC, TDZL, QLRMC, QLLX, QLXZ, TDSYZ, DYMJ, FTMJ, SFGYZ, PZTDYT, SJTDYT, GYSYQQK, SCMJ, FZMJ, SZTFH, JZMJ, JZWZDMJ, JZRJL, JZMD, JZXG, QDFS, SZD, SZN, SZX, SZB, SM, ZDZT, ZBCLXXX, ZDTZM, QLSDFS, JZDCY, ZJWTS, ZDCTHZY, ZDCTHZRQ, QSDCJS, DCY, DCRQ, JZBS, DJKZJS, KZY, KZRQ, DCSHYJ, DCSHR, DCSHRQ, TDZMJ, NYDMJ, GDMJ, YDMJ, LDMJ, MCDMJ, NYDQTMJ, JSYDMJ, JMDMJ, JTYDMJ, SYMJ, JSYDQTMJ, WLYDMJ, GMJJHYFLDM, YBZDDM, BLC, JZDWSM, ZYQSJZZXSM, JZWLX, JZWQS, SYQX, QSRQ, ZZRQ, ZDDJ, ZDJG, DLRXM, DLRZJLX, DLRZJH, DLRDH, LIFECYCLE,TDSYZ from ZD_QSDC where ZDTYBM = (select ZDTYBM from FC_H_QSDC where TSTYBM = (select TSTYBM from DJ_TSGL where SLBH ='" +
    slbh1 +
    "'and rownum < 2)) AND (LIFECYCLE IS NULL OR LIFECYCLE = '0')",
  qlr:
    "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('权利人','抵押权人') AND B.SLBH = '" +
    slbh1 +
    "' ORDER BY B.SXH",
  qlrdlr:
    "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('权利人代理人','抵押权人代理人') AND B.SLBH = '" +
    slbh1 +
    "' ORDER BY B.SXH",
  ywr:
    "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('义务人','抵押人') AND B.SLBH = '" +
    slbh1 +
    "' ORDER BY B.SXH",
  ywrdlr:
    "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('义务人代理人','抵押人代理人') AND B.SLBH = '" +
    slbh1 +
    "' ORDER BY B.SXH",
};
//表单数据获取
let SLRY;
let CNSJ;
let JSONData;
let ZJLBdata = [];
let QLRXZdata = [];
let qlrxxdata = [];
let XGZHXX1 = [];
let QLRXX1 = [];
let QLRDLRXX1 = [];
let YWRXX1 = [];
let YWRDLRXX1 = [];
let xgzhspl1 = [];
let YWRdatadata="";
const getInputData = () => {
  axios.post("/test/sqls", data).then((res) => {
    // 获取sql查询到的数据
    proxy.newFormData = res.data.data;
    console.log(" proxy.newFormData", formData)
  });
  axios.post("/test/sqls", data4).then((res) => {
    // 获取sql查询到的数据
    JSONData = res.data.data;
    let sjxx=res.data.data;
    proxy.newFormData0 = formData;
    console.log("proxy.newFormData0", formData);
     proxy.newFormData0.LCLB=sjxx.djsjd[0].LCLB;
      proxy.newFormData0.CXMM=sjxx.djsjd[0].CXMM;
      proxy.newFormData0.DJXL=sjxx.djsjd[0].DJXL;
       proxy.newFormData0.BDCSZQY=sjxx.djsjd[0].QXDM;
        proxy.newFormData0.TZFS=sjxx.djsjd[0].TZFS;
       proxy.newFormData0.TZRDH=sjxx.djsjd[0].TZRDH;
        proxy.newFormData0.DZYJ=sjxx.djsjd[0].TZRDZYJ;
        proxy.newFormData0.TZRXM=sjxx.djsjd[0].TZRXM;
        proxy.newFormData0.YDDH=sjxx.djsjd[0].TZRYDDH;
        proxy.newFormData0.YXJ=sjxx.djsjd[0].YXJ;
        proxy.newFormData0.TZRZL=sjxx.djsjd[0].ZL;
        proxy.newFormData0.SLKS=sjxx.djsjd[0].ZRKS;
    // proxy.newFormData0.XGZH = sjxx.djdjb[0].XGZH;
    // proxy.newFormData0.QLRMC = sjxx.qlr[0].QLRMC;
    // //  proxy.newFormData0.YWRMC =  sjxx.qlr[0].;
    // proxy.newFormData0.ZL = sjxx.djsjd[0].ZL;
    // proxy.newFormData0.TZRZL = sjxx.djsjd[0].ZL;

    // proxy.newFormData0.XH = "1";
    // proxy.newFormData0.MC = sjxx.qlr[0].QLRMC;
    // proxy.newFormData0.ZJZL = sjxx.qlr[0].ZJLB;
    // proxy.newFormData0.ZJHM = sjxx.qlr[0].ZJHM;
    // proxy.newFormData0.DH = "";

    // proxy.newFormData0.DLRXH = "1";
    // proxy.newFormData0.DLRMC = sjxx.qlrdlr[0].QLRMC;
    // proxy.newFormData0.DLRZJZL = sjxx.qlrdlr[0].ZJLB;
    // proxy.newFormData0.DLRZJHM = sjxx.qlrdlr[0].ZJHM;
    // proxy.newFormData0.DLRDH = "";

    // proxy.newFormData0.YWRDLRXH = "1";
    // proxy.newFormData0.YWRDLRMC = sjxx.ywrdlr[0].QLRMC;
    // proxy.newFormData0.YWRDLRZJZL = sjxx.ywrdlr[0].ZJLB;
    // proxy.newFormData0.YWRDLRZJHM = sjxx.ywrdlr[0].ZJHM;
    // proxy.newFormData0.YWRDLRDH = "";

    // proxy.newFormData0.TZRXM = sjxx.djsjd[0].TZRXM;
    // proxy.newFormData0.TZRDH = sjxx.djsjd[0].TZRDH;
    // proxy.newFormData0.YDDH = sjxx.djsjd[0].TZRYDDH;
    // proxy.newFormData0.DZYJ = sjxx.djsjd[0].TZRDZYJ;
    // proxy.newFormData0.CXMM = sjxx.djsjd[0].CXMM;
    // proxy.newFormData0.TZRZL = sjxx.djsjd[0].ZL;

    // proxy.newFormData0.YWRXH = "1";
    // proxy.newFormData0.YWRMC = sjxx.ywr[0].QLRMC;
    // proxy.newFormData0.YWRZJZL = sjxx.ywr[0].ZJLB;
    // proxy.newFormData0.YWRZJHM = sjxx.ywr[0].ZJHM;
    // proxy.newFormData0.YWRDH = "";
    // vFormRef.value.setFormData(proxy.newFormData0);
  });
  //时间获取
    var myDate = new Date();
  var year = myDate.getFullYear(); //获取当前年
  var mon =
    myDate.getMonth() + 1 > 10
      ? myDate.getMonth() + 1
      : "0" + (myDate.getMonth() + 1); //获取当前月
  var date = myDate.getDate(); //获取当前日
  var hours = myDate.getHours(); //获取当前小时
  var minutes =
    myDate.getMinutes() > 10
      ? myDate.getMinutes()
      : "0" + myDate.getMinutes(); //获取当前分钟
  var seconds =
    myDate.getSeconds() > 10
      ? myDate.getSeconds()
      : "0" + myDate.getSeconds(); //获取当前秒
  var now =
    year +
    "-" +
    mon +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  let hyt = date - 1 > 10 ? date - 1 : "0" + (date - 1);
  var nowy = year + "-" + mon + "-" + date;
  var nowyjz = year + 3 + "-" + mon + "-" + hyt;
  CNSJ = now;
};
// 获取表单json
const getformJson = () => {
  proxy.$http
    .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
    .then((res) => {
      vFormRef.value.setFormJson(res.data);
      proxy.newFormData3 = formData;
      proxy.newFormData3.SLBH = route.currentRoute._rawValue.query.slbh;
      proxy.newFormData3.SJSJ = CNSJ;
      proxy.newFormData3.CNSJ = CNSJ;
      vFormRef.value.setFormData(proxy.newFormData3);
      //点击流程中收件单数据渲染
      console.log("JSONData",JSONData)
      let xgzhData=JSONData.xgzh;
      let qlrdata=JSONData.qlr;
      let qlrdlrdata=JSONData.qlrdlr;
      let ywrdata=JSONData.ywr;
      let ywrdlrdata=JSONData.ywrdlr;
       function compare(property) {
            return function (a, b) {
              let value1 = a[property];
              let value2 = b[property];
              return value1 - value2;
            }
          }
      qlrdata.sort(compare('SXH'))
      let xgzhData1='';
       let qlrdata1 = '';
        let qlrdlrdata1 = '';
        let ywrdata1 = '';
        let ywrdlrdata1 = '';
        for (let i = 0; i < xgzhData.length; i++) {
            let XGZLX = xgzhData[i].XGZLX
            if (XGZLX == 'null' || XGZLX == null) {
              XGZLX = ''
            }
            xgzhData1 += `<tr class='qlrtabletr'>
                      <td style='border:1px solid transparent !important;background:transparent;width:7.12%'><input type='checkbox' class='qlrtablecheck'></td>
                      <td style='width:21.43%'>${xgzhData[i].XGZH}</td>
                      <td style='width:14.3%'>${XGZLX}</td>
                      <td style='width:21.43%'>${xgzhData[i].QLRMC}</td>
                       <td style='width:21.43%'>${xgzhData[i].ZL}</td>
                      </tr>`
          }
        for (let i = 0; i < qlrdata.length; i++) {
            let DH = qlrdata[i].DH
            if (DH == 'null' || DH == null) {
              DH = ''
            }
            let zjlb ="身份证";
            // let ZJLB = JSONData.ggzjlx;
            // for (let i = 0; i < ZJLB.length; i++) {
            //   if (zjlb == ZJLB[i].ITEMVAL) {
            //     zjlb = ZJLB[i].ITEMNAME
            //   }
            // }
            let GYFE = qlrdata[i].GYFE
            if (GYFE == 'null' || GYFE == null) {
              GYFE = ''
            }
            qlrdata1 += `<tr class='qlrtabletr'>
                      <td style='border:1px solid transparent !important;background:transparent;width:7.12%'><input type='checkbox' class='qlrtablecheck'></td>
                      <td style='width:7.12%' >${qlrdata[i].SXH}</td>
                      <td style='width:21.43%' >${qlrdata[i].QLRMC}</td>
                      <td style='width:14.3%' >${zjlb}</td>
                      <td style='width:21.43%'>${qlrdata[i].ZJHM}</td>
                      <td style='width:14.3%'>${GYFE}</td>
                      <td style='width:14.3%'>${DH}</td>
                      </tr>`

          }
           for (let i = 0; i < qlrdlrdata.length; i++) {
            let DH = qlrdlrdata[i].DH
            if (DH == 'null' || DH == null) {
              DH = ''
            }
            let zjlb = "身份证";
            // let ZJLB = JSONData.ggzjlx;
            // for (let i = 0; i < ZJLB.length; i++) {
            //   if (zjlb == ZJLB[i].ITEMVAL) {
            //     zjlb = ZJLB[i].ITEMNAME
            //   }
            // }
            let GYFE = qlrdlrdata[i].GYFE
            if (GYFE == 'null' || GYFE == null) {
              GYFE = ''
            }
            qlrdlrdata1 += `<tr class='qlrtabletr'>
                      <td style='border:1px solid transparent !important;background:transparent;width:7.12%'><input type='checkbox' class='qlrtablecheck'></td>
                      <td style='width:7.12%'>${qlrdlrdata[i].SXH}</td>
                      <td style='width:21.43%'>${qlrdlrdata[i].QLRMC}</td>
                      <td style='width:14.3%'>${zjlb}</td>
                      <td style='width:21.43%'>${qlrdlrdata[i].ZJHM}</td>
                      <td style='width:14.3%'>${GYFE}</td>
                      <td style='width:14.3%'>${DH}</td>
                      </tr>`

          }
          for (let i = 0; i < ywrdata.length; i++) {
            let DH = ywrdata[i].DH
            if (DH == 'null' || DH == null) {
              DH = ''
            }
            let zjlb = "身份证";
            // let ZJLB = JSONData.ggzjlx;
            // for (let i = 0; i < ZJLB.length; i++) {
            //   if (zjlb == ZJLB[i].ITEMVAL) {
            //     zjlb = ZJLB[i].ITEMNAME
            //   }
            // }
            let GYFE = ywrdata[i].GYFE
            if (GYFE == 'null' || GYFE == null) {
              GYFE = ''
            }
            ywrdata1 += `<tr class='qlrtabletr'>
                      <td style='border:1px solid transparent !important;background:transparent;width:7.12%'><input type='checkbox' class='qlrtablecheck'></td>
                      <td style='width:7.12%'>${ywrdata[i].SXH}</td>
                      <td style='width:21.43%'>${ywrdata[i].QLRMC}</td>
                      <td style='width:14.3%'>${zjlb}</td>
                      <td style='width:21.43%'>${ywrdata[i].ZJHM}</td>
                      <td style='width:14.3%'>${GYFE}</td>
                      <td style='width:14.3%'>${DH}</td>
                      </tr>`

          }
           for (let i = 0; i < ywrdlrdata.length; i++) {
            let DH = ywrdlrdata[i].DH
            if (DH == 'null' || DH == null) {
              DH = ''
            }
            let zjlb = "身份证";
            // let ZJLB = JSONData.ggzjlx;
            // for (let i = 0; i < ZJLB.length; i++) {
            //   if (zjlb == ZJLB[i].ITEMVAL) {
            //     zjlb = ZJLB[i].ITEMNAME
            //   }
            // }
            let GYFE = ywrdlrdata[i].GYFE
            if (GYFE == 'null' || GYFE == null) {
              GYFE = ''
            }
            ywrdlrdata1 += `<tr class='qlrtabletr'>
                      <td  style='border:1px solid transparent !important;background:transparent;width:7.12%'><input type='checkbox' class='qlrtablecheck'></td>
                      <td style='width:7.12%' >${ywrdlrdata[i].SXH}</td>
                      <td style='width:21.43%' >${ywrdlrdata[i].QLRMC}</td>
                      <td style='width:14.3%' >${zjlb}</td>
                      <td style='width:21.43%' >${ywrdlrdata[i].ZJHM}</td>
                      <td style='width:14.3%' >${GYFE}</td>
                      <td style='width:14.3%'>${DH}</td>
                      </tr>`

          }
          setTimeout(() => {
      let xgzhtable=document.getElementsByClassName('tableys')[0]
      let qlrtable=document.getElementsByClassName('tableys')[1]
      let qlrdlrtable=document.getElementsByClassName('tableys')[2]
      let ywrtable=document.getElementsByClassName('tableys')[3]
      let ywrdlrtable=document.getElementsByClassName('tableys')[4]
        xgzhtable.innerHTML=xgzhData1;
        qlrtable.innerHTML = qlrdata1;
        qlrdlrtable.innerHTML = qlrdlrdata1;
        // ywrtable.innerHTML = ywrdata1;
        ywrtable.innerHTML= YWRdatadata;
        ywrdlrtable.innerHTML = ywrdlrdata1;
          },1000)
      nextTick(() => {
        // setTimeout(() => {
        //相关证号查询
        // let xgzhtr = document.querySelectorAll(".xgzhtb")[1];
        let xgzhtr = document.querySelectorAll(".cx5")[0];
        // xgzhtr.innerHTML = '';
        let cx = document.getElementsByClassName("el-button")[0];
        cx.addEventListener("click", function () {
          proxy.bdcdyh =
            document.getElementsByClassName("el-input__inner")[0].value;
          proxy.bdczh =
            document.getElementsByClassName("el-input__inner")[1].value;
          proxy.slbh =
            document.getElementsByClassName("el-input__inner")[2].value;
          proxy.qlr =
            document.getElementsByClassName("el-input__inner")[3].value;
          proxy.zl =
            document.getElementsByClassName("el-input__inner")[4].value;
          proxy.ywr =
            document.getElementsByClassName("el-input__inner")[5].value;
          proxy.zslx =
            document.getElementsByClassName("el-input__inner")[6].value;
          // console.log(" proxy.zslx", proxy.zslx);
          const data1 = {
            xgzh:
              "SELECT * FROM (SELECT DISTINCT N'' AS XZ, N'' AS RN,A.SLBH,(select wm_concat(distinct to_char(y.qlrmc)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as qlrmc,(select wm_concat(distinct to_char(y.qlrmc)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '义务人') as yermc, A.BDCZH,b.bdcdyh as bdcdyh,D.ZL,A.ZSLX FROM DJ_DJB A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN ZD_QSDC C ON B.TSTYBM = C.TSTYBM LEFT JOIN DJ_SJD D ON A.SLBH = D.SLBH left join dj_qlrgl e on a.slbh = e.slbh left join dj_qlr f on e.qlrid = f.qlrid where (A.ZSLX = '土地不动产证' OR A.ZSLX = '土地证' OR A.ZSLX = '大土地证') AND A.DJRQ IS NOT NULL AND A.BDCZH IS NOT NULL AND (A.LIFECYCLE IS NULL OR A.LIFECYCLE = 0) AND (B.LIFECYCLE IS NULL OR B.LIFECYCLE = 0) AND (C.LIFECYCLE IS NULL OR C.LIFECYCLE = 0 OR C.LIFECYCLE = -1) AND A.ZSXLH IS NOT NULL AND C.TSTYBM IS NOT NULL AND A.SLBH LIKE '%" +
              proxy.slbh +
              "%' AND B.BDCDYH LIKE '%" +
              proxy.bdcdyh +
              "%' AND D.ZL LIKE '%" +
              proxy.zl +
              "%' AND A.BDCZH LIKE '%" +
              proxy.bdczh +
              "%' AND EXISTS (SELECT A.SLBH FROM DJ_QLR E INNER JOIN DJ_QLRGL F ON E.QLRID = F.QLRID WHERE A.SLBH = F.SLBH AND E.QLRMC LIKE '%" +
              proxy.qlr +
              "%' AND (F.QLRLX = '权利人' OR F.QLRLX = '抵押权人' OR F.QLRLX IS NULL)) AND EXISTS (SELECT A.SLBH FROM DJ_QLR E INNER JOIN DJ_QLRGL F ON E.QLRID = F.QLRID WHERE A.SLBH = F.SLBH AND E.QLRMC LIKE '%" +
              proxy.qlr +
              "%' AND (F.QLRLX = '义务人' OR F.QLRLX = '抵押人')))ORDER BY ZL, BDCZH, SLBH",
          };
          let config = {
            headers: { "Content-Type": "application/json" },
          };
          axios.post("/test/sqls", data1, config).then((res) => {
            // console.log("res", res);
            const xgzhdata = res.data.data.xgzh;
            // const xgzhdata1 = xgzhdata.slice(0, 8);
            let xgzh1 = "";
            for (var i = 0; i < xgzhdata.length; i++) {
              let j = i + 1;
              let mm =
                "<tr class='bbb'>" +
                "<td style='width:5%'><input class='aaa' type='checkbox' style='background:#fff;'></td>" +
                "<td style='width:8%'>" +
                j +
                "</td>" +
                "<td style='width:15%'>" +
                xgzhdata[i].SLBH +
                "</td>" +
                "<td style='width:10%'>" +
                xgzhdata[i].QLRMC +
                "</td>" +
                "<td style='width:20%'>" +
                xgzhdata[i].YERMC +
                "</td>" +
                "<td style='width:20%'>" +
                xgzhdata[i].BDCZH +
                "</td>" +
                "<td>" +
                xgzhdata[i].ZL +
                "</td>" +
                // "<td class='table-cell' colspan='1' rowspan='1' display= 'none'>" +
                // xgzhdata1[i].ZSLX +
                // "</td>" +
                "</tr>";
              xgzh1 += mm;
            }
            xgzh1 = "<table class='table1'>" + xgzh1 + "</table>";
            xgzhtr.innerHTML = xgzh1;
            //点击选择框
            document.addEventListener("click", function (e) {
              let trxgzh = document.getElementsByClassName("bbb");
              let checkbxgzh = document.getElementsByClassName("aaa");
              let array = [];
              for (let i = 0; i < trxgzh.length; i++) {
                if (checkbxgzh[i].checked) {
                  let row = trxgzh[i];
                  let arr = [];
                  for (let j = 0; j < 7; j++) {
                    let id = row.cells[j].innerHTML;
                    arr.push(id);
                  }
                  array.push(arr);
                }
              }

              //将选择内容赋予选中框
              let qlrtablelist = document.getElementsByClassName("input")[0];
              let qlrlist = "";
              for (let i = 0; i < array.length; i++) {
                let ee =
                  "<tr style='width: 100%;'>" +
                  "<td class='table-cell' colspan='1' rowspan='1' flex= '1' style='background: #fff;' width='70px'>" +
                  "【" +
                  array[i][2] +
                  "; " +
                  array[i][5] +
                  "; " +
                  array[i][6] +
                  ";】" +
                  "</td>" +
                  "</tr>";
                qlrlist += ee;
              }
              setTimeout(() => {
                qlrtablelist.innerHTML = qlrlist;
              }, 100);
              //相关证号删除
              let xgzhdelete = document.getElementsByClassName("el-button")[2];
              xgzhdelete.onclick = () => {
                qlrtablelist.innerHTML = "";
              };
              //相关证号确认
              var xgzhqr = document.getElementsByClassName("xgzhqr")[0];
              let xgzh2 = "";
              let xgzh3 = "";
              xgzhqr.addEventListener("click", function () {
                //相关证号
                XGZHXX1=array;
                // console.log("XGZHXX1",XGZHXX1)
                for (var i = 0; i < array.length; i++) {
                  let j = i + 1;
                  let mm =
                    "<tr class='ddd'>" +
                    "<td style='width:5%'><input class='fff' type='checkbox' style='background: #fff!important;'></td>" +
                    "<td style='width:30%'>" +
                    array[i][5] +
                    "</td>" +
                    "<td style='width:10%'>" +
                    proxy.zslx +
                    "</td>" +
                    "<td style='width:20%'>" +
                    array[i][3] +
                    "</td>" +
                    "<td style='width:20%'>" +
                    array[i][6] +
                    "</td>" +
                    "</tr>";
                  xgzh2 += mm;
                }
                xgzh2 = "<table class='table1'>" + xgzh2 + "</table>";
                let tableys0 = document.getElementsByClassName("tableys")[0];
                tableys0.innerHTML = xgzh2;
                proxy.newFormDataxx = formData;
                proxy.newFormDataxx.TZRZL = array[0][6];
                vFormRef.value.setFormData(proxy.newFormDataxx);
                //义务人
                let xgzhspl = "";
                // watch(array,(newValue,oldValue)=>{
                // console.log("newValue",newValue)
                setTimeout(() => {
                  // console.log("array", array);
                  for (let i = 0; i < array.length; i++) {
                    xgzhspl = {
                      ywrxx:
                        "SELECT A.QLRMC,A.ZJLB,A.ZJHM,A.DH,B.QLRID,B.GYFE FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.SLBH IN ('" +
                        array[i][2] +
                        "') AND (B.QLRLX IS NULL OR B.QLRLX = '权利人')",
                    };
                  }
                  let config = {
                    headers: { "Content-Type": "application/json" },
                  };
                  axios.post("/test/sqls", xgzhspl, config).then((res) => {
                    xgzhspl1.push(res.data.data.ywrxx);
                  });
                }, 2000);
                setTimeout(() => {
                  YWRXX1=xgzhspl1
                  for (let i = 0; i < xgzhspl1.length; i++) {
                    // console.log("444444", xgzhspl1[i][0].QLRMC)
                // console.log("xgzhspl1", xgzhspl1[i][0].QLRID);
                 if ( xgzhspl1[i][0].DH == null||xgzhspl1[i][0].GYFE == null) {
                    xgzhspl1[i][0].DH = "";
                    xgzhspl1[i][0].GYFE=""
                  } else {
                     xgzhspl1[i][0].DH = xgzhspl1[i][0].DH;
                     xgzhspl1[i][0].GYFE=xgzhspl1[i][0].GYFE;
                  }
                    let j = i + 1;
                    let mm =
                      "<tr class='ywrtr'>" +
                      "<td style='width:5%'><input class='ywrtd' type='checkbox' style='background: #fff!important;'></td>" +
                      "<td style='width:8%'>" +
                      j +
                      "</td>" +
                      "<td style='width:15%'>" +
                      xgzhspl1[i][0].QLRMC +
                      "</td>" +
                      "<td style='width:10%'>" +
                      xgzhspl1[i][0].ZJLB +
                      "</td>" +
                      "<td style='width:20%'>" +
                      xgzhspl1[i][0].ZJHM +
                      "</td>" +
                      "<td style='width:20%'>" +
                      xgzhspl1[i][0].GYFE +
                      "</td>" +
                      "<td>" +
                      xgzhspl1[i][0].DH +
                      "</td>" +
                      "<td style='display: none'>" +
                      xgzhspl1[i][0].QLRID +
                      "</td>" +
                      "</tr>";
                    xgzh3 += mm;
                  }
                  xgzh3 = "<table class='table1'>" + xgzh3 + "</table>";
                  YWRdatadata=xgzh3;
                  // console.log("xgzh3",xgzh3)
                  let tableys1 = document.getElementsByClassName("tableys")[3];
                  tableys1.innerHTML = xgzh3;
                }, 3000);
              });
            });
          });
        });
        // }, 3000);
        //第一个选择弹窗中查询
        nextTick(() => {
          setTimeout(() => {
            // console.log(
            //   "document.getElementsByClassName",
            //   document.getElementsByClassName("el-input__inner")
            // );
            const chaxun = document.getElementsByClassName("el-button")[29];
            chaxun.addEventListener("click", function () {
              proxy.qlrmc =
                document.getElementsByClassName("el-input__inner")[53].value;
              proxy.qlrxz =
                document.getElementsByClassName("el-input__inner")[54].value;
              proxy.zjzl =
                document.getElementsByClassName("el-input__inner")[55].value;
              proxy.zjbm =
                document.getElementsByClassName("el-input__inner")[56].value;
              const data3 = {
                qlrxx:
                  "SELECT DISTINCT N'' AS XZ,ROWNUM AS RN,QLRMC,bdcdj.f_ParseDic('证件类型',ZJLB)as ZJLB,ZJHM,DH, QLRID,FRDBXM,FRDBZJH FROM DJ_QLR WHERE ZJHM IS NOT NULL AND QLRMC LIKE '%" +
                  proxy.qlrmc +
                  "%'AND ZJHM LIKE'%" +
                  proxy.zjbm +
                  "%'",
              };
              let config = {
                headers: { "Content-Type": "application/json" },
              };
              axios.post("/test/sqls", data3, config).then((res) => {
                const qlrxx = res.data.data.qlrxx;
                // const qlrxx1 = qlrxx.slice(0, 10);
                // console.log("qlrxx", qlrxx);
                // let mm =
                //   "<tr style='width: 100%'>" +
                //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'><input class='el-checkbox__original el-checkbox__inner' type='checkbox'><span style='margin-left: 10px;'>全选</span></td>" +
                //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'>序号</td>" +
                //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='170px'>名称</td>" +
                //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>证件种类</td>" +
                //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>证件号码</td>" +
                //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='350px'>电话</td>" +
                //   "</tr>";
                let xgzh3 = "";
                for (var i = 0; i < qlrxx.length; i++) {
                  // console.log("qlrxx[i].QLRID",qlrxx[i].QLRID)
                  let j = i + 1;
                  // console.log(qlrxx[i].DH);
                  if (qlrxx[i].DH == null) {
                    qlrxx[i].DH = "";
                  } else {
                    qlrxx[i].DH = qlrxx[i].DH;
                  }
                  // let lclb=qlrxx.BDCDJ.F_PARSEDIC("证件类型", ZJLB);
                  // console.log("lclb",lclb)
                  let mm =
                    "<tr style='width: 100%' class='tkcheck'>" +
                    "<td style='width: 8%'><input class='tkcheck1' type='checkbox'></td>" +
                    "<td style='width: 8%'>" +
                    j +
                    "</td>" +
                    "<td style='width: 15%'>" +
                    qlrxx[i].QLRMC +
                    "</td>" +
                    "<td style='width: 25%'>" +
                    qlrxx[i].ZJLB +
                    "</td>" +
                    "<td style='width: 25%'>" +
                    qlrxx[i].ZJHM +
                    "</td>" +
                    "<td>" +
                    qlrxx[i].DH +
                    "</td>" +
                    "<td style='display: none'>" +
                    qlrxx[i].QLRID +
                    "</td>" +
                    //  "<td style='display: none'>" +
                    // qlrxx[i].gyfe +
                    // "</td>" +
                    "</tr>";
                  xgzh3 += mm;
                }
                xgzh3 = "<table class='table1'>" + xgzh3 + "</table>";
                let xgzhtr2 = document.querySelectorAll(".cx1")[0];
                // const qlrxx2 = document.querySelectorAll(".qlrxx")[1];
                xgzhtr2.innerHTML = xgzh3;
                document.addEventListener("click", function (e) {
                  let tkcheck1 = document.getElementsByClassName("tkcheck");
                  let tkcheck = document.getElementsByClassName("tkcheck1");
                  let array = [];
                  for (let i = 0; i < tkcheck1.length; i++) {
                    if (tkcheck[i].checked) {
                      let row = tkcheck1[i];
                      let arr = [];
                      for (let j = 0; j < 7; j++) {
                        let id = row.cells[j].innerHTML;
                        arr.push(id);
                      }
                      array.push(arr);
                    }
                  }

                  // document.addEventListener("click", function (e) {
                  //   let tkcheck = document.getElementsByClassName("tkcheck");
                  //   for (let i = 0; i < tkcheck.length; i++) {
                  //     let mm = tkcheck[i];
                  //     if (e.target == mm) {
                  //       var selectcontent2 =
                  //         document.getElementsByClassName("tkcheck1")[i]
                  //           .innerText;
                  //     }
                  //   }
                  // });

                  // console.log("selectcontent2", selectcontent2);
                  //  let xuanze1 = document.getElementsByClassName("qlrbutton");
                  //第一个填写
                  // xuanze1[0].addEventListener("click", function () {
                  let qrxx = document.getElementsByClassName("el-button")[32];
                  qrxx.addEventListener("click", function () {
                    let qlrlist1 = "";
                    let tableys1 =
                      document.getElementsByClassName("tableys")[1];
                    // console.log("ahahahaha", array);
                    QLRXX1=array;
                    console.log("权利人id",QLRXX1)
                    for (let i = 0; i < array.length; i++) {
                      let j = i + 1;
                      let mm =
                        "<tr style='width: 100%' class='tkcheck1'>" +
                        "<td style='width:8%'><input class='tkcheck' type='checkbox'></td>" +
                        "<td style='width:8%'>" +
                        j +
                        "</td>" +
                        "<td style='width:10%'>" +
                        array[i][2] +
                        "</td>" +
                        "<td style='width:15%'>" +
                        array[i][3] +
                        "</td>" +
                        "<td style='width:25%'>" +
                        array[i][4] +
                        "</td>" +
                        "<td style='width:15%'>" +
                        "" +
                        "</td>" +
                        "<td >" +
                        array[i][5] +
                        "</td>" +
                        "<td style='display: none'>" +
                        array[i][6] +
                        "</td>" +
                        "</tr>";
                      qlrlist1 += mm;
                    }
                    //  setTimeout(() => {
                    qlrlist1 =
                      '<table style="width:100%">' + qlrlist1 + "</table>";
                    tableys1.innerHTML = qlrlist1;
                    // }, 100)
                    // proxy.arr = selectcontent2.split(/\s+/);
                    proxy.newFormDataxx = formData;
                    // proxy.newFormDataxx.XH = proxy.arr[1];
                    // proxy.newFormDataxx.MC = proxy.arr[2];
                    // proxy.newFormDataxx.ZJZL = proxy.arr[3];
                    // proxy.newFormDataxx.ZJHM = proxy.arr[4];
                    // proxy.newFormDataxx.DH = proxy.arr[5];

                    // proxy.newFormDataxx.DLRXH = proxy.arr[1];
                    // proxy.newFormDataxx.DLRMC = proxy.arr[2];
                    // proxy.newFormDataxx.DLRZJZL = proxy.arr[3];
                    // proxy.newFormDataxx.DLRZJHM = proxy.arr[4];
                    // proxy.newFormDataxx.DLRDH = proxy.arr[5];

                    // proxy.newFormDataxx.YWRXH = proxy.arr[1];
                    // proxy.newFormDataxx.YWRMC = proxy.arr[2];
                    // proxy.newFormDataxx.YWRZJZL = proxy.arr[3];
                    // proxy.newFormDataxx.YWRZJHM = proxy.arr[4];
                    // proxy.newFormDataxx.YWRDH = proxy.arr[5];

                    // proxy.newFormDataxx.YWRDLRXH = proxy.arr[1];
                    // proxy.newFormDataxx.YWRDLRMC = proxy.arr[2];
                    // proxy.newFormDataxx.YWRDLRZJZL = proxy.arr[3];
                    // proxy.newFormDataxx.YWRDLRZJHM = proxy.arr[4];
                    // proxy.newFormDataxx.YWRDLRDH = proxy.arr[5];
                    proxy.newFormDataxx.TZRXM = array[0][2];
                    // console.log(proxy.arr);
                    // console.log(proxy.newFormDataxx);
                    vFormRef.value.setFormData(proxy.newFormDataxx);
                    // });
                  });
                });
              });
            });
          });
        });
        //第二个选择弹窗中查询
        nextTick(() => {
          setTimeout(() => {
            const chaxun = document.getElementsByClassName("el-button")[35];
            chaxun.addEventListener(
              "click",
              function () {
                proxy.qlrmc =
                  document.getElementsByClassName("el-input__inner")[57].value;
                proxy.qlrxz =
                  document.getElementsByClassName("el-input__inner")[58].value;
                proxy.zjzl =
                  document.getElementsByClassName("el-input__inner")[59].value;
                proxy.zjbm =
                  document.getElementsByClassName("el-input__inner")[60].value;
                const data3 = {
                  qlrxx:
                    "SELECT DISTINCT N'' AS XZ,ROWNUM AS RN,QLRMC,bdcdj.f_ParseDic('证件类型',ZJLB)as ZJLB,ZJHM,DH, QLRID,FRDBXM,FRDBZJH FROM DJ_QLR WHERE ZJHM IS NOT NULL AND QLRMC LIKE '%" +
                    proxy.qlrmc +
                    "%'AND ZJHM LIKE'%" +
                    proxy.zjbm +
                    "%'",
                };
                let config = {
                  headers: { "Content-Type": "application/json" },
                };
                axios.post("/test/sqls", data3, config).then((res) => {
                  console.log("权利人代理人id", res.data.data);
                  let qlrxx = res.data.data.qlrxx;
                  let xgzh4 = "";
                  // let mm =
                  //   "<tr style='width: 100%'>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'><input class='el-checkbox__original el-checkbox__inner' type='checkbox'><span style='margin-left: 10px;'>全选</span></td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'>序号</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='170px'>名称</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>证件种类</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>证件号码</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='350px'>电话</td>" +
                  //   "</tr>";
                  for (var i = 0; i < qlrxx.length; i++) {
                    if (qlrxx[i].DH == null) {
                      qlrxx[i].DH = "";
                    } else {
                      qlrxx[i].DH = qlrxx[i].DH;
                    }
                    let j = i + 1;
                    let mm =
                      "<tr style='width: 100%' class='tkcheck2'>" +
                      "<td style='width: 8%'><input class='tkcheck3 el-checkbox__inner' type='checkbox'></td>" +
                      "<td  style='width: 8%'>" +
                      j +
                      "</td>" +
                      "<td style='width: 15%'>" +
                      qlrxx[i].QLRMC +
                      "</td>" +
                      "<td style='width: 25%'>" +
                      qlrxx[i].ZJLB +
                      "</td>" +
                      "<td style='width: 25%'>" +
                      qlrxx[i].ZJHM +
                      "</td>" +
                      "<td >" +
                      qlrxx[i].DH +
                      "</td>" +
                    "<td style='display: none'>" +
                    qlrxx[i].QLRID +
                    "</td>" +
                      "</tr>";
                    xgzh4 += mm;
                  }
                  xgzh4 = "<table class='table1'>" + xgzh4 + "</table>";
                  let xgzhtr3 = document.querySelectorAll(".cx2")[0];
                  // const qlrxx2 = document.querySelectorAll(".qlrxx")[3];
                  xgzhtr3.innerHTML = xgzh4;
                  document.addEventListener("click", function (e) {
                    let tkcheck1 = document.getElementsByClassName("tkcheck2");
                    let tkcheck = document.getElementsByClassName("tkcheck3");
                    let array = [];
                    for (let i = 0; i < tkcheck1.length; i++) {
                      if (tkcheck[i].checked) {
                        let row = tkcheck1[i];
                        let arr = [];
                        for (let j = 0; j < 7; j++) {
                          let id = row.cells[j].innerHTML;
                          arr.push(id);
                        }
                        array.push(arr);
                      }
                    }
                    //第一个填写
                    const qrxx =
                      document.getElementsByClassName("el-button")[38];
                    qrxx.addEventListener("click", function () {
                      let qlrlist1 = "";
                      let tableys2 =
                        document.getElementsByClassName("tableys")[2];
                        QLRDLRXX1=array
                      console.log("权利人代理人", QLRDLRXX1);
                      for (let i = 0; i < array.length; i++) {
                        let j = i + 1;
                        let mm =
                          "<tr style='width: 100%' class='tkcheck1'>" +
                          "<td style='width:8%'><input class='tkcheck' type='checkbox'></td>" +
                          "<td style='width:8%'>" +
                          j +
                          "</td>" +
                          "<td style='width:10%'>" +
                          array[i][2] +
                          "</td>" +
                          "<td style='width:15%'>" +
                          array[i][3] +
                          "</td>" +
                          "<td style='width:25%'>" +
                          array[i][4] +
                          "</td>" +
                          "<td style='width:15%'>" +
                          "" +
                          "</td>" +
                          "<td >" +
                          array[i][5] +
                          "</td>" +
                        "<td style='display: none'>" +
                        array[i][6] +
                        "</td>" +
                          "</tr>";
                        qlrlist1 += mm;
                      }
                      qlrlist1 =
                        '<table style="width:100%">' + qlrlist1 + "</table>";
                      tableys2.innerHTML = qlrlist1;
                      // proxy.arr = selectcontent2.split(/\s+/);
                      // proxy.newFormDataxx = formData;
                      // proxy.newFormDataxx.DLRXH = proxy.arr[1];
                      // proxy.newFormDataxx.DLRMC = proxy.arr[2];
                      // proxy.newFormDataxx.DLRZJZL = proxy.arr[3];
                      // proxy.newFormDataxx.DLRZJHM = proxy.arr[4];
                      // proxy.newFormDataxx.DLRDH = proxy.arr[5];
                      // console.log(proxy.arr);
                      // console.log(proxy.newFormDataxx);
                      // vFormRef.value.setFormData(proxy.newFormDataxx);
                    });
                  });
                });
              },
              1000
            );
          });
        });
        //第三个选择弹窗中查询
        nextTick(() => {
          setTimeout(() => {
            const chaxun = document.getElementsByClassName("el-button")[41];
            chaxun.addEventListener(
              "click",
              function () {
                proxy.qlrmc =
                  document.getElementsByClassName("el-input__inner")[61].value;
                proxy.qlrxz =
                  document.getElementsByClassName("el-input__inner")[62].value;
                proxy.zjzl =
                  document.getElementsByClassName("el-input__inner")[63].value;
                proxy.zjbm =
                  document.getElementsByClassName("el-input__inner")[64].value;
                const data3 = {
                  qlrxx:
                    "SELECT DISTINCT N'' AS XZ,ROWNUM AS RN,QLRMC,bdcdj.f_ParseDic('证件类型',ZJLB)as ZJLB,ZJHM,DH, QLRID,FRDBXM,FRDBZJH FROM DJ_QLR WHERE ZJHM IS NOT NULL AND QLRMC LIKE '%" +
                    proxy.qlrmc +
                    "%'AND ZJHM LIKE'%" +
                    proxy.zjbm +
                    "%'",
                };
                let config = {
                  headers: { "Content-Type": "application/json" },
                };
                axios.post("/test/sqls", data3, config).then((res) => {
                  const qlrxx = res.data.data.qlrxx;
                  let xgzh5 = "";
                  // let mm =
                  //   "<tr style='width: 100%'>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'><input class='el-checkbox__original el-checkbox__inner' type='checkbox'><span style='margin-left: 10px;'>全选</span></td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'>序号</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='170px'>名称</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>证件种类</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>证件号码</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='350px'>电话</td>" +
                  //   "</tr>";
                  for (var i = 0; i < qlrxx.length; i++) {
                    if (qlrxx[i].DH == null) {
                      qlrxx[i].DH = "";
                    } else {
                      qlrxx[i].DH = qlrxx[i].DH;
                    }
                    let j = i + 1;
                    let mm =
                      "<tr style='width: 100%' class='tkcheck4'>" +
                      "<td style='width: 8%'><input class='tkcheck5' type='checkbox'></td>" +
                      "<td style='width: 8%'>" +
                      j +
                      "</td>" +
                      "<td style='width: 15%'>" +
                      qlrxx[i].QLRMC +
                      "</td>" +
                      "<td style='width: 25%'>" +
                      qlrxx[i].ZJLB +
                      "</td>" +
                      "<td style='width: 25%'>" +
                      qlrxx[i].ZJHM +
                      "</td>" +
                      "<td >" +
                      qlrxx[i].DH +
                      "</td>" +
                      "<td style='display: none'>" +
                    qlrxx[i].QLRID +
                    "</td>" +
                      "</tr>";
                    xgzh5 += mm;
                  }
                  xgzh5 = "<table class='table1'>" + xgzh5 + "</table>";
                  let xgzhtr4 = document.querySelectorAll(".cx3")[0];
                  // const qlrxx4 = document.querySelectorAll(".qlrxx")[5];
                  xgzhtr4.innerHTML = xgzh5;
                  document.addEventListener("click", function (e) {
                    let tkcheck1 = document.getElementsByClassName("tkcheck4");
                    let tkcheck = document.getElementsByClassName("tkcheck5");
                    let array = [];
                    for (let i = 0; i < tkcheck1.length; i++) {
                      if (tkcheck[i].checked) {
                        let row = tkcheck1[i];
                        let arr = [];
                        for (let j = 0; j < 7; j++) {
                          let id = row.cells[j].innerHTML;
                          arr.push(id);
                        }
                        array.push(arr);
                      }
                    }
                    // console.log("义务人", selectcontent2);
                    //第一个填写
                    const qrxx =
                      document.getElementsByClassName("el-button")[44];
                    qrxx.addEventListener("click", function () {
                      let qlrlist1 = "";
                      let tableys3 =
                        document.getElementsByClassName("tableys")[3];
                      // console.log("ahahahaha", array);
                      for (let i = 0; i < array.length; i++) {
                        let j = i + 1;
                        let mm =
                          "<tr style='width: 100%' class='tkcheck1'>" +
                          "<td style='width:8%'><input class='tkcheck' type='checkbox'></td>" +
                          "<td style='width:7%'>" +
                          j +
                          "</td>" +
                          "<td style='width:10%'>" +
                          array[i][2] +
                          "</td>" +
                          "<td style='width:25%'>" +
                          array[i][3] +
                          "</td>" +
                          "<td style='width:15%'>" +
                          array[i][4] +
                          "</td>" +
                          "<td>" +
                          "" +
                          "</td>" +
                          "<td >" +
                          array[i][5] +
                          "</td>" +
                        "<td style='display: none'>" +
                        array[i][6] +
                        "</td>" +
                          "</tr>";
                        qlrlist1 += mm;
                      }
                      qlrlist1 =
                        '<table style="width:100%">' + qlrlist1 + "</table>";
                      tableys3.innerHTML = qlrlist1;
                      // proxy.arr = selectcontent2.split(/\s+/);
                      // proxy.newFormDataxx = formData;
                      // proxy.newFormDataxx.YWRXH = proxy.arr[1];
                      // proxy.newFormDataxx.YWRMC = proxy.arr[2];
                      // proxy.newFormDataxx.YWRZJZL = proxy.arr[3];
                      // proxy.newFormDataxx.YWRZJHM = proxy.arr[4];
                      // proxy.newFormDataxx.YWRDH = proxy.arr[5];
                      // vFormRef.value.setFormData(proxy.newFormDataxx);
                    });
                  });
                });
              },
              1000
            );
          });
        });
        //第四个选择弹窗中查询
        nextTick(() => {
          setTimeout(() => {
            const chaxun = document.getElementsByClassName("el-button")[47];
            chaxun.addEventListener(
              "click",
              function () {
                proxy.qlrmc =
                  document.getElementsByClassName("el-input__inner")[65].value;
                proxy.qlrxz =
                  document.getElementsByClassName("el-input__inner")[66].value;
                proxy.zjzl =
                  document.getElementsByClassName("el-input__inner")[67].value;
                proxy.zjbm =
                  document.getElementsByClassName("el-input__inner")[68].value;
                const data3 = {
                  qlrxx:
                    "SELECT DISTINCT N'' AS XZ,ROWNUM AS RN,QLRMC,bdcdj.f_ParseDic('证件类型',ZJLB)as ZJLB,ZJHM,DH, QLRID,FRDBXM,FRDBZJH FROM DJ_QLR WHERE ZJHM IS NOT NULL AND QLRMC LIKE '%" +
                    proxy.qlrmc +
                    "%'AND ZJHM LIKE'%" +
                    proxy.zjbm +
                    "%'",
                };
                let config = {
                  headers: { "Content-Type": "application/json" },
                };
                axios.post("/test/sqls", data3, config).then((res) => {
                  const qlrxx = res.data.data.qlrxx;
                  // const qlrxx2 = document.querySelectorAll(".qlrxx")[7];
                  // let mm =
                  //   "<tr style='width: 100%'>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'><input class='el-checkbox__original el-checkbox__inner' type='checkbox'><span style='margin-left: 10px;'>全选</span></td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'>序号</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='170px'>名称</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>证件种类</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>证件号码</td>" +
                  //   "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='350px'>电话</td>" +
                  //   "</tr>";
                  let xgzh6 = "";
                  for (var i = 0; i < qlrxx.length; i++) {
                    let j = i + 1;
                    if (qlrxx[i].DH == null) {
                      qlrxx[i].DH = "";
                    } else {
                      qlrxx[i].DH = qlrxx[i].DH;
                    }
                    let mm =
                      "<tr style='width: 100%' class='tkcheck6'>" +
                      "<td style='width: 8%'><input class='tkcheck7' type='checkbox'></td>" +
                      "<td style='width: 8%'>" +
                      j +
                      "</td>" +
                      "<td style='width: 15%'>" +
                      qlrxx[i].QLRMC +
                      "</td>" +
                      "<td style='width: 25%'>" +
                      qlrxx[i].ZJLB +
                      "</td>" +
                      "<td style='width: 25%'>" +
                      qlrxx[i].ZJHM +
                      "</td>" +
                      "<td >" +
                      qlrxx[i].DH +
                      "</td>" +
                       "<td style='display: none'>" +
                    qlrxx[i].QLRID +
                    "</td>" +
                      "</tr>";
                    xgzh6 += mm;
                  }
                  xgzh6 = "<table class='table1'>" + xgzh6 + "</table>";
                  let xgzhtr5 = document.querySelectorAll(".cx4")[0];
                  xgzhtr5.innerHTML = xgzh6;
                  document.addEventListener("click", function (e) {
                    let tkcheck1 = document.getElementsByClassName("tkcheck6");
                    let tkcheck = document.getElementsByClassName("tkcheck7");
                    let array = [];
                    for (let i = 0; i < tkcheck1.length; i++) {
                      if (tkcheck[i].checked) {
                        let row = tkcheck1[i];
                        let arr = [];
                        for (let j = 0; j < 7; j++) {
                          let id = row.cells[j].innerHTML;
                          arr.push(id);
                        }
                        array.push(arr);
                      }
                    }
                    // console.log("义务人代理人", selectcontent2);
                    //第一个填写
                    const qrxx =
                      document.getElementsByClassName("el-button")[50];
                    qrxx.addEventListener("click", function () {
                      let qlrlist1 = "";
                      let tableys4 =
                        document.getElementsByClassName("tableys")[4];
                        YWRDLRXX1=array
                  console.log("义务人代理人id", YWRDLRXX1);

                      // console.log("ahahahaha", array);
                      for (let i = 0; i < array.length; i++) {
                        let j = i + 1;
                        let mm =
                          "<tr style='width: 100%' class='tkcheck1'>" +
                          "<td style='width:8%'><input class='tkcheck' type='checkbox'></td>" +
                          "<td style='width:7%'>" +
                          j +
                          "</td>" +
                          "<td style='width:10%'>" +
                          array[i][2] +
                          "</td>" +
                          "<td style='width:25%'>" +
                          array[i][3] +
                          "</td>" +
                          "<td style='width:15%'>" +
                          array[i][4] +
                          "</td>" +
                          "<td>" +
                          "" +
                          "</td>" +
                          "<td >" +
                          array[i][5] +
                          "</td>" +
                           "<td style='display: none'>" +
                        array[i][6] +
                        "</td>" +
                          "</tr>";
                        qlrlist1 += mm;
                      }
                      qlrlist1 =
                        '<table style="width:100%">' + qlrlist1 + "</table>";
                      tableys4.innerHTML = qlrlist1;
                      // proxy.arr = selectcontent2.split(/\s+/);
                      // proxy.newFormDataxx = formData;
                      // proxy.newFormDataxx.YWRDLRXH = proxy.arr[1];
                      // proxy.newFormDataxx.YWRDLRMC = proxy.arr[2];
                      // proxy.newFormDataxx.YWRDLRZJZL = proxy.arr[3];
                      // proxy.newFormDataxx.YWRDLRZJHM = proxy.arr[4];
                      // proxy.newFormDataxx.YWRDLRDH = proxy.arr[5];
                      // // proxy.newFormDataxx.TZRXM = proxy.arr[2];
                      // console.log(proxy.arr);
                      // console.log("义务人代理人", proxy.newFormDataxx);
                      // vFormRef.value.setFormData(proxy.newFormDataxx);
                    });
                  });
                });
              },
              1000
            );
          });
        });
      });
    });
};
//重新渲染页面
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
      console.log("proxy.ID",)
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
      " /flow/ZYDJ/audit?variate=yes&taskId=" +
        taskId +
        "&taskName=" +
        taskName.slice(-2) +
        "&users=slusers&user=" +
        proxy.ID +
        "&name=转移受理.json"
    )
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        store.dispatch("gblc", "sl");
        ElMessage({
          message: "已通过",
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
//数据保存到数据库中
const conserve = () => {
  //放到djsjd数据库
  let slbh = $router.currentRoute._rawValue.query.slbh;
  let djdl = document.getElementsByClassName("el-input__inner")[8].value;
  let djxl = document.getElementsByClassName("el-input__inner")[9].value;
  let lclx = "";
  let lcmc = "";
  let zl = document.getElementsByClassName("el-input__inner")[26];
  let sjr = "";
  let sjsj = document.getElementsByClassName("el-input__inner")[11].value;
  let cnsj = document.getElementsByClassName("el-input__inner")[12].value;
  let qxdm = document.getElementsByClassName("el-input__inner")[19].value;
  let tzrxm = document.getElementsByClassName("el-input__inner")[21].value;
  // let tzrxm = "";
  let tzfs = document.getElementsByClassName("el-input__inner")[22].value;
  let tzrdh = document.getElementsByClassName("el-input__inner")[24].value;
  let tzryddh = document.getElementsByClassName("el-input__inner")[23].value;
  let tzrdzyj = document.getElementsByClassName("el-input__inner")[25].value;
  let cxmm = document.getElementsByClassName("el-input__inner")[20].value;
  let zrks = document.getElementsByClassName("el-input__inner")[16].value;
  let yxj = document.getElementsByClassName("el-input__inner")[18].value;
  let sjbz = "";
  // let prjid = "";
  let qxkz = "";
  let cgzt = "";
  let lclb = document.getElementsByClassName("el-input__inner")[13].value;
  //放到djdjb数据库
  // let slbh="";
  let djlx = "";
  let djyy = document.getElementsByClassName("el-input__inner")[10].value;
  let sqfbcz = "";
  let sqrq = "";
  // let xgzh = proxy.newFormData2.XGZH;
  //djxgdjgl数据库
  // let bgbm = $router.currentRoute._rawValue.query.bgbm;
  let zslbh = "";
  // let fslbh = proxy.arr1[2];
  let bgrq = "";
  let bglx = "";
  let xgzlx = "";
  //wfmprocinst数据库
  // let prjid = "";
  let querypwd = "";
  let procid = "";
  let procname = "";
  let prjname = "";
  let prjtype = "模板创建";
  let acceptby = proxy.ID;
  let accepttype = "";
  let priority = "";
  let prjlimit = "";
  let limittime = "";
  let exepolicy = "";
  let regionpolicy = "";
  let popedom = "";
  let proposer = "";
  let prjstate = "";
  let initaddr = "";
  //wfmactinst数据库
  let wrkid = $router.currentRoute._rawValue.query.wrkid;
  let prjid = "";
  let mdltype = "";
  let mdlid = "";
  let stepname = "流程名称";
  let submitby = "";
  let submittime = "";
  // let acceptby = "";
  let accepttime = "";
  let savetime = "";
  let submittype = "";
  let completetime = "";
  let stepstate = "";
  let stepnum = "";
  let steplimit = "";
  let biztype = "";
  let steptype = "";
  //wfmexecutor数据量
  let exeid = $router.currentRoute._rawValue.query.exeid;
  let exetype = "职员";
  let executor = "userid";
  let parenttype = "父节点类型";
  let parentnode = "";
  let parentstate = "";
  let how2exe = "";
  let grantway = "";
  let sortnum = "";
  //djqlrgl数据库
  let qlrglbm = proxy.qlrglbm;
  let qlrdlrglbm = proxy.qlrdlrglbm;
  let ywrglbm = proxy.ywrglbm;
  let gyfs = document.getElementsByClassName("el-input__inner")[14].value;
  let sxh = "";
  let qlrlx = "";
  let dh = "";
  let czfs = "";
  let gyfe = "";
  let zjlb = "";
  //djqlr数据库
  //djqlr权利人
  let qlrid = proxy.qlrid;
  // let qlrmc = proxy.newFormDataxx.MC;
  // let qlrzjlb = proxy.newFormDataxx.ZJZL;
  // let qlrzjhm = proxy.newFormDataxx.ZJHM;
  let qlrgj = "";
  let qlrxb = "";
  let qlrxz = "";
  let qlrgx = "";
  //djqlrdlr权利人代理人
  let qlrdlrid = proxy.qlrdlrid;
  // let qlrdlrmc = proxy.newFormDataxx.DLRMC;
  // let qlrdlrzjlb = proxy.newFormDataxx.DLRZJZL;
  // let qlrdlrzjhm = proxy.newFormDataxx.DLRZJHM;
  let qlrdlrgj = "";
  let qlrdlrxb = "";
  let qlrdlrxz = "";
  let qlrdlrgx = "";
  //djywr义务人
  let ywrid = proxy.ywrid;
  // let ywrmc = proxy.newFormData2.QLRMC;
  let ywrzjlb = "";
  // let ywrzjhm = proxy.newFormData2.ZJHM;
  let ywrgj = "";
  let ywrxb = "";
  let ywrxz = "";
  let ywrgx = "";
  //djywrdlr义务人代理人
  let ywrdlrid = proxy.ywrdlrid;
  // let ywrdlrmc = proxy.newFormDataxx.YWRDLRMC;
  // let ywrdlrzjlb = proxy.newFormDataxx.YWRDLRZJZL;
  // let ywrdlrzjhm = proxy.newFormDataxx.YWRDLRZJHM;
  let ywrdlrgj = "";
  let ywrdlrxb = "";
  let ywrdlrxz = "";
  let ywrdlrgx = "";
  //相关证号
let XGZH='';
for(let i=0;i<XGZHXX1.length;i++){
  // axios.post("/test/qtbm").then((res) => {
  //  }).then((res) => {
  //    let bgbm = res.data.bgbm;
 XGZH+=XGZHXX1[i][5]
  let slbh = $router.currentRoute._rawValue.query.slbh;
  let gyfs = document.getElementsByClassName("el-input__inner")[14].value;

  var data2 = {
    djxgdjgl:
      "insert into dj_xgdjgl(bgbm,zslbh,fslbh,bgrq,bglx,xgzh,xgzlx)values('GL-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'||dbms_random.string('x',10),'" +
      slbh +
      "','" +
      XGZHXX1[i][2] +
      "','" +
      bgrq +
      "','" +
      bglx +
      "','" +
      XGZHXX1[i][5] +
      "','" +
      xgzlx +
      "')",    
      }
  axios.post("/test/sqls", data2).then((res) => {
    
  });
  //  })
 
}
//登记簿、收件单
let datasj = {
    djsjd:
      "insert into dj_sjd (slbh,djdl,djxl,lclx,lcmc,zl,sjr,sjsj,cnsj,qxdm,tzrxm,tzfs,tzrdh,tzryddh,tzrdzyj,cxmm,zrks,yxj,sjbz,prjid,qxkz,cgzt,lclb)values('" +
      slbh +
      "','" +
      djdl +
      "','" +
      djxl +
      "','" +
      lclx +
      "','" +
      lcmc +
      "','" +
      zl +
      "','" +
      sjr +
      "',to_date('" +
      sjsj +
      "','yyyy-MM-dd hh24:mi:ss'),to_date('" +
      cnsj +
      "','yyyy-MM-dd hh24:mi:ss'),'" +
      qxdm +
      "','" +
      tzrxm +
      "','" +
      tzfs +
      "','" +
      tzrdh +
      "','" +
      tzryddh +
      "','" +
      tzrdzyj +
      "','" +
      cxmm +
      "','" +
      zrks +
      "','" +
      yxj +
      "','" +
      sjbz +
      "','" +
      prjid +
      "','" +
      qxkz +
      "','" +
      cgzt +
      "','" +
      lclb +
      "')",
       djdjb:
      "insert into dj_djb(slbh,djlx,djyy,sqfbcz,sqrq,gyfs,xgzh)values('" +
      slbh +
      "','" +
      djlx +
      "','" +
      djyy +
      "','" +
      sqfbcz +
      "','" +
      sqrq +
      "','" +
      gyfs +
      "','" +
      XGZHXX1[0][5] +
      "')",
    wfmprocinst:
      "insert into wfm_procinst(prjid,querypwd,procid,procname,prjname,prjtype,acceptby,accepttime,priority,prjlimit,limittime,exepolicy,regionpolicy,popedom,proposer,prjstate,initaddr)values('" +
      slbh +
      "','" +
      querypwd +
      "','" +
      procid +
      "','" +
      procname +
      "','" +
      prjname +
      "','" +
      prjtype +
      "','" +
      acceptby +
      "',to_date(to_char(sysdate,'yyyy/MM/dd hh24:mi:ss'),'yyyy/MM/dd hh24:mi:ss'),'" +
      priority +
      "','" +
      prjlimit +
      "','" +
      limittime +
      "','" +
      exepolicy +
      "','" +
      regionpolicy +
      "','" +
      popedom +
      "','" +
      proposer +
      "','" +
      prjstate +
      "','" +
      initaddr +
      "')",
    wfmactinst:
      "insert into wfm_actinst(wrkid,prjid,mdltype,mdlid,stepname,submitby,submittime,acceptby,accepttime,savetime,submittype,completetime,stepstate,steptype,stepnum,steplimit,biztype)values('" +
      wrkid +
      "','" +
      slbh +
      "','" +
      mdltype +
      "','" +
      mdlid +
      "','" +
      stepname +
      "','" +
      submitby +
      "',to_date(to_char(sysdate,'yyyy/MM/dd hh24:mi:ss'),'yyyy/MM/dd hh24:mi:ss'),'" +
      acceptby +
      "','" +
      accepttime +
      "','" +
      savetime +
      "','" +
      submittype +
      "','" +
      completetime +
      "','" +
      stepstate +
      "','" +
      stepnum +
      "','" +
      steplimit +
      "','" +
      biztype +
      "','" +
      steptype +
      "')",
    wfmexecutor:
      "insert into wfm_executor(exeid,exetype,executor,parenttype,parentnode,parentstate,how2exe,grantway,sortnum)values('" +
      exeid +
      "','" +
      exetype +
      "','" +
      executor +
      "','" +
      parenttype +
      "','" +
      wrkid +
      "','" +
      parentstate +
      "','" +
      how2exe +
      "','" +
      grantway +
      "','" +
      sortnum +
      "')",
  };
  let config = {
    headers: { "Content-Type": "application/json" },
  };
axios.post("/test/sqls", datasj, config).then((res) => {
  console.log("res",res)
    // if (res.data.code === 0) {
    //   ElMessage({
    //     message: "保存成功",
    //     type: "success",
    //   });
    // } else {
    //   ElMessage.error("操作失败");
    // }
  });
//权利人
for(let i=0;i<QLRXX1.length;i++){
  axios.post("/test/glbm").then((res) => {
    proxy.qlrglbm = res.data.qlrglbm;
    let qlrglbm = proxy.qlrglbm;
    let slbh = $router.currentRoute._rawValue.query.slbh;
    let gyfs = document.getElementsByClassName("el-input__inner")[14].value;
    let sxh=i+1;
    let czfs = "";
    let gyfe = "";
    let data20={
      djqlrgl:
      "insert into dj_qlrgl(glbm,slbh,qlrid,gyfs,sxh,qlrlx,qlrmc,zjlb,dh,czfs,gyfe)values('" +
      qlrglbm +
      "','" +
      slbh +
      "','" +
      QLRXX1[i][6] +
      "','" +
      gyfs +
      "','" +
      sxh +
      "','权利人','" +
      QLRXX1[i][2] +
      "','1','" +
      QLRXX1[i][5] +
      "','" +
      czfs +
      "','" +
      gyfe +
      "')",
    }
 axios.post("/test/sqls", data20).then((res) => {
  });
  });
}
//权利人代理人
for(let i=0;i<QLRDLRXX1.length;i++){
  axios.post("/test/glbm").then((res) => {
   
    proxy.qlrdlrglbm = res.data.qlrdlrglbm;
    let qlrdlrglbm = proxy.qlrdlrglbm;
    let slbh = $router.currentRoute._rawValue.query.slbh;
    let gyfs = document.getElementsByClassName("el-input__inner")[14].value;
    let sxh=i+1;
     let czfs = "";
    let gyfe = "";
   let data21={
      djqlrdlgl:
      "insert into dj_qlrgl(glbm,slbh,qlrid,gyfs,sxh,qlrlx,qlrmc,zjlb,dh,czfs,gyfe)values('" +
      qlrdlrglbm +
      "','" +
      slbh +
      "','" +
      QLRDLRXX1[i][6] +
      "','" +
      gyfs +
      "','" +
      sxh +
      "','权利人代理人','" +
      QLRDLRXX1[i][2] +
      "','1','" +
       QLRDLRXX1[i][5] +
      "','" +
      czfs +
      "','" +
      gyfe +
      "')",
   }
   axios.post("/test/sqls", data21).then((res) => {
  });
  });
    
}
console.log("义务人id", YWRXX1);
  for(let i=0;i<YWRXX1.length;i++){
      axios.post("/test/glbm").then((res) => {
    proxy.ywrglbm = res.data.ywrglbm;
    let ywrglbm = proxy.ywrglbm;
    let slbh = $router.currentRoute._rawValue.query.slbh;
    let gyfs = document.getElementsByClassName("el-input__inner")[14].value;
    let sxh=i+1
    let czfs = "";
    let gyfe = "";
    let data22={
      djywrgl:
      "insert into dj_qlrgl(glbm,slbh,qlrid,gyfs,sxh,qlrlx,qlrmc,zjlb,dh,czfs,gyfe)values('" +
      ywrglbm +
      "','" +
      slbh +
      "','" +
       YWRXX1[i][6] +
      "','" +
      gyfs +
      "','" +
      sxh +
      "','义务人','" +
      YWRXX1[i][2] +
      "','1','" +
       YWRXX1[i][5] +
      "','" +
      czfs +
      "','" +
      gyfe +
      "')",
    }
    axios.post("/test/sqls", data22).then((res) => {
  });
  });
    
  }
  //义务人代理人
  if(YWRDLRXX1.length!=0){
     for(let i=0;i<YWRDLRXX1.length;i++){
      axios.post("/test/glbm").then((res) => {
       proxy.ywrdlrglbm = res.data.ywrdlrglbm;
       let ywrdlrglbm = proxy.ywrdlrglbm;
      let slbh = $router.currentRoute._rawValue.query.slbh;
      let gyfs = document.getElementsByClassName("el-input__inner")[14].value;
      let sxh=i+1;
      let czfs = "";
      let gyfe = "";
      let data23={
      djywrdlrgl:
      "insert into dj_qlrgl(glbm,slbh,qlrid,gyfs,sxh,qlrlx,qlrmc,zjlb,dh,czfs,gyfe)values('" +
      ywrdlrglbm +
      "','" +
      slbh +
      "','" +
       YWRDLRXX1[i][6] +
      "','" +
      gyfs +
      "','" +
      sxh +
      "','义务人代理人','" +
       YWRDLRXX1[i][2] +
      "','1','" +
       YWRDLRXX1[i][5] +
      "','" +
      czfs +
      "','" +
      gyfe +
      "')",}
      axios.post("/test/sqls", data23).then((res) => {
  });
  });
   
  }
  }else{
     axios.post("/test/glbm").then((res) => {
       proxy.ywrdlrglbm = res.data.ywrdlrglbm;
       let ywrdlrglbm = proxy.ywrdlrglbm;
      let slbh = $router.currentRoute._rawValue.query.slbh;
      let gyfs = document.getElementsByClassName("el-input__inner")[14].value;
      let sxh="";
      let czfs = "";
      let gyfe = "";
      let qlrid="";
      let zjlb="";
      let dh="";
      let data23={
      djywrdlrgl:
      "insert into dj_qlrgl(glbm,slbh,qlrid,gyfs,sxh,qlrlx,qlrmc,zjlb,dh,czfs,gyfe)values('" +
      ywrdlrglbm +
      "','" +
      slbh +
      "','" +
      qlrid +
      "','" +
      gyfs +
      "','" +
      sxh +
      "','义务人代理人','" +
      zjlb +
      "','1','" +
       dh +
      "','" +
      czfs +
      "','" +
      gyfe +
      "')",}
      axios.post("/test/sqls", data23).then((res) => {
  });
  });

  }

};
// const idGibm = () => {
//   axios.post("/test/glbm").then((res) => {
//     // console.log("res", res.data);
//     // proxy.qlrid = res.data.qlrid; //
//     // proxy.qlrdlrid = res.data.qlrdlrid; //
//     // proxy.ywrid = res.data.ywrid; //
//     // proxy.ywrdlrid = res.data.ywrdlrid; //
//     proxy.qlrglbm = res.data.qlrglbm;
//     proxy.qlrdlrglbm = res.data.qlrdlrglbm;
//     proxy.ywrglbm = res.data.ywrglbm;
//     proxy.ywrdlrglbm = res.data.ywrdlrglbm;
//   });
// };
onMounted(() => {
  getInputData();
  getformJson();
  show();
  fromname();
  // idGibm();
});
</script>

<style>
.formcontent {
  width: 70%;
}
.stationnone {
  position: absolute;
  top: 47% !important;
  left: 50%;
  z-index: 99;
  transform: translate(-50%, -50%);
  background: #fff;
}
.whole {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 98;
  display: none;
}
.black {
  display: block !important;
}
.table1 {
  display: block;
  height: 200px;
  overflow-y: auto;
}
.aaa {
  opacity: 1;
  outline: 0;
  /* position: absolute; */
  margin: 0;
  width: 13px;
  height: 13px;
  z-index: 1;
}

.huoqu {
  width: 1324px;
  border: 1px solid #bbb;
  height: 30px;
  margin: 10px auto;
}
.el-checkbox__inner {
  background: #fff !important;
}
/* .qlrxx {
  display: block;
  height: 200px;
  overflow: auto;
} */
</style>
