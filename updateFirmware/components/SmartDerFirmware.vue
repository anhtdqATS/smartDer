<script setup>
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import { useMainStore } from "@/stores/main.js";
import { genFileId } from "element-plus";

import { mdiBookInformationVariant } from "@mdi/js";
import { GatewayServiceId } from "@/Constants/index.js";

import baseApi from "../api/baseApi";
import cmdTypes from "../cmdTypes";
import { UploadFilled } from "@element-plus/icons-vue";

const mainStore = useMainStore();

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
  console.log(files);
  fileImport.value = files.raw;
};

const importConfig = () => {
  let formData = new FormData();
  const dataUpdateLicense = {
    cmd: {
      receiver: GatewayServiceId,
      payload: {
        cmdType: cmdTypes.updateFirmwareSmartDer,
      },
    },
    fw: fileImport.value,
  };
  for (const [key, value] of Object.entries(dataUpdateLicense)) {
    if (key === "cmd") {
      formData.append("cmd", JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  }
  baseApi
    .updateFirmwareSmartDer(formData)
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
  <div class="mb-5">
    <el-link type="primary" disabled>Firmware Information</el-link>
    <el-descriptions class="mt-3" :column="2" :size="size" border>
      <el-descriptions-item align="center">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <user />
            </el-icon>
            Name
          </div>
        </template>
        {{ mainStore.gatewayInfo.name }}
      </el-descriptions-item>
      <el-descriptions-item align="center">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <iphone />
            </el-icon>
            Type
          </div>
        </template>
        {{ mainStore.gatewayInfo.type }}
      </el-descriptions-item>

      <el-descriptions-item align="center">
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <office-building />
            </el-icon>
            Version
          </div>
        </template>
        {{ mainStore.gatewayInfo.version }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <div>
    <el-link type="primary" disabled>Update SmartDER Firmware</el-link>
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
  </div>
</template>
