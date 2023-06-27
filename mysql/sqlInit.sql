CREATE TABLE `account` (
  `dob` date DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `club_name` varchar(255) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `judo_grade` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `weight_class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `verification-token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expiry-date` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `player_stat` (
  `id` int NOT NULL,
  `losses` int NOT NULL,
  `points` int NOT NULL,
  `wins` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `player` (
  `dob` date DEFAULT NULL,
  `id` int NOT NULL,
  `player_stat` int DEFAULT NULL,
  `club_name` varchar(255) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `judo_grade` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `weight_class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_q3vado4tl4nyuxj515r24tu2` (`player_stat`),
  CONSTRAINT `FKkq3minol4e0w0tlkrexw0ac3c` FOREIGN KEY (`player_stat`) REFERENCES `player_stat` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment` bit(1) DEFAULT NULL,
  `player_id` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_9e76sog4tp7ld4opn3ecareh3` (`player_id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  CONSTRAINT `FKqe24ejigr19y8fi3jbi3wurqy` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `points` (
  `id` int NOT NULL AUTO_INCREMENT,
  `eighth` int DEFAULT NULL,
  `fifth` int DEFAULT NULL,
  `first` int DEFAULT NULL,
  `fourth` int DEFAULT NULL,
  `ninth` int DEFAULT NULL,
  `participation` int DEFAULT NULL,
  `second` int DEFAULT NULL,
  `seventh` int DEFAULT NULL,
  `sixth` int DEFAULT NULL,
  `tenth` int DEFAULT NULL,
  `third` int DEFAULT NULL,
  `tournament` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `tournament` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `point_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfiache9ddk8rd6akk509ks11l` (`point_id`),
  CONSTRAINT `FKfiache9ddk8rd6akk509ks11l` FOREIGN KEY (`point_id`) REFERENCES `points` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `participate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `position` int DEFAULT NULL,
  `player_id` int DEFAULT NULL,
  `tournament_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb88tkw5mu66feddvmwki1b355` (`player_id`),
  KEY `FKq39jtttn70logc4k9oe6o06lt` (`tournament_id`),
  CONSTRAINT `FKb88tkw5mu66feddvmwki1b355` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`),
  CONSTRAINT `FKq39jtttn70logc4k9oe6o06lt` FOREIGN KEY (`tournament_id`) REFERENCES `tournament` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `match_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color` varchar(255) DEFAULT NULL,
  `ippon` int DEFAULT NULL,
  `penalty` int DEFAULT NULL,
  `player_id` int DEFAULT NULL,
  `player_in_db` bit(1) DEFAULT NULL,
  `wasa_ari` int DEFAULT NULL,
  `won` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `match` (
  `id` int NOT NULL AUTO_INCREMENT,
  `division` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `weigh_class` int DEFAULT NULL,
  `player1` int DEFAULT NULL,
  `player2` int DEFAULT NULL,
  `t_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_i0s60534nidggipkd183nbi3k` (`player1`),
  UNIQUE KEY `UK_765mfux2ie0e3811hs8ug81d6` (`player2`),
  KEY `FK5codsnc9954mjch7q0cge7tbm` (`t_id`),
  CONSTRAINT `FK5codsnc9954mjch7q0cge7tbm` FOREIGN KEY (`t_id`) REFERENCES `tournament` (`id`),
  CONSTRAINT `FKdg5aqgthwkgk7fnq8xxvlbm0x` FOREIGN KEY (`player2`) REFERENCES `match_detail` (`id`),
  CONSTRAINT `FKmcmgx3a0e77oerdjeehjei30u` FOREIGN KEY (`player1`) REFERENCES `match_detail` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO
  points (
    tournament,
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    seventh,
    eighth,
    ninth,
    tenth,
    participation
  ) VALUES 
  ('Provincial', 15, 12, 10, 8, 7, 6, 5, 4, 3, 2, 1),
  ('National Festival', 150, 100, 50, 35, 30, 25, 20, 18, 16, 15, 1),
  ('National Judo Championship', 150, 100, 50, 35, 30, 25, 20, 18, 16, 15, 1),
  ('South Asian Championship', 700, 650, 600, 550, 500, 450, 400, 350, 300, 250, 200),
  ('South Asian Games', 750, 700, 650, 600, 550, 500, 450, 400, 350, 300, 250),
  ('Asia Oceania Championship', 1000, 950, 900, 650, 600, 550, 500, 450, 400, 350, 300),
  ('Commonwelth Championship', 1250, 1000, 950, 700, 650, 600, 550, 500, 450, 400, 350),
  ('Asian Championship', 1500, 1250, 1000, 800, 700, 650, 600, 550, 500, 450, 370),
  ('Commonwelth Games', 1750, 1500, 1250, 1000, 800, 700, 650, 600, 550, 500, 450),
  ('Asian Games', 2000, 1800, 1600, 1500, 1400, 1200, 1000, 700, 600, 500, 400),
  ('Continental', 2500, 2250, 2000, 1800, 1700, 1400, 1200, 800, 700, 600, 500),
  ('Grand Prix', 2500, 2250, 2000, 1800, 1700, 1400, 1200, 800, 700, 600, 500),
  ('Grand Slam', 300, 2500, 2250, 2000, 1750, 1500, 1250, 1000, 900, 800, 700),
  ('World Masters', 4000, 3500, 3250, 3000, 2750, 2500, 2000, 1750, 1500, 1000, 950),
  ('World Championship', 5000, 4500, 4250, 4000, 3750, 3500, 3000, 2500, 2000, 1500, 1000),
  ('Olympic Games', 8000, 7500, 7000, 5000, 4500, 4250, 4000, 3750, 3500, 3250, 2000);


INSERT INTO `user`
(`id`,
`payment`,
`email`,
`password`,
`role`)
VALUES
(0,
true,
'judorankingsl@gmail.com',
'$2a$12$YL8s3OT7oEnywC7eZfzIeOxUQ68H/msUv0AtSNd/Nn/SB875S37NO',
'ADMIN');


