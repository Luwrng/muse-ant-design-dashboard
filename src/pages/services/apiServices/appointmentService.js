import httpService from "./httpService";

const endpoint = "/appointments";
const accountEndpoint = "/accounts";

const getAccountAppointments = async (accountId) => {
  return await httpService.get(`${accountEndpoint}/${accountId}/appointments`);
};

const getAppointmentDetail = async (appointmentId) => {
  return await httpService.get(`${endpoint}/${appointmentId}`);
};

const updateAppointment = async (appointmentId, data) => {
  return await httpService.patch(`${endpoint}/${appointmentId}`, data);
};

const appointmentService = {
  getAccountAppointments,
  getAppointmentDetail,
  updateAppointment,
};

export default appointmentService;
