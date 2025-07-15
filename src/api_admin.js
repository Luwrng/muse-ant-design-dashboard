import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_ADMIN_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const cleanfood = {
  /* ================================
      RETAILER API
    * ================================ */
  retailer: {
    getAll: async (page = 1, size = 10) => {
      try {
        const response = await api.get("/api/v1/accounts/retailers", {
          params: { page, size, sortOrder: "asc" },
        });
        return response.data;
      } catch (error) {
        console.error("Lỗi getAllRetailers:", error);
        throw error;
      }
    },
  },

  /* ================================
    GARDENER API
    * ================================ */
  gardener: {
    getAll: async (page = 1, size = 10) => {
      try {
        const response = await api.get("/api/v1/accounts/gardeners", {
          params: { page, size, sortOrder: "asc" },
        });
        return response.data;
      } catch (error) {
        console.error("Lỗi getAllGardeners:", error);
        throw error;
      }
    },
    getAccountById: async (accountId) => {
      try {
        const response = await api.get(`/api/v1/accounts/${accountId}`);
        return response.data;
      } catch (error) {
        console.error("Lỗi getAccountById:", error);
        throw error;
      }
    },
  },

  /* ================================
  ADMIN API
  * ================================ */
  admin: {
    getAllUsers: async () => {
      try {
        const response = await api.get("/api/v1/accounts");
        return response.data;
      } catch (error) {
        console.error("Lỗi getAllUsers:", error);
        throw error;
      }
    },
    getAddressesByAccount: async (id) => {
      try {
        const response = await api.get(`/api/v1/accounts/${id}/addresses`);
        return response.data;
      } catch (error) {
        console.error("Lỗi getAddressesByAccount:", error);
        throw error;
      }
    },
    getServiceFeatures: async ({ page = 1, size = 10, search = "" }) => {
      try {
        const response = await api.get("/api/v1/admin/service-features", {
          params: {
            page,
            size,
            search,
            sortOrder: "asc", // nếu cần
          },
        });
        return response.data;
      } catch (error) {
        console.error("Lỗi getServiceFeatures:", error);
        throw error;
      }
    },

    getPackage: async ({ page = 1, size = 10, search = "" } = {}) => {
      try {
        const response = await api.get("/api/v1/admin/service-packages", {
          params: {
            page,
            size,
            search,
            sortOrder: "asc",
          },
        });
        return response.data;
      } catch (error) {
        console.error("Lỗi getPackage:", error);
        throw error;
      }
    },

    createPackage: async (data) => {
      try {
        const response = await api.post("/api/v1/admin/service-packages", data);
        return response.data;
      } catch (error) {
        console.error(
          "Lỗi createPackage:",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    createServiceFeature: async (data) => {
      try {
        const response = await api.post("/api/v1/admin/service-features", data);
        return response.data;
      } catch (error) {
        console.error("Lỗi createServiceFeature:", error);
        throw error;
      }
    },

    updateServiceFeature: async (id, data) => {
      try {
        const response = await api.patch(`/api/v1/admin/service-features/${id}`, data);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error("Server trả về lỗi:", error.response.status);
          console.error("Chi tiết lỗi:", error.response.data);
        } else if (error.request) {
          console.error("Không nhận được phản hồi từ server:", error.request);
        } else {
          console.error("Lỗi không xác định:", error.message);
        }
        throw error;
      }
    },


    // Soft delete service feature: chuyển status sang INACTIVE sau khi kiểm tra usage
    disableServiceFeature: async (id) => {
      try {
        const response = await api.patch(`/api/v1/admin/service-features/disable/${id}`);
        return response.data;
      } catch (error) {
        console.error("Lỗi disableServiceFeature:", error);
        throw error;
      }
    },

    updateServicePackage: async (data) => {
      try {
        const response = await api.patch(`/api/v1/admin/service-packages/detail`, data);
        return response.data;
      } catch (error) {
        console.error("Lỗi khi cập nhật gói dịch vụ:", error);
        throw error;
      }
    },

    disableServicePackage: async (payload) => {
      try {
        const response = await api.patch(`/api/v1/admin/service-packages/disable`, payload);
        return response.data;
      } catch (error) {
        console.error("❌ Lỗi khi vô hiệu hóa gói dịch vụ:", error.response?.data || error);
        throw error;
      }
    },


    activateServicePackage: async (record) => {
      try {
        const payload = {
          servicePackageId: record.servicePackageId || record.key,
        };
        const response = await api.patch(`/api/v1/admin/service-packages/activate`, payload);
        return response.data;
      } catch (error) {
        console.error("❌ Lỗi khi kích hoạt gói dịch vụ:", error);
        throw error;
      }
    },
    getContract: async ({ page = 1, size = 10, search = "", sortField = "", sortOrder = "asc" } = {}) => {
      try {
        const response = await api.get("/api/v1/admin/subscription-contracts", {
          params: {
            page,
            size,
            search,
            sortField,
            sortOrder,
          },
        });
        return response.data;
      } catch (error) {
        console.error("❌ Lỗi getContract:", error.response?.data || error.message);
        throw error;
      }
    },

    getServicePackageOrders: async ({ page = 1, size = 10, search = "" } = {}) => {
      try {
        const response = await api.get("/api/v1/admin/service-package-orders", {
          params: {
            page,
            size,
            sortOrder: "asc",
            search,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Lỗi getServicePackageOrders:", error.response?.data || error);
        throw error;
      }
    },
    getReports: async ({ page = 1, size = 10, search = "" } = {}) => {
      try {
        const response = await api.get("/api/v1/reports", {
          params: {
            page,
            size,
            search,
            sortOrder: "asc",
          },
        });
        return response.data;
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách báo cáo:", error);
        throw error;
      }
    },






  },
};
export default api;
