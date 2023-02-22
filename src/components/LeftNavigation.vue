<template>
  <div class="leftnavigation" style="width:100%;height:100%">
    <!-- 登录用户 主页 在线交流 邮件 退出 -->
    <div class="toolbar" style="position:absolute;width:300px;right:0;display: flex;top:2px">
      <div style="color:#fff;margin:19px 25px;"><span class="iconfont icon-wode-F"></span><span style="font-size:20px">{{
          userId
        }}</span></div>
      <el-button class="bticon" @click="menuVisiable = true"><span class="iconfont icon-zhuye"></span></el-button>
      <el-button class="bticon"><span class="iconfont icon-xinxi"></span></el-button>
      <el-button class="bticon"><span class="iconfont icon-youjian"></span></el-button>
      <el-button class="bticon" id="logout-button" @click="logout"><span class="iconfont icon-guanbi"></span>
      </el-button>
    </div>
    <el-container class="layout-container-demo" style="display:flex;flex-direction: column;">
      <div class="left-top" style="position:relative">
        <div class="gncd" style="position:relative" v-if="menuVisiable">功能菜单
          <el-button style="position:absolute;right:0;top:2px;background: transparent;border: transparent;"
                     @click="menuVisiable = false;"><span class="iconfont icon-liebiao"
                                                          style="font-size:15px;font-weight:600;"></span></el-button>
        </div>
        <el-tabs v-model="editableTabsValue" class="demo-tabs" @tab-click="handleClick" style="flex:1" type="card"
                 editable @edit="handleTabsEdit">
          <el-tab-pane v-for="(item, index) in tabdata" :key="index" :label="item.title"
                       :name="item.name"></el-tab-pane>
        </el-tabs>
        <div style="width:200px;display:flex">
          <el-button class="xjyw" @click="newdata">
            <span class="iconfont icon-xinzeng1"
                  style="font-size: 15px;margin: 5px;color: #e30f0f;font-weight: 600;"></span>新建业务
          </el-button>
          <el-button class="xjyw">
            <span class="iconfont icon-jurassic_profile-map"
                  style="font-size: 15px;font-weight: 600;margin: 5px;"></span>图形浏览
          </el-button>
        </div>
      </div>
      <div style="display:flex;flex-direction:row">
        <el-aside class="leftmenu" style="width: 230px;" v-if='menuVisiable'>
          <el-scrollbar>
            <el-menu router unique-opened :default-active="defaultactive">
              <!-- 1 -->
              <template v-for="(item, index) in menudata" :key="index">
                <el-sub-menu v-if="item.children != undefined" :index="item.index">
                  <template #title>
                    <el-icon>
                      <Document/>
                    </el-icon>
                    {{ item.name }}
                  </template>
                  <!-- 1-1 -->
                  <template v-for="(ite, inde) in item.children" :key="inde">
                    <el-sub-menu v-if="ite.children != undefined" :index="ite.index" class="lefttitle">
                      <template #title>
                        <el-icon>
                          <Document/>
                        </el-icon>
                        {{ ite.name }}
                      </template>
                      <!-- 1-1-1 -->
                      <template v-for="(it, ind) in ite.children" :key="ind">
                        <el-sub-menu v-if="it.children != undefined" :index="it.path" class="lefttitle">
                          <template #title>
                            <el-icon>
                              <Document/>
                            </el-icon>
                            {{ it.name }}
                          </template>
                          <!-- 1-1-1-1 -->
                          <template v-for="(itt, id) in it.children" :key="id">
                            <el-menu-item :index="itt.path" @click="menuchilck(itt)">
                              <el-icon>
                                <Document/>
                              </el-icon>
                              {{ itt.name }}
                            </el-menu-item>
                          </template>
                        </el-sub-menu>
                        <el-menu-item v-else :index="it.path" @click="menuchilck(it)">
                          <el-icon>
                            <Document/>
                          </el-icon>
                          {{ it.name }}
                        </el-menu-item>
                      </template>
                    </el-sub-menu>
                    <el-menu-item v-else :index="ite.path" @click="menuchilck(ite)">
                      <el-icon>
                        <Document/>
                      </el-icon>
                      {{ ite.name }}
                    </el-menu-item>
                  </template>
                </el-sub-menu>
                <el-menu-item v-else :index="item.index" class="title" @click="menuchilck(item)">
                  <el-icon>
                    <Document/>
                  </el-icon>
                  {{ item.name }}
                </el-menu-item>
              </template>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main id="main" style="flex:1">
          <router-view class="viewContent"></router-view>
        </el-main>
      </div>
    </el-container>
    <el-dialog v-model="ywdialogVisible" title="新建业务" width="30%" :before-close="dialogVisible = false"
               class="ywdialog">
      <div style="display:flex;flex-direction:column">
        <el-tree style="display:1" :data="treedata" :props="defaultProps" @node-click="handleNodeClick">
          <template #default="{ data }">
            <span :class="data.icon" :style="data.style"></span>
            {{ data.label }}
          </template>
        </el-tree>
        <div
            style="position: absolute;bottom: 10px;height: 120px;width: 95%;margin: 0px auto;border: 1px solid #d3d1d1;display:flex;flex-direction: column;"
            v-if='lcmsVisiable'>
          <div style="height:30px;width:100%;display:flex;">
            <div
                style="width:90px;border-right:1px solid #d3d1d1;line-height: 30px;font-size: 12px;font-weight:600;color:#000;padding-left:10px">
              流程期限：
            </div>
            <div style="display:flex;line-height: 30px;">
              <el-input style="width:400px" v-model="inputday" placeholder="请输入时间" clearable/>
              天
              <el-select v-model="gzrvalue" class="m-2" style="width:100px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>

            </div>
          </div>
          <div style="height:90px;width:100%;display: flex;">
            <div
                style="width:90px;border-right:1px solid #d3d1d1;line-height: 90px;font-size: 12px;font-weight:600;color:#000;padding-left:10px">
              流程描述：
            </div>
            <div style="display:flex;">
              <div style="width:400px;border-right:1px solid #d3d1d1"></div>
              <el-button style="width: 90px;height: 70px;margin-left: 15px;margin-top: 10px;"
                         @click="CreateProcess">创建流程
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import router from "../router";
import '../assets/图标/icon/iconfont.css'
import {getCurrentInstance, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import {Document,} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import Cookies from "js-cookie";

const userId = Cookies.get("userId");
const {proxy} = getCurrentInstance();
// import type { TabsPaneContext } from 'element-plus'
const ywdialogVisible = ref(false);
const activeName = ref('1')
const lcmsVisiable = ref(false)
const menuVisiable = ref('true')

const gzrvalue = ref('工作日')
const inputday = ref('3')
const value = ref('')

const options = [
  {
    value: '工作日',
    label: '工作日',
  },
  {
    value: '休息日',
    label: '休息日',
  }
]
const route = useRouter();
const uid = route.currentRoute._value.href;
let defaultactive = '1'
let tabIndex = 2
const editableTabsValue = ref('主页')
const tabdata = ref([
  {
    title: '主页',
    name: '主页',
  },
]);
const sfjt = ref('true')
const newdata = () => {
  ywdialogVisible.value = true
  sfjt.value = false;
}
const handleClick = (tab, Event) => {
  sfjt.value = false;
  let data = tab.props.name;
  if (data == '主页') {
    menuVisiable.value = true;
    router.push({path: '/home1'})
  } else {
    menuVisiable.value = false;
    for (let i = 0; i < tabdata.value.length; i++) {
      if (tabdata.value[i].name == data) {
        router.push({
          path: tabdata.value[i].path,
          query: tabdata.value[i].query,
        });
      }
    }
  }
}
const menudata = [
  {
    index: '1',
    name: '我的工作',
    icon: '',
    path: '',
    children: [
      {index: '1-1', name: '已完成业务', icon: '', path: '/ywcyw'},
      {index: '1-2', name: '我的待取件', icon: '', path: '',},
      {index: '1-3', name: '我的待办件', icon: '', path: '',},
      {index: '1-4', name: '会签抄送件', icon: '', path: '',},
      {index: '1-5', name: '我的委托件', icon: '', path: '',},
      {index: '1-6', name: '我的办结件', icon: '', path: '',},
      {index: '1-7', name: '我的关注件', icon: '', path: '',},
      {index: '1-8', name: '例外审核件', icon: '', path: '',},
      {index: '1-9', name: '我的参与件', icon: '', path: '',},
      {index: '1-10', name: '我的委托追踪', icon: '', path: ''},
    ]
  },
  {
    index: '2',
    name: '我的工作',
    icon: '',
    path: '',
    children: [
      {index: '2-1', name: '我的受理件', icon: '', path: '',},
      {index: '2-2', name: '我的办理件', icon: '', path: '',},
      {index: '2-3', name: '我的待收件', icon: '', path: '',},
      {index: '2-4', name: '我的待办件', icon: '', path: '',},
    ]
  },
  {
    index: '3',
    name: '新功能',
    icon: '',
    path: '',
    children: [
      {index: '3-1', name: '测试家庭查询', icon: '', path: '',},
      {index: '3-2', name: '不动产追溯克隆1120', icon: '', path: '',},
      {index: '3-3', name: 'CA绑定', icon: '', path: '',},
      {index: '3-4', name: '家庭查询', icon: '', path: '',},
    ]
  },
  {
    index: '4',
    name: '新功能',
    icon: '',
    path: '',
    children: [
      {index: '4-1', name: '重复证号修改', icon: '', path: '',},
      {index: '4-2', name: '修改业务状态', icon: '', path: '',},
      {index: '4-3', name: '面积修改', icon: '', path: '',},
      {index: '4-4', name: '统计证书', icon: '', path: '',},
      {index: '4-5', name: '统计证明', icon: '', path: '',},
      {index: '4-6', name: '统计证书1', icon: '', path: '',},
      {index: '4-7', name: '导入黑名单信息菜单', icon: '', path: '',},
      {index: '4-8', name: '开发区房屋登记信息查询', icon: '', path: '',},
      {index: '4-9', name: '限制信息设置', icon: '', path: '',},
      {index: '4-10', name: '不动产业务调查关联', icon: '', path: '',},
      {index: '4-11', name: '证书登记查询', icon: '', path: '',},
      {index: '4-12', name: '地税信息查询', icon: '', path: '',},
      {index: '4-13', name: '权力土地相关面积修改', icon: '', path: '',},
      {index: '4-14', name: '查封业务数据查询', icon: '', path: '',},
      {index: '4-15', name: '证书锁定', icon: '', path: '',},
      {index: '4-16', name: '证明登记查询', icon: '', path: '',},
      {index: '4-17', name: '黑名单管理', icon: '', path: '',},
    ]
  },
  {
    index: '5',
    name: '信息交流',
    icon: '',
    path: '',
    children: [
      {
        index: '5-1', name: '邮件管理', icon: '', path: '',
        children: [
          {index: '5-1-1', name: '发邮件', icon: '', path: ""},
          {index: '5-1-2', name: '发通知', icon: '', path: ""},
          {index: '5-1-3', name: '草稿箱', icon: '', path: ""},
          {index: '5-1-4', name: '发件箱', icon: '', path: ""},
          {index: '5-1-5', name: '收件箱', icon: '', path: ""},
          {index: '5-1-6', name: '回收站', icon: '', path: ""},
          {index: '5-1-7', name: '通知格', icon: '', path: ""},

        ]
      },
      {
        index: '5-2', name: '短信管理', icon: '', path: '',
        children: [
          {index: '5-2-1', name: '通讯录', icon: '', path: ""},
          {index: '5-2-2', name: '发件箱', icon: '', path: ""},
          {index: '5-2-3', name: '发短信', icon: '', path: ""},
          {index: '5-2-4', name: '草稿箱', icon: '', path: ""},
          {index: '5-2-5', name: '常用语', icon: '', path: ""},
        ]
      },
      {index: '5-3', name: '在线交流记录', icon: '', path: '',},
    ]
  },
  {
    index: '6',
    name: '个人管理',
    icon: '',
    path: '',
    children: [
      {index: '6-1', name: '个人信息设置', icon: '', path: '',},
    ]
  },
  {
    index: '7',
    name: '补录登记',
    icon: '',
    path: '',
    children: [
      {index: '7-1', name: '预告补录', icon: '', path: '',},
      {index: '7-2', name: '不动产抵押补录', icon: '', path: '',},
      {index: '7-3', name: '查封补录（按证）', icon: '', path: '',},
      {index: '7-4', name: '查封补录（按单元）', icon: '', path: '',},
      {index: '7-5', name: '土地不动产证补录', icon: '', path: '',},
      {index: '7-6', name: '房屋不动产证补录', icon: '', path: '',},
      {index: '7-7', name: '林地不动产证补录', icon: '', path: '',},
      {index: '7-8', name: '草地不动产证补录', icon: '', path: '',},
      {index: '7-9', name: '水域不动产证补录', icon: '', path: '',},
      {index: '7-10', name: '宗海不动产证补录', icon: '', path: '',},
      {index: '7-11', name: '海岛不动产证补录', icon: '', path: '',},
    ]
  },
  {
    index: '8',
    name: '业务办公',
    icon: '',
    path: '',
    children: [
      {
        index: '8-1', name: '不动产调查前置', icon: '', path: '',
        children: [
          {
            index: '8-1-1', name: '土地登记', icon: '', path: '',
            children: [
              {index: '8-1-1-1', name: "宗地调查前置", icon: '', path: ''}
            ]
          },
          {
            index: '8-1-2', name: '房屋登记', icon: '', path: '',
            children: [
              {index: '8-1-2-1', name: "单户调查前置", icon: '', path: ''},
              {index: '8-1-2-2', name: "房屋幢调查前置", icon: '', path: ''},
              {index: '8-1-2-3', name: "楼盘表批量导入（按幢）", icon: '', path: ''},
              {index: '8-1-2-4', name: "楼盘表批量导入（按宗）", icon: '', path: ''},
              {index: '8-1-2-5', name: "批量维护户号", icon: '', path: ''},
            ]
          },
          {
            index: '8-1-3', name: '林权登记', icon: '', path: '',
            children: [
              {index: '8-1-3-1', name: "林权调查前置", icon: '', path: ''},
            ]
          },
          {
            index: '8-1-4', name: '草权登记', icon: '', path: '',
            children: [
              {index: '8-1-4-1', name: "草权调查前置", icon: '', path: ''},
            ]
          },
          {
            index: '8-1-5', name: '承包权登记', icon: '', path: '',
            children: [
              {index: '8-1-5-1', name: "承包权调查前置", icon: '', path: ''},
            ]
          },
          {
            index: '8-1-6', name: '宗海登记', icon: '', path: '',
            children: [
              {index: '8-1-6-1', name: "宗海调查前置", icon: '', path: ''},
            ]
          },
          {
            index: '8-1-7', name: '海岛登记', icon: '', path: '',
            children: [
              {index: '8-1-7-1', name: "海岛调查前置", icon: '', path: ''},
            ]
          },
        ]
      },
      {
        index: '8-2', name: '不动产数据维护', icon: '', path: '',
        children: [
          {index: '8-2-1', name: '数据整理工具', icon: '', path: ''},
          {index: '8-2-2', name: '错误数据维护', icon: '', path: ''},
          {index: '8-2-3', name: '权利人管理', icon: '', path: ''},
          {index: '8-2-4', name: '宗地、房屋调查关联', icon: '', path: ''},
          {index: '8-2-5', name: '证书工本号管理', icon: '', path: ''},
        ]
      },
      {index: '8-3', name: '批量审批提交', icon: '', path: '',},
      {index: '8-4', name: '不予受理查询', icon: '', path: '',},
      {index: '8-5', name: '不动产权产籍证明书', icon: '', path: '',},
    ]
  },
  {
    index: '9',
    name: '业务办公',
    icon: '',
    path: '',
    children: [
      {index: '9-1', name: '合并收费', icon: '', path: ''},
      {index: '9-2', name: '人脸识别1', icon: '', path: ''},
      {index: '9-3', name: '不动产业务关联', icon: '', path: ''},
      {index: '9-4', name: '人脸识别', icon: '', path: ''},
      {
        index: '9-5', name: '不动产调查前置', icon: '', path: '',
        children: [
          {
            index: '9-5-1', name: '海岛登记', icon: '', path: '',
            children: [
              {index: '9-5-1-1', name: '海岛调查前置', icon: '', path: ''}
            ]
          },
          {
            index: '9-5-2', name: '土地登记', icon: '', path: '',
            children: [
              {index: '9-5-2-1', name: '宗地调查前置', icon: '', path: ''}
            ]
          },
          {
            index: '9-5-3', name: '房屋登记', icon: '', path: '',
            children: [
              {index: '9-5-3-1', name: '房屋幢调查前置', icon: '', path: ''},
              {index: '9-5-3-2', name: '单户调查前置', icon: '', path: ''},
              {index: '9-5-3-3', name: '楼盘表批量导入', icon: '', path: ''},
              {index: '9-5-3-4', name: '楼盘表批量导入（按宗）', icon: '', path: ''},
            ]
          },
          {
            index: '9-5-4', name: '林权登记', icon: '', path: '',
            children: [
              {index: '9-5-4-1', name: '林权调查前置', icon: '', path: ''}
            ]
          },
          {
            index: '9-5-5', name: '草权登记', icon: '', path: '',
            children: [
              {index: '9-5-5-1', name: '草权调查前置', icon: '', path: ''}
            ]
          },
          {
            index: '9-5-6', name: '承包权登记', icon: '', path: '',
            children: [
              {index: '9-5-6-1', name: '承包权调查前置', icon: '', path: ''}
            ]
          },
          {
            index: '9-5-7', name: '水域滩涂', icon: '', path: '',
            children: [
              {index: '9-5-7-1', name: '水域滩涂调查前置', icon: '', path: ''}
            ]
          },
          {
            index: '9-5-8', name: '宗海登记', icon: '', path: '',
            children: [
              {index: '9-5-8-1', name: '宗海调查前置', icon: '', path: ''}
            ]
          },
        ]
      },
      {index: '9-6', name: '房屋楼盘表查询管理', icon: '', path: ''},
      {
        index: '9-7', name: '不动产数据维护', icon: '', path: '',
        children: [
          {index: '9-7-1', name: '证书工本号管理工具', icon: '', path: ''},
          {index: '9-7-2', name: '权利人管理', icon: '', path: ''},
          {index: '9-7-3', name: '金融机构备案', icon: '', path: ''},
          {index: '9-7-4', name: '开发商资格备案', icon: '', path: ''},
          {index: '9-7-5', name: '不动产业务调查关联', icon: '', path: ''},
          {index: '9-7-6', name: '宗地、房屋调查关联', icon: '', path: ''},
          {index: '9-7-7', name: '房地证书挂接', icon: '', path: ''},
        ]
      },
      {
        index: '9-8', name: '勘误相关', icon: '', path: '',
        children: [
          {index: '9-8-1', name: '抵押勘误', icon: '', path: ''},
          {index: '9-8-2', name: '宗海勘误', icon: '', path: ''},
          {index: '9-8-3', name: '房地勘误', icon: '', path: ''},
          {index: '9-8-4', name: '林地勘误', icon: '', path: ''},
          {index: '9-8-5', name: '水域滩涂勘误', icon: '', path: ''},
          {index: '9-8-6', name: '海岛勘误', icon: '', path: ''},
          {index: '9-8-7', name: '查封勘误', icon: '', path: ''},
          {index: '9-8-8', name: '草地勘误', icon: '', path: ''},
          {index: '9-8-9', name: '预告勘误', icon: '', path: ''},
          {index: '9-8-10', name: '土地勘误', icon: '', path: ''},
        ]
      },
      {index: '9-9', name: '不动产登记簿管理', icon: '', path: ''},
      {index: '9-10', name: '不动产查封登记情况', icon: '', path: ''},
      {index: '9-11', name: '批量创建业务', icon: '', path: ''},
      {index: '9-12', name: '合成批量业务', icon: '', path: ''},
      {index: '9-13', name: '到期解除限制', icon: '', path: ''},
      {index: '9-14', name: '批量注销与反注销', icon: '', path: ''},
    ]
  },
  {
    index: '10',
    name: '补录登记',
    icon: '',
    path: '',
    children: [
      {index: '10-1', name: '查封补录（按不动产单元号查封）', icon: '', path: '',},
      {index: '10-2', name: '房屋不动产证补录', icon: '', path: '',},
      {index: '10-3', name: '土地不动产证补录', icon: '', path: '',},
      {index: '10-4', name: '查封补录', icon: '', path: '',},
      {index: '10-5', name: '抵押补录', icon: '', path: '',},
    ]
  },
  {
    index: '11',
    name: '统计分析',
    icon: '',
    path: '',
    children: [
      {index: '11-1', name: '不动产档案移交', icon: '', path: '',},
      {index: '11-2', name: '抵押科工作查询（三合一）', icon: '', path: '',},
      {index: '11-3', name: '不动产登记查询出具证明（新）', icon: '', path: ''},
      {index: '11-4', name: '不动产工作进展查询', icon: '', path: ''},
      {index: '11-5', name: '统计证书数量', icon: '', path: ''},
      {index: '11-6', name: '不动产缮证统计', icon: '', path: ''},
      {index: '11-7', name: '不动产缮证交接单', icon: '', path: ''},
      {index: '11-8', name: '不动产单元追溯', icon: '', path: ''},
      {index: '11-9', name: '不动产权证追溯', icon: '', path: ''},
      {index: '11-10', name: '签收单批量打印查询', icon: '', path: ''},
      {
        index: '11-11', name: '数据交换', icon: '', path: '',
        children: [
          {index: '11-11-1', name: '部数据汇交统计查询', icon: '', path: ''}
        ]
      },
      {
        index: '11-12', name: '相关查询', icon: '', path: '',
        children: [
          {index: '11-12-1', name: '不动产登记房屋权属信息查询', icon: '', path: ''},
          {index: '11-12-2', name: '不动产登记发证统一查询', icon: '', path: ''},
          {index: '11-12-3', name: '发证统计分析趋势图', icon: '', path: ''},
        ]
      },
    ]
  },
  {
    index: '12',
    name: '统计分析',
    icon: '',
    path: '',
    children: [
      {index: '12-1', name: '登簿缮证查询（导出）', icon: '', path: '',},
      {index: '12-2', name: '不动产登记信息追溯（新）', icon: '', path: '/zs',},
      {index: '12-3', name: '档案交接单打印', icon: '', path: '', path: '/zs1'},
      {index: '12-4', name: '不动产业务计费表', icon: '', path: '',},
      {index: '12-5', name: '不动产信息查询', icon: '', path: '',},
      {index: '12-6', name: '统计证书数量', icon: '', path: '',},
      {index: '12-7', name: '登记簿查询', icon: '', path: '',},
      {index: '12-8', name: '一、二手房详情查询', icon: '', path: '',},
      {index: '12-9', name: '修改共有情况', icon: '', path: '',},
      {index: '12-10', name: '查封台账', icon: '', path: '',},
      {index: '12-11', name: '统计功能新-抵押', icon: '', path: '',},
      {index: '12-12', name: '查询统计功能-（权属）', icon: '', path: '',},
      {index: '12-13', name: '查询统计功能-（查封台账）', icon: '', path: '',},
      {index: '12-14', name: '开发区房屋登记信息查询', icon: '', path: '',},
      {index: '12-15', name: '家庭查询', icon: '', path: '',},
      {index: '12-16', name: '统计功能新-权属（1）', icon: '', path: '',},
      {index: '12-17', name: '不动产台账查询', icon: '', path: '',},
      {index: '12-18', name: '查询统计功能-（抵押）', icon: '', path: '',},
      {index: '12-19', name: '查询统计功能-（查封）', icon: '', path: '',},
      {index: '12-20', name: '查询统计功能-（注销）', icon: '', path: '',},
      {index: '12-21', name: '输入证号查询登记类型第二版', icon: '', path: '',},
      {index: '12-22', name: '统计功能新-权属', icon: '', path: '',},
      {index: '12-23', name: '业务统计量', icon: '', path: '',},
      {index: '12-24', name: '统计功能（新）注销', icon: '', path: '',},
      {index: '12-25', name: '不动产历史问题综合查询', icon: '', path: '',},
      {index: '12-26', name: '查询统计功能二（发证量）', icon: '', path: '',},
      {index: '12-27', name: '房屋楼盘表查询', icon: '', path: '',},
      {index: '12-28', name: '登记工作进展查询', icon: '', path: '',},
      {index: '12-29', name: '不动产登记信息追溯', icon: '', path: '',},
      {
        index: '12-30', name: '数据交换', icon: '', path: '',
        children: [
          {index: '12-30-1', name: '部数据上报统计查询', icon: '', path: ''},
          {index: '12-30-2', name: '数据上报统计查询', icon: '', path: ''},
          {index: '12-30-3', name: '串联数据上报统计', icon: '', path: ''},
        ]
      },
      {
        index: '12-31', name: '相关查询', icon: '', path: '',
        children: [
          {index: '12-31-1', name: '缮证查询统计', icon: '', path: ''},
          {index: '12-31-2', name: '老数据查询', icon: '', path: ''},
          {index: '12-31-3', name: '不动产登记信息同意查询', icon: '', path: ''},
          {index: '12-31-4', name: '不动产登记发证同意查询', icon: '', path: ''},
          {index: '12-31-5', name: '核定交接单查询', icon: '', path: ''},
          {index: '12-31-6', name: '缮证交接单查询', icon: '', path: ''},
          {index: '12-31-7', name: '不动产登记完成情况统计', icon: '', path: ''},
          {index: '12-31-8', name: '发证统计分析趋势图', icon: '', path: ''},
        ]
      },
      {
        index: '12-32', name: '综合查询', icon: '', path: '',
        children: [
          {index: '12-32-1', name: '业务无异常信息', icon: '', path: ''},
          {index: '12-32-2', name: '业务变更监察', icon: '', path: ''},
          {index: '12-32-3', name: '挂起流程管理', icon: '', path: ''},
        ]
      },
      {
        index: '12-33', name: '自定义查询', icon: '', path: '',
        children: [
          {index: '12-33-1', name: '不动产数据汇交结果查询', icon: '', path: ''},
          {index: '12-33-2', name: '不动产房地发证查询', icon: '', path: ''},
          {index: '12-33-3', name: '不动产土地发证查询', icon: '', path: ''},
          {index: '12-33-4', name: '不动产土地抵押查询', icon: '', path: ''},
        ]
      },

    ]
  },
  {index: '13', name: '综合监察', icon: '', path: ''},
  {
    index: '14', name: '系统管理', icon: '', path: '',
    children: [
      {index: "14-1", name: '表单编辑', icon: '', path: '/vform'},
      {index: "14-1", name: '表单导出', icon: '', path: '/vformUpload'},
    ]
  },

]
const defaultProps = {
  children: 'children',
  label: 'label',
}
//树结构数据
const treedata = [
  {
    label: "国有建设用地使用权及房屋所有权登记",
    icon: 'iconfont icon-wenjian',
    style: "color:#ffe090;font-size: 23px",
    detail: "",
    lcmc: "",
    lcjson: "",
    key: "",
    children: [
      {
        label: '补录登记',
        icon: 'iconfont icon-dengjizheng',
        style: 'color: #f0a830;font-size: 23px;',
        detail: "",
        lcmc: "BLDJ",
        lcjson: "",
        key: ""
      },
      {
        label: '首次登记',
        icon: 'iconfont icon-dengjizheng',
        style: 'color: #f0a830;font-size: 23px;',
        detail: "",
        lcmc: "SCDJ",
        lcjson: "首次登记收件.json",
        key: "GYJSYDSYQJFWSYQSCDJDZ"
      },
      {
        label: '转移登记',
        icon: 'iconfont icon-dengjizheng',
        style: 'color: #f0a830;font-size: 23px;',
        detail: "",
        lcmc: "ZYDJ",
        lcjson: "转移收件.json",
        key: 'ZYDJ1'
      },
      {
        label: '注销登记',
        icon: 'iconfont icon-dengjizheng',
        style: 'color: #f0a830;font-size: 23px;',
        detail: "",
        lcmc: "ZXDJ",
        lcjson: "",
        key: ""
      },
      {
        label: '异议登记',
        icon: 'iconfont icon-dengjizheng',
        style: 'color: #f0a830;font-size: 23px;',
        detail: "",
        lcmc: "YYDJ",
        lcjson: "",
        key: ""
      },
      {
        label: '查封登记',
        icon: 'iconfont icon-dengjizheng',
        style: 'color: #f0a830;font-size: 23px;',
        detail: "",
        lcmc: "CFDJ",
        lcjson: "查封收件.json",
        key: "CFDJ"
      },
      {
        label: '抵押登记',
        icon: 'iconfont icon-dengjizheng',
        style: 'color: #f0a830;font-size: 23px;',
        detail: "",
        lcmc: "DYDJ",
        lcjson: "抵押收件.json",
        key: "GYJSYDSYQJFWSYQDYDJ"
      },
      {
        label: '更正登记',
        icon: 'iconfont icon-dengjizheng',
        style: 'color: #f0a830;font-size: 23px;',
        detail: "",
        lcmc: "DYDJ",
        lcjson: "gzdj-sj.json",
        key: "GZDJHZM"
      },
    ],
  }
]
let CurrentBusiness
// const xuanzhong=()=>{
if (uid.indexOf('zydj') != -1) {
  defaultactive = '1-3'
} else if (uid.indexOf('scdj') != -1) {
  defaultactive = '1-2'
} else if (uid.indexOf('cfdj') != -1) {
  defaultactive = '1-6'
} else {
  defaultactive = '1-1'
}
// }
const handleNodeClick = (data) => {
  CurrentBusiness = data;
  if (data.lcmc != '') {
    lcmsVisiable.value = true;
  }
}
//路由跳转
const showProcess = (key) => {
  router.push({
    path: "/" + key,
  });
};
const showVform = (key) => {
  router.push({
    path: "/" + key,
  });
};
const exportVform = (key) => {
  router.push({
    path: "/" + key,
  });
};
//侧边导航
const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};

