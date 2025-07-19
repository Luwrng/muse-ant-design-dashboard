import httpService from "./httpService";

const endpoint = "/admin/service-packages";

const getAvailableServicePackage = async (filterField, filterValue) => {
  return await httpService.get(
    `${endpoint}`,
    {},
    {
      params: { filterField, filterValue },
    }
  );
};

const servicePackageService = {
  getAvailableServicePackage,
};

export default servicePackageService;
