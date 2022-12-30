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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (4,'comedy','Will make you laugh out loud'),(5,'horror','Scary'),(6,'Science fiction','Science fiction is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms and alien worlds'),(7,'drama','narrative fiction'),(8,'animation','animated films'),(9,'adventure','Plots feature elements of travel'),(10,'documentary','Non fictional motion-picture'),(11,'rom com','romance and comedy'),(16,'Action','Full of action and fights'),(17,'Crime','Watch criminals and their mind!'),(18,'War','World war 2 and world war 1'),(19,'gangster','Gangwars and fightings');
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
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genrelisting`
--

LOCK TABLES `genrelisting` WRITE;
/*!40000 ALTER TABLE `genrelisting` DISABLE KEYS */;
INSERT INTO `genrelisting` VALUES (91,5,50),(92,9,50),(93,6,50),(94,6,51),(97,4,53),(98,8,53),(102,4,55),(103,4,56),(119,5,89),(164,5,110),(165,6,110),(166,9,110),(167,16,110),(172,7,112),(173,9,112),(174,10,112),(175,18,112),(222,4,48),(223,6,48),(224,8,48),(225,5,109),(226,6,109),(227,7,113),(228,9,113),(229,10,113),(230,16,113),(231,19,113),(232,7,111),(233,9,111),(234,10,111),(235,17,111),(236,18,111);
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
  PRIMARY KEY (`movieid`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (48,'shazam','Steve will do it. steve will save the world','steve, kyle, jesse, salim','155 mins','2021-08-26','2021-07-03 04:24:29'),(50,'The empty man','On the trail of a missing girl, an ex-cop comes across a secretive group attempting to summon a terrifying supernatural entity.','James badge dale, marin ireland, stephan root','132 mins','9 july 2021','2021-07-03 04:38:40'),(51,'Space sweepers','Searching for a person in space','Song joong ki, Richard armitage','167 mins','15 july 2021','2021-07-03 05:07:27'),(53,'scoob','Shaggy and Scooby learn that Dick Dastardly, a villain, is out to capture Scooby.','Frank walker, amanda seyfried, ken jeong','190 mins','12 july 2021','2021-07-03 05:12:42'),(55,'king kong','King kong fights','gorilla, derrek','268 mins','2021-08-10','2021-07-28 08:47:13'),(56,'Robot invasion','Robots invade singapore','Big robot','199 mins','13 july 2021','2021-07-28 08:48:33'),(89,'The turning','The Turning is a 2020 American supernatural horror film directed by Floria Sigismondi and written by Carey W. Hayes and Chad Hayes.','John, mary, lisa','155 mins','2021-07-30','2021-07-30 14:56:44'),(109,'conjuring','All about ghosts haunting','ghost1, annabelle','111 mins','2021-08-27','2021-08-02 09:20:48'),(110,'Jaws','Sharks take over the world!','Shark, ben, mark','122 mins','2021-08-18','2021-08-02 09:27:08'),(111,'the little things','Learn about hte little things','dom, torrento','222 mins','2021-08-04','2021-08-02 09:29:34'),(112,'patton','A movie about tom in world war 2','josh, simon, minmeter','289 mins','2021-08-04','2021-08-02 09:31:49'),(113,'American gangster','How john rises to the top','john, peter, roy','112 mins','2021-08-18','2021-08-02 09:33:27');
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
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (38,55,32,3,'Must watch!','2021-07-29 12:20:26'),(42,56,32,5,'bruh','2021-07-29 15:03:27'),(43,89,32,4,'very scary!','2021-07-30 15:02:09'),(47,48,32,4,'zamzam shazam HAHAH','2021-08-01 04:00:21'),(48,51,32,4,'Space sweeeping','2021-08-01 04:01:43'),(49,48,34,1,'horrendous movie!','2021-08-01 07:18:24'),(50,55,34,4,'Not badd','2021-08-01 07:19:40'),(52,113,34,5,'Nice film about gangsters','2021-08-02 09:35:31'),(53,109,34,4,'Scariest movie ever','2021-08-02 09:36:27'),(54,110,34,4,'I like sharks','2021-08-02 09:36:39'),(55,112,34,5,'Inspired me to fight for the nation.','2021-08-02 09:37:15'),(56,56,34,5,'Big fan of transformers now','2021-08-02 09:37:38'),(57,53,34,4,'Scoob the dog is cute','2021-08-02 09:38:03'),(58,51,34,4,'I like going to space','2021-08-02 09:38:33'),(59,50,34,3,'This made me feel empty','2021-08-02 09:42:00'),(60,111,34,5,'Nothing is stronger than family','2021-08-02 09:42:15'),(61,89,34,4,'Horrifying','2021-08-02 09:42:29'),(62,109,32,5,'Good plot twist','2021-08-02 09:47:03'),(63,109,33,5,'Terrifying ','2021-08-02 09:48:44'),(64,55,33,1,'Very lame movie, would not recommend watching','2021-08-02 09:49:31'),(65,56,33,5,'Nice','2021-08-02 09:49:56'),(66,48,33,2,'1st half was decent, 2nd half was beyond bad!','2021-08-02 09:50:26'),(67,109,38,5,'Reccomend this movie alot','2021-08-02 09:51:09'),(68,55,38,2,'just bad','2021-08-02 09:51:46'),(69,56,38,5,'wow','2021-08-02 09:52:05'),(70,48,38,1,'i fell asleep (boring)','2021-08-02 09:52:30'),(71,51,38,4,'Interesting','2021-08-02 09:53:08'),(72,50,38,3,'The poster is scarier than the movie','2021-08-02 09:53:35'),(73,109,37,5,'master piece','2021-08-02 09:55:03'),(74,55,37,1,'Over hyped','2021-08-02 09:55:27'),(75,89,37,3,'This movie made me turn around','2021-08-02 09:55:53'),(76,113,33,5,'Inspired me to be a gansgeter','2021-08-03 12:07:20'),(77,89,33,4,'Turned my life','2021-08-09 06:43:16'),(78,110,33,5,'Splendid','2021-08-09 06:50:16'),(79,113,38,5,'best gang movie','2021-08-09 11:56:11'),(80,89,38,5,'Good movie!','2021-08-09 12:13:00');
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
INSERT INTO `screening` VALUES (15,48,'15 july 2021 6:00pm to 9:00pm','2021-07-03 06:15:36'),(16,50,'15 july 2021 6:00pm to 9:00pm','2021-07-03 09:30:04'),(19,51,'15 july 2021 9:00pm to 12:00am','2021-07-03 09:49:35'),(20,51,'15 july 2021 12am to 3:00am','2021-07-03 09:49:59');
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (32,'John sim','johnsim@gmail.com',89419141,'johnjohn','RM','john.jpg','2021-07-02 17:20:33'),(33,'Chad thunder','chadthunder@gmail.com',91827064,'1qwert$#@!','RM','https://chad.com/chad.jpg','2021-07-02 17:20:51'),(34,'ryan tan','ryantan@gmail.com',810143054,'password123','RM','https://ryan.com/ryan.jpg','2021-07-02 17:20:57'),(35,'michelle','michelle@gmail.com',97594259,'michelle321','A','https://bob.com/bob.jpg','2021-07-02 17:21:29'),(36,'mathew soh','mathewsoh@gmail.com',85596233,'admin123!','A','https://mathew.com/mathew.jpg','2021-07-02 17:22:33'),(37,'javier','javier23@gmail.com',95594221,'javier321','RM','https://acb.com/javier.jpg','2021-07-02 17:23:39'),(38,'bruce lee','brucelee@gmail.com',86594259,'root123','RM','https://acb.com/brucelee.jpg','2021-07-02 17:24:37'),(40,'john tan','john@gmail.com',931112223,'password','A','john.jpg','2021-07-07 02:41:24'),(42,'lsdfl','johnsim453@gmail.com',997890,'j34ohnjohn','A',NULL,'2021-07-13 10:26:20'),(43,'lsdsdfl','johnsimsdf453@gmail.com',997890,'j34ohnsdjohn','A',NULL,'2021-07-13 10:29:02');
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

-- Dump completed on 2021-08-09 20:15:30
