/*
 Navicat Premium Data Transfer

 Source Server         : Nodejs
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : 127.0.0.1
 Source Database       : blog

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : utf-8

 Date: 12/12/2016 19:42:01 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(11) unsigned NOT NULL,
  `title` varchar(20) NOT NULL,
  `content` varchar(555) DEFAULT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fromid` int(11) DEFAULT NULL,
  `readCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `userid_2` (`userid`),
  KEY `userid_3` (`userid`),
  KEY `userid_4` (`userid`),
  KEY `userid_5` (`userid`),
  KEY `userid_6` (`userid`),
  CONSTRAINT `user_id` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `article`
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('5', '6', 'uuuuuuu', 'asdfghjkl', '2016-12-12 18:03:50.000000', null, null), ('6', '6', 'ttttt', 'qwertyuuioplkjhgfdsazxcvbnm', '2016-12-09 19:00:21.881176', null, '12'), ('9', '2', '[转载]ttttt', 'qwertyuuioplkjhgfdsazxcvbnm', '2016-12-09 18:45:42.227026', '6', '1'), ('38', '4', 'hhh', 'fdhfghfghfgh', '2016-12-12 14:31:43.536962', null, null), ('39', '6', 'ttttt', 'qwertyuuioplkjhgfdsazxcvbnm', '2016-12-12 15:05:14.000000', null, '0'), ('40', '6', 'ttttt', 'qwertyuuioplkjhgfdsazxcvbnm', '2016-12-12 15:06:22.000000', null, '0'), ('41', '6', 'ttttt', 'qwertyuuioplkjhgfdsazxcvbnm', '2016-12-12 15:06:27.000000', null, '0'), ('43', '12', '小杨的的的', 'jhdsfiluhasdfhlakdjshflaksdhfuiefjbvjhbdv', '2016-12-12 15:32:54.000000', null, '0'), ('44', '12', '小杨的第二次', '啊啊啊啊啊啊啊啊啊啊啊啊啊啊', '2016-12-12 18:13:22.122453', null, '3'), ('58', '12', '[转载]小杨的第二次', '啊啊啊啊啊啊啊啊啊啊啊啊啊啊', '2016-12-12 18:59:17.000000', '44', '0');
COMMIT;

-- ----------------------------
--  Table structure for `article_tags`
-- ----------------------------
DROP TABLE IF EXISTS `article_tags`;
CREATE TABLE `article_tags` (
  `tagname` varchar(10) NOT NULL,
  `articleid` int(255) unsigned NOT NULL,
  PRIMARY KEY (`tagname`,`articleid`),
  KEY `articleid` (`articleid`),
  KEY `articleid_2` (`articleid`),
  CONSTRAINT `article_id` FOREIGN KEY (`articleid`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tag_name` FOREIGN KEY (`tagname`) REFERENCES `tags` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `article_tags`
-- ----------------------------
BEGIN;
INSERT INTO `article_tags` VALUES ('boxing', '5'), ('game', '5'), ('bick', '6'), ('swiming', '6'), ('bick', '9'), ('swiming', '9'), ('bick', '39'), ('swiming', '39'), ('bick', '40'), ('swiming', '40'), ('bick', '41'), ('swiming', '41'), ('\'dayang1\'', '43'), ('\'dayang2\'', '43'), ('bbb', '44'), ('ccc', '44'), ('bbb', '58'), ('ccc', '58');
COMMIT;

-- ----------------------------
--  Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `articleid` int(11) unsigned NOT NULL,
  `userid` int(11) unsigned NOT NULL,
  `nickname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `articleid` (`articleid`),
  CONSTRAINT `comment_articleid` FOREIGN KEY (`articleid`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `comments`
-- ----------------------------
BEGIN;
INSERT INTO `comments` VALUES ('1', '这是评论', '38', '6', 'qwer'), ('4', '评论啦啦啦啦啦', '6', '6', '[object Object]'), ('5', '评论呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵', '6', '6', '666'), ('7', '评论呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵', '6', '3', '用户已删除'), ('8', '这是评论哈哈哈哈', '58', '12', '大杨'), ('9', '我还要评一个', '58', '12', '大杨'), ('10', '我还要评10个', '58', '12', '大杨');
COMMIT;

-- ----------------------------
--  Table structure for `reprint`
-- ----------------------------
DROP TABLE IF EXISTS `reprint`;
CREATE TABLE `reprint` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fromid` int(11) unsigned NOT NULL,
  `toid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fromid` (`fromid`),
  CONSTRAINT `from_id` FOREIGN KEY (`fromid`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `reprint`
-- ----------------------------
BEGIN;
INSERT INTO `reprint` VALUES ('1', '6', '9'), ('2', '44', '57'), ('3', '44', '58');
COMMIT;

-- ----------------------------
--  Table structure for `sessions`
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `sessions`
-- ----------------------------
BEGIN;
INSERT INTO `sessions` VALUES ('GeyaH7uo7QeyXRblLzuGiVd6S1SgAcLv', '1481543247', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a313830303030302c2265787069726573223a22323031362d31322d31325431313a34373a32362e3635395a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a31327d);
COMMIT;

-- ----------------------------
--  Table structure for `tags`
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `tags`
-- ----------------------------
BEGIN;
INSERT INTO `tags` VALUES ('\'dayang1\''), ('\'dayang2\''), ('aaa'), ('bbb'), ('bick'), ('boxing'), ('ccc'), ('game'), ('swiming');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'aaa', '111', '', '111', null), ('2', 'bbb', '222', '', '222', null), ('4', 'ddd', '550a141f12de6341fba65b0ad0433500', '123456@163.com', '444', null), ('6', 'qwer', '962012d09b8170d912f0669f6d7d9d07', 'qwer@163.com', '666', null), ('7', 'asdf', '912ec803b2ce49e4a541068d495ab570', 'asdf@qq.com', 'vvv', null), ('9', 'aaaa', '74b87337454200d4d33f80c4663dc5e5', 'aaaa@163.com', 'vvv', 'http://192.168.10.239:9911/images/Avatar/1480491700398.png'), ('10', 'laowang', 'e10adc3949ba59abbe56e057f20f883e', '123456@163.com', '老王', 'http://192.168.10.239:9911/images/Avatar/1480491700398.png'), ('11', 'xiaoyang', 'e10adc3949ba59abbe56e057f20f883e', '123456@163.com', '小杨', 'http://192.168.10.239:9911/images/Avatar/1480491700398.png'), ('12', 'dayang', 'e10adc3949ba59abbe56e057f20f883e', '123456@163.com', '大杨', 'http://192.168.10.239:9911/images/Avatar/1480491700398.png');
COMMIT;

-- ----------------------------
--  View structure for `article_list_view`
-- ----------------------------
DROP VIEW IF EXISTS `article_list_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`test`@`%` SQL SECURITY DEFINER VIEW `article_list_view` AS select `article`.`id` AS `id`,`article`.`userid` AS `userid`,`article`.`title` AS `title`,`article`.`date` AS `date`,`article`.`readCount` AS `readCount`,`user`.`avatar` AS `avatar`,`user`.`nickname` AS `nickname`,count(`comments`.`articleid`) AS `commentCount`,count(`reprint`.`fromid`) AS `reprintCount` from (((`article` left join `user` on((`article`.`userid` = `user`.`id`))) left join `comments` on((`article`.`id` = `comments`.`articleid`))) left join `reprint` on((`article`.`id` = `reprint`.`fromid`))) group by `article`.`id`;

-- ----------------------------
--  View structure for `article_view`
-- ----------------------------
DROP VIEW IF EXISTS `article_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`test`@`%` SQL SECURITY DEFINER VIEW `article_view` AS select `article`.`id` AS `id`,`article`.`userid` AS `userid`,`article`.`title` AS `title`,`article`.`content` AS `content`,`article`.`date` AS `date`,`article`.`readCount` AS `readCount`,`user`.`avatar` AS `avatar`,`user`.`nickname` AS `nickname`,count(`comments`.`articleid`) AS `commentCount`,count(`reprint`.`fromid`) AS `reprintCount` from (((`article` left join `user` on((`article`.`userid` = `user`.`id`))) left join `comments` on((`article`.`id` = `comments`.`articleid`))) left join `reprint` on((`article`.`id` = `reprint`.`fromid`))) group by `article`.`id`;

-- ----------------------------
--  Triggers structure for table user
-- ----------------------------
DROP TRIGGER IF EXISTS `user_afterdelete_on_comment`;
delimiter ;;
CREATE TRIGGER `user_afterdelete_on_comment` AFTER DELETE ON `user` FOR EACH ROW update comments set nickname='用户已删除' where userid=old.id
 ;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
