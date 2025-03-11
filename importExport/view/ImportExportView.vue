<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import { mdiSwapVerticalBold, mdiBlenderSoftware } from "@mdi/js";

import eximGateway from "@/module/gatewaychannel/handleGateway/view/exim.vue";
//export config
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiSwapVerticalBold"
        title="Import - Export"
        main
      >
      </SectionTitleLineWithButton>
      <div class="mb-4">
        <eximGateway></eximGateway>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
