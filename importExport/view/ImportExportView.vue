<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import { genFileId } from "element-plus";

import { GatewayServiceId } from "@/Constants/index.js";
import { mdiSwapVerticalBold } from "@mdi/js";
import { Download, UploadFilled, InfoFilled } from "@element-plus/icons-vue";
import baseApi from "../api/baseApi";
//export config

const exportConfig = () => {
  baseApi
    .exportConfig()
    .then((res) => {
      if (res.status !== 200) {
        ElMessage({
          message: "Export error !!!",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        let fileURL = window.URL.createObjectURL(new Blob([res.data]));
        let fileLink = document.createElement("a");
        let fileNameHandle = res.headers["content-disposition"];
        let index = fileNameHandle.indexOf("=");
        let fileName = fileNameHandle.substring(index + 1);
        fileLink.href = fileURL;
        fileLink.setAttribute("download", fileName);
        document.body.appendChild(fileLink);
        fileLink.click();
      }
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
    });
};

// upload License
const fileImport = ref();
const upload = ref();
const handleExceedUpload = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};
const handChangeUpload = (files) => {
  console.log("handChangeUpload");
  console.log(files);
  fileImport.value = files.raw;
};

const importConfig = () => {
  let formData = new FormData();
  formData.append("config", fileImport.value);
  baseApi
    .importConfig(formData)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        openFullScreenLoadingToLogin();
      }
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
    });
};

//set Info License success
const openFullScreenLoadingToLogin = () => {
  const loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
  setTimeout(() => {
    loading.close();
    router.push("/");
  }, 2000);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiSwapVerticalBold"
        title="Import - Export"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox class="mb-4">
        <el-link type="primary" disabled>Export Config</el-link>
        <div class="text-center mt-3">
          <el-button type="primary" round plain @click="exportConfig"
            ><el-icon><Download /></el-icon> Download</el-button
          >
        </div>
      </CardBox>
      <CardBox>
        <el-link type="primary" disabled>Import Config</el-link>
        <el-upload
          ref="upload"
          class="upload-demo mt-2"
          drag
          :limit="1"
          :on-exceed="handleExceedUpload"
          :on-change="handChangeUpload"
          :auto-upload="false"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              License files with a size less than 500kb
            </div>
          </template>
        </el-upload>
        <div class="flex justify-center">
          <el-button type="success" @click="importConfig" size="large" round>
            Upload
          </el-button>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
