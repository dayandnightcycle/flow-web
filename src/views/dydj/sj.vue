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
            <el-input v-model="input" placeholder="抵押受理.json" />
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
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
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
  formData: "",
  newFormData: "",
  // slbh,sjsj,cnsj
  newFormData1: "",
  newFormData2: "",
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
let CNSJ;
const formJson = reactive({});
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
//js查询数据
const SLBH = $router.currentRoute._rawValue.query.slbh;
var data = {
  //收件单
  sjd:
    "select SLBH, DJDL, LCLX, LCMC, SJR, SJSJ, CNSJ, QXDM, TZRXM, TZFS, TZRDH, TZRYDDH, TZRDZYJ, TZRTXDZ, CXMM, SJMC, SJLX, SJSL, YS, SFSYBZ, SFEWSJ, SFBCSJ, ZRKS, ZRR, YXJ, SJBZ, BCSM, FCSLH,FCDJLX,JYBH,FCHID,ZL,HTBH,PCH from DJ_SJD where SLBH like " +
    "'" +
    SLBH +
    "%'",
  //收件人
  sjr:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '收件人' AND ROWNUM<2) ORDER BY ITEMORDER",
  //责任科室
  zrks:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '责任科室' AND ROWNUM<2) ORDER BY ITEMORDER",
  //责任人
  zrr:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '责任人' AND ROWNUM<2) ORDER BY ITEMORDER",
  //优先级
  yxj:
    "select ITEMVAL, ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '优先级' AND ROWNUM<2) ORDER BY ITEMORDER",
  //所属辖区
  ssxq:
    "select ITEMNOTE,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '所属辖区' AND ROWNUM<2) ORDER BY ITEMORDER",
  //原收件单
  ysjd:
    "select SLBH, LCLX, LCMC, SJR, SJSJ, CNSJ, QXDM, TZRXM, TZFS, TZRDH, TZRYDDH, TZRDZYJ, TZRTXDZ, CXMM, SJMC, SJLX, SJSL, YS, SFSYBZ, SFEWSJ, SFBCSJ, ZRKS, ZRR, YXJ, SJBZ, BCSM, FCSLH, FCDJLX, FCHID from DJ_SJD where SLBH = ''",
  //通知方式
  tzfs:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '通知方式' AND ROWNUM<2) ORDER BY ITEMORDER",
  //收件类型
  sjlx:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '收件类型' AND ROWNUM<2) ORDER BY ITEMORDER",
  //是否
  sf:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '是否' AND ROWNUM<2) ORDER BY ITEMORDER",
  //登记类型（大类）
  dl:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记类型(大类)' AND ROWNUM<2) ORDER BY ITEMORDER",
  //缴费类型
  jflx:
    "select ItemVal,ItemName from Dic_Item where dicCode =(SELECT DICCODE FROM dic_main WHERE DICNAME = '交费类型' And RowNum<2) order by ItemOrder",
  //收费单
  sfd:
    "select SLBH, JFBH, XMMC, JFDW, TXDZ, DH, JFLX, JBR, JBRQ, JBYJ, SHR, SHYJ, SHRQ, YSJE, SSJE, SKR, SKRQ, SKYJ, SLR from DJ_SFD where SLBH like " +
    "'" +
    SLBH +
    "%'",
  //证件类型
  zjlx:
    "select itemval,itemname from dic_item where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型' AND ROWNUM<2) ORDER BY ITEMORDER",
};

