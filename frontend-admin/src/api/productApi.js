// ===============================================
// FILE: src/api/productApi.js
// ===============================================
import api from "./axiosConfig";

const BASE_PATH = "http://localhost:5001/api/superadmin";

export const productApi = {
  /**
   * Lấy tất cả sản phẩm
   * GET /admin/product_management/products
   * Backend response: Array of { category, description, image, name, product_id, rating, unit_price }
   */
  getAllProducts: async () => {
    try {
      console.log(" [productApi] Fetching all products...");

      const response = await api.get(`${BASE_PATH}/products`);

      console.log(" [productApi] Raw backend response:", response.data);

      let productsArray = [];

      // Xử lý response format
      if (Array.isArray(response.data)) {
        productsArray = response.data;
      } else if (response.data.success && Array.isArray(response.data.data)) {
        productsArray = response.data.data;
      } else {
        console.warn(" [productApi] Unexpected response format");
        return [];
      }

      //  Map đúng field name từ backend
      const mappedProducts = productsArray.map((p) => ({
        // Primary keys
        product_id: p.product_id,
        name: p.name,

        category_id: p.category_id,

        unit_price: p.unit_price,

        image_url: p.image_url,

        description: p.description || "",
        rating: p.rating || 0,
        updated_at: p.updated_at || null,

        // Aliases for backward compatibility
        id: p.product_id,
        categoryId: p.category,
        price: p.unit_price,
        image: p.image,
      }));

      console.log(" [productApi] Mapped products:", mappedProducts);
      return mappedProducts;
    } catch (error) {
      console.error(" [productApi] Error fetching products:", error);
      throw new Error(
        error.response?.data?.message || "Không thể tải danh sách sản phẩm"
      );
    }
  },

  /**
   * Thêm sản phẩm mới
   * POST /admin/product_management/add_products
   */
  addProduct: async (productData) => {
    try {
      console.log("[productApi] Adding product:", productData);

      const payload = {
        name: productData.name,
        description: productData.description || "",
        image_url: productData.image_url || "",
        unit_price: parseFloat(productData.unit_price) || 0,
        category_id: parseInt(productData.category_id),
      };

      console.log(" [productApi] Sending payload:", payload);

      const response = await api.post(`${BASE_PATH}/add_products`, payload);

      console.log(" [productApi] Add response:", response.data);

      return {
        success: response.data.success !== false,
        message: response.data.message || "Thêm sản phẩm thành công",
        id: response.data.id || response.data.product_id,
      };
    } catch (error) {
      console.error(" [productApi] Error adding product:", error);

      if (error.response?.status === 403) {
        return {
          success: false,
          message: " Bạn không có quyền thêm sản phẩm",
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || "Lỗi khi thêm sản phẩm",
      };
    }
  },

  /**
   * Cập nhật sản phẩm
   * PUT /admin/product_management/update_products/:id
   */
  updateProduct: async (productId, productData) => {
    try {
      console.log(" [productApi] Updating product:", productId);

      const payload = {
        name: productData.name,
        description: productData.description || "",
        image_url: productData.image_url || "",
        unit_price: parseFloat(productData.unit_price),
        category_id: parseInt(productData.category_id),
      };

      console.log(" [productApi] Update payload:", payload);

      const response = await api.put(
        `${BASE_PATH}/update_products/${productId}`,
        payload
      );

      console.log(" [productApi] Update response:", response.data);

      return {
        success: response.data.success !== false,
        message: response.data.message || "Cập nhật sản phẩm thành công",
      };
    } catch (error) {
      console.error(" [productApi] Error updating product:", error);

      if (error.response?.status === 403) {
        return {
          success: false,
          message: " Bạn không có quyền cập nhật sản phẩm",
        };
      }

      if (error.response?.status === 404) {
        return {
          success: false,
          message: " Không tìm thấy sản phẩm",
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || "Lỗi khi cập nhật sản phẩm",
      };
    }
  },

  /**
   * Xóa sản phẩm
   * DELETE /admin/product_management/delete_products/:id
   */
  deleteProduct: async (productId) => {
    try {
      console.log(" [productApi] Deleting product:", productId);

      const response = await api.delete(
        `${BASE_PATH}/delete_products/${productId}`
      );

      console.log(" [productApi] Delete response:", response.data);

      return {
        success: response.data.success !== false,
        message: response.data.message || "Xóa sản phẩm thành công",
      };
    } catch (error) {
      console.error(" [productApi] Error deleting product:", error);

      if (error.response?.status === 404) {
        return {
          success: false,
          message: " Không tìm thấy sản phẩm",
        };
      }

      if (error.response?.status === 403) {
        return {
          success: false,
          message: " Bạn không có quyền xóa sản phẩm",
        };
      }

      return {
        success: false,
        message: error.response?.data?.message || "Lỗi khi xóa sản phẩm",
      };
    }
  },
};

export default productApi;
