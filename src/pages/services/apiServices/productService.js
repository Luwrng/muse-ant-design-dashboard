import httpService from "./httpService";

const gardenerEndpoint = "/gardener";
const productEndpoint = "/products";
const productCateEndpoint = "/categories";

//Products
const getGardenerProducts = async (gardenerId, page, size, sortField) => {
  return await httpService.get(`${gardenerEndpoint}/${gardenerId}/products`, {
    params: { page, size, sortField },
  });
};

const getProductDetail = async (productId) => {};

const createProduct = async (gardenerId, data) => {};

const changeProductStatus = async (productId, status) => {};

//Product Price
const getProductPrices = async (productId) => {};

const createProductPrice = async (productId, data) => {};

const setProductCurrentPrice = async (productId, priceId) => {};

//Product Category
const getGardenerProductCategories = async (gardenerId, page, size) => {
  return await httpService.get(
    `${gardenerEndpoint}/${gardenerId}/product-categories`,
    {
      params: { page, size },
    }
  );
};

const createProductCategory = async (gardenerId, data) => {
  return await httpService.post(
    `${gardenerEndpoint}/${gardenerId}/product-categories`,
    data
  );
};

const updateProductCategory = async (categoryId, data) => {
  return await httpService.get(`${productCateEndpoint}/${categoryId}`, data);
};

const deleteProductCategory = async (categoryId) => {
  return await httpService.get(`${productCateEndpoint}/${categoryId}`);
};

const productService = {
  //Product
  getGardenerProducts,

  //Price

  //Category
  getGardenerProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default productService;
