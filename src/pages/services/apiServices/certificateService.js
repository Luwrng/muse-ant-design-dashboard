import httpService from "./httpService";

const gardenerEndpoint = "/gardener";
const certificateEndpoint = "/certificates";

const createCertificate = async (gardenerId, data) => {
  return await httpService.post(
    `${gardenerEndpoint}/${gardenerId}/certificates`,
    data
  );
};

const updateCertificate = async (certificateId, data) => {
  return await httpService.patch(
    `${certificateEndpoint}/${certificateId}`,
    data
  );
};

const deleteCertificate = async (certificateId) => {
  return await httpService.delete(`${certificateEndpoint}/${certificateId}`);
};

const certificateService = {
  createCertificate,
  updateCertificate,
  deleteCertificate,
};

export default certificateService;
