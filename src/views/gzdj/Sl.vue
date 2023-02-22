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
            <el-input v-model="input" placeholder="gzdj-sf.json" />
            <!--<el-select
              v-model="form.namedata"
              @change="databd"
              placeholder="转移收费.json"
            >
               <el-option
                v-for="(item, index) in proxy.namedata"
                :label="item"
                :key="index"
                :value="item"
              /> 
            </el-select>-->
          </el-form-item>
          <el-form-item label="下一位收费人">
            <el-select
              v-model="form.region"
              @change="dataslr"
              placeholder="请选择收费人"
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
    import Cookies from "js-cookie";
    import {
        nextTick
    } from "vue";
    import {
        useRouter
    } from "vue-router";
    const $router = useRouter();
    const {
        proxy
    } = getCurrentInstance();
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
        // olddata: "",
        hnew: "",
        newFormData: "",
        newFormData2: "",
        newFormData3: "",
        newFormData4: "",
        newFormData5: "",
        // oldXGZH: "",
        // oldTZRXM: "",
        // oldDJDL: "",
        // oldDJXL: "",
        // oldDJYY :"",
        // oldGYFS :"",
        // oldZL: "",
        // oldSLKS: "",
        // oldYXJ: "",
        // oldBDCSZQY: "",
        // oldCXMM: "",
        // oldTZRDH: "",
        // oldTZRYDDH: "",
        // oldDZYJ: "",
        shuju: "",
        // oldQLRMC: "",
        // oldQLRZJHM:"",
        // oldXGZHZL:"",
        // oldQLRZJZL:"",
        bdcdyh1: "",
        zrzh1: "",
        xmmc1: "",
        bdczh1: "",
        fwzl1: "",
        arr: "",
    });
    const formJson = reactive({});
    const route = useRouter();
    const taskId = route.currentRoute._value.query.id;
    const taskName = router.currentRoute.value.name;
    //收件单数据
    var slbh1 = router.currentRoute._rawValue.query.slbh;
    var data1 = {
        xgzh: "SELECT a.XGZH,a.XGZLX,a.FSLBH,b.zl，c.qlrmc FROM DJ_XGDJGL a left join dj_sjd b on a.fslbh=b.slbh left join dj_qlrgl c on b.slbh=c.slbh   WHERE ZSLBH = '" + slbh1 + "' and c.qlrlx = '权利人'",
        djsjd: "select * from DJ_SJD where SLBH= '" + slbh1 + "'",
        djtsgl: "select GLBM, SLBH, BDCLX, TSTYBM, BDCDYH, DJZL, GLMS, CSSJ from DJ_TSGL where SLBH = '" +
            slbh1 +
            "' AND (BDCLX = '房屋' OR  BDCLX = '多幢房屋')",
        djytsgl: "select GLBM, SLBH, BDCLX, TSTYBM, BDCDYH, DJZL, GLMS, CSSJ from DJ_TSGL where SLBH IN (SELECT FSLBH FROM DJ_XGDJGL WHERE ZSLBH = '" +
            slbh1 +
            "' AND PID IS NULL) AND (BDCLX = '房屋' OR  BDCLX = '多幢房屋')",
        qlfwxg: "select QLBH,SLBH,QLLX,QLXZ,JZMJ,TNJZMJ,FTJZMJ,QDJG,QDFS,JZMJMS,GHYTMS,GHYT,PGJE,JZWLX,GZWLX from QL_FWXG where SLBH = '" +
            slbh1 +
            "'",
        qltdxg: "select QLBH,SLBH,QLLX,QLXZ,SYQX,QSRQ,ZZRQ,TDYT,TDSYQR,GYTDMJ,DYTDMJ,FTTDMJ,JZZDMJ,JZWZDMJ from QL_TDXG where SLBH = '" +
            slbh1 +
            "'",
        djdjb: "select DJYY,GYFS,SLBH,SQZSBS,SQFBCZ, SQRQ, SQNR, SQBZ, DJRQ, DBR, ZSR, FZJG, FZRQ, DAMJ, QT, FJ, XGZH, BDCDYH, LIFECYCLE,DJRQ,GDH,SPBZ from DJ_DJB where SLBH = '" +
            slbh1 +
            "'",
        djydjb: "select SLBH, QT, FJ from DJ_DJB where SLBH IN (SELECT FSLBH FROM DJ_XGDJGL WHERE ZSLBH ='" +
            slbh1 +
            "' AND PID IS NULL)",
        fchqsdc: "select TSTYBM, ZDTYBM, ZH, HH, BDCDYH, LSZTYBM, LSFWBH, QLLX, QLXZ, HX, HXJG, ZXCD, GHYT, ZL, SJC, MYC, DYH, FJH, LJZH, QDJG, QDFS, SHBW, JZMJ, TNJZMJ, FTJZMJ, DXBFJZMJ, QTJZMJ, FTXS, TDZZRQ, TDYT, TDSYQR, GYTDMJ, FTTDMJ, DYTDMJ, FWLX, FWXZ, SJCS, CG, ZT, LIFECYCLE,TDQSRQ,TDSYQX, HLX, GZWLX from FC_H_QSDC where TSTYBM = (select TSTYBM from DJ_TSGL where SLBH = '" +
            slbh1 +
            "'and rownum <2)",
        zdqsdc: "select TSTYBM, ZDLX, ZDTYBM, SJZDTYBM, BDCDYH, DJH, QSDWDM, QSDWMC, ZLDWDM, ZLDWMC, TDZL, QLRMC, QLLX, QLXZ, TDSYZ, DYMJ, FTMJ, SFGYZ, PZTDYT, SJTDYT, GYSYQQK, SCMJ, FZMJ, SZTFH, JZMJ, JZWZDMJ, JZRJL, JZMD, JZXG, QDFS, SZD, SZN, SZX, SZB, SM, ZDZT, ZBCLXXX, ZDTZM, QLSDFS, JZDCY, ZJWTS, ZDCTHZY, ZDCTHZRQ, QSDCJS, DCY, DCRQ, JZBS, DJKZJS, KZY, KZRQ, DCSHYJ, DCSHR, DCSHRQ, TDZMJ, NYDMJ, GDMJ, YDMJ, LDMJ, MCDMJ, NYDQTMJ, JSYDMJ, JMDMJ, JTYDMJ, SYMJ, JSYDQTMJ, WLYDMJ, GMJJHYFLDM, YBZDDM, BLC, JZDWSM, ZYQSJZZXSM, JZWLX, JZWQS, SYQX, QSRQ, ZZRQ, ZDDJ, ZDJG, DLRXM, DLRZJLX, DLRZJH, DLRDH, LIFECYCLE,TDSYZ from ZD_QSDC where ZDTYBM = (select ZDTYBM from FC_H_QSDC where TSTYBM = (select TSTYBM from DJ_TSGL where SLBH ='" +
            slbh1 +
            "'and rownum < 2)) AND (LIFECYCLE IS NULL OR LIFECYCLE = '0')",
        qlr: "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('权利人','抵押权人') AND B.SLBH = '" +
            slbh1 +
            "' ORDER BY B.SXH",
        qlrdlr: "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('权利人代理人','抵押权人代理人') AND B.SLBH = '" +
            slbh1 +
            "' ORDER BY B.SXH",
        ywr: "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('义务人','抵押人') AND B.SLBH = '" +
            slbh1 +
            "' ORDER BY B.SXH",
        ywrdlr: "SELECT N'' AS XZ,B.SXH,B.QLRMC,A.ZJLB,A.ZJHM,B.GYFE,A.DH,B.QLRID,A.GX,N'' AS FQLR FROM DJ_QLR A INNER JOIN DJ_QLRGL B ON A.QLRID = B.QLRID WHERE B.QLRLX IN ('义务人代理人','抵押人代理人') AND B.SLBH = '" +
            slbh1 +
            "' ORDER BY B.SXH",
    };
    //登记清单数据
    var data2 = {
        choose: "select a.bdcdyh,b.zl,c.dyh,c.sjc,c.myc,c.fjh,c.hdj,c.qllx,c.qlxz,c.tnjzmj,c.ftjzmj,d.qdjg,d.ghytms,d.qdfs,d.jzwlx,d.gzwlx,e.qllx,e.qlxz,e.qsrq,e.zzrq,e.tdyt,e.gytdmj,e.dytdmj,e.fttdmj from dj_djb a left join dj_sjd b on a.slbh = b.slbh left join fc_h_qsdc c on a.bdcdyh = c.bdcdyh left join ql_fwxg d on a.slbh = d.slbh left join ql_tdxg e on a.slbh =e.slbh where a.slbh in (SELECT fslbh FROM DJ_XGDJGL WHERE ZSLBH = '" +
            slbh1 +
            "'AND PID IS NULL)",
    };
    //表单数据获取
    const getInputData = () => {
        axios.post("/test/sqls", data1).then((res) => {
            // 获取sql查询到的数据
            proxy.newFormData = res.data.data;
            console.log(" proxy.newFormData2aaaaa", proxy.newFormData);
            proxy.newFormData2 = formData;
            console.log(" proxy.newFormData2hhhhhh", proxy.newFormData2);
            proxy.newFormData2.ghyt = proxy.newFormData.qlfwxg[0].GHYT;
            proxy.newFormData2.pgje = proxy.newFormData.qlfwxg[0].PGJE;
            proxy.newFormData2.jzwlx = proxy.newFormData.qlfwxg[0].JZWLX;
            proxy.newFormData2.gzwlx = proxy.newFormData.qlfwxg[0].GZWLX;
            proxy.newFormData2.qlqtzk = proxy.newFormData.djydjb[0].QT;
            proxy.newFormData2.fj = proxy.newFormData.djydjb[0].FJ;
            proxy.newFormData2.qdfs = proxy.newFormData.qlfwxg[0].QDFS;
            proxy.newFormData2.hftmj = proxy.newFormData.qlfwxg[0].FTJZMJ;
            proxy.newFormData2.htnmj = proxy.newFormData.qlfwxg[0].TNJZM;
            proxy.newFormData2.Hjzmj = proxy.newFormData.qlfwxg[0].JZMJ;
            proxy.newFormData2.tdqllx = proxy.newFormData.qlfwxg[0].QLLX;
            proxy.newFormData2.tdqlxz = proxy.newFormData.qlfwxg[0].QLXZ;
            vFormRef.value.setFormData(proxy.newFormData2);
        });
        axios.post("/test/sqls", data2).then((res) => {
            // 获取sql查询到的数据
            console.log("res55555555555555", res.data.data);
            //一进表单就得到的房屋登记信息数据
            proxy.shuju = res.data.data.choose;
            // console.log("shuju", proxy.shuju);
        });
    };

    const getformJson = () => {
        // 获取表单json
        proxy.$http
            .get("/flow/formJson?taskName=" + taskName.slice(-2) + "&taskId=" + taskId)
            .then((res) => {
                vFormRef.value.setFormJson(res.data);
                proxy.newFormData2 = formData;
                // console.log(proxy.newFormData2);
                // 将后端获取的受理编号赋值给新表单
                // 受理编号 相关证号 登记大类 登记小类 登记原因 共有方式 相关证号坐落 权利人名称 权利人证件号码 权利人证件种类 权利人电话 受理科室 优先级 不动产所在区域 查询密码 通知人姓名 通知人电话 移动电话 电子邮件 坐落 登记清单不动产单元号 不动产单元号 单元号 房间号 权利信息坐落
                console.log("SLBH", $router.currentRoute._rawValue.query.slbh)
                proxy.newFormData2.SLBH = $router.currentRoute._rawValue.query.slbh;
                proxy.newFormData2.XGZH = proxy.newFormData.xgzh[0].XGZH;
                proxy.newFormData2.QLRMC = proxy.newFormData.xgzh[0].QLRMC;
                proxy.newFormData2.XGZLX = proxy.newFormData.xgzh[0].XGZLX;
                proxy.newFormData2.DJDL = proxy.newFormData.djsjd[0].DJDL;
                proxy.newFormData2.LCLB = proxy.newFormData.djsjd[0].LCLB;
                proxy.newFormData2.TZFS = proxy.newFormData.djsjd[0].TZFS;
                proxy.newFormData2.SLRY = "安世杰";
                proxy.newFormData2.DJXL = proxy.newFormData.djsjd[0].DJXL;
                proxy.newFormData2.SJSJ = proxy.newFormData.djsjd[0].SJSJ;
                proxy.newFormData2.CNSJ = proxy.newFormData.djsjd[0].CNSJ;
                proxy.newFormData2.DJYY = proxy.newFormData.djdjb[0].DJYY;
                proxy.newFormData2.GYFS = proxy.newFormData.djdjb[0].GYFS;
                proxy.newFormData2.XGZHZL = proxy.newFormData.xgzh[0].ZL;
                proxy.newFormData2.XH = proxy.newFormData.qlr[0].SXH;
                proxy.newFormData2.MC = proxy.newFormData.qlr[0].QLRMC;
                proxy.newFormData2.ZJHM = proxy.newFormData.qlr[0].ZJHM;
                proxy.newFormData2.ZJZL = proxy.newFormData.qlr[0].ZJLB;
                proxy.newFormData2.DH = proxy.newFormData.qlr[0].DH;
                proxy.newFormData2.SLKS = proxy.newFormData.djsjd[0].ZRKS;
                proxy.newFormData2.YXJ = proxy.newFormData.djsjd[0].YXJ;
                proxy.newFormData2.BDCSZQY = proxy.newFormData.djsjd[0].QXDM;
                proxy.newFormData2.CXMM = proxy.newFormData.djsjd[0].CXMM;
                proxy.newFormData2.TZRXM = proxy.newFormData.djsjd[0].TZRXM;
                proxy.newFormData2.TZRDH = proxy.newFormData.djsjd[0].TZRDH;
                proxy.newFormData2.YDDH = proxy.newFormData.djsjd[0].TZRYDDH;
                proxy.newFormData2.DZYJ = proxy.newFormData.djsjd[0].TZRDZYJ;
                proxy.newFormData2.ZL = proxy.newFormData.xgzh[0].ZL;
                proxy.newFormData2.YWRXH = proxy.newFormData.qlr[0].SXH
                proxy.newFormData2.YWRMC = proxy.newFormData.qlr[0].QLRMC;
                proxy.newFormData2.YWRZJZL = proxy.newFormData.qlr[0].ZJLB;
                proxy.newFormData2.YWRZJHM = proxy.newFormData.qlr[0].ZJHM;
                proxy.newFormData2.DLRXH = proxy.newFormData.qlrdlr[0].SXH
                proxy.newFormData2.DLRMC = proxy.newFormData.qlrdlr[0].QLRMC;
                proxy.newFormData2.DLRZJZL = proxy.newFormData.qlrdlr[0].ZJLB;
                proxy.newFormData2.DLRZJHM = proxy.newFormData.qlrdlr[0].ZJHM;
                proxy.newFormData2.YWRDLRXH = proxy.newFormData.ywrdlr[0].SXH
                proxy.newFormData2.YWRDLRMC = proxy.newFormData.ywrdlr[0].QLRMC;
                proxy.newFormData2.YWRDLRZJZL = proxy.newFormData.ywrdlr[0].ZJLB;
                proxy.newFormData2.YWRDLRZJHM = proxy.newFormData.ywrdlr[0].ZJHM;
                //房屋登记信息数据
                proxy.newFormData2.tdsyqr = proxy.newFormData.qlr[0].QLRMC;
                proxy.newFormData2.BDCDYH = proxy.shuju[0].BDCDYH;
                proxy.newFormData2.bdcdyh = proxy.shuju[0].BDCDYH;
                proxy.newFormData2.DYH = proxy.shuju[0].DYH;
                proxy.newFormData2.FJH = proxy.shuju[0].FJH;
                proxy.newFormData2.zl = proxy.shuju[0].ZL;
                proxy.newFormData2.GHYT = proxy.shuju[0].GHYTMS;
                proxy.newFormData2.ghyt = proxy.shuju[0].GHYTMS;
                proxy.newFormData2.XQ = "详情";

                // 得到新表单数据
                console.log(proxy.newFormData2);
                // 将新表单数据渲染
                vFormRef.value.setFormData(proxy.newFormData2);
                // let qqq = JSON.stringify(formData);
                // let qq = JSON.parse(qqq);
                // console.log("555555", qq);
                setTimeout(() => {
                    const chaxun = document.getElementsByClassName("el-button")[8];
                    console.log("111111");
                    chaxun.addEventListener("click", function() {
                        proxy.bdcdyh1 =
                            document.getElementsByClassName("el-input__inner")[84].value;
                        proxy.zrzh1 =
                            document.getElementsByClassName("el-input__inner")[85].value;
                        proxy.xmmc1 =
                            document.getElementsByClassName("el-input__inner")[86].value;
                        proxy.bdczh1 =
                            document.getElementsByClassName("el-input__inner")[87].value;
                        proxy.fwzl1 =
                            document.getElementsByClassName("el-input__inner")[88].value;
                        const fwcx = document.querySelectorAll(".fwcx")[1];
                        // console.log("fwcx", proxy.bdczh1);
                        const data4 = {
                            fwxxcx: "SELECT FWBH,ZH,LJZH,XMMC,ZCS,DSCS,DXCS,FWJG,GHYT,FWZL,TSTYBM,ZDTYBM FROM FC_Z_QSDC WHERE (LIFECYCLE = 0 OR LIFECYCLE IS NULL)  AND ZH LIKE '%" +
                                proxy.zrzh1 +
                                "%'  AND XMMC LIKE '%" +
                                proxy.xmmc1 +
                                "%' AND FWZL LIKE '%" +
                                proxy.fwzl1 +
                                "%' AND (FWBH IN (select c.lsfwbh from dj_djb a left join dj_tsgl b on a.slbh=b.slbh left join fc_h_qsdc c on b.tstybm= c.tstybm where a.bdczh like '%" +
                                proxy.bdczh1 +
                                "%') OR TSTYBM IN (select b.tstybm from dj_djb a left join dj_tsgl b on a.slbh=b.slbh left join fc_h_qsdc c on b.tstybm= c.tstybm where a.bdczh like '%" +
                                proxy.bdczh1 +
                                "%')) AND TSTYBM IN (SELECT DISTINCT LSZTYBM FROM FC_H_QSDC WHERE  BDCDYH LIKE '%" +
                                proxy.bdcdyh1 +
                                "%'  )  ORDER BY ZH",
                        };
                        let config = {
                            headers: {
                                "Content-Type": "application/json"
                            },
                        };
                        axios
                            .post("/test/sqls", data4, config)
                            .then((res) => {
                                console.log("弹框中查询数据", res.data.data);
                                let shuju1 = res.data.data.fwxxcx;
                                let shuju2 = shuju1.slice(0, 10);
                                let mm =
                                    "<tr style='width: 100%'>" +
                                    "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'><input calss='.el-checkbox__original' type='checkbox'><span style='margin-left: 10px;'>全选</span></td>" +
                                    "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'>序号</td>" +
                                    "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='170px'>房屋编号</td>" +
                                    "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>自然幢号</td>" +
                                    "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>逻辑幢号</td>" +
                                    "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='350px'>项目名称</td>" +
                                    "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'>总层数</td>" +
                                    "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>地上层数</td>" +
                                    "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>地下层数</td>" +
                                    "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>房屋结构</td>" +
                                    "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='100px'>房屋用途</td>" +
                                    "</tr>";
                                for (var i = 0; i < shuju2.length; i++) {
                                    let j = i + 1;
                                    mm +=
                                        "<tr style='width: 100%' class='tkcheck1'>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1'><input class='tkcheck' type='checkbox'></td>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1'>" +
                                        j +
                                        "</td>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1'>" +
                                        shuju2[i].FWBH +
                                        "</td>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1'>" +
                                        shuju2[i].ZH +
                                        "</td>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1'>" +
                                        shuju2[i].LJZH +
                                        "</td>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1'>" +
                                        shuju2[i].XMMC +
                                        "</td>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1'>" +
                                        shuju2[i].ZCS +
                                        "</td>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1'>" +
                                        shuju2[i].DSCS +
                                        "</td>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1'>" +
                                        shuju2[i].DXCS +
                                        "</td>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1'>" +
                                        shuju2[i].FWJG +
                                        "</td>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1'>" +
                                        shuju2[i].GHYT +
                                        "</td>" +
                                        "</tr>";
                                }

                                fwcx.innerHTML = mm;
                                document.addEventListener("click", function(e) {
                                    let tkcheck = document.getElementsByClassName("tkcheck");
                                    for (let i = 0; i < tkcheck.length; i++) {
                                        let mm = tkcheck[i];
                                        if (e.target == mm) {
                                            tkcheck;
                                            var selectcontent =
                                                document.getElementsByClassName("tkcheck1")[i].innerText;
                                        }
                                    }
                                    const selectcontent1 = document.getElementsByClassName("bg")[2];
                                    proxy.arr = selectcontent.split(/\s+/);
                                    console.log(" proxy.arr", proxy.arr);
                                    let ee =
                                        "<tr style='width: 100%'>" +
                                        "<td class='table-cell' colspan='1' rowspan='1' flex= '1' width='70px'>" +
                                        "【" +
                                        proxy.arr[2] +
                                        ";" +
                                        proxy.arr[3] +
                                        ";" +
                                        proxy.arr[4] +
                                        ";" +
                                        proxy.arr[5] +
                                        ";" +
                                        proxy.arr[6] +
                                        ";" +
                                        proxy.arr[7] +
                                        ";" +
                                        proxy.arr[8] +
                                        ";" +
                                        proxy.arr[9] +
                                        ";" +
                                        proxy.arr[10] +
                                        ";】" +
                                        "</td>" +
                                        "</tr>";
                                    selectcontent1.innerHTML = ee;
                                    //获取表单空数据
                                    let fwcx3button =
                                        document.getElementsByClassName("el-button")[11];
                                    fwcx3button.addEventListener("click", function() {
                                        const fwcx3 = document.querySelectorAll(".fwcx3")[2];
                                        let nn = "";
                                        // for (var i = 0; i < proxy.arr.length; i++) {
                                        // let j = i + 1;
                                        nn +=
                                            "<tr style='width: 100%' class='tkcheck1'>" +
                                            "<td class='table-cell' colspan='1' rowspan='1' flex= '1' style='background:#fff;'><input class='tkcheck' type='checkbox'></td>" +
                                            "<td class='table-cell' colspan='1' rowspan='1' flex= '1' style='background:#fff;'>" +
                                            "2" +
                                            "</td>" +
                                            "<td class='table-cell' colspan='3' rowspan='1' flex= '1' style='background:#fff;'>" +
                                            proxy.arr[2] +
                                            "</td>" +
                                            "<td class='table-cell' colspan='1' rowspan='1' flex= '1' style='background:#fff;'>" +
                                            proxy.arr[4] +
                                            "</td>" +
                                            "<td class='table-cell' colspan='1' rowspan='1' flex= '1' style='background:#fff;'>" +
                                            "" +
                                            "</td>" +
                                            "<td class='table-cell' colspan='1' rowspan='1' flex= '1' style='background:#fff;'>" +
                                            "" +
                                            "</td>" +
                                            "<td class='table-cell' colspan='1' rowspan='1' flex= '1' style='background:#fff;'>" +
                                            "" +
                                            "</td>" +
                                            "<td class='table-cell' colspan='1' rowspan='1' flex= '1' style='background:#fff;'>" +
                                            "" +
                                            "</td>" +
                                            "<td class='table-cell' colspan='2' rowspan='1' flex= '1' style='background: #fff;'>" +
                                            "" +
                                            "</td>" +
                                            "<td class='table-cell' colspan='2' rowspan='1' flex= '1' style='background: #fff;'>" +
                                            proxy.arr[9] +
                                            "</td>" +
                                            "<td class='table-cell' colspan='1' rowspan='1' flex= '1' style='background: #fff;'>" +
                                            "详情" +
                                            "</td>" +
                                            "</tr>";
                                        // }
                                        fwcx3.innerHTML = nn;
                                    });
                                });
                            });
                    });
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
                " /flow/GZDJ/audit?variate=yes&taskId=" +
                taskId +
                "&taskName=" +
                taskName.slice(-2) +
                "&users=sfusers&user=" +
                proxy.ID +
                "&name=gzdj-sf.json"
                //  +
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
            .catch(function(err) {
                // console.log(err);
                ElMessage.error("操作失败");
            });
    };

    const conserve = () => {
        console.log(document.getElementsByClassName("el-input__inner"));
        let glbm = "123456";
        let slbh = $router.currentRoute._rawValue.query.slbh;
        let slbh2 = $router.currentRoute._rawValue.query.slbh;
        let bdclx = "";
        let tstybm = "";
        let bdcdyh = proxy.newFormData2.BDCDYH;
        let djzl = "";
        let cssj = "";
        //djdjb
        let qdjg = document.getElementsByClassName("el-input__inner")[78].value;
        let jzmjms = "";
        let ghytms = "";
        let ghyt = document.getElementsByClassName("el-input__inner")[81].value;
        let pgj = "";
        let pgje = document.getElementsByClassName("el-input__inner")[77].value;
        let jzwlx = document.getElementsByClassName("el-input__inner")[62].value;
        let gzwlx = document.getElementsByClassName("el-input__inner")[65].value;
        let spbz = "";
        let qt = document.getElementsByClassName("el-textarea__inner")[2].value;
        let fj = document.getElementsByClassName("el-textarea__inner")[3].value;
        let qdfs = document.getElementsByClassName("el-input__inner")[76].value;
        let ftjzmj = document.getElementsByClassName("el-input__inner")[84].value;
        let tnjzmj = document.getElementsByClassName("el-input__inner")[83].value;
        let jzmj = document.getElementsByClassName("el-input__inner")[82].value;
        let qllx = document.getElementsByClassName("el-input__inner")[67].value;
        let qlxz = document.getElementsByClassName("el-input__inner")[68].value;
        let syqx = document.getElementsByClassName("el-input__inner")[73].value;
        let qsrq = "";
        let zzrq = "";
        let tdyt = document.getElementsByClassName("el-input__inner")[69].value;

        let tdsyqr = document.getElementsByClassName("el-input__inner")[64].value;
        console.log(
            "tdsyqr",
            tdsyqr
        );
        let gytdmj = document.getElementsByClassName("el-input__inner")[70].value;
        let dytdmj = document.getElementsByClassName("el-input__inner")[71].value;
        console.log(
            "dytdmj",
            document.getElementsByClassName("el-input__inner")[70].value
        );
        let fttdmj = document.getElementsByClassName("el-input__inner")[72].value;
        let jzzdmj = document.getElementsByClassName("el-input__inner")[66].value;
        let jzwzdmj = document.getElementsByClassName("el-input__inner")[63].value;
        let tdytms = "";
        //qlfwxg
        let qlbh = "123456";
        var data3 = {
            djtsgl: "insert into dj_tsgl (glbm,slbh,bdclx,tstybm,bdcdyh,djzl,cssj,lifecycle)values(to_char(SYSDATE,'yyyyMMddhhmiss')||'-'|| dbms_random.string('x', 19),'" +
                slbh2 +
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
                "','-1')",
            djdjb: "update dj_djb set spbz = '" +
                spbz +
                "',qt = '" +
                qt +
                "',fj = '" +
                fj +
                "',bdcdyh = '" +
                bdcdyh +
                "' where slbh = '" +
                slbh +
                "'",
            qltdxg: "insert into ql_tdxg (qlbh,slbh,qllx,qlxz,syqx,qsrq,zzrq,tdyt,tdsyqr,gytdmj,dytdmj,fttdmj,jzzdmj,jzwzdmj,tdytms)values(to_char(SYSDATE,'yyMMddhh24miss')||'-'|| dbms_random.string('x', 19),'" +
                slbh +
                "','" +
                qllx +
                "','" +
                qlxz +
                "','" +
                syqx +
                "',to_date('" +
                qsrq +
                "','yyyy-MM-dd'),to_date('" +
                zzrq +
                "','yyyy-MM-dd'),'" +
                tdyt +
                "','" +
                tdsyqr +
                "','" +
                gytdmj +
                "','" +
                dytdmj +
                "','" +
                fttdmj +
                "','" +
                jzzdmj +
                "','" +
                jzwzdmj +
                "','" +
                tdytms +
                "')",
            qlfwxg: "insert into ql_fwxg (qlbh,slbh,qllx,qlxz,jzmj,tnjzmj,ftjzmj,qdfs,qdjg,jzmjms,ghytms,ghyt,pgje,jzwlx,gzwlx) values (to_char(SYSDATE,'yyMMddhh24miss')||'-'|| dbms_random.string('x', 19),'" +
                slbh +
                "','" +
                qllx +
                "','" +
                qlxz +
                "','" +
                jzmj +
                "','" +
                tnjzmj +
                "','" +
                ftjzmj +
                "','" +
                qdfs +
                "','" +
                qdjg +
                "','" +
                jzmjms +
                "','" +
                ghytms +
                "','" +
                ghyt +
                "','" +
                pgje +
                "','" +
                jzwlx +
                "','" +
                gzwlx +
                "')",
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
        width: 90%;
        margin: 0 auto;
    }
    
    .tkcheck1 {
        font-size: 13px;
        color: #606266;
    }
    
    .el-checkbox__inner {
        background: #fff !important;
    }
</style>