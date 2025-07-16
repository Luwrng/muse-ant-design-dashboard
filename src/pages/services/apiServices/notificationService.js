import httpService from "./httpService";

const accountEndpoint = "/accounts";
const notiEndpoint = "/notifications";

//Get, update status
const getAccountNotification = async (accountId) => {
  return await httpService.get(`${accountEndpoint}/${accountId}/notifications`);
};

const updaNotificationStatus = async (notiId) => {
  return await httpService.patch(`${notiEndpoint}/${notiId}`);
};

const notificationService = {
  getAccountNotification,
  updaNotificationStatus,
};

export default notificationService;
