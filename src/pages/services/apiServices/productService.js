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

const getProductDetail = async (productId) => {
  return await httpService.get(`${gardenerEndpoint}/${productId}`)
};

const createProduct = async (gardenerId, data) => {};

const changeProductStatus = async (productId, status) => {
  return await httpService.patch(`${productEndpoint}/${productId}`, {params: {status}});
};

//Reviews
const getProductReview = async (productId) => {
  return await httpService.get(`${productEndpoint}/${productId}/reviews`);
}

//Product Price
const getProductPrices = async (productId) => {
    return await httpService.get(`${productEndpoint}/${productId}/prices`);
};

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
  return await httpService.patch(`${productCateEndpoint}/${categoryId}`, data);
};

const deleteProductCategory = async (categoryId) => {
  return await httpService.delete(`${productCateEndpoint}/${categoryId}`);
};

const productService = {
  //Product
  getGardenerProducts,
  changeProductStatus,

  //Reviews
  getProductReview,

  //Price
  getProductPrices,

  //Category
  getGardenerProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default productService;
