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
              placeholder="转移发证.json"
            >
              <!-- <el-option
                v-for="(item, index) in proxy.namedata"
                :label="item"
                :key="index"
                :value="item"
              /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="下一个发证人">
            <el-select
              v-model="form.region"
              @change="dataslr"
              placeholder="请选择发证人"
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
import { useStore } from "vuex";
import Cookies from "js-cookie";
import { nextTick } from "vue";
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
  oldssjc: "",
  oldtdsyqr: "",
  oldzl: "",
  oldbdcdyh: "",
  oldzdmj: "",
  oldqllx: "",
  oldqlxz: "",
  oldtdyt: "",
  olddytdmj: "",
  oldfttdmj: "",
  oldsyqx: "",
  oldqsrq: "",
  oldzzrq: "",
  oldqdrq: "",
  oldqdfs: "",
  oldghyt: "",
  oldfjqlxz: "",
  oldfjqllx: "",
  oldxm: "",
  oldzjhm: "",
  oldzjzl: "",
  oldgyfs: "",
  olddbr: "",
  olddbcqzh: "",
  olddjrq: "",
});

const formJson = reactive({});
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
// console.log(taskName);
// console.log(taskId);
// js查询数据
var slbh = router.currentRoute._rawValue.query.slbh;
var data = {
  djsjd: "select SLBH,ZL,DJXL,DJDL,QYXS from DJ_SJD where SLBH ='" + slbh + "'",
  djdjb:
    "select SLBH, DJLX, DJYY, SQZSBS, SQFBCZ, SQRQ, SQNR, SQBZ, DLJGMC, DLRXM, DLRZJLX, DLRZJH, DLRZGZH, DLRDH, DLJGMC2, DLRXM2, DLRZJLX2, DLRZJH2, DLRZGZH2, DLRDH2, SPDW, SPRQ, SPBZ, BDCZH, SSJC, JGJC, FZND, ZSH, SZR, GYFS, GYFE, DJRQ, DBR, ZSR, FZJG, FZRQ, ZSLX, ZSXLH, DYCS, GDH, DAMJ, QT, FJ, XGZH, BDCDYH, LIFECYCLE from DJ_DJB where SLBH ='" +
    slbh +
    "'",
  qlfwxg:
    "select QLBH,SLBH,QLLX,QLXZ,JZMJ,TNJZMJ,FTJZMJ,QDJG,QDFS,JZMJMS,GHYTMS,QTNRMS,XCCJMJ,GCCJMJ,WZNF,WZJZMJ,GHYT from QL_FWXG where SLBH = '" +
    slbh +
    "'",
  qltdxg:
    "select QLBH,SLBH,QLLX,QLXZ,SYQX,QSRQ,ZZRQ,TDYT,TDSYQR,GYTDMJ,DYTDMJ,FTTDMJ,JZZDMJ from QL_TDXG where SLBH = '" +
    slbh +
    "'",
  qlrgl:
    "select b.zjlb,a.qlrlx,a.qlrmc,a.zjhm from dj_qlrgl a left join dj_qlr b on a.qlrid=b.qlrid where a.slbh ='" +
    slbh +
    "'",
  ggmjdwjxswskz:
    "select ITEMVAL,ITEMNOTE from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '面积单位及小数位数控制' AND ROWNUM < 2) AND ITEMNAME = '房屋（建筑物）所有权' AND ROWNUM < 2",
  ggfwqlxz:
    "select itemval,itemname from dic_item where diccode = (select diccode from dic_main where dicname='房屋权利性质' and dictype='通用字典') order by itemorder",
  ggfwqdfs:
    "select itemval,itemname from dic_item where diccode = (select diccode from dic_main where dicname='房屋取得方式' and dictype='通用字典') order by itemorder",
  ggtdqllx:
    "select itemval,itemname from dic_item where diccode = (select diccode from dic_main where dicname='土地权利类型' and dictype='通用字典') order by itemorder",
  ggtdqlxz:
    "select itemval,itemname from dic_item where diccode = (select diccode from dic_main where dicname='土地权利性质' and dictype='通用字典') order by itemorder",
  ggfwqllx:
    "select itemval,itemname from dic_item where diccode = (select diccode from dic_main where dicname='房屋权利类型' and dictype='通用字典') order by itemorder",
  ggdjlxdl:
    "select itemval,itemname from dic_item where diccode = (select diccode from dic_main where dicname='房屋权利类型' and dictype='通用字典') order by itemorder",
  ggdjxl:
    "select ITEMNOTE,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '国有建设用地使用权及房屋所有权转移登记' AND ROWNUM<2) ORDER BY ITEMORDER",
  ggxgxsxz:
    "select itemval from dic_item where diccode = (select diccode from dic_main where dicname='限购限售控制' and dictype='通用字典') and itemname ='限售' order by itemorder",
};
//表单数据获取
const getInputData = () => {
  axios.post("/test/sqls", data).then((res) => {
    console.log("44444", res.data.data);
    // 获取sql查询到的数据
    // proxy.newFormData = res.data.data.djsjd;
    // 获取受理编号
    proxy.oldtdsyqr = res.data.data.qltdxg[0].TDSYQR;
    proxy.oldzl = res.data.data.djsjd[0].ZL;
    proxy.oldbdcdyh = res.data.data.djdjb[0].BDCDYH;
    proxy.oldzdmj = res.data.data.qltdxg[0].JZZDMJ;
    proxy.oldtdqllx = res.data.data.qlfwxg[0].QLLX;
    proxy.oldtdqlxz = res.data.data.qlfwxg[0].QLXZ;
    proxy.oldtdyt = res.data.data.qltdxg[0].TDYT;
    proxy.olddytdmj = res.data.data.qltdxg[0].DYTDMJ;
    proxy.oldfttdmj = res.data.data.qltdxg[0].FTTDMJ;
    proxy.oldsyqx = res.data.data.qltdxg[0].SYQX;
    proxy.oldqsrq = res.data.data.qltdxg[0].QSRQ;
    proxy.oldzzrq = res.data.data.qltdxg[0].ZZRQ;
    proxy.oldqdfs = res.data.data.qlfwxg[0].QDFS;
    proxy.oldghyt = res.data.data.qlfwxg[0].GHYTMS;
    proxy.oldfjqlxz = res.data.data.qlfwxg[0].QLXZ;
    proxy.oldfjqllx = res.data.data.qlfwxg[0].QLLX;
    proxy.oldxm = res.data.data.qlrgl[0].QLRMC;
    proxy.oldzjhm = res.data.data.qlrgl[0].ZJHM;
    proxy.oldzjzl = res.data.data.qlrgl[0].ZJLB;
    proxy.oldgyfs = res.data.data.djdjb[0].GYFS;
    proxy.olddbr = res.data.data.djdjb[0].DBR;
    proxy.olddbcqzh = res.data.data.djdjb[0].BDCZH;
    proxy.olddjrq = res.data.data.djdjb[0].DJRQ;
    // 下拉框内容渲染
    // nextTick(() => {
    //   setTimeout(() => {
    //     const input1 = document.getElementsByClassName("el-input__inner");
    //     console.log(input1);
    //     const ul = document.getElementsByClassName("el-scrollbar__view");
    //     const ulSsjc = ul[0];
    //     ulSsjc.innerHTML = "";
    //     const ssjc = res.data.data.ggtdqlxz;
    //     console.log(ssjc);
    //     console.log(ssjc.length);

    //     for (let i = 0; i < ssjc.length; i++) {
    //       ulSsjc.innerHTML += `<li class ='el-select-dropdown__item ir'>${ssjc[i].ITEMNAME}</li>`;
    //       var ir = document.getElementsByClassName("el-select-dropdown__item");
    //     }
    //     console.log(ir.length);
    //     input1[0].value = ir[0].innerHTML;
    //     for (let j = 0; j < ir.length; j++) {
    //       ir[j].onclick = function () {
    //         input1[0].value = this.innerHTML;
    //       };
    //     }
    //   }, 2000);
    // });
  });
};

