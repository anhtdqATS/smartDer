<script setup>
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import { useMainStore } from "@/stores/main.js";

import { mdiWrenchClock } from "@mdi/js";
</script>
<template>
  <SectionTitleLineWithButton :icon="mdiWrenchClock" title="System Time">
  </SectionTitleLineWithButton>
</template>
