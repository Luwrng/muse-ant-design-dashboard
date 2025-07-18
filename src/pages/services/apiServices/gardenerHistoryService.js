import httpService from "./httpService";

const gardenerEndpoint = "/gardener";

const getPaymentHistory = async(gardenerId) => {
    return await httpService.get(`${gardenerEndpoint}/payments-history`, {
        params: {gardenerId}
    });
}

const getSubscriptionHistory = async (gardenerId) => {
    return await httpService.get(`${gardenerEndpoint}/contracts-history`, {
        params: {gardenerId}
    });
}

const gardenerHistoryService = {
    getPaymentHistory,
    getSubscriptionHistory
};

export default gardenerHistoryService;