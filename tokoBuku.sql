-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 12, 2025 at 12:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
('65356249-60bd-4071-bdde-059cd7758e2d', 1, 'Admin', '0000000000', '09258f5d6d9914fec2bb18150476e1abc5fbac5d39f7313efd21cf6844603cd5');

-- --------------------------------------------------------

--
-- Table structure for table `alamats`
--

CREATE TABLE `alamats` (
  `id` int(10) UNSIGNED NOT NULL,
  `penggunas_id` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `utama` tinyint(4) NOT NULL,
  `kota` varchar(125) NOT NULL,
  `provinsi` varchar(125) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alamats`
--

INSERT INTO `alamats` (`id`, `penggunas_id`, `alamat`, `utama`, `kota`, `provinsi`) VALUES
(1, '65356249-60bd-4071-bdde-059cd7758e2d', 'Jl.', 0, 'KOTA BANJARMASIN', 'KALIMANTAN SELATAN');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `nama` varchar(125) NOT NULL,
  `foto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `kategoris`
--

CREATE TABLE `kategoris` (
  `id` int(11) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `tgl_hapus` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `keranjangs`
--

CREATE TABLE `keranjangs` (
  `penggunas_id` varchar(255) NOT NULL,
  `barangs_id` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mereks`
--

CREATE TABLE `mereks` (
  `id` int(11) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `tgl_hapus` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `tanggal` datetime NOT NULL DEFAULT current_timestamp(),
  `penggunas_id` varchar(255) NOT NULL,
  `alamat` tinytext NOT NULL,
  `bukti_pembayaran` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indexes for dumped tables
--

--
-- Indexes for table `alamats`
--
ALTER TABLE `alamats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_alamats_penggunas1_idx` (`penggunas_id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `barangs`
--
ALTER TABLE `barangs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kategoris`
--
ALTER TABLE `kategoris`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mereks`
--
ALTER TABLE `mereks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perans`
--
ALTER TABLE `perans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `statuss`
--
ALTER TABLE `statuss`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
