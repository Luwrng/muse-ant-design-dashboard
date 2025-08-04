import httpService from "./httpService";

const endpoint = "/accounts";

const getProfile = async (id) => {
  return await httpService.get(`${endpoint}/${id}`);
};

const updateProfile = async (id, data) => {
  return await httpService.patch(`${endpoint}/${id}/profile`, data);
};

const changeOrResetPassword = async (data) => {
  return await httpService.patch(`${endpoint}/password`, data);
};

const accountService = {
  getProfile,
  updateProfile,
  changeOrResetPassword,
};

export default accountService;
