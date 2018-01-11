<?php

	
    date_default_timezone_set('America/Toronto');
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
    set_time_limit(0);

    if(!isset($_SESSION)){
        session_start();
    }

    /*set api path*/
    set_include_path(get_include_path() . PATH_SEPARATOR);


/** Model Classes */
require_once '../dao/BaseDAO.php';
require_once '../model/FileUpload.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class FileUploadDAO extends BaseDAO {

    
    /**
     * 
     * @param type $file_id
     * @return type FileUpload
     */
    public static function getFileUploadByFileId($file_id) {

        $link = BaseDAO::getConnection();
        $sqlStr = "
            SELECT f.file_id,
                f.file_name,
                f.file_content,
                f.last_updated
            FROM file_upload f
            WHERE f.file_id = :file_id
            ORDER BY f.last_updated DESC LIMIT 1
            ";
        $sql = $link->prepare($sqlStr);
        $sql->bindParam(':file_id', $file_id, PDO::PARAM_INT);

        try {
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'FileUpload',array('file_id','file_name','file_content','last_updated'));
            $file = $sql->fetch();
        } catch (PDOException $e) {
            return 'getFileUploadByFileId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $file;
    }
    
    public static function addFileUpload($file_upload){
        
        $file_id_int = intval($file_upload->getFile_id());
        $file_name = $file_upload->getFile_name();
        $file_content = $file_upload->getFile_content();
        
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            
                INSERT INTO file_upload
                (file_id,
                file_name,
                file_content,
                last_upated
                VALUES
                (
                :file_id,
                :file_name,
                :file_content,
                now()
                );
            ";
        
        $sql = $link->prepare($sqlStr);
        //$sql->bindParam(':job_seeker_profile_id', $jobSeekerProfile_id, PDO::PARAM_INT);
        $sql->bindParam(':file_id', $file_id_int, PDO::PARAM_INT);
        $sql->bindParam(':file_name', $file_name, PDO::PARAM_STR);
        $sql->bindParam(':file_content', $file_content, PDO::PARAM_LOB);

        $rowsmodified = 0;
        
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            $link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            $link->commit();
            $rowsmodified = $sql->rowCount();
            //$sql->execute() or die("ERROR: " . implode(":", $conn->errorInfo()));
            //$sql->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'JobSeekerProfile',array('job_seeker_profile_id','job_seeker_profile_link','job_seeker_profile_accomp','job_seeker_profile_best_exp','job_seeker_profile_worst_exp','job_seeker_profile_superpower','last_updated'));
            //$rows = $sql->fetchAll();
            //var_dump($rows);
            //$result->
            //var_dump($result);
            if($rowsmodified > 0){
                $insert_id = $link->lastInsertId();
            }
        } catch (PDOException $e) {
            return 'addFileUpload failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $insert_id;
    }
}

?>