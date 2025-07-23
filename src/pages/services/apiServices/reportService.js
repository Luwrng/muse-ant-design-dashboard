import httpService from "./httpService";

// Gửi report lên API đúng endpoint
const reportGardener = async (payload) => {
    return await httpService.post("reports", payload);
};

const reportService = {
    reportGardener,
};

export default reportService;    