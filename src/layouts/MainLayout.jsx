import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} JobHub. Đã đăng ký bản quyền.</p>
      </footer>
    </div>
  );
}

export default MainLayout; 