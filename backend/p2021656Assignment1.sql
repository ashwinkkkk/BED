CREATE DATABASE  IF NOT EXISTS `sp_movie` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sp_movie`;
-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: sp_movie
-- ------------------------------------------------------
-- Server version	8.0.24

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
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `genreid` int NOT NULL AUTO_INCREMENT,
  `genre` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`genreid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (4,'comedy','Will make you laugh out loud'),(5,'horror','Very scary to watch'),(6,'Science fiction','Science fiction is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms and alien worlds'),(7,'drama','narrative fiction'),(8,'animation','animated films'),(9,'adventure','Plots feature elements of travel'),(10,'documentary','Non fictional motion-picture');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genrelisting`
--

DROP TABLE IF EXISTS `genrelisting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genrelisting` (
  `id` int NOT NULL AUTO_INCREMENT,
  `genre_id` int NOT NULL,
  `movie_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_genre_id_idx` (`genre_id`),
  KEY `fk_movie_id_idx` (`movie_id`),
  CONSTRAINT `fk_genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genreid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genrelisting`
--

LOCK TABLES `genrelisting` WRITE;
/*!40000 ALTER TABLE `genrelisting` DISABLE KEYS */;
INSERT INTO `genrelisting` VALUES (87,4,48),(88,9,48),(91,5,50),(92,9,50),(93,6,50),(94,6,51),(95,7,52),(96,10,52),(97,4,53),(98,8,53);
/*!40000 ALTER TABLE `genrelisting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movieid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `cast` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `opening_date` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`movieid`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (48,'shazam','After being abandoned at a fair, Billy constantly searches for his mother. His life, however, takes a huge turn when he inherits the superpowers of a powerful wizard.','Zachary Levi, asher angel, jack dylan, mark strong','132 mins','9 july 2021','2021-07-03 04:24:29'),(50,'The empty man','On the trail of a missing girl, an ex-cop comes across a secretive group attempting to summon a terrifying supernatural entity.','James badge dale, marin ireland, stephan root','132 mins','9 july 2021','2021-07-03 04:38:40'),(51,'Space sweepsrs','Searching for a person in space','Song joong ki, Richard armitage','167 mins','15 july 2021','2021-07-03 05:07:27'),(52,'To the lake','Faced with a terrifying virus that turns Moscow into a city of the dead, survivors set off on a long, dangerous journey north to find an isolated hunting lodge on a deserted island.','Victoria agalakova, maryana spivak','200 mins','11 july 2021','2021-07-03 05:10:10'),(53,'scoob','Shaggy and Scooby learn that Dick Dastardly, a villain, is out to capture Scooby.','Frank walker, amanda seyfried, ken jeong','190 mins','12 july 2021','2021-07-03 05:12:42');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `movieid` int NOT NULL,
  `userid` int NOT NULL,
  `rating` int NOT NULL,
  `review` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `fk_movieid_idx` (`movieid`),
  KEY `fk_userid_idx` (`userid`),
  CONSTRAINT `fk_movieid` FOREIGN KEY (`movieid`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (8,50,34,5,'very interesting to watch','2021-07-03 06:05:32'),(9,48,32,4,'It was a visual treat','2021-07-03 06:06:42'),(10,53,35,4,'Made me laugh out loud!','2021-07-03 06:07:22'),(11,53,38,4,'One of the best scooby do movies','2021-07-03 06:08:02'),(12,51,37,5,'The space sweeper helped me learn more about the spack','2021-07-03 06:09:40');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screening`
--

DROP TABLE IF EXISTS `screening`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screening` (
  `screeningid` int NOT NULL AUTO_INCREMENT,
  `movieid` int NOT NULL,
  `screeningslot` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`screeningid`),
  KEY `fk_movieid_idx` (`movieid`),
  CONSTRAINT `fk_movie_id_screening_table` FOREIGN KEY (`movieid`) REFERENCES `movie` (`movieid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screening`
--

LOCK TABLES `screening` WRITE;
/*!40000 ALTER TABLE `screening` DISABLE KEYS */;
INSERT INTO `screening` VALUES (15,48,'15 july 2021 6:00pm to 9:00pm','2021-07-03 06:15:36'),(16,50,'15 july 2021 6:00pm to 9:00pm','2021-07-03 09:30:04'),(19,51,'15 july 2021 9:00pm to 12:00am','2021-07-03 09:49:35'),(20,51,'15 july 2021 12am to 3:00am','2021-07-03 09:49:59'),(21,52,'16 july 2021 12am to 3:00am','2021-07-03 09:50:10');
/*!40000 ALTER TABLE `screening` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` int NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `profile_pic_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (32,'John sim','johnsim@gmail.com',89419141,'johnjohn','Customer','https://www.abc.com/john.jpg','2021-07-02 17:20:33'),(33,'Chad thunder','chadthunder@gmail.com',91827064,'1qwert$#@!','Customer','https://chad.com/chad.jpg','2021-07-02 17:20:51'),(34,'ryan tan','ryantan@gmail.com',810143054,'password123','Customer','https://ryan.com/ryan.jpg','2021-07-02 17:20:57'),(35,'michelle','michelle@gmail.com',97594259,'michelle321','Customer','https://bob.com/bob.jpg','2021-07-02 17:21:29'),(36,'mathew soh','mathewsoh@gmail.com',85596233,'admin123!','Customer','https://mathew.com/mathew.jpg','2021-07-02 17:22:33'),(37,'javier','javier23@gmail.com',95594221,'javier321','Customer','https://acb.com/javier.jpg','2021-07-02 17:23:39'),(38,'bruce lee','brucelee@gmail.com',86594259,'root123','Customer','https://acb.com/brucelee.jpg','2021-07-02 17:24:37');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-04 11:18:53
