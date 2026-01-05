import React from "react";
import { Avatar } from "antd";
import { FaExpand, FaBars } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

export default function Header({ onToggleSidebar, onToggleFullscreen }) {
  const { getCurrentBranch, user } = useAuth();
  const currentBranch = getCurrentBranch();

  return (
    <header className="header-container">
      {/* Nút menu hamburger - Mobile */}
      <button className="menu-toggle" onClick={onToggleSidebar}>
        <FaBars />
      </button>

      {/* Thông tin chi nhánh */}
      {currentBranch && (
        <div className="branch-info-header">
          <MdLocationOn className="location-icon" />
          <span className="branch-name-header">{currentBranch.name}</span>
        </div>
      )}

      {/* Icons bên phải */}
      <div className="header-right">
        {/* Icon fullscreen - Ẩn/hiện sidebar khi click */}
        <div className="icon-circle" onClick={onToggleFullscreen}>
          <FaExpand />
        </div>

        <div className="profile">
          <Avatar
            size={40}
            src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
          />
          <div className="profile-info">
            <span className="name">{user.name}</span>
            <span className="role">{user.role_name}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
