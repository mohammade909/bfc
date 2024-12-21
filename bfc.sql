-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: bfc
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adminsettings`
--

DROP TABLE IF EXISTS `adminsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminsettings` (
  `setlevel` int NOT NULL DEFAULT '1',
  `setdirect` int DEFAULT '1',
  `setreward` int DEFAULT '1',
  `setregister` int DEFAULT '1',
  `setlogin` int DEFAULT '1',
  `setwithdrawal` int DEFAULT '1',
  `setdeposite` int DEFAULT '1',
  `setroi` int DEFAULT '1',
  `setsupport` int DEFAULT '1',
  `settopup` int DEFAULT '1',
  PRIMARY KEY (`setlevel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminsettings`
--

LOCK TABLES `adminsettings` WRITE;
/*!40000 ALTER TABLE `adminsettings` DISABLE KEYS */;
INSERT INTO `adminsettings` VALUES (1,1,1,1,1,1,1,1,1,1);
/*!40000 ALTER TABLE `adminsettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direct_transaction`
--

DROP TABLE IF EXISTS `direct_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direct_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `userby_id` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `percent` float DEFAULT NULL,
  `onamount` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direct_transaction`
--

LOCK TABLES `direct_transaction` WRITE;
/*!40000 ALTER TABLE `direct_transaction` DISABLE KEYS */;
INSERT INTO `direct_transaction` VALUES (1,2,50,3,'2024-10-15 06:42:34',5,1000),(2,2,500,4,'2024-10-15 06:43:32',5,10000),(3,2,500,5,'2024-10-15 06:46:13',5,10000),(4,2,500,6,'2024-10-15 07:28:38',5,10000),(5,2,500,7,'2024-10-15 07:29:22',5,10000);
/*!40000 ALTER TABLE `direct_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invest_level`
--

DROP TABLE IF EXISTS `invest_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invest_level` (
  `id` int NOT NULL AUTO_INCREMENT,
  `level_1` float DEFAULT '0',
  `level_2` float DEFAULT '0',
  `level_3` float DEFAULT '0',
  `level_4` float DEFAULT '0',
  `level_5` float DEFAULT '0',
  `level_6` float DEFAULT '0',
  `level_7` float DEFAULT '0',
  `level_8` float DEFAULT '0',
  `level_9` float DEFAULT '0',
  `level_10` float DEFAULT '0',
  `level_11` float DEFAULT '0',
  `level_12` float DEFAULT '0',
  `level_13` float DEFAULT '0',
  `level_14` float DEFAULT '0',
  `level_15` float DEFAULT '0',
  `level_16` float DEFAULT '0',
  `level_17` float DEFAULT '0',
  `level_18` float DEFAULT '0',
  `level_19` float DEFAULT '0',
  `level_20` float DEFAULT '0',
  `level_21` float DEFAULT '0',
  `level_22` float DEFAULT '0',
  `level_23` float DEFAULT '0',
  `level_24` float DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invest_level`
--

