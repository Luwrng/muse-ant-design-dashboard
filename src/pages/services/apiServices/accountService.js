import httpService from "./httpService";

const endpoint = "/accounts";

const getProfile = async (id) => {
  return await httpService.get(`${endpoint}/${id}`);
};

const accountService = {
  getProfile,
};

export default accountService;

// const getProfile = async (id) => {
//   return await httpService.get(`${endpoint}/${id}`, {
//      params:{input1, input2, ...}
//   });
// };
