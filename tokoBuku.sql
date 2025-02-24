-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 24, 2025 at 12:57 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tokoBuku`
--

-- --------------------------------------------------------

--
-- Table structure for table `alamats`
--

CREATE TABLE `alamats` (
  `id` int(10) UNSIGNED NOT NULL,
  `penggunas_id` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `utama` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alamats`
--

INSERT INTO `alamats` (`id`, `penggunas_id`, `alamat`, `utama`) VALUES
(1, '00bea19c-048b-4ced-bf57-135d7f11cb33', 'Jl. Test', 0);

-- --------------------------------------------------------

--
-- Table structure for table `barangs`
--

CREATE TABLE `barangs` (
  `id` int(11) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `stok` int(11) NOT NULL,
  `harga` double NOT NULL,
  `deskripsi` text NOT NULL,
  `foto` varchar(255) NOT NULL,
  `mereks_id` int(11) NOT NULL,
  `kategoris_id` int(11) NOT NULL,
  `tgl_hapus` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barangs`
--

INSERT INTO `barangs` (`id`, `nama`, `stok`, `harga`, `deskripsi`, `foto`, `mereks_id`, `kategoris_id`, `tgl_hapus`) VALUES
(1, 'Faber-Castell Gel Pen', 100, 15000, 'Pulpen Faber-Castell', 'Faber-Castell Gel Pen_1737447409143.jpg', 1, 1, NULL),
(3, 'Pilot G2 Pen', 150, 12000, '', 'pilot_g2_pen.jpg', 3, 1, NULL),
(4, 'BIC Round Stic Pen', 300, 8000, '', 'bic_round_stic_pen.jpg', 3, 1, NULL),
(5, 'Sharpie Permanent Marker', 250, 20000, '', 'sharpie_permanent_marker.jpg', 3, 1, NULL),
(6, 'Faber-Castell Colored Pencils', 120, 35000, '', 'faber_castell_colored_pencils.jpg', 1, 1, NULL),
(7, 'Staedtler Eraser', 500, 5000, '', 'staedtler_eraser.jpg', 2, 1, NULL),
(8, 'Pilot Marker Pen', 180, 22000, '', 'pilot_marker_pen.jpg', 3, 1, NULL),
(9, 'Test 1', 1, 10000, '', 'test', 4, 1, '2024-12-19 14:19:13'),
(10, 'Test2', 10, 10, '', 'Test2_1735803759092.jpg', 5, 3, NULL),
(11, 'Test3', 10, 10, '', '1735458560676.jpg', 4, 3, NULL),
(12, 'test4', 0, 0, '', 'test4_1735458969783.jpg', 5, 3, NULL),
(13, 'Test5', 10000, 10000, '', 'Test5_1735459565909.jpg', 5, 3, NULL),
(14, 'Test6', 0, 0, '', 'Test6_1735459658869.jpg', 5, 3, NULL),
(15, 'Test7', 0, 0, '', 'Test7_1735459887505.jpg', 5, 3, NULL),
(16, 'Test8', 0, 0, '', 'Test8_1735460061985.jpg', 5, 3, NULL),
(17, 'Test9', 0, 0, '', 'Test9_1735460161394.jpg', 5, 3, NULL),
(18, 'Test10', 0, 0, '', 'Test10_1735460341349.jpg', 5, 3, NULL),
(19, 'Test11', 0, 0, '', 'Test11_1735463682578.jpg', 5, 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `detail_orders`
--

CREATE TABLE `detail_orders` (
  `orders_id` int(11) NOT NULL,
  `barangs_id` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_orders`
--

INSERT INTO `detail_orders` (`orders_id`, `barangs_id`, `jumlah`, `harga`) VALUES
(7, 10, 3, 10),
(8, 1, 3, 15000),
(8, 6, 1, 35000),
(9, 10, 4, 10),
(10, 6, 1, 35000),
(11, 1, 1, 15000),
(12, 1, 1, 15000),
(13, 6, 1, 35000);

-- --------------------------------------------------------

--
-- Table structure for table `kategoris`
--

CREATE TABLE `kategoris` (
  `id` int(11) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `tgl_hapus` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategoris`
--

INSERT INTO `kategoris` (`id`, `nama`, `tgl_hapus`) VALUES
(1, 'Alat tulis', NULL),
(2, 'Buku', NULL),
(3, 'Kertas', NULL),
(4, 'Test', '2024-12-19 08:41:20'),
(5, 'Test1', '2024-12-19 14:17:03');

-- --------------------------------------------------------

--
-- Table structure for table `keranjangs`
--

CREATE TABLE `keranjangs` (
  `penggunas_id` varchar(255) NOT NULL,
  `barangs_id` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `keranjangs`
--

INSERT INTO `keranjangs` (`penggunas_id`, `barangs_id`, `jumlah`) VALUES
('7b8faa9d-b7ef-445c-9845-3fb07748ef83', 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `mereks`
--

CREATE TABLE `mereks` (
  `id` int(11) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `tgl_hapus` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mereks`
--

INSERT INTO `mereks` (`id`, `nama`, `tgl_hapus`) VALUES
(1, 'Faber-Castell', NULL),
(2, 'Staedtler', NULL),
(3, 'Pilot', NULL),
(4, 'Tiki', NULL),
(5, 'Dunia', NULL),
(6, 'Test 2', '2024-12-19 14:29:02');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL DEFAULT current_timestamp(),
  `penggunas_id` varchar(255) NOT NULL,
  `alamat` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `tanggal`, `penggunas_id`, `alamat`) VALUES
(4, '2025-01-02 09:42:58', '7b8faa9d-b7ef-445c-9845-3fb07748ef83', 'Test'),
(5, '2025-01-02 10:14:20', '7b8faa9d-b7ef-445c-9845-3fb07748ef83', 'Test'),
(6, '2025-01-02 10:21:09', '7b8faa9d-b7ef-445c-9845-3fb07748ef83', 'Test'),
(7, '2025-01-02 11:26:51', '7b8faa9d-b7ef-445c-9845-3fb07748ef83', 'Test'),
(8, '2025-01-10 18:10:38', '7b8faa9d-b7ef-445c-9845-3fb07748ef83', 'Test'),
(9, '2025-01-11 09:00:31', '7b8faa9d-b7ef-445c-9845-3fb07748ef83', 'Test'),
(10, '2025-01-23 16:40:44', '00bea19c-048b-4ced-bf57-135d7f11cb33', 'Test'),
(11, '2025-01-23 16:47:00', '00bea19c-048b-4ced-bf57-135d7f11cb33', 'Test'),
(12, '2025-02-23 08:14:56', '00bea19c-048b-4ced-bf57-135d7f11cb33', 'null'),
(13, '2025-02-23 08:21:31', '00bea19c-048b-4ced-bf57-135d7f11cb33', 'Jl. Test');

-- --------------------------------------------------------

--
-- Table structure for table `penggunas`
--

CREATE TABLE `penggunas` (
  `id` varchar(255) NOT NULL,
  `perans_id` int(11) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `nomor_hp` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penggunas`
--

INSERT INTO `penggunas` (`id`, `perans_id`, `nama`, `nomor_hp`, `password`) VALUES
('00bea19c-048b-4ced-bf57-135d7f11cb33', 2, 'Test2', '12345678910', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'),
('7b8faa9d-b7ef-445c-9845-3fb07748ef83', 2, 'Test3', '1234567890', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f');

-- --------------------------------------------------------

--
-- Table structure for table `perans`
--

CREATE TABLE `perans` (
  `id` int(11) NOT NULL,
  `nama` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `perans`
--

INSERT INTO `perans` (`id`, `nama`) VALUES
(1, 'Admin'),
(2, 'Customer');

-- --------------------------------------------------------

--
-- Table structure for table `statuss`
--

CREATE TABLE `statuss` (
  `id` int(11) NOT NULL,
  `orders_id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `statuss`
--

INSERT INTO `statuss` (`id`, `orders_id`, `tanggal`, `status`) VALUES
(1, 4, '2025-01-10 18:15:17', 'Dibatalkan'),
(2, 5, '2025-01-10 18:17:26', 'Dibatalkan'),
(3, 6, '2025-01-02 16:21:09', 'Diproses'),
(4, 7, '2025-01-02 14:22:20', 'Sudah Sampai Tujuan'),
(5, 8, '2025-01-11 00:10:38', 'Diproses'),
(6, 9, '2025-01-11 15:00:31', 'Menunggu Pembayaran'),
(7, 10, '2025-01-23 22:40:44', 'Menunggu Pembayaran'),
(8, 11, '2025-01-23 22:47:00', 'Menunggu Pembayaran'),
(9, 12, '2025-02-23 15:14:56', 'Menunggu Pembayaran'),
(10, 13, '2025-02-23 15:21:31', 'Menunggu Pembayaran');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alamats`
--
ALTER TABLE `alamats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_alamats_penggunas1_idx` (`penggunas_id`);

--
-- Indexes for table `barangs`
--
ALTER TABLE `barangs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_barangs_mereks1_idx` (`mereks_id`),
  ADD KEY `fk_barangs_kategoris1_idx` (`kategoris_id`);

--
-- Indexes for table `detail_orders`
--
ALTER TABLE `detail_orders`
  ADD PRIMARY KEY (`orders_id`,`barangs_id`),
  ADD KEY `fk_orders_has_barangs_barangs1_idx` (`barangs_id`),
  ADD KEY `fk_orders_has_barangs_orders1_idx` (`orders_id`);

--
-- Indexes for table `kategoris`
--
ALTER TABLE `kategoris`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `keranjangs`
--
ALTER TABLE `keranjangs`
  ADD PRIMARY KEY (`penggunas_id`,`barangs_id`),
  ADD KEY `fk_keranjangs_penggunas1_idx` (`penggunas_id`),
  ADD KEY `fk_keranjangs_barangs1_idx` (`barangs_id`);

--
-- Indexes for table `mereks`
--
ALTER TABLE `mereks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_penggunas1_idx` (`penggunas_id`);

--
-- Indexes for table `penggunas`
--
ALTER TABLE `penggunas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nomor_hp` (`nomor_hp`),
  ADD KEY `fk_penggunas_perans1_idx` (`perans_id`);

--
-- Indexes for table `perans`
--
ALTER TABLE `perans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statuss`
--
ALTER TABLE `statuss`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_statuss_orders1_idx` (`orders_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alamats`
--
ALTER TABLE `alamats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `barangs`
--
ALTER TABLE `barangs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `kategoris`
--
ALTER TABLE `kategoris`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mereks`
--
ALTER TABLE `mereks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `perans`
--
ALTER TABLE `perans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `statuss`
--
ALTER TABLE `statuss`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alamats`
--
ALTER TABLE `alamats`
  ADD CONSTRAINT `fk_alamats_penggunas1` FOREIGN KEY (`penggunas_id`) REFERENCES `penggunas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
