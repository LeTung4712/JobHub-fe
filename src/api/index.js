import axios from "axios";

// Tạo instance axios với cấu hình chung
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Sử dụng biến môi trường
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để thêm token vào header mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi chung
    if (error.response) {
      // Lỗi từ server (401, 404, 500, ...)
      if (error.response.status === 401) {
        // Token hết hạn hoặc không hợp lệ
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
