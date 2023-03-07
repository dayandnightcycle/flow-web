// // var qlrxxxz = this.getWidgetRef('table8907')
// // qlrxxxz.setHidden(false);
// console.log('wwww',window.TSTYBM)
// let TSTYBM=window.TSTYBM、
// let _this = this;
// axios.post("http://192.168.3.48:8079/test/tree").then((res)=>{
//   console.log('info',res.data.data.info)
//   let treedata= JSON.parse(JSON.stringify(res.data.data.info))
// console.log('sss',treedata)
//     _this.getFormRef().getWidgetRef('tree68333').setTreeData(treedata)
// })


// var qlrxxxz = this.getWidgetRef('table8907')
// qlrxxxz.setHidden(false);

//this.getFormRef().showDialog('vfdialog100347')
// console.log('row',row,row.TSTYBM)

let _this = this;
let TSTYBM = window.TSTYBM
console.log(TSTYBM)
var treeSqls = {
    //加载证书信息
    loadCCIE: "SELECT DISTINCT B.TSTYBM,A.BDCZH,A.FZRQ,A.LIFECYCLE,A.DJRQ,A.YWLX,A.SLBH FROM (SELECT SLBH,BDCZH,FZRQ,DJRQ,LIFECYCLE,N'权证' AS YWLX FROM DJ_DJB UNION ALL SELECT SLBH,BDCZMH AS BDCZH,FZRQ,DJRQ,LIFECYCLE,N'预告' AS YWLX FROM DJ_YG) A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_SJD C ON A.SLBH = C.SLBH WHERE B.TSTYBM ='" + TSTYBM + "'  ORDER BY DJRQ DESC",
    //查询是否存在按单元查封信息:
    dycfxx: "SELECT COUNT(1) AS COUNT FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL AND TSTYBM = '" + TSTYBM + "'",
    //加载按单元抵押信息
    dydyxx: "SELECT COUNT(1) AS COUNT FROM DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL AND TSTYBM = '" + TSTYBM + "'"

}
var ArrQZXX = new Array();
var sKeyName;
var treeSqlsDate;
var zsxx = new Array();

let config = {
    headers: {"Content-Type": "application/json"},
};

function getTreeNode(NodeName, SLBH, TSTYBM, children) {

    return {
        label: NodeName,
        slbh: SLBH,
        tstybm: TSTYBM,
        children: children,
    }
}

function getTreeChildrenNode(ChildNodeName, ChildSLBH, ChildTSTYBM) {
    return {
        label: ChildNodeName,
        childslbh: ChildSLBH,
        childtstybm: ChildTSTYBM,

    }
}

function Format(sVal) {
    if (sVal == null || sVal + "" == "null" || typeof (sVal) == "undefined") {
        return "";
    } else {
        return "" + sVal;
    }
}

axios.post("http://192.168.3.48:8079/test/sqls", treeSqls, config).then((res) => {

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
                    axios.post("http://192.168.3.48:8079/test/sqls", xzdjxx, config).then((res) => {
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
                if (child.length > 0) {
                    treedata.push(getTreeNode(zsxx[i], ArrKey[0], ArrKey[1], child))
                } else {
                    treedata.push(getTreeNode(zsxx[i], ArrKey[0], ArrKey[1], null))
                }

            }
            //加载限制性登记信息 end

            //加载按单元查封信息   KFQFCCF201810120002
            if (treeSqlsDate.dycfxx[0].COUNT > 0) {
                var dycfxxSqls = {
                    dycfxx: "SELECT DISTINCT B.TSTYBM,A.CFBH,A.LIFECYCLE,A.DJSJ,A.SLBH,A.CFLX FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL AND TSTYBM = '" + TSTYBM + "' ORDER BY NVL(A.LIFECYCLE,0),A.DJSJ",
                }
                let child = [];
                var ArrDYCFXX = new Array();
                axios.post("http://192.168.3.48:8079/test/sqls", dycfxxSqls, config).then((res) => {
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
                                axios.post("http://192.168.3.48:8079/test/sqls", dycfzxSqls, config).then((res) => {
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
                axios.post("http://192.168.3.48:8079/test/sqls", dydyxxSqls, config).then((res) => {
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
                            axios.post("http://192.168.3.48:8079/test/sqls", dydyzxSqls, config).then((res) => {
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

            //
            console.log("tttt", treedata)

            _this.getFormRef().getWidgetRef('tree1').setTreeData(treedata)

        }
    }
)