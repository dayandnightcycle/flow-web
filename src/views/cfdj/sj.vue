<template>
  <div style="display: flex">
    <div class="formcontent">
      <!-- <el-button type="primary" @click="saveFormJson">提交表单</el-button>
  -->
      <!-- <el-button type="primary" @click="submit">提交</el-button> -->
      <!-- <el-button type="primary" @click="submitForm">提交数据</el-button> -->
      <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
      </v-form-render>
      <div @click="show">
        <el-button type="primary" @click="conserve">保存</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">通过</el-button>
        <el-button type="danger" @click="refuse">拒绝</el-button>
      </div>
      <el-dialog v-model="dialogFormVisible" title="选择收件">
        <el-form :model="form" label-width="120px">
          <el-form-item label="收件">
            <el-select v-model="form.region" @change="dataslr" placeholder="选择收件人">
              <el-option v-for="(item, index) in proxy.region" :label="item" :key="index" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="下一个表单">
            <span class="bd" style="margin-left: 10px">查封初审.json</span>
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
              </el-select> -->
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
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import router from "../../router";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { nextTick } from "vue";
const { proxy } = getCurrentInstance();
const vFormRef = ref(null);
const getWidgetRef = reactive({});
const store = useStore();
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
  olddata: "",
  hnew: "",
  // newFormData: "",
  newFormData2: "",
  newFormData3: "",
  olddjdl: "",
  olddjxl: "",
  qlrxh: "",
  qlrmc: "",
  qlrzjzl: "",
  qlrzjhm: "",
  qlrgyfe: "",
  qlrdh: "",
  bn: "",
});

const formJson = reactive({});

const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
//js查询数据
var slbh = route.currentRoute._value.query.slbh;
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

//表单数据获取
const getInputData = () => {
  // document.getElementsByClassName('anniumm')[0].getElementsByTagName('span')[0].style["color"] = "red";

  proxy.newFormData2 = formData;
  axios.post("/test/sqls", data).then((res) => {
    let sj = res.data.data;
    proxy.newFormData2.SLBH = slbh;
    if (res.data.message == '操作成功') {
      console.log('sjsjsjsjsjs');
      // document.getElementsByClassName('anniumm')[0].getElementsByTagName('span')[0].style["color"] = "#fff";
      proxy.newFormData2.DJDL = sj.djsjd[0].DJDL;
      proxy.newFormData2.DJXL = sj.djsjd[0].DJXL;
      proxy.newFormData2.BDCSZQY = sj.djszqy[0].ITEMNAME;
      proxy.newFormData2.TZRXM = sj.djsjd[0].TZRXM;
      proxy.newFormData2.YDDH = sj.djsjd[0].TZRYDDH;
      proxy.newFormData2.CSRQ = sj.djsjd[0].SJSJ;
      proxy.newFormData2.FSRQ = sj.djsjd[0].SJSJ;
      proxy.newFormData2.HDRQ = sj.djsjd[0].SJSJ;
      proxy.newFormData2.CFBH = sj.djcf[0].CFBH;
      proxy.newFormData2.LWRQ = sj.djcf[0].LWRQ;
      proxy.newFormData2.CFWH = sj.djcf[0].CFWH;
      proxy.newFormData2.QSRQ = sj.djcf[0].CFQSSJ;
      proxy.newFormData2.JZRQ = sj.djcf[0].CFJSSJ;
      proxy.newFormData2.CFQX = sj.djcf[0].CFQX;
      proxy.newFormData2.CXMM = sj.djsjd[0].CXMM;
      proxy.newFormData2.JBR = sj.djcf[0].JBR;
      proxy.newFormData2.JBRQ = sj.djcf[0].JBRQ;
      proxy.newFormData2.CFWJ = sj.djcf[0].CFWJ;
      proxy.newFormData2.CFJG = sj.djcf[0].CFJG;
      proxy.newFormData2.YG = sj.djcf[0].YGR;
      proxy.newFormData2.CFDJYY = sj.djcf[0].CFYY;
      console.log('2222', proxy.newFormData2)
      vFormRef.value.setFormData(proxy.newFormData2);
      let j = 1;
      document.getElementsByClassName("cfqdxr")[1].innerHTML =
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

      if (sj.djQLR.length > 1) {
        let j = 1;
        document.getElementsByClassName("container-wrapper neir dlrxr")[0].innerHTML =
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
          "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:328px;'>&nbsp;&nbsp;</td>" +
          "</tr></table>";
      }


    }
  });
};

const getformJson = () => {

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

  proxy.newFormData2 = formData;
  // 获取sql查询到的数据
  // proxy.newFormData = res.data.data.djsjd;
  // 获取受理编号
  proxy.newFormData2.SLBH = slbh;
  proxy.newFormData2.DJDL = "查封登记";
  proxy.newFormData2.DJXL = "查封";
  proxy.newFormData2.BDCSZQY = "开发区";
  proxy.newFormData2.SJR = "技术支持(霍凯星)";
  proxy.newFormData2.SJSJ = now;
  proxy.newFormData2.SLKS = "廊坊开发区不动产登记中心";

  proxy.newFormData2.CFBH = "C(2023)00021";
  proxy.newFormData2.LWRQ = now;
  proxy.newFormData2.CFQX = 3;
  proxy.newFormData2.QSRQ = nowy;
  proxy.newFormData2.JZRQ = nowyjz;
  proxy.newFormData2.CXMM = "78615";
  proxy.newFormData2.JBR = "技术支持(霍凯星)";
  proxy.newFormData2.JBRQ = now;


  const mm = document.getElementsByClassName("el-button");
  const nn = document.getElementsByClassName("el-input__wrapper");
  // 获取表单json
  proxy.$http
    .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
    .then((res) => {

      vFormRef.value.setFormJson(res.data);

      nextTick(() => {
        setTimeout(() => {
          const xgzh3 = document.getElementsByClassName(
            "container-wrapper bbox"
          )[0];
          const xgzh2 = document.getElementsByClassName("table-container")[0];
          const xgzh1 = document.getElementsByClassName("table-layout bbox")[0];
          const ul = document.getElementsByClassName("el-button")[13];
          const tuichu = document.getElementsByClassName("el-button")[5];
          const whole = document.getElementsByClassName("whole")[0];
          tuichu.onclick = function () {
            whole.classList.remove("black");
            xgzh3.classList.remove("stationnone");
            xgzh1.classList.remove("stationnone");
          };
          ul.onclick = function () {
            xgzh3.classList.remove("staion");
            xgzh1.classList.remove("station");
            xgzh3.classList.add("stationnone");
            xgzh1.classList.add("stationnone");
            xgzh2.style.display = "block";
            whole.classList.add("black");
          };
          whole.onclick = function () {
            whole.classList.remove("black");
            xgzh3.classList.remove("stationnone");
            xgzh1.classList.remove("stationnone");
          };

          setTimeout(() => {
            const cx = document.getElementsByClassName("el-button")[0];
            cx.addEventListener("click", function () {
              proxy.bdcdyh =
                document.getElementsByClassName("el-input__inner")[0].value;
              proxy.bdcqzh =
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
              const data1 = {
                xgzh:
                  "SELECT * FROM (SELECT DISTINCT N'' AS XZ, N'' AS RN,A.SLBH,(select wm_concat(distinct to_char(y.qlrmc)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as qlrmc,(select wm_concat(distinct to_char(y.qlrmc)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '义务人') as yermc, A.BDCZH,b.bdcdyh as bdcdyh,D.ZL,A.ZSLX FROM DJ_DJB A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN FC_H_QSDC C ON B.TSTYBM = C.TSTYBM LEFT JOIN DJ_SJD D ON A.SLBH = D.SLBH WHERE (A.ZSLX = '房屋不动产证' OR A.ZSLX = '房产证') AND A.DJRQ IS NOT NULL AND A.BDCZH IS NOT NULL AND (A.LIFECYCLE IS NULL OR A.LIFECYCLE = 0) AND (B.LIFECYCLE IS NULL OR B.LIFECYCLE = 0) AND (C.LIFECYCLE IS NULL OR C.LIFECYCLE = 0 OR C.LIFECYCLE = -1) AND A.ZSXLH IS NOT NULL AND C.TSTYBM IS NOT NULL AND A.SLBH LIKE '%" +
                  proxy.slbh +
                  "%' AND B.BDCDYH LIKE '%" +
                  proxy.bdcdyh +
                  "%' AND D.ZL LIKE '%" +
                  proxy.zl +
                  "%' AND A.BDCZH LIKE '%" +
                  proxy.bdcqzh +
                  "%' AND EXISTS (SELECT A.SLBH FROM DJ_QLR E INNER JOIN DJ_QLRGL F ON E.QLRID = F.QLRID WHERE A.SLBH = F.SLBH AND E.QLRMC LIKE '%" +
                  proxy.qlr +
                  "%' AND (F.QLRLX = '权利人' OR F.QLRLX = '抵押权人' OR F.QLRLX IS NULL)) AND EXISTS (SELECT A.SLBH FROM DJ_QLR E INNER JOIN DJ_QLRGL F ON E.QLRID = F.QLRID WHERE A.SLBH = F.SLBH AND E.QLRMC LIKE '%" +
                  proxy.ywr +
                  "%' AND (F.QLRLX = '义务人' OR F.QLRLX = '抵押人')))ORDER BY ZL, BDCZH, SLBH",
              };
              let config = {
                headers: { "Content-Type": "application/json" },
              };
              axios
                .post("/test/sqls", data1, config)
                .then((res) => {
                  //获取表单空数据
                  proxy.newFormData2 = formData;
                  const xgzhdata = res.data.data.xgzh;
                  const xgzhdata1 = xgzhdata.slice(0, 10);
                  const xgzhtr = document.querySelectorAll(".xgzhcxjg")[0];
                  let mm =
                    "<table border='0' cellspacing='0' cellpadding='0' style='width: 100%;'>";
                  for (var i = 0; i < xgzhdata1.length; i++) {
                    let j = i + 1;
                    mm +=
                      "<tr style='width: 100%' class='bb mm'>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:100px;'><input class='aaa' type='checkbox'></td>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:80px;'>" +
                      j +
                      "</td>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:140px;'>" +
                      xgzhdata1[i].SLBH +
                      "</td>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:160px;'>" +
                      xgzhdata1[i].QLRMC +
                      "</td>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:160px;'>" +
                      xgzhdata1[i].YERMC +
                      "</td>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:336px;'>" +
                      xgzhdata1[i].BDCZH +
                      "</td>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:336px;'>" +
                      xgzhdata1[i].ZL +
                      "</td>" +
                      // "<td class='table-cell' colspan='1' rowspan='1' display= 'none'>" +
                      // xgzhdata1[i].ZSLX +
                      // "</td>" +
                      "</tr>";
                  }
                  mm += "</table>";
                  xgzhtr.innerHTML = mm;
                  document.addEventListener("click", function (e) {
                    let checkbxgzh = document.getElementsByClassName("aaa");
                    for (let i = 0; i < checkbxgzh.length; i++) {
                      let mm = checkbxgzh[i];
                      if (e.target == mm) {
                        var selectcontent =
                          document.getElementsByClassName("bb")[i].innerText;
                      }
                    }
                    const selectcontent1 =
                      document.getElementsByClassName("xzsj")[0];
                    proxy.arr = selectcontent.split(/\s+/);
                    let ee =
                      "<tr style='width: 100%'>" +
                      "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'>" +
                      "【" +
                      proxy.arr[2] +
                      "; " +
                      proxy.arr[5] +
                      "; " +
                      proxy.arr[6] +
                      ";】" +
                      "</td>" +
                      "</tr>";
                    selectcontent1.innerHTML = ee;
                    //获取表单空数据

                    var datazz = {
                      djCFCX:
                        "SELECT A.BDCZH, B.ZL,C.QLRMC,D.ZJHM,'1' AS CFSW,'查封' AS CFLX,A.BDCDYH,concat('查封：',B.ZL) AS CFFW,concat('查封：',B.ZL) AS FJ,'详情' AS XQ,D.ZJLB FROM DJ_DJB A LEFT JOIN DJ_SJD B ON A.SLBH = B.SLBH LEFT JOIN DJ_QLRGL C ON B.SLBH = C.SLBH LEFT JOIN DJ_QLR D ON D.QLRID=C.QLRID WHERE A.SLBH LIKE '" +
                        proxy.arr[2] +
                        "%' AND C.QLRLX='权利人'",
                    };
                    const qd = document.getElementsByClassName("el-button")[4];
                    qd.addEventListener("click", function () {
                      axios
                        .post(
                          "/test/sqls",
                          datazz,
                          config
                        )
                        .then((res) => {
                          let listn = res.data.data.djCFCX;
                          const str = document.querySelectorAll(".cfqdxr")[0];
                          proxy.bn = listn[0].ZJLB;
                          let bg =
                            "<table border='0' cellspacing='0' cellpadding='0' style='width: 100%;'>";
                          for (var i = 0; i < listn.length; i++) {
                            let j = i + 1;
                            bg +=
                              "<tr style='width: 100%'>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:100px;'><input type='checkbox'></td>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:80px;'>" +
                              j +
                              "</td>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:190px;'>" +
                              listn[i].BDCZH +
                              "</td>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:200px;'>" +
                              listn[i].ZL +
                              "</td>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:150px;'>" +
                              listn[i].QLRMC +
                              "</td>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:150px;'>" +
                              listn[i].ZJHM +
                              "</td>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:100px;'>" +
                              listn[i].CFSW +
                              "</td>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:100px;'>" +
                              listn[i].CFLX +
                              "</td>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:200px;'>" +
                              listn[i].BDCDYH +
                              "</td>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:230px;'>" +
                              listn[i].CFFW +
                              "</td>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:80px;'>" +
                              listn[i].FJ +
                              "</td>" +
                              "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:100px;'>" +
                              listn[i].XQ +
                              "</td>" +
                              // "<td class='table-cell' colspan='1' rowspan='1' display= 'none'>" +
                              // xgzhdata1[i].ZSLX +
                              // "</td>" +
                              "</tr>";
                          }
                          bg += "</table>";
                          str.innerHTML = bg;
                          whole.classList.remove("black");
                          xgzh3.classList.remove("stationnone");
                          xgzh1.classList.remove("stationnone");
                        });
                    });
                  });
                });
            });
          }, 3000);
        }, 1000);
      });
    });
};

