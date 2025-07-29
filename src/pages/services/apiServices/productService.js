import httpService from "./httpService";

const gardenerEndpoint = "/gardener";
const productEndpoint = "/products";
const productCateEndpoint = "/categories";

//Products
const getGardenerProducts = async (
  gardenerId,
  page,
  size,
  filterField,
  filterValue,
  search
) => {
  return await httpService.get(`${gardenerEndpoint}/${gardenerId}/products`, {
    params: { page, size, filterField, filterValue, search },
  });
};

const getAllGardenerProducts = async (gardenerId, getAll) => {
  return await httpService.get(`${gardenerEndpoint}/${gardenerId}/products`, {
    params: { getAll },
  });
};

const getProductDetail = async (productId) => {
  return await httpService.get(`${gardenerEndpoint}/${productId}`);
};

const createProduct = async (gardenerId, data) => {
  return await httpService.post(
    `${gardenerEndpoint}/${gardenerId}/products`,
    data
  );
};

const changeProductStatus = async (productId, status) => {
  return await httpService.patch(
    `${productEndpoint}/${productId}/status`,
    {},
    {
      params: { status },
    }
  );
};

//Reviews
const getProductReview = async (productId) => {
  return await httpService.get(`${productEndpoint}/${productId}/reviews`);
};

//Product Price
const getProductPrices = async (productId) => {
  return await httpService.get(`${productEndpoint}/${productId}/prices`);
};

const createProductPrice = async (productId, data) => {
  return await httpService.post(`${productEndpoint}/${productId}/prices`, data);
};

const setProductCurrentPrice = async (productId, priceId) => {
  return await httpService.patch(
    `${productEndpoint}/${productId}/prices/${priceId}`
  );
};

//Product Category
const getProductCategories = async (page, size, fetchAll) => {
  return await httpService.get(`${productCateEndpoint}`, {
    params: { page, size, fetchAll },
  });
};

const getGardenerProductCategoriesList = async (gardenerId) => {
  return await httpService.get(
    `${gardenerEndpoint}/${gardenerId}/product-categories`
  );
};

const createProductCategory = async (gardenerId, data) => {
  return await httpService.post(
    `${gardenerEndpoint}/${gardenerId}/product-categories`,
    data
  );
};

const updateProductCategory = async (categoryId, data) => {
  return await httpService.patch(`${productCateEndpoint}/${categoryId}`, data);
};

const deleteProductCategory = async (categoryId) => {
  return await httpService.delete(`${productCateEndpoint}/${categoryId}`);
};

const productService = {
  //Product
  getGardenerProducts,
  getAllGardenerProducts,
  changeProductStatus,
  createProduct,

  //Reviews
  getProductReview,

  //Price
  getProductPrices,
  createProductPrice,
  setProductCurrentPrice,

  //Category
  getProductCategories,
  getGardenerProductCategoriesList,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default productService;
