import httpService from "./httpService";

const endpoint = "/appointments";
const accountEndpoint = "/accounts";

const getAccountAppointments = async (accountId, filterField, filterValue) => {
  return await httpService.get(`${accountEndpoint}/${accountId}/appointments`, {
    params: { filterField, filterValue },
  });
};

const getAccountScheduledAppointments = async (accountId) => {
  return await httpService.get(
    `${accountEndpoint}/${accountId}/appointments/schedules`
  );
};

const getAppointmentDetail = async (appointmentId) => {
  return await httpService.get(`${endpoint}/${appointmentId}`);
};

const updateAppointment = async (appointmentId, data) => {
  return await httpService.patch(`${endpoint}/${appointmentId}`, data);
};

const updateAppointmentStatus = async (appointmentId, status) => {
  return await httpService.patch(`${endpoint}/${appointmentId}/status`, {
    params: { status },
  });
};

const cancelAppointment = async (appointmentId, data) => {
  return await httpService.patch(`${endpoint}/${appointmentId}/cancel`, data);
};

const appointmentService = {
  getAccountAppointments,
  getAccountScheduledAppointments,
  getAppointmentDetail,
  updateAppointment,
  updateAppointmentStatus,
  cancelAppointment,
};

export default appointmentService;
