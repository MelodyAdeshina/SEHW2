-- MySQL dump 10.13  Distrib 8.0.41, for macos15 (x86_64)
--
-- Host: 127.0.0.1    Database: recipes_db
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `protein_type` varchar(50) DEFAULT NULL,
  `ingredient_id` int DEFAULT NULL,
  `instructions` text,
  PRIMARY KEY (`id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1,'Ackee and Saltfish','Jamaica\'s national dish with salted cod and ackee fruit sautéed with onions, tomatoes, and spices.','Fish',NULL,'1. Rinse the salted codfish to remove excess salt, then boil it until tender. Flake the fish into bite-sized pieces. 2. Drain and rinse the ackee if using canned ackee. If using fresh ackee, cook it until soft and drain. 3. In a large pan, heat cooking oil and sauté the required vegetables until soft. 4. Add the flaked codfish and thyme. Stir and cook for a few minutes. 5. Gently fold in the ackee and cook until heated through. Season to taste. 6. Serve hot with fried/boiled dumplings. I prefer both.'),(2,'Meatballs and Spaghetti','Classic Italian-American dish with seasoned meatballs in marinara over spaghetti.','Beef',NULL,'1. Preheat your oven to 375°F (190°C). 2. In a mixing bowl, combine ground beef, breadcrumbs, egg, minced garlic, grated Parmesan, Italian seasoning, salt, and pepper. Mix until well combined. 3. Roll the mixture into meatballs (about 1-2 inches in diameter) and place them on a baking sheet. 4. Bake for 20-25 minutes, or until cooked through. 5. While the meatballs bake, cook the spaghetti pasta according to the package instructions. 6. In a large skillet, heat olive oil and add marinara sauce. Once warm, add the baked meatballs to the sauce and simmer for 10 minutes. 7. Serve the meatballs and sauce over the cooked spaghetti.'),(3,'Tuna Onigiri','Rice balls filled with creamy tuna mixture and wrapped in seaweed. Perfect for on-the-go!','Fish',NULL,'1. Cook sushi rice according to the package instructions, then let it cool slightly. 2. In a bowl, mix the drained tuna with mayonnaise and a small splash of soy sauce. Adjust the amount to taste. 3. Wet your hands with water to prevent the rice from sticking, then take a small handful of rice and form it into a ball or triangle shape. 4. Make an indentation in the center of the rice ball and place a small spoonful of tuna mixture inside. Cover the tuna with more rice and shape the ball again. 5. Wrap the rice ball with a strip of nori (seaweed). ');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-13 13:05:34