// 获取表单
const getformJson = () => {
  proxy.$http
    .get("/flow/formJson?taskName=dbsz&taskId=" + taskId)
    .then((res) => {
      vFormRef.value.setFormJson(res.data);
      // 获取表单空数据
      vFormRef.value.getFormData().then((formData) => {
        // console.log(formData);
        proxy.newFormData2 = formData;
        // 将后端获取的受理编号赋值给新表单
        // 土地使用权人
        proxy.newFormData2.tdsyqr = proxy.oldtdsyqr;
        proxy.newFormData2.zl = proxy.oldzl;
        proxy.newFormData2.bdcdyh = proxy.oldbdcdyh;
        proxy.newFormData2.zdmj = proxy.oldzdmj;
        proxy.newFormData2.tdqllx = proxy.oldtdqllx;
        proxy.newFormData2.tdqlxz = proxy.oldtdqlxz;
        proxy.newFormData2.tdyt = proxy.oldtdyt;
        proxy.newFormData2.dytdmj = proxy.olddytdmj;
        proxy.newFormData2.fttdmj = proxy.oldfttdmj;
        proxy.newFormData2.syqx = proxy.oldsyqx;
        proxy.newFormData2.qsrq = proxy.oldqsrq;
        proxy.newFormData2.zzrq = proxy.oldzzrq;
        proxy.newFormData2.qdfs = proxy.oldqdfs;
        proxy.newFormData2.ghyt = proxy.oldghyt;
        proxy.newFormData2.fjqlxz = proxy.oldfjqlxz;
        proxy.newFormData2.fjqllx = proxy.oldfjqllx;
        proxy.newFormData2.XM = proxy.oldxm;
        proxy.newFormData2.ZJHM = proxy.oldzjhm;
        proxy.newFormData2.ZJZL = proxy.oldzjzl;
        proxy.newFormData2.GYFS = proxy.oldgyfs;
        proxy.newFormData2.DBR = proxy.olddbr;
        proxy.newFormData2.BDCQZH = proxy.olddbcqzh;
        proxy.newFormData2.DJRQ = proxy.olddjrq;
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
const fromname = () => {
  proxy.$http.get("/flow/form").then((res) => {
    const namedata = res.data;
    proxy.namedata = namedata;
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
        "&taskName=dbsz&users=fzusers&user=" +
        proxy.ID +
        "&name=转移发证.json" 
        // +
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
      // console.log(err);
      ElMessage.error("操作失败");
    });
};
const conserve = () => {
  //   if(glbm !== undefined || glbm !== null){
  // glbm=this.glbm
  //   }else{
  //     glbm=""
  //   }
  let slbh = $router.currentRoute._rawValue.query.slbh;
  let ljr = "";
  let fzjg = document.getElementsByClassName("el-input__inner")[23].value;
  let szr = document.getElementsByClassName("el-input__inner")[31].value;
  let dbr = document.getElementsByClassName("el-input__inner")[29].value;
  let fzrq = document.getElementsByClassName("el-input__inner")[30].value;
  let zsxlh = "";

  //qlfwxg
  var data3 = {
    djtsgl:
      "UPDATE DJ_TSGL SET LIFECYCLE=0 WHERE SLBH='" +
      slbh +
      "' AND LIFECYCLE=-1",
    djdjb:
      "update dj_djb set fzjg='" +
      fzjg +
      "',szr='" +
      szr +
      "',dbr='" +
      dbr +
      "',fzrq='" +
      fzrq +
      "',zsxlh='" +
      zsxlh +
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
  getInputData();
  getformJson();
  show();
  fromname();
});
</script>

<style>
.formcontent {
  width: 70%;
}
</style>