const handleTabsEdit = (targetName, action) => {
  const tabs = tabdata.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
          if (nextTab.path != undefined || nextTab.path != null) {
            if (nextTab.query != undefined || nextTab.query != null) {
              router.push({
                path: nextTab.path,
                query: nextTab.query,
              });
            } else {
              router.push({path: nextTab.path})
            }
          } else {
            router.push({
              path: '/',
            });
            ywdialogVisible.value = false;
            menuVisiable.value = true;
          }
        }
      }
    })
  }

  editableTabsValue.value = activeName
  tabdata.value = tabs.filter((tab) => tab.name !== targetName)
}
// }
const CreateProcess = () => {
  axios.post("/test/slbh").then((res) => {
    let slbh = res.data.slbh;
    proxy.$http
        .post(
            "/flow/" + CurrentBusiness.lcmc + "/qd2?key=" + CurrentBusiness.key + "&user=" +
            userId +
            "&name=" + CurrentBusiness.lcjson + "&slbh=" +
            slbh
        )
        .then((res) => {
          const code = res.data.code;
          if (code === 0) {
            ElMessage({
              message: "流程发起成功",
              type: "success",
            });
            proxy.$http
                .get(
                    "/flow/" + CurrentBusiness.lcmc + "/cscx2?userId=" +
                    userId +
                    "&processDefinitionKey=" + CurrentBusiness.key + "&pageNumber=1&pageSize=20"
                ).then((res) => {
              let task = res.data.data[0]
              proxy.$http
                  .get(
                      "/flow/formJson?taskName=sj&taskId=" +
                      task.id
                  ).then((res) => {
                ywdialogVisible.value = false;
                menuVisiable.value = false;
                const newTabName = `${++tabIndex}`
                tabdata.value.push({
                  title: CurrentBusiness.label,
                  name: newTabName,
                  path: "/" + CurrentBusiness.lcmc.toLowerCase() + "/sj",
                  query: {id: task.id, slbh: slbh},
                })
                editableTabsValue.value = newTabName
                router.push({
                  path: "/" + CurrentBusiness.lcmc.toLowerCase() + "/sj",
                  query: {id: task.id, slbh: slbh},
                });
              })
            })
          } else {
          }
        })
        .catch(function (err) {
        });
  });
}
const menuchilck = (item) => {
  ywdialogVisible.value = false;
  sfjt.value = false;
  const newTabName = `${++tabIndex}`
  tabdata.value.push({
    title: item.name,
    name: newTabName,
    path: item.path,
  })
  editableTabsValue.value = newTabName
  router.push({
    path: item.path
  });
}
watch(() => router.currentRoute.value, (newValue, oldValue) => {
  if (sfjt.value) {
    let title = newValue.path;
    let biaoti = ''
    if (title.indexOf('scdj') != -1) {
      biaoti = '首次登记'
    } else if (title.indexOf('zydj') != -1) {
      biaoti = '转移登记'
    } else if (title.indexOf('cfdj') != -1) {
      biaoti = '查封登记'
    } else if (title.indexOf('dydj') != -1) {
      biaoti = '抵押登记'
    } else if (title.indexOf('gzdj') != -1) {
      biaoti = '更正登记'
    }
    if (oldValue.path == '/home1') {
      if (oldValue.query != undefined || oldValue.query != undefined) {
        menuVisiable.value = false;
        const newTabName = `${++tabIndex}`
        tabdata.value.push({
          title: biaoti,
          name: newTabName,
          path: newValue.path,
          query: newValue.query,
        })
        editableTabsValue.value = newTabName
      } else {
        router.push({
          path: "/home1",
          query: {title: '已通过'}
        });
      }
    }
  } else {
    sfjt.value = true;
  }
})
</script>

