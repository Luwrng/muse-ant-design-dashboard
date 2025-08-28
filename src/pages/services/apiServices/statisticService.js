import httpService from "./httpService";

const gardenerEndpoint = "/gardener";

const getGeneralDashboardInfo = async (id) => {
  return await httpService.get(`${gardenerEndpoint}/${id}/statistic/general`);
};

const getYearOrderStatistic = async (id, year) => {
  return await httpService.get(
    `${gardenerEndpoint}/${id}/statistic/year-orders`,
    {
      params: { year },
    }
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
