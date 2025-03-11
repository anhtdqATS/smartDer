<script setup>
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import baseApi from "../api/baseApi";
import cmdTypes from "../cmdTypes";
import { GatewayServiceId } from "@/Constants/index.js";

import { mdiServerNetwork } from "@mdi/js";

const serverNTP = ref([]);
const enabledNTPServer = ref(false);
const getNTPServer = () => {
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: {
      cmdType: cmdTypes.getNTPSetting,
    },
  };
  baseApi
    .getNTPSetting(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        serverNTP.value = res.data.payload.servers;
        enabledNTPServer.value = res.data.payload.enabled;
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
getNTPServer();

const inputValue = ref("");
const inputVisible = ref(false);
const InputRef = ref();

const handleClose = (tag) => {
  serverNTP.value.splice(serverNTP.value.indexOf(tag), 1);
  updateNTPServer();
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.input.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    serverNTP.value.push({
      address: inputValue.value,
    });
  }
  updateNTPServer();
  inputVisible.value = false;
  inputValue.value = "";
};
const updateNTPServer = () => {
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: {
      cmdType: cmdTypes.updateNTPSetting,
      enabled: enabledNTPServer.value,
      servers: serverNTP.value,
    },
  };
  baseApi
    .setNTPSetting(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
        getNTPServer();
      } else {
        ElMessage({
          message: "Update New Server Success!",
          grouping: true,
          showClose: true,
          type: "success",
        });
      }
    })
    .catch((err) => {
      ElMessage({
        message: err,
        grouping: true,
        showClose: true,
        type: "error",
      });
      getNTPServer();
    });
};
</script>
<template>
  <SectionTitleLineWithButton :icon="mdiServerNetwork" title="NTP Setting">
    <el-switch v-model="enabledNTPServer" size="large" active-text="Enabled" />
  </SectionTitleLineWithButton>
  <div v-if="enabledNTPServer">
    <el-link type="primary" class="mb-4 m-2" disabled>NTP List Server </el-link
    ><br />
    <el-tag
      v-for="ntp in serverNTP"
      :key="ntp"
      class="mx-1"
      closable
      size="large"
      :disable-transitions="false"
      @close="handleClose(ntp.address)"
    >
      {{ ntp.address }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag ml-1 !text-sm" @click="showInput">
      <span class="text-xs">+ Add New Server</span>
    </el-button>
  </div>
</template>
