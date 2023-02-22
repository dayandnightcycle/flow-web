var slbh = "KFQ201703150027-1"
var data = {
  "djspb": "select SPBH, SLBH, SPDX, SPXH, SPR, SPRQ, SPRZGZH, SPJG, SPZT, SPYJ from DJ_SPB where SLBH LIKE " + "'" + slbh + "%' AND SPDX='初审意见'",
  "djspb1": "select SPBH, SLBH, SPDX, SPXH, SPR, SPRQ, SPRZGZH, SPJG, SPZT, SPYJ from DJ_SPB where SLBH LIKE " + "'" + slbh + "%' AND SPDX='审核意见'",
  "djspb2": "select SPBH, SLBH, SPDX, SPXH, SPR, SPRQ, SPRZGZH, SPJG, SPZT, SPYJ from DJ_SPB where SLBH LIKE " + "'" + slbh + "%' AND SPDX='批准意见'",
  "djtsgl": "select GLBM, SLBH, BDCLX, TSTYBM, BDCDYH, DJZL, GLMS, CSSJ from DJ_TSGL where SLBH LIKE " + "'" + slbh + "%'",
  "djcf": "select SLBH,XGZH,BDCDYH,CFJG,CFLX,CFWJ,CFWH,CFQSSJ,CFJSSJ,CFFW,DJJG,DBR,DJSJ,CFYY,JBR,JBRQ,YGR,LHXX,QLR,JBRQ,LWRQ,GDH,DAMJ,QT,FJ,LIFECYCLE,CFBH,CFSX,CFQX,ZJBH from DJ_CF where SLBH LIKE " + "'" + slbh + "%'",
  "ggcflx": "select ITEMVAL,ITEMNAME from DIC_ITEM where dicCode in (SELECT DICCODE FROM dic_main WHERE DICNAME = '查封类型') order by ITEMVAL",
  "djsjd": "select SLBH,LCLX,LCMC,SJR,SJSJ,CNSJ,QXDM,TZRXM,TZFS,TZRDH,TZRYDDH,TZRDZYJ,TZRTXDZ,CXMM,SJMC,SJLX,SJSL,YS,SFSYBZ,SFEWSJ,SFBCSJ,ZRKS,ZRR,YXJ,SJBZ,BCSM,ZL from DJ_SJD where SLBH LIKE " + "'" + slbh + "%'",
  "ggssxq": "select ITEMNOTE,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '所属辖区' AND ROWNUM<2) ORDER BY ITEMORDER",
}
