CREATE TABLE `auth_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `auth_item` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_item` (`auth_item`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `domains` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain_name` varchar(255) NOT NULL,
  `max_quota_per_account` bigint(20) DEFAULT NULL,
  `max_accounts_per_domain` int(11) DEFAULT NULL,
  `max_aliases_per_account` int(11) DEFAULT NULL,
  `is_alias_domain` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `domain_name_unique_constraint` (`domain_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `max_aliases` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `role_id_fkey` (`role_id`),
  KEY `alias_domain_id_fkey` (`domain_id`),
  CONSTRAINT `role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `auth_items` (`id`),
  CONSTRAINT `user_domain_id_fkey` FOREIGN KEY (`domain_id`) REFERENCES `domains` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
CREATE TABLE `user_domain_map` (
  `user_id` int(11) NOT NULL,
  `domain_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`domain_id`),
  KEY `domain_id_fkey` (`domain_id`),
  CONSTRAINT `domain_id_fkey` FOREIGN KEY (`domain_id`) REFERENCES `domains` (`id`),
  CONSTRAINT `user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `virtual_delivery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) NOT NULL,
  `dest` varchar(255) NOT NULL,
  `alias_domain_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alias_unique_constraint` (`alias`),
  KEY `alias_domain_id_fkey` (`alias_domain_id`),
  KEY `dest_fkey` (`dest`),
  CONSTRAINT `alias_domain_id_fkey` FOREIGN KEY (`alias_domain_id`) REFERENCES `domains` (`id`),
  CONSTRAINT `dest_fkey` FOREIGN KEY (`dest`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
