import httpService from "./httpService";

// const endpoint = "";

const login = async (credential) => {
  return await httpService.post("/login", credential);
};

const getUserInfo = async () => {
  const accountId = localStorage.getItem("account_id");
  if (!accountId) {
    throw new Error("Không tìm thấy account_id");
  }
  return await httpService.get(`/accounts/${accountId}`);
};

const register = () => httpService.post();

const gardenerRegister = () => httpService.post();

const authenticateService = {
  login,
  getUserInfo,
  register,
  gardenerRegister,
};

export default authenticateService;
