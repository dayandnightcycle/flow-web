const { dateEquals } = require("element-plus")

var slbh = "KFQ202209160023"
var data = {
    "djsjd":"select SLBH, PCH, ZL, SJBZ,DJXL, DJDL,WWSQBH from DJ_SJD where SLBH = " + "'" + slbh + "'",
    "djtsgl":"select GLBM, SLBH, BDCLX, TSTYBM, BDCDYH, DJZL, GLMS, CSSJ from DJ_TSGL where SLBH = " + "'" + slbh + "' AND (BDCLX = '房屋' OR  BDCLX = '多幢房屋')",
    "djytsgl":"select GLBM, SLBH, BDCLX, TSTYBM, BDCDYH, DJZL, GLMS, CSSJ from DJ_TSGL where SLBH IN (SELECT FSLBH FROM DJ_XGDJGL WHERE ZSLBH = " + "'" + slbh + "' AND PID IS NULL) AND (BDCLX = '房屋' OR  BDCLX = '多幢房屋')",
    "qlfwxg":"select QLBH,SLBH,QLLX,QLXZ,JZMJ,TNJZMJ,FTJZMJ,QDJG,QDFS,JZMJMS,GHYTMS,GHYT,PGJE,JZWLX,GZWLX from QL_FWXG where SLBH = " + "'" + slbh + "'",
    "qltdxg":"select QLBH,SLBH,QLLX,QLXZ,SYQX,QSRQ,ZZRQ,TDYT,TDSYQR,GYTDMJ,DYTDMJ,FTTDMJ,JZZDMJ,JZWZDMJ from QL_TDXG where SLBH = " + "'" + slbh + "'",
    "djdjb":"select SLBH,SQZSBS,SQFBCZ, SQRQ, SQNR, SQBZ, DJRQ, DBR, ZSR, FZJG, FZRQ, DAMJ, QT, FJ, XGZH, BDCDYH, LIFECYCLE,DJRQ,GDH,SPBZ from DJ_DJB where SLBH = " + "'" + slbh + "'",
    "djydjb":"select SLBH, QT, FJ from DJ_DJB where SLBH IN (SELECT FSLBH FROM DJ_XGDJGL WHERE ZSLBH = = " + "'" + slbh + "' AND PID IS NULL)",
    "fchqsdc":"select TSTYBM, ZDTYBM, ZH, HH, BDCDYH, LSZTYBM, LSFWBH, QLLX, QLXZ, HX, HXJG, ZXCD, GHYT, ZL, SJC, MYC, DYH, FJH, LJZH, QDJG, QDFS, SHBW, JZMJ, TNJZMJ, FTJZMJ, DXBFJZMJ, QTJZMJ, FTXS, TDZZRQ, TDYT, TDSYQR, GYTDMJ, FTTDMJ, DYTDMJ, FWLX, FWXZ, SJCS, CG, ZT, LIFECYCLE,TDQSRQ,TDSYQX, HLX, GZWLX from FC_H_QSDC where TSTYBM = (select TSTYBM from DJ_TSGL where SLBH = " + "'" + slbh + "'and rownum <2)",
    "zdqsdc":"select TSTYBM, ZDLX, ZDTYBM, SJZDTYBM, BDCDYH, DJH, QSDWDM, QSDWMC, ZLDWDM, ZLDWMC, TDZL, QLRMC, QLLX, QLXZ, TDSYZ, DYMJ, FTMJ, SFGYZ, PZTDYT, SJTDYT, GYSYQQK, SCMJ, FZMJ, SZTFH, JZMJ, JZWZDMJ, JZRJL, JZMD, JZXG, QDFS, SZD, SZN, SZX, SZB, SM, ZDZT, ZBCLXXX, ZDTZM, QLSDFS, JZDCY, ZJWTS, ZDCTHZY, ZDCTHZRQ, QSDCJS, DCY, DCRQ, JZBS, DJKZJS, KZY, KZRQ, DCSHYJ, DCSHR, DCSHRQ, TDZMJ, NYDMJ, GDMJ, YDMJ, LDMJ, MCDMJ, NYDQTMJ, JSYDMJ, JMDMJ, JTYDMJ, SYMJ, JSYDQTMJ, WLYDMJ, GMJJHYFLDM, YBZDDM, BLC, JZDWSM, ZYQSJZZXSM, JZWLX, JZWQS, SYQX, QSRQ, ZZRQ, ZDDJ, ZDJG, DLRXM, DLRZJLX, DLRZJH, DLRDH, LIFECYCLE,TDSYZ from ZD_QSDC where ZDTYBM = (select ZDTYBM from FC_H_QSDC where TSTYBM = (select TSTYBM from DJ_TSGL where SLBH = " + " '" + slbh + "'and rownum < 2)) AND (LIFECYCLE IS NULL OR LIFECYCLE = '0')"
}