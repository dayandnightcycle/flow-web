<template>
    <div style="display:flex;flex-direction:column">
        <div class="form">
            <v-form-render :form-json="formJson1" :form-data="formData1" :option-data="optionData1" ref="vFormcfdj">
            </v-form-render>
        </div>
        <div class="form">
            <v-form-render :form-json="formJson2" :form-data="formData2" :option-data="optionData2" ref="vFormdydj">
            </v-form-render>
        </div>
        <div class="form">
            <v-form-render :form-json="formJson3" :form-data="formData3" :option-data="optionData3" ref="vFormqlrxx">
            </v-form-render>
        </div>
        <div class="form">
            <v-form-render :form-json="formJson4" :form-data="formData4" :option-data="optionData4" ref="vFormscdj">
            </v-form-render>
        </div>
        <div class="form">
            <v-form-render :form-json="formJson5" :form-data="formData5" :option-data="optionData5" ref="vFormzydj">
            </v-form-render>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import cfdjjson from '../../json/新追溯/追溯_查封登记.json'
import dydjjson from '../../json/新追溯/追溯_抵押登记.json'
import qlrxxjson from '../../json/新追溯/追溯_权利人信息表单.json'
import scdjjson from '../../json/新追溯/追溯_首次登记.json'
import zydjjson from '../../json/新追溯/追溯_转移登记、更正登记.json'
const formJson1 = reactive({});
const formData1 = reactive({});
const optionData1 = reactive({});
const formJson2 = reactive({});
const formData2 = reactive({});
const optionData2 = reactive({});
const formJson3 = reactive({});
const formData3 = reactive({});
const optionData3 = reactive({});
const formJson4 = reactive({});
const formData4 = reactive({});
const optionData4 = reactive({});
const formJson5 = reactive({});
const formData5 = reactive({});
const optionData5 = reactive({});
let vFormcfdj = ref(null)
let vFormdydj = ref(null)
let vFormqlrxx = ref(null)
let vFormscdj = ref(null)
let vFormzydj = ref(null)

const zs = () => {
    vFormcfdj.value.setFormJson(cfdjjson);
    vFormdydj.value.setFormJson(dydjjson);
    vFormqlrxx.value.setFormJson(qlrxxjson);
    vFormscdj.value.setFormJson(scdjjson);
    vFormzydj.value.setFormJson(zydjjson);
}
const query = () => {
}
// const fromname = () => {
//     setTimeout(() => {
//         let ul = document.getElementsByClassName('button')[0];
//         console.log('ul', ul);
//         let table = document.getElementsByTagName('table')[2];
//         // let trs = table.getElementsByTagName('tr');
//         var sqls = "SELECT *FROM (SELECT ROWNUM AS RN, t1.*FROM (SELECT DISTINCT A.SLBH,A.DJLX,A.BDCZH,B.BDCDYH,A.ZSXLH,A.DJRQ,(select wm_concat(distinct to_char(y.qlrmc))from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as QLRMC,(select wm_concat(distinct to_char(y.zjhm))from dj_qlrgl x left join dj_qlr y on x.qlrid = y.qlrid where x.slbh = a.slbh and x.qlrlx = '权利人') as QLRZJH,N''                     AS ZT,A.GDH,NVL(C.ZL, C.TZRTXDZ)    AS ZL,A.LIFECYCLE,A.YWLX,B.TSTYBM FROM (SELECT SLBH,DJLX,BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'权证' AS YWLX,GDH FROM DJ_DJB UNION ALL SELECT SLBH,DJLX,BDCZMH AS BDCZH,ZSXLH,DJRQ,LIFECYCLE,N'预告'  AS YWLX,GDH FROM DJ_YG UNION ALL SELECT A.SLBH,A.DJLX,A.BDCZMH AS BDCZH,A.ZSXLH,A.DJRQ,A.LIFECYCLE,N'抵押'    AS YWLX,A.GDH FROM DJ_DY A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL UNION ALL SELECT A.SLBH,A.CFLX AS DJLX,A.CFBH AS BDCZH,N''    AS ZSXLH,A.DJSJ AS DJRQ,A.LIFECYCLE,N'查封'  AS YWLX,A.GDH FROM DJ_CF A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_XGDJGL C ON A.SLBH = C.ZSLBH WHERE A.XGZH IS NULL AND C.XGZH IS NULL AND C.FSLBH IS NULL) A LEFT JOIN DJ_TSGL B ON A.SLBH = B.SLBH LEFT JOIN DJ_SJD C ON A.SLBH = C.SLBH WHERE B.TSTYBM IS NOT NULL order by A.Bdczh desc, A.SLBH) t1)WHERE RN >= 1AND RN <= 20ORDER BY ROWNUM ASC";
//         ul.onclick = () => {
//             // vFormcfdj.value.setFormJson(cfdjjson);
//             // vFormdydj.value.setFormJson(dydjjson);
//             // vFormqlrxx.value.setFormJson(qlrxxjson);
//             // vFormscdj.value.setFormJson(scdjjson);
//             axios.post("/test/sqls", { sqls: sqls }).then((res) => {
//                 var result = eval(res.data);
//                 console.log("res2", result.data.sqls);
//                 let datas = result.data.sqls;
//                 let str = '';
//                 for (var i = 0; i < datas.length; i++) {
//                     str += `<tr><td style="width:60.17px; height:37px;">${datas[i].RN}</td><td style="width:117.34px; height:37px;">${datas[i].SLBH}</td><td style="width:61.17px; height:37px;">${datas[i].DJLX}</td><td style="width:174.52px; height:37px;">${datas[i].BDCZH}</td><td style="width:174.52px; height:37px;">${datas[i].BDCDYH}</td><td style="width:120.34px; height:37px;">${datas[i].ZSXLH}</td><td style="width:102.34px; height:37px;">${datas[i].DJRQ}</td><td style="width:60.17px; height:37px;">${datas[i].QLRMC}</td><td style="width:115.34px; height:37px;">${datas[i].QLRZJH}</td><td style="width:69.17px; height:37px;">${datas[i].ZT}</td><td style="width:60.17px; height:37px;">${datas[i].GDH}</td><td style="width:185.17px; height:37px;">${datas[i].ZL}</td></tr>`
//                 }
//                 table.innerHTML = str;
//             })
//         }
//     }, 1000)

// };
onMounted(() => {
    zs();
    // fromname();
    // query();
})
</script>
<style>
.form{
    margin-bottom: 20px;
}
</style>