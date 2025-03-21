-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: hsk1
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'user','Зарегестрированный пользователь'),(2,'admin','Админ');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_role` int NOT NULL,
  `login` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`id_role`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (36,2,'admin','$2b$10$Iaf2SlrcAdmcn2VeyJDmVu8PEvaFm8t/XHpRP.AfSXadu9oXe/9Kq','admin','admin','admin@admin.com'),(37,1,'test','$2b$10$jboDhch5PnN7Ue9/OvOkDeyqG0RfVV9Ijtn0ZZiQRNHd5WRtAY8F6','123','123','test@test.com'),(38,1,'test2','$2b$10$hZ/weIZHrnWro3xSQD3EterZQltncrXS.xpPgfjElSP2PiK34hEsO','test2','123','test2@test2.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_learned_words`
--

DROP TABLE IF EXISTS `user_learned_words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_learned_words` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `word_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`word_id`),
  KEY `word_id` (`word_id`),
  CONSTRAINT `user_learned_words_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_learned_words_ibfk_2` FOREIGN KEY (`word_id`) REFERENCES `words` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_learned_words`
--

LOCK TABLES `user_learned_words` WRITE;
/*!40000 ALTER TABLE `user_learned_words` DISABLE KEYS */;
INSERT INTO `user_learned_words` VALUES (3,37,1),(1,37,2),(19,37,3),(13,37,4),(7,37,5),(21,37,6),(27,37,7),(25,37,8),(23,37,9),(9,37,11),(29,37,62);
/*!40000 ALTER TABLE `user_learned_words` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `words`
--

DROP TABLE IF EXISTS `words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `words` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chinese` varchar(10) NOT NULL,
  `pinyin` varchar(50) NOT NULL,
  `translation` varchar(255) NOT NULL,
  `type` enum('местоимение','указательное местоимение','вопросительное местоимение','числительное','счетное слово','наречие','союз','предлог','служебное слово','междометие','существительное','глагол','прилагательное') NOT NULL,
  `gif` varchar(255) DEFAULT NULL,
  `sound` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `words`
--

LOCK TABLES `words` WRITE;
/*!40000 ALTER TABLE `words` DISABLE KEYS */;
INSERT INTO `words` VALUES (1,'我','wǒ','я','местоимение',NULL,NULL),(2,'我们','wǒmen','мы','местоимение',NULL,NULL),(3,'你','nǐ','ты','местоимение',NULL,NULL),(4,'他','tā','он','местоимение',NULL,NULL),(5,'她','tā','она','местоимение',NULL,NULL),(6,'这','zhè (zhèr)','это (здесь)','местоимение',NULL,NULL),(7,'那','nà (nàr)','то (там)','местоимение',NULL,NULL),(8,'哪','nǎ','какой','местоимение',NULL,NULL),(9,'哪儿','nǎr','где','местоимение',NULL,NULL),(10,'谁','shéi','кто','местоимение',NULL,NULL),(11,'什么','shénme','что','местоимение',NULL,NULL),(12,'多少','duōshǎo','сколько','местоимение',NULL,NULL),(13,'几','jǐ','несколько, сколько','местоимение',NULL,NULL),(14,'怎么','zěnme','как','местоимение',NULL,NULL),(15,'怎么样','zěnmeyàng','как насчет','местоимение',NULL,NULL),(16,'一','yī','один','числительное',NULL,NULL),(17,'二','èr','два','числительное',NULL,NULL),(18,'三','sān','три','числительное',NULL,NULL),(19,'四','sì','четыре','числительное',NULL,NULL),(20,'五','wǔ','пять','числительное',NULL,NULL),(21,'六','liù','шесть','числительное',NULL,NULL),(22,'七','qī','семь','числительное',NULL,NULL),(23,'八','bā','восемь','числительное',NULL,NULL),(24,'九','jiǔ','девять','числительное',NULL,NULL),(25,'十','shí','десять','числительное',NULL,NULL),(26,'个','gè','(универсальное счетное слово для предметов)','счетное слово',NULL,NULL),(27,'岁','suì','(счетное слово для возраста)','счетное слово',NULL,NULL),(28,'本','běn','(счетное слово для книг)','счетное слово',NULL,NULL),(29,'些','xiē','некоторые (множественное значение)','счетное слово',NULL,NULL),(30,'块','kuài','кусок, юань (разг.)','счетное слово',NULL,NULL),(31,'不','bù','нет','наречие',NULL,NULL),(32,'没','méi','нет','наречие',NULL,NULL),(33,'很','hěn','очень','наречие',NULL,NULL),(34,'太','tài','слишком','наречие',NULL,NULL),(35,'都','dōu','все','наречие',NULL,NULL),(36,'一点儿','yīdiǎnr','немного','наречие',NULL,NULL),(37,'和','hé','и','союз',NULL,NULL),(38,'在','zài','в, на','предлог',NULL,NULL),(39,'的','de','','служебное слово',NULL,NULL),(40,'了','le','','служебное слово',NULL,NULL),(41,'吗','ma','','служебное слово',NULL,NULL),(42,'呢','ne','','служебное слово',NULL,NULL),(43,'喂','wèi','алло','междометие',NULL,NULL),(44,'家','jiā','дом','существительное',NULL,NULL),(45,'学校','xuéxiào','школа','существительное',NULL,NULL),(46,'饭店','fàndiàn','ресторан','существительное',NULL,NULL),(47,'商店','shāngdiàn','магазин','существительное',NULL,NULL),(48,'医院','yīyuàn','больница','существительное',NULL,NULL),(49,'中国','Zhōngguó','Китай','существительное',NULL,NULL),(50,'北京','Běijīng','Пекин','существительное',NULL,NULL),(51,'上','shàng','верх','существительное',NULL,NULL),(52,'下','xià','низ','существительное',NULL,NULL),(53,'前面','qiánmiàn','перед','существительное',NULL,NULL),(54,'后面','hòumiàn','сзади','существительное',NULL,NULL),(55,'里面','lǐmiàn','внутри','существительное',NULL,NULL),(56,'今天','jīntiān','сегодня','существительное',NULL,NULL),(57,'明天','míngtiān','завтра','существительное',NULL,NULL),(58,'昨天','zuótiān','вчера','существительное',NULL,NULL),(59,'上午','shàngwǔ','утро','существительное',NULL,NULL),(60,'中午','zhōngwǔ','полдень','существительное',NULL,NULL),(61,'下午','xiàwǔ','день (вторая половина)','существительное',NULL,NULL),(62,'年','nián','год','существительное',NULL,NULL),(63,'月','yuè','месяц','существительное',NULL,NULL),(64,'号','hào','число','существительное',NULL,NULL),(65,'星期','xīngqī','неделя','существительное',NULL,NULL),(66,'点','diǎn','час','существительное',NULL,NULL),(67,'分钟','fēnzhōng','минута','существительное',NULL,NULL),(68,'现在','xiànzài','сейчас','существительное',NULL,NULL),(69,'时候','shíhou','время','существительное',NULL,NULL),(70,'爸爸','bàba','отец','существительное',NULL,NULL),(71,'妈妈','māma','мать','существительное',NULL,NULL),(72,'儿子','érzi','сын','существительное',NULL,NULL),(73,'女儿','nǚér','дочь','существительное',NULL,NULL),(74,'老师','lǎoshī','учитель','существительное',NULL,NULL),(75,'学生','xuéshēng','студент','существительное',NULL,NULL),(76,'同学','tóngxué','одноклассник','существительное',NULL,NULL),(77,'朋友','péngyǒu','друг','существительное',NULL,NULL),(78,'医生','yīshēng','врач','существительное',NULL,NULL),(79,'先生','xiānsheng','господин','существительное',NULL,NULL),(80,'小姐','xiǎojiě','мисс','существительное',NULL,NULL),(81,'衣服','yīfu','одежда','существительное',NULL,NULL),(82,'水','shuǐ','вода','существительное',NULL,NULL),(83,'菜','cài','блюдо','существительное',NULL,NULL),(84,'米饭','mǐfàn','рис','существительное',NULL,NULL),(85,'水果','shuǐguǒ','фрукты','существительное',NULL,NULL),(86,'苹果','píngguǒ','яблоко','существительное',NULL,NULL),(87,'茶','chá','чай','существительное',NULL,NULL),(88,'杯子','bēizi','чашка','существительное',NULL,NULL),(89,'钱','qián','деньги','существительное',NULL,NULL),(90,'飞机','fēijī','самолет','существительное',NULL,NULL),(91,'出租车','chūzūchē','такси','существительное',NULL,NULL),(92,'电视','diànshì','телевизор','существительное',NULL,NULL),(93,'电脑','diànnǎo','компьютер','существительное',NULL,NULL),(94,'电影','diànyǐng','фильм','существительное',NULL,NULL),(95,'天气','tiānqì','погода','существительное',NULL,NULL),(96,'猫','māo','кот','существительное',NULL,NULL),(97,'狗','gǒu','собака','существительное',NULL,NULL),(98,'东西','dōngxi','вещь','существительное',NULL,NULL),(99,'人','rén','человек','существительное',NULL,NULL),(100,'名字','míngzi','имя','существительное',NULL,NULL),(101,'书','shū','книга','существительное',NULL,NULL),(102,'汉语','hànyǔ','китайский язык','существительное',NULL,NULL),(103,'字','zì','иероглиф','существительное',NULL,NULL),(104,'桌子','zhuōzi','стол','существительное',NULL,NULL),(105,'椅子','yǐzi','стул','существительное',NULL,NULL),(106,'谢谢','xièxie','спасибо','глагол',NULL,NULL),(107,'不客气','búkèqì','не за что','глагол',NULL,NULL),(108,'再见','zàijiàn','до свидания','глагол',NULL,NULL),(109,'请','qǐng','приглашать, пожалуйста','глагол',NULL,NULL),(110,'对不起','duìbùqǐ','извините','глагол',NULL,NULL),(111,'没关系','méiguānxì','неважно','глагол',NULL,NULL),(112,'是','shì','быть (есть)','глагол',NULL,NULL),(113,'有','yǒu','иметь','глагол',NULL,NULL),(114,'看','kàn','смотреть','глагол',NULL,NULL),(115,'听','tīng','слушать','глагол',NULL,NULL),(116,'说','shuō','говорить','глагол',NULL,NULL),(117,'读','dú','читать','глагол',NULL,NULL),(118,'写','xiě','писать','глагол',NULL,NULL),(119,'看见','kànjiàn','увидеть','глагол',NULL,NULL),(120,'叫','jiào','звать','глагол',NULL,NULL),(121,'来','lái','приходить','глагол',NULL,NULL),(122,'回','huí','возвращаться','глагол',NULL,NULL),(123,'去','qù','идти','глагол',NULL,NULL),(124,'吃','chī','есть','глагол',NULL,NULL),(125,'喝','hē','пить','глагол',NULL,NULL),(126,'睡觉','shuìjiào','спать','глагол',NULL,NULL),(127,'打电话','dǎdiànhuà','звонить по телефону','глагол',NULL,NULL),(128,'做','zuò','делать','глагол',NULL,NULL),(129,'买','mǎi','покупать','глагол',NULL,NULL),(130,'开','kāi','открывать','глагол',NULL,NULL),(131,'坐','zuò','сидеть','глагол',NULL,NULL),(132,'住','zhù','жить','глагол',NULL,NULL),(133,'学习','xuéxí','учиться','глагол',NULL,NULL),(134,'工作','gōngzuò','работать','глагол',NULL,NULL),(135,'下雨','xiàyǔ','идет дождь','глагол',NULL,NULL),(136,'爱','ài','любить','глагол',NULL,NULL),(137,'喜欢','xǐhuān','нравиться','глагол',NULL,NULL),(138,'想','xiǎng','хотеть, думать','глагол',NULL,NULL),(139,'认识','rènshi','знать (человека)','глагол',NULL,NULL),(140,'会','huì','уметь','глагол',NULL,NULL),(141,'能','néng','мочь','глагол',NULL,NULL),(142,'好','hǎo','хороший','прилагательное',NULL,NULL),(143,'大','dà','большой','прилагательное',NULL,NULL),(144,'小','xiǎo','маленький','прилагательное',NULL,NULL),(145,'多','duō','много','прилагательное',NULL,NULL),(146,'少','shǎo','мало','прилагательное',NULL,NULL),(147,'冷','lěng','холодный','прилагательное',NULL,NULL),(148,'热','rè','горячий','прилагательное',NULL,NULL),(149,'高兴','gāoxìng','счастливый','прилагательное',NULL,NULL),(150,'漂亮','piàoliang','красивый','прилагательное',NULL,NULL);
/*!40000 ALTER TABLE `words` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-02 16:46:00
