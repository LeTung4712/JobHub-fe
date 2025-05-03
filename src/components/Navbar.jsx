import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">JobHub</Link>
      </div>
      <div className="navbar-menu">
        <ul>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/jobs">Việc làm</Link>
          </li>
          <li>
            <Link to="/about">Giới thiệu</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
