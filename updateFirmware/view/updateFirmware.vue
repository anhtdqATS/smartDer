<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import SmartDerFirmwareVue from "../components/SmartDerFirmware.vue";
import MCUFirmwareVue from "../components/MCUFirmware.vue";

import { mdiUpdate } from "@mdi/js";

const activeName = ref("first");
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiUpdate"
        title="Update Firmware"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox>
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="SmartDER Firmware" name="first"
            ><SmartDerFirmwareVue></SmartDerFirmwareVue
          ></el-tab-pane>
          <el-tab-pane label="MCU Firmware" name="second"
            ><MCUFirmwareVue></MCUFirmwareVue
          ></el-tab-pane>
        </el-tabs>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
