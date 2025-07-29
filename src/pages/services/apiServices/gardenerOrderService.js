import httpService from "./httpService";

const accountEndpoint = "/accounts";
const orderEndpoint = "/orders";

//Get, Update (change sstatus), have order delivery(Create, update status)
const getGardenerOrder = async (accountId, page, size) => {
  return await httpService.get(`${accountEndpoint}/${accountId}/orders`);
};

const getGardenerOrderDetail = async (accountId, orderId) => {
  return await httpService.get(
    `${accountEndpoint}/${accountId}/orders/${orderId}`
  );
};

const updateGardenerOrderStatus = async () => {};

const getOrderDeliveries = async (orderId) => {
  return await httpService.get(`${orderEndpoint}/${orderId}/order-deliveries`);
};

const createOrderDelivery = async (orderId, data) => {
  return await httpService.post(
    `${orderEndpoint}/${orderId}/order-deliveries`,
    data
  );
};

const updateOrderDeliveryStatus = async () => {};

const gardenerOrderService = {
  getGardenerOrder,
  getGardenerOrderDetail,
  getOrderDeliveries,
  createOrderDelivery,
};

export default gardenerOrderService;
