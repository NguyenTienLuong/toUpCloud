/* =============================================== */
/* src/components/Sidebar/Sidebar.jsx  */
/* =============================================== */

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import {
  TbLayoutDashboard,
  TbCake,
  TbShoppingBag,
  TbUser,
  TbTicket,
  TbUsers,
  TbTruckDelivery,
  TbX,
  TbSettings,
  TbLogout,
  TbBuilding,
  TbArrowLeft,
  TbUserShield,
} from "react-icons/tb";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onCloseSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const {
    user,
    logout,
    isSuperAdmin,
    isBranchAdmin,
    isViewingBranch,
    viewAllBranches,
    getCurrentBranch,
  } = useAuth();

  const currentBranch = getCurrentBranch();

  const isActive = (path) => location.pathname === path;

  const handleMenuClick = () => {
    if (window.innerWidth <= 768) {
      onCloseSidebar();
    }
  };

  const handleBackToAllBranches = () => {
    viewAllBranches();
    navigate("/branches");
    handleMenuClick();
  };

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      onCloseSidebar();
      console.log("Đăng xuất - Sẽ tích hợp với backend sau");
    }
  };

  // ========================================
  // Menu cho Super Admin (chưa xem chi nhánh)
  // ========================================
  const renderSuperAdminMenu = () => (
    <>
      <div className="menu-section">
        <div className="menu-title">TỔNG QUAN</div>

        <Link
          to="/dashboard"
          className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbLayoutDashboard />
          </span>
          <span>Dashboard Tổng</span>
        </Link>

        <Link
          to="/branches"
          className={`menu-item ${isActive("/branches") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbBuilding />
          </span>
          <span>Quản lý Chi nhánh</span>
        </Link>

        <Link
          to="/products"
          className={`menu-item ${isActive("/products") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbCake />
          </span>
          <span>Quản lý Sản phẩm</span>
        </Link>

        <Link
          to="/voucher"
          className={`menu-item ${isActive("/voucher") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbTicket />
          </span>
          <span>Quản lý Voucher</span>
        </Link>

        <Link
          to="/admins"
          className={`menu-item ${isActive("/admins") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbUserShield />
          </span>
          <span>Quản lý Admin</span>
        </Link>
      </div>

      <div className="menu-section">
        <div className="menu-title">CÀI ĐẶT</div>

        <div className="settings-wrapper">
          <div
            className={`menu-item ${isActive("/settings") ? "active" : ""}`}
            onClick={logout}
          >
            <span className="icon">
              <TbSettings />
            </span>
            <span>Cài đặt</span>
          </div>

          {showSettingsMenu && (
            <div className="settings-dropdown">
              <div
                className="dropdown-item-sidebar logout"
                onClick={handleLogout}
              >
                <TbLogout />
                <span>Log out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Menu cho Branch Admin (giữ nguyên)
  const renderBranchMenu = () => (
    <>
      <div className="menu-section">
        <div className="menu-title">MENU CHÍNH</div>

        <Link
          to="/dashboard"
          className={`menu-item ${isActive("/dashboard") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbLayoutDashboard />
          </span>
          <span>Dashboard</span>
        </Link>

        <Link
          to="/products"
          className={`menu-item ${isActive("/products") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbCake />
          </span>
          <span>Sản phẩm</span>
        </Link>

        <Link
          to="/orders"
          className={`menu-item ${isActive("/orders") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbShoppingBag />
          </span>
          <span>Đơn hàng</span>
        </Link>
      </div>

      <div className="menu-section">
        <div className="menu-title">KHÁCH HÀNG</div>

        <Link
          to="/customers"
          className={`menu-item ${isActive("/customers") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbUser />
          </span>
          <span>Khách hàng</span>
        </Link>

        <Link
          to="/voucher"
          className={`menu-item ${isActive("/voucher") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbTicket />
          </span>
          <span>Voucher</span>
        </Link>
      </div>

      <div className="menu-section">
        <div className="menu-title">QUẢN LÝ</div>

        <Link
          to="/employee"
          className={`menu-item ${isActive("/employee") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbUsers />
          </span>
          <span>Nhân viên</span>
        </Link>

        <Link
          to="/shipper"
          className={`menu-item ${isActive("/shipper") ? "active" : ""}`}
          onClick={handleMenuClick}
        >
          <span className="icon">
            <TbTruckDelivery />
          </span>
          <span>Shipper</span>
        </Link>

        <div className="settings-wrapper">
          <div
            className={`menu-item ${isActive("/settings") ? "active" : ""}`}
            onClick={logout}
          >
            <span className="icon">
              <TbSettings />
            </span>
            <span>Cài đặt</span>
          </div>

          {showSettingsMenu && (
            <div className="settings-dropdown">
              <div
                className="dropdown-item-sidebar logout"
                onClick={handleLogout}
              >
                <TbLogout />
                <span>Log out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const sidebarContent = (
    <>
      <div className="logo">
        <h1>BAKERY ADMIN</h1>
        <p>Hệ thống quản lý</p>
      </div>

      {isViewingBranch && (
        <div className="back-button-wrapper">
          <button
            className="back-button-sidebar"
            onClick={handleBackToAllBranches}
          >
            <TbArrowLeft size={16} />
            <span>Quay lại tất cả chi nhánh</span>
          </button>
        </div>
      )}

      {isSuperAdmin && !isViewingBranch
        ? renderSuperAdminMenu()
        : renderBranchMenu()}
    </>
  );

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {sidebarContent}
      </aside>
    </>
  );
}
