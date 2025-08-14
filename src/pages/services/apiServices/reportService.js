import httpService from "./httpService";

// Gửi report lên API đúng endpoint
const reportGardener = async (payload) => {
  return await httpService.post("reports", payload);
};

const createUserReport = async (data) => {
  return await httpService.post("/user-reports", data);
};

const reportService = {
  reportGardener,
  createUserReport,
};

export default reportService;
