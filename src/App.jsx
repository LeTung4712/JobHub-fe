import React, { createContext, useState, useEffect, useContext } from "react";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import theme from "./theme/index";

// Tạo AuthContext
export const AuthContext = createContext();

// Custom hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra thông tin đăng nhập từ localStorage khi ứng dụng khởi chạy
    const checkAuth = () => {
      const userData = localStorage.getItem("jobhub_user");
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          if (parsedUser.isAuthenticated) {
            setUser(parsedUser);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Lỗi khi phân tích thông tin người dùng:", error);
          localStorage.removeItem("jobhub_user");
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();

    // Lắng nghe sự kiện thay đổi từ localStorage từ các tab khác
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Đăng nhập
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("jobhub_user", JSON.stringify(userData));
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
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