//表单数据获取
const getInputData = () => {
  axios.post("/test/sqls", data).then((res) => {
    console.log(res);
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
const getformJson = () => {
  // 获取表单json
  proxy.$http
    .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
    .then((res) => {
      vFormRef.value.setFormJson(res.data);
      proxy.newFormData1 = formData;
      proxy.newFormData1.SLBH = route.currentRoute._rawValue.query.slbh;
      proxy.newFormData1.SJSJ = CNSJ;
      proxy.newFormData1.CNSJ = CNSJ;
      vFormRef.value.setFormData(proxy.newFormData1);
      nextTick(() => {
        setTimeout(() => {
          // 相关证号查询按钮
          let btnxgzh = document.getElementsByClassName("btnxgzh")[0];
          console.log();
          // 相关证号渲染框
          let xgzhcontent = document.getElementsByClassName("xgzhcontent")[0];
          btnxgzh.addEventListener("click", function () {
            proxy.bdcdyh = document.getElementsByClassName(
              "el-input__inner"
            )[19].value;
            proxy.bdczh = document.getElementsByClassName(
              "el-input__inner"
            )[20].value;
            proxy.slbh = document.getElementsByClassName(
              "el-input__inner"
            )[21].value;
            proxy.qlr = document.getElementsByClassName(
              "el-input__inner"
            )[22].value;
            proxy.zl = document.getElementsByClassName(
              "el-input__inner"
            )[23].value;
            proxy.ywr = document.getElementsByClassName(
              "el-input__inner"
            )[24].value;
            proxy.zslx = document.getElementsByClassName(
              "el-input__inner"
            )[25].value;
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
              console.log("res", res);
              const xgzhdata = res.data.data.xgzh;
              const xgzhdataslice = xgzhdata.slice(0, 10);
              let xgzh1 = "";
              for (var i = 0; i < xgzhdataslice.length; i++) {
                let j = i + 1;
                let mm =
                  "<tr class='bbb'>" +
                  "<td style='height: 50px; width: 150px;position: relative;'><input class='aaa' type='checkbox' style='background:#fff;position: absolute;top:30%;left:50%;'></td>" +
                  "<td style='height: 50px; width: 150px;'>" +
                  j +
                  "</td>" +
                  "<td style='height: 50px; width: 200px;'>" +
                  xgzhdataslice[i].SLBH +
                  "</td>" +
                  "<td style='height: 50px; width: 300px;'>" +
                  xgzhdataslice[i].QLRMC +
                  "</td>" +
                  "<td style='height: 50px; width: 300px;'>" +
                  xgzhdataslice[i].YERMC +
                  "</td>" +
                  "<td style='height: 50px; width: 420px;'>" +
                  xgzhdataslice[i].BDCZH +
                  "</td>" +
                  "<td style='height: 50px; width: 420px;'>" +
                  xgzhdataslice[i].ZL +
                  "</td>" +
                  "</tr>";
                xgzh1 += mm;
              }
              xgzh1 = "<table class='table1'>" + xgzh1 + "</table>";
              xgzhcontent.innerHTML = xgzh1;
              //   //点击选择框
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
                let qlrtablelist = document.getElementsByClassName("xz")[0];
                console.log(document.getElementsByClassName("xz"));
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
                let xgzhdelete = document.getElementsByClassName(
                  "el-button"
                )[19];
                xgzhdelete.onclick = () => {
                  qlrtablelist.innerHTML = "";
                };
                //相关证号确认
                var xgzhqr = document.getElementsByClassName("xgzhqr")[0];
                let xgzh2 = "";
                let xgzh3 = "";
                xgzhqr.addEventListener("click", function () {
                  // 相关证号
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
                console.log(xgzh2);
                let xgzhXr = document.getElementsByClassName("xgzhxr")[0];
                xgzhXr.innerHTML = xgzh2;
                console.log("array[0].ZL", array[0][6]);
                proxy.newFormDataxx = formData;
                proxy.newFormDataxx.TZRZL = array[0][6];
                vFormRef.value.setFormData(proxy.newFormDataxx);
                });
              });
            });
          });
        }, 3000);
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
      console.log(proxy.ID);
    }
  }
};

//获取第二个下拉框name的数据
const databd = (val) => {
  proxy.dataxz = val;
};
// 通过
const confirm = () => {
  console.log(proxy.ID);
  proxy.$http
    .get(
      " /flow/DYDJ/audit?variate=yes&taskId=" +
        taskId +
        "&taskName=" +
        taskName.slice(-2) +
        "&users=slusers&user=" +
        proxy.ID +
        "&name=抵押受理.json"
    )
    .then((res) => {
      console.log(res);
      const code = res.data.code;
      if (code === 0) {
        store.dispatch("gblc", "sl");
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
//数据保存到数据库中
const conserve = () => {
  // console.log(document.getElementsByClassName("el-input__inner"));
  // djsjd
  let slbh = $router.currentRoute._rawValue.query.slbh;
  let djdl = "";
  let djxl = "";
  let lclx = "";
  let lcmc = "";
  let zl = "";
  let sjr = "";
  let sjsj = document.getElementsByClassName("el-input__inner")[4].value;
  let cnsj = document.getElementsByClassName("el-input__inner")[5].value;
  let qxdm = "";
  let tzrxm = "";
  let tzfs = "";
  let tzrdh = "";
  let tzryddh = "";
  let tzrdzyj = "";
  let cxmm = "";
  let zrks = "";
  let yxj = "";
  let sjbz = "";
  let prjid = "111";
  let qxkz = "";
  let cgzt = "";
  let lclb = "";
  // djqlrgl
  let qlrglbm = proxy.qlrglbm;
  let qlrid = "";
  let gyfs = "";
  let sxh = "";
  let qlrlx = "";
  let qlrmc = "";
  let zjlb = "";
  let dh = "";
  let czfs = "";
  let gyfe = "";
  // dj_sfd
  let jfbh = "";
  let jflx = "";
  let jsje = "";
  // dj_tsgl
  let glgb = "";
  let bdclx = "";
  let tstybm = "";
  let bdcdyh = "";
  let djzl = "";
  let cssj = "";
  let lifecycle = "";
  // dj_dy
  let djlx = "";
  let djyy = "";
  let xgzh = "";
  let sqrq = "";
  // dj_xgdjgl
  let bgbm = $router.currentRoute._rawValue.query.bgbm;
  let zslbh = "";
  let fslbh = "";
  let bgrq = "";
  let bglx = "";
  let xgzlx = "";
  // wfmprocinst
  let querypwd = "";
  let procid = "";
  let procname = "";
  let prjname = "";
  let prjtype = "1";
  let acceptby = "1";
  let priority = "";
  let prjlimit = "";
  // let limittime = "2021/09/08 12:12:12";
  let exepolicy = "";
  let regionpolicy = "";
  let popedom = "";
  let proposer = "";
  let prjstate = "";
  let initaddr = "";
  // wfmactinst
  let wrkid = $router.currentRoute._rawValue.query.wrkid;
  let mdltype = "";
  let mdlid = "";
  let stepname = "111";
  let submitby = "";
  let submittime = "";
  let accepttime = "1";
  let savetime = "";
  let submittype = "";
  let completetime = "";
  let stepstate = "";
  let steptype = "";
  let stepnum = "";
  let steplimtt = "";
  let biztype = "";
  // wfmexecutor
  let exeid = $router.currentRoute._rawValue.query.exeid;
  let exetype = "";
  let executor = "";
  let parenttype = "";
  let parentnode = "";
  let parentstate = "";
  let how2exe = "";
  let grantway = "";
  let sortnum = "";
  var data3 = {
    //收件单
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
    //权利人关联
    djqlrgl:
      "insert into dj_qlrgl(glbm,slbh,qlrid,gyfs,sxh,qlrlx,qlrmc,zjlb,dh,czfs,gyfe)values('" +
      qlrglbm +
      "','" +
      slbh +
      "','" +
      qlrid +
      "','" +
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
    //dj_sfd
    sfd:
      "insert into dj_sfd(slbh,jfbh,dh,jflx,ysje) values ( '" +
      slbh +
      "','" +
      jfbh +
      "','" +
      dh +
      "','" +
      jflx +
      "','" +
      jsje +
      "')",
    //dj_tsgl
    djtsgl:
      "insert into dj_tsgl(slbh,bdclx,tstybm,bdcdyh,djzl,cssj,lifecycle,glbm)values('" +
      slbh +
      "','" +
      bdclx +
      "','" +
      tstybm +
      "','" +
      bdcdyh +
      "','" +
      djzl +
      "',to_date('" +
      cssj +
      "','yyyy-MM-dd'),'" +
      lifecycle +
      "','" +
      qlrglbm +
      "')",
    //dj_dy
    dy:
      "insert into dj_dy(slbh,djlx,djyy,xgzh,sqrq) values ( '" +
      slbh +
      "','" +
      djlx +
      "','" +
      djyy +
      "','" +
      xgzh +
      "','" +
      sqrq +
      "')",
    //dj_xgdjgl
    djxgdjgl:
      "insert into dj_xgdjgl(bgbm,zslbh,fslbh,bgrq,bglx,xgzh,xgzlx)values('" +
      bgbm +
      "','" +
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
    //wfmprocinst
    // wfmprocinst:
    //   "insert into wfm_procinst(prjid,querypwd,procid,procname,prjname,prjtype,acceptby,accepttime,priority,prjlimit,limittime,exepolicy,regionpolicy,popedom,proposer,prjstate,initaddr)values('" +
    //   prjid +
    //   "','" +
    //   querypwd +
    //   "','" +
    //   procid +
    //   "','" +
    //   procname +
    //   "','" +
    //   prjname +
    //   "','" +
    //   prjtype +
    //   "','" +
    //   acceptby +
    //   "','" +
    //   accepttime +
    //   "','" +
    //   priority +
    //   "','" +
    //   prjlimit +
    //   "','" +
    //   limittime +
    //   "','" +
    //   exepolicy +
    //   "','" +
    //   regionpolicy +
    //   "','" +
    //   popedom +
    //   "','" +
    //   proposer +
    //   "','" +
    //   prjstate +
    //   "','" +
    //   initaddr +
    //   "')",
    //wfmactinst
    // wfmactinst:
    //   "insert into wfm_actinst(wrkid,prjid,mdltype,mdlid,stepname,submitby,submittime,acceptby,accepttime,savetime,submittype,completetime,stepstate,steptype,stepnum,biztype)values('" +
    //   wrkid +
    //   "','" +
    //   prjid +
    //   "','" +
    //   mdltype +
    //   "','" +
    //   mdlid +
    //   "','" +
    //   stepname +
    //   "','" +
    //   submitby +
    //   "','" +
    //   submittime +
    //   "','" +
    //   acceptby +
    //   "','" +
    //   accepttime +
    //   "','" +
    //   savetime +
    //   "','" +
    //   submittype +
    //   "','" +
    //   completetime +
    //   "','" +
    //   stepstate +
    //   "','" +
    //   stepnum +
    //   "','" +
    //   biztype +
    //   "','" +
    //   steptype +
    //   "')",
    //wfmexecutor
    wfmexecutor:
      "insert into wfm_executor(exeid,exetype,executor,parenttype,parentnode,parentstate,how2exe,grantway,sortnum)values('exeid','角色','ADMIN','活动实例','PARENTNODE','待接收','主办','动态指定','0')",
  };
  let config = {
    headers: { "Content-Type": "application/json" },
  };
  proxy.$http.post("/test/sqls", data3, config).then((res) => {
    console.log("res", res);
  });
};
// glbm,id获取
const IdGlbm = () => {
  axios.post("/test/glbm").then((res) => {
    console.log("res", res.data);
    // proxy.qlrid = res.data.qlrid;
    // proxy.qlrdlrid = res.data.qlrdlrid;
    // proxy.ywrid = res.data.ywrid;
    // proxy.ywrdlrid = res.data.ywrdlrid;
    proxy.qlrglbm = res.data.qlrglbm;
    proxy.qlrdlrglbm = res.data.qlrdlrglbm;
    proxy.ywrglbm = res.data.ywrglbm;
    proxy.ywrdlrglbm = res.data.ywrdlrglbm;
  });
};

onMounted(() => {
  console.log(taskId, taskName.slice(-2), proxy.ID);
  getInputData();
  getformJson();
  show();
  fromname();
  IdGlbm();
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
.aaa {
  opacity: 1;
  outline: 0;
  position: absolute;
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
</style>
