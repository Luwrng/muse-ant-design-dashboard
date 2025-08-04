import httpService from "./httpService";

const endpoint = "/chat-message";

const saveChatMessage = async (data) => {
  return await httpService.post(`${endpoint}`, data);
};

const chatService = {
  saveChatMessage,
};

export default chatService;
