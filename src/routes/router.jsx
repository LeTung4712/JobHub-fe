import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import JobDetail from "../pages/JobDetail";

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
        path: "job/:id",
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
        path: "*",
        element: <div>404 - Không tìm thấy trang</div>,
      },
    ],
  },
]);

export default router;
