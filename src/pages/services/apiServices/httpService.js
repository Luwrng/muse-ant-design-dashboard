import api from "./api";

const get = async (url, config = {}) => {
  const response = await api.get(url, config);
  return response.data;
};

const post = async (url, data, config = {}) => {
  const response = await api.post(url, data, config);
  return response.data;
};

const put = async (url, data, config = {}) => {
  const response = await api.put(url, data, config);
  return response.data;
};

const patch = async (url, data, config = {}) => {
  const response = await api.patch(url, data, config);
  return response.data;
};

const del = async (url, config = {}) => {
  const response = await api.delete(url, config);
  return response.data;
};

const httpService = {
  get,
  post,
  put,
  patch,
  delete: del,
};

export default httpService;
