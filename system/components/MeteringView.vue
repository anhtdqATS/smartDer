<script setup>
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import baseApi from "../api/baseApi";
import cmdTypes from "../cmdTypes";
import { GatewayServiceId } from "@/Constants/index.js";

import { mdiAxisArrow } from "@mdi/js";
const labelPosition = ref("left");

const formMetering = ref({
  ctnratio: 1,
  ctratio: 1,
  ptratio: 1,
});

const getSetting = () => {
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: {
      cmdType: cmdTypes.getSettingMetering,
    },
  };
  baseApi
    .getMetering(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        formMetering.value = res.data.payload;
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
getSetting();

const updateMetering = () => {
  formMetering.cmdType = cmdTypes.updateSettingMetering;
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: formMetering,
  };
  baseApi
    .updateMetering(dataLoad)
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
          message: "Update Success",
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
  <SectionTitleLineWithButton :icon="mdiAxisArrow" title="Metering Setting">
  </SectionTitleLineWithButton>
  <div class="flex justify-center">
    <div class="lg:w-[50%] w-full">
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formMetering"
      >
        <el-form-item label="CTN Ration">
          <el-input v-model.number="formMetering.ctnratio" />
        </el-form-item>
        <el-form-item label="CT Ratio">
          <el-input v-model.number="formMetering.ctratio" />
        </el-form-item>
        <el-form-item label="PT Ratio">
          <el-input v-model.number="formMetering.ptratio" />
        </el-form-item>
      </el-form>
      <div class="text-right mt-3">
        <el-button type="success" round plain @click="updateMetering"
          >Submit</el-button
        >
      </div>
    </div>
  </div>
</template>
