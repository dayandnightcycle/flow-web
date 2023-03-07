<template>
  <div>
    <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
    </v-form-render>

    <el-dialog v-model="zsdialogVisible" title="不动产追溯" width="1000px !important" :before-close="dialogVisible = false"
               class="ywdialog" style="margin-left: 400px;width: 1200px;">
      <!--    <el-dialog v-model="zsdialogVisible" title="不动产追溯" :width="dialogwidth" :before-close="dialogVisible = false"-->
      <!--               class="ywdialog" style="margin-left: 400px;width: 1200px;">-->
      <!--追溯详细信息-->
      <div style="display:flex;flex-direction:column;width: 300px;height:100%;float: left;overflow: auto">
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
          <template #default="{ data }">
            <span :class="data.icon" :style="data.style"></span>
            {{ data.label }}
          </template>
        </el-tree>
      </div>
      <div style="display:flex;width:70%;height:200px;float: left;z-index: 2;overflow: auto;border: 1px solid #3f3737">
        <!--空白页-->
        <!--        <v-form-render :form-json="formJson1" :form-data="formData1" :option-data="optionData1" ref="vFormRef2">-->

        <!--        </v-form-render>-->
        <v-form-render :form-json="formJson1" :form-data="formData1" :option-data="optionData1" ref="shangxiaji">

        </v-form-render>

      </div>


    </el-dialog>
  </div>

</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import zsjson from '../../json/新追溯/zs_index.json';
import ji from '../../json/新追溯/追溯_上下级.json';

const formJson = reactive({});
const formData = reactive({});
const optionData = reactive({});
const formJson1 = reactive({});
const formData1 = reactive({});
const optionData1 = reactive({});


let vFormRef = ref(null);
let vFormRef2 = ref(null);
let shangxiaji = ref(null);

