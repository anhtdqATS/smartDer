// OpenVPN Api.js
import repository from "@/Base/repository.js";
const resource = "/api/gw";

export default {
  getSystemTime(payload) {
    return repository.post(`${resource}`, payload);
  },
  setSystemTime(payload) {
    return repository.post(`${resource}`, payload);
  },
  getNTPSetting(payload) {
    return repository.post(`${resource}`, payload);
  },
  setNTPSetting(payload) {
    return repository.post(`${resource}`, payload);
  },
  getMetering(payload) {
    return repository.post(`${resource}`, payload);
  },
  updateMetering(payload) {
    return repository.post(`${resource}`, payload);
  },
  setChannelDashboard(payload) {
    return repository.post(`${resource}`, payload);
  },
  getChannelList(payload) {
    return repository.post(`${resource}`, payload);
  },
  getDashboardChannel(payload) {
    return repository.post(`${resource}`, payload);
  },
};
