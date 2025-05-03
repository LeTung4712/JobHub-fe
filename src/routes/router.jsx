import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';

// Pages
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import About from '../pages/About';

// Định nghĩa routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'jobs',
        element: <Jobs />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: '*',
        element: <div>404 - Không tìm thấy trang</div>
      }
    ]
  }
]);

export default router; 