import api from "./index";

// Đăng ký
export const register = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Đã xảy ra lỗi khi đăng ký" };
  }
};

// Đăng nhập
export const login = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Đã xảy ra lỗi khi đăng nhập" };
  }
};

// Đăng xuất
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Lấy thông tin người dùng hiện tại
export const getProfile = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi lấy thông tin người dùng",
      }
    );
  }
};

// Cập nhật thông tin người dùng
export const updateProfile = async (userData) => {
  try {
    const response = await api.put("/users/profile", userData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Đã xảy ra lỗi khi cập nhật thông tin" }
    );
  }
};

// Lưu công việc
export const saveJob = async (jobId) => {
  try {
    const response = await api.put(`/users/save-job/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Đã xảy ra lỗi khi lưu công việc" };
  }
};

// Lấy danh sách công việc đã lưu
export const getSavedJobs = async () => {
  try {
    const response = await api.get("/users/saved-jobs");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi lấy danh sách công việc đã lưu",
      }
    );
  }
};
