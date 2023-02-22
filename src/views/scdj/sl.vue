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
      <el-dialog v-model="dialogFormVisible" title="选择受理">
        <el-form :model="form" label-width="120px">
          <el-form-item label="受理">
            <el-select v-model="form.region" @change="dataslr" placeholder="选择受理人">
              <el-option v-for="(item, index) in proxy.region" :label="item" :key="index" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="下一个表单">
            <el-select v-model="form.namedata" @change="databd" placeholder="选择表单">
              <el-option v-for="(item, index) in proxy.namedata" :label="item.label" :key="index" :value="item.value" />
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
  namedata: "首次登记收费.json",
});

const formJson = reactive({});
const route = useRouter();
const taskId = route.currentRoute._value.query.id;
const taskName = router.currentRoute.value.name;
const slbh = route.currentRoute._value.query.slbh;
var data = {
  //土地信息
  tdxx: "SELECT  * FROM ZD_QSDC WHERE BDCDYH = (SELECT  bdcdyh FROM DJ_DJB WHERE BDCZH = (select xgzh  from  dj_djb where SLBH='" + slbh + "'))",
  ggtdqlxz: "select itemval,itemname from dic_item where diccode = (select diccode from dic_main where dicname='土地权利性质') order by itemorder",
  ggtdqllx: "select itemval,itemname from dic_item where diccode = (select diccode from dic_main where dicname='土地权利类型') order by itemorder",
  sxqlsdfs: "select itemval, itemname from dic_item where diccode = (select diccode from dic_main where dicname='权利设定方式')"
}
//受理插入
// var data = {
//   "djtsgl": "insert  into  dj_tsgl  (glbm,slbh,bdclx,tstybm,bdcdyh,djzl,cssj,lifecycle) values ('" + glbm + "','" + slbh + "','" + bdclx + "','" + tstybm + "','" + bdcdyh + "','" + djzl + "','" + to_date(to_char(sysdate, 'yyyy/MM/dd hh24:mi:ss'), 'yyyy/MM/dd hh24:mi:ss') + "','-1')",
//   "qltdxg": "insert  into  ql_tdxg  (qlbh,slbh,qllx,qlxz,syqx,qsrq,zzrq,tdyt,tdsyqr,gytdmj,dytdmj,fttdmj,jzzdmj,jzwzdmj,tdytms) values ('" + qlbh + "','" + slbh + "','" + qllx + "','" + qlxz + "','" + syqx + "','" + qsrq + "','" + zzrq + "','" + tdyt + "','" + tdsyqr + "','" + gytdmj + "','" + dytdmj + "','" + fttdmj + "','" + jzzdmj + "','" + jzwzdmj + "','" + tdytms + "')",
//   "qlfwxg": "insert  into  ql_fwxg  (qlbh,slbh,qllx,qlxz,jzmj,tnjzmj,ftjzmj,qdfs,qdjg,jzmjms,ghytms,ghyt,pgje,jzwlx,gzwlx)  values  ('" + qlbh + "','" + slbh + "','" + qllx + "','" + qlxz + "','" + jzmj + "','" + tnjzmj + "','" + ftjzmj + "','" + qdfs + "','" + qdjg + "','" + jzmjms + "','" + ghytms + "','" + ghyt + "','" + pgje + "','" + jzwlx + "','" + gzwlx + "')",
//   "wfmactinst1": "insert into wfm_actinst(wrkid,prjid,mdltype,mdlid,stepname,submitby,submittime,acceptby,accepttime,savetime,submittype,completetime,stepstate,steptype,stepnum,steplimtt,biztype) values ('" + wrkid + "','" + prjid + "','" + mdltype + "','" + mdlid + "','" + stepname + "','" + submitby + "','" + submittime + "','" + acceptby + "','" + accepttype + "','" + savetime + "','" + submittype + "','" + completetime + "','" + stepstate + "','" + stepnum + "','" + steplimtt + "','" + biztype + "','" + steptype + "')",
// }
function myFunction() {
  /* 获取文本内容 */
  var text = document.getElementById("input42368").value;
  /* 弹出内容 */
  alert("文本为: " + text);
}
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
const getformJson = () => {
  proxy.$http.post("/test/sqls", data).then(
    (res) => {
      console.log('写入数据', res);
      proxy.optionData = res.data;
      let data1 = res.data.data.tdxx[0]
      let data = {};
      for (var key in data1) {
        data[key] = data1[key]
      }
      console.log(data);
      const getData = JSON.parse(JSON.stringify(data));
      proxy.newFormData = getData;
    },
    proxy.$http
      .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
      .then((res) => {
        vFormRef.value.setFormJson(res.data);
        proxy.$nextTick(() => {
          // vFormRef.value.getFormData(proxy.newFormData).then((formData) => {
          vFormRef.value.setFormData(proxy.newFormData);
          // });
        });
      })
  );
};
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