const getYERformJson = () => {
  const mm = document.getElementsByClassName("el-button");
  const nn = document.getElementsByClassName("el-input__wrapper");
  console.log("an", mm);
  console.log("input", nn);
  // 获取表单json
  proxy.$http
    .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
    .then((res) => {
      console.log("res.data res.data", res.data);
      vFormRef.value.setFormJson(res.data);
      nextTick(() => {
        setTimeout(() => {
          const xgzh3 = document.getElementsByClassName(
            "container-wrapper bbox1"
          )[0];
          const xgzh2 = document.getElementsByClassName("table-container")[0];
          const xgzh1 =
            document.getElementsByClassName("table-layout bbox1")[0];
          const ul = document.getElementsByClassName("el-button")[18];
          const tuichu = document.getElementsByClassName("el-button")[12];
          const whole = document.getElementsByClassName("whole")[0];
          tuichu.onclick = function () {
            whole.classList.remove("black");
            xgzh3.classList.remove("stationnone");
            xgzh1.classList.remove("stationnone");
          };
          ul.onclick = function () {
            xgzh3.classList.remove("staion");
            xgzh1.classList.remove("station");
            xgzh3.classList.add("stationnone");
            xgzh1.classList.add("stationnone");
            xgzh2.style.display = "block";
            whole.classList.add("black");
          };
          whole.onclick = function () {
            whole.classList.remove("black");
            xgzh3.classList.remove("stationnone");
            xgzh1.classList.remove("stationnone");
          };

          setTimeout(() => {
            const cx = document.getElementsByClassName("el-button")[6];
            cx.addEventListener("click", function () {
              console.log("222222222222");
              proxy.qlrmc =
                document.getElementsByClassName("el-input__inner")[8].value;
              proxy.zjzl =
                document.getElementsByClassName("el-input__inner")[9].value;
              proxy.zjbh =
                document.getElementsByClassName("el-input__inner")[11].value;

              const data3 = {
                qlrxx:
                  "SELECT DISTINCT N'' AS XZ,ROWNUM AS RN,QLRMC,bdcdj.f_ParseDic('证件类型',ZJLB) as ZJLB,ZJHM,DH, QLRID,FRDBXM,FRDBZJH FROM DJ_QLR WHERE ZJHM IS NOT NULL AND QLRMC LIKE '%" +
                  proxy.qlrmc +
                  "%'AND ZJHM LIKE'%" +
                  proxy.zjbh +
                  "%'",
              };
              let config = {
                headers: { "Content-Type": "application/json" },
              };
              axios
                .post("/test/sqls", data3, config)
                .then((res) => {
                  console.log("qlr", res);
                  //获取表单空数据
                  proxy.newFormData2 = formData;
                  const xgzhdata = res.data.data.qlrxx;
                  const xgzhdata1 = xgzhdata.slice(0, 10);
                  console.log("相关证号", xgzhdata1);
                  const xgzhtr = document.querySelectorAll(".qlrcx")[0];

                  console.log("ks", xgzhtr);
                  let mm =
                    "<table border='0' cellspacing='0' cellpadding='0' style='width: 100%'>";

                  for (var i = 0; i < xgzhdata1.length; i++) {
                    let j = i + 1;
                    let dh;
                    if (xgzhdata1[i].DH == null) {
                      dh = "";
                    } else {
                      dh = xgzhdata1[i].DH;
                    }
                    mm +=
                      "<tr style='width: 100%' class='jk'>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:218px;'><input class='bbb' type='checkbox'></td>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:218px;'>" +
                      j +
                      "</td>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:218px;'>" +
                      xgzhdata1[i].QLRMC +
                      "</td>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:218px;'>" +
                      xgzhdata1[i].ZJHM +
                      "</td>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:218px;'>" +
                      xgzhdata1[i].ZJLB +
                      "</td>" +
                      "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:218px;'>" +
                      dh +
                      "</td>" +
                      // "<td class='table-cell' colspan='1' rowspan='1' display= 'none'>" +
                      // xgzhdata1[i].ZSLX +
                      // "</td>" +
                      "</tr>";
                  }
                  mm += "</table>";
                  xgzhtr.innerHTML = mm;
                  console.log("js", xgzhtr);
                  document.addEventListener("click", function (e) {
                    let checkbxgzh = document.getElementsByClassName("bbb");
                    for (let i = 0; i < checkbxgzh.length; i++) {
                      let mm = checkbxgzh[i];
                      if (e.target == mm) {
                        var selectcontent =
                          document.getElementsByClassName("jk")[i].innerText;
                      }
                    }
                    proxy.arr1 = selectcontent.split(/\s+/);

                    console.log("ll", proxy.arr1);

                    const qd = document.getElementsByClassName("el-button")[11];
                    qd.addEventListener("click", function () {
                      const dlrstr = document.querySelectorAll(".dlrxr")[0];
                      let j = 1;
                      let dlrbg =
                        "<table class='qlr' border='0' cellspacing='0' cellpadding='0' style='width: 100%;'><tr style='width: 100%'>" +
                        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:109px;'><input type='checkbox'></td>" +
                        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:109px;'>" +
                        j +
                        "</td>" +
                        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:328px;'>" +
                        proxy.arr1[2] +
                        "</td>" +
                        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:219px;'>" +
                        proxy.arr1[4] +
                        "</td>" +
                        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:219px;'>" +
                        proxy.arr1[3] +
                        "</td>" +
                        "<td class='table-cell slh' style=' border: 1.5px solid rgb(242,242,242)!important ;width:328px;'>" +
                        proxy.arr1[5] +
                        "</td>" +
                        // "<td class='table-cell' colspan='1' rowspan='1' display= 'none'>" +
                        // xgzhdata1[i].ZSLX +
                        // "</td>" +
                        "</tr></table>";
                      console.log("dlr", dlrbg);
                      dlrstr.innerHTML = dlrbg;

                      // proxy.newFormData2.DLRMC=proxy.arr1[2];
                      // proxy.newFormData2.DLRZJZL=proxy.arr1[4];
                      // proxy.newFormData2.DLRZJHM= proxy.arr1[3];
                      // proxy.newFormData2.DLRLXDH= proxy.arr1[5];

                      // vFormRef.value.setFormData(proxy.newFormData2);
                      whole.classList.remove("black");
                      xgzh3.classList.remove("stationnone");
                      xgzh1.classList.remove("stationnone");
                    });
                  });
                });
            });
          }, 3000);
        }, 1000);
      });
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
      "&users=csusers&user=" +
      proxy.ID +
      "&name=" +
      document.getElementsByClassName("bd")[0].innerText
    )
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        store.dispatch("gblc", "cs");
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
      ElMessage.error("1操作失败");
    });
};

