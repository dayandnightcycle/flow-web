<template>
  <div class="topnavigation">
    <el-container class="layout-container-demo">
      <el-header style="position:relative">
        <div class="title">不动产登记统一受理系统</div>
      </el-header>
    </el-container>
</div>
</template>

<script setup>
import router from "../router";
import Cookies from "js-cookie";
const logout = () => {
  window.localStorage.removeItem("token");
  router.push({
    path: "/login",
  });
};
</script>

<style scoped>
.topnavigation:deep(.el-header) {
  padding: 0 !important;
}

.topnavigation {
  height: 60px;
  width: 100%;
}

.layout-container-demo {
  height: 100%;
  width: 100%;
  display: flex;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: #328ac9;
  /* background:-webkit-linear-gradient(top,red,pink,#fff) */
  /* background-color: -webkit-linear-gradient(left,red,pink,#fff) !important; */
  color: var(--el-text-color-primary);
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 1vw;
}

.layout-container-demo .el-header .title {
  width: 92%;
  line-height: 7vh;
  font-size: 25px;
  color: #fff;
  padding-left: 20px;
  font-family: cursive;
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  width: 13%;
  height: 91%;
}

.logout {
  /* margin: 3vh;
  height: 3vh;
  width: 3vw; */
}

.el-button>span {
  display: inline-flex;
  align-items: center;
  width: 3vw;
  /* text-align: center; */
  font-size: 0.5vw;
  padding: 1vw;
}
</style>
