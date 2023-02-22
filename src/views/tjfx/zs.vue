<template>
  <div>
    <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
    </v-form-render>
    <el-dialog v-model="zsdialogVisible" title="不动产追溯" width="70%" :before-close="dialogVisible = false"
               class="ywdialog">


      <div style="display:flex;flex-direction:column">
        <el-tree style="display:1" :data="treedata" :props="defaultProps" @node-click="handleNodeClick">
          <template #default="{ data }">
            <span :class="data.icon" :style="data.style"></span>
            {{ data.label }}
          </template>
        </el-tree>
        <div
            style="position: absolute;bottom: 10px;height: 120px;width: 95%;margin: 0px auto;border: 1px solid #d3d1d1;display:flex;flex-direction: column;"
            v-if='lcmsVisiable'>
          <div style="height:30px;width:100%;display:flex;">
            <div
                style="width:90px;border-right:1px solid #d3d1d1;line-height: 30px;font-size: 12px;font-weight:600;color:#000;padding-left:10px">
              流程期限：
            </div>
            <div style="display:flex;line-height: 30px;">
              <el-input style="width:400px" v-model="inputday" placeholder="请输入时间" clearable/>
              天
              <el-select v-model="gzrvalue" class="m-2" style="width:100px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>

            </div>
          </div>
          <div style="height:90px;width:100%;display: flex;">
            <div
                style="width:90px;border-right:1px solid #d3d1d1;line-height: 90px;font-size: 12px;font-weight:600;color:#000;padding-left:10px">
              流程描述：
            </div>
            <div style="display:flex;">
              <div style="width:400px;border-right:1px solid #d3d1d1"></div>
              <el-button style="width: 90px;height: 70px;margin-left: 15px;margin-top: 10px;"
                         @click="CreateProcess">创建流程
              </el-button>
            </div>
          </div>
        </div>
      </div>


    </el-dialog>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import zsjson from '../../json/新追溯/追溯_主页.json'

