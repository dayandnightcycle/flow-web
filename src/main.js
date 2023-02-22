import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import http from "./utils/http";
import store from "./store";
import "element-plus/dist/index.css";
//import './assets/main.css'
// import $ from 'jquery'

import locale from "element-plus/lib/locale/lang/zh-cn";
const app = createApp(App);
app.use(ElementPlus, { locale });
// app.config.productionTip = false;
// app.prototype.$ = $;
app.use(store);
app.use(router);
// app.use(ElementPlus); //全局注册element-plus

app.mount("#app");
app.config.globalProperties.$http = http;
//图标引入
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

//引入Vform
import axios from "axios"; //如果需要axios，请引入

// import VForm3 from "vform3-builds"; //引入VForm3库

// import "vform3-builds/dist/designer.style.css"; //引入VForm3样式

// app.use(VForm3); //全局注册VForm3(同时注册了v-form-designe、v-form-render等组件)
// import VForm3 from '@/../lib/vform3/designer.umd.js'
import VForm3 from '@/../lib/vform3/designer.umd.js'
import '../lib/vform3/designer.style.css'
app.use(VForm3)  //全局注册VForm3，同时注册了v-form-designer、v-form-render等组件

/* 注意：如果你的项目中有使用axios，请用下面一行代码将全局axios复位为你的axios！！ */
window.axios = axios;