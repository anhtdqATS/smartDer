// OpenVPN Api.js
import repository from "@/Base/repository.js";

const resourceImport = "/api/smartder/importconfig";
const resourceExport = "/api/smartder/exportconfig";

export default {
  importConfig(payload) {
    return repository.post(`${resourceImport}`, payload);
  },
  exportConfig() {
    return repository.get(`${resourceExport}`);
  },
};
