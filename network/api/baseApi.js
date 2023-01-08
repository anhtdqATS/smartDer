// cellular Api.js
import repository from "@/Base/repository.js";

const resource = "/api/gw";

export default {
  getSetting(payload) {
    return repository.post(`${resource}`, payload);
  },
  updateSetting(payload) {
    return repository.post(`${resource}`, payload);
  },
  getStatus(payload) {
    return repository.post(`${resource}`, payload);
  },
};
