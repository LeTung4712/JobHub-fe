import React from "react";
import { createBrowserRouter } from "react-router-dom";

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

// Định nghĩa routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "jobs/:id",
        element: <JobDetail />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "posts",
        element: <PostList />,
      },
      {
        path: "posts/create",
        element: <CreatePost />,
      },
      {
        path: "posts/edit/:id",
        element: <EditPost />,
      },
      {
        path: "*",
        element: <div>404 - Không tìm thấy trang</div>,
      },
    ],
  },
]);

export default router;
