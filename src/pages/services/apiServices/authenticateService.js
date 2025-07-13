import httpService from "./httpService";

// const endpoint = "";

const login = async (credential) => {
  return await httpService.post("/login", credential);
};

const register = () => httpService.post();

const gardenerRegister = () => httpService.post();

const authenticateService = {
  login,
  register,
  gardenerRegister,
};

export default authenticateService;