<style scoped>
.leftnavigation:deep(.ywdialog) {
  width: 650px;
  background: transparent;
  box-shadow: 0 0 5px 5px #585858;
}

.leftnavigation:deep(.el-dialog__body) {
  background: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 500px;
}

.leftnavigation:deep(.el-dialog__headerbtn .el-dialog__close) {
  font-size: 20px;
  color: #fff;
  font-weight: 900;
}

.leftnavigation:deep(.ywdialog .el-dialog__headerbtn) {
  width: 30px;
  height: 30px;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 2px;
}

.leftnavigation:deep(.ywdialog .el-dialog__header) {
  height: 30px;
  background: -webkit-linear-gradient(top, #bddaf1, #84b8e2, #5794d1);
  padding: 0;
  color: #fff;
  margin: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.leftnavigation:deep(.ywdialog .el-dialog__title) {
  line-height: 30px;
  font-size: 14px;
  color: #fff;
  margin-left: 15px;
}

.xjyw {
  width: 50%;
  height: 100%;
  border: none;
  background: #492970;
  border-radius: 0;
  color: #fff;
}

.leftnavigation:deep(.el-button+.el-button) {
  margin-left: 0;
}

.leftnavigation:deep(.el-tabs--card>.el-tabs__header .el-tabs__item .is-icon-close) {
  width: 14px;
  font-size: 12px;
  height: 14px;
  vertical-align: middle;
  line-height: 15px;
  overflow: hidden;
  top: -1px;
  right: -2px;
  transform-origin: 100% 50%;
}

.leftnavigation:deep(.el-tabs__new-tab) {
  display: none;
}

.leftnavigation:deep(.el-tabs--card>.el-tabs__header .el-tabs__item:first-child >i) {
  display: none;
}

.leftnavigation:deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover) {
  padding-left: 20px;
  padding-right: 20px;
}

.leftnavigation:deep(.el-tabs__item) {
  color: #f3fcff;
  background: #0567a8;
  border: 1px solid #492970;
  border-bottom: 1px solid transparent;
  height: 35px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-left: 5px;
}

.leftnavigation:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
  border: aliceblue;
}

