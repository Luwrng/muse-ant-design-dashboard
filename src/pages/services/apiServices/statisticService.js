import httpService from "./httpService";

const gardenerEndpoint = "/gardener";

const getGeneralDashboardInfo = async (id) => {
  return await httpService.get(`${gardenerEndpoint}/${id}/statistic/general`);
};

const getYearOrderStatistic = async (id) => {
  return await httpService.get(
    `${gardenerEndpoint}/${id}/statistic/year-orders`
  );
};

const getUpcommingAppointment = async (id) => {
  return await httpService.get(
    `${gardenerEndpoint}/${id}/statistic/upcomming-appointment`
  );
};

const statisticService = {
  getGeneralDashboardInfo,
  getYearOrderStatistic,
  getUpcommingAppointment,
};

export default statisticService;
