<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import GatewayInfoView from "../components/GatewayInfoView.vue";
import SystemTime from "../components/SystemTimeView.vue";
import NTPSetting from "../components/NTPSettingView.vue";
import Metering from "../components/MeteringView.vue";
import setDashboard from "../components/setDashboard.vue";
import { mdiLinkVariantPlus } from "@mdi/js";

const activeName = ref("first");
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiLinkVariantPlus"
        title="System Config"
        main
      >
      </SectionTitleLineWithButton>
      <CardBox>
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="Info" name="first"
            ><GatewayInfoView></GatewayInfoView
          ></el-tab-pane>
          <el-tab-pane label="System Time" name="second"
            ><SystemTime></SystemTime
          ></el-tab-pane>
          <el-tab-pane label="NTP" name="third"
            ><NTPSetting></NTPSetting
          ></el-tab-pane>
          <el-tab-pane label="Metering" name="fourth"
            ><Metering></Metering
          ></el-tab-pane>
          <el-tab-pane label="Gateway Channel" name="five"
            ><setDashboard></setDashboard
          ></el-tab-pane>
        </el-tabs>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
