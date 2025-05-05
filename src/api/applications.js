import api from "./index";

// Ứng tuyển vào công việc
export const applyForJob = async (jobId, applicationData) => {
  try {
    const response = await api.post(`/applications/${jobId}`, applicationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Đã xảy ra lỗi khi ứng tuyển" };
  }
};

// Lấy danh sách đơn ứng tuyển của người dùng
export const getMyApplications = async () => {
  try {
    const response = await api.get("/applications/my-applications");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi lấy danh sách đơn ứng tuyển",
      }
    );
  }
};

// Lấy danh sách đơn ứng tuyển cho công việc của người dùng
export const getJobApplications = async () => {
  try {
    const response = await api.get("/applications/job-applications");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi lấy danh sách ứng viên",
      }
    );
  }
};

// Lấy chi tiết đơn ứng tuyển
export const getApplicationDetail = async (applicationId) => {
  try {
    const response = await api.get(`/applications/${applicationId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi lấy chi tiết đơn ứng tuyển",
      }
    );
  }
};

// Cập nhật trạng thái đơn ứng tuyển
export const updateApplicationStatus = async (applicationId, status) => {
  try {
    const response = await api.put(`/applications/${applicationId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { error: "Đã xảy ra lỗi khi cập nhật trạng thái" }
    );
  }
};
