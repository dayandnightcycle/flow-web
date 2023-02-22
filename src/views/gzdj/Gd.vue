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
        <el-button
          class="logout"
          id="logout-button"
          type="primary"
          @click="logout"
          >退出</el-button
        >
        <el-button type="primary" @click="conserve">保存</el-button>
        <el-button type="primary" @click="pass">通过</el-button>
        <el-button type="danger" @click="refuse">拒绝</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
    import {
        ref,
        reactive,
        onMounted,
        getCurrentInstance
    } from "vue";
    import {
        ElMessage
    } from "element-plus";
    import axios from "axios";
    import router from "../../router";
    import {
        useRouter
    } from "vue-router";
    import Cookies from "js-cookie";
    import {
        nextTick
    } from "vue";
    import {
        useStore
    } from "vuex";
    const $router = useRouter();
    const {
        proxy
    } = getCurrentInstance();
    const vFormRef = ref(null);
    const formData = reactive({});
    const optionData = reactive({});
    const form = reactive({
        gridData: "",
        shdata: "",
    });
    const route = useRouter();
    const taskId = route.currentRoute._value.query.id;
    const taskName = router.currentRoute.value.name;
    const formJson = reactive({});
    var slbh = $router.currentRoute._rawValue.query.slbh;
    var data = {
        djsjd: "select SLBH, LCLX, LCMC, SJR, SJSJ, CNSJ, QXDM, TZRXM, TZFS, TZRDH, TZRYDDH, TZRDZYJ, TZRTXDZ, CXMM, SJMC, SJLX, SJSL, YS, SFSYBZ, SFEWSJ, SFBCSJ, ZRKS, ZRR, YXJ, SJBZ, BCSM, FCSLH, FCDJLX, FCHID,ZL from DJ_SJD where SLBH = " +
            "'" +
            slbh +
            "'",
        djdjb: "select SZR,DBR,ZSR,JGJC,FZND,ZSH,SSJC,FJ,GYFS,GYFE,SLBH,DJLX,SPDW,SPRQ,BDCZH,GDH,DJRQ,FZJG,FZRQ,ZSLX,ZSXLH,DYCS,QT,LIFECYCLE,SQRQ,SQNR,SQBZ,DLRZGZH,DLJGMC,SPBZ,XGZH,BDCDYH,DJYY,DAMJ,SQZSBS,SQFBCZ from DJ_DJB where (SLBH LIKE " +
            "'" +
            slbh +
            "%') AND '{CZLX}'<>'录入'AND " +
            "'" +
            slbh +
            "' IS NOT NULL AND ROWNUM <2 AND BDCZH IS NOT NULL",
        djdjbgs: "select COUNT(0) AS GS from DJ_DJB where (SLBH LIKE " +
            "'" +
            slbh +
            "%') AND '{CZLX}'<>'录入'AND " +
            "'" +
            slbh +
            "' IS NOT NULL AND BDCZH IS NOT NULL",
        djtsgl: "select GLBM, SLBH, BDCLX, TSTYBM, BDCDYH, DJZL, GLMS, CSSJ from DJ_TSGL where (SLBH LIKE " +
            "'" +
            slbh +
            "%') AND '{CZLX}'<>'录入'AND " +
            "'" +
            slbh +
            "' IS NOT NULL",
        qltdxg: "select SUM(GYTDMJ) AS GYTDMJ,  SUM(DYTDMJ) AS DYTDMJ , MAX(QLLX) AS QLLX from QL_TDXG where (SLBH LIKE " +
            "'" +
            slbh +
            "%') AND '{CZLX}'<>'录入'AND " +
            "'" +
            slbh +
            "' IS NOT NULL",
        qlfwxg: "select SUM(JZMJ) AS JZMJ from QL_FWXG where (SLBH LIKE " +
            "'" +
            slbh +
            "%') AND '{CZLX}'<>'录入'AND " +
            "'" +
            slbh +
            "' IS NOT NULL",
        ggdamj: "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '档案密级' AND ROWNUM < 2) ORDER BY ITEMORDER",
        ggssxq: "select ITEMNOTE,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '所属辖区' AND ROWNUM<2) ORDER BY ITEMORDER",
        ggdafl: "select ITEMNOTE,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '档案分类' AND ROWNUM<2) ORDER BY ITEMORDER",
        ggdabhqz: "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '档案编号前缀'AND ROWNUM<2) ORDER BY ITEMORDER",
        ggsqsqlrkz: "select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '打印设置' AND ROWNUM < 2) AND ITEMNAME = '申请书权利人控制' AND ROWNUM < 2",
    };

    //表单数据获取
    const getInputData = () => {
        axios.post("/test/sqls", data).then((res) => {
            console.log(res.data.data);
            proxy.shdata = res.data.data;
            // 获取sql查询到的数据
            // 获取受理编号
            // proxy.oldbdcdyh = res.data.data.djdjb[0].BDCDYH;
            // proxy.olddbczsh = res.data.data.djdjb[0].BDCZH;
            // proxy.oldzsxlh = res.data.data.djdjb[0].ZSXLH;
            // proxy.oldfzrq = res.data.data.djdjb[0].FZRQ;
            // proxy.oldys = res.data.data.djsjd[0].YS;
        });
    };
    // 获取表单
    const getformJson = () => {
        proxy.$http
            .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
            .then((res) => {
                vFormRef.value.setFormJson(res.data);
                // 获取表单空数据
                vFormRef.value.getFormData().then((formData) => {
                    // console.log(formData);
                    proxy.newFormData2 = formData;
                    // 将后端获取的受理编号赋值给新表单
                    // 土地使用权人
                    // proxy.newFormData2.tdsyqr = proxy.oldtdsyqr;
                    proxy.newFormData2.QLRMC = proxy.shdata.djsjd[0].TZRXM;
                    proxy.newFormData2.SJZL = proxy.shdata.djsjd[0].ZL;
                    proxy.newFormData2.BDCDYH = proxy.shdata.djtsgl[0].BDCDYH;
                    proxy.newFormData2.SLBH = proxy.shdata.djtsgl[0].SLBH;
                    proxy.newFormData2.SSXQ = proxy.shdata.ggssxq[0].ITEMNAME;
                    proxy.newFormData2.JZMJ = proxy.shdata.qlfwxg[0].JZMJ;
                    proxy.newFormData2.FZRQ = proxy.oldfzrq;
                    proxy.newFormData2.YS = proxy.oldys;
                    // 得到新表单数据
                    // console.log(proxy.newFormData2);
                    // 将新表单数据渲染
                    // vFormRef.value.getFormData(proxy.newFormData2).then((formData) => {
                    // console.log(proxy.newFormData2);
                    proxy.$http.get("/flow/GZDJ/lcmc?taskId=" + taskId).then((res) => {
                        proxy.newFormData2.DBR = res.data.data[0].userName;
                        vFormRef.value.setFormData(proxy.newFormData2);
                    });
                    // });
                });
            });
    };
    const pass = () => {
        const param = [{
            name: "gd",
            value: true,
        }, ];
        proxy.$http
            .get(
                "/flow/GZDJ/audit?variate=yes&taskId=" +
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
                        path: "/gzdj",
                    });
                } else {
                    ElMessage.error("操作失败");
                }
            })
            .catch(function(err) {
                console.log(err);
                ElMessage.error("操作失败");
            });
    };

    const refuse = () => {
        const param = [{
            name: "gd",
            value: false,
        }, ];
        proxy.$http
            .get(
                "/flow/ZYDJ/audit?variate=no&taskId=" +
                taskId +
                "&taskName=" +
                taskName.slice(-2)
            )
            .then((res) => {
                const code = res.data.code;
                if (code === 0) {
                    ElMessage({
                        message: "已拒绝",
                        type: "success",
                    });
                    router.push({
                        path: "/zydj",
                    });
                } else {
                    ElMessage.error("操作失败");
                }
            })
            .catch(function(err) {
                console.log(err);
                ElMessage.error("操作失败");
            });
    };

    const logout = () => {
        window.localStorage.removeItem("token");
        router.push({
            path: "/login",
        });
    };
    const conserve = () => {
        //   if(glbm !== undefined || glbm !== null){
        // glbm=this.glbm
        //   }else{
        //     glbm=""
        //   }
        let slbh = $router.currentRoute._rawValue.query.slbh;
        let gdh = "";
        let damj = "";
        //qlfwxg
        var data3 = {
            djdjb: "update dj_djb set gdh = '" +
                gdh +
                "',damj = '" +
                damj +
                "'where slbh = '" +
                slbh +
                "'",
        };
        let config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        axios
            .post("/test/sqls", data3, config)
            .then((res) => {
                console.log("res", res);
                if (res.data.code === 0) {
                    // store.dispatch("gblc", "sl");
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
    });
</script>

<style scoped>
    .logout {
        position: absolute;
        right: 5px;
        top: 5px;
    }
    
    .formcontent {
        width: 70%;
    }
</style>