const tstybmdata = ref();
const zsdialogVisible = ref(false)
const zs = () => {
  vFormRef.value.setFormJson(zsjson);

}
const dialogjson = () => {
  // vFormRef2.value.setFormJson(xxxxjson);
  shangxiaji.value.setFormJson(ji);

}
//树结构数据
const treeData = ref();
const defaultProps = {
  children: 'children',
  label: 'label',
}
const handleNodeClick = (data) => {
  let label = data.label;
  let slbh = data.slbh;
  let ywlx = "";
  let syt;// 二维数组存储slbh ywlx tstybm
  if (Format(label) != "") {
    if (label.indexOf("楼盘-") != -1) {
      showLPBInfo(slbh);
    } else if (label.indexOf("抵押-") != -1) {
      showZSData(slbh, "抵押")
    } else if (label.indexOf("查封-") != -1) {
      showZSData(slbh, "查封")
    } else if (label.indexOf("解封-") != -1) {
      showZSData(slbh, "解封")
    } else if (label.indexOf("异议-") != -1) {
      showZSData(slbh, "异议")
    } else if (label.indexOf("注销-") != -1) {
      showZSData(slbh, "注销")
    } else if (label.indexOf("预告-") != -1) {
      showZSData(slbh, "预告")
    } else {
      showZSData(slbh, "证书")
    }
  }

  function showZSData(slbh, type) {
    var DQSql = "";
    var SJSql = "";
    var XJSql = "";
    if (type == "解封") {
      DQSql = "SELECT DISTINCT A.SLBH,Nvl(A.DJLX,'解封登记') AS DJLX,B.BDCDYH,Nvl(C.XGZH,A.XGZH),N'解封' AS YWLX,B.TSTYBM FROM DJ_XGDJZX A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.SLBH = '" + slbh + "' AND ROWNUM < 2";
    } else if (type == "注销") {
      DQSql = "SELECT DISTINCT A.SLBH,Nvl(A.DJLX,'注销登记') AS DJLX,B.BDCDYH,Nvl(C.XGZH,A.XGZH),N'注销' AS YWLX,B.TSTYBM FROM DJ_XGDJZX A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.SLBH = '" + slbh + "' AND ROWNUM < 2";
    } else {
      DQSql = "SELECT DISTINCT A.SLBH,A.DJLX,B.BDCDYH,A.BDCZH,A.LIFECYCLE,A.DJRQ,N'权证' AS YWLX,B.TSTYBM FROM DJ_DJB A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH = '" + slbh + "'";
      SJSql = "SELECT DISTINCT A.SLBH,A.DJLX,B.BDCDYH,A.BDCZH,A.LIFECYCLE,A.DJRQ,N'权证' AS YWLX,B.TSTYBM FROM DJ_DJB A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH IN(SELECT FSLBH FROM DJ_XGDJGL WHERE ZSLBH = '" + slbh + "') ";
      XJSql = "SELECT DISTINCT A.SLBH,A.DJLX,B.BDCDYH,A.BDCZH,A.LIFECYCLE,A.DJRQ,N'权证' AS YWLX,B.TSTYBM FROM DJ_DJB A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH IN(SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH = '" + slbh + "') ";

      DQSql += " UNION ALL ";
      SJSql += " UNION ALL ";
      XJSql += " UNION ALL ";

      DQSql += " SELECT DISTINCT A.SLBH,A.DJLX,B.BDCDYH,A.BDCZMH AS BDCZH,A.LIFECYCLE,A.DJRQ,N'预告' AS YWLX,B.TSTYBM FROM DJ_YG A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH = '" + slbh + "'";
      SJSql += " SELECT DISTINCT A.SLBH,A.DJLX,B.BDCDYH,A.BDCZMH AS BDCZH,A.LIFECYCLE,A.DJRQ,N'预告' AS YWLX,B.TSTYBM FROM DJ_YG A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH IN(SELECT FSLBH FROM DJ_XGDJGL WHERE ZSLBH = '" + slbh + "') ";
      XJSql += " SELECT DISTINCT A.SLBH,A.DJLX,B.BDCDYH,A.BDCZMH AS BDCZH,A.LIFECYCLE,A.DJRQ,N'预告' AS YWLX,B.TSTYBM FROM DJ_YG A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH IN(SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH = '" + slbh + "') ";

      DQSql += " UNION ALL ";
      SJSql += " UNION ALL ";
      XJSql += " UNION ALL ";

      DQSql += " SELECT DISTINCT A.SLBH,A.DJLX,B.BDCDYH,A.BDCZMH AS BDCZH,A.LIFECYCLE,A.DJRQ,N'抵押' AS YWLX,B.TSTYBM FROM DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH = '" + slbh + "'";
      SJSql += " SELECT DISTINCT A.SLBH,A.DJLX,B.BDCDYH,A.BDCZMH AS BDCZH,A.LIFECYCLE,A.DJRQ,N'抵押' AS YWLX,B.TSTYBM FROM DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH IN(SELECT FSLBH FROM DJ_XGDJGL WHERE ZSLBH = '" + slbh + "') ";
      XJSql += " SELECT DISTINCT A.SLBH,A.DJLX,B.BDCDYH,A.BDCZMH AS BDCZH,A.LIFECYCLE,A.DJRQ,N'抵押' AS YWLX,B.TSTYBM FROM DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH IN(SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH = '" + slbh + "') ";

      DQSql += " UNION ALL ";
      SJSql += " UNION ALL ";
      XJSql += " UNION ALL ";

      DQSql += " SELECT DISTINCT A.SLBH,A.CFLX,B.BDCDYH,A.CFBH AS BDCZH,A.LIFECYCLE,A.DJSJ AS DJRQ,N'查封' AS YWLX,B.TSTYBM FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH = '" + slbh + "'";
      SJSql += " SELECT DISTINCT A.SLBH,A.CFLX,B.BDCDYH,A.CFBH AS BDCZH,A.LIFECYCLE,A.DJSJ AS DJRQ,N'查封' AS YWLX,B.TSTYBM FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH IN(SELECT FSLBH FROM DJ_XGDJGL WHERE ZSLBH = '" + slbh + "') ";
      XJSql += " SELECT DISTINCT A.SLBH,A.CFLX,B.BDCDYH,A.CFBH AS BDCZH,A.LIFECYCLE,A.DJSJ AS DJRQ,N'查封' AS YWLX,B.TSTYBM FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH IN(SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH = '" + slbh + "') ";

      DQSql += " UNION ALL ";
      SJSql += " UNION ALL ";
      XJSql += " UNION ALL ";

      DQSql += " SELECT DISTINCT A.SLBH,N'异议登记' AS DJLX,B.BDCDYH,A.BDCZMH AS BDCZH,A.LIFECYCLE,A.DJRQ,N'异议' AS YWLX,B.TSTYBM FROM DJ_YY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH = '" + slbh + "'";
      SJSql += " SELECT DISTINCT A.SLBH,N'异议登记' AS DJLX,B.BDCDYH,A.BDCZMH AS BDCZH,A.LIFECYCLE,A.DJRQ,N'异议' AS YWLX,B.TSTYBM FROM DJ_YY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH IN(SELECT FSLBH FROM DJ_XGDJGL WHERE ZSLBH = '" + slbh + "') ";
      XJSql += " SELECT DISTINCT A.SLBH,N'异议登记' AS DJLX,B.BDCDYH,A.BDCZMH AS BDCZH,A.LIFECYCLE,A.DJRQ,N'异议' AS YWLX,B.TSTYBM FROM DJ_YY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH WHERE A.SLBH IN(SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH = '" + slbh + "') ";
    }
    let config = {
      headers: {"Content-Type": "application/json"},
    };
    var DQSJXJ =
        {
          DQquery: DQSql,
          SJquery: SJSql,
          XJquery: XJSql,

        }
    axios.post("http://127.0.0.1:8079/test/sqls", DQSJXJ, config).then((res) => {
      console.log("DQSJXJ", res.data)
      var DQData = res.data.data.DQquery;
      var SJData = res.data.data.SJquery;
      var XJData = res.data.data.XJquery;
      var max = DQData.length;
      if
      (SJData.length > max) {
        max = SJData.length;
      } else if (XJData.length > max) {
        max = XJData.length;
      }


      //当前信息start
      if (DQData.length > 0) {
        var DQInfo = "";
        var secColumn = document.getElementsByClassName("dq")[0];
        secColumn.style = "font-size:10px;text-align:left;color:#000000";
        console.log("secsec", secColumn);
        for (var i = 0; i < DQData.length; i++) {

          DQInfo += Format(DQData[i].SLBH) + "<br>" + Format(DQData[i].DJLX) + "<br>" + Format(DQData[i].BDCDYH) + "<br>" + Format(DQData[i].BDCZH) + "<br>";
          if (type != "注销") {
            if (Format(DQData[i].LIFECYCLE) == "1") {
              DQInfo += "状态: 历史 ";
            } else if (Format(DQData[i].DJRQ) == "") {
              DQInfo += "状态: 办理中 ";
            } else {
              DQInfo += "状态: 现实 ";
            }
            DQInfo += "<hr>";

          }
          //TODO slbh tstybm ywlx 没存

        }
        secColumn.innerHTML = DQInfo;
      }
      //当前信息end
      //上级信息start
      if (SJData.length > 0) {
        var SJInfo = "";
        var firColumn = document.getElementsByClassName("sj")[0];
        firColumn.style = "font-size:10px;text-align:left;color:#000000";

        console.log("firColumn", firColumn);
        for (var i = 0; i < SJData.length; i++) {


          SJInfo += Format(SJData[i].SLBH) + "<br>" + Format(SJData[i].DJLX) + "<br>" + Format(SJData[i].BDCDYH) + "<br>" + Format(SJData[i].BDCZH) + "<br>";

          if (Format(SJData[i].LIFECYCLE) == "1") {
            SJInfo += "状态: 历史 ";
          } else if (Format(SJData[i].DJRQ) == "") {
            SJInfo += "状态: 办理中 ";
          } else {
            SJInfo += "状态: 现实 ";
          }
          SJInfo += "<hr>";

          //TODO slbh tstybm ywlx 没存

        }

        firColumn.innerHTML = SJInfo;
      }
      //上级信息end
      //下级信息start
      if (XJData.length > 0) {
        var XJInfo = "";
        var thiColumn = document.getElementsByClassName("xj")[0];
        thiColumn.style = "font-size:10px;text-align:left;color:#000000";

        console.log("thiColumn", thiColumn);
        for (var i = 0; i < XJData.length; i++) {


          XJInfo += Format(XJData[i].SLBH) + "<br>" + Format(XJData[i].DJLX) + "<br>" + Format(XJData[i].BDCDYH) + "<br>" + Format(XJData[i].BDCZH) + "<br>";

          if (Format(XJData[i].LIFECYCLE) == "1") {
            XJInfo += "状态: 历史 ";
          } else if (Format(XJData[i].DJRQ) == "") {
            XJInfo += "状态: 办理中 ";
          } else {
            XJInfo += "状态: 现实 ";
          }
          XJInfo += "<hr>";
          //TODO slbh tstybm ywlx 没存

        }
        console.log("xiaji_INFO", XJInfo)
        thiColumn.innerHTML = XJInfo;
      }
      //下级信息end
    })

  }

  function Format(sVal) {
    if (sVal == null || sVal + "" == "null" || typeof (sVal) == "undefined") {
      return "";
    } else {
      return "" + sVal;
    }
  }
}

