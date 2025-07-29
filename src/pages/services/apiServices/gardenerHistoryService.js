import httpService from "./httpService";

const gardenerEndpoint = "/gardener";

const getPaymentHistory = async (gardenerId, page, size) => {
  return await httpService.get(`${gardenerEndpoint}/payments-history`, {
    params: { gardenerId, page, size },
  });
};

const getSubscriptionHistory = async (gardenerId) => {
  return await httpService.get(`${gardenerEndpoint}/contracts-history`, {
    params: { gardenerId },
  });
};

const getCurrentSubscription = async (gardenerId) => {
  return await httpService.get(
    `${gardenerEndpoint}/your-current-subscription`,
    {
      params: { gardenerId },
    }
  );
};

const gardenerHistoryService = {
  getPaymentHistory,
  getSubscriptionHistory,
  getCurrentSubscription,
};

export default gardenerHistoryService;