const databd = (val) => {
  form.namedata = val;
};
const preservation = () => {
  let zdtybm = document.getElementsByTagName('input')[0].value  //宗地统一编码
  let qlsdfs = document.getElementsByTagName('input')[1].value  //权力设定方式
  let qllx = document.getElementsByTagName('input')[2].value  //权力类型
  let qlxz = document.getElementsByTagName('input')[3].value  //权力性质
  let rjl = document.getElementsByTagName('input')[4].value  //容积率
  let tdyt = document.getElementsByTagName('input')[5].value  //土地用途
  let zdmj = document.getElementsByTagName('input')[6].value  //宗地面积
  let jzmd = document.getElementsByTagName('input')[7].value  //建筑密度
  let jzxg = document.getElementsByTagName('input')[8].value  //建筑限高
  let tdzl = document.getElementsByTagName('input')[9].value  //土地坐落
  let glzh = document.getElementsByTagName('input')[10].value  //关联证号
  let fwbh = document.getElementsByTagName('input')[11].value  //房屋编号
  let xmmc = document.getElementsByTagName('input')[12].value  //项目名称
  let fwzdmj = document.getElementsByTagName('input')[13].value  //房屋占地面积
  let fwjzmj = document.getElementsByTagName('input')[14].value  //房屋建筑面积
  let fwjg = document.getElementsByTagName('input')[15].value  //房屋结构
  let fwzcs = document.getElementsByTagName('input')[16].value  //房屋总层数
  let fwzl = document.getElementsByTagName('input')[17].value  //房屋坐落
  let zhs = document.getElementsByTagName('input')[23].value  //总户数
  let zjzmj = document.getElementsByTagName('input')[24].value  //总建筑面积
  let ztnmj = document.getElementsByTagName('input')[25].value  //总套内面积
  let zftmj = document.getElementsByTagName('input')[26].value  //总分摊面积
  let zfttdmj = document.getElementsByTagName('input')[27].value  //总分摊土地面积
  let zz = document.getElementsByTagName('input')[28].value  //住宅
  let zzjzmj = document.getElementsByTagName('input')[29].value  //住宅建筑面积
  let zztnmj = document.getElementsByTagName('input')[30].value  //住宅套内面积
  let zzftmj = document.getElementsByTagName('input')[31].value  //住宅分摊面积
  let zzfttdmj = document.getElementsByTagName('input')[32].value  //住宅分摊土地面积
  let fzz = document.getElementsByTagName('input')[33].value  //非住宅
  let fzzjzmj = document.getElementsByTagName('input')[34].value  //非住宅建筑面积
  let fzztnmj = document.getElementsByTagName('input')[35].value  //非住宅套内面积
  let fzzftmj = document.getElementsByTagName('input')[36].value  //非住宅分摊面积
  let fzzfttdmj = document.getElementsByTagName('input')[37].value  //非住宅分摊土地面积


  let sql1 = "insert  into  dj_tsgl  (glbm,slbh,bdclx,tstybm,bdcdyh,djzl,cssj,lifecycle)values('" + glbm + "','" + slbh + "','" + bdclx + "','" + tstybm + "','" + bdcdyh + "','" + djzl + "','" + cssj + "','-1')";
  let sql2 = "insert  into  ql_tdxg  (qlbh,slbh,qllx,qlxz,syqx,qsrq,zzrq,tdyt,tdsyqr,gytdmj,dytdmj,fttdmj,jzzdmj,jzwzdmj,tdytms)values('" + qlbh + "','" + slbh + "','" + qllx + "','" + qlxz + "','" + syqx + "','" + qsrq + "','" + zzrq + "','" + tdyt + "','" + tdsyqr + "','" + gytdmj + "','" + dytdmj + "','" + fttdmj + "','" + jzzdmj + "','" + jzwzdmj + "','" + tdytms + "')";
  let sql3 = "insert  into  ql_fwxg  (qlbh,slbh,qllx,qlxz,jzmj,tnjzmj,ftjzmj,qdfs,qdjg,jzmjms,ghytms,ghyt,pgje,jzwlx,gzwlx)  values  ('" + qlbh + "','" + slbh + "','" + qllx + "','" + qlxz + "','" + jzmj + "','" + tnjzmj + "','" + ftjzmj + "','" + qdfs + "','" + qdjg + "','" + jzmjms + "','" + ghytms + "','" + ghyt + "','" + pgje + "','" + jzwlx + "','" + gzwlx + "')"
}
// 通过
const confirm = () => {
  proxy.$http
    .get(
      " /flow/SCDJ/audit?variate=yes&taskId=" +
      taskId +
      "&taskName=" +
      taskName.slice(-2) +
      "&users=sfusers&user=" +
      proxy.ID +
      "&name=" +
      form.namedata
    )
    .then((res) => {
      const code = res.data.code;
      if (code === 0) {
        store.dispatch("gblc", "sf");
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
});
</script>

<style>
.formcontent {
  width: 90%;
  margin: 0 auto;
}
</style>
