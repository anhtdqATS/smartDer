<script setup>
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import { useMainStore } from "@/stores/main.js";

import { mdiServerNetwork } from "@mdi/js";
</script>
<template>
  <SectionTitleLineWithButton :icon="mdiServerNetwork" title="NTP Setting">
  </SectionTitleLineWithButton>
</template>
