var slbh = "KFQ202209160023"
var data = {
    "djsjd":"select DJDL from DJ_SJD where SLBH = " + "'" + slbh + "'",
    "djfjd":"select SLBH, QLR, LJR, LJRSFZJLX, LJRSFZJH, LJRYQLRDGX, FJR, FJRQ, FJBZ, LJRZW, LJRZP from DJ_FJD where SLBH = " + "'" + slbh + "'",
    "djljr":"select LJBH, SLBH, LJR, LJRSFZJLX, LJRSFZJH, LJRYQLRDGX, LJRZW, LJRZP from DJ_FJD_LJR where SLBH = " + "'" + slbh + "'",
    "ggzjlx":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型' AND DICTYPE='通用字典' AND ROWNUM<2) ORDER BY ITEMORDER"
}