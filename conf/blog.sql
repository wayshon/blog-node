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

 Date: 11/24/2016 11:24:34 AM
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
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `userid_2` (`userid`),
  KEY `userid_3` (`userid`),
  KEY `userid_4` (`userid`),
  KEY `userid_5` (`userid`),
  KEY `userid_6` (`userid`),
  CONSTRAINT `user_id` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `article`
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('5', '6', 'uuuuuuu', 'asdfghjkl', '2016-11-23 12:44:57.000000', null), ('6', '6', 'ttttt', 'qwertyuuioplkjhgfdsazxcvbnm', '2016-11-23 12:44:19.000000', null);
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
INSERT INTO `article_tags` VALUES ('boxing', '5'), ('game', '5'), ('bick', '6'), ('swiming', '6');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `comments`
-- ----------------------------
BEGIN;
INSERT INTO `comments` VALUES ('1', '这是评论', '38', '6', 'qwer'), ('4', '评论啦啦啦啦啦', '6', '6', '[object Object]'), ('5', '评论呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵', '6', '6', '666'), ('7', '评论呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵', '6', '3', '用户已删除');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
INSERT INTO `sessions` VALUES ('7BostdgA-EWNxRyYXo8Y9Gar9ZKZjfIZ', '1479957471', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31312d32345430333a31373a35312e3335325a222c22687474704f6e6c79223a747275652c2270617468223a222f227d7d), ('8dJdMA0Eif2eht_b005KLf_f3DNF-Qzo', '1479957196', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31312d32345430333a31333a31362e3031325a222c22687474704f6e6c79223a747275652c2270617468223a222f227d7d), ('rOlUpeunPpDoltIHSqMF9JuWuH8WKx5M', '1479957447', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31312d32345430333a31373a32372e3032375a222c22687474704f6e6c79223a747275652c2270617468223a222f227d7d), ('u75J4pWMjy_OVq-dYjnmtCrp6V19I6t6', '1479957345', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31312d32345430333a31353a34352e3030325a222c22687474704f6e6c79223a747275652c2270617468223a222f227d7d);
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
INSERT INTO `tags` VALUES ('bick'), ('boxing'), ('game'), ('swiming');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'aaa', '111', '', '111'), ('2', 'bbb', '222', '', '222'), ('4', 'ddd', '550a141f12de6341fba65b0ad0433500', '123456@163.com', '444'), ('6', 'qwer', '962012d09b8170d912f0669f6d7d9d07', 'qwer@163.com', '666');
COMMIT;

-- ----------------------------
--  Triggers structure for table user
-- ----------------------------
DROP TRIGGER IF EXISTS `user_afterdelete_on_comment`;
delimiter ;;
CREATE TRIGGER `user_afterdelete_on_comment` AFTER DELETE ON `user` FOR EACH ROW update comments set nickname='用户已删除' where userid=old.id
 ;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
