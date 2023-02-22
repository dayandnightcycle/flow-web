<template>
  <div class="boxtb">
    <div class="divInputBtn">
      <el-input v-model="reffilename" class="iptfilename" />
      <a href="javascript:;" class="file"
        >选择文件
        <input
          id="file1"
          type="file"
          name="file"
          class="inputFile"
          @change="update"
        />
      </a>

      <!-- <div class="el-upload__tip">
            <span class="redstar">*</span>上传文件仅限json格式，重名文件会被覆盖
        </div> -->
    </div>
  </div>
  <!-- <div ref="loadingRef"></div> -->
  <!-- =====原生input===== -->
  <!-- <input id="fileUpload" type="file" name="file" accept="csv" @change="update"> -->
</template>
 
<script lang="ts" setup>
import { ref, reactive } from "vue";
import {
  ElMessage,
  // ElNotification,
  // genFileId,
  // UploadUserFile,
  ElLoading,
} from "element-plus";
import axios from "axios";

const reffilename = ref("");

function update(e) {
  //   showLoading(loadingRef.value)
  let file = e.target.files[0];
  reffilename.value = file.name;
  let vformname = reffilename.value;
  // console.log(file);
  console.log(vformname);
  if (vformname.substring(vformname.length - 4) != "json") {
    // hideLoading()

    ElMessage.error("上传文件格式不是json");
    // 清空选择的文件
    reffilename.value = ""
  } else {
    //   const instance = axios.create({
    // withCredentials: true
    //   });
    let param = new FormData();

    // let vformname = vformname;
    param.append("file", file);
    // console.log(param.get("file"));
    let config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("/flow/upload?name=" + vformname, param, config)
      .then((res) => {
        console.log(res.data);
        if (res.data.code == 0) {
          // 清空选择的文件
          // let obj = document.getElementById('fileUpload')
          // obj.outerHTML=obj.outerHTML
          // reffilename.value = ""

          // hideLoading(
          ElMessage({
            message: "上传文件成功",
            type: "success",
          });
        }else if(res.data.code == -2){
          ElMessage({
            message: "该文件名已存在",
            type: "error",
          });
        }
      });
  }

  // 上传一次后，第二次上传会无效，为此刷新页面
  //   setTimeout(function (){
  //       window.location.reload();
  //     }, 3000)
}

// let loading;
// const loadingRef = ref(null)

// // 加载状态
// function showLoading(el) {
//     loading = ElLoading.service({
//       fullscreen:true,
//       target: el,
//       lock: true,
//       background:'#ddd'
//     })
// }
// // 关闭加载状态
// function hideLoading() {
//     loading.close()
// }
</script>
 
<style scoped>
.divInputBtn {
  display: flex;
}
.file {
  position: relative;
  display: inline;
  background: #409eff;
  border: 1px solid #99d3f5;
  border-radius: 4px;
  overflow: hidden;
  color: #fff;
  width: 80px;
  text-decoration: none;
  line-height: 25px;
  font-size: 14px;
  text-align: center;
}
.file input {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  width: 80px;
}
.file:hover {
  background: #79bbff;
  border-color: #78c3f3;
  color: #fff;
  text-decoration: none;
}
.iptfilename {
  width: 200px;
}
</style>