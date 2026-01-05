// ===============================================
// src/components/Layout/Layout.jsx
// ===============================================
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Layout.css";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  //  Function để ẩn/hiện sidebar khi click icon fullscreen
  const toggleFullscreen = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="layout">
      {/* Sidebar - Ẩn/hiện dựa vào isSidebarVisible */}
      {isSidebarVisible && (
        <Sidebar isOpen={isSidebarOpen} onCloseSidebar={closeSidebar} />
      )}

      {/* Main content area */}
      <div className="layout-main">
        {/* Header - Truyền toggleFullscreen vào */}
        <div className="header-container">
          <Header 
            onToggleSidebar={toggleSidebar} 
            onToggleFullscreen={toggleFullscreen}
          />
        </div>

        {/* Content */}
        <div className="layout-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}