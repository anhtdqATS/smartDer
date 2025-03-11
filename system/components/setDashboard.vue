<script setup>
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import baseApi from "../api/baseApi";
import cmdTypes from "../cmdTypes";
import { GatewayServiceId } from "@/Constants/index.js";
import baseGatewayChannel from "@/Base/composable/gatewayChannel.js";
import { mdiViewDashboardEditOutline } from "@mdi/js";
const { getChannels } = baseGatewayChannel();

const listTypeChannel = ref([]);
const channelReg = ref("");

const getDashboardChannel = async () => {
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: {
      cmdType: cmdTypes.getDashboardChannel,
    },
  };

  try {
    const res = await baseApi.getDashboardChannel(dataLoad);
    if (res.data.error.length > 0) {
      console.log("No set dashboard");
    } else {
      channelReg.value = res.data.payload.objectId;
    }
  } catch (err) {
    ElMessage({
      message: err,
      grouping: true,
      showClose: true,
      type: "error",
    });
  }
};

const initData = async () => {
  await getDashboardChannel();
  listTypeChannel.value = await getChannels();
  console.log(listTypeChannel.value, " listTypeChannel.value");
  listTypeChannel.value.push({
    name: "None",
    objectId: "None",
  });
};
initData();

const setChannelDashboard = () => {
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: {
      cmdType: cmdTypes.setChannelDashboard,
      objectId: channelReg.value,
    },
  };
  baseApi
    .setChannelDashboard(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: res.data.error,
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        ElMessage({
          message: "success",
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
  <SectionTitleLineWithButton
    :icon="mdiViewDashboardEditOutline"
    title="Register Channel Dashboard "
  >
  </SectionTitleLineWithButton>
  <div>
    <el-select v-model="channelReg" class="w-full" placeholder="Select Channel">
      <el-option
        v-for="typeChannel in listTypeChannel"
        :key="typeChannel.objectId"
        :label="typeChannel.name"
        :value="typeChannel.objectId"
      />
    </el-select>
    <div class="text-right mt-3">
      <el-button type="success" round plain @click="setChannelDashboard"
        >Submit</el-button
      >
    </div>
  </div>
</template>
