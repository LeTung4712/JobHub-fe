import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home";
import Jobs from "../pages/jobs/Jobs";
import About from "../pages/About";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import JobDetail from "../pages/jobs/JobDetail";
import Profile from "../pages/user/Profile";
import Dashboard from "../pages/user/Dashboard";
import PostList from "../pages/posts/PostList";
import CreatePost from "../pages/posts/CreatePost";
import EditPost from "../pages/posts/EditPost";

// Kiểm tra đăng nhập
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// Component bảo vệ route
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// Định nghĩa routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Trang chính
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },

      // Công việc
      {
        path: "jobs",
        children: [
          {
            index: true,
            element: <Jobs />,
          },
          {
            path: ":slug/:id",
            element: <JobDetail />,
          },
        ],
      },

      // Xác thực
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      // Trang người dùng (yêu cầu đăng nhập)
      {
        path: "profile",
        element: <ProtectedRoute element={<Profile />} />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
      },

      // Bài đăng
      {
        path: "posts",
        children: [
          {
            index: true,
            element: <PostList />,
          },
          {
            path: "create",
            element: <ProtectedRoute element={<CreatePost />} />,
          },
          {
            path: "edit/:id",
            element: <ProtectedRoute element={<EditPost />} />,
          },
        ],
      },

      // Trang lỗi
      {
        path: "*",
        element: <div>404 - Không tìm thấy trang</div>,
      },
    ],
  },
]);

export default router;
