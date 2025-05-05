import React, { createContext, useState, useEffect, useContext } from "react";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import theme from "./theme/index";
import { getProfile } from "./api/auth"; // Import API để lấy thông tin người dùng

// Tạo AuthContext
export const AuthContext = createContext();

// Custom hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm lấy thông tin người dùng từ API
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const result = await getProfile();
      if (result.success && result.data) {
        // Thiết lập thông tin người dùng từ API
        const userData = {
          ...result.data,
          isAuthenticated: true,
          name: result.data.fullName, // Thêm trường name để tương thích với code cũ
        };
        setUser(userData);
      } else {
        // Nếu API không trả về dữ liệu hợp lệ, đăng xuất
        logout();
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      // Xử lý lỗi token hết hạn hoặc không hợp lệ
      if (error.response && error.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Kiểm tra token và lấy thông tin người dùng khi ứng dụng khởi chạy
    fetchUserProfile();
  }, []);

  // Đăng nhập
  const login = async (userData) => {
    // Nếu đã có token (do API login đã lưu), cập nhật trạng thái người dùng
    if (userData.isAuthenticated) {
      // Lấy thông tin người dùng từ API sau khi đăng nhập thành công
      await fetchUserProfile();
    } else {
      // Nếu có thông tin người dùng đầy đủ, lưu vào state
      setUser(userData);
      localStorage.setItem("jobhub_user", JSON.stringify(userData));
    }
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("jobhub_user");
  };

  // Cập nhật thông tin người dùng
  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem("jobhub_user", JSON.stringify(updatedUser));
  };

  // Giá trị context được chia sẻ
  const authContextValue = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    fetchUserProfile, // Thêm hàm để các component khác có thể gọi lại khi cần
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>{children}</AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
