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
      <el-dialog v-model="dialogFormVisible" title="选择收件">
        <el-form :model="form" label-width="120px">
          <el-form-item label="下一个收件人">
            <el-select v-model="form.region" @change="dataslr" placeholder="选择收件人">
              <el-option v-for="(item, index) in proxy.region" :label="item" :key="index" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="下一个表单">
            <el-select v-model="form.namedata" @change="databd" placeholder="请选择表单">
              <el-option v-for="(item, index) in proxy.namedata" :label="item.label" :key="index" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="confirm"> 确认</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
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
let vFormRef = ref(null);
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
let QLRTABLE = [];
let QLRDLRTABLE = [];
const formLabelWidth = "140px";
const formData = reactive({});
const optionData = reactive({});
const form = reactive({
  region: "",
  dataxz: "",
  ID: "",
  gridData: "",
  namedata: "首次登记受理.json",
  newFormData: "",
});
let dqzt;
const formJson = reactive({});
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
const slbh = router.currentRoute._value.query.slbh;
//定义data，根据数据库获取表单内容的数据
var data = {
  // qlr: "select * from dj_qlrgl where slbh = '" + slbh + "'",
  qlr: "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('权利人') AND B.slbh='" + slbh + "' ORDER BY B.SXH",
  qlrdlr: "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('权利人代理人') AND B.slbh='" + slbh + "' ORDER BY B.SXH",
  xssjd: "select SLBH,DJDL, LCLX, LCMC,LCLB, SJR, SJSJ, CNSJ, QXDM, TZRXM, TZFS, TZRDH, TZRYDDH, TZRDZYJ, TZRTXDZ, CXMM, SJMC, SJLX, SJSL, YS, SFSYBZ, SFEWSJ, SFBCSJ, ZRKS, ZRR, YXJ, SJBZ, BCSM, FCSLH, FCDJLX,JYBH, FCHID,DJDL,ZL,HTBH,PCH from DJ_SJD where SLBH = '" + slbh + "'",
  djdjb: "select djlx,djyy,sqfbcz,sqrq,gyfs,xgzh  from  dj_djb where SLBH='" + slbh + "'",
  ggsjr:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '收件人' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggssxq:
    "select ITEMNOTE,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '所属辖区' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggtzfs:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '通知方式' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggzrks:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '责任科室' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggzrr:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '责任人' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggyxj:
    "select ITEMVAL, ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '优先级' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggsjlx:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '收件类型' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggsf: "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '是否' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggdjdl:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记类型(大类)' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggjflx:
    "select ItemVal,ItemName from Dic_Item where dicCode =(SELECT DICCODE FROM dic_main WHERE DICNAME = '交费类型' And RowNum<2) order by ItemOrder",
  sxsfd: "select SLBH, JFBH, XMMC, JFDW, TXDZ, DH, JFLX, JBR, JBRQ, JBYJ, SHR, SHYJ, SHRQ, YSJE, SSJE, SKR, SKRQ, SKYJ, SLR from DJ_SFD where SLBH='" + slbh + "'",
  ggzj: "SELECT ITEMNAME FROM DIC_ITEM WHERE ITEMVAL = '1' AND DICCODE IN (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型')",
  ggzjlx:
    "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggqlrxz: "select ITEMVAL, ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '权利人性质' AND ROWNUM<2) ORDER BY ITEMORDER",
  gglclb: "select ITEMVAL, ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '流程类别' AND ROWNUM<2) ORDER BY ITEMORDER",
  gggyfs: "select ITEMVAL, ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '共有方式' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggdjyy: "select ITEMVAL, ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '房屋首次登记原因' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggdjxl: "select ITEMVAL, ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '国有建设用地使用权及房屋所有权首次登记' AND ROWNUM<2) ORDER BY ITEMORDER"
};
// var data = {
//     //查询权利人
//     "qlr": "SELECT DISTINCT N'' AS XZ,ROWNUM AS RN,QLRMC,ZJLB,ZJHM,DH,QLRID,FRDBXM,FRDBZJH FROM DJ_QLR WHERE ZJHM IS NOT NULL  AND QLRMC LIKE '%" + QLRMC + "%'  AND ZJHM LIKE '%" + ZJHM + "%'  AND QLRXZ = '" + QLRXZ + "' AND ZJLB = '" + ZJLB + "'",
//     //查询相关证号
//     "xgzh":"SELECT * FROM (SELECT DISTINCT N'' AS XZ, N'' AS RN,A.SLBH,(select wm_concat(distinct to_char(y.qlrmc)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as qlrmc,(select wm_concat(distinct to_char(y.qlrmc)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '义务人') as yermc, A.BDCZH,b.bdcdyh as bdcdyh,D.ZL,A.ZSLX FROM DJ_DJB A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN FC_H_QSDC C ON B.TSTYBM = C.TSTYBM LEFT JOIN DJ_SJD D ON A.SLBH = D.SLBH left join dj_qlrgl e on a.slbh = e.slbh left join dj_qlr f on e.qlrid = f.qlrid WHERE (A.ZSLX = '房屋不动产证' OR A.ZSLX = '房产证') AND A.DJRQ IS NOT NULL AND A.BDCZH IS NOT NULL AND (A.LIFECYCLE IS NULL OR A.LIFECYCLE = 0) AND (B.LIFECYCLE IS NULL OR B.LIFECYCLE = 0) AND (C.LIFECYCLE IS NULL OR C.LIFECYCLE = 0 OR C.LIFECYCLE = -1) AND A.ZSXLH IS NOT NULL AND C.TSTYBM IS NOT NULL AND A.SLBH LIKE '%"+slbh+"%' AND B.BDCDYH LIKE '%"+bdcdyh+"%' AND D.ZL LIKE '%"+zl+"%' AND A.BDCZH LIKE '%"+bdczh+"%' AND EXISTS (SELECT A.SLBH FROM DJ_QLR E INNER JOIN DJ_QLRGL F ON E.QLRID = F.QLRID WHERE A.SLBH = F.SLBH AND E.QLRMC LIKE '%"+qlrmc+"%' AND (F.QLRLX = '权利人' OR F.QLRLX = '抵押权人' OR F.QLRLX IS NULL)) AND EXISTS (SELECT A.SLBH FROM DJ_QLR E INNER JOIN DJ_QLRGL F ON E.QLRID = F.QLRID WHERE A.SLBH = F.SLBH AND E.QLRMC LIKE '%"+qlrmc+"%' AND (F.QLRLX = '义务人' OR F.QLRLX = '抵押人')))ORDER BY ZL, BDCZH, SLBH"
// }

