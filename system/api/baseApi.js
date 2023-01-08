// OpenVPN Api.js
import repository from "@/Base/repository.js";
const resource = "/api/gw";

const resourceSystem = "api/smartder/systemtime";
const resourceNTP = "api/smartder/ntp";
export default {
  getSystemTime() {
    return repository.get(`${resourceSystem}`);
  },
  setSystemTime(payload) {
    return repository.post(`${resourceSystem}`, payload);
  },
  getNTPSetting() {
    return repository.get(`${resourceNTP}`);
  },
  setNTPSetting(payload) {
    return repository.post(`${resourceNTP}`, payload);
  },
  getMetering(payload) {
    return repository.post(`${resource}`, payload);
  },
  updateMetering(payload) {
    return repository.post(`${resource}`, payload);
  },
};
