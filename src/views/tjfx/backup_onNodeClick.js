console.log("slbh_treeNode", data.slbh)
console.log("text_treeNode", data.label)
//获取当前上下级行
var table = document.getElementsByClassName("sdx")[1]
var tbody = table.children[0];
var tr = tbody.children[1];

console.log("tr", tr)
console.log("tbody.children.length", tbody.children.length)
if (tbody.children.length > 2) {
    for (let i = tbody.children.length - 1; i > 1; i--) {
        tbody.removeChild(tbody.children[i])
        console.log("tbody.children[i]", i, "-", tbody.children[i])
    }
}
tr.children[1].innerHTML = ''
tr.children[2].innerHTML = ''
tr.children[3].innerHTML = ''
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
        DQSql = "SELECT DISTINCT A.SLBH,Nvl(A.DJLX,'解封登记') AS DJLX,B.BDCDYH,Nvl(C.XGZH,A.XGZH) AS XGZH,N'解封' AS YWLX,B.TSTYBM, '现' AS DJRQ FROM DJ_XGDJZX A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.SLBH = '" + slbh + "' AND ROWNUM < 2";
    } else if (type == "注销") {
        DQSql = "SELECT DISTINCT A.SLBH,Nvl(A.DJLX,'注销登记') AS DJLX,B.BDCDYH,Nvl(C.XGZH,A.XGZH) AS XGZH,N'注销' AS YWLX,B.TSTYBM FROM DJ_XGDJZX A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.SLBH = '" + slbh + "' AND ROWNUM < 2";
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
        //   console.log("DQData.length",DQData.length);
        //   console.log("SJData.length",SJData.length);
        //   console.log("XJData.length",XJData.length);
        if (XJData != null && SJData != null) {
            if
            (SJData.length > max) {
                max = SJData.length;

            } else if (XJData.length > max) {
                max = XJData.length;

            }
        }

        if (max > 1) {
            for (var i = 0; i < max - 1; i++) {
                let table = document.getElementsByClassName("sdx")[1]
                let tbody = table.children[0];
                let tr = tbody.children[1];
                let ztr = tr.cloneNode(true)
                tbody.appendChild(ztr);
            }
        }

        console.log("max", max);
        //当前信息start
        if (DQData.length > 0) {

            for (var i = 0; i < DQData.length; i++) {
                var DQInfo = "";
                var XGZH = "";
                if (Format(DQData[i].XGZH) != "") {
                    XGZH = Format(DQData[i].XGZH) + "<br>";
                }
                DQInfo += Format(DQData[i].SLBH) + "<br>" + Format(DQData[i].DJLX) + "<br>" + Format(DQData[i].BDCDYH) + "<br>" + XGZH + Format(DQData[i].BDCZH) + "<br>";
                if (type != "注销") {
                    if (Format(DQData[i].LIFECYCLE) == "1") {
                        DQInfo += "状态: 历史 ";
                    } else if (Format(DQData[i].DJRQ) == "") {

                        DQInfo += "状态: 办理中 ";


                    } else {
                        DQInfo += "状态: 现实 ";
                    }


                }
                //TODO slbh tstybm ywlx 没存
                var tr = tbody.children[i + 1];
                var td = tr.children[2];
                td.innerHTML = "";
                td.innerHTML = DQInfo
            }

        }
        //当前信息end
        //上级信息start
        if (SJData.length > 0) {

            for (var i = 0; i < SJData.length; i++) {
                var SJInfo = "";
                var XGZH = "";
                if (Format(SJData[i].XGZH) != "") {
                    XGZH = Format(SJData[i].XGZH) + "<br>";
                }
                SJInfo += Format(SJData[i].SLBH) + "<br>" + Format(SJData[i].DJLX) + "<br>" + Format(SJData[i].BDCDYH) + "<br>" + XGZH + Format(SJData[i].BDCZH) + "<br>";

                if (Format(SJData[i].LIFECYCLE) == "1") {
                    SJInfo += "状态: 历史 ";
                } else if (Format(SJData[i].DJRQ) == "") {
                    SJInfo += "状态: 办理中 ";
                } else {
                    SJInfo += "状态: 现实 ";
                }


                //TODO slbh tstybm ywlx 没存
                var tr = tbody.children[i + 1];
                var td = tr.children[1];
                td.innerHTML = "";
                td.innerHTML = SJInfo
            }

        }
        //上级信息end
        //下级信息start
        if (XJData.length > 0) {

            for (var i = 0; i < XJData.length; i++) {
                var XJInfo = "";
                var XGZH = "";
                if (Format(XJData[i].XGZH) != "") {
                    XGZH = Format(XJData[i].XGZH) + "<br>";
                }
                XJInfo += Format(XJData[i].SLBH) + "<br>" + Format(XJData[i].DJLX) + "<br>" + Format(XJData[i].BDCDYH) + "<br>" + XGZH + Format(XJData[i].BDCZH) + "<br>";

                if (Format(XJData[i].LIFECYCLE) == "1") {
                    XJInfo += "状态: 历史 ";
                } else if (Format(XJData[i].DJRQ) == "") {
                    XJInfo += "状态: 办理中 ";
                } else {
                    XJInfo += "状态: 现实 ";
                }

                //TODO slbh tstybm ywlx 没存
                var tr = tbody.children[i + 1];
                console.log("xtd", tr);
                var td = tr.children[3];
                td.innerHTML = "";
                td.innerHTML = XJInfo
            }

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