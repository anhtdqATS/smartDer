<script setup>
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import { useMainStore } from "@/stores/main.js";

import { mdiBookInformationVariant } from "@mdi/js";

const mainStore = useMainStore();
const updateGatewayInfo = () => {
  mainStore.setGatewayInfo(mainStore.gatewayInfo.name);
};
</script>
<template>
  <SectionTitleLineWithButton
    :icon="mdiBookInformationVariant"
    title="Gateway Info"
  >
  </SectionTitleLineWithButton>
  <div>
    <el-input v-model="mainStore.gatewayInfo.name" placeholder="Please input" />
    <div class="text-right mt-3">
      <el-button type="success" round plain @click="updateGatewayInfo"
        >Submit</el-button
      >
    </div>
  </div>
</template>
