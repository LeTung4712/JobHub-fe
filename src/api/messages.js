import api from "./index";

// Lấy danh sách cuộc hội thoại
export const getConversations = async () => {
  try {
    const response = await api.get("/messages/conversations");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi lấy danh sách cuộc hội thoại",
      }
    );
  }
};

// Lấy chi tiết cuộc hội thoại
export const getConversation = async (conversationId) => {
  try {
    const response = await api.get(`/messages/conversations/${conversationId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi lấy chi tiết cuộc hội thoại",
      }
    );
  }
};

// Tạo cuộc hội thoại mới
export const createConversation = async (
  receiverId,
  message,
  relatedJobId = null
) => {
  try {
    const response = await api.post("/messages/conversations", {
      receiverId,
      message,
      relatedJobId,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        error: "Đã xảy ra lỗi khi tạo cuộc hội thoại mới",
      }
    );
  }
};

// Gửi tin nhắn
export const sendMessage = async (conversationId, content) => {
  try {
    const response = await api.post(
      `/messages/conversations/${conversationId}`,
      {
        content,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Đã xảy ra lỗi khi gửi tin nhắn" };
  }
};