LOCK TABLES `invest_level` WRITE;
/*!40000 ALTER TABLE `invest_level` DISABLE KEYS */;
INSERT INTO `invest_level` VALUES (1,20,10,5,3,3,3,3,3,3,3,2,2,2,2,2,1,1,1,1,1,1,1,1,1);
/*!40000 ALTER TABLE `invest_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invest_level_transaction`
--

DROP TABLE IF EXISTS `invest_level_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invest_level_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `onamount` float DEFAULT NULL,
  `percent` float DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `userby_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invest_level_transaction`
--

LOCK TABLES `invest_level_transaction` WRITE;
/*!40000 ALTER TABLE `invest_level_transaction` DISABLE KEYS */;
INSERT INTO `invest_level_transaction` VALUES (1,2,0.334,'Level 1',1.67,20,'2024-10-15 07:34:14',3),(2,2,4.666,'Level 1',23.33,20,'2024-10-15 07:34:14',4),(3,2,4.666,'Level 1',23.33,20,'2024-10-15 07:34:14',5),(4,2,4.666,'Level 1',23.33,20,'2024-10-15 07:34:14',6),(5,2,4.666,'Level 1',23.33,20,'2024-10-15 07:34:14',7),(6,2,0.334,'Level 1',1.67,20,'2024-10-15 07:44:05',3),(7,2,4.666,'Level 1',23.33,20,'2024-10-15 07:44:05',4),(8,2,4.666,'Level 1',23.33,20,'2024-10-15 07:44:05',5),(9,2,4.666,'Level 1',23.33,20,'2024-10-15 07:44:05',6),(10,2,4.666,'Level 1',23.33,20,'2024-10-15 07:44:05',7);
/*!40000 ALTER TABLE `invest_level_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `monthly_price` float DEFAULT NULL,
  `description` text,
  `ROI_day` float DEFAULT NULL,
  `ROI_overall` float DEFAULT NULL,
  `Sponser_bonus` float DEFAULT NULL,
  `plan_period` int DEFAULT NULL,
  `max` int DEFAULT NULL,
  `min` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (1,'bronze',100,'Amount between 100 - 2999',5,5,5,24,2900,100),(2,'silver',3000,'Amount Between 3000 - 9999',6,6,5,24,9900,3000),(3,'golden',10000,'Amount Above 10000',7,7,5,24,NULL,10000),(4,'entry bot',25,NULL,0,0,0,24,25,25);
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qr`
--

DROP TABLE IF EXISTS `qr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` text,
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `accountNumber` int DEFAULT NULL,
  `ifscCode` varchar(255) DEFAULT NULL,
  `bankName` text,
  `bankAddress` text,
  `bankHolderAddress` varchar(255) DEFAULT NULL,
  `bankHolderName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf32 COMMENT='\n  metaContact: ''lkm''';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr`
--

LOCK TABLES `qr` WRITE;
/*!40000 ALTER TABLE `qr` DISABLE KEYS */;
INSERT INTO `qr` VALUES (5,'www.whatsapp.com','2024-09-02 09:47:59',852963741,'bhl841','v bjnk','jk','mkj','kjml');
/*!40000 ALTER TABLE `qr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reward_transaction`
--

DROP TABLE IF EXISTS `reward_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reward_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT '0',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reward_transaction`
--

LOCK TABLES `reward_transaction` WRITE;
/*!40000 ALTER TABLE `reward_transaction` DISABLE KEYS */;
INSERT INTO `reward_transaction` VALUES (1,304,30,'2024-10-14 12:31:34'),(2,323,300,'2024-10-14 17:07:10'),(3,2,30,'2024-10-15 07:46:17'),(4,2,120,'2024-10-15 07:50:05');
/*!40000 ALTER TABLE `reward_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roi_transaction`
--

DROP TABLE IF EXISTS `roi_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roi_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `onamount` float DEFAULT NULL,
  `percent` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roi_transaction`
--

LOCK TABLES `roi_transaction` WRITE;
/*!40000 ALTER TABLE `roi_transaction` DISABLE KEYS */;
INSERT INTO `roi_transaction` VALUES (1,2,1.83333,'ROI','2024-10-15 07:22:42',1000,5),(2,3,1.66667,'ROI','2024-10-15 07:22:42',1000,5),(3,4,23.3333,'ROI','2024-10-15 07:22:42',10000,7),(4,5,23.3333,'ROI','2024-10-15 07:22:42',10000,7),(5,2,2,'ROI','2024-10-15 07:30:21',1000,5),(6,3,1.66667,'ROI','2024-10-15 07:30:21',1000,5),(7,4,23.3333,'ROI','2024-10-15 07:30:21',10000,7),(8,5,23.3333,'ROI','2024-10-15 07:30:21',10000,7),(9,6,23.3333,'ROI','2024-10-15 07:30:21',10000,7),(10,7,23.3333,'ROI','2024-10-15 07:30:21',10000,7),(11,2,2,'ROI','2024-10-15 07:40:33',1000,5),(12,3,1.66667,'ROI','2024-10-15 07:40:33',1000,5),(13,4,23.3333,'ROI','2024-10-15 07:40:33',10000,7),(14,5,23.3333,'ROI','2024-10-15 07:40:33',10000,7),(15,6,23.3333,'ROI','2024-10-15 07:40:33',10000,7),(16,7,23.3333,'ROI','2024-10-15 07:40:33',10000,7),(17,2,2,'ROI','2024-10-15 07:44:03',1000,5),(18,3,1.66667,'ROI','2024-10-15 07:44:03',1000,5),(19,4,23.3333,'ROI','2024-10-15 07:44:03',10000,7),(20,5,23.3333,'ROI','2024-10-15 07:44:03',10000,7),(21,6,23.3333,'ROI','2024-10-15 07:44:03',10000,7),(22,7,23.3333,'ROI','2024-10-15 07:44:03',10000,7);
/*!40000 ALTER TABLE `roi_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support`
--

DROP TABLE IF EXISTS `support`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `support` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `title` text,
  `message` text,
  `status` varchar(10) DEFAULT 'pending',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support`
--

LOCK TABLES `support` WRITE;
/*!40000 ALTER TABLE `support` DISABLE KEYS */;
/*!40000 ALTER TABLE `support` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topup`
--

DROP TABLE IF EXISTS `topup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userby_id` int DEFAULT NULL,
  `userto_id` int DEFAULT NULL,
  `amount` float DEFAULT '0',
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(45) DEFAULT 'complete',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topup`
--

LOCK TABLES `topup` WRITE;
/*!40000 ALTER TABLE `topup` DISABLE KEYS */;
INSERT INTO `topup` VALUES (1,2,2,1000,'2024-10-15 06:34:27','complete'),(2,3,3,1000,'2024-10-15 06:42:34','complete'),(3,4,4,10000,'2024-10-15 06:43:32','complete'),(4,5,5,10000,'2024-10-15 06:46:13','complete'),(5,6,6,10000,'2024-10-15 07:28:38','complete'),(6,7,7,10000,'2024-10-15 07:29:22','complete');
/*!40000 ALTER TABLE `topup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_deposite`
--

DROP TABLE IF EXISTS `user_deposite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_deposite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `status` varchar(10) DEFAULT 'pending',
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image_name` text,
  `currency` varchar(45) DEFAULT NULL,
  `acceptat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_deposite`
--

LOCK TABLES `user_deposite` WRITE;
/*!40000 ALTER TABLE `user_deposite` DISABLE KEYS */;
INSERT INTO `user_deposite` VALUES (1,2,1025,'TRN-ADM002','2024-10-15 06:33:55',NULL,NULL,'2024-10-15 02:33:55'),(2,3,1025,'TRN-ADM002','2024-10-15 06:40:21',NULL,NULL,'2024-10-15 02:40:21'),(3,4,10025,'TRN-ADM002','2024-10-15 06:41:16',NULL,NULL,'2024-10-15 02:41:16'),(4,5,10025,'TRN-ADM002','2024-10-15 06:44:58',NULL,NULL,'2024-10-15 02:44:58'),(5,6,10025,'TRN-ADM002','2024-10-15 06:45:14',NULL,NULL,'2024-10-15 02:45:14'),(6,7,10025,'TRN-ADM002','2024-10-15 06:45:26',NULL,NULL,'2024-10-15 02:45:26');
/*!40000 ALTER TABLE `user_deposite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `fullname` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `address` text,
  `phone` bigint DEFAULT NULL,
  `role` varchar(10) DEFAULT 'user',
  `status` varchar(10) DEFAULT 'unblock',
  `is_active` varchar(10) DEFAULT 'inactive',
  `reffer_by` varchar(45) DEFAULT NULL,
  `refferal_code` varchar(45) DEFAULT NULL,
  `total_team` varchar(45) DEFAULT '0',
  `plan_id` int DEFAULT '0',
  `active_plan` float DEFAULT '0',
  `business` float DEFAULT '0',
  `direct_income` float DEFAULT '0',
  `roi_day` float DEFAULT '0',
  `roi_income` float DEFAULT '0',
  `invesmetn_level_income` float DEFAULT '0',
  `investment_month` float DEFAULT '0',
  `reward` float DEFAULT '0',
  `reward_level` int DEFAULT '0',
  `updated_at` varchar(45) DEFAULT NULL,
  `activation_date` varchar(20) DEFAULT NULL,
  `last_login` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `reward_start_date` date DEFAULT NULL,
  `reward_duration` int DEFAULT '0',
  `reward_remaining_months` int DEFAULT '0',
  `compound` float DEFAULT '0',
  `wallet` float DEFAULT NULL,
  `compound_date` date DEFAULT NULL,
  `entry_fees` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin@gmail.com','123','kurukshetra',9729123456,'admin','unblock','inactive',NULL,'abcdef01','0',0,0,0,0,0,0,0,3.776,0,0,NULL,NULL,'2024-10-15 02:38:09','2024-08-30 06:11:26',NULL,0,0,0,3.776,NULL,0),(2,'a',NULL,'a@gmail.com','12345678',NULL,NULL,'user','unblock','active',NULL,'4029DA74','5',1,1000,0,2050,2,7.83,18.998,37.996,120,3,NULL,'2024-10-15 02:34:27','2024-10-15 03:31:00','2024-10-15 06:14:53',NULL,1,1,0,2215.83,NULL,25),(3,'a1',NULL,'v1@gmail.com','11111111',NULL,NULL,'user','unblock','active','4029DA74','F57E5295','1',1,1000,0,0,1.67,6.68,0,0,0,0,NULL,'2024-10-15 02:42:34','2024-10-15 02:47:32','2024-10-15 06:36:22',NULL,0,0,0,6.68,NULL,25),(4,'v2',NULL,'v2@gmail.com','11111111',NULL,NULL,'user','unblock','active','4029DA74','BEAA4D7D','0',3,10000,0,0,23.33,93.32,0,0,0,0,NULL,'2024-10-15 02:43:32','2024-10-15 02:42:52','2024-10-15 06:36:59',NULL,0,0,0,93.32,NULL,25),(5,'v3',NULL,'v3@gmail.com','11111111',NULL,NULL,'user','unblock','active','4029DA74','62F39EC4','0',3,10000,0,0,23.33,93.32,0,0,0,0,NULL,'2024-10-15 02:46:13','2024-10-15 03:27:52','2024-10-15 06:37:42',NULL,0,0,0,93.32,NULL,25),(6,'v4',NULL,'v4@gmail.com','11111111',NULL,NULL,'user','unblock','active','4029DA74','BC2E2738','0',3,10000,0,0,23.33,69.99,0,0,0,0,NULL,'2024-10-15 03:28:38','2024-10-15 03:28:12','2024-10-15 06:38:17',NULL,0,0,0,69.99,NULL,25),(7,'v5',NULL,'v5@gmail.com','11111111',NULL,NULL,'user','unblock','active','4029DA74','7673BEA2','0',3,10000,0,0,23.33,69.99,0,0,0,0,NULL,'2024-10-15 03:29:22','2024-10-15 03:28:52','2024-10-15 06:38:56',NULL,0,0,0,69.99,NULL,25),(8,'q1',NULL,'q1@gmail.com','01234@Test',NULL,NULL,'user','unblock','inactive','F57E5295','33CB0C91','1',0,0,0,0,0,0,0,0,0,0,NULL,NULL,'2024-10-15 03:30:53','2024-10-15 06:43:11',NULL,0,0,0,0,NULL,0),(9,'q2',NULL,'q2@gmail.com','01234@Test',NULL,NULL,'user','unblock','inactive','33CB0C91','6BA31BCA','1',0,0,0,0,0,0,0,0,0,0,NULL,NULL,'2024-10-15 02:44:22','2024-10-15 06:44:07',NULL,0,0,0,0,NULL,0),(10,'q3',NULL,'q3@gmail.com','01234@Test',NULL,NULL,'user','unblock','inactive','6BA31BCA','AACD0739','1',0,0,0,0,0,0,0,0,0,0,NULL,NULL,'2024-10-15 02:45:06','2024-10-15 06:44:51',NULL,0,0,0,0,NULL,0),(11,'q4',NULL,'q4@gmail.com','01234@Test',NULL,NULL,'user','unblock','inactive','AACD0739','A03C368B','1',0,0,0,0,0,0,0,0,0,0,NULL,NULL,'2024-10-15 02:45:47','2024-10-15 06:45:34',NULL,0,0,0,0,NULL,0),(12,'q5',NULL,'q5@gmail.com','01234@Test',NULL,NULL,'user','unblock','inactive','A03C368B','5F9A635A','1',0,0,0,0,0,0,0,0,0,0,NULL,NULL,'2024-10-15 02:46:29','2024-10-15 06:46:17',NULL,0,0,0,0,NULL,0),(13,'q6',NULL,'q6@gmail.com','01234@Test',NULL,NULL,'user','unblock','inactive','5F9A635A','A6812FF5','1',0,0,0,0,0,0,0,0,0,0,NULL,NULL,'2024-10-15 02:47:17','2024-10-15 06:47:02',NULL,0,0,0,0,NULL,0),(14,'q7',NULL,'q7@gmail.com','01234@Test',NULL,NULL,'user','unblock','inactive','A6812FF5','9A4A9AFE','0',0,0,0,0,0,0,0,0,0,0,NULL,NULL,'2024-10-15 02:47:58','2024-10-15 06:47:46',NULL,0,0,0,0,NULL,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_wallet` BEFORE UPDATE ON `users` FOR EACH ROW BEGIN
    SET NEW.wallet = NEW.business + NEW.direct_income + NEW.roi_income + NEW.investment_month + NEW.reward;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `withdrawal_request`
--

DROP TABLE IF EXISTS `withdrawal_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdrawal_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `status` varchar(45) DEFAULT 'pending',
  `createdAT` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `acceptat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawal_request`
--

LOCK TABLES `withdrawal_request` WRITE;
/*!40000 ALTER TABLE `withdrawal_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `withdrawal_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-15 14:43:06