//数据保存到数据库中
const conserve = () => {
  //放到djsjd数据库
  let slbh = route.currentRoute._rawValue.query.slbh;
  let executor = "Role-100120112002-0WY4J";
  let executor1 = "Role-161109114733-90Q70"; //查封收件插入

  let djdl = document.getElementsByClassName("el-input__inner")[14].value;
  let djxl = document.getElementsByClassName("el-input__inner")[15].value;
  let qxdm = document.getElementsByClassName("el-input__inner")[16].value;
  let sjr = document.getElementsByClassName("el-input__inner")[17].value;
  let sjsj = document.getElementsByClassName("el-input__inner")[18].value;
  let zrks = document.getElementsByClassName("el-input__inner")[19].value;
  let zjlb1 = proxy.bn;

  let zl;
  let qlrmc;
  let zjbh;
  let cfsx;
  let cflx;
  let bdcdyh;
  let cffw;
  let fj;
  let xgzh;
  if (document.getElementsByClassName("cfqdxr")[0].getElementsByClassName("slh").length != 0) {
    // 查封清单
    xgzh = document
      .getElementsByClassName("cfqdxr")[0]
      .getElementsByTagName("td")[2].innerHTML;
    zl = document
      .getElementsByClassName("cfqdxr")[0]
      .getElementsByTagName("td")[3].innerHTML;
    qlrmc = document
      .getElementsByClassName("cfqdxr")[0]
      .getElementsByTagName("td")[4].innerHTML;
    zjbh = document
      .getElementsByClassName("cfqdxr")[0]
      .getElementsByTagName("td")[5].innerHTML;
    cfsx = document
      .getElementsByClassName("cfqdxr")[0]
      .getElementsByTagName("td")[6].innerHTML;
    cflx = document
      .getElementsByClassName("cfqdxr")[0]
      .getElementsByTagName("td")[7].innerHTML;
    bdcdyh = document
      .getElementsByClassName("cfqdxr")[0]
      .getElementsByTagName("td")[8].innerHTML;
    cffw = document
      .getElementsByClassName("cfqdxr")[0]
      .getElementsByTagName("td")[9].innerHTML;
    fj = document
      .getElementsByClassName("cfqdxr")[0]
      .getElementsByTagName("td")[10].innerHTML;
  }
  let qlrmc1;
  let zjzl;
  let zjhm;
  // 代理人
  if (document.getElementsByClassName("dlrxr")[0].getElementsByClassName("slh").length != 0) {
    qlrmc1 = document
      .getElementsByClassName("dlrxr")[0]
      .getElementsByTagName("td")[2].innerHTML;
    let mm = document
      .getElementsByClassName("dlrxr")[0]
      .getElementsByTagName("td")[3].innerHTML;
    if ((mm = "身份证")) {
      mm = "1";
    } else if ((mm = "港澳台身份证")) {
      mm = "2";
    } else if ((mm = "护照")) {
      mm = "3";
    } else if ((mm = "户口簿")) {
      mm = "4";
    } else if ((mm = "军官证（士兵证）")) {
      mm = "5";
    } else if ((mm = "组织机构代码")) {
      mm = "6";
    } else if ((mm = "营业执照")) {
      mm = "7";
    } else if ((mm = "统一社会信用代码证")) {
      mm = "8";
    } else if ((mm = "其它")) {
      mm = "99";
    }

    zjzl = mm;

    zjhm = document
      .getElementsByClassName("dlrxr")[0]
      .getElementsByTagName("td")[4].innerHTML;
  }



  // '''
  let cfjg = document.getElementsByClassName("el-input__inner")[22].value;
  let cfwj = document.getElementsByClassName("el-input__inner")[23].value;
  let cfwh = document.getElementsByClassName("el-input__inner")[24].value;
  let ygr = document.getElementsByClassName("el-input__inner")[25].value;
  let cfbh = document.getElementsByClassName("el-input__inner")[26].value;
  let lwrq = document.getElementsByClassName("el-input__inner")[27].value;
  let cfqx = document.getElementsByClassName("el-input__inner")[28].value;
  let cfqssj = document.getElementsByClassName("el-input__inner")[29].value;
  let cfjssj = document.getElementsByClassName("el-input__inner")[30].value;
  let tzrxm = document.getElementsByClassName("el-input__inner")[31].value;
  let tzryddh = document.getElementsByClassName("el-input__inner")[32].value;
  let cxmm = document.getElementsByClassName("el-input__inner")[33].value;
  let jbr = document.getElementsByClassName("el-input__inner")[34].value;
  let jbrq = document.getElementsByClassName("el-input__inner")[35].value;
  let cfyy = document.getElementsByClassName("el-textarea__inner")[0].value;

  let tzfs = "";
  let tzrdh = "";

  let tzrdzyj = "";

  // let sxh = proxy.bn.ZJHM;
  let sxh = "1";

  let qlr = "";

  let lclx = "";
  let lcmc = "";

  let cnsj = "";

  let yxj = "";
  let sjbz = "";
  let qxkz = "";
  let cgzt = "";
  let lclb = "";
  let bgbm = "";
  let zslbh = "";
  let fslbh = "";
  let bgrq = "";
  let bglx = "";
  let xgzlx = "";
  let querypwd = "";
  let procid = "";
  let procname = "";
  let prjname = "";
  let prjtype = "模板创建";

  let accepttime = "";
  let priority = "";
  let prjlimit = "";
  let limittime = "";
  let exepolicy = "";
  let regionpolicy = "";
  let popedom = "";
  let proposer = "";
  let prjstate = "";
  let initaddr = "";
  let wrkid = "";
  let prjid = route.currentRoute._rawValue.query.slbh;
  let mdltype = "";
  let mdlid = "";
  let stepname = "小王";
  let stepname1 = "初审";
  let submitby = "";
  let submittime = "";

  let accepttype = "";
  let savetime = "";
  let submittype = "";
  let completetime = "";
  let stepstate = "";
  let stepnum = "";
  let steplimit = "";
  let biztype = "";
  let steptype = "";
  let glbm = "";
  let qlrid = "";
  let gyfs = "";

  let qlrlx = "义务人";
  let qlrlx1 = "权利人代理人";

  let zjlb = "";
  let dh = "";
  let czfs = "";
  let acceptby = "小明";
  let gyfe = "";

  let exeid = "";

  let cfbdcdy = "";
  let djjg = "";

  let glgb = "";
  let bdclx = "";
  let tstybm = "";

  let djzl = "";

  let cssj = "";
  let lifecycle = "";
  let spbz = "";
  let qlrxz = "2";
  let qlrxz1 = "1";
  if (qlrmc1 == null || qlrmc1 == "") {
    var data2 = {
      djsjd:
        "insert into dj_sjd(slbh,djdl,djxl,lclx,lcmc,zl,sjr,sjsj,cnsj,qxdm,tzrxm,tzfs,tzrdh,tzryddh,tzrdzyj,cxmm,zrks,yxj,sjbz,prjid,qxkz,cgzt,lclb)values('" +
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
        "','yyyy/MM/dd hh24:mi:ss'),'" +
        cnsj +
        "','" +
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
      djxgdjgl:
        "insert into dj_xgdjgl(bgbm,zslbh,fslbh,bgrq,bglx,xgzh,xgzlx)values('GB-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        zslbh +
        "','" +
        fslbh +
        "','" +
        bgrq +
        "','" +
        bglx +
        "','" +
        xgzh +
        "','" +
        xgzlx +
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
      wfmexecutor1:
        "insert into wfm_executor(exeid,exetype,executor,parenttype,parentnode,parentstate,how2exe,grantway,sortnum)values('ActExe-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        "职员" +
        "','" +
        "ADMIN" +
        "','" +
        "过程实例" +
        "','" +
        slbh +
        "','" +
        "已完成" +
        "','" +
        "主办" +
        "','" +
        "动态指定" +
        "','" +
        "0" +
        "')",
      wfmexecutor2:
        "insert into wfm_executor(exeid,exetype,executor,parenttype,parentnode,parentstate,how2exe,grantway,sortnum)values('ActExe-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        "角色" +
        "','" +
        +executor +
        "','" +
        "过程实例" +
        "','" +
        slbh +
        "','" +
        "已完成" +
        "','" +
        "主办" +
        "','" +
        "动态指定" +
        "','" +
        "0" +
        "')",
      wfmexecutor3:
        "insert into wfm_executor(exeid,exetype,executor,parenttype,parentnode,parentstate,how2exe,grantway,sortnum)values('ActExe-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        "角色" +
        "','" +
        executor1 +
        "','" +
        "过程实例" +
        "','" +
        slbh +
        "','" +
        "已完成" +
        "','" +
        "主办" +
        "','" +
        "动态指定" +
        "','" +
        "0" +
        "')",
      djqlrgl:
        "insert into dj_qlrgl(glbm,slbh,qlrid,gyfs,sxh,qlrlx,qlrmc,zjlb,dh,czfs,gyfe)values('GB-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        slbh +
        "','TD'||qlrid_seq.nextval,'" +
        gyfs +
        "','" +
        sxh +
        "','" +
        qlrlx +
        "','" +
        qlrmc +
        "','" +
        zjlb +
        "','" +
        dh +
        "','" +
        czfs +
        "','" +
        gyfe +
        "')",
      djqlr:
        "insert into dj_qlr(qlrid, qlrmc,zjlb,zjhm,qlrxz)values((select qlrid from dj_qlrgl where slbh = '" +
        slbh +
        "'and qlrmc = '" +
        qlrmc +
        "'),'" +
        qlrmc +
        "','" +
        zjlb1 +
        "','" +
        zjbh +
        "','" +
        qlrxz +
        "')",
      dj_cf:
        "insert into dj_cf(slbh,cfbh,xgzh,bdcdyh,cfsx,cfjg,cflx,cfwj,cfwh,cfqssj,cfjssj,cffw,cfbdcdy,djjg,jbr,jbrq,fj,qlr,zjbh,lwrq,ygr,cfqx,spbz,cfyy)values('" +
        slbh +
        "','" +
        cfbh +
        "','" +
        xgzh +
        "','" +
        bdcdyh +
        "','" +
        cfsx +
        "','" +
        cfjg +
        "','" +
        cflx +
        "','" +
        cfwj +
        "','" +
        cfwh +
        "',to_date('" +
        cfqssj +
        "','yyyy/MM/dd hh24:mi:ss')," +
        "to_date('" +
        cfjssj +
        "','yyyy/MM/dd hh24:mi:ss'),'" +
        cffw +
        "','" +
        cfbdcdy +
        "','" +
        djjg +
        "','" +
        jbr +
        "',to_date('" +
        jbrq +
        "','yyyy/MM/dd hh24:mi:ss'),'" +
        // jbrq +
        // "','" +
        fj +
        "','" +
        qlr +
        "','" +
        zjbh +
        "',to_date('" +
        lwrq +
        "','yyyy/MM/dd hh24:mi:ss'),'" +
        // lwrq +
        // "','" +
        ygr +
        "','" +
        cfqx +
        "','" +
        spbz +
        "','" +
        cfyy +
        "')",
      djtsgl:
        "insert into dj_tsgl(glbm,slbh,bdclx,tstybm,bdcdyh,djzl,cssj,lifecycle)values('GL-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        slbh +
        "','" +
        bdclx +
        "','" +
        tstybm +
        "','" +
        bdcdyh +
        "','" +
        djzl +
        "','" +
        cssj +
        "','" +
        lifecycle +
        "')",
    };
  } else {
    var data2 = {
      djsjd:
        "insert into dj_sjd(slbh,djdl,djxl,lclx,lcmc,zl,sjr,sjsj,cnsj,qxdm,tzrxm,tzfs,tzrdh,tzryddh,tzrdzyj,cxmm,zrks,yxj,sjbz,prjid,qxkz,cgzt,lclb)values('" +
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
        "','yyyy/MM/dd hh24:mi:ss'),'" +
        cnsj +
        "','" +
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
      djxgdjgl:
        "insert into dj_xgdjgl(bgbm,zslbh,fslbh,bgrq,bglx,xgzh,xgzlx)values('GB-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        zslbh +
        "','" +
        fslbh +
        "','" +
        bgrq +
        "','" +
        bglx +
        "','" +
        xgzh +
        "','" +
        xgzlx +
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
      wfmexecutor1:
        "insert into wfm_executor(exeid,exetype,executor,parenttype,parentnode,parentstate,how2exe,grantway,sortnum)values('ActExe-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        "职员" +
        "','" +
        "ADMIN" +
        "','" +
        "过程实例" +
        "','" +
        slbh +
        "','" +
        "已完成" +
        "','" +
        "主办" +
        "','" +
        "动态指定" +
        "','" +
        "0" +
        "')",
      wfmexecutor2:
        "insert into wfm_executor(exeid,exetype,executor,parenttype,parentnode,parentstate,how2exe,grantway,sortnum)values('ActExe-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        "角色" +
        "','" +
        +executor +
        "','" +
        "过程实例" +
        "','" +
        slbh +
        "','" +
        "已完成" +
        "','" +
        "主办" +
        "','" +
        "动态指定" +
        "','" +
        "0" +
        "')",
      wfmexecutor3:
        "insert into wfm_executor(exeid,exetype,executor,parenttype,parentnode,parentstate,how2exe,grantway,sortnum)values('ActExe-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        "角色" +
        "','" +
        executor1 +
        "','" +
        "过程实例" +
        "','" +
        slbh +
        "','" +
        "已完成" +
        "','" +
        "主办" +
        "','" +
        "动态指定" +
        "','" +
        "0" +
        "')",
      djqlrgl:
        "insert into dj_qlrgl(glbm,slbh,qlrid,gyfs,sxh,qlrlx,qlrmc,zjlb,dh,czfs,gyfe)values('GB-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        slbh +
        "','TD'||qlrid_seq.nextval,'" +
        gyfs +
        "','" +
        sxh +
        "','" +
        qlrlx +
        "','" +
        qlrmc +
        "','" +
        zjlb +
        "','" +
        dh +
        "','" +
        czfs +
        "','" +
        gyfe +
        "')",
      djqlrgl1:
        "insert into dj_qlrgl(glbm,slbh,qlrid,gyfs,sxh,qlrlx,qlrmc,zjlb,dh,czfs,gyfe)values('GB-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        slbh +
        "','TD'||qlrid_seq.nextval,'" +
        gyfs +
        "','" +
        sxh +
        "','" +
        qlrlx1 +
        "','" +
        qlrmc1 +
        "','" +
        zjzl +
        "','" +
        dh +
        "','" +
        czfs +
        "','" +
        gyfe +
        "')",
      djqlr:
        "insert into dj_qlr(qlrid, qlrmc,zjlb,zjhm,qlrxz)values((select qlrid from dj_qlrgl where slbh = '" +
        slbh +
        "'and qlrmc = '" +
        qlrmc +
        "'),'" +
        qlrmc +
        "','" +
        zjlb1 +
        "','" +
        zjbh +
        "','" +
        qlrxz +
        "')",
      djqlr1:
        "insert into dj_qlr(qlrid, qlrmc,zjlb,zjhm,qlrxz)values((select qlrid from dj_qlrgl where slbh = '" +
        slbh +
        "'and qlrmc = '" +
        qlrmc1 +
        "'),'" +
        qlrmc1 +
        "','" +
        zjlb +
        "','" +
        zjhm +
        "','" +
        qlrxz1 +
        "')",
      dj_cf:
        "insert into dj_cf(slbh,cfbh,xgzh,bdcdyh,cfsx,cfjg,cflx,cfwj,cfwh,cfqssj,cfjssj,cffw,cfbdcdy,djjg,jbr,jbrq,fj,qlr,zjbh,lwrq,ygr,cfqx,spbz,cfyy)values('" +
        slbh +
        "','" +
        cfbh +
        "','" +
        xgzh +
        "','" +
        bdcdyh +
        "','" +
        cfsx +
        "','" +
        cfjg +
        "','" +
        cflx +
        "','" +
        cfwj +
        "','" +
        cfwh +
        "',to_date('" +
        cfqssj +
        "','yyyy/MM/dd hh24:mi:ss')," +
        "to_date('" +
        cfjssj +
        "','yyyy/MM/dd hh24:mi:ss'),'" +
        cffw +
        "','" +
        cfbdcdy +
        "','" +
        djjg +
        "','" +
        jbr +
        "',to_date('" +
        jbrq +
        "','yyyy/MM/dd hh24:mi:ss'),'" +
        // jbrq +
        // "','" +
        fj +
        "','" +
        qlr +
        "','" +
        zjbh +
        "',to_date('" +
        lwrq +
        "','yyyy/MM/dd hh24:mi:ss'),'" +
        // lwrq +
        // "','" +
        ygr +
        "','" +
        cfqx +
        "','" +
        spbz +
        "','" +
        cfyy +
        "')",
      djtsgl:
        "insert into dj_tsgl(glbm,slbh,bdclx,tstybm,bdcdyh,djzl,cssj,lifecycle)values('GL-'||to_char(SYSDATE,'yyMMddhhmiss')||'-'|| dbms_random.string('x', 8),'" +
        slbh +
        "','" +
        bdclx +
        "','" +
        tstybm +
        "','" +
        bdcdyh +
        "','" +
        djzl +
        "','" +
        cssj +
        "','" +
        lifecycle +
        "')",
    };
  }

  let config = {
    headers: { "Content-Type": "application/json" },
  };
  if (document.getElementsByClassName("el-input__inner")[20].value == "" || document.getElementsByClassName("el-input__inner")[20].value == null) {
    ElMessage({
      message: "流程类别为空",
      type: "error",
    });
  } else if (document.getElementsByClassName("cfqdxr")[0].getElementsByClassName("slh").length == 0) {
    ElMessage({
      message: "查封清单为空,请确认后保存!",
      type: "error",
    });
  } else if (document.getElementsByClassName("el-textarea__inner")[0].value == '' || document.getElementsByClassName("el-input__inner")[22].value == "" ||
    document.getElementsByClassName("el-input__inner")[24].value == "" || document.getElementsByClassName("el-input__inner")[31].value == "") {
    ElMessage({
      message: "通知人姓名、查封机关、查封文件、查封冻结原因为空,请确认后保存!",
      type: "error",
    });
  } else {
    axios
      .post("/test/sqls", data2, config)
      .then((res) => {

        let sj = res.data.data;
        if (sj == null) {
          ElMessage({
            message: "保存失败",
            type: "error",
          });
        } else {
          ElMessage({
            message: "已保存",
            type: "success",
          });
        }
      });
  }

};

//
onMounted(() => {
  setTimeout(() => {
    getInputData();
  }, 3500)
  getformJson();
  show();
  fromname();
  getYERformJson();
  // getywrformJson()
  // submitForm();
});
</script>

<style>
.formcontent {
  width: 76.34%;
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

.slh {
  background: #fff !important;
  font-size: 14px;
  padding: 9px 1px;
}

.cfqdxr {
  line-height: 26px;
}

.el-form-item.is-error .el-input__wrapper {
  box-shadow: 0 0 0 1px transparent !important;
}

.el-form-item.is-error .el-select-v2__wrapper,
.el-form-item.is-error .el-select-v2__wrapper:focus,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner:focus {
  box-shadow: 0 0 0 1px transparent !important;
}

.xgzhcxjg {
  height: 256px;
  overflow-y: auto;
}


.qlrcx {
  height: 308px;
  overflow-y: auto;
}

td {
  word-wrap: break-word;
  word-break: normal;
}
</style>
