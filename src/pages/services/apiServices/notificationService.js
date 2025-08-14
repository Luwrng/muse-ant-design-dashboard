import httpService from "./httpService";

const accountEndpoint = "/accounts";
const notiEndpoint = "/notifications";

//Get, update status
const getAccountNotification = async (accountId) => {
  return await httpService.get(`${accountEndpoint}/${accountId}/notifications`);
};

const sendNotification = async (data) => {
  return await httpService.post(`${notiEndpoint}`, data);
};

const updaNotificationStatus = async (notiId) => {
  return await httpService.patch(`${notiEndpoint}/${notiId}`);
};

const notificationService = {
  getAccountNotification,
  sendNotification,
  updaNotificationStatus,
};

export default notificationService;
