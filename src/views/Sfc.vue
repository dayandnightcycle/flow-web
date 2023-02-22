<template>
  <div>
    <v-form-render
      :form-json="formJson"
      :form-data="formData"
      :option-data="optionData"
      ref="vFormRef"
    >
    </v-form-render>
    <el-button type="primary" @click="saveFormJson">提交表单</el-button>
    <el-button type="primary" @click="submitForm">提交数据</el-button>
    <!-- <input type="text" value="输入框内容" id="myInput">
    <button @click="myFunction">点我获取内容</button> -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
// import * as ZhuanYSQL from "../jsonjs/ZhuanYSQL";
const { proxy } = getCurrentInstance();

const vFormRef = ref(null);
const formJson = reactive({
  "widgetList": [
    {
      "key": 116114,
      "type": "table",
      "category": "container",
      "icon": "table",
      "rows": [
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext76425",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "受理编号",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext76425"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-82425",
                "cellWidth": "10%",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-82425"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 111778,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "slbh",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "hhhh",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input42368"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-60053",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-60053"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-43185",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-43185"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext38718",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "登记大类",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext38718"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-96976",
                "cellWidth": "10%",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-96976"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 111778,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "zydj",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": false,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input43286"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-82832",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-82832"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-109685",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-109685"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext51650",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "登记小类",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext51650"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-68012",
                "cellWidth": "10%",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-68012"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 111778,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "djxl",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input31631"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-79503",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-79503"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-95476",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-95476"
            }
          ],
          "id": "table-row-33667",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext16099",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "登记原因",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext16099"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-8947",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-8947"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 111778,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "djyy",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input26647"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-66537",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-66537"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-39363",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-39363"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext106728",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "收件时间",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext106728"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-75854",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-75854"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 38587,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "sjsj",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input94439"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-11458",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-11458"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-67435",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-67435"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext110031",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "承诺时间",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext110031"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-69508",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-69508"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 38587,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "cnsj",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input87039"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-74624",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-74624"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-47464",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-47464"
            }
          ],
          "id": "table-row-6125",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext60510",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "流程类别",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext60510"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-75440",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-75440"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 111778,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "lclb",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input18092"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-110387",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-110387"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-50003",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-50003"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext85656",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "相关证号",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext85656"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-99784",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 6,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-99784"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-26115",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 6,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-26115"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-79439",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 6,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-79439"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-109690",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 6,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-109690"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-99205",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 6,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-99205"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-92004",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 6,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-92004"
            }
          ],
          "id": "table-row-112824",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 59833,
                  "type": "checkbox",
                  "icon": "checkbox-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "qx1",
                    "label": "",
                    "labelAlign": "",
                    "defaultValue": [],
                    "columnWidth": "200px",
                    "size": "",
                    "displayStyle": "inline",
                    "buttonStyle": false,
                    "border": false,
                    "labelWidth": "0",
                    "labelHidden": false,
                    "disabled": false,
                    "hidden": false,
                    "optionItems": [
                      {
                        "label": "全选",
                        "value": 1
                      }
                    ],
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "onCreated": "",
                    "onMounted": "",
                    "onChange": "",
                    "onValidate": ""
                  },
                  "id": "checkbox99887"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-84125",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-84125"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext22648",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "相关证号",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext22648"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-102542",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-102542"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-34359",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-34359"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-44373",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-44373"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext41093",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "相关证类型",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext41093"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-52171",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-52171"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext103728",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "权利人名称",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext103728"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-100482",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-100482"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext43082",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "坐落",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext43082"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-38607",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-38607"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-74207",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-74207"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-98214",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-98214"
            }
          ],
          "id": "table-row-63718",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": false,
              "options": {
                "name": "table-cell-56172",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-56172"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "xgzh",
                    "label": "input",
                    "labelAlign": "label-left-align",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input61640"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-37974",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-37974"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-51291",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-51291"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-84858",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-84858"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "xgzlx",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input59710"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-99539",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-99539"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "qlrmc",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input31425"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-118049",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-118049"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "zlsj",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input87786"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-79460",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-79460"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-17287",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-17287"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-28305",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-28305"
            }
          ],
          "id": "table-row-51312",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext30614",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "权利人",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext30614"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-59890",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-59890"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-10336",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-10336"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-81094",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-81094"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-69669",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-69669"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-82710",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-82710"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-24180",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-24180"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-107070",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-107070"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-97890",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-97890"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-100217",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-100217"
            }
          ],
          "id": "table-row-19390",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 100132,
                  "type": "checkbox",
                  "icon": "checkbox-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "qx2",
                    "label": "",
                    "labelAlign": "",
                    "defaultValue": [],
                    "columnWidth": "200px",
                    "size": "",
                    "displayStyle": "inline",
                    "buttonStyle": false,
                    "border": false,
                    "labelWidth": "0",
                    "labelHidden": false,
                    "disabled": false,
                    "hidden": false,
                    "optionItems": [
                      {
                        "label": "全选",
                        "value": "1"
                      }
                    ],
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "onCreated": "",
                    "onMounted": "",
                    "onChange": "",
                    "onValidate": ""
                  },
                  "id": "checkbox76257"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-66492",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-66492"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext23013",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "序号",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext23013"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-96821",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-96821"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext16429",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "名称",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext16429"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-5719",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-5719"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext102185",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "证件种类",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext102185"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-44279",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-44279"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext35568",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "证件号码",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext35568"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-102082",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-102082"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-63336",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-63336"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-82762",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-82762"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext30230",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "电话",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext30230"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-14519",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-14519"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-88675",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-88675"
            }
          ],
          "id": "table-row-60142",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": false,
              "options": {
                "name": "table-cell-105470",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-105470"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 106240,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "xh",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input39511"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-40420",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-40420"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 106240,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "mc",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input82321"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-22789",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-22789"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 106240,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "zjzl",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input48699"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-70580",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-70580"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 106240,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "zjhm",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input48196"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-100158",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-100158"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-60481",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-60481"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-104936",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-104936"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 106240,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "dh",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input104098"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-34424",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-34424"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-58245",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-58245"
            }
          ],
          "id": "table-row-17175",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext59769",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "共有方式",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext59769"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-80076",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-80076"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 111778,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "gyfs",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input56156"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-29438",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-29438"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-26430",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-26430"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-78858",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-78858"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext92688",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "是否申请分别持证",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext92688"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-109614",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-109614"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 11870,
                  "type": "radio",
                  "icon": "radio-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "sfsqfbcz",
                    "label": "",
                    "labelAlign": "label-right-align",
                    "defaultValue": 2,
                    "columnWidth": "200px",
                    "size": "",
                    "displayStyle": "inline",
                    "buttonStyle": false,
                    "border": false,
                    "labelWidth": "0",
                    "labelHidden": true,
                    "disabled": false,
                    "hidden": false,
                    "optionItems": [
                      {
                        "label": "是",
                        "value": 1
                      },
                      {
                        "label": "否",
                        "value": 2
                      }
                    ],
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "onCreated": "",
                    "onMounted": "",
                    "onChange": "",
                    "onValidate": ""
                  },
                  "id": "radio77594"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-100624",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 4,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-100624"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-114714",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 4,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-114714"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-100178",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 4,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-100178"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-67218",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 4,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-67218"
            }
          ],
          "id": "table-row-74552",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext37134",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "权利人代理人",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext37134"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-99882",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-99882"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-31611",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-31611"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-98159",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-98159"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-117216",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-117216"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-90964",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-90964"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-92207",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-92207"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-86973",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-86973"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-75585",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-75585"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-21471",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-21471"
            }
          ],
          "id": "table-row-76944",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 100132,
                  "type": "checkbox",
                  "icon": "checkbox-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "checkbox78975",
                    "label": "",
                    "labelAlign": "",
                    "defaultValue": [
                      1
                    ],
                    "columnWidth": "200px",
                    "size": "",
                    "displayStyle": "inline",
                    "buttonStyle": false,
                    "border": false,
                    "labelWidth": "0",
                    "labelHidden": false,
                    "disabled": false,
                    "hidden": false,
                    "optionItems": [
                      {
                        "label": "全选",
                        "value": 1
                      }
                    ],
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "onCreated": "",
                    "onMounted": "",
                    "onChange": "",
                    "onValidate": ""
                  },
                  "id": "checkbox78975"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-72949",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-72949"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext50288",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "序号",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext50288"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-89151",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-89151"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext35665",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "名称",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext35665"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-12480",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-12480"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext71315",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "证件种类",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext71315"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-90604",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-90604"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext78988",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "证件号码",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext78988"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-93759",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-93759"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-73065",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-73065"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-60621",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-60621"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext78967",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "电话",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext78967"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-71817",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-71817"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-76994",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-76994"
            }
          ],
          "id": "table-row-104762",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "xq3",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input33544"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-15422",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-15422"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "xh2",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input101620"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-17192",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-17192"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "mc2",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input90652"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-117593",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-117593"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "zjzl2",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input68955"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-33564",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-33564"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "zjhm2",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input102346"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-71474",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-71474"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-112781",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-112781"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-48378",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 3,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-48378"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "dh2",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input80611"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-70793",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-70793"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-44712",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-44712"
            }
          ],
          "id": "table-row-71470",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext20630",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "义务人",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext20630"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-89710",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-89710"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-74632",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-74632"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-74371",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-74371"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-19927",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-19927"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-45765",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-45765"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-94289",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-94289"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-28511",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-28511"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-44639",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-44639"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-54396",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 9,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-54396"
            }
          ],
          "id": "table-row-84393",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 100132,
                  "type": "checkbox",
                  "icon": "checkbox-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "checkbox24445",
                    "label": "",
                    "labelAlign": "",
                    "defaultValue": [
                      1
                    ],
                    "columnWidth": "200px",
                    "size": "",
                    "displayStyle": "inline",
                    "buttonStyle": false,
                    "border": false,
                    "labelWidth": "0",
                    "labelHidden": false,
                    "disabled": false,
                    "hidden": false,
                    "optionItems": [
                      {
                        "label": "全选",
                        "value": 1
                      }
                    ],
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "onCreated": "",
                    "onMounted": "",
                    "onChange": "",
                    "onValidate": ""
                  },
                  "id": "checkbox24445"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-21748",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-21748"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext19190",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "序号",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext19190"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-15341",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-15341"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext101714",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "名称",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext101714"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-88505",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-88505"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext19186",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "证件种类",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext19186"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-23856",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-23856"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext9418",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "证件号码",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext9418"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-70380",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-70380"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-81910",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-81910"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext39769",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "共有份额",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext39769"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-88574",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-88574"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 70406,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext46073",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "电话",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext46073"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-70859",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-70859"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-17120",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-17120"
            }
          ],
          "id": "table-row-100593",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "qx4",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input49396"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-101226",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-101226"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "xh3",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input31417"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-75779",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-75779"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "mc3",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input91363"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-92946",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-92946"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "zjzl3",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input27976"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-76764",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-76764"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "zjhm3",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input31362"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-113589",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-113589"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-86550",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-86550"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "gyfe3",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input25993"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-96444",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-96444"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 49190,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "dh3",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": null,
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": ""
                  },
                  "id": "input95408"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-96847",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-96847"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-50864",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-50864"
            }
          ],
          "id": "table-row-96047",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext101979",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "返回原因",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext101979"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-11379",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-11379"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "fhyy",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input112580"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-37385",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 7,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-37385"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-40911",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 7,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-40911"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-62708",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 7,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-62708"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-60665",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 7,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-60665"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-85568",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 7,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-85568"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-98848",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 7,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-98848"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-32111",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 7,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-32111"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 88516,
                  "type": "button",
                  "icon": "button",
                  "formItemFlag": false,
                  "options": {
                    "name": "button25984",
                    "label": "一窗返回",
                    "columnWidth": "200px",
                    "size": "",
                    "displayStyle": "block",
                    "disabled": false,
                    "hidden": false,
                    "type": "",
                    "plain": false,
                    "round": false,
                    "circle": false,
                    "icon": null,
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "onClick": ""
                  },
                  "id": "button25984"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-92690",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-92690"
            }
          ],
          "id": "table-row-88194",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext67343",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "受理科室",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext67343"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-48255",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-48255"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "slks",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input105499"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-79256",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-79256"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-92151",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-92151"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext20538",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "受理人员",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext20538"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-35122",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-35122"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "slry",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input101321"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-46913",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-46913"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-9797",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-9797"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext39026",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "照片采集",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext39026"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-101817",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-101817"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 97467,
                  "type": "picture-upload",
                  "icon": "picture-upload-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "pictureupload86812",
                    "label": "",
                    "labelAlign": "",
                    "labelWidth": null,
                    "labelHidden": false,
                    "columnWidth": "200px",
                    "disabled": false,
                    "hidden": false,
                    "required": false,
                    "requiredHint": "",
                    "customRule": "",
                    "customRuleHint": "",
                    "uploadURL": "",
                    "uploadTip": "",
                    "withCredentials": false,
                    "multipleSelect": false,
                    "showFileList": true,
                    "limit": 3,
                    "fileMaxSize": 5,
                    "fileTypes": [
                      "jpg",
                      "jpeg",
                      "png"
                    ],
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "onCreated": "",
                    "onMounted": "",
                    "onBeforeUpload": "",
                    "onUploadSuccess": "",
                    "onUploadError": "",
                    "onFileRemove": "",
                    "onValidate": ""
                  },
                  "id": "pictureupload86812"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-76888",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-76888"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-20038",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-20038"
            }
          ],
          "id": "table-row-79303",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext98952",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "优先级",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext98952"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-67172",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-67172"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "yxj",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input91645"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-21813",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-21813"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-75016",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-75016"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext80258",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "不动产所在区域",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext80258"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-71988",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-71988"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "bdcszqy",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input73301"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-24655",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-24655"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-106165",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-106165"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-109448",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-109448"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-102927",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-102927"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-71442",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-71442"
            }
          ],
          "id": "table-row-11177",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext73414",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "查询密码",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext73414"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-56122",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-56122"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "cxmm",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": false,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input54391"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-99013",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-99013"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-51347",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-51347"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext72134",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "通知人姓名",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext72134"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-109904",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-109904"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "tzrxm",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input75234"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-38795",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-38795"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-32036",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-32036"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-95422",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-95422"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-43252",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-43252"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-47159",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-47159"
            }
          ],
          "id": "table-row-15061",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext64626",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "通知方式",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext64626"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-58735",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-58735"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "tzfs",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input90793"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-10072",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-10072"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-56966",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-56966"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext19431",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "移动电话",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext19431"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-73863",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-73863"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "yddh",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input64131"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-99785",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-99785"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-73332",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-73332"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-89112",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-89112"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-19959",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-19959"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-71090",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-71090"
            }
          ],
          "id": "table-row-105422",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext22542",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "通知人电话",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext22542"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-54172",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-54172"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "tzrdh",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input98687"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-89253",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-89253"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-43926",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-43926"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext86023",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "电子邮件",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext86023"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-43491",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-43491"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "dzyj",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": false,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input39931"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-44573",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-44573"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-20245",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-20245"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-96183",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-96183"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-49435",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-49435"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-93027",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-93027"
            }
          ],
          "id": "table-row-28548",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext100739",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "坐落",
                    "customClass": [],
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext100739"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-40134",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-40134"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "zl3",
                    "label": "input",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": [],
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input35550"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-69857",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 5,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-69857"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-100002",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 5,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-100002"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-98430",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 5,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-98430"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-66331",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 5,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-66331"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-40065",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 5,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-40065"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-45695",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-45695"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-33193",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-33193"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-102848",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 2,
                "rowspan": 6,
                "customClass": []
              },
              "id": "table-cell-102848"
            }
          ],
          "id": "table-row-44044",
          "merged": false
        },
        {
          "cols": [
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 102822,
                  "type": "static-text",
                  "icon": "static-text",
                  "formItemFlag": false,
                  "options": {
                    "name": "statictext33046",
                    "columnWidth": "200px",
                    "hidden": false,
                    "textContent": "",
                    "customClass": "",
                    "onCreated": "",
                    "onMounted": "",
                    "label": "static-text"
                  },
                  "id": "statictext33046"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-82983",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 1,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-82983"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [
                {
                  "key": 33503,
                  "type": "input",
                  "icon": "text-field",
                  "formItemFlag": true,
                  "options": {
                    "name": "input108471",
                    "label": "",
                    "labelAlign": "",
                    "type": "text",
                    "defaultValue": "",
                    "placeholder": "",
                    "columnWidth": "200px",
                    "size": "",
                    "labelWidth": "0",
                    "labelHidden": true,
                    "readonly": false,
                    "disabled": false,
                    "hidden": false,
                    "clearable": true,
                    "showPassword": false,
                    "required": false,
                    "requiredHint": "",
                    "validation": "",
                    "validationHint": "",
                    "customClass": "",
                    "labelIconClass": null,
                    "labelIconPosition": "rear",
                    "labelTooltip": null,
                    "minLength": null,
                    "maxLength": null,
                    "showWordLimit": false,
                    "prefixIcon": "",
                    "suffixIcon": "",
                    "appendButton": false,
                    "appendButtonDisabled": false,
                    "buttonIcon": "custom-search",
                    "onCreated": "",
                    "onMounted": "",
                    "onInput": "",
                    "onChange": "",
                    "onFocus": "",
                    "onBlur": "",
                    "onValidate": "",
                    "onAppendButtonClick": ""
                  },
                  "id": "input108471"
                }
              ],
              "merged": false,
              "options": {
                "name": "table-cell-59748",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 8,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-59748"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-91981",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 8,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-91981"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-84617",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 8,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-84617"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-90094",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 8,
                "rowspan": 1,
                "customClass": ""
              },
              "id": "table-cell-90094"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-96606",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 8,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-96606"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-19563",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 8,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-19563"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-51524",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 8,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-51524"
            },
            {
              "type": "table-cell",
              "category": "container",
              "icon": "table-cell",
              "internal": true,
              "widgetList": [],
              "merged": true,
              "options": {
                "name": "table-cell-38016",
                "cellWidth": "",
                "cellHeight": "",
                "colspan": 8,
                "rowspan": 1,
                "customClass": []
              },
              "id": "table-cell-38016"
            }
          ],
          "id": "table-row-23204",
          "merged": false
        }
      ],
      "options": {
        "name": "table91126",
        "hidden": false,
        "customClass": [
          "table-container table",
          "el-input__wrapper",
          "table-container",
          "el-textarea__inner",
          "el-input__wrapper:hover",
          "el-textarea__inner:hover"
        ]
      },
      "id": "table91126"
    }
  ],
  "formConfig": {
    "modelName": "formData",
    "refName": "vForm",
    "rulesName": "rules",
    "labelWidth": 105,
    "labelPosition": "left",
    "size": "",
    "labelAlign": "label-center-align",
    "cssCode": "/*.el-form {*/\n/*    width: 65%;*/\n/*}*/\n.el-form .el-form--default .el-form--label-left .render-form{\n  width: 78%;\n  margin: 0 auto;\n}\n.table-container .table-layout {\n  text-align: center;\n}\n.el-input__wrapper,.el-textarea__inner{\n  box-shadow: none;\n  padding: 6px 10px;\n}\n.el-input__wrapper:hover{\n  box-shadow: none;\n}\n.el-textarea__inner:hover{\n  box-shadow: none;\n}\n.el-form-item {\n  margin-bottom: 0;\n}\n.el-form-item__error{\n  display: none;\n}\n.fl{\n  color: red;\n}\n.table-cell {\n  background: #c9e2ff; \n  border: 1px solid #a3caff!important;\n}\n.el-form-item__label {  \n  padding: 0;\n}\n.table-container .table-layout {\n  --el-border-radius-base: 0;\n}\n.el-input {\n  width: 100%!important;\n  height: 100%!important;\n}\n.el-checkbox__inner {\n    margin-left: 30px;\n    border: 2px solid #607d9b;\n    background: #c9e2ff;\n}\n.fw {\n  font-weight: 700;\n}\n.bgtable {\n  background: #e6efff;\n}\n.star {\n  color: red;\n}",
    "customClass": [],
    "functions": "",
    "layoutType": "PC",
    "jsonVersion": 3,
    "onFormCreated": "",
    "onFormMounted": "",
    "onFormDataChange": "",
    "dataSources": [],
    "onFormValidate": ""
  }
});
var slbh = "KFQ202209160023";
var data = {
     "djsjd":"select SLBH,QXKZ,LCLX, LCMC, SJR, SJSJ, CNSJ, QXDM, TZRXM, TZFS, TZRDH, TZRYDDH, TZRDZYJ, TZRTXDZ, CXMM, SJMC, SJLX, SJSL, YS, SFSYBZ, SFEWSJ, SFBCSJ, ZRKS,ZRR,YXJ,SJBZ,BCSM,DJXL,FCSLH,FCDJLX,JYBH,FCHID,DJDL,ZL,HTBH,PCH,PRJID,XCZP,LCLB from DJ_SJD where SLBH = 'KFQ202209160023'",
     "djdjb":"select SLBH,SQFBCZ,GYFS,DJLX,DJYY,DJRQ,SQRQ,XGZH,LIFECYCLE from DJ_DJB where SLBH = 'KFQ202209160023'",
     "djtsgl":"select LIFECYCLE from DJ_TSGL where SLBH = 'KFQ202209160023'",
     "ggdjyy":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '房屋转移登记原因' AND ROWNUM<2) ORDER BY ITEMORDER",
     "ggzrks":"select ITEMNOTE AS ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '责任科室' AND ROWNUM<2) ORDER BY ITEMORDER",
     "ggsjr":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '收件人' AND ROWNUM<2) ORDER BY ITEMORDER",
     "ggyxj":"select ITEMVAL, ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '优先级' AND ROWNUM<2) ORDER BY ITEMORDER",
     "ggssxq":"select ITEMNOTE,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '所属辖区' AND ROWNUM<2) ORDER BY ITEMORDER",
     "ggtzfs":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '通知方式' AND ROWNUM<2) ORDER BY ITEMORDER",
     "gggyfs":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE =(SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '共有方式' AND ROWNUM < 2 ) ORDER BY ITEMORDER",
     "ggdjxl":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '国有建设用地使用权及房屋所有权转移登记' AND ROWNUM<2) ORDER BY ITEMORDER",
     "ggdjlx":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '登记类型(大类)' AND ROWNUM<2) ORDER BY ITEMORDER",
     "ggzjlx":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '证件类型' AND ROWNUM<2) ORDER BY ITEMORDER",
     "ggsjbz2":"select ITEMVAL,ITEMNAME from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '收件备注' AND ROWNUM<2) AND ITEMNOTE IS NOT NULL ORDER BY ITEMORDER",
     "ggqygpy":"select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '设备' AND ROWNUM < 2) AND ITEMNAME = '现场拍照启用高拍仪' AND ROWNUM < 2",
     "ggdjxlms":"select ITEMNOTE,ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '国有建设用地使用权及房屋所有权转移登记' AND ROWNUM<2) ORDER BY ITEMORDER",
     "ggxsqx":"select ITEMVAL from DIC_ITEM where DICCODE = (SELECT DICCODE FROM DIC_MAIN WHERE DICNAME = '限购限售控制' AND ROWNUM < 2) AND ITEMNAME = '限售' AND ROWNUM < 2",
     "gglclb":"select ItemVal,ItemName from DIC_ITEM where dicCode =(SELECT DICCODE FROM dic_main WHERE DICNAME = '流程类别' And RowNum<2)"
     }

    function myFunction() {
      /* 获取文本内容 */
      var text = document.getElementById("input42368").value;
      /* 弹出内容 */
      alert("文本为: " + text);
   }
