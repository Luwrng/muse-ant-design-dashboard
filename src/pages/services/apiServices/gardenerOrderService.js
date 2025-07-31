import httpService from "./httpService";

const accountEndpoint = "/accounts";
const orderEndpoint = "/orders";

//Get, Update (change sstatus), have order delivery(Create, update status)
const getGardenerOrder = async (
  accountId,
  page,
  size,
  filterField,
  filterValue
) => {
  return await httpService.get(`${accountEndpoint}/${accountId}/orders`, {
    params: { page, size, filterField, filterValue },
  });
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

const updateOrderDeliveryStatus = async (orderId, orderDeliveryId, status) => {
  return await httpService.patch(
    `${orderEndpoint}/${orderId}/order-deliveries/${orderDeliveryId}`,
    {},
    { params: { status } }
  );
};

const gardenerOrderService = {
  getGardenerOrder,
  getGardenerOrderDetail,
  getOrderDeliveries,
  createOrderDelivery,
  updateOrderDeliveryStatus,
};

export default gardenerOrderService;
