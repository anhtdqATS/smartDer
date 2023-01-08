// OpenVPN Api.js
import repository from "@/Base/repository.js";

const resource = "/api/gw";

export default {
  updateFirmwareSmartDer(payload) {
    return repository.post(`${resource}`, payload);
  },
  updateFirmwareMCU(payload) {
    return repository.post(`${resource}`, payload);
  },
};
