var slbh = "KFQ201703150027-1"
var data = {
  "daarch": "select DAH, SLBH, DAHH, DABH, FLH,MJ from ARCH_GLDAXX where SLBH LIKE " + "'" + slbh + "%'",
  "dadalx": "select xtbh,xtmc from dic_ssxtb where fxtbid in(select xtbid from dic_ssxtb where diccode in (select diccode from  dic_main where dicname='档案类型') and xtbh='C4') order by xtbh",
  "dadamj": "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '档案密级' AND ROWNUM < 2) ORDER BY ITEMORDER",
  "ggcflx": "select ITEMVAL,ITEMNAME from DIC_ITEM where dicCode in (SELECT DICCODE FROM dic_main WHERE DICNAME = '查封类型') order by ITEMVAL",
  "ggfzjg": "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '发证机关' AND ROWNUM < 2 ) ORDER BY ITEMORDER",
  "ggywkz": "select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制') AND ITEMNAME = '归档号配号'",
  "ggssxq": "select ITEMNOTE,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '所属辖区' AND ROWNUM<2) ORDER BY ITEMORDER",
  "djsjd": "select SLBH,LCLX,LCMC,SJR,SJSJ,CNSJ,QXDM,TZRXM,TZFS,TZRDH,TZRYDDH,TZRDZYJ,TZRTXDZ,CXMM,SJMC,SJLX,SJSL,YS,SFSYBZ,SFEWSJ,SFBCSJ,ZRKS,ZRR,YXJ,SJBZ,BCSM,ZL from DJ_SJD where SLBH LIKE " + "'" + slbh + "%'",
  "dadakz": "select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '档案控制' AND ROWNUM < 2) AND ITEMNAME='档案附件顺序' ORDER BY ITEMORDER",
}
