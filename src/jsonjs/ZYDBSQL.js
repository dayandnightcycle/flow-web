var slbh = "KFQ202209160023"
var data = {
    "djsjd":"select DJXL,QYXS from DJ_SJD where SLBH LIKE " + "'" + slbh + "%' AND ROWNUM < 2",
    "djpzyj":"select SPBH,SLBH,SPDX,SPXH,SPR,SPRQ,SPRZGZH,SPJG,SPZT,SPYJ,SPTXR from DJ_SPB where SLBH = " + "'" + slbh + "' AND SPDX = '批准意见'",
    "djshyj":"select SPBH,SLBH,SPDX,SPXH,SPR,SPRQ,SPRZGZH,SPJG,SPZT,SPYJ,SPTXR from DJ_SPB where SLBH = " + "'" + slbh + "' AND SPDX = '审核意见'",
    "djcsyj":"select SPBH,SLBH,SPDX,SPXH,SPR,SPRQ,SPRZGZH,SPJG,SPZT,SPYJ,SPTXR from DJ_SPB where SLBH = " + "'" + slbh + "' AND SPDX = '初审意见'",
    "ggdjjg":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记机关简称' AND ROWNUM < 2 ) ORDER BY ITEMORDER",
    "ggdjxl":"select ITEMVAL,ITEMNOTE from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '国有建设用地使用权及房屋所有权转移登记' AND ROWNUM<2) ORDER BY ITEMORDER",
    "ggfzjg":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '发证机关' AND ROWNUM < 2 ) ORDER BY ITEMORDER",
    "gggyfs":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '共有方式' AND ROWNUM < 2 ) ORDER BY ITEMORDER",
    "ggzjlx":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型' AND ROWNUM<2) ORDER BY ITEMORDER",
    "ggssjc":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '省市简称' AND ROWNUM < 2 ) ORDER BY ITEMORDER",
    "ggzsgbh":"select ITEMVAL from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证书工本号' AND ROWNUM < 2 ) AND ITEMNAME = '权证' AND ROWNUM < 2",
    "ggfzdysz":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '附记打印设置' AND ROWNUM < 2 ) ORDER BY ITEMORDER",
    "ggyclscfwz":"select ITEMVAL from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME  ='隐藏临时存放位置' ORDER BY ITEMORDER",
    "ggzscfwz":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证书存放位置' AND ROWNUM < 2 ) ORDER BY ITEMORDER",
    "ggqythcy":"select ITEMVAL from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME  ='启用跳号重用' ORDER BY ITEMORDER",
    "ggxsqx":"select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '限购限售控制' AND ROWNUM < 2) AND ITEMNAME = '限售' AND ROWNUM < 2",
    "ggdbbcjsx":"select ITEMVAL from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME  ='登簿保存即生效' ORDER BY ITEMORDER"
}