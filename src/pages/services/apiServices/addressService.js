import httpService from "./httpService";

const accountEndpoint = "/accounts";
const addressEndpoint = "/addresses";

const createAddress = async (accountId, data) => {
  return await httpService.post(
    `${accountEndpoint}/${accountId}/addresses`,
    data
  );
};

const updateAddress = async (addressId, data) => {
  return await httpService.patch(`${addressEndpoint}/${addressId}`, data);
};

const deleteAddress = async (addressId) => {
  return await httpService.delete(`${addressEndpoint}/${addressId}`);
};

const addressService = {
  createAddress,
  updateAddress,
  deleteAddress,
};

export default addressService;
