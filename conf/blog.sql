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

 Date: 12/07/2016 22:32:47 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `article`
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('5', '6', 'uuuuuuu', 'asdfghjkl', '2016-11-23 12:44:57.000000', null), ('6', '6', 'ttttt', 'qwertyuuioplkjhgfdsazxcvbnm', '2016-11-23 12:44:19.000000', null), ('9', '2', '[转载]ttttt', 'qwertyuuioplkjhgfdsazxcvbnm', '2016-11-24 18:16:33.000000', '6');
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
INSERT INTO `article_tags` VALUES ('boxing', '5'), ('game', '5'), ('bick', '6'), ('swiming', '6'), ('bick', '9'), ('swiming', '9');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `reprint`
-- ----------------------------
BEGIN;
INSERT INTO `reprint` VALUES ('1', '6', '9');
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
INSERT INTO `sessions` VALUES ('3-qfeER_Z51vOJ2JXYlFPf84h14wBHhV', '1481120483', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a32313a32332e3230305a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('CNX7cqlS4C7JzP3eTqz3DnGNR3NEGxE7', '1481121014', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a393939392c2265787069726573223a22323031362d31322d30375431343a33303a31342e3032335a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('G8-fA1AdDukmwfXttjhHBsTUndFHMTQK', '1481119854', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a31303a35342e3036345a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('Gv8EnwFPcntMZkThOE15pSI86ekXRiyl', '1481119725', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a30383a34352e3038315a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('IY553n0Jh8PZeVr44BNuWL7faANAVfNf', '1481120397', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a31393a35372e3130355a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('JPfpJIyFXMC_ahunkZXhiW08hLrqqTFQ', '1481120940', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a32383a35392e3735355a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('VYFsEDlj73YwIHMvn9K3gVeSpZUrYEVF', '1481120462', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a32313a30312e3732355a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('Yd9hGrm2SmmxMlQ69SfbDo2vSrdQKdax', '1481121071', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a393939392c2265787069726573223a22323031362d31322d30375431343a33313a31302e3538365a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('_pevjOTwBibvBT0wABE7VWW-MdD7pAdD', '1481119787', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a30393a34372e3039345a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('f4rIQDQ4tRN7WbM6vzU4D2gHV9Oq1hcs', '1481120448', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a32303a34382e3030305a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('jDh5WBXfH-i5trW0i6uoDoCx3tCaMWJX', '1481119907', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a31313a34362e3530385a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('nEZL4IjhvxsUVeVqs328yrveHelHiGxy', '1481120302', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a31383a32322e3236315a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('oA3CsMJJy_r9eHLCbVxcfKickXxRqRsP', '1481120359', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a31393a31382e3835305a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('pQ_tMVX6OV50gDLiNJ9QdZDOGggjnGYb', '1481119766', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a30393a32352e3539315a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d), ('vh9JiWp1iis0fl9lNjrN9Mqk17LHdlHh', '1481120246', 0x7b22636f6f6b6965223a7b226f726967696e616c4d6178416765223a31303030302c2265787069726573223a22323031362d31322d30375431343a31373a32352e3635305a222c22687474704f6e6c79223a747275652c2270617468223a222f227d2c2275736572223a2274747474227d);
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
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', 'aaa', '111', '', '111', null), ('2', 'bbb', '222', '', '222', null), ('4', 'ddd', '550a141f12de6341fba65b0ad0433500', '123456@163.com', '444', null), ('6', 'qwer', '962012d09b8170d912f0669f6d7d9d07', 'qwer@163.com', '666', null), ('7', 'asdf', '912ec803b2ce49e4a541068d495ab570', 'asdf@qq.com', 'vvv', null), ('9', 'aaaa', '74b87337454200d4d33f80c4663dc5e5', 'aaaa@163.com', 'vvv', 'http://192.168.10.239:9911/images/Avatar/1480491700398.png');
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
