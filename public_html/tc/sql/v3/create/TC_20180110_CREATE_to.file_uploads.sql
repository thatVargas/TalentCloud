/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Tristan O'Rourke
 * Created: 10-Jan-2018
 */

DROP TABLE IF EXISTS `file_uploads`;
CREATE TABLE `file_uploads` (
  `file_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `file_name` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `job_seeker_profile_accomp` longblob NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;