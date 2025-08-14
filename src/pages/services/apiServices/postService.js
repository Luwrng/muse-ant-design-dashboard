import httpService from "./httpService";

const gardenerEndpoint = "/gardener";
const postEndpoint = "/posts";

//Get, Create, Update
const getGardenerPosts = async (
  gardenerId,
  page,
  size,
  filterField,
  filterValue,
  search
) => {
  return await httpService.get(`${gardenerEndpoint}/${gardenerId}/posts`, {
    params: { page, size, filterField, filterValue, search },
  });
};

const getPostDetail = async (postId) => {
  return await httpService.get(`${postEndpoint}/${postId}`);
};

const createPost = async (gardenerId, data) => {
  return await httpService.post(
    `${gardenerEndpoint}/${gardenerId}/posts`,
    data
  );
};

const updatePost = async (postId, data) => {
  return await httpService.patch(`${postEndpoint}/${postId}`, data);
};

const changePostStatus = async (postId, status) => {
  return await httpService.patch(
    `${postEndpoint}/${postId}/status`,
    {},
    {
      params: { status },
    }
  );
};

const postService = {
  getGardenerPosts,
  getPostDetail,
  createPost,
  updatePost,
  changePostStatus,
};

export default postService;
