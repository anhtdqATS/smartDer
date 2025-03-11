<script setup>
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import baseApi from "../api/baseApi";
import cmdTypes from "../cmdTypes";
import { GatewayServiceId } from "@/Constants/index.js";
import { Timer } from "@element-plus/icons-vue";

import { mdiWrenchClock } from "@mdi/js";

const timeValue = ref(null);
const shortcuts = [
  {
    text: "Today",
    value: new Date(),
  },
  {
    text: "Yesterday",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: "A week ago",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];

const getSystemTime = () => {
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: {
      cmdType: cmdTypes.getTime,
    },
  };
  baseApi
    .getSystemTime(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        timeValue.value = Math.round(res.data.payload.time / 1000);
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
getSystemTime();
const setSystemTime = () => {
  const dataTime = new Date(timeValue.value).getTime();
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: {
      cmdType: cmdTypes.setTime,
      time: dataTime * 1000,
    },
  };
  baseApi
    .setSystemTime(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        ElMessage({
          message: "Update Time Success",
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
    });
};
</script>
<template>
  <SectionTitleLineWithButton :icon="mdiWrenchClock" title="System Time">
  </SectionTitleLineWithButton>
  <div class="flex justify-center gap-3">
    <el-badge is-dot>
      <el-button :icon="Timer" round disabled />
    </el-badge>
    <el-date-picker
      v-model="timeValue"
      type="datetime"
      placeholder="System time"
      :shortcuts="shortcuts"
    />
    <el-button type="success" @click="setSystemTime" round plain
      >Submit</el-button
    >
  </div>
</template>
