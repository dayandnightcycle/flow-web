<template>
  <div class="login-page">
    <el-form :model="form" class="login-form">
      <h1 class="login-title">登录</h1>
      <el-form-item label>
        <!-- <div class="login-input"> -->
          <!-- <el-button>
            <el-icon>
              <User />
            </el-icon>
          </el-button> -->
          <el-input ref="nameInput" type="text" v-model="form.name" placeholder="请输入账号" :prefix-icon="User"></el-input>
        <!-- </div> -->
      </el-form-item>
      <el-form-item label>
        <!-- <div class="login-input">
          <el-button>
            <el-icon>
              <Lock />
            </el-icon>
          </el-button> -->
          <el-input ref="passwordInput" type="password" v-model="form.password" placeholder="请输入密码" show-password :prefix-icon="Lock"></el-input>
        <!-- </div> -->
      </el-form-item>
      <el-form-item>
        <el-button id="login-button" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { User,Lock} from '@element-plus/icons-vue'

import { ref, reactive, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import bcrypt from "bcryptjs";
import router from "../router";
import Cookies from "js-cookie";

const nameInput = ref();
const passwordInput = ref();

const form = reactive({
  name: "",
  password: "",
});

const { proxy } = getCurrentInstance();

const login = () => {
  if (!form.name) {
    ElMessage.error("账号不能为空");
    nameInput.value.focus();
    return;
  }

  if (!form.password) {
    ElMessage.error("密码不能为空");
    passwordInput.value.focus();
    return;
  }
  console.log(form);
  const data = new FormData();
  const username = form.name;
  const password = bcrypt.hashSync(form.password, bcrypt.genSaltSync(10));
  Cookies.set("userId", username);
  data.append("username", username);
  data.append("password", password);
  console.log(data);
  proxy.$http
    .post("/flow/user/login", data)
    .then((res) => {
      if (res.data.code != 0) {
        ElMessage.error(res.data.message);
        return;
      }

      const token = res.data.data;
      window.localStorage.removeItem("token");
      window.localStorage.setItem("token", token);
      router.push({
        path: "/",
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};
</script>

<style scoped>
.login-page {
  background: url('../assets/background/background.jpeg') no-repeat;
  width: 100%;
  height: calc(100vh);
  background-position: 100%;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
}

.login-input {
  display: flex;
  flex: 1;
}

.login-form:deep(.el-icon) {
  font-size: 20px;
}
.login-form:deep(.login-input){
  padding: 0;
  background: transparent !important;
}
.login-form:deep(input:-webkit-autofill) {
  /* -webkit-text-fill-color: #fff; */
  transition: background-color 5000s ease-out 0.05s
}
.login-form {
  border-radius: 10px;
  margin: 0px auto;
  width: 400px;
  padding: 30px 35px 15px 35px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.5);
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.5);
}

.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

#login-button {
  width: 100%;
}
</style>