const query = () => {

  setTimeout(() => {
    let button_cx = document.getElementsByClassName('button_cx')[0];
    let table = document.getElementsByTagName('table')[2];
    table.style = "font-size:12px";
    button_cx.onclick = () => {
      let slbh = document.getElementsByTagName('input')[0].value;
      let bdczh = document.getElementsByTagName('input')[1].value;
      let bdcdyh = document.getElementsByTagName('input')[2].value;
      let fzrqs = document.getElementsByTagName('input')[3].value;
      let fzrqe = document.getElementsByTagName('input')[4].value;
      let qlrmc = document.getElementsByTagName('input')[5].value;
      let qlrzjh = document.getElementsByTagName('input')[6].value;
      let zsxlh = document.getElementsByTagName('input')[7].value;
      let zl = document.getElementsByTagName('input')[8].value;
      let sjlszt = document.getElementsByTagName('input')[9].value;
      let dah = document.getElementsByTagName('input')[10].value;

      function getWhere() {
        var sqlWhere = "";
        if (slbh != "") {
          sqlWhere += "  AND A.SLBH LIKE '%" + slbh + "%'";
        }
        if (bdczh != "") {
          sqlWhere += " AND A.BDCZH LIKE '%" + bdczh + "%'";
        }
        if (bdcdyh != "") {
          sqlWhere += " AND B.BDCDYH LIKE '%" + bdcdyh + "%' ";
        }

        if (fzrqs != '') {
          sqlWhere += "AND A.DJRQ >= TO_DATE('" + fzrqs + " 00:00:00', 'YYYY-MM-DD hh24:mi:ss')";
        }

        if (fzrqs != '') {
          sqlWhere += "AND A.DJRQ <= TO_DATE('" + fzrqe + " 23:59:59', 'YYYY-MM-DD hh24:mi:ss')";
        }
        if (qlrmc = "") {
          sqlWhere += " AND EXISTS (SELECT C.SLBH FROM DJ_QLR B LEFT JOIN DJ_QLRGL C ON B.QLRID = C.QLRID WHERE C.SLBH = A.SLBH AND (C.QLRLX IS NULL OR C.QLRLX IN ('权利人', '抵押权人')) AND B.QLRMC LIKE '%" + qlrmc + "%')";
        }
        if (qlrzjh != "") {
          sqlWhere += " AND EXISTS (SELECT C.SLBH FROM DJ_QLR B LEFT JOIN DJ_QLRGL C ON B.QLRID = C.QLRID WHERE C.SLBH = A.SLBH AND (C.QLRLX IS NULL OR C.QLRLX IN ('权利人', '抵押权人')) AND B.ZJHM LIKE '%" + qlrzjh + "%') ";
        }
        if (zsxlh != "") {
          sqlWhere += "  AND A.ZSXLH LIKE '%" + zsxlh + "%' ";
        }
        if (zl != "") {
          sqlWhere += " AND (C.TZRTXDZ LIKE '%" + zl + "%' OR C.ZL LIKE '%" + zl + "%')";
        }
        if (sjlszt == "历史") {
          sqlWhere += " AND A.LIFECYCLE = '1' ";
        } else if (sjlszt == "现实") {
          sqlWhere += " AND (A.LIFECYCLE != '1' OR A.LIFECYCLE IS NULL) ";
        }
        if (dah != "") {
          sqlWhere += "  AND A.GDH LIKE '%" + dah + "%' ";
        }
        return sqlWhere;
      }

      var data = {
        //有权利人名称和证件号
        // query: "SELECT * FROM (SELECT ROWNUM AS RN, t1.* FROM (SELECT DISTINCT A.SLBH,A.DJLX,A.BDCZH,B.BDCDYH,A.ZSXLH,A.DJRQ,(select wm_concat(distinct to_char(y.qlrmc)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as QLRMC,(select wm_concat(distinct to_char(y.zjhm)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as QLRZJH,N'' AS ZT,A.GDH,NVL(C.ZL, C.TZRTXDZ) AS ZL,A.LIFECYCLE,A.YWLX,B.TSTYBM FROM (SELECT SLBH,DJLX,BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'权证' AS YWLX,GDH FROM DJ_DJB UNION ALL SELECT SLBH,DJLX,BDCZMH AS BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'预告' AS YWLX,GDH FROM DJ_YG UNION ALL SELECT A.SLBH,A.DJLX,A.BDCZMH AS BDCZH,A.ZSXLH,A.DJRQ,A.LIFECYCLE,N'抵押' AS YWLX,A.GDH FROM DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL UNION ALL SELECT A.SLBH,A.CFLX AS DJLX,A.CFBH AS BDCZH,N'' AS ZSXLH,A.DJSJ AS DJRQ,A.LIFECYCLE,N'查封' AS YWLX,A.GDH FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL) A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_SJD C ON A.SLBH = C.SLBH WHERE B.TSTYBM IS NOT NULL " + getWhere() + " order by A.Bdczh desc, A.SLBH) t1)WHERE RN >= 1 AND RN <= 20 ORDER BY ROWNUM ASC",
        //没有权利人名称和证件号
        query: "SELECT *  from (SELECT ROWNUM AS RN, t1.*  from (SELECT DISTINCT A.SLBH,A.DJLX,A.BDCZH,B.BDCDYH,A.ZSXLH,A.DJRQ,N''AS QLRMC,N''AS QLRZJH,N''AS ZT,A.GDH,NVL(C.ZL, C.TZRTXDZ) AS ZL,A.LIFECYCLE,A.YWLX,B.TSTYBM   from (SELECT SLBH,DJLX,BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'权证' AS YWLX,GDH   from DJ_DJB UNION ALL SELECT SLBH,DJLX,BDCZMH AS BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'预告'  AS YWLX,GDH   from DJ_YG UNION ALL SELECT A.SLBH,A.DJLX,A.BDCZMH AS BDCZH,A.ZSXLH,A.DJRQ,A.LIFECYCLE,N'抵押'    AS YWLX,A.GDH   from DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL UNION ALL SELECT A.SLBH,A.CFLX AS DJLX,A.CFBH AS BDCZH,N''    AS ZSXLH,A.DJSJ AS DJRQ,A.LIFECYCLE,N'查封'  AS YWLX,A.GDH   from DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL) A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_SJD C ON A.SLBH = C.SLBH WHERE B.TSTYBM IS NOT NULL " + getWhere() + " order by A.Bdczh desc, A.SLBH) t1)WHERE RN >= 1 AND RN <= 20 ORDER BY ROWNUM ASC",
        count: "SELECT COUNT(0) FROM (SELECT DISTINCT A.SLBH,A.DJLX,A.BDCZH,B.BDCDYH,A.ZSXLH,A.DJRQ,N''AS QLRMC,N''AS QLRZJH,N''AS ZT,A.GDH,NVL(C.ZL, C.TZRTXDZ) AS ZL,A.LIFECYCLE,A.YWLX,B.TSTYBM   from (SELECT SLBH,DJLX,BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'权证' AS YWLX,GDH   from DJ_DJB UNION ALL SELECT SLBH,DJLX,BDCZMH AS BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'预告'  AS YWLX,GDH   from DJ_YG UNION ALL SELECT A.SLBH,A.DJLX,A.BDCZMH AS BDCZH,A.ZSXLH,A.DJRQ,A.LIFECYCLE,N'抵押'    AS YWLX,A.GDH   from DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL UNION ALL SELECT A.SLBH,A.CFLX AS DJLX,A.CFBH AS BDCZH,N''    AS ZSXLH,A.DJSJ AS DJRQ,A.LIFECYCLE,N'查封'  AS YWLX,A.GDH   from DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL) A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_SJD C ON A.SLBH = C.SLBH WHERE B.TSTYBM IS NOT NULL " + getWhere() + " order by A.Bdczh desc, A.SLBH) t"
        //使用nvl函数
        // query: "SELECT * from (SELECT ROWNUM AS RN, t1.* from (SELECT DISTINCT A.SLBH,A.DJLX,NVL( A.BDCZH,' ') AS BDCZH,B.BDCDYH,NVL(A.ZSXLH,' ') AS ZSXLH,NVL(A.DJRQ,'') AS DJRQ,N'' AS QLRMC,N'' AS QLRZJH,N'' AS ZT,NVL(A.GDH,' ') AS GDH,NVL(C.ZL, C.TZRTXDZ) AS ZL,A.LIFECYCLE,A.YWLX,B.TSTYBM  from (SELECT SLBH,DJLX,BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'权证' AS YWLX,GDH  from DJ_DJB UNION ALL SELECT SLBH,DJLX,BDCZMH AS BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'预告' AS YWLX,GDH  from DJ_YG UNION ALL SELECT A.SLBH,A.DJLX,A.BDCZMH AS BDCZH,A.ZSXLH,A.DJRQ,A.LIFECYCLE,N'抵押' AS YWLX,A.GDH  from DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL UNION ALL SELECT A.SLBH,A.CFLX AS DJLX,A.CFBH AS BDCZH,N'' AS ZSXLH,A.DJSJ AS DJRQ,A.LIFECYCLE,N'查封' AS YWLX,A.GDH  from DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL) A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_SJD C ON A.SLBH = C.SLBH WHERE B.TSTYBM IS NOT NULL " + getWhere() + " order by NVL( A.BDCZH,' ') desc, A.SLBH) t1)WHERE RN >= 1 AND RN <= 20 ORDER BY ROWNUM ASC",
        // count: "SELECT COUNT(0) FROM (SELECT DISTINCT A.SLBH,A.DJLX,NVL( A.BDCZH,' ') AS BDCZH,B.BDCDYH,NVL(A.ZSXLH,' ') AS ZSXLH,NVL(A.DJRQ,'') AS DJRQ,N'' AS QLRMC,N'' AS QLRZJH,N'' AS ZT,NVL(A.GDH,' ') AS GDH,NVL(C.ZL, C.TZRTXDZ) AS ZL,A.LIFECYCLE,A.YWLX,B.TSTYBM  from (SELECT SLBH,DJLX,BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'权证' AS YWLX,GDH  from DJ_DJB UNION ALL SELECT SLBH,DJLX,BDCZMH AS BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'预告' AS YWLX,GDH  from DJ_YG UNION ALL SELECT A.SLBH,A.DJLX,A.BDCZMH AS BDCZH,A.ZSXLH,A.DJRQ,A.LIFECYCLE,N'抵押' AS YWLX,A.GDH  from DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL UNION ALL SELECT A.SLBH,A.CFLX AS DJLX,A.CFBH AS BDCZH,N'' AS ZSXLH,A.DJSJ AS DJRQ,A.LIFECYCLE,N'查封' AS YWLX,A.GDH  from DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL) A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_SJD C ON A.SLBH = C.SLBH WHERE B.TSTYBM IS NOT NULL " + getWhere() + " order by NVL( A.BDCZH,' ') desc, A.SLBH) t"

      }
      console.log("data0", data);
      let config = {
        headers: {"Content-Type": "application/json"},
      };

      // axios.post("http://127.0.0.1:8079/test/sqls", data, config).then((res) => {
      axios.post("http://127.0.0.1:8079/test/sqls", data, config).then((res) => {
        console.log("data", res.data.data);
        let datas = res.data.data.query;
        let str = '';
        for (var i = 0; i < datas.length; i++) {
          var QLRMC = GetQLRMC(datas[i].SLBH)

          function GetQLRMC(sSLBH) {
            var mc;
            var sSql = {"sxkGETQLRMC": "SELECT A.QLRMC AS QLRMC FROM DJ_QLR A LEFT JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.SLBH = '" + sSLBH + "' AND (B.QLRLX IS NULL OR B.QLRLX IN ('权利人', '抵押权人')) ORDER BY B.SXH"};
            axios.post("http://127.0.0.1:8079/test/sqls", sSql, config).then((res) => {
              // console.log("qlrmc", res.data.data.sxkGETQLRMC[0].QLRMC);
              return res.data.data.sxkGETQLRMC[0].QLRMC;
            })
          }

          // str += `<tr class="load"><td style="width:60.17px; height:37px;">${datas[i].RN}</td><td style="width:117.34px; height:37px;">${datas[i].SLBH}</td><td style="width:61.17px; height:37px;">${datas[i].DJLX}</td><td style="width:174.52px; height:37px;">${datas[i].BDCZH}</td><td style="width:174.52px; height:37px;">${datas[i].BDCDYH}</td><td style="width:120.34px; height:37px;">${datas[i].ZSXLH}</td><td style="width:108.34px; height:37px;">${datas[i].DJRQ}</td><td style="width:60.17px; height:37px;">${QLRMC}</td><td style="width:115.34px; height:37px;">${datas[i].QLRZJH}</td><td style="width:69.17px; height:37px;">${datas[i].LIFECYCLE}</td><td style="width:60.17px; height:37px;">${datas[i].GDH}</td><td style="width:185.17px; height:37px;">${datas[i].ZL}</td></tr>`
          var zt;
          if (datas[i].LIFECYCLE == "1") {
            zt = "历史";
          } else if (datas[i].DJRQ == "" || datas[i].DJRQ == null) {
            zt = "办理中";
          } else {
            zt = "现实";
          }
          str += `<tr class="load"><td style="width:59.7px; height:37px; border: 1px solid #c5c5c5; white-space: nowrap ;overflow: hidden;text-overflow: ellipsis" >${datas[i].RN}</td><td style="width:119.8px; height:37px;border: 1px solid #c5c5c5">${datas[i].SLBH}</td><td style="width:59.8px; height:37px; border: 1px solid #c5c5c5">${datas[i].DJLX}</td><td style="width:181px; height:37px; border: 1px solid #c5c5c5">${datas[i].BDCZH != null ? datas[i].BDCZH : ' '}</td><td style="width:181px; height:37px; border: 1px solid #c5c5c5"">${datas[i].BDCDYH}</td><td style="width:119.8px; height:37px; border: 1px solid #c5c5c5"">${datas[i].ZSXLH != null ? datas[i].ZSXLH : ' '}</td><td style="width:119.8px; height:37px; border: 1px solid #c5c5c5"">${datas[i].DJRQ != null ? datas[i].DJRQ : ' '}</td><td style="width:59.8px; height:37px; border: 1px solid #c5c5c5""> </td><td style="width:119.8px; height:37px; border: 1px solid #c5c5c5""> </td><td style="width:59.8px; height:37px; border: 1px solid #c5c5c5"">${zt}</td><td style="width:59.8px; height:37px; border: 1px solid #c5c5c5"">${datas[i].GDH != null ? datas[i].GDH : ' '}</td><td style="width:181px; height:37px; border: 1px solid #c5c5c5"">${datas[i].ZL != null ? datas[i].ZL : ' '}</td></tr>`

        }


        table.innerHTML = str;
        let tabkle = document.getElementsByClassName('load')
        document.addEventListener('click', function (e) {
          for (let i = 0; i < tabkle.length; i++) {
            let row = tabkle[i];
            let array = [];
            for (let j = 0; j < 12; j++) {
              if (row.cells[j].innerHTML == e.target.innerHTML) {
                tstybmdata.value = datas[i].TSTYBM;
                loadTreeInfo(tstybmdata.value); //点击调用loadTreeInfo函数加载树结构信息
              }
            }
          }
        })

      })
    }
  }, 1000)

  //获取树结构信息列表
  function loadTreeInfo(TSTYBM) {

    var treeSqls = {
      //加载证书信息
      loadCCIE: "SELECT DISTINCT B.TSTYBM,A.BDCZH,A.FZRQ,A.LIFECYCLE,A.DJRQ,A.YWLX,A.SLBH FROM (SELECT SLBH,BDCZH,FZRQ,DJRQ,LIFECYCLE,N'权证' AS YWLX FROM DJ_DJB UNION ALL SELECT SLBH,BDCZMH AS BDCZH,FZRQ,DJRQ,LIFECYCLE,N'预告' AS YWLX FROM DJ_YG) A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_SJD C ON A.SLBH = C.SLBH WHERE B.TSTYBM ='" + TSTYBM + "'  ORDER BY DJRQ DESC",
      //查询是否存在按单元查封信息:
      dycfxx: "SELECT COUNT(1) AS COUNT FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL AND TSTYBM = '" + TSTYBM + "'",
      //加载按单元抵押信息
      dydyxx: "SELECT COUNT(1) AS COUNT FROM DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL AND TSTYBM = '" + TSTYBM + "'"

    }
    let config = {
      headers: {"Content-Type": "application/json"},
    };
    var ArrQZXX = new Array();
    var sKeyName;
    var treeSqlsDate;
    var zsxx = new Array();

    axios.post("http://127.0.0.1:8079/test/sqls", treeSqls, config).then((res) => {

          treeSqlsDate = res.data.data;

          console.log("treeSqlsDate1", res.data.data)
          var zs = treeSqlsDate.loadCCIE;
          console.log("zszs", zs)
          if (zs != null) {
            var treedata = [];
            for (var i = 0; i < zs.length; i++) {
              var zsTSTYBM = zs[i].TSTYBM;
              var zsSLBH = zs[i].SLBH;
              sKeyName = zsSLBH + ";" + zsTSTYBM;
              var zsBDCZH = zs[i].BDCZH;
              var zsLIFECYCLE = zs[i].LIFECYCLE;
              var zsDJRQ = zs[i].DJRQ;
              var zsYWLX = zs[i].YWLX
              if (zsBDCZH == "" || zsBDCZH == null) {
                zsBDCZH = zsSLBH;
              }
              var zsDQXX = "";
              if (zsYWLX == "预告") {
                zsDQXX += "预告-";
              }
              zsDQXX += zsBDCZH;
              if (zsLIFECYCLE == "1") {
                zsDQXX += "(历史)";
              } else if (zsDJRQ == "" || zsDJRQ == null) {
                zsDQXX += "(办理中)";
              } else {
                zsDQXX += "(现实)";
              }
              ArrQZXX[i] = sKeyName;
              zsxx[i] = zsDQXX;

            }


            // 加载限制性登记信息
            for (let i = 0; i < ArrQZXX.length; i++) {
              sKeyName = Format(ArrQZXX[i]);
              let child = [];
              let ArrKey;
              //对证书处理start
              if (sKeyName != "") {

                ArrKey = sKeyName.split(";");//获取证书对应的受理编号和图书统一编码
                var xzdjxx = {
                  zx: "SELECT A.XGZH,A.SLBH FROM DJ_XGDJZX A LEFT JOIN DJ_XGDJGL B ON A.SLBH = B.ZSLBH WHERE A.SLBH IS NOT NULL AND B.FSLBH = '" + ArrKey[0] + "'",
                  dy: "SELECT A.BDCZMH,A.SLBH,A.LIFECYCLE,A.DJRQ FROM DJ_DY A LEFT JOIN DJ_XGDJGL B ON A.SLBH = B.ZSLBH WHERE A.SLBH IS NOT NULL AND B.FSLBH = '" + ArrKey[0] + "' ORDER BY NVL(A.LIFECYCLE,0),A.DJRQ",
                  zxdy: "SELECT XGZH,SLBH FROM DJ_XGDJZX WHERE SLBH IN(SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH IN(SELECT SLBH FROM DJ_DY WHERE SLBH IN (SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH = '" + ArrKey[0] + "')))",
                  cf: "SELECT CFBH,SLBH,CFLX,LIFECYCLE,DJSJ FROM DJ_CF WHERE SLBH IN(SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH = '" + ArrKey[0] + "') ORDER BY NVL(LIFECYCLE,0),CFQSSJ,SLBH",
                  zxcf: "SELECT XGZH,SLBH FROM DJ_XGDJZX WHERE SLBH IN(SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH IN(SELECT SLBH FROM DJ_CF WHERE SLBH IN(SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH = '" + ArrKey[0] + "') ))",
                  yy: "SELECT BDCZMH,SLBH,LIFECYCLE,DJRQ FROM DJ_YY WHERE SLBH IN(SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH = '" + ArrKey[0] + "') ORDER BY NVL(LIFECYCLE,0),DJRQ",
                  zxyy: "SELECT XGZH,SLBH FROM DJ_XGDJZX WHERE SLBH IN(SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH IN(SELECT SLBH FROM DJ_YY WHERE SLBH IN (SELECT ZSLBH FROM DJ_XGDJGL WHERE FSLBH = '" + ArrKey[0] + "')))"
                };
                axios.post("http://127.0.0.1:8079/test/sqls", xzdjxx, config).then((res) => {
                      var resXzDjXx = res.data.data;
                      //注销信息
                      var zx = resXzDjXx.zx;
                      if (zx.length > 0) {
                        for (var j = 0; j < zx.length; j++) {
                          var zxSlbh = Format(zx[j].SLBH);
                          var zxzh = Format(zx[j].XGZH)
                          if (zxzh == "" || zxzh == null) {
                            zxzh = zxSlbh;
                          }
                          child.push(getTreeChildrenNode("权证注销-" + zxzh, zxSlbh, ArrKey[1]));
                        }
                      }
                      //抵押信息
                      var dy = resXzDjXx.dy;
                      if (dy.length > 0) {
                        for (var j = 0; j < dy.length; j++) {
                          var dyName = "抵押-" + Format(dy[j].BDCZMH);
                          if (Format(dy[j].LIFECYCLE) == "1") {
                            dyName += "(历史)";
                          } else if (Format(dy[j].DJRQ) == "") {
                            dyName += "(办理中)";
                          } else {
                            dyName += "(现实)";
                          }
                          child.push(getTreeChildrenNode(dyName, Format(dy[j].SLBH), ArrKey[1]));
                        }
                      }
                      //注销抵押信息
                      var zxdy = resXzDjXx.zxdy;
                      if (zxdy.length > 0) {
                        for (var j = 0; j < zxdy.length; j++) {
                          var zxdySlbh = Format(zxdy[j].SLBH);
                          //TODO 没有存储受理编号和图书统一编码
                          var zxdyZH = Format(zxdy[j].XGZH);
                          if (zxdyZH == "" || zxdyZH == null) {
                            zxdyZH = zxdySlbh;
                          }
                          child.push(getTreeChildrenNode("抵押注销-" + zxdyZH, zxdySlbh, ArrKey[1]));
                        }
                      }
                      //查封信息
                      var cf = resXzDjXx.cf;
                      if (cf.length > 0) {
                        for (var j = 0; j < cf.length; j++) {
                          var cflx = Format(cf[j].CFLX);
                          if (cflx == "" || cflx == null) {
                            cflx = "查封";
                          }
                          var cfName = cflx + "-" + Format(cf[j].CFBH);
                          if (Format(cf[j].LIFECYCLE) == "1") {
                            cfName += "(历史)";
                          } else if (Format(cf[j].DJSJ) == "") {
                            cfName += "(办理中)";
                          } else {
                            cfName += "(现实)";
                          }
                          child.push(getTreeChildrenNode(cfName, Format(cf[j].SLBH), ArrKey[1]));

                        }
                      }
                      //注销查封信息
                      var zxcf = resXzDjXx.zxcf;
                      if (zxcf.length > 0) {
                        for (var j = 0; j < zxcf.length; j++) {
                          var zxcfSlbh = Format(zxcf[j].SLBH);

                          var zxcfZH = Format(zxcf[j].XGZH);
                          if (zxcfZH == "" || zxcfZH == null) {
                            zxcfZH = zxcfSlbh
                          }
                          child.push(getTreeChildrenNode("解封-" + zxcfZH, zxcfSlbh, ArrKey[1]));
                        }
                      }
                      //异议信息
                      var yy = resXzDjXx.yy;
                      if (yy.length > 0) {
                        for (var j = 0; j < yy.length; j++) {
                          var yyName = "异议-" + Format(yy[j].BDCZMH);
                          if (Format(yy[j].LIFECYCLE) == "1") {
                            yyName += "(历史)";
                          } else if (Format(yy[j].DJRQ) == "") {
                            yyName += "(办理中)";
                          } else {
                            yyName += "(现实)";
                          }
                          child.push(getTreeChildrenNode(yyName, Format(yy[j].SLBH), ArrKey[1]));

                        }

                      }
                      //注销异议信息
                      var zxyy = resXzDjXx.zxyy;
                      if (zxyy.length > 0) {
                        for (var j = 0; j < zxyy.length; j++) {
                          var zxyySlbh = Format(zxyy[j].SBLH)
                          //TODO 没有存储受理编号和图书统一编码
                          var zxyyZH = Format(zxyy[i].XGZH)
                          if (zxyyZH == "" || zxyyZH == null) {
                            zxyyZH = zxyySlbh
                          }
                          child.push(getTreeChildrenNode("异议注销-" + zxyyZH, zxyySlbh, ArrKey[1]));
                        }
                      }
                    }
                )
              }
              //对证书处理end
              console.log("tree", getTreeNode(zsxx[i], ArrKey[0], ArrKey[1], child))
              treedata.push(getTreeNode(zsxx[i], ArrKey[0], ArrKey[1], child))
            }
            console.log("tree22", treedata)

            //加载限制性登记信息 end

            //加载按单元查封信息   KFQFCCF201810120002
            if (treeSqlsDate.dycfxx[0].COUNT > 0) {
              var dycfxxSqls = {
                dycfxx: "SELECT DISTINCT B.TSTYBM,A.CFBH,A.LIFECYCLE,A.DJSJ,A.SLBH,A.CFLX FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL AND TSTYBM = '" + TSTYBM + "' ORDER BY NVL(A.LIFECYCLE,0),A.DJSJ",
              }
              let child = [];
              var ArrDYCFXX = new Array();
              axios.post("http://127.0.0.1:8079/test/sqls", dycfxxSqls, config).then((res) => {
                    var resdycfxx = res.data.data.dycfxx;
                    if (resdycfxx.length > 0) {
                      for (var j = 0; j < resdycfxx.length; j++) {
                        var dycfxx_TSTYBM = Format(resdycfxx[j].TSTYBM);
                        var dycfxx_SLBH = Format(resdycfxx[j].SLBH);
                        var dycfxx_CFLX = Format(resdycfxx[j].CFLX);
                        if (dycfxx_CFLX == "") {
                          dycfxx_CFLX = "查封";
                        }
                        var dycfxxName = dycfxx_CFLX + "-" + Format(resdycfxx[j].CFBH);
                        if (Format(resdycfxx[j].LIFECYCLE) == "1") {
                          dycfxxName += "(历史)";
                        } else if (Format(resdycfxx[j].DJSJ) == "") {
                          dycfxxName += "(办理中)";
                        } else {
                          dycfxxName += "(现实)";
                        }
                        var st = dycfxx_SLBH + ";" + dycfxx_TSTYBM;
                        ArrDYCFXX[j] = st;

                        child.push(getTreeChildrenNode(dycfxxName, dycfxx_SLBH, dycfxx_TSTYBM));
                      }
                    }

                    //加载按单元查封注销信息 KFQFCCF201812030020
                    for (var j = 0; j < ArrDYCFXX.length; j++) {
                      var dycfxx = Format(ArrDYCFXX[j]);
                      if (dycfxx != "") {
                        var dycfSLBH_TSTYBM = dycfxx.split(";");//受理编号和图属统一编码
                        var dycfzxSqls = {
                          dycfzx: "SELECT Nvl(A.XGZH,B.XGZH) AS XGZH,SLBH FROM DJ_XGDJZX A LEFT JOIN DJ_XGDJGL B ON A.SLBH = B.ZSLBH WHERE B.FSLBH = '" + dycfSLBH_TSTYBM[0] + "' AND ROWNUM < 2",
                        }
                        axios.post("http://127.0.0.1:8079/test/sqls", dycfzxSqls, config).then((res) => {
                          var resdycfzx = res.data.data.dycfzx;
                          if (resdycfzx.length > 0) {
                            for (var n = 0; n < resdycfzx.length; n++) {
                              var dycfzx_SLBH = Format(resdycfzx[n].SLBH);
                              //TODO 没有存储受理编号和图书统一编码
                              var dycfzx_ZH = Format(resdycfzx[n].XGZH);
                              if (dycfzx_ZH == "") {
                                dycfzx_ZH = dycfzx_SLBH;
                              }

                              child.push(getTreeChildrenNode("解封-" + dycfzx_ZH, dycfzx_SLBH, dycfSLBH_TSTYBM[1]));

                            }

                          }
                        })
                      }
                    }
                    console.log("按单元查封信息TREE", getTreeNode("按单元查封信息", null, null, child))
                    treedata.push(getTreeNode("按单元查封信息", null, null, child));
                  }
              )
            }
            //加载按单元抵押信息
            if (treeSqlsDate.dydyxx[0].COUNT > 0) {
              var dydyxxSqls = {
                dydyxx: "SELECT DISTINCT B.TSTYBM,A.BDCZMH,A.LIFECYCLE,A.DJRQ,A.SLBH FROM DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL AND TSTYBM = '" + TSTYBM + "' ORDER BY NVL(A.LIFECYCLE,0),A.DJRQ"
              }
              let child = [];
              var ArrDYDYXX = new Array();
              axios.post("http://127.0.0.1:8079/test/sqls", dydyxxSqls, config).then((res) => {
                console.log("加载按单元抵押信息", res.data.data)
                var resdydyxx = res.data.data.dydyxx;
                if (resdydyxx.length > 0) {
                  for (var j = 0; j < resdydyxx.length; j++) {
                    var dydyxx_TSTYBM = Format(resdydyxx[j].TSTYBM);
                    var dydyxx_SLBH = Format(resdydyxx[j].SLBH);
                    var dydyxx_BDCZH = Format(resdydyxx[j].BDCZMH);
                    var dydyxx_LIFECYCLE = Format(resdydyxx[j].LIFECYCLE);
                    var dydyxx_DJRQ = Format(resdydyxx[j].DJRQ);
                    if (dydyxx_BDCZH == "") {
                      dydyxx_BDCZH = dydyxx_SLBH;
                    }
                    var dydyxx_XX = "抵押-";
                    dydyxx_XX += dydyxx_BDCZH;
                    if (dydyxx_LIFECYCLE == "1") {
                      dydyxx_XX += "(历史)";
                    } else if (dydyxx_DJRQ == "") {
                      dydyxx_XX += "(办理中)";
                    } else {
                      dydyxx_XX += "(现实)";
                    }
                    var st = dydyxx_SLBH + ";" + dydyxx_TSTYBM;
                    ArrDYDYXX[j] = st;
                    child.push((getTreeChildrenNode(dydyxx_XX, dydyxx_SLBH, dydyxx_TSTYBM)));
                  }
                }
                //加载按单元抵押注销信息
                for (var j = 0; j < ArrDYDYXX.length; j++) {
                  var dydyxx = Format(ArrDYDYXX[j]);
                  if (dydyxx != "") {
                    var dydySLBH_TSTYBM = dydyxx.split(";");
                    var dydyzxSqls = {
                      dydyzx: "SELECT Nvl(A.XGZH,B.XGZH) AS XGZH,SLBH FROM DJ_XGDJZX A LEFT JOIN DJ_XGDJGL B ON A.SLBH = B.ZSLBH WHERE B.FSLBH = '" + dydySLBH_TSTYBM[0] + "' AND ROWNUM < 2"
                    }
                    axios.post("http://127.0.0.1:8079/test/sqls", dydyzxSqls, config).then((res) => {
                      var resdydyzx = res.data.data.dydyzx;
                      if (resdydyzx.length > 0) {
                        for (var n = 0; n < resdydyzx.length; n++) {
                          var dydyzx_SLBH = Format(resdydyzx[n].SLBH);
                          var dydyzx_ZH = Format(resdydyzx[n].XGZH);
                          if (dydyzx_ZH == "") {
                            dydyzx_ZH = dydyzx_SLBH;
                          }
                          child.push(getTreeChildrenNode("抵押注销-" + dydyzx_ZH, dydyzx_SLBH, dydySLBH_TSTYBM[1]));
                        }
                      }
                    })

                  }
                }
                console.log("按单元抵押信息TREE", getTreeNode("按单元抵押信息", null, null, child))
                treedata.push(getTreeNode("按单元抵押信息", null, null, child));
              })
            }


            treeData.value = treedata
            setTimeout(() => {
              zsdialogVisible.value = true;
              setTimeout(() => {
                dialogjson()
              })

            }, 1000);

          }
        }
    )


  }

//查询续查封信息
  function treeZS_OnClick(nodeText) {
    console.log("树11", nodeText)
  }

  function getTreeNode(NodeName, SLBH, TSTYBM, children) {

    return {
      label: NodeName,
      icon: 'iconfont icon-wenjian',
      style: "color:#ffe090;font-size: 23px",
      slbh: SLBH,
      tstybm: TSTYBM,
      children: children,
    }
  }

  function getTreeChildrenNode(ChildNodeName, ChildSLBH, ChildTSTYBM) {
    return {
      label: ChildNodeName,
      icon: 'iconfont icon-dengjizheng',
      style: 'color: #f0a830;font-size: 23px;',
      childslbh: ChildSLBH,
      childtstybm: ChildTSTYBM,

    }
  }

  //格式化

  function Format(sVal) {
    if (sVal == null || sVal + "" == "null" || typeof (sVal) == "undefined") {
      return "";
    } else {
      return "" + sVal;
    }
  }
}

onMounted(() => {
  zs();

  // fromname();
  query();
})
</script>
