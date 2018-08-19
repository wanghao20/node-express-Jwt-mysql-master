/*
Navicat MySQL Data Transfer

Source Server         : .
Source Server Version : 50639
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50639
File Encoding         : 65001

Date: 2018-08-19 21:50:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for base_authorization
-- ----------------------------
DROP TABLE IF EXISTS `base_authorization`;
CREATE TABLE `base_authorization` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `moduleName` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '模块名称',
  `accessPermission` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '访问权限（查看/新增/删除/修改/其他）',
  `authorization` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '是否授权',
  `createDate` datetime DEFAULT NULL,
  `modifyDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1121594 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of base_authorization
-- ----------------------------
INSERT INTO `base_authorization` VALUES ('0000000012', '基础管理', '全部', '是', '2018-08-16 17:56:48', null);
INSERT INTO `base_authorization` VALUES ('0001121593', '考勤管理', '查看', '是', '2018-08-16 18:24:15', '2018-08-16 18:25:23');

-- ----------------------------
-- Table structure for base_dictionary
-- ----------------------------
DROP TABLE IF EXISTS `base_dictionary`;
CREATE TABLE `base_dictionary` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `numbering` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '字典项编码',
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '字典项名称',
  `type` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '字典项分类',
  `dictionaryKey` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '数据项名称',
  `dictionaryValue` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '数据项内容',
  `createDate` datetime DEFAULT NULL,
  `modifyDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`dictionaryKey`),
  UNIQUE KEY `id_UNIQUE` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1121596 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of base_dictionary
-- ----------------------------
INSERT INTO `base_dictionary` VALUES ('0000002315', '123456', '测试name', '测试type', '测试key', '测试val', '2018-08-16 14:39:03', '2018-08-16 18:28:54');
INSERT INTO `base_dictionary` VALUES ('0001121592', '45343', '4534', '53453', '453', '543', '2018-08-16 15:30:32', null);
INSERT INTO `base_dictionary` VALUES ('0001121595', '1', '访问权限', '系统', 'accessPermission', '全部/查看/新增/删除/修改/其他', '2018-08-16 16:52:06', null);

-- ----------------------------
-- Table structure for base_module
-- ----------------------------
DROP TABLE IF EXISTS `base_module`;
CREATE TABLE `base_module` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `numbering` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '模块编码',
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '模块名称',
  `accessPermission` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '访问权限（查看/新增/删除/修改/其他）',
  `moduleLinkAaddress` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '模块链接地址',
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '模块说明',
  `pName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '父模块名称',
  `pId` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '父模块id',
  `createDate` datetime DEFAULT NULL,
  `modifyDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1121593 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of base_module
-- ----------------------------
INSERT INTO `base_module` VALUES ('0001121588', '1', '基础管理', '全部', 'BaseManagement', '基本管理模块', '', null, '2018-08-15 16:01:16', '2018-08-16 17:35:26');
INSERT INTO `base_module` VALUES ('0001121592', '101', '业务字典', '全部', 'businessDictionary', '业务字典', '基础管理', '0001121588', '2018-08-16 17:32:48', '2018-08-16 17:40:26');

-- ----------------------------
-- Table structure for base_organization
-- ----------------------------
DROP TABLE IF EXISTS `base_organization`;
CREATE TABLE `base_organization` (
  `id` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT 'id',
  `zoning` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '行政区划',
  `agencyCode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '机构代码',
  `level` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '级别（区级/县级）',
  `remarks` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '备注',
  `position` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '地理位置',
  `orgName` varchar(100) CHARACTER SET latin1 DEFAULT NULL COMMENT '组织机构名称',
  `userId` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `modifyDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of base_organization
-- ----------------------------
INSERT INTO `base_organization` VALUES ('1', null, null, null, null, null, 'test1', null, '2018-08-07 17:31:51', '2018-08-07 17:31:55');
INSERT INTO `base_organization` VALUES ('2', null, null, null, null, null, 'test2', null, '2018-08-08 17:35:12', '2018-08-07 17:35:16');
INSERT INTO `base_organization` VALUES ('3', null, null, null, null, null, 'test3', null, '2018-08-07 17:35:31', '2018-08-07 17:35:34');
INSERT INTO `base_organization` VALUES ('4', null, null, null, null, null, 'test4', null, '2018-08-07 17:35:43', '2018-08-07 17:35:47');

-- ----------------------------
-- Table structure for base_role
-- ----------------------------
DROP TABLE IF EXISTS `base_role`;
CREATE TABLE `base_role` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `numbering` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '角色编码',
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '角色名称',
  `roleType` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '角色类型（系统管理员/普通账户）',
  `remarks` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '角色描述',
  `createDate` datetime DEFAULT NULL,
  `modifyDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1121589 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of base_role
-- ----------------------------
INSERT INTO `base_role` VALUES ('0001121588', '147258', '系统管理员', '系统管理员', '描述测试一', '2018-08-15 16:01:16', '2018-08-15 17:56:19');

-- ----------------------------
-- Table structure for base_user
-- ----------------------------
DROP TABLE IF EXISTS `base_user`;
CREATE TABLE `base_user` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户名',
  `username` varchar(20) CHARACTER SET latin1 NOT NULL,
  `password` varchar(60) CHARACTER SET latin1 NOT NULL,
  `roleName` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `roleId` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '权限id',
  `departmentId` int(11) DEFAULT NULL COMMENT '部门id',
  `idCard` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '身份证号',
  `sex` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '性别',
  `phone` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '类型（编制/外聘）',
  `photo` longblob COMMENT '图片',
  `numbering` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '编号',
  `remarks` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '备注',
  `createDate` datetime DEFAULT NULL,
  `modifyDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`idCard`),
  UNIQUE KEY `id_UNIQUE` (`id`) USING BTREE,
  UNIQUE KEY `username_UNIQUE` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1121590 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of base_user
-- ----------------------------
INSERT INTO `base_user` VALUES ('0001121585', '2222222', '2222222', '$2a$10$84TFQHMcskq4GXAdfboxQ.HnRyDrZn9z20QNvluquAg5YHSGC90UK', '普通账户', null, null, '', null, '22222222222', null, null, '22222222', null, '2018-08-13 13:06:54', '2018-08-16 14:20:03');
INSERT INTO `base_user` VALUES ('0001121587', '测试', 'admin', '$2a$10$shKTmA9KDPchzzu9Z9x5NeRptKGoLh92i5NT7ImTry4iG2kLS5GeG', '系统管理员', '1121588', null, '', null, '15885476900', null, null, '13455', null, '2018-08-15 16:00:08', '2018-08-17 11:40:49');
INSERT INTO `base_user` VALUES ('0001121588', '测试2', 'admin1', '$2a$10$ApER2TO6UnfjesyTq9j5fuZ.yCMaSc4T/y/q2F1gt0ANkJMBEP0PO', '系统管理员', null, null, '', null, '123456789', null, null, '147258', null, '2018-08-15 16:01:16', '2018-08-15 17:56:19');
INSERT INTO `base_user` VALUES ('0001121589', '测试3', '12345678', '$2a$10$j46SPN6VHYzvVxiT4enfnu9aOxDcjrifOczbpLW2MpIkJ852QHMkS', '普通账户', null, null, '', null, '1234545', null, null, '258369', null, '2018-08-15 16:29:11', '2018-08-16 14:20:09');
