<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import { GatewayServiceId } from "@/Constants/index.js";
import baseApi from "../api/baseApi";
import cmdTypes from "../cmdTypes";
import { mdiLanConnect, mdiEthernet, mdiSwitch } from "@mdi/js";
import { Check, Close } from "@element-plus/icons-vue";

const formNetwork = ref({
  br: {
    ipv4: {
      addresses: [
        {
          address: "",
          prefix: 24,
        },
      ],
      dnss: ["8.8.8.8"],
      gateways: [
        {
          address: "",
          metric: 100,
        },
      ],
      method: "",
    },
  },
  eth0Enabled: false,
  eth0: {
    ipv4: {
      addresses: [
        {
          address: "",
          prefix: 24,
        },
      ],
      dnss: ["8.8.8.8"],
      gateways: [
        {
          address: "",
          metric: 24,
        },
      ],
      method: "manual",
    },
  },
  eth1Enabled: false,
  eth1: {
    ipv4: {
      addresses: [
        {
          address: "",
          prefix: 24,
        },
      ],
      dnss: ["8.8.8.8"],
      gateways: [
        {
          address: "",
          metric: 24,
        },
      ],
      method: "manual",
    },
  },
  mode: "normal",
});

const getSetting = () => {
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: {
      cmdType: cmdTypes.getSetting,
    },
  };
  baseApi
    .getSetting(dataLoad)
    .then((res) => {
      if (res.data.error.length > 0) {
        ElMessage({
          message: "Data not return",
          grouping: true,
          showClose: true,
          type: "warning",
        });
      } else {
        renderFormNetwork(res.data.payload);
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

const renderFormNetwork = (data) => {
  let ipv4Br = data.br.ipv4;
  let ipv4Eth0 = data.eth0.ipv4;
  let ipv4Eth1 = data.eth1.ipv4;

  if (!data.br.ipv4.addresses[0]) {
    ipv4Br.addresses[0] = {
      address: null,
      prefix: null,
    };
  } else {
    ipv4Br.addresses = data.br.ipv4.addresses;
  }

  if (!data.br.ipv4.gateways[0]) {
    ipv4Br.gateways[0] = {
      address: null,
      metric: null,
    };
  } else {
    ipv4Br.gateways[0] = data.br.ipv4.gateways[0];
  }

  if (!data.eth0.ipv4.addresses[0]) {
    ipv4Eth0.addresses[0] = {
      address: null,
      prefix: null,
    };
  } else {
    ipv4Eth0.addresses[0] = data.eth0.ipv4.addresses[0];
  }
  if (!data.eth0.ipv4.gateways[0]) {
    ipv4Eth0.gateways[0] = {
      address: null,
      metric: null,
    };
  } else {
    ipv4Eth0.gateways[0] = data.eth0.ipv4.gateways[0];
  }

  if (!data.eth1.ipv4.addresses[0]) {
    ipv4Eth1.addresses[0] = {
      address: null,
      prefix: null,
    };
  } else {
    ipv4Eth1.addresses[0] = data.eth1.ipv4.addresses[0];
  }
  if (!data.eth1.ipv4.gateways[0]) {
    ipv4Eth1.gateways[0] = {
      address: null,
      metric: null,
    };
  } else {
    ipv4Eth1.gateways[0] = data.eth1.ipv4.gateways[0];
  }
  formNetwork.value.br.ipv4 = ipv4Br;
  formNetwork.value.eth0.ipv4 = ipv4Eth0;
  formNetwork.value.eth1.ipv4 = ipv4Eth1;
  formNetwork.value.eth0Enabled = data.eth0Enabled;
  formNetwork.value.eth1Enabled = data.eth1Enabled;
};
getSetting();

const updateSetting = () => {
  formNetwork.value.cmdType = cmdTypes.updateSetting;
  const dataLoad = {
    receiver: GatewayServiceId,
    payload: formNetwork.value,
  };
  baseApi
    .updateSetting(dataLoad)
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
          message: "Update success!",
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
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiLanConnect" title="Network" main>
        <div>
          <el-radio-group v-model="formNetwork.mode" size="large">
            <el-radio-button label="normal">Normal Mode</el-radio-button>
            <el-radio-button label="bridge">Bridge Mode</el-radio-button>
          </el-radio-group>
        </div>
      </SectionTitleLineWithButton>
      <div
        v-if="formNetwork.mode === 'normal'"
        class="grid gap-3 md:grid-cols-2"
      >
        <CardBox>
          <SectionTitleLineWithButton :icon="mdiEthernet" title="Ethernet-1">
            <el-switch
              v-model="formNetwork.eth0Enabled"
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"
            />
          </SectionTitleLineWithButton>

          <el-form
            label-position="left"
            label-width="150px"
            :model="formLabelAlign"
          >
            <el-form-item label="Method">
              <el-select
                v-model="formNetwork.eth0.ipv4.method"
                placeholder="please select your zone"
                class="w-full"
              >
                <el-option label="Auto" value="auto" />
                <el-option label="Manual" value="manual" />
              </el-select>
            </el-form-item>
            <el-form-item label="Ip address" class="w-full">
              <el-input v-model="formNetwork.eth0.ipv4.addresses[0].address">
                <template #append>
                  <input
                    placeholder="Prefix"
                    class="bg-[#f5f7fa] border-b-[#f5f7fa] border-y-[1px] focus:border-b-[#f5f7fa] focus:outline-none w-12 text-center"
                    v-model="
                      formNetwork.eth0.ipv4.addresses[0].prefix
                    " /></template
              ></el-input>
            </el-form-item>
            <el-form-item label="Gateway">
              <el-input v-model="formNetwork.eth0.ipv4.gateways[0].address">
                <template #append>
                  <input
                    placeholder="Metric"
                    class="bg-[#f5f7fa] border-b-[#f5f7fa] border-y-[1px] focus:border-b-[#f5f7fa] focus:outline-none w-12 text-center"
                    v-model="formNetwork.eth0.ipv4.gateways[0].metric"
                /></template>
              </el-input>
            </el-form-item>
            <el-form-item label="DNS Server">
              <el-input v-model="formNetwork.eth0.ipv4.dnss[0]" />
            </el-form-item>
          </el-form>
        </CardBox>
        <CardBox>
          <SectionTitleLineWithButton :icon="mdiEthernet" title="Ethernet-2">
            <el-switch
              v-model="formNetwork.eth1Enabled"
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"
            />
          </SectionTitleLineWithButton>
          <el-form
            label-position="left"
            label-width="150px"
            :model="formLabelAlign"
          >
            <el-form-item label="Method">
              <el-select
                v-model="formNetwork.eth1.ipv4.method"
                placeholder="please select your zone"
                class="w-full"
              >
                <el-option label="Auto" value="auto" />
                <el-option label="Manual" value="manual" />
              </el-select>
            </el-form-item>
            <el-form-item label="Ip address" class="w-full">
              <el-input v-model="formNetwork.eth1.ipv4.addresses[0].address">
                <template #append>
                  <input
                    placeholder="Prefix"
                    class="bg-[#f5f7fa] border-b-[#f5f7fa] border-y-[1px] focus:border-b-[#f5f7fa] focus:outline-none w-12 text-center"
                    v-model="
                      formNetwork.eth1.ipv4.addresses[0].prefix
                    " /></template
              ></el-input>
            </el-form-item>
            <el-form-item label="Gateway">
              <el-input v-model="formNetwork.eth1.ipv4.gateways[0].address">
                <template #append>
                  <input
                    placeholder="Metric"
                    class="bg-[#f5f7fa] border-b-[#f5f7fa] border-y-[1px] focus:border-b-[#f5f7fa] focus:outline-none w-12 text-center"
                    v-model="formNetwork.eth1.ipv4.gateways[0].metric"
                /></template>
              </el-input>
            </el-form-item>
            <el-form-item label="DNS Server">
              <el-input v-model="formNetwork.eth1.ipv4.dnss[0]" />
            </el-form-item>
          </el-form>
        </CardBox>
      </div>
      <div
        v-if="formNetwork.mode === 'bridge'"
        class="items-center flex justify-center"
      >
        <CardBox class="md:w-[50%] w-full">
          <SectionTitleLineWithButton :icon="mdiSwitch" title="Bridge">
            <el-switch
              v-model="formNetwork.eth0Enabled"
              inline-prompt
              :active-icon="Check"
              :inactive-icon="Close"
            />
          </SectionTitleLineWithButton>

          <el-form
            label-position="left"
            label-width="150px"
            :model="formLabelAlign"
          >
            <el-form-item label="Method">
              <el-select
                v-model="formNetwork.br.ipv4.method"
                placeholder="please select your method"
                class="w-full"
              >
                <el-option label="Auto" value="auto" />
                <el-option label="Manual" value="manual" />
              </el-select>
            </el-form-item>
            <el-form-item label="Ip address" class="w-full">
              <el-input v-model="formNetwork.br.ipv4.addresses[0].address">
                <template #append>
                  <input
                    placeholder="Prefix"
                    class="bg-[#f5f7fa] border-b-[#f5f7fa] border-y-[1px] focus:border-b-[#f5f7fa] focus:outline-none w-12 text-center"
                    v-model="
                      formNetwork.br.ipv4.addresses[0].prefix
                    " /></template
              ></el-input>
            </el-form-item>
            <el-form-item label="Gateway">
              <el-input v-model="formNetwork.br.ipv4.gateways[0].address">
                <template #append>
                  <input
                    placeholder="Metric"
                    class="bg-[#f5f7fa] border-b-[#f5f7fa] border-y-[1px] focus:border-b-[#f5f7fa] focus:outline-none w-12 text-center"
                    v-model="formNetwork.br.ipv4.gateways[0].metric"
                /></template>
              </el-input>
            </el-form-item>
            <el-form-item label="DNS Server">
              <el-input v-model="formNetwork.br.ipv4.dnss[0]" />
            </el-form-item>
          </el-form>
        </CardBox>
      </div>
      <div class="items-center mt-5 flex justify-center">
        <el-button type="success" size="large" round @click="updateSetting"
          >Success</el-button
        >
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
