import httpService from "./httpService";

const endpoint = "/appointments";
const accountEndpoint = "/accounts";

const getAccountAppointments = async (accountId, filterField, filterValue) => {
  return await httpService.get(
    `${accountEndpoint}/${accountId}/appointments`,
    {},
    {
      params: { filterField, filterValue },
    }
  );
};

const getAccountRequestedAppointments = async (accountId, page, size) => {
  return await httpService.get(
    `${accountEndpoint}/${accountId}/appointments/requested`,
    {
      params: { page, size },
    }
  );
};

const getAccountScheduledAppointments = async (accountId) => {
  return await httpService.get(
    `${accountEndpoint}/${accountId}/appointments/scheduled`
  );
};

const getAppointmentDetail = async (appointmentId) => {
  return await httpService.get(`${endpoint}/${appointmentId}`);
};

const updateAppointment = async (appointmentId, data) => {
  return await httpService.patch(`${endpoint}/${appointmentId}`, data);
};

const updateAppointmentStatus = async (appointmentId, status) => {
  return await httpService.patch(
    `${endpoint}/${appointmentId}/status`,
    {},
    {
      params: { status },
    }
  );
};

const cancelOrRejectAppointment = async (appointmentId, data, status) => {
  return await httpService.patch(
    `${endpoint}/${appointmentId}/cancel-or-reject`,
    data,
    {
      params: { status },
    }
  );
};

const appointmentService = {
  getAccountAppointments,
  getAccountRequestedAppointments,
  getAccountScheduledAppointments,
  getAppointmentDetail,
  updateAppointment,
  updateAppointmentStatus,
  cancelOrRejectAppointment,
};

export default appointmentService;
