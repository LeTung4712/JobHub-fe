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
export const createJob = async (jobData, hasFile = false) => {
  try {
    // Kiểm tra nếu jobData là FormData hoặc cờ hasFile là true
    const isFormData = jobData instanceof FormData || hasFile;

    // Cấu hình header dựa theo loại dữ liệu gửi đi
    const config = isFormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : {};

    const response = await api.post("/jobs", jobData, config);
    return response.data;
  } catch (error) {
    console.error("Lỗi API createJob:", error.response || error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Đã xảy ra lỗi khi tạo công việc mới",
    };
  }
};

// Cập nhật công việc
export const updateJob = async (jobId, jobData) => {
  try {
    // Kiểm tra nếu jobData là FormData (có file CV đính kèm)
    const isFormData = jobData instanceof FormData;

    // Cấu hình header dựa theo loại dữ liệu gửi đi
    const config = isFormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : {};

    const response = await api.put(`/jobs/${jobId}`, jobData, config);
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
export const getMyJobs = async (params) => {
  try {
    const response = await api.get("/jobs/my-jobs", { params });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi lấy danh sách công việc của bạn",
      }
    );
  }
};

// Tải xuống CV của ứng viên
export const downloadCV = async (fileId) => {
  try {
    const response = await api.get(`/jobs/download-cv/${fileId}`, {
      responseType: "blob",
    });

    // Tạo URL cho file đã tải về
    const url = window.URL.createObjectURL(new Blob([response.data]));
    return url;
  } catch (error) {
    console.error("Lỗi khi tải xuống CV:", error);
    throw error.response?.data || { error: "Đã xảy ra lỗi khi tải xuống CV" };
  }
};

// Cập nhật trạng thái công việc
export const updateJobStatus = async (jobId, status) => {
  try {
    const response = await api.patch(`/jobs/${jobId}/status`, { status });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi cập nhật trạng thái công việc",
      }
    );
  }
};