//首次收件保存写入   
// var data = {
//     "djsjd": "insert into dj_sjd (slbh,djdl, djxl, lclx,lcmc,zl,sjr,sjsj,cnsj,qxdm,tzrxm,tzfs,tzrdh,tzryddh,tzrdzyj,tzrtxdz,cxmm,zrks,zrr, yxj,sjbz,xczp,prjid,qxkz, cgzt , lclb) values ('" + slbh + "','" + djdl + "','" + djxl + "','" + lclx + "','" + lcmc + "','" + zl + "','" + sjr + "',to_date(to_char(sysdate,'yyyy/MM/dd hh24:mi:ss'),'yyyy/MM/dd hh24:mi:ss'),to_date(to_char(sysdate,'yyyy/MM/dd hh24:mi:ss'),'yyyy/MM/dd hh24:mi:ss'),'" + qxdm + "','" + tzrxm + "','" + tzfs + "','" + tzrdh + "','" + tzryddh + "','" + tzrdzyj + "','" + tzrtxdz + "','" + cxmm + "','" + zrks + "','" + zrr + "','" + yxj + "','" + sjbz + "','" + xczp + "','" + prjid + "','" + qxkz + "','" + cgzt + "','" + lclb + "')",
//     "wfmprocinst": "insert into wfm_procinst(prjid,querypwd,procid,procname,prjname,prjtype,acceptby,accepttime,priority,prjlimit,limittime,exepolicy,regionpolicy,popedom,proposer,prjstate, initaddr)values('" + prjid + "','" + querypwd + "','" + procid + "','" + procname + "','" + prjname + "','" + prjtype + "','" + acceptby + "','" + accepttime + "','" + priority + "','" + prjlimit + "','" + limittime + "','" + exepolicy + "','" + regionpolicy + "','" + popedom + "','" + proposer + "','" + prjstate + "','" + initaddr + "')",
//     "wfmactinst1": "insert into wfm_actinst(wrkid,prjid,mdltype,mdlid,stepname,submitby,submittime,acceptby,accepttime,savetime,submittype,completetime,stepstate,steptype,stepnum,steplimtt,biztype)values('" + wrkid + "','" + prjid + "','" + mdltype + "','" + mdlid + "','" + stepname + "','" + submitby + "','" + submittime + "','" + acceptby + "','" + accepttype + "','" + savetime + "','" + submittype + "','" + completetime + "','" + stepstate + "','" + stepnum + "','" + steplimtt + "','" + biztype + "','" + steptype + "')",
//     "wfmactinst2": "insert into wfm_actinst(wrkid,prjid,mdltype,mdlid,stepname,submitby,submittime,acceptby,accepttime,submittype,stepstate,steptype,stepnum,steplimtt,biztype)values('" + wrkid + "','" + prjid + "','" + mdltype + "','" + mdlid + "','" + stepname + "','" + submitby + "','" + submittime + "','" + acceptby + "','" + accepttype + "','" + submittype + "','" + stepstate + "','" + stepnum + "','" + steplimtt + "','" + biztype + "','" + steptype + "')",
//     "djqlrgl1": "insert into dj_qlrgl(glbm,slbh,qlrid,gyfs,sxh,qlrlx,qlrmc) values ('" + glbm + "','" + slbh + "','" + qlrid + "','" + gyfs + "','" + sxh + "','" + qlrlx + "','" + qlrmc + "')",
//     "djqlrgl2": "insert into dj_qlrgl(glbm,slbh,qlrid,sxh,qlrlx,qlrmc) values ('" + glbm + "','" + slbh + "','" + qlrid + "','" + sxh + "','" + qlrlx + "','" + qlrmc + "')",

