-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th1 03, 2026 lúc 06:49 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `hus_bakery`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `branches`
--

CREATE TABLE `branches` (
  `branch_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `mapSrc` text DEFAULT NULL,
  `lat` decimal(10,8) DEFAULT NULL,
  `lng` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `branches`
--

INSERT INTO `branches` (`branch_id`, `name`, `address`, `phone`, `email`, `manager_id`, `mapSrc`, `lat`, `lng`) VALUES
(1, 'HUS Bakery - Hoàn Kiếm', '15 Hàng Bạc, Hoàn Kiếm, Hà Nội', '0241234567', 'hoankiem@husbakery.vn', 1, 'https://maps.google.com/maps?q=21.033425,105.852317&hl=vi&z=15&output=embed', 21.03342500, 105.85231700),
(2, 'HUS Bakery - Cầu Giấy', '89 Trần Duy Hưng, Cầu Giấy, Hà Nội', '0242345678', 'caugiay@husbakery.vn', 9, 'https://maps.google.com/maps?q=21.009123,105.798952&hl=vi&z=15&output=embed', 21.00912300, 105.79895200),
(3, 'HUS Bakery - Đống Đa', '120 Tây Sơn, Đống Đa, Hà Nội', '0243456789', 'dongda@husbakery.vn', 17, 'https://maps.google.com/maps?q=21.011681,105.823412&hl=vi&z=15&output=embed', 21.01168100, 105.82341200),
(4, 'HUS Bakery - Hà Đông', '65 Quang Trung, Hà Đông, Hà Nội', '0244567890', 'hadong@husbakery.vn', 25, 'https://maps.google.com/maps?q=20.972235,105.776123&hl=vi&z=15&output=embed', 20.97223500, 105.77612300),
(5, 'HUS Bakery - Thanh Xuân', '334, Nguyễn Trãi, Thanh Xuân, Hà Nội', '0245678901', 'thanhxuan@husbakery.vn', 33, 'https://maps.google.com/maps?q=20.995872,105.807977&hl=vi&z=15&output=embed', 20.99587220, 105.80797720);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `branch_products`
--

CREATE TABLE `branch_products` (
  `branch_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `branch_products`
--

INSERT INTO `branch_products` (`branch_id`, `product_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 2, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 3, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 4, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 5, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 6, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 7, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 8, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 9, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 10, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 11, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 12, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 13, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 14, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 15, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 16, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 17, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 18, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 19, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 20, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 21, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 22, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 23, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 24, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 25, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 26, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 27, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 28, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 29, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 30, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 31, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 32, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 33, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(1, 34, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 1, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 2, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 3, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 4, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 5, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 6, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 7, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 8, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 9, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 10, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 11, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 12, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 13, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 14, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 15, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 16, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 17, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 18, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 19, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 20, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 21, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 22, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 23, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 24, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 25, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 26, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 27, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 28, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 29, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 30, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 31, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 32, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 33, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(2, 34, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 1, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 2, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 3, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 4, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 5, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 6, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 7, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 8, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 9, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 10, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 11, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 12, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 13, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 14, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 15, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 16, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 17, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 18, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 19, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 20, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 21, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 22, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 23, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 24, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 25, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 26, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 27, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 28, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 29, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 30, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 31, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 32, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 33, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(3, 34, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 1, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 2, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 3, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 4, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 5, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 6, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 7, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 8, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 9, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 10, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 11, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 12, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 13, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 14, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 15, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 16, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 17, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 18, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 19, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 20, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 21, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 22, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 23, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 24, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 25, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 26, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 27, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 28, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 29, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 30, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 31, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 32, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 33, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(4, 34, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 1, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 2, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 3, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 4, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 5, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 6, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 7, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 8, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 9, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 10, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 11, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 12, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 13, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 14, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 15, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 16, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 17, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 18, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 19, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 20, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 21, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 22, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 23, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 24, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 25, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 26, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 27, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 28, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 29, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 30, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 31, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 32, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 33, '2025-12-28 15:13:54', '2025-12-28 15:13:54'),
(5, 34, '2025-12-28 15:13:54', '2025-12-28 15:13:54');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `selected` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'Bread'),
(2, 'Cookie'),
(3, 'Pastry');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `coupons`
--

CREATE TABLE `coupons` (
  `coupon_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `discount_percent` int(11) DEFAULT NULL,
  `discount_value` decimal(10,2) DEFAULT NULL,
  `discount_type` varchar(20) DEFAULT NULL,
  `min_purchase` decimal(10,2) DEFAULT NULL,
  `max_discount` decimal(10,2) DEFAULT NULL,
  `begin_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `rank` varchar(20) DEFAULT 'Đồng'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `coupons`
--

INSERT INTO `coupons` (`coupon_id`, `description`, `discount_percent`, `discount_value`, `discount_type`, `min_purchase`, `max_discount`, `begin_date`, `end_date`, `status`, `created_at`, `updated_at`, `rank`) VALUES
(1, 'Giảm 10% cho đơn từ 200', 10, NULL, 'percent', 200000.00, 50000.00, '2025-01-01', '2025-12-31', 'Expired', '2025-11-06 14:02:06', '2026-01-02 19:09:29', 'Vàng'),
(3, 'Giảm 15% cho bánh kem', 15, NULL, 'percent', 150000.00, 70000.00, '2025-01-15', '2025-12-31', 'Expired', '2025-11-06 14:02:06', '2026-01-02 19:09:29', 'Vàng'),
(5, 'Giảm 30k cho khách hàng mới', NULL, 30000.00, 'value', 100000.00, NULL, '2025-01-01', '2025-12-31', 'Expired', '2025-11-06 14:02:06', '2026-01-02 19:09:29', 'Kim cương'),
(12, 'Giảm 15% cho khách VIP', 15, NULL, 'percent', 300000.00, 80000.00, '2025-01-01', '2025-12-31', 'Expired', '2025-11-06 14:02:06', '2026-01-02 19:09:29', 'Kim cương'),
(16, 'Tri ân Thượng khách 2026', 40, NULL, 'percent', 1000000.00, 500000.00, '2026-01-01', '2026-12-31', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Kim cương'),
(17, 'Quà tặng Sinh nhật Kim cương', NULL, 200000.00, 'value', 0.00, NULL, '2025-12-01', '2026-06-30', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Kim cương'),
(18, 'Đặc quyền Private Party 2026', 25, NULL, 'percent', 2000000.00, 1000000.00, '2026-01-02', '2026-01-31', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Kim cương'),
(19, 'Ưu đãi Hội viên Vàng tháng 1', 20, NULL, 'percent', 400000.00, 150000.00, '2026-01-01', '2026-01-31', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Vàng'),
(20, 'Voucher Mua sắm Tết 2026', NULL, 100000.00, 'value', 500000.00, NULL, '2026-01-01', '2026-02-10', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Vàng'),
(21, 'Tiệc Trà Chiều 2026', 15, NULL, 'percent', 250000.00, 50000.00, '2025-11-15', '2026-03-15', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Vàng'),
(22, 'Khuyến mãi Bạc thân thiết', 10, NULL, 'percent', 200000.00, 40000.00, '2026-01-01', '2026-04-30', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Bạc'),
(23, 'Voucher Cuối tuần vui vẻ', NULL, 30000.00, 'value', 150000.00, NULL, '2026-01-03', '2026-01-04', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Bạc'),
(24, 'Chào mừng trở lại 2026', 12, NULL, 'percent', 100000.00, 30000.00, '2025-12-25', '2026-02-28', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Bạc'),
(25, 'Mã giảm giá Khách hàng mới', 50, NULL, 'percent', 50000.00, 25000.00, '2026-01-01', '2026-12-31', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Đồng'),
(26, 'Lì xì may mắn đầu năm', NULL, 10000.00, 'value', 100000.00, NULL, '2026-01-01', '2026-01-05', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Đồng'),
(27, 'Ưu đãi bánh mì sáng 2026', 5, NULL, 'percent', 20000.00, 5000.00, '2026-01-01', '2026-06-30', 'active', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Đồng'),
(28, 'Xả kho cuối năm 2025', 70, NULL, 'percent', 100000.00, 100000.00, '2025-12-20', '2025-12-31', 'Expired', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Đồng'),
(29, 'Flash Sale 1/1/2026', NULL, 50000.00, 'value', 200000.00, NULL, '2026-01-01', '2026-01-01', 'Expired', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Bạc'),
(30, 'Sự kiện Countdown 2026', 20, NULL, 'percent', 300000.00, 100000.00, '2025-12-31', '2026-01-01', 'Expired', '2026-01-02 19:16:13', '2026-01-02 19:16:13', 'Kim cương');

--
-- Bẫy `coupons`
--
DELIMITER $$
CREATE TRIGGER `update_status_before_select` BEFORE UPDATE ON `coupons` FOR EACH ROW BEGIN
    IF NEW.end_date < NOW() AND NEW.status = 'active' THEN
        SET NEW.status = 'Expired';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `coupons_customer`
--

CREATE TABLE `coupons_customer` (
  `coupon_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `used_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `coupons_customer`
--

INSERT INTO `coupons_customer` (`coupon_id`, `customer_id`, `status`, `used_at`) VALUES
(25, 1, 'unused', NULL),
(25, 2, 'unused', NULL),
(25, 3, 'unused', NULL),
(25, 4, 'unused', NULL),
(25, 5, 'unused', NULL),
(25, 6, 'unused', NULL),
(25, 7, 'unused', NULL),
(25, 8, 'unused', NULL),
(25, 9, 'unused', NULL),
(25, 10, 'unused', NULL),
(25, 11, 'unused', NULL),
(25, 12, 'unused', NULL),
(25, 13, 'unused', NULL),
(25, 14, 'unused', NULL),
(25, 15, 'unused', NULL),
(25, 16, 'unused', NULL),
(26, 1, 'unused', NULL),
(26, 2, 'unused', NULL),
(26, 3, 'unused', NULL),
(26, 4, 'unused', NULL),
(26, 5, 'unused', NULL),
(26, 6, 'unused', NULL),
(26, 7, 'unused', NULL),
(26, 8, 'unused', NULL),
(26, 9, 'unused', NULL),
(26, 10, 'unused', NULL),
(26, 11, 'unused', NULL),
(26, 12, 'unused', NULL),
(26, 13, 'unused', NULL),
(26, 14, 'unused', NULL),
(26, 15, 'unused', NULL),
(26, 16, 'unused', NULL),
(27, 1, 'unused', NULL),
(27, 2, 'unused', NULL),
(27, 3, 'unused', NULL),
(27, 4, 'unused', NULL),
(27, 5, 'unused', NULL),
(27, 6, 'unused', NULL),
(27, 7, 'unused', NULL),
(27, 8, 'unused', NULL),
(27, 9, 'unused', NULL),
(27, 10, 'unused', NULL),
(27, 11, 'unused', NULL),
(27, 12, 'unused', NULL),
(27, 13, 'unused', NULL),
(27, 14, 'unused', NULL),
(27, 15, 'unused', NULL),
(27, 16, 'unused', NULL),
(28, 1, 'unused', NULL),
(28, 2, 'unused', NULL),
(28, 3, 'unused', NULL),
(28, 4, 'unused', NULL),
(28, 5, 'unused', NULL),
(28, 6, 'unused', NULL),
(28, 7, 'unused', NULL),
(28, 8, 'unused', NULL),
(28, 9, 'unused', NULL),
(28, 10, 'unused', NULL),
(28, 11, 'unused', NULL),
(28, 12, 'unused', NULL),
(28, 13, 'unused', NULL),
(28, 14, 'unused', NULL),
(28, 15, 'unused', NULL),
(28, 16, 'unused', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`customer_id`, `name`, `email`, `phone`, `avatar`, `password`, `created_at`) VALUES
(1, 'Nguyễn Thu Trang', 'trang.nguyen@gmail.com', '0978123456', 'avatar1.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(2, 'Trần Văn Minh', 'minh.tran@gmail.com', '0978234567', 'avatar2.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(3, 'Lê Thị Hòa', 'hoa.le@gmail.com', '0978345678', 'avatar3.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(4, 'Phạm Quang Huy', 'huy.pham@gmail.com', '0978456789', 'avatar4.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(5, 'Vũ Thị Hạnh', 'hanh.vu@gmail.com', '0978567890', 'avatar5.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(6, 'Hoàng Anh Tuấn', 'tuan.hoang@gmail.com', '0978678901', 'avatar6.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(7, 'Nguyễn Thị Mai', 'mai.nguyen@gmail.com', '0978789012', 'avatar7.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(8, 'Đỗ Đức Nam', 'nam.do@gmail.com', '0978890123', 'avatar8.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(9, 'Trần Thị Lan', 'lan.tran@gmail.com', '0978901234', 'avatar9.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(10, 'Lê Văn Bình', 'binh.le@gmail.com', '0978012345', 'avatar10.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(11, 'Phan Thị Hường', 'huong.phan@gmail.com', '0978123012', 'avatar11.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(12, 'Nguyễn Hữu Dũng', 'dung.nguyen@gmail.com', '0978230123', 'avatar12.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(13, 'Đào Minh Tuấn', 'tuan.dao@gmail.com', '0978340123', 'avatar13.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(14, 'Bùi Quỳnh Chi', 'chi.bui@gmail.com', '0978450123', 'avatar14.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(15, 'Trần Thị Vân', 'van.tran@gmail.com', '0978560123', 'avatar15.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-06 14:02:06'),
(16, 'thach', '23001559@hus.edu.vn', '0778322905', 'default.jpg', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', '2025-11-25 02:31:14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer_notifications`
--

CREATE TABLE `customer_notifications` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `customer_notifications`
--

INSERT INTO `customer_notifications` (`id`, `customer_id`, `order_id`, `is_read`, `created_at`) VALUES
(63, 1, 1, 0, '2025-11-06 14:02:06'),
(64, 2, 2, 0, '2025-11-06 14:02:06'),
(65, 3, 3, 0, '2025-11-06 14:02:06'),
(66, 4, 4, 0, '2025-11-06 14:02:06'),
(67, 5, 5, 0, '2025-11-06 14:02:06'),
(68, 6, 6, 0, '2025-11-06 14:02:06'),
(69, 7, 7, 0, '2025-11-06 14:02:06'),
(70, 8, 8, 0, '2025-11-06 14:02:06'),
(71, 9, 9, 0, '2025-11-06 14:02:06'),
(72, 10, 10, 0, '2025-11-06 14:02:06'),
(73, 11, 11, 0, '2025-11-06 14:02:06'),
(74, 12, 12, 0, '2025-11-06 14:02:06'),
(75, 13, 13, 0, '2025-11-06 14:02:06'),
(76, 14, 14, 0, '2025-11-06 14:02:06'),
(77, 15, 15, 0, '2025-11-06 14:02:06'),
(78, 16, 101, 0, '2025-12-23 17:08:17'),
(79, 16, 102, 0, '2025-12-23 17:08:17'),
(80, 16, 103, 0, '2025-12-23 17:08:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `employee_name` varchar(200) DEFAULT NULL,
  `role_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `employees`
--

INSERT INTO `employees` (`employee_id`, `employee_name`, `role_name`, `email`, `password`, `salary`, `status`, `branch_id`) VALUES
(1, 'Nguyễn Bảo Thạch', 'Quản lý', 'thach.nguyen@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 18000000.00, 'Đang làm việc', 1),
(2, 'Lê Văn Hùng', 'Siêu quản lý', 'hung.le@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 11000000.00, 'Đang làm việc', 1),
(3, 'Trần Thị Mai', 'Thợ làm bánh', 'mai.tran@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 11200000.00, 'Đang làm việc', 1),
(4, 'Nguyễn Văn An', 'Bán hàng', 'an.nguyen@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 1),
(5, 'Bùi Thị Chi', 'Bán hàng', 'chi.bui@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 1),
(6, 'Đỗ Hữu Dũng', 'Bán hàng', 'dung.do@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9100000.00, 'Đang làm việc', 1),
(7, 'Phạm Thu Hà', 'Bán hàng', 'ha.pham@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 1),
(8, 'Hoàng Văn Em', 'Bán hàng', 'em.hoang@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9200000.00, 'Đang làm việc', 1),
(9, 'Nguyễn Tiến Lưỡng', 'Quản lý', 'luong.nguyen@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 18000000.00, 'Đang làm việc', 2),
(10, 'Phạm Văn Giang', 'Thợ làm bánh', 'giang.pham@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 11000000.00, 'Đang làm việc', 2),
(11, 'Nguyễn Thị Lệ', 'Thợ làm bánh', 'le.nguyen@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 11300000.00, 'Đang làm việc', 2),
(12, 'Trần Văn Nam', 'Bán hàng', 'nam.tran@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 2),
(13, 'Lê Thị Hoa', 'Bán hàng', 'hoa.le@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 2),
(14, 'Phạm Đức Huy', 'Bán hàng', 'huy.pham@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9100000.00, 'Đang làm việc', 2),
(15, 'Vũ Thị Trang', 'Bán hàng', 'trang.vu@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 2),
(16, 'Đặng Văn Long', 'Bán hàng', 'long.dang@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9200000.00, 'Đang làm việc', 2),
(17, 'Lê Thị Yến', 'Quản lý', 'yen.le@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 18000000.00, 'Đang làm việc', 3),
(18, 'Ngô Văn Khánh', 'Thợ làm bánh', 'khanh.ngo@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 11000000.00, 'Đang làm việc', 3),
(19, 'Đào Thị Hương', 'Thợ làm bánh', 'huong.dao@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 11200000.00, 'Đang làm việc', 3),
(20, 'Đinh Văn Hùng', 'Bán hàng', 'hung.dinh@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 3),
(21, 'Vũ Ngọc Ánh', 'Bán hàng', 'anh.vu@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 3),
(22, 'Phan Văn Đức', 'Bán hàng', 'duc.phan@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9100000.00, 'Đang làm việc', 3),
(23, 'Hoàng Thị Thu', 'Bán hàng', 'thu.hoang@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 3),
(24, 'Trần Văn Trung', 'Bán hàng', 'trung.tran@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9200000.00, 'Đang làm việc', 3),
(25, 'Lê Nguyễn Tố Uyên', 'Quản lý', 'uyen.le@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 18000000.00, 'Đang làm việc', 4),
(26, 'Võ Văn Kiệt', 'Thợ làm bánh', 'kiet.vo@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 11000000.00, 'Đang làm việc', 4),
(27, 'Trần Ngọc Anh', 'Thợ làm bánh', 'anh.tran@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 11200000.00, 'Đang làm việc', 4),
(28, 'Nguyễn Hữu Thắng', 'Bán hàng', 'thang.nguyen@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 4),
(29, 'Đặng Thị Lan', 'Bán hàng', 'lan.dang@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 4),
(30, 'Lê Công Vinh', 'Bán hàng', 'vinh.le@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9100000.00, 'Đang làm việc', 4),
(31, 'Nguyễn Thị Nga', 'Bán hàng', 'nga.nguyen@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 4),
(32, 'Bùi Tấn Trường', 'Bán hàng', 'truong.bui@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9200000.00, 'Đang làm việc', 4),
(33, 'Nguyễn Văn Thụ', 'Quản lý', 'thu.nguyen@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 18000000.00, 'Đang làm việc', 5),
(34, 'Lương Xuân Trường', 'Thợ làm bánh', 'truong.luong@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 11000000.00, 'Đang làm việc', 5),
(35, 'Nguyễn Thị Hảo', 'Thợ làm bánh', 'hao.nguyen@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 11200000.00, 'Đang làm việc', 5),
(36, 'Nguyễn Công Phượng', 'Bán hàng', 'phuong.nguyen@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 5),
(37, 'Nguyễn Văn Toàn', 'Bán hàng', 'toan.nguyen@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 5),
(38, 'Trần Minh Vương', 'Bán hàng', 'vuong.tran@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9100000.00, 'Đang làm việc', 5),
(39, 'Phan Văn Đức', 'Bán hàng', 'duc.phan@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9000000.00, 'Đang làm việc', 5),
(40, 'Đỗ Duy Mạnh', 'Siêu quản lý', 'manh.do@husbakery.vn', 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69', 9200000.00, 'Đang làm việc', 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedback`
--

CREATE TABLE `feedback` (
  `order_id` int(11) NOT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `customer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `feedback`
--

INSERT INTO `feedback` (`order_id`, `branch_id`, `rating`, `created_at`, `customer_id`) VALUES
(1, 1, 4, '2025-12-29 06:55:52', 1),
(2, 2, 5, '2025-12-29 06:55:52', 2),
(3, 3, 5, '2025-12-29 06:55:52', 3),
(4, 4, 5, '2025-12-29 06:55:52', 4),
(5, 5, 4, '2025-12-29 06:55:52', 5),
(6, 1, 5, '2025-12-29 06:55:52', 6),
(7, 2, 4, '2025-12-29 06:55:52', 7),
(8, 3, 4, '2025-12-29 06:55:52', 8),
(9, 4, 4, '2025-12-29 06:55:52', 9),
(10, 5, 4, '2025-12-29 06:55:52', 10),
(11, 1, 4, '2025-12-29 06:55:52', 11),
(12, 2, 4, '2025-12-29 06:55:52', 12),
(13, 3, 5, '2025-12-29 06:55:52', 13),
(14, 4, 5, '2025-12-29 06:55:52', 14),
(15, 5, 5, '2025-12-29 06:55:52', 15),
(101, 5, 5, '2025-12-29 06:55:52', 16),
(102, 5, 5, '2025-12-29 06:55:52', 16),
(103, 5, 5, '2025-12-29 06:55:52', 16);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `shipper_id` int(11) DEFAULT NULL,
  `coupon_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `recipient_name` varchar(200) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `shipping_address` text DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `note` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `branch_id`, `shipper_id`, `coupon_id`, `total_amount`, `recipient_name`, `phone`, `shipping_address`, `payment_method`, `created_at`, `note`) VALUES
(1, 1, 1, 1, 1, 300000.00, 'Nguyễn Thu Trang', '0912345678', '15 Hàng Bạc, Hoàn Kiếm, Hà Nội', 'COD', '2025-11-06 14:02:06', 'Sản phẩm rất ngon, phục vụ tốt!'),
(2, 2, 2, 3, NULL, 450000.00, 'Trần Văn Minh', '0987654321', '89 Trần Duy Hưng, Cầu Giấy', 'Online', '2025-11-06 14:02:06', 'Sản phẩm rất ngon, phục vụ tốt!'),
(3, 3, 3, 5, 3, 250000.00, 'Lê Thị Hòa', '0901234567', '120 Tây Sơn, Đống Đa', 'COD', '2025-11-06 14:02:06', 'Sản phẩm rất ngon, phục vụ tốt!'),
(4, 4, 4, 7, NULL, 550000.00, 'Phạm Quang Huy', '0977888999', '65 Quang Trung, Hà Đông', 'Online', '2025-11-06 14:02:06', 'Không thành công'),
(5, 5, 5, 9, 5, 200000.00, 'Vũ Thị Hạnh', '0944555666', '20 Nguyễn Văn Cừ, Long Biên', 'COD', '2025-11-06 14:02:06', 'Không thành công'),
(6, 6, 1, 2, 1, 320000.00, 'Hoàng Anh Tuấn', '0966777888', '17 Lý Nam Đế, Hoàn Kiếm', 'COD', '2025-11-06 14:02:06', 'Hoàn thành'),
(7, 7, 2, 4, NULL, 480000.00, 'Nguyễn Thị Mai', '0933222111', '21 Trung Kính, Cầu Giấy', 'Online', '2025-11-06 14:02:06', 'Hoàn thành'),
(8, 8, 3, 6, NULL, 220000.00, 'Đỗ Đức Nam', '0922111000', '50 Chùa Bộc, Đống Đa', 'Online', '2025-11-06 14:02:06', 'Hoàn thành\r\n'),
(9, 9, 4, 8, NULL, 310000.00, 'Trần Thị Lan', '0955444333', '65 Quang Trung, Hà Đông', 'Online', '2025-11-06 14:02:06', 'Đã hủy'),
(10, 10, 5, 10, NULL, 180000.00, 'Lê Văn Bình', '0911000999', '20 Nguyễn Văn Cừ, Long Biên', 'COD', '2025-11-06 14:02:06', 'Hoàn thành'),
(11, 11, 1, 11, NULL, 600000.00, 'Phan Thị Hường', '0900000000', '12 Hàng Bè, Hoàn Kiếm', 'Online', '2025-11-06 14:02:06', 'Hoàn thành'),
(12, 12, 2, 12, NULL, 420000.00, 'Nguyễn Hữu Dũng', '0900000000', '55 Trần Duy Hưng, Cầu Giấy', 'COD', '2025-11-06 14:02:06', 'Hoàn thành'),
(13, 13, 3, 13, 12, 340000.00, 'Đào Minh Tuấn', '0900000000', '110 Tây Sơn, Đống Đa', 'Online', '2025-11-06 14:02:06', 'Hoàn thành'),
(14, 14, 4, 14, NULL, 275000.00, 'Bùi Quỳnh Chi', '0900000000', '72 Quang Trung, Hà Đông', 'COD', '2025-11-06 14:02:06', 'Hoàn thành'),
(15, 15, 5, 15, NULL, 900000.00, 'Trần Thị Vân', '0900000000', '89 Nguyễn Văn Cừ, Long Biên', 'Online', '2025-11-06 14:02:06', 'Đã hủy\r\n'),
(101, 16, 5, 8, NULL, 120000.00, 'Nguyễn Bảo Thạch ', '0778322905', '120, Trường Chinh, Thanh Xuân, Hà Nội ', 'COD', '2025-12-23 17:08:17', ''),
(102, 16, 5, 21, NULL, 300000.00, 'Nguyễn Bảo Thạch ', '0778322905', '120, Trường Chinh, Thanh Xuân, Hà Nội ', 'Online', '2025-12-23 17:08:17', ''),
(103, 16, 5, 21, NULL, 400000.00, 'Đào Minh Tuấn', '0900000000', '120, Trường Chinh, Thanh Xuân, Hà Nội ', 'COD', '2025-12-23 17:08:17', ''),
(118, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(119, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(120, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(121, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(122, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(123, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(124, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(125, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(126, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(127, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(128, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(129, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL),
(130, NULL, NULL, NULL, NULL, 0.00, NULL, '0900000000', NULL, NULL, '2025-12-23 17:08:17', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 101, 1, 4, 800000.00),
(2, 101, 23, 2, 120000.00),
(3, 102, 1, 5, 1000000.00),
(4, 102, 23, 3, 180000.00),
(5, 103, 1, 3, 600000.00),
(6, 103, 5, 2, 100000.00),
(24, 118, 7, 2, 60000.00),
(25, 119, 8, 1, 75000.00),
(26, 120, 9, 2, 40000.00),
(27, 121, 10, 1, 20000.00),
(28, 122, 11, 2, 90000.00),
(29, 123, 1, 2, 400000.00),
(30, 124, 12, 1, 65000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_status`
--

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_status`
--

INSERT INTO `order_status` (`id`, `order_id`, `status`, `updated_at`) VALUES
(1, 1, 'Đã giao', '2025-12-26 17:59:22'),
(2, 2, 'Đã giao', '2025-12-26 18:00:34'),
(3, 3, 'Đã giao', '2025-12-26 17:59:53'),
(4, 4, 'Đang giao', '2025-12-26 18:01:09'),
(5, 5, 'Đã giao', '2025-12-26 18:01:17'),
(6, 6, 'Đang xử lý', '2025-12-26 18:01:30'),
(7, 7, 'Đã giao', '2025-12-26 18:01:44'),
(8, 8, 'Đã giao', '2025-12-26 18:02:08'),
(9, 9, 'Đã giao', '2025-12-26 18:00:01'),
(10, 10, 'Đang giao', '2025-12-26 18:02:23'),
(11, 11, 'Đã giao', '2025-12-26 18:02:44'),
(12, 12, 'Đang xử lý', '2025-12-26 18:03:26'),
(13, 13, 'Đã giao', '2025-12-26 18:03:20'),
(14, 14, 'Đã giao', '2025-12-26 18:03:15'),
(15, 15, 'Đã giao', '2025-12-26 18:00:13'),
(16, 101, 'Đang xử lý', '2025-12-29 16:36:06'),
(17, 102, 'Đã giao', '2025-12-28 16:06:45'),
(18, 103, 'Đã giao', '2025-12-28 16:07:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` date DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `image_url`, `unit_price`, `created_at`, `updated_at`, `category_id`) VALUES
(1, 'Sourdough', 'Bánh mì Sourdough được lên men tự nhiên trong thời gian dài, tạo nên lớp vỏ giòn đậm, ruột bánh dai nhẹ và hương vị chua thanh đặc trưng.', 'https://res.cloudinary.com/djaiglhzt/image/upload/v1766480196/Sourdough_zjrw2e.jpg', 200000.00, '2025-12-18 01:22:43', '2025-12-18', 1),
(2, 'Bánh mì Pháp', 'Bánh mì Pháp truyền thống với lớp vỏ nướng giòn rụm, ruột bánh mềm xốp và thơm mùi bột mì tự nhiên.', 'https://res.cloudinary.com/djaiglhzt/image/upload/v1766480540/Baguette.jpg', 50000.00, '2025-12-18 01:22:43', '2025-12-18', 1),
(3, 'Bánh mì nho khô', 'Bánh mì nho khô mềm mịn với những hạt nho khô ngọt tự nhiên được phân bố đều trong ruột bánh.', 'https://res.cloudinary.com/djaiglhzt/image/upload/v1766481167/80b5897399d3b8674fd026a16632fad1_euci0a.jpg', 50000.00, '2025-12-18 01:22:43', '2025-12-18', 1),
(4, 'Bánh Waffle', 'Bánh waffle được nướng vàng đều với lớp ngoài giòn nhẹ và phần ruột bên trong mềm xốp, thơm mùi bơ sữa.', 'https://res.cloudinary.com/djaiglhzt/image/upload/v1766481351/3c9a37cf55e7f8d63f849c38448ea48a_ypgtfi.jpg', 40000.00, '2025-12-18 01:22:43', '2025-12-18', 1),
(5, 'Bánh mì bơ tỏi', 'Bánh mì bơ tỏi được nướng giòn, phủ đều lớp bơ tỏi thơm lừng với vị mặn nhẹ và béo vừa phải.', 'https://res.cloudinary.com/djaiglhzt/image/upload/v1766481873/a5f233f9964166cb64f0932ba9564099_hzkhwl.jpg', 50000.00, '2025-12-23 00:52:16', NULL, 1),
(6, 'Bánh kếp', 'Bánh kếp mềm xốp, vàng đều và dậy mùi bơ sữa tự nhiên. Kết cấu bánh nhẹ, dễ ăn.', 'https://res.cloudinary.com/djaiglhzt/image/upload/v1766482019/8100397ef3e98e13842711556d79d4e7_bse8vy.jpg', 60000.00, '2025-12-23 00:52:16', NULL, 1),
(7, 'Bánh mì Mochi đậu đỏ', 'Bánh mì Mochi đậu đỏ có lớp vỏ mềm dai, kết hợp cùng mochi dẻo mịn và nhân đậu đỏ ngọt bùi.', 'https://res.cloudinary.com/djaiglhzt/image/upload/v1766482325/a5f5718bb59a464ea9508fc4a9da818b_h8qrbu.jpg', 30000.00, '2025-12-23 00:52:16', NULL, 1),
(8, 'Bánh mì Socola', 'Bánh mì socola mềm thơm với phần nhân socola đậm vị được giấu bên trong ruột bánh.', 'https://res.cloudinary.com/djaiglhzt/image/upload/v1766483277/d09ee351e6563688795f7676814f08a4_j9ebv9.jpg', 75000.00, '2025-12-23 00:52:16', NULL, 1),
(9, 'Bánh soboro', 'Bánh mì soboro kiểu Hàn Quốc nổi bật với lớp vụn bơ giòn ngọt phủ trên bề mặt bánh.', 'https://res.cloudinary.com/djaiglhzt/image/upload/v1766483770/9114c7a3a47d73375b2bd2ff390a9596_p8jryo.jpg', 20000.00, '2025-12-23 00:52:16', NULL, 1),
(10, 'Bánh nhân kem trứng', 'Bánh mì nhân kem trứng có lớp vỏ mềm xốp, bên trong là phần kem trứng béo mịn.', 'https://res.cloudinary.com/djaiglhzt/image/upload/v1766483907/2d90e2f7bc3e85adce3db78524a22a9e_d3blsg.jpg', 20000.00, '2025-12-23 00:52:16', NULL, 1),
(11, 'Bánh mì cuộn nho', 'Bánh mì cuộn nho mềm mịn với nho khô ngọt tự nhiên được cuộn đều bên trong.', 'https://res.cloudinary.com/djaiglhzt/image/upload/v1766484974/613d62959830547eb5a432af8924cfe3_haomvb.jpg', 45000.00, '2025-12-23 00:52:16', NULL, 1),
(12, 'Mille-feuille vị xoài', 'Bánh ngàn lớp nướng giòn với kem béo mịn và xoài chín vàng mọng nước.', 'https://i.pinimg.com/736x/1d/6a/7c/1d6a7cf0e193941665b00b4843b1c725.jpg', 65000.00, '2025-12-18 01:22:43', '2025-12-18', 3),
(13, 'Mille-feuille vị dâu', 'Sự kết hợp hài hòa giữa lớp bánh ngàn lớp giòn tan và kem custard dâu tây tươi.', 'https://i.pinimg.com/736x/6f/22/ac/6f22ac7350a2135edeb2b597fb426b92.jpg', 65000.00, '2025-12-18 01:22:43', '2025-12-18', 3),
(14, 'Mille-feuille vị việt quất', 'Sự giao thoa tinh tế giữa nghệ thuật Pháp và hương vị việt quất đặc trưng.', 'https://i.pinimg.com/1200x/ce/66/cb/ce66cbccae2bb90dcb4a933113bac793.jpg', 65000.00, '2025-12-18 01:22:43', '2025-12-18', 3),
(15, 'Danish vị Táo', 'Bánh Danish vị táo sở hữu lớp vỏ xếp tầng giòn nhẹ, nhân táo sên mềm thơm hương quế.', 'https://i.pinimg.com/1200x/b2/85/bc/b285bc21a8dacea333377477f8ec34f6.jpg', 45000.00, '2025-12-18 01:22:43', '2025-12-18', 3),
(16, 'Danish vị Dâu', 'Lớp bánh Danish vàng ươm với nhân dâu tây tươi kết hợp lớp gel trái cây óng ánh.', 'https://i.pinimg.com/1200x/f4/41/f2/f441f29cf44cb77caa9ea6ca523fa84c.jpg', 45000.00, '2025-12-18 01:22:43', '2025-12-18', 3),
(17, 'Danish vị Socola', 'Món bánh Danish với lớp vỏ giòn xốp và nhân socola nguyên chất tan chảy.', 'https://www.lottemart.vn/media/catalog/product/cache/0x0/0/4/0400233880002.jpg.webp', 45000.00, '2025-12-18 01:22:43', '2025-12-18', 3),
(18, 'Croissant nguyên bản', 'Croissant truyền thống với lớp vỏ ngoài giòn tan, ruột bánh rỗng xốp và nhẹ.', 'https://i.pinimg.com/736x/ea/0b/c6/ea0bc6f4213d99c0b35dfac08b5bd7c1.jpg', 55000.00, '2025-12-18 01:22:43', '2025-12-18', 3),
(19, 'Croissant Socola', 'Croissant nướng vàng ruộm với hai thanh socola đen nguyên chất bên trong.', 'https://i.pinimg.com/1200x/15/9b/59/159b596f833ecaa2d54d862ef04c6490.jpg', 55000.00, '2026-01-03 17:06:06', '2025-12-18', 3),
(20, 'Croissant Matcha', 'Sự kết hợp giữa kỹ thuật Pháp và matcha Nhật Bản, vị trà xanh thanh mát.', 'https://odouceurs.com/img/client/shop/1727601201_croissant%20matrcha.jpg', 55000.00, '2025-12-18 01:22:43', '2025-12-18', 3),
(21, 'Mille-feuille vị socola', 'Lớp bánh ngàn lớp giòn tan kết hợp cùng kem socola mịn màng và đậm vị.', 'https://i.pinimg.com/736x/ee/89/8f/ee898f6631acbce5be9c90304f611e68.jpg', 65000.00, '2025-12-23 00:52:16', NULL, 3),
(22, 'Mille-feuille vị chanh', 'Vị chanh tươi mát cân bằng hoàn hảo độ béo của kem và lớp bánh giòn tan.', 'https://i.pinimg.com/1200x/bd/ff/cb/bdffcb7d5eda6eab2c5f957350803dfb.jpg', 65000.00, '2025-12-23 00:52:16', NULL, 3),
(23, 'Macaron Pháp', 'Bánh ngọt cao cấp với lớp vỏ mỏng giòn nhẹ và phần ruột mềm ẩm tinh tế.', 'https://i.pinimg.com/1200x/15/94/f0/1594f0aad8c31b07cb63aa2fdcabae43.jpg', 60000.00, '2025-12-23 01:30:00', NULL, 2),
(24, 'Bánh quy Thumbprint', 'Bánh quy bơ xốp thơm, phần lõm ở giữa được phủ mứt trái cây chua ngọt.', 'https://i.pinimg.com/736x/2f/1c/7d/2f1c7d15e8cd70574f856d0d9012dbbe.jpg', 45000.00, '2025-12-23 01:30:00', NULL, 2),
(25, 'Bánh quy Levain kiểu Mỹ', 'Bánh quy kích thước lớn, vỏ hơi giòn nhưng lõi bên trong mềm ẩm đậm vị bơ.', 'https://i.pinimg.com/1200x/31/26/d8/3126d86acd7975b2a4628b214279d440.jpg', 55000.00, '2025-12-23 01:30:00', NULL, 2),
(26, 'Bánh quy Smore', 'Lớp bánh mềm kết hợp marshmallow dẻo dai và socola tan chảy ngọt ngào.', 'https://i.pinimg.com/1200x/5f/a6/b3/5fa6b38fe7b73a3a130fd73455ccfd15.jpg', 50000.00, '2025-12-23 01:30:00', NULL, 2),
(27, 'Bánh quy Melting Moments', 'Bánh quy bơ kết cấu mềm mịn, dễ tan ngay khi chạm vào đầu lưỡi.', 'https://i.pinimg.com/736x/73/b1/c2/73b1c25e0d163a1f1cfbe2bde92f7eb6.jpg', 40000.00, '2025-12-23 01:30:00', NULL, 2),
(28, 'Bánh quy Red Velvet', 'Sắc đỏ đặc trưng cùng kết cấu mềm ẩm, hương cacao nhẹ và vị béo ngọt.', 'https://i.pinimg.com/736x/ad/7a/4b/ad7a4b0c0817a5fa76af3112c4d24207.jpg', 50000.00, '2025-12-23 01:30:00', NULL, 2),
(29, 'Bánh quy Matcha Trắng', 'Sự kết hợp giữa bơ sữa béo nhẹ và bột trà xanh matcha cao cấp thanh mát.', 'https://i.pinimg.com/1200x/02/d3/b2/02d3b20a6197406e59eecc357063ea83.jpg', 50000.00, '2025-12-23 01:30:00', NULL, 2),
(30, 'Bánh quy Socola Chip', 'Dòng bánh kinh điển với socola chip tan chảy xen kẽ trong lớp bánh mềm thơm.', 'https://i.pinimg.com/1200x/ae/19/d7/ae19d7bd2ac9624ee089e2f1de0a3835.jpg', 45000.00, '2025-12-23 01:30:00', NULL, 2),
(31, 'Bánh quy Turtle', 'Sự kết hợp phong phú giữa socola, caramel và các loại hạt rang giòn.', 'https://i.pinimg.com/1200x/69/1d/bb/691dbb1d1d2b10397986fb8ee9f20bd0.jpg', 55000.00, '2025-12-23 01:30:00', NULL, 2),
(32, 'Bánh quy nhân tan chảy', 'Vỏ mềm ẩm bên ngoài và phần nhân kem hoặc socola nóng chảy bên trong.', 'https://i.pinimg.com/1200x/13/18/42/1318422357d0fa63b1e914a596cbc62d.jpg', 60000.00, '2025-12-23 01:30:00', NULL, 2),
(33, 'Bánh Brookies', 'Sự kết hợp giữa brownie dẻo ẩm và bánh quy cookie giòn nhẹ.', 'https://i.pinimg.com/1200x/33/4c/f0/334cf08c90b6ad9886907ca00784f2d9.jpg', 55000.00, '2025-12-23 01:30:00', NULL, 2),
(34, 'Bánh quy Polvorones', 'Bánh quy truyền thống mềm mịn, tan ngay trong miệng, thơm vị bơ hạt.', 'https://i.pinimg.com/736x/04/84/63/04846371359b4cce3efa2760492ca888.jpg', 40000.00, '2025-12-23 01:30:00', NULL, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_reviews`
--

CREATE TABLE `product_reviews` (
  `order_item_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_reviews`
--

INSERT INTO `product_reviews` (`order_item_id`, `product_id`, `customer_id`, `rating`, `created_at`) VALUES
(1, 1, 16, 5, '2025-12-29 06:52:11'),
(2, 23, 16, 4, '2025-12-29 06:52:11'),
(3, 1, 16, 5, '2025-12-29 06:52:11'),
(4, 23, 16, 5, '2025-12-29 06:52:11'),
(5, 1, 16, 4, '2025-12-29 06:52:11'),
(6, 5, 16, 5, '2025-12-29 06:52:11'),
(24, 7, NULL, 4, '2025-12-29 06:52:11'),
(25, 8, NULL, 4, '2025-12-29 06:52:11'),
(26, 9, NULL, 4, '2025-12-29 06:52:11'),
(27, 10, NULL, 5, '2025-12-29 06:52:11'),
(28, 11, NULL, 5, '2025-12-29 06:52:11'),
(29, 1, NULL, 5, '2025-12-29 06:52:11'),
(30, 12, NULL, 5, '2025-12-29 06:52:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shippers`
--

CREATE TABLE `shippers` (
  `shipper_id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `shippers`
--

INSERT INTO `shippers` (`shipper_id`, `name`, `phone`, `email`, `status`, `salary`, `branch_id`, `password`) VALUES
(1, 'Vũ Tiến Dũng', '0911000101', 'dung.vu@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 1, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(2, 'Lương Văn Phúc', '0911000102', 'phuc.luong@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 1, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(3, 'Mai Anh Tuấn', '0911000103', 'tuan.mai@shipperhusbakery.vn', 'Đang hoạt động', 8100000.00, 1, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(4, 'Ngô Thị Lan', '0911000104', 'lan.ngo@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 1, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(5, 'Hà Văn Kiên', '0911000105', 'kien.ha@shipperhusbakery.vn', 'Đang hoạt động', 8200000.00, 1, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(6, 'Hoàng Văn Minh', '0912000201', 'minh.hoang@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 2, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(7, 'Nguyễn Đức Thắng', '0912000202', 'thang.nguyen@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 2, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(8, 'Bùi Văn Quân', '0912000203', 'quan.bui@shipperhusbakery.vn', 'Đang hoạt động', 8100000.00, 2, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(9, 'Lý Thị Phương', '0912000204', 'phuong.ly@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 2, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(10, 'Trịnh Văn Tài', '0912000205', 'tai.trinh@shipperhusbakery.vn', 'Đang hoạt động', 8200000.00, 2, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(11, 'Nguyễn Văn Bách', '0913000301', 'bach.nguyen@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 3, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(12, 'Lê Văn Duy', '0913000302', 'duy.le@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 3, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(13, 'Phạm Văn Cường', '0913000303', 'cuong.pham@shipperhusbakery.vn', 'Đang hoạt động', 8100000.00, 3, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(14, 'Hồ Thị Thanh', '0913000304', 'thanh.ho@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 3, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(15, 'Nguyễn Đình Trọng', '0913000305', 'trong.nguyen@shipperhusbakery.vn', 'Đang hoạt động', 8200000.00, 3, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(16, 'Đoàn Văn Hậu', '0914000401', 'hau.doan@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 4, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(17, 'Vũ Văn Thanh', '0914000402', 'thanh.vu@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 4, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(18, 'Trần Đình Trọng', '0914000403', 'trong.tran@shipperhusbakery.vn', 'Đang hoạt động', 8100000.00, 4, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(19, 'Lê Thị Diễm', '0914000404', 'diem.le@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 4, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(20, 'Nguyễn Quang Hải', '0914000405', 'hai.nguyen@shipperhusbakery.vn', 'Đang hoạt động', 8200000.00, 4, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(21, 'Bùi Tiến Dũng', '0915000501', 'dung.bui@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 5, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(22, 'Nguyễn Phong Hồng Duy', '0915000502', 'duy.nguyen@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 5, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(23, 'Phạm Đức Huy', '0915000503', 'huy.pham@shipperhusbakery.vn', 'Đang hoạt động', 8100000.00, 5, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(24, 'Trần Thị Thùy Trang', '0915000504', 'trang.tran@shipperhusbakery.vn', 'Đang hoạt động', 8000000.00, 5, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69'),
(25, 'Nguyễn Trọng Hoàng', '0915000505', 'hoang.nguyen@shipperhusbakery.vn', 'Đang hoạt động', 8200000.00, 5, 'scrypt:32768:8:1$a1u4m2Jyd8tidK4o$1b3ff103e5413deb65a1391b912880facb93124c8afa2618fdb3cada6e3216a35fc02eb6e534c8fe6b8d4ab5541a61869aa867842907e457218dac3aa4e40b69');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipper_notification`
--

CREATE TABLE `shipper_notification` (
  `id` int(11) NOT NULL,
  `shipper_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `shipper_notification`
--

INSERT INTO `shipper_notification` (`id`, `shipper_id`, `order_id`, `is_read`, `created_at`) VALUES
(1, 1, 1, 1, '2025-11-06 21:02:06'),
(2, 3, 2, 1, '2025-11-06 21:02:06'),
(3, 5, 3, 1, '2025-11-06 21:02:06'),
(4, 7, 4, 1, '2025-11-06 21:02:06'),
(5, 9, 5, 1, '2025-11-06 21:02:06'),
(6, 2, 6, 1, '2025-11-06 21:02:06'),
(7, 4, 7, 1, '2025-11-06 21:02:06'),
(8, 6, 8, 1, '2025-11-06 21:02:06'),
(9, 8, 9, 1, '2025-11-06 21:02:06'),
(10, 10, 10, 1, '2025-11-06 21:02:06'),
(11, 11, 11, 1, '2025-11-06 21:02:06'),
(12, 12, 12, 1, '2025-11-06 21:02:06'),
(13, 13, 13, 1, '2025-11-06 21:02:06'),
(14, 14, 14, 1, '2025-11-06 21:02:06'),
(15, 15, 15, 1, '2025-11-06 21:02:06'),
(16, 8, 101, 1, '2025-12-24 00:08:17'),
(17, 21, 102, 1, '2025-12-24 00:08:17'),
(18, 21, 103, 1, '2025-12-24 00:08:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipper_reviews`
--

CREATE TABLE `shipper_reviews` (
  `shipper_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `shipper_reviews`
--

INSERT INTO `shipper_reviews` (`shipper_id`, `customer_id`, `rating`, `created_at`, `order_id`) VALUES
(1, 1, 5, '2025-12-29 06:46:26', 1),
(3, 2, 5, '2025-12-29 06:46:26', 2),
(5, 3, 5, '2025-12-29 06:46:26', 3),
(7, 4, 4, '2025-12-29 06:46:26', 4),
(9, 5, 5, '2025-12-29 06:46:26', 5),
(2, 6, 4, '2025-12-29 06:46:26', 6),
(4, 7, 5, '2025-12-29 06:46:26', 7),
(6, 8, 4, '2025-12-29 06:46:26', 8),
(8, 9, 5, '2025-12-29 06:46:26', 9),
(10, 10, 5, '2025-12-29 06:46:26', 10),
(11, 11, 4, '2025-12-29 06:46:26', 11),
(12, 12, 5, '2025-12-29 06:46:26', 12),
(13, 13, 5, '2025-12-29 06:46:26', 13),
(14, 14, 4, '2025-12-29 06:46:26', 14),
(15, 15, 4, '2025-12-29 06:46:26', 15),
(8, 16, 5, '2025-12-29 06:46:26', 101),
(21, 16, 5, '2025-12-29 06:46:26', 102),
(21, 16, 4, '2025-12-29 06:46:26', 103);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`branch_id`),
  ADD UNIQUE KEY `manager_id` (`manager_id`);

--
-- Chỉ mục cho bảng `branch_products`
--
ALTER TABLE `branch_products`
  ADD PRIMARY KEY (`branch_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`customer_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Chỉ mục cho bảng `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`coupon_id`);

--
-- Chỉ mục cho bảng `coupons_customer`
--
ALTER TABLE `coupons_customer`
  ADD PRIMARY KEY (`coupon_id`,`customer_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `customer_notifications`
--
ALTER TABLE `customer_notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cust_noti_customer` (`customer_id`),
  ADD KEY `fk_cust_noti_order` (`order_id`);

--
-- Chỉ mục cho bảng `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Chỉ mục cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `fk_feedback_customer` (`customer_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `shipper_id` (`shipper_id`),
  ADD KEY `coupon_id` (`coupon_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_order_status_orders` (`order_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Chỉ mục cho bảng `shippers`
--
ALTER TABLE `shippers`
  ADD PRIMARY KEY (`shipper_id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Chỉ mục cho bảng `shipper_notification`
--
ALTER TABLE `shipper_notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_shipper` (`shipper_id`),
  ADD KEY `fk_order` (`order_id`);

--
-- Chỉ mục cho bảng `shipper_reviews`
--
ALTER TABLE `shipper_reviews`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `fk_review_shipper` (`shipper_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `branches`
--
ALTER TABLE `branches`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `coupons`
--
ALTER TABLE `coupons`
  MODIFY `coupon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `customer_notifications`
--
ALTER TABLE `customer_notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT cho bảng `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT cho bảng `shippers`
--
ALTER TABLE `shippers`
  MODIFY `shipper_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT cho bảng `shipper_notification`
--
ALTER TABLE `shipper_notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `branches`
--
ALTER TABLE `branches`
  ADD CONSTRAINT `fk_branches_manager` FOREIGN KEY (`manager_id`) REFERENCES `employees` (`employee_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `branch_products`
--
ALTER TABLE `branch_products`
  ADD CONSTRAINT `branch_products_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `branch_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `coupons_customer`
--
ALTER TABLE `coupons_customer`
  ADD CONSTRAINT `coupons_customer_ibfk_1` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `coupons_customer_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `customer_notifications`
--
ALTER TABLE `customer_notifications`
  ADD CONSTRAINT `fk_cust_noti_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cust_noti_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_feedback_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`shipper_id`) REFERENCES `shippers` (`shipper_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `order_status`
--
ALTER TABLE `order_status`
  ADD CONSTRAINT `fk_order_status_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `fk_prod_review_cust` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_prod_review_item` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`order_item_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `shippers`
--
ALTER TABLE `shippers`
  ADD CONSTRAINT `shippers_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `shipper_notification`
--
ALTER TABLE `shipper_notification`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_shipper` FOREIGN KEY (`shipper_id`) REFERENCES `shippers` (`shipper_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `shipper_reviews`
--
ALTER TABLE `shipper_reviews`
  ADD CONSTRAINT `fk_review_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_review_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_review_shipper` FOREIGN KEY (`shipper_id`) REFERENCES `shippers` (`shipper_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_shipper_review_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
