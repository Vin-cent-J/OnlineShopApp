-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tokoBuku
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tokoBuku` ;

-- -----------------------------------------------------
-- Schema tokoBuku
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tokoBuku` ;
USE `tokoBuku` ;

-- -----------------------------------------------------
-- Table `tokoBuku`.`perans`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tokoBuku`.`perans` ;

CREATE TABLE IF NOT EXISTS `tokoBuku`.`perans` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tokoBuku`.`penggunas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tokoBuku`.`penggunas` ;

CREATE TABLE IF NOT EXISTS `tokoBuku`.`penggunas` (
  `id` VARCHAR(255) NOT NULL,
  `perans_id` INT NOT NULL,
  `nama` VARCHAR(45) NOT NULL,
  `nomor_hp` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `alamat` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_penggunas_perans1_idx` (`perans_id` ASC)  ,
  CONSTRAINT `fk_penggunas_perans1`
    FOREIGN KEY (`perans_id`)
    REFERENCES `tokoBuku`.`perans` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tokoBuku`.`mereks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tokoBuku`.`mereks` ;

CREATE TABLE IF NOT EXISTS `tokoBuku`.`mereks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(45) NOT NULL,
  `tgl_hapus` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tokoBuku`.`kategoris`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tokoBuku`.`kategoris` ;

CREATE TABLE IF NOT EXISTS `tokoBuku`.`kategoris` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(45) NOT NULL,
  `tgl_hapus` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tokoBuku`.`barangs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tokoBuku`.`barangs` ;

CREATE TABLE IF NOT EXISTS `tokoBuku`.`barangs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nama` VARCHAR(45) NOT NULL,
  `stok` INT NOT NULL,
  `harga` DOUBLE NOT NULL,
  `foto` VARCHAR(255) NOT NULL,
  `mereks_id` INT NOT NULL,
  `kategoris_id` INT NOT NULL,
  `tgl_hapus` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_barangs_mereks1_idx` (`mereks_id` ASC)  ,
  INDEX `fk_barangs_kategoris1_idx` (`kategoris_id` ASC)  ,
  CONSTRAINT `fk_barangs_mereks1`
    FOREIGN KEY (`mereks_id`)
    REFERENCES `tokoBuku`.`mereks` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_barangs_kategoris1`
    FOREIGN KEY (`kategoris_id`)
    REFERENCES `tokoBuku`.`kategoris` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tokoBuku`.`keranjangs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tokoBuku`.`keranjangs` ;

CREATE TABLE IF NOT EXISTS `tokoBuku`.`keranjangs` (
  `penggunas_id` VARCHAR(255) NOT NULL,
  `barangs_id` INT NOT NULL,
  `jumlah` INT NOT NULL,
  PRIMARY KEY (`penggunas_id`, `barangs_id`),
  INDEX `fk_keranjangs_penggunas1_idx` (`penggunas_id` ASC)  ,
  INDEX `fk_keranjangs_barangs1_idx` (`barangs_id` ASC)  ,
  CONSTRAINT `fk_keranjangs_penggunas1`
    FOREIGN KEY (`penggunas_id`)
    REFERENCES `tokoBuku`.`penggunas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_keranjangs_barangs1`
    FOREIGN KEY (`barangs_id`)
    REFERENCES `tokoBuku`.`barangs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tokoBuku`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tokoBuku`.`orders` ;

CREATE TABLE IF NOT EXISTS `tokoBuku`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tanggal` DATETIME NOT NULL DEFAULT current_timestamp,
  `penggunas_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orders_penggunas1_idx` (`penggunas_id` ASC)  ,
  CONSTRAINT `fk_orders_penggunas1`
    FOREIGN KEY (`penggunas_id`)
    REFERENCES `tokoBuku`.`penggunas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tokoBuku`.`statuss`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tokoBuku`.`statuss` ;

CREATE TABLE IF NOT EXISTS `tokoBuku`.`statuss` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orders_id` INT NOT NULL,
  `tanggal` DATETIME NOT NULL DEFAULT current_timestamp,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_statuss_orders1_idx` (`orders_id` ASC)  ,
  CONSTRAINT `fk_statuss_orders1`
    FOREIGN KEY (`orders_id`)
    REFERENCES `tokoBuku`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tokoBuku`.`detail_orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tokoBuku`.`detail_orders` ;

CREATE TABLE IF NOT EXISTS `tokoBuku`.`detail_orders` (
  `orders_id` INT NOT NULL,
  `barangs_id` INT NOT NULL,
  `jumlah` INT NOT NULL,
  `harga` DOUBLE NOT NULL,
  PRIMARY KEY (`orders_id`, `barangs_id`),
  INDEX `fk_orders_has_barangs_barangs1_idx` (`barangs_id` ASC)  ,
  INDEX `fk_orders_has_barangs_orders1_idx` (`orders_id` ASC)  ,
  CONSTRAINT `fk_orders_has_barangs_orders1`
    FOREIGN KEY (`orders_id`)
    REFERENCES `tokoBuku`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_has_barangs_barangs1`
    FOREIGN KEY (`barangs_id`)
    REFERENCES `tokoBuku`.`barangs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