// }
let SLRY;
let CNSJ;
let JSONData;
let ZJLBdata = [];
let QLRXZdata = [];
let qlrxxdata = [];
let QLRXX1 = [];
let QLRDLRXX1 = [];
const slr = () => {
  proxy.$http
    .get("/flow/SCDJ/lcmc?taskId=" + taskId).then((res) => {
      let arr = res.data.data;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].mc == '收件') {
          SLRY = arr[i].userName;
        }
      }
    })
  let time = new Date()
  function timestampToTime(times) {
    let time = times[1]
    let mdy = times[0]
    mdy = mdy.split('/')
    let month = String(parseInt(mdy[0]));
    let day = String(parseInt(mdy[1]));
    let year = String(parseInt(mdy[2]))
    if (day.length < 2) {
      day = '0' + String(day)
    }
    if (month.length < 2) {
      month = '0' + String(month)
    }
    return year + '-' + month + '-' + day + '' + time
  }
  let nowTime = timestampToTime(time.toLocaleString('en-US', { hour12: false }).split(" "))
  console.log('time', nowTime);
  CNSJ = nowTime
}
// 弹出弹框，获取审核人
const show = () => {
  nextTick(() => {
    proxy.$http.get("/flow/user/users").then((res) => {
      let gridData = res.data.data;
      proxy.gridData = gridData;
      let shrcl = [];
      for (let i = 0; i < gridData.length; i++) {
        let shr = gridData[i].last + gridData[i].first;
        shrcl.push(shr);
      }
      proxy.region = shrcl;
    });
  });
};
// 获取表单
const getformJson = () => {
  proxy.$http.post("/test/sqls", data).then(
    (res) => {
      ZJLBdata = res.data.data.ggzjlx;
      QLRXZdata = res.data.data.ggqlrxz
      JSONData = res.data.data;
      console.log(res.data);
      proxy.optionData = res.data;
      let data1 = res.data.data.djdjb[0]
      let data2 = res.data.data.xssjd[0]
      let data = {};
      for (var key in data1) {
        data[key] = data1[key]
      }
      for (var key in data2) {
        data[key] = data2[key]
      }
      const getData = JSON.parse(JSON.stringify(data));
      proxy.newFormData = getData;
      proxy.newFormData.YDDH = res.data.data.xssjd[0].TZRYDDH;
      proxy.newFormData.DZYJ = res.data.data.xssjd[0].TZRDZYJ;
      proxy.newFormData.GLZH = res.data.data.djdjb[0].XGZH;
      let lclb = res.data.data.xssjd[0].LCLB
      if (lclb == '对私') {
        lclb = '个人业务'
      } else if (lclb == '对公') {
        lclb = '企业业务'
      }
      proxy.newFormData.LCLB = lclb;
    },
    proxy.$http
      .get(
        "/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId
      )
      .then((res) => {
        vFormRef.value.setFormJson(res.data);
        proxy.newFormData.SLBH = route.currentRoute._rawValue.query.slbh;
        proxy.newFormData.SLRY = SLRY;
        proxy.newFormData.SLSJ = CNSJ;
        proxy.newFormData.CNSJ = CNSJ;
        vFormRef.value.setFormData(proxy.newFormData);
        setTimeout(() => {
          let qlrtablelist = document.getElementsByClassName('qlrtablelist')[1]
          let qlrdlrtablelist = document.getElementsByClassName('qlrdlrtablelist')[1]
          let qlrxx = JSONData.qlr;
          function compare(property) {
            return function (a, b) {
              let value1 = a[property];
              let value2 = b[property];
              return value1 - value2;
            }
          }
          qlrxx.sort(compare('SXH'))
          let qlrdata = '';
          let dlrdata = '';
          for (let i = 0; i < qlrxx.length; i++) {
            let DH = qlrxx[i].DH
            if (DH == 'null' || DH == null) {
              DH = ''
            }
            let zjlb = qlrxx[i].ZJLB
            let ZJLB = JSONData.ggzjlx;
            for (let i = 0; i < ZJLB.length; i++) {
              if (zjlb == ZJLB[i].ITEMVAL) {
                zjlb = ZJLB[i].ITEMNAME
              }
            }
            let GYFE = qlrxx[i].GYFE
            if (GYFE == 'null' || GYFE == null) {
              GYFE = ''
            }
            qlrdata += `<tr class='qlrtabletr'>
                      <td class='table-cell' colspan='1' rowspan='1' flex= '1' style='border:1px solid transparent !important;background:transparent;width:7.12%'><input type='checkbox' class='qlrtablecheck'></td>
                      <td style='width:7.12%' :colspan=1>${qlrxx[i].SXH}</td>
                      <td style='width:21.43%' :colspan=3>${qlrxx[i].QLRMC}</td>
                      <td style='width:14.3%' :colspan=2>${zjlb}</td>
                      <td style='width:21.43%' :colspan=3>${qlrxx[i].ZJHM}</td>
                      <td style='width:14.3%' :colspan=2>${GYFE}</td>
                      <td style='width:14.3%' :colspan=2>${DH}</td>
                      </tr>`

          }
          let qlrdlr = JSONData.qlrdlr;
          function compare(property) {
            return function (a, b) {
              let value1 = a[property];
              let value2 = b[property];
              return value1 - value2;
            }
          }
          qlrdlr.sort(compare('SXH'))
          for (let i = 0; i < qlrdlr.length; i++) {
            let DH = qlrdlr[i].DH
            if (DH == 'null' || DH == null) {
              DH = ''
            }
            let zjlb = qlrdlr[i].ZJLB
            let ZJLB = JSONData.ggzjlx;
            for (let i = 0; i < ZJLB.length; i++) {
              if (zjlb == ZJLB[i].ITEMVAL) {
                zjlb = ZJLB[i].ITEMNAME
              }
            }
            dlrdata += `<tr class='dlrtabletr'>
                        <td class='table-cell' colspan='1' rowspan='1' flex= '1' style='border:1px solid transparent !important;background:transparent;width:8.33%'><input type='checkbox' class='dlrtablecheck'></td>
                        <td style='width:8.33%' :colspan=1>${qlrdlr[i].SXH}</td>
                        <td style='width:25%' :colspan=3>${qlrdlr[i].QLRMC}</td>
                        <td style='width:16.67%' :colspan=2>${zjlb}</td>
                        <td style='width:25%' :colspan=3>${qlrdlr[i].ZJHM}</td>
                        <td style='width:16.67%' :colspan=2>${DH}</td>
                        </tr>`
          }
          qlrdata = '<table style="width:100%">' + qlrdata + '</table>'
          dlrdata = '<table style="width:100%">' + dlrdata + '</table>'
          qlrtablelist.innerHTML = qlrdata;
          qlrdlrtablelist.innerHTML = dlrdata;
          // 关联证号弹框table
          let xgzhlist = document.querySelectorAll('.xgzhlist')[0]
          // 权利人弹框table
          let qlrlist = document.querySelectorAll('.qlrlist')[0];
          xgzhlist.innerHTML = '';
          qlrlist.innerHTML = '';
          // 关联证号选择
          let xgzhxz = document.getElementsByClassName('xgzhxz')[0];
          // 关联证号查询
          let xgzhcx = document.getElementsByClassName('xgzhcx')[0];
          // 关联证号重置
          let xgzhcz = document.getElementsByClassName('xgzhcz')[0];
          // 关联证号清空
          let xgzhqk = document.getElementsByClassName('xgzhqk')[0];
          // 关联证号确认
          let xgzhqr = document.getElementsByClassName('xgzhqr')[0];
          xgzhxz.onclick = () => {
            dqzt = 'xgzh'
            proxy.newFormData.ZDTYBM1 = '';
            proxy.newFormData.BDCQZH1 = '';
            proxy.newFormData.SLBH1 = '';
            proxy.newFormData.QLR1 = '';
            proxy.newFormData.TDZL1 = '';
            proxy.newFormData.YWR1 = '';
            proxy.newFormData.XGZHXZSJ = '';
            vFormRef.value.setFormData(proxy.newFormData);
            xgzhlist.innerHTML = '';
          }
          let GLZH;
          xgzhcx.onclick = () => {
            let bdcdyh = document.getElementsByClassName('input')[22].getElementsByTagName('input')[0].value  //宗地统一编码
            let bdczh = document.getElementsByClassName('input')[23].getElementsByTagName('input')[0].value  //不动产权证号
            let slbh = document.getElementsByClassName('input')[24].getElementsByTagName('input')[0].value  //受理编号
            let qlrmc = document.getElementsByClassName('input')[25].getElementsByTagName('input')[0].value  //权利人
            let zl = document.getElementsByClassName('input')[26].getElementsByTagName('input')[0].value  //土地坐落
            let ywrmc = document.getElementsByClassName('input')[27].getElementsByTagName('input')[0].value  //义务人
            let xgzh = "SELECT * FROM (SELECT DISTINCT N'' AS XZ, N'' AS RN,A.SLBH,(select wm_concat(distinct to_char(y.qlrmc)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as qlrmc,(select wm_concat(distinct to_char(y.qlrmc)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '义务人') as yermc, A.BDCZH,b.bdcdyh as bdcdyh,D.ZL,A.ZSLX,f.zjlb,f.zjhm, f.qlrid FROM DJ_DJB A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN ZD_QSDC C ON B.TSTYBM = C.TSTYBM LEFT JOIN DJ_SJD D ON A.SLBH = D.SLBH left join dj_qlrgl e on a.slbh = e.slbh left join dj_qlr f on e.qlrid = f.qlrid WHERE (A.ZSLX = '土地不动产证' OR A.ZSLX = '土地证' OR A.ZSLX = '大土地证') AND A.DJRQ IS NOT NULL AND A.BDCZH IS NOT NULL AND (A.LIFECYCLE IS NULL OR A.LIFECYCLE = 0) AND (B.LIFECYCLE IS NULL OR B.LIFECYCLE = 0) AND (C.LIFECYCLE IS NULL OR C.LIFECYCLE = 0 OR C.LIFECYCLE = -1) AND A.ZSXLH IS NOT NULL AND C.TSTYBM IS NOT NULL AND A.SLBH LIKE '%" + slbh + "%' AND B.BDCDYH LIKE '%" + bdcdyh + "%' AND D.ZL LIKE '%" + zl + "%' AND A.BDCZH LIKE '%" + bdczh + "%' AND EXISTS (SELECT A.SLBH FROM DJ_QLR E INNER JOIN DJ_QLRGL F ON E.QLRID = F.QLRID WHERE A.SLBH = F.SLBH AND E.QLRMC LIKE '%" + qlrmc + "%' AND (F.QLRLX = '权利人' OR F.QLRLX = '抵押权人' OR F.QLRLX IS NULL)) AND EXISTS (SELECT A.SLBH FROM DJ_QLR E INNER JOIN DJ_QLRGL F ON E.QLRID = F.QLRID WHERE A.SLBH = F.SLBH AND E.QLRMC LIKE '%" + ywrmc + "%' AND (F.QLRLX = '义务人' OR F.QLRLX = '抵押人')))ORDER BY ZL, BDCZH, SLBH";
            proxy.$http.post("/test/sqls", { 'xgzh': xgzh }).then((res) => {
              let arr = res.data.data.xgzh;
              let xgzh = '';
              for (let i = 0; i < arr.length; i++) {
                let mm = `<tr class='aaa'>
                  <td style='width:7.69%'>${i + 1}</td>
                  <td style='width:15.38%' :colspan=2>${arr[i].SLBH}</td>
                  <td style='width:15.38%' :colspan=2>${arr[i].QLRMC}</td>
                  <td style='width:15.38%' :colspan=2>${arr[i].YERMC}</td>
                  <td style='width:23.07%' :colspan=3>${arr[i].BDCZH}</td>
                  <td style='width:23.07%' :colspan=3>${arr[i].ZL}</td>
                  </tr>`
                xgzh += mm
              }
              xgzh = '<table>' + xgzh + '</table>'
              xgzhlist.innerHTML = xgzh;

            })
          }
          xgzhcz.onclick = () => {
            proxy.newFormData.ZDTYBM1 = '';
            proxy.newFormData.BDCQZH1 = '';
            proxy.newFormData.SLBH1 = '';
            proxy.newFormData.QLR1 = '';
            proxy.newFormData.TDZL1 = '';
            proxy.newFormData.YWR1 = '';
            vFormRef.value.setFormData(proxy.newFormData);
          }
          xgzhqk.onclick = () => {
            proxy.newFormData.XGZHXZSJ = '';
            vFormRef.value.setFormData(proxy.newFormData);
          }
          xgzhqr.onclick = () => {
            proxy.newFormData.GLZH = GLZH[0]
            proxy.newFormData.ZL = GLZH[1]
            vFormRef.value.setFormData(proxy.newFormData);
          }
          document.addEventListener('click', function (e) {
            if (dqzt == 'xgzh') {
              let checkbxgzh = document.getElementsByClassName('aaa')
              let array = [];
              for (let i = 0; i < checkbxgzh.length; i++) {
                let row = checkbxgzh[i]
                let arr = [];
                for (let j = 0; j < 6; j++) {
                  let id = row.cells[j].innerHTML;
                  arr.push(id)
                }
                array.push(arr)
              }
              let aaa = e.target.innerHTML;
              let trdata
              for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                  if (array[i][j] == aaa) {
                    trdata = array[i]
                  }
                }
              }
              GLZH = [trdata[4], trdata[5]];
              let XGZHXZSJ = '【' + trdata[1] + '；' + trdata[4] + '；' + trdata[5] + '】'
              proxy.newFormData.XGZHXZSJ = XGZHXZSJ;
              vFormRef.value.setFormData(proxy.newFormData);
            } else if (dqzt == 'qlr') {
              // let checkAll = document.getElementsByClassName('el-checkbox__input')[2]
              // let check = document.getElementsByClassName('ccc')
              // checkAll.onclick = () => {
              //   console.log('1111', checkAll, document.getElementsByTagName('input')[36].checked);
              //   if (document.getElementsByTagName('input')[36].checked) {
              //     for (let i = 0; i < check.length; i++) {
              //       check[i].checked = true;
              //     }
              //   } else {
              //     for (let i = 0; i < check.length; i++) {
              //       check[i].checked = false;
              //     }
              //   }
              // }
              // for(let i=0;i<check.length;i++){
              //   if(check[i].checked=false){
              //     document.getElementsByTagName('input')[36].checked=false
              //   }
              // }
            }
          })
          // 权利人选择
          let qlrxz = document.getElementsByClassName('qlrxz')[0]
          // 权利人新增
          let qlrnew = document.getElementsByClassName('new')[0]
          // 权利人删除
          let qlrdelete = document.getElementsByClassName('qlrdelete')[0]
          // 代理人选择
          let dlrxz = document.getElementsByClassName('qlrdlrxz')[0]
          // 代理人新增
          let dlrnew = document.getElementsByClassName('qlrdlrnew')[0]
          // 代理人删除
          let dlrdelete = document.getElementsByClassName('qlrdlrdelete')[0]
          // 权利人查询
          let qlrcx = document.getElementsByClassName('qlrcx')[0]
          // 权利人重置
          let qlrcz = document.getElementsByClassName('qlrcz')[0]
          // 权利人确认
          let qlrqr = document.getElementsByClassName('qlrqr')[0]
          qlrxz.onclick = () => {
            dqzt = 'qlr'
            proxy.newFormData.QLRMC1 = '';
            proxy.newFormData.QLRXZ1 = '';
            proxy.newFormData.ZJZL1 = '';
            proxy.newFormData.ZJBH1 = '';
            vFormRef.value.setFormData(proxy.newFormData);
            qlrlist.innerHTML = '';
          }
          dlrxz.onclick = () => {
            dqzt = 'dlr'
            proxy.newFormData.QLRMC1 = '';
            proxy.newFormData.QLRXZ1 = '';
            proxy.newFormData.ZJZL1 = '';
            proxy.newFormData.ZJBH1 = '';
            vFormRef.value.setFormData(proxy.newFormData);
            qlrlist.innerHTML = '';
          }
          qlrdelete.onclick = () => {
            let alldata = document.getElementsByClassName('qlrtabletr');
            let check = document.getElementsByClassName('qlrtablecheck');
            let data = [];
            let array = [];
            for (let i = 0; i < alldata.length; i++) {
              if (check[i].checked) {
              } else {
                let row = alldata[i];
                let arr = [];
                for (let j = 0; j < 6; j++) {
                  let id = row.cells[j].innerHTML;
                  arr.push(id)
                }
                array.push(arr)
                data.push(QLRXX1[i])
              }
            }
            QLRXX1 = data;
            QLRTABLE = array;
            let qlrtablelist = document.getElementsByClassName('qlrtablelist')[1]
            let qlrlist = '';
            for (let i = 0; i < array.length; i++) {
              let mm = `<tr class='qlrtabletr'>
                    <td class='table-cell' colspan='1' rowspan='1' flex= '1' style='border:1px solid transparent !important;background:transparent;width:7.12%'><input type='checkbox' class='qlrtablecheck'></td>
                    <td style='width:7.12%' :colspan=1>${i + 1}</td>
                    <td style='width:21.43%' :colspan=3>${array[i][2]}</td>
                    <td style='width:14.3%' :colspan=2>${array[i][3]}</td>
                    <td style='width:21.43%' :colspan=3>${array[i][4]}</td>
                    <td style='width:14.3%' :colspan=2></td>
                    <td style='width:14.3%' :colspan=2>${array[i][5]}</td>
                    </tr>`
              qlrlist += mm
            }
            setTimeout(() => {
              qlrlist = '<table style="width:100%">' + qlrlist + '</table>'
              qlrtablelist.innerHTML = qlrlist;
            }, 100)
          }
          dlrdelete.onclick = () => {
            let alldata = document.getElementsByClassName('dlrtabletr');
            let check = document.getElementsByClassName('dlrtablecheck');
            let data = [];
            let array = [];
            for (let i = 0; i < alldata.length; i++) {
              if (check[i].checked) {
              } else {
                let row = alldata[i];
                let arr = [];
                for (let j = 0; j < 6; j++) {
                  let id = row.cells[j].innerHTML;
                  arr.push(id)
                }
                array.push(arr)
                data.push(QLRDLRXX1[i])
              }
            }
            QLRDLRXX1 = data;
            console.log('qlrdlrxx', QLRDLRXX1);
            QLRDLRTABLE = array;
            let qlrtablelist = document.getElementsByClassName('qlrdlrtablelist')[1]
            let qlrlist = '';
            for (let i = 0; i < array.length; i++) {
              let mm = `<tr class='dlrtabletr'>
                    <td class='table-cell' colspan='1' rowspan='1' flex= '1' style='border:1px solid transparent !important;background:transparent;width:7.12%'><input type='checkbox' class='dlrtablecheck'></td>
                    <td style='width:7.12%' :colspan=1>${i + 1}</td>
                    <td style='width:21.43%' :colspan=3>${array[i][2]}</td>
                    <td style='width:14.3%' :colspan=2>${array[i][3]}</td>
                    <td style='width:21.43%' :colspan=3>${array[i][4]}</td>
                    <td style='width:14.3%' :colspan=2></td>
                    <td style='width:14.3%' :colspan=2>${array[i][5]}</td>
                    </tr>`
              qlrlist += mm
            }
            setTimeout(() => {
              qlrlist = '<table style="width:100%">' + qlrlist + '</table>'
              qlrtablelist.innerHTML = qlrlist;
            }, 100)

          }
          qlrcx.onclick = () => {
            let QLRMC = document.getElementsByClassName('input')[30].getElementsByTagName('input')[0].value  //权利人名称
            let QLRXZ = document.getElementsByClassName('input')[31].getElementsByTagName('input')[0].value  //权利人性质
            let ZJLB = document.getElementsByClassName('input')[32].getElementsByTagName('input')[0].value  //证件种类
            let ZJHM = document.getElementsByClassName('input')[33].getElementsByTagName('input')[0].value  //证件编号
            for (let i = 0; i < ZJLBdata.length; i++) {
              if (ZJLB == ZJLBdata[i].ITEMNAME) {
                ZJLB = ZJLBdata[i].ITEMVAL;
              }
            }
            for (let i = 0; i < QLRXZdata.length; i++) {
              if (QLRXZ == QLRXZdata[i].ITEMNAME) {
                QLRXZ = QLRXZdata[i].ITEMVAL;
              }
            }
            console.log(QLRMC, 1, QLRXZ, 2, ZJLB, 3, ZJHM)
            let qlr = "SELECT DISTINCT N'' AS XZ,ROWNUM AS RN,QLRMC,ZJLB,ZJHM,DH,QLRID,FRDBXM,FRDBZJH FROM DJ_QLR WHERE ZJHM IS NOT NULL  AND QLRMC LIKE '%" + QLRMC + "%'  AND ZJHM LIKE '%" + ZJHM + "%'  AND QLRXZ like '%" + QLRXZ + "%' AND ZJLB like '%" + ZJLB + "%'"
            proxy.$http.post("/test/sqls", { 'qlr': qlr }).then((res) => {
              let arr = res.data.data.qlr;
              qlrxxdata = arr;
              let qlrxx = '';
              for (let i = 0; i < arr.length; i++) {
                let DH = arr[i].DH
                if (DH == 'null' || DH == null) {
                  DH = ''
                }
                let zjlb = arr[i].ZJLB
                let ZJLB = JSONData.ggzjlx;
                for (let i = 0; i < ZJLB.length; i++) {
                  if (zjlb == ZJLB[i].ITEMVAL) {
                    zjlb = ZJLB[i].ITEMNAME
                  }
                }
                let mm = `<tr class='bbb'>
                  <td class='table-cell' colspan='1' rowspan='1' flex= '1' style='border:1px solid transparent !important;background:transparent;width:7.69%'><input type='checkbox' class='ccc'></td>
                  <td style='width:15.38%' :colspan=2>${i + 1}</td>
                  <td style='width:15.38%' :colspan=2>${arr[i].QLRMC}</td>
                  <td style='width:15.38%' :colspan=2>${zjlb}</td>
                  <td style='width:23.07%' :colspan=3>${arr[i].ZJHM}</td>
                  <td style='width:23.07%' :colspan=3>${DH}</td>
                  </tr>`
                qlrxx += mm
              }
              qlrxx = '<table style="width:100%">' + qlrxx + '</table>'
              qlrlist.innerHTML = qlrxx;
            })
          }
          qlrcz.onclick = () => {
            proxy.newFormData.QLRMC1 = '';
            proxy.newFormData.QLRXZ1 = '';
            proxy.newFormData.ZJZL1 = '';
            proxy.newFormData.ZJBH1 = '';
            vFormRef.value.setFormData(proxy.newFormData);
          }
          qlrqr.onclick = () => {
            let qlrlist = document.getElementsByClassName('bbb')
            let check = document.getElementsByClassName('ccc')
            let array = [];
            let xzdaata = [];
            for (let i = 0; i < qlrlist.length; i++) {
              if (check[i].checked) {
                let row = qlrlist[i];
                let arr = [];
                for (let j = 0; j < 6; j++) {
                  let id = row.cells[j].innerHTML;
                  arr.push(id)
                }
                array.push(arr)
                xzdaata.push(qlrxxdata[i])
              }
            }
            if (dqzt == 'qlr') {
              QLRXX1 = QLRXX1.concat(xzdaata)
              let data = QLRTABLE.concat(array)
              QLRTABLE = data;
              let qlrtablelist = document.getElementsByClassName('qlrtablelist')[1]
              let qlrlist = '';
              for (let i = 0; i < data.length; i++) {
                let DH = data[i][5]
                if (DH == 'null' || DH == null) {
                  DH = ''
                }
                let zjlb = data[i][3]
                let ZJLB = JSONData.ggzjlx;
                for (let i = 0; i < ZJLB.length; i++) {
                  if (zjlb == ZJLB[i].ITEMVAL) {
                    zjlb = ZJLB[i].ITEMNAME
                  }
                }
                let mm = `<tr class='qlrtabletr'>
                    <td class='table-cell' colspan='1' rowspan='1' flex= '1' style='border:1px solid transparent !important;background:transparent;width:7.12%'><input type='checkbox' class='qlrtablecheck'></td>
                    <td style='width:7.12%' :colspan=1>${i + 1}</td>
                    <td style='width:21.43%' :colspan=3>${data[i][2]}</td>
                    <td style='width:14.3%' :colspan=2>${zjlb}</td>
                    <td style='width:21.43%' :colspan=3>${data[i][4]}</td>
                    <td style='width:14.3%' :colspan=2></td>
                    <td style='width:14.3%' :colspan=2>${DH}</td>
                    </tr>`
                qlrlist += mm
              }
              setTimeout(() => {
                qlrlist = '<table style="width:100%">' + qlrlist + '</table>'
                qlrtablelist.innerHTML = qlrlist;
              }, 100)
            } else if (dqzt == 'dlr') {
              QLRDLRXX1 = QLRDLRXX1.concat(xzdaata)
              console.log('qlrdlrxx1', QLRDLRXX1);
              let data = QLRDLRTABLE.concat(array)
              QLRDLRTABLE = data;
              let qlrtablelist = document.getElementsByClassName('qlrdlrtablelist')[1]
              let qlrlist = '';
              for (let i = 0; i < data.length; i++) {
                let DH = data[i][5]
                if (DH == 'null' || DH == null) {
                  DH = ''
                }
                let zjlb = data[i][3]
                let ZJLB = JSONData.ggzjlx;
                for (let i = 0; i < ZJLB.length; i++) {
                  if (zjlb == ZJLB[i].ITEMVAL) {
                    zjlb = ZJLB[i].ITEMNAME
                  }
                }
                let mm = `<tr class='dlrtabletr'>
                    <td class='table-cell' colspan='1' rowspan='1' flex= '1' style='border:1px solid transparent !important;background:transparent;width:8.33%'><input type='checkbox' class='dlrtablecheck'></td>
                    <td style='width:8.33%' :colspan=1>${i + 1}</td>
                    <td style='width:25%' :colspan=3>${data[i][2]}</td>
                    <td style='width:16.67%' :colspan=2>${zjlb}</td>
                    <td style='width:25%' :colspan=3>${data[i][4]}</td>
                    <td style='width:16.67%' :colspan=2>${DH}</td>
                    </tr>`
                qlrlist += mm
              }
              setTimeout(() => {
                qlrlist = '<table style="width:100%">' + qlrlist + '</table>'
                qlrtablelist.innerHTML = qlrlist;
              }, 100)
            }
          }
        }, 1000)
      })
  );
};
//读取第一个下拉框数据
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
//获取第二个下拉框name的数据
const databd = (val) => {
  form.namedata = val;
};
const preservation = () => {
  let slbh = document.getElementsByClassName('input')[0].getElementsByTagName('input')[0].value  //受理编号
  let djdl = document.getElementsByClassName('input')[1].getElementsByTagName('input')[0].value  //登记大类
  for (let i = 0; i < JSONData.ggdjdl.length; i++) {
    if (slbh == JSONData.ggdjdl[i].ITEMNAME) {
      slbh = JSONData.ggdjdl[i].ITEMVAL
    }
  }
  let djxl = document.getElementsByClassName('input')[2].getElementsByTagName('input')[0].value  //登记小类
  let lclx = djxl.split('（')[0]
  let djyy = document.getElementsByClassName('input')[3].getElementsByTagName('input')[0].value  //登记原因 
  let glzh = document.getElementsByClassName('input')[4].getElementsByTagName('input')[0].value  //关联证号
  let lclb = document.getElementsByClassName('input')[5].getElementsByTagName('input')[0].value  //流程类别
  for (let i = 0; i < JSONData.gglclb.length; i++) {
    if (lclb == JSONData.gglclb[i].ITEMNAME) {
      lclb = JSONData.gglclb[i].ITEMVAL
    }
  }
  let gyfs = document.getElementsByClassName('input')[6].getElementsByTagName('input')[0].value  //共有方式
  for (let i = 0; i < JSONData.gggyfs.length; i++) {
    if (gyfs == JSONData.gggyfs[i].ITEMNAME) {
      gyfs = JSONData.gggyfs[i].ITEMVAL
    }
  }
  let thyy = document.getElementsByClassName('input')[7].getElementsByTagName('input')[0].value  //退回原因
  let sjr = document.getElementsByClassName('input')[8].getElementsByTagName('input')[0].value  //受理人员
  let zrr = document.getElementsByClassName('input')[8].getElementsByTagName('input')[0].value
  let slsj = document.getElementsByClassName('input')[9].getElementsByTagName('input')[0].value  //受理时间
  let zrks = document.getElementsByClassName('input')[10].getElementsByTagName('input')[0].value  //受理科室
  let cnsj = document.getElementsByClassName('input')[11].getElementsByTagName('input')[0].value  //承诺时间
  let yxj = document.getElementsByClassName('input')[12].getElementsByTagName('input')[0].value  //优先级
  for (let i = 0; i < JSONData.ggyxj.length; i++) {
    if (yxj == JSONData.ggyxj[i].ITEMNAME) {
      yxj = JSONData.ggyxj[i].ITEMVAL
    }
  }
  let qxdm = document.getElementsByClassName('input')[13].getElementsByTagName('input')[0].value  //不动产所在区域
  for (let i = 0; i < JSONData.ggssxq.length; i++) {
    if (qxdm == JSONData.ggssxq[i].ITEMNAME) {
      qxdm = JSONData.ggssxq[i].ITEMNOTE
    }
  }
  let cxmm = document.getElementsByClassName('input')[14].getElementsByTagName('input')[0].value  //查询密码
  let tzrxm = document.getElementsByClassName('input')[15].getElementsByTagName('input')[0].value  //通知人姓名
  let tzfs = document.getElementsByClassName('input')[16].getElementsByTagName('input')[0].value  //通知方式
  for (let i = 0; i < JSONData.ggtzfs.length; i++) {
    if (tzfs == JSONData.ggtzfs[i].ITEMNAME) {
      tzfs = JSONData.ggtzfs[i].ITEMVAL
    }
  }
  let tzryddh = document.getElementsByClassName('input')[17].getElementsByTagName('input')[0].value  //移动电话
  let tzrdh = document.getElementsByClassName('input')[18].getElementsByTagName('input')[0].value  //通知人电话
  let tzrdzyj = document.getElementsByClassName('input')[19].getElementsByTagName('input')[0].value  //电子邮件
  let zl = document.getElementsByClassName('input')[20].getElementsByTagName('input')[0].value  //坐落
  let sjbz = document.getElementsByClassName('input')[21].getElementsByTagName('textarea')[0].value  //收件备注
  console.log('JSONData', JSONData);
  let lcmc = '收件'; let tzrtxdz = ''; let xczp = '';//现场照片 
  let prjid = ''; let qxkz = ''; //辖区控制
  let cgzt = 0;
  // prjid,lclx
  // slbh,djdl,djxl,lclx,zl,qxdm,tzrxm,tzfs,tzrdh,tzryddh,tzrdzyj,tzrtxdz,cxmm,zrks,zrr,yxj,sjbz,xc
  let djsjd = "insert into dj_sjd (slbh,djdl, djxl, lclx,lcmc,zl,sjr,sjsj,cnsj,qxdm,tzrxm,tzfs,tzrdh,tzryddh,tzrdzyj,tzrtxdz,cxmm,zrks,zrr, yxj,sjbz,xczp,prjid,qxkz, cgzt , lclb) values ('" + slbh + "','" + djdl + "','" + djxl + "','" + lclx + "','" + lcmc + "','" + zl + "','" + sjr + "',to_date(to_char(sysdate,'yyyy/MM/dd hh24:mi:ss'),'yyyy/MM/dd hh24:mi:ss'),to_date(to_char(sysdate,'yyyy/MM/dd hh24:mi:ss'),'yyyy/MM/dd hh24:mi:ss'),'" + qxdm + "','" + tzrxm + "','" + tzfs + "','" + tzrdh + "','" + tzryddh + "','" + tzrdzyj + "','" + tzrtxdz + "','" + cxmm + "','" + zrks + "','" + zrr + "','" + yxj + "','" + sjbz + "','" + xczp + "','" + prjid + "','" + qxkz + "','" + cgzt + "','" + lclb + "')";
  let sqfbcz = '';  //申请分别持证

  let djdjb = "insert  into  dj_djb(slbh,djlx,djyy,sqfbcz,sqrq,gyfs,xgzh)values('" + slbh + "','" + djdl + "','" + djyy + "','" + sqfbcz + "',to_date('" + slsj + "','yyyy-MM-dd hh24:mi:ss'),'" + gyfs + "','" + glzh + "')"
  proxy.$http.post("/test/sqls", { djsjd: djsjd, djdjb: djdjb }).then((res) => {
    console.log('写入', res);
  })
  for (let i = 0; i < QLRXX1.length; i++) {
    axios.post("/test/glbm").then((res) => {
      let glbm = res.data.qlrglbm;
      let gyfs = ''
      let qlrlx = '权利人'
      let sxh = i + 1;
      let djqlrgl1 = "insert into dj_qlrgl(glbm,slbh,qlrid,gyfs,sxh,qlrlx,qlrmc) values ('" + glbm + "','" + slbh + "','" + QLRXX1[i].QLRID + "','" + gyfs + "','" + sxh + "','" + qlrlx + "','" + QLRXX1[i].QLRMC + "')";
      setTimeout(() => {
        proxy.$http.post("/test/sqls", { djqlrgl1: djqlrgl1 }).then((res) => {
          console.log('权利人写入', res);
        })
      })
    })
  }
  for (let i = 0; i < QLRDLRXX1.length; i++) {
    axios.post("/test/glbm").then((res) => {
      let glbm = res.data.qlrdlrglbm;
      let qlrlx = '权利人代理人'
      let sxh = i + 1;
      let djqlrgl2 = "insert into dj_qlrgl(glbm,slbh,qlrid,sxh,qlrlx,qlrmc) values ('" + glbm + "','" + slbh + "','" + QLRDLRXX1[i].QLRID + "','" + sxh + "','" + qlrlx + "','" + QLRDLRXX1[i].QLRMC + "')";
      setTimeout(() => {
        proxy.$http.post("/test/sqls", { djqlrgl2: djqlrgl2 }).then((res) => {
          console.log('权利人代理人写入', res);
        })
      })
    })
  }

}
// 通过
const confirm = () => {
  proxy.$http
    .get(
      " /flow/SCDJ/audit?variate=yes&taskId=" +
      taskId +
      "&taskName=" +
      taskName.slice(-2) +
      "&users=slusers&user=" +
      proxy.ID +
      "&name=" +
      form.namedata
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
  slr();
});
</script>

<style>
.formcontent {
  width: 90%;
  margin: 0 auto;
}
</style>