.leftnavigation:deep(.el-tabs--card>.el-tabs__header .el-tabs__item.is-active) {
  border: 1px solid transparent;
  background: #fff;
  color: #000;
}

.leftnavigation:deep(.el-tabs--card>.el-tabs__header) {
  border-bottom: aliceblue;
  height: 0;
}

.left-top {
  height: 35px;
  width: 100%;
  background-color: #0567a8;
  display: flex;
  flex-direction: row;
}

.gncd {
  width: 230px;
  height: 100%;
  background: #fbb321;
  font-size: 16px;
  text-align: center;
  padding: 10px 0;
  line-height: 100%;
  color: #033c69;
}

.leftnavigation:deep(.el-sub-menu__title) {
  height: 35px !important;
  color: #1d5079;
}

.leftnavigation:deep(.title) {
  height: 35px !important;
  color: #1d5079;
}

.el-menu {
  background-color: #e1e9ed !important;
}

.leftnavigation:deep(.el-sub-menu .el-menu-item) {
  font-size: 12px;
  height: 30px !important;
  background: transparent;
  border: 1px solid transparent;
}

.leftnavigation:deep(.el-menu-item .el-menu-item) {
  font-size: 12px;
  height: 30px !important;
}

.leftnavigation:deep(.lefttitle .el-sub-menu__title) {
  font-size: 12px;
  height: 30px !important;
  color: currentColor;
}

.leftnavigation:deep(.el-sub-menu .el-menu) {
  background: #f3fcff;
}

.leftnavigation:deep(.el-menu-item.is-active) {
  color: currentcolor;
  background: #fdeac0;
  border: 1px solid #fdc674;
}

.toolbar:deep(.iconfont) {
  font-size: 20px;
}

.bticon {
  border: transparent;
  background: transparent;
  color: #fff;
  margin-top: 15px;
}

.leftmenu:deep(.el-scrollbar__wrap) {
  height: 90vh !important;
}
</style>