const formJson = reactive({});
const formData = reactive({});
const optionData = reactive({});
let vFormRef = ref(null);
const tstybmdata = ref();
const zsdialogVisible = ref(false)
const zs = () => {
  vFormRef.value.setFormJson(zsjson);

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
        query: "SELECT * FROM (SELECT ROWNUM AS RN, t1.* FROM (SELECT DISTINCT A.SLBH,A.DJLX,A.BDCZH,B.BDCDYH,A.ZSXLH,A.DJRQ,(select wm_concat(distinct to_char(y.qlrmc)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as QLRMC,(select wm_concat(distinct to_char(y.zjhm)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as QLRZJH,N'' AS ZT,A.GDH,NVL(C.ZL, C.TZRTXDZ) AS ZL,A.LIFECYCLE,A.YWLX,B.TSTYBM FROM (SELECT SLBH,DJLX,BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'权证' AS YWLX,GDH FROM DJ_DJB UNION ALL SELECT SLBH,DJLX,BDCZMH AS BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'预告' AS YWLX,GDH FROM DJ_YG UNION ALL SELECT A.SLBH,A.DJLX,A.BDCZMH AS BDCZH,A.ZSXLH,A.DJRQ,A.LIFECYCLE,N'抵押' AS YWLX,A.GDH FROM DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL UNION ALL SELECT A.SLBH,A.CFLX AS DJLX,A.CFBH AS BDCZH,N'' AS ZSXLH,A.DJSJ AS DJRQ,A.LIFECYCLE,N'查封' AS YWLX,A.GDH FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL) A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_SJD C ON A.SLBH = C.SLBH WHERE B.TSTYBM IS NOT NULL " + getWhere() + " order by A.Bdczh desc, A.SLBH) t1)WHERE RN >= 1 AND RN <= 20 ORDER BY ROWNUM ASC",
        count: "SELECT COUNT(0) FROM (SELECT DISTINCT A.SLBH,A.DJLX,A.BDCZH,B.BDCDYH,A.ZSXLH,A.DJRQ,(select wm_concat(distinct to_char(y.qlrmc)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as QLRMC,(select wm_concat(distinct to_char(y.zjhm)) from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as QLRZJH,N'' AS ZT,A.GDH,NVL(C.ZL, C.TZRTXDZ) AS ZL,A.LIFECYCLE,A.YWLX,B.TSTYBM FROM (SELECT SLBH,DJLX,BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'权证' AS YWLX,GDH FROM DJ_DJB UNION ALL SELECT SLBH,DJLX,BDCZMH AS BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'预告' AS YWLX,GDH FROM DJ_YG UNION ALL SELECT A.SLBH,A.DJLX,A.BDCZMH AS BDCZH,A.ZSXLH,A.DJRQ,A.LIFECYCLE,N'抵押' AS YWLX,A.GDH FROM DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL UNION ALL SELECT A.SLBH,A.CFLX AS DJLX,A.CFBH AS BDCZH,N'' AS ZSXLH,A.DJSJ AS DJRQ,A.LIFECYCLE,N'查封' AS YWLX,A.GDH FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL) A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_SJD C ON A.SLBH = C.SLBH WHERE B.TSTYBM IS NOT NULL " + getWhere() + " order by A.Bdczh desc, A.SLBH) t"
      }
      console.log("data0", data);
      let config = {
        headers: {"Content-Type": "application/json"},
      };

      axios.post("http://127.0.0.1:8079/test/sqls", data, config).then((res) => {
        console.log("data", res.data.data);
        let datas = res.data.data.query;
        let str = '';
        for (var i = 0; i < datas.length; i++) {

          str += `<tr class="load"><td style="width:60.17px; height:37px;">${datas[i].RN}</td><td style="width:117.34px; height:37px;">${datas[i].SLBH}</td><td style="width:61.17px; height:37px;">${datas[i].DJLX}</td><td style="width:174.52px; height:37px;">${datas[i].BDCZH}</td><td style="width:174.52px; height:37px;">${datas[i].BDCDYH}</td><td style="width:120.34px; height:37px;">${datas[i].ZSXLH}</td><td style="width:108.34px; height:37px;">${datas[i].DJRQ}</td><td style="width:60.17px; height:37px;">${datas[i].QLRMC}</td><td style="width:115.34px; height:37px;">${datas[i].QLRZJH}</td><td style="width:69.17px; height:37px;">${datas[i].LIFECYCLE}</td><td style="width:60.17px; height:37px;">${datas[i].GDH}</td><td style="width:185.17px; height:37px;">${datas[i].ZL}</td></tr>`
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
                zsdialogVisible.value = true;


                var tree = {
                  //加载证书信息
                  loadCCIE: "SELECT DISTINCT B.TSTYBM,A.BDCZH,A.FZRQ,A.LIFECYCLE,A.DJRQ,A.YWLX,A.SLBH FROM (SELECT SLBH,BDCZH,FZRQ,DJRQ,LIFECYCLE,N'权证' AS YWLX FROM DJ_DJB UNION ALL SELECT SLBH,BDCZMH AS BDCZH,FZRQ,DJRQ,LIFECYCLE,N'预告' AS YWLX FROM DJ_YG) A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_SJD C ON A.SLBH = C.SLBH WHERE B.TSTYBM ='" + tstybmdata.value + "'  ORDER BY DJRQ DESC",
                  //查询是否存在按单元查封信息:
                  dycfxx: "SELECT COUNT(1) FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL AND TSTYBM = '" + tstybmdata.value + "'",
                  dydy: "SELECT COUNT(1) FROM DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL AND TSTYBM = '" + tstybmdata.value + "'"

                }
                axios.post("http://127.0.0.1:8079/test/sqls", tree, config).then((res) => {
                  console.log("zszs", res.data.data);
                  if (res.data.data.loadCCIE != null) {

                  }

                })


              }
            }
          }
          console.log('TSTYBM  ', tstybmdata.value)
        })

      })
    }

    function LoadTreeInfo(TSTYBM) {
      console.log("ts", TSTYBM)
    }

  }, 1000)

};


onMounted(() => {
  zs();
  // fromname();
  query();
})
</script>
