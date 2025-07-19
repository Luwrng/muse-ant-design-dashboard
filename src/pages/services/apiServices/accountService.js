import httpService from "./httpService";

const endpoint = "/accounts";

const getProfile = async (id) => {
  return await httpService.get(`${endpoint}/${id}`);
};

const updateProfile = async (id, data) => {
  return await httpService.patch(`${endpoint}/${id}/profile`, data);
};

const accountService = {
  getProfile,
  updateProfile,
};

export default accountService;

// const getProfile = async (id) => {
//   return await httpService.get(`${endpoint}/${id}`, {
//      params:{input1, input2, ...}
//   });
// };
