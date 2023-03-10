<template>
  <div>
    <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
    </v-form-render>

    <el-dialog v-model="zsdialogVisible" title="不动产追溯" width="1000px !important" :before-close="dialogVisible = false"
               class="ywdialog" style="margin-left: 400px;width: 1200px;">
      <!--    <el-dialog v-model="zsdialogVisible" title="不动产追溯" :width="dialogwidth" :before-close="dialogVisible = false"-->
      <!--               class="ywdialog" style="margin-left: 400px;width: 1200px;">-->
      <!--追溯详细信息-->
      <div style="display:flex;flex-direction:column;width: 300px;height:100%;float: left;overflow: auto">
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
          <template #default="{ data }">
            <span :class="data.icon" :style="data.style"></span>
            {{ data.label }}
          </template>
        </el-tree>
      </div>
      <div style="display:flex;width:70%;height:200px;float: left;z-index: 2;overflow: auto;border: 1px solid #3f3737">
        <!--空白页-->
        <!--        <v-form-render :form-json="formJson1" :form-data="formData1" :option-data="optionData1" ref="vFormRef2">-->

        <!--        </v-form-render>-->
        <v-form-render :form-json="formJson1" :form-data="formData1" :option-data="optionData1" ref="shangxiaji">

        </v-form-render>

      </div>


    </el-dialog>
  </div>

</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import zsjson from '../../json/新追溯/zs_index.json';
import ji from '../../json/新追溯/追溯_上下级.json';

const formJson = reactive({});
const formData = reactive({});
const optionData = reactive({});
const formJson1 = reactive({});
const formData1 = reactive({});
const optionData1 = reactive({});


let vFormRef = ref(null);
let vFormRef2 = ref(null);
let shangxiaji = ref(null);

const tstybmdata = ref();
const zsdialogVisible = ref(false)
const zs = () => {
  vFormRef.value.setFormJson(zsjson);

}
const dialogjson = () => {
  // vFormRef2.value.setFormJson(xxxxjson);
  shangxiaji.value.setFormJson(ji);

}
//树结构数据
const treeData = ref();
const defaultProps = {
  children: 'children',
  label: 'label',
}
const handleNodeClick = (data) => {

}

const query = () => {

}

onMounted(() => {
  zs();

  // fromname();
  query();
})
</script>
