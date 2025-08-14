import httpService from "./httpService";

const endpoint = "/gardener/payments";

const makingPayment = async (data) => {
  return await httpService.post(`${endpoint}`, data);
};

const paymentService = { makingPayment };

export default paymentService;
