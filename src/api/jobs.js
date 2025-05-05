import api from "./index";

// Lấy danh sách công việc (có filter)
export const getJobs = async (params) => {
  try {
    const response = await api.get("/jobs", { params });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi lấy danh sách công việc",
      }
    );
  }
};

// Lấy chi tiết công việc theo ID
export const getJob = async (jobId) => {
  try {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi lấy thông tin công việc",
      }
    );
  }
};

// Tạo công việc mới
export const createJob = async (jobData) => {
  try {
    const response = await api.post("/jobs", jobData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Đã xảy ra lỗi khi tạo công việc mới" }
    );
  }
};

// Cập nhật công việc
export const updateJob = async (jobId, jobData) => {
  try {
    const response = await api.put(`/jobs/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Đã xảy ra lỗi khi cập nhật công việc" }
    );
  }
};

// Xóa công việc
export const deleteJob = async (jobId) => {
  try {
    const response = await api.delete(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Đã xảy ra lỗi khi xóa công việc" };
  }
};

// Lấy danh sách công việc của người dùng hiện tại
export const getMyJobs = async () => {
  try {
    const response = await api.get("/jobs/my-jobs");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi lấy danh sách công việc của bạn",
      }
    );
  }
};