const formData = reactive({});
const optionData = reactive({});
const submitForm = () => {
  vFormRef.value
    .getFormData()
    .then((formData) => {
      // Form Validation OK
      axios
       .post("/test/sqls", data)
       .then((res) => {
         if (res.code == 200) {
         }
         console.log(res.data.data.djdjb[0]);
         console.log(res.data.data.djdjb[0].SLBH);
         const zifuchuandata = JSON.stringify(formData);
         const duixiangdata = JSON.parse(zifuchuandata)
         duixiangdata.slbh=res.data.data.djdjb[0].SLBH
         console.log(duixiangdata.slbh);
         console.log(duixiangdata);
         let newFormData = null
         newFormData = duixiangdata
         console.log(newFormData);
       });
         })

    .catch((error) => {
      // Form Validation failed
      ElMessage.error(error);
    });
    
};

//  const submitForm = () => {
//     vFormRef.value.getFormData().then(formData => {
//       // Form Validation OK
//       alert( JSON.stringify(formData) )
//     }).catch(error => {
//       // Form Validation failed
//       ElMessage.error(error)
//     })    
//   }

//  onMounted(() => {
//       //从后端接口获取表单的选项数据（如表单中无选项类型字段、则跳过此步骤），并赋值给optionData变量，需自行实现！！
//       axios.post("/test/sqls", data).then(res => {
//         if (res.code == 200) {
//           optionData = res.data
//         }
        
//         //从后端接口获取已保存的数据对象（如只显示空白表单、则跳过此步骤），并赋值给formData变量，需自行实现！！
//         axios.post("/test/sqls", data).then(res => {
//           let newFormData = null
//           if (res.code == 200) {
//             newFormData = res.data
//           }
          
//           //从后端接口获取表单json对象，然后调用v-form-render对象的setFormJson(xxx)加载表单，需自行实现！！
//           axios.post("/test/sqls", data).then(res => {
//             if (res.code == 200) {
//               vFormRef.value.setFormJson(res.data)
//               this.$nextTick(() => {
//                 vFormRef.value.setFormData(newFormData)
//               })
//             }
//           }).catch(err => {
//             //
//           })
//         }).catch(err => {
//           //
//         })
//       }).catch(err => {
//         //
//       })
//   })
// console.log(formJson);
// const data2 = JSON.stringify(formJson);
// console.log(data2);
// const saveFormJson = () => {
//   proxy.$http.post("/flow/form?name=shoujian", formJson).then((res) => {
//     if (res.code == 200) {
//       console.log(res);
//     }
//     console.log(res);
//   });

//   ElMessage.success("表单已保存！");
// };
</script>

<style >
</style>















