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

const updateOrderStatus = async (orderId, status) => {
  return await httpService.patch(
    `${orderEndpoint}/${orderId}`,
    {},
    { params: { status } }
  );
};

const updateGardenerOrderStatus = async (orderId, status) => {
  return await httpService.patch(
    `${orderEndpoint}/${orderId}/order-details`,
    {},
    { params: { status } }
  );
};

const approveOrder = async (orderId, shippingCost) => {
  return await httpService.patch(
    `${orderEndpoint}/${orderId}/shipping-cost`,
    {},
    { params: { shippingCost } }
  );
};

const rejectOrder = async (orderId, data) => {
  return await httpService.patch(
    `${orderEndpoint}/${orderId}/order-reject`,
    data
  );
};

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
  updateOrderStatus,
  updateGardenerOrderStatus,

  approveOrder,
  rejectOrder,

  getOrderDeliveries,
  createOrderDelivery,
  updateOrderDeliveryStatus,
};

export default gardenerOrderService;
