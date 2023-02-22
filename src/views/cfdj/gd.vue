<template>
  <div style="display: flex">
    <div class="formcontent">
      <div class="gd">
        <v-form-render
          :form-json="formJson"
          :form-data="formData"
          :option-data="optionData"
          ref="vFormRef"
        >
        </v-form-render>
        <el-button type="primary" @click="conserve"> 保存</el-button>
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
const { proxy } = getCurrentInstance();
const vFormRef = ref(null);
const getWidgetRef = reactive({});
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
var data = {
  "djsjd": "select SLBH, LCLX, LCMC, SJR, SJSJ, CNSJ, QXDM, TZRXM, TZFS, TZRDH, TZRYDDH, TZRDZYJ, TZRTXDZ, CXMM, SJMC, SJLX, SJSL, YS, SFSYBZ, SFEWSJ, SFBCSJ, ZRKS, ZRR, YXJ, SJBZ, BCSM,ZL,DJDL,DJXL,QXKZ,PRJID,LCLB from DJ_SJD where SLBH LIKE '"+slbh+"%' AND ROWNUM < 2",
  "djcf": "select SLBH,XGZH,BDCDYH,CFJG,CFLX,CFWJ,CFWH,SUBSTR(to_char(CFQSSJ,'yyyy/MM/dd HH:mm:ss'),0,10) as CFQSSJ,SUBSTR(to_char(CFJSSJ,'yyyy/MM/dd HH:mm:ss'),0,10) as CFJSSJ,CFFW,DJJG,DBR,DJSJ,CFYY,JBR,JBRQ,YGR,LHXX,QLR,JBRQ,lwrq,GDH,DAMJ,QT,FJ,LIFECYCLE,CFBH,CFSX,CFQX,ZJBH from DJ_CF where SLBH LIKE '"+slbh+"%' AND ROWNUM < 2",
  "djszqy": "select ITEMNOTE AS ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '所属辖区' AND ROWNUM<2) ORDER BY ITEMORDER",
  "ggjbr": "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记经办人' AND ROWNUM<2) ORDER BY ITEMORDER",
  "ggdjdl": "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记类型(大类)' AND ROWNUM<2) ORDER BY ITEMORDER",
  "djcf": "select SLBH,XGZH,BDCDYH,CFJG,CFLX,CFWJ,CFWH,CFQSSJ,CFJSSJ,CFFW,DJJG,DBR,DJSJ,CFYY,JBR,JBRQ,YGR,LHXX,QLR,JBRQ,LWRQ,GDH,DAMJ,QT,FJ,LIFECYCLE,CFBH,CFSX,CFQX,ZJBH from DJ_CF where SLBH LIKE '" + slbh + "%'",
  "ggzjlx": "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型' AND ROWNUM<2) ORDER BY ITEMORDER",
  "ggcfbhph": "select itemval,itemname from dic_item where diccode = (select diccode from dic_main where dicname='不动产登记业务控制' and dictype='通用字典') and itemname ='查封编号配号'",
  "djQLR": "select A.QLRMC,B.ZJLB,A.ZJHM from dj_qlr A left join dj_qlrgl B on a.qlrid=b.qlrid where slbh= '"+slbh+"'",
}
var yf = {
  "djcf": "select SLBH,XGZH,BDCDYH,CFJG,CFLX,CFWJ,CFWH,SUBSTR(to_char(CFQSSJ,'yyyy-MM-dd HH:mm:ss'),0,10) as CFQSSJ,SUBSTR(to_char(CFJSSJ,'yyyy-MM-dd HH:mm:ss'),0,10) as CFJSSJ,CFFW,DJJG,DBR,DJSJ,CFYY,JBR,JBRQ,YGR,LHXX,QLR,JBRQ,lwrq,GDH,DAMJ,QT,FJ,LIFECYCLE,CFBH,CFSX,CFQX,ZJBH from DJ_CF where SLBH LIKE '"+slbh+"%'",
}
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
  })
  axios.post("/test/sqls", data).then((res) => {
    console.log(res.data.data);
 let sj = res.data.data;
    proxy.newFormData2.SLBH = slbh;
    proxy.newFormData2.DJDL = sj.djsjd[0].DJDL;
    proxy.newFormData2.DJXL = sj.djsjd[0].DJXL;
    proxy.newFormData2.BDCSZQY = sj.djszqy[0].ITEMNAME;
    proxy.newFormData2.BDCDYH = sj.djcf[0].BDCDYH;
    proxy.newFormData2.SJZL = sj.djsjd[0].ZL;



    proxy.newFormData2.QLRMC = sj.djQLR[0].QLRMC;
    proxy.newFormData2.CFLX = sj.djcf[0].CFLX;

 proxy.newFormData2.DBR = sj.djcf[0].DBR;
    proxy.newFormData2.DJSJ = sj.djcf[0].DJSJ;

 proxy.newFormData2.SJR = sj.djsjd[0].SJR;
  proxy.newFormData2.SJSJ = sj.djsjd[0].SJSJ;
   proxy.newFormData2.SLKS = sj.djsjd[0].ZRKS;

   proxy.newFormData2.YBDCZH = sj.djcf[0].XGZH;
   proxy.newFormData2.SSXQ = sj.djsjd[0].QXDM;

    proxy.newFormData2.CFBH = sj.djcf[0].CFBH;

    proxy.newFormData2.CFWH = sj.djcf[0].CFWH;

    proxy.newFormData2.CFQX = sj.djcf[0].CFQX;
    proxy.newFormData2.CXMM = sj.djsjd[0].CXMM;
    
    proxy.newFormData2.JBR = sj.djcf[0].JBR;
   
 proxy.newFormData2.CFWJ = sj.djcf[0].CFWJ;
 proxy.newFormData2.CFJG = sj.djcf[0].CFJG;
 proxy.newFormData2.YG = sj.djcf[0].YGR;

  proxy.newFormData2.DABH = "cf-001512";
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
        console.log(formData);
        proxy.newFormData2 = formData;

        var myDate = new Date();
        var year = myDate.getFullYear(); //获取当前年
        var mon =
          myDate.getMonth() + 1 > 10
            ? myDate.getMonth() + 1
            : "0" + (myDate.getMonth() + 1); //获取当前月
        var date =
          myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate(); //获取当前日
        var hours = myDate.getHours(); //获取当前小时
        var minutes =
          myDate.getMinutes() > 10
            ? myDate.getMinutes()
            : "0" + myDate.getMinutes(); //获取当前分钟
        var seconds =
          myDate.getSeconds() > 10
            ? myDate.getSeconds()
            : "0" + myDate.getSeconds(); //获取当前秒
        var hyr =
          (myDate.getDate - 1) > 10
            ? (myDate.getDate() - 1)
            : "0" + (myDate.getDate() - 1); //获取当前月
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
        var nowy = year + "-" + mon + "-" + date;
        var nowyjz = year + 3 + "-" + mon + "-" + hyr;

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
        console.log(formData);

        // 将后端获取的受理编号赋值给新表单
        // proxy.newFormData2.SLBH = proxy.olddata;
        // proxy.newFormData2.DJDL = proxy.olddjdl;
        // proxy.newFormData2.select115441 = proxy.olddjxl;
        // proxy.newFormData2.XH = proxy.qlrxh;
        // proxy.newFormData2.MC = proxy.qlrmc;
        // proxy.newFormData2.ZJHM = proxy.qlrzjhm;
        // 得到新表单数据
        console.log(proxy.newFormData2);
        // 将新表单数据渲染
        vFormRef.value.getFormData(proxy.newFormData2).then((formData) => {
          vFormRef.value.setFormData(proxy.newFormData2);
        });
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
//数据保存到数据库中
const conserve = () => {
  console.log("11111111");
  //放到djsjd数据库
  let slbh = route.currentRoute._rawValue.query.slbh;
  let DABH  = document.getElementsByClassName('el-input__inner')[1].value;
  let xgzh = document.getElementsByClassName('el-input__inner')[8].value

  //初审点提交写入sql
  var data2 = {
    wfmactinst2:
      "update wfm_actinst set savetime =to_date(to_char(sysdate,'yyyy/MM/dd hh24:mi:ss'),'yyyy/MM/dd hh24:mi:ss'),stepstate = '" +
      "已完成" +
      "'where prjid = '" +
      slbh +
      "' and stepname='收件'",
    dj_update:"update DJ_CF set GDH='"+DABH+"',DAMJ='1' where slbh='"+slbh+"' and xgzh='"+xgzh+"'",
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
const pass = () => {
  const param = [
    {
      name: "gd",
      value: true,
    },
  ];
  proxy.$http
    .get(
      "/flow/SCDJ/audit?variate=yes&taskId=" +
        taskId +
        "&taskName=" +
        taskName.slice(-2)
    )
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        ElMessage({
          message: "已通过",
          type: "success",
        });
        router.push({
          path: "/cfdj",
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
    .get("/flow/CFDJ/audit?variate=no&taskId=" + taskId + "&taskName=gd")
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        ElMessage({
          message: "已拒绝",
          type: "success",
        });
        router.push({
          path: "/cfdj",
        });
      } else {
        ElMessage.error("操作失败");
      }
    })
    .catch(function (err) {
      ElMessage.error("操作失败");
    });
};

// const submitForm = () => {

//   getWidgetRef('select40740O').field.options.optionItems().then(optionData => {
//     // Form Validation OK
//     console.log(JSON.stringify(optionData));
//   }).catch(error => {
//     // Form Validation failed
//     ElMessage.error(error)
//   })
// }
onMounted(() => {
  getInputData();
  getformJson();
  show();
  fromname();
  // submitForm();
});
</script>

<style>
.formcontent {
  width: 76.34%;
}
</style>
