async function loadDJInfo() {
    //加载表单
    var tabDatas = {
        "sjd": "select SLBH, LCLX, LCMC, SJR, SJSJ, CNSJ, QXDM, TZRXM, TZFS, TZRDH, TZRYDDH, TZRDZYJ, TZRTXDZ, CXMM, SJMC, SJLX, SJSL, YS, SFSYBZ, SFEWSJ, SFBCSJ, ZRKS, ZRR, YXJ, SJBZ, BCSM, FCSLH, FCDJLX, FCHID,ZL from DJ_SJD where SLBH = '" + slbh + "'",
        "djb": "select SLBH, DJLX, DJYY, SQZSBS, SQFBCZ, SQRQ, SQNR, SQBZ, DLJGMC, DLRXM, DLRZJLX, DLRZJH, DLRZGZH, DLRDH, DLJGMC2, DLRXM2, DLRZJLX2, DLRZJH2, DLRZGZH2, DLRDH2, SPDW, SPRQ, SPBZ, BDCZH, SSJC, JGJC, FZND, ZSH, SZR, GYFS, GYFE, DJRQ, DBR, ZSR, FZJG, FZRQ, ZSLX, ZSXLH, DYCS, GDH, DAMJ, QT, FJ, XGZH, BDCDYH, LIFECYCLE from DJ_DJB where SLBH = '" + slbh + "'"
    }
    console.log("tabSqls", tabDatas)
    let config = {
        headers: {"Content-Type": "application/json"},
    };


    await axios.post("http://127.0.0.1:8079/test/sqls", tabDatas, config).then((res) => {
        console.log("tabDatas", res.data.data);

        let sjdData = res.data.data.sjd[0];
        let djbData = res.data.data.djb[0];
        //  window._this = this;
        _this.getFormRef('fwzs_input_slbh').setFieldValue('fwzs_input_slbh', sjdData.SLBH);
        _this.getFormRef('fwzs_input_sjsj').setFieldValue('fwzs_input_sjsj', sjdData.SJSJ);
        _this.getFormRef('fwzs_input_djlx').setFieldValue('fwzs_input_djlx', djbData.DJLX);
        _this.getFormRef('fwzs_input_djyy').setFieldValue('fwzs_input_djyy', djbData.DJYY);
        _this.getFormRef('fwzs_input_sjr').setFieldValue('fwzs_input_sjr', sjdData.SJR);
        _this.getFormRef('fwzs_input_ywlx').setFieldValue('fwzs_input_ywlx', sjdData.LCMC);
        _this.getFormRef('fwzs_input_xgzj').setFieldValue('fwzs_input_xgzj', djbData.XGZH);
        _this.getFormRef('fwzs_input_sqrq').setFieldValue('fwzs_input_sqrq', djbData.SQRQ);
        _this.getFormRef('fwzs_input_cnsj').setFieldValue('fwzs_input_cnsj', sjdData.CNSJ);
        _this.getFormRef('fwzs_input_ssxq').setFieldValue('fwzs_input_ssxq', sjdData.QXDM);//字典
        _this.getFormRef('fwzs_input_txdz').setFieldValue('fwzs_input_txdz', sjdData.TZRTXDZ);
        _this.getFormRef('fwzs_input_gyfs').setFieldValue('fwzs_input_gyfs', djbData.GYFS);//字典
        _this.getFormRef('fwzs_input_dlrxm').setFieldValue('fwzs_input_dlrxm', djbData.DLRXM);
        _this.getFormRef('fwzs_input_dlrzyzgzh').setFieldValue('fwzs_input_dlrzyzgzh', djbData.DLRZGZH);
        _this.getFormRef('fwzs_input_dlrzjzl').setFieldValue('fwzs_input_dlrzjzl', djbData.DLRZJLX);
        _this.getFormRef('fwzs_input_dlrzjbh').setFieldValue('fwzs_input_dlrzjbh', djbData.DLRZJH);
        _this.getFormRef('fwzs_input_dlrlxdh').setFieldValue('fwzs_input_dlrlxdh', djbData.DLRDH);
        _this.getFormRef('fwzs_input_dljgmc').setFieldValue('fwzs_input_dljgmc', djbData.DLJGMC);
        // _this.getFormRef('fwzs_input_').setFieldValue('fwzs_input_',);


    })

}