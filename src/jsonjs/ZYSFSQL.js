var slbh = "KFQ202209160023"
var data = {
    "djsjd":"select ZL,TZRYDDH,DJDL from DJ_SJD where SLBH = " + "'" + slbh + "'",
    "djdjb":"Select SLBH,SQFBCZ,GYFS,DJLX,DJYY,DJRQ,SQRQ,XGZH from DJ_DJB where SLBH = " + "'" + slbh + "'",
    "djsfd":"select SLBH, JFBH, XMMC, JFDW, TXDZ, DH, JFLX, JBR, JBRQ, JBYJ, SHR, SHYJ, SHRQ, YSJE, SSJE, SKR, SKRQ, SKYJ, SLR,SFBZ,YYS,GRSDS,QS,TDZZS from DJ_SFD where SLBH =" + "'" + slbh + "'",
    "ggjflx":"select ItemVal,ItemName from Dic_Item where dicCode =(SELECT DICCODE FROM dic_main WHERE DICNAME = '交费类型' And RowNum<2) ORDER BY ITEMORDER",
    "ggdjlx":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记类型(大类)' AND ROWNUM<2) ORDER BY ITEMORDER"
}