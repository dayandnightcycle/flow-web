var slbh = "KFQ202209160023"
var data = {
    "djsjd":"select QXDM,QYXS,DJXL from DJ_SJD where SLBH LIKE " + "'" + slbh + "%' AND ROWNUM < 2",
    "djdjb":"select BDCDYH from DJ_DJB where " + "'" + slbh + "'",
    "djpzyj":"select SPBH,SLBH,SPDX,SPXH,SPR,SPRQ,SPRZGZH,SPJG,SPZT,SPYJ,SPTXR from DJ_SPB where SLBH = " + "'" + slbh + "' AND SPDX = '批准意见'",
    "djshyj":"select SPBH,SLBH,SPDX,SPXH,SPR,SPRQ,SPRZGZH,SPJG,SPZT,SPYJ,SPTXR from DJ_SPB where SLBH = " + "'" + slbh + "' AND SPDX = '审核意见'",
    "djcsyj":"select SPBH,SLBH,SPDX,SPXH,SPR,SPRQ,SPRZGZH,SPJG,SPZT,SPYJ,SPTXR from DJ_SPB where SLBH = " + "'" + slbh + "' AND SPDX = '初审意见'",
    "ggxsqx":"select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '限购限售控制' AND ROWNUM < 2) AND ITEMNAME = '限售' AND ROWNUM < 2",
    "ggtsdy":"select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME = '核定提示打印审批表' AND ROWNUM < 2",
    "ggbjrq":"select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME = '审批时间可编辑' AND ROWNUM < 2",
    "ggsjhq":"select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME = '审批意见双击获取' AND ROWNUM < 2",
    "ggdqfj":"select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME = '审批备注读取附记' AND ROWNUM < 2",
    "ggmrtg":"select ITEMVAL,ITEMNOTE from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '不动产登记业务控制' AND ROWNUM < 2) AND ITEMNAME = '审批意见自动填写' AND ROWNUM < 2",
    "ggdjxl":"select ITEMVAL,ITEMNOTE from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '国有建设用地使用权及房屋所有权转移登记' AND ROWNUM<2) ORDER BY ITEMORDER"
}