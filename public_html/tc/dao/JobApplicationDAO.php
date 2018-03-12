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
require_once '../model/JobPosterApplication.php';

/**
 * Summary: Data Access Object for Resources
 * 
 * @extends BaseDAO
 */
class JobApplicationDAO extends BaseDAO {
    
    /**
     * 
     * Returns an array of ApplicationQuestionAnswer objects associated with
     * a given job_poster_application_id.
     * 
     * @param int $jobPosterApplicationId
     * @return ApplicationQuestionAnswer[]
     */
    public static function getApplicationQuestionAnswersByApplicationId($jobPosterApplicationId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
            SELECT 
                qa.application_question_answer_id,
                qa.job_poster_application_id,
                qa.question,
                qa.answer
            FROM application_question_answer as qa
            WHERE
                qa.job_poster_application_id = :job_poster_application_id
            ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'ApplicationQuestionAnswer', array('application_question_answer_id', 'job_poster_application_id','question','answer'));
            
            $questionAnswers = $sql->fetchAll();
            
        } catch (PDOException $e) {
            return 'getApplicationQuestionAnswersByApplicationId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $questionAnswers;
    }
    
    /**
     * Returns the JobPosterApplicaiton object with the supplied job_poster_application_id.
     * 
     * @param int $jobPosterApplicationId
     * @return JobPosterApplication
     */
    public static function getJobPosterApplicationByApplicationId($jobPosterApplicationId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT 
            jpa.job_poster_application_id,
            jpa.application_job_poster_id,
            jpa.application_job_seeker_profile_id
        FROM job_poster_application jpa
        WHERE
        jpa.job_poster_application_id = :job_poster_application_id
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_application_id', $jobPosterApplicationId, PDO::PARAM_INT);
       
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPosterApplication',array('job_poster_application_id', 'application_job_poster_id','application_job_seeker_profile_id'));
            $jobPosterApplication = $sql->fetch();            
        } catch (PDOException $e) {
            return 'getJobPosterApplicationByApplicationId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPosterApplication;
    }
    
    /**
     * 
     * Returns an array of all JobPosterApplication objects associated with the
     * specified Job Poster.
     * 
     * @param int $jobPosterId
     * @return JobPosterApplication[]
     */
    public static function getJobPosterApplicationsByJobPosterId($jobPosterId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT 
            jpa.job_poster_application_id,
            jpa.application_job_poster_id,
            jpa.application_job_seeker_profile_id
        FROM job_poster_application jpa
        WHERE
        jpa.application_job_poster_id = :job_poster_id
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_id', $jobPosterId, PDO::PARAM_INT);
       
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPosterApplication',array('job_poster_application_id', 'application_job_poster_id','application_job_seeker_profile_id'));
            $jobPosterApplications = $sql->fetchAll();            
        } catch (PDOException $e) {
            return 'getJobPosterApplicationsByJobPosterId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPosterApplications;
    }
    
    /**
     * Returns an array of all JobPosterApplication objects associated with the
     * specified Job Seeker Profile.
     * 
     * @param int $jobSeekerProfileId
     * @return JobPosterApplication[]
     */
    public static function getJobPosterApplicationsByJobSeekerProfileId($jobSeekerProfileId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT 
            jpa.job_poster_application_id,
            jpa.application_job_poster_id,
            jpa.application_job_seeker_profile_id
        FROM job_poster_application jpa
        WHERE
        jpa.application_job_seeker_profile_id = :job_seeker_profile_id
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_seeker_profile_id', $jobSeekerProfileId, PDO::PARAM_INT);
       
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPosterApplication',array('job_poster_application_id', 'application_job_poster_id','application_job_seeker_profile_id'));
            $jobPosterApplications = $sql->fetchAll();            
        } catch (PDOException $e) {
            return 'getJobPosterApplicationsByJobSeekerProfileId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPosterApplications;
    }
    
    /**
     * Returns an array of all JobPosterApplication objects associated with the
     * specified applicant User Id.
     * 
     * @param int $applicantUserId
     * @return JobPosterApplication[]
     */
    public static function getJobPosterApplicationsByApplicantUserId($applicantUserId) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "
        SELECT 
            jpa.job_poster_application_id,
            jpa.application_job_poster_id,
            jpa.application_job_seeker_profile_id
        FROM job_poster_application jpa, user_job_seeker_profiles user_to_profile
        WHERE
        jpa.application_job_seeker_profile_id = user_to_profile.job_seeker_profile_id
        user_to_profile.user_id = :user_id
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':user_id', $applicantUserId, PDO::PARAM_INT);
       
        try {
            //$result = BaseDAO::executeDBTransaction($link,$sql);
            //$link->beginTransaction();
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            //$link->commit();
            $sql->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'JobPosterApplication',array('job_poster_application_id', 'application_job_poster_id','application_job_seeker_profile_id'));
            $jobPosterApplications = $sql->fetchAll();            
        } catch (PDOException $e) {
            return 'getJobPosterApplicationsByApplicantUserId failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $jobPosterApplications;
    }
    
    /**
     * Creates a new JobPosterApplication row in database, returns the 
     * job_poster_application_id of the new row.
     * 
     * @param JobPosterApplication $jobPosterApplication
     * @return int - new job_poster_application_id
     */
    public static function createJobPosterApplication($jobPosterApplication) {
        $link = BaseDAO::getConnection();
        
        $sqlStr = "INSERT INTO job_poster_application
            (application_job_poster_id, application_job_seeker_profile_id)
            VALUES
            (:job_poster_id, :job_seeker_profile_id)       
        ;";
        
        $sql = $link->prepare($sqlStr);
        $sql->bindValue(':job_poster_id', $jobPosterApplication->getApplication_job_poster_id(), PDO::PARAM_INT);
        $sql->bindValue(':job_seeker_profile_id', $jobPosterApplication->getApplication_job_seeker_profile_id(), PDO::PARAM_INT);
        
        try {
            $sql->execute() or die("ERROR: " . implode(":", $link->errorInfo()));
            $rowsmodified = $sql->rowCount();
            if($rowsmodified > 0){
                $application_id = $link->lastInsertId();
            }
        } catch (PDOException $e) {
            return 'createJobPosterApplication failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $application_id;
    }
    
    /**
     * 
     * Accepts an array of ApplicationQuestionAnswer objects, and adds them all
     * to database.
     * NOTE: since they are added as new items, a new application_question_answer_id 
     * will be created for each, regardless of the contents of the input objects.
     * 
     * @param ApplicationQuestionAnswer[] $applicationQuestionAnswers
     * @return int $rowsmodified - number of rows modified in database
     */
    public static function createApplicationQuestionAnswers($applicationQuestionAnswers) {
        if (sizeof($applicationQuestionAnswers) === 0){
            return 0;
        }
        
        $link = BaseDAO::getConnection();
                
         //Build bulk insert sql strings for array data
        $values = [];
        $valueStrings = [];
        foreach($applicationQuestionAnswers as $questionAnswer) {
            $valueStrings[] = '(?, ?, ?)';
            $entryValues = [$questionAnswer->getJob_poster_application_id(), $questionAnswer->getQuestion(), $questionAnswer->getAnswer()];
            $values = array_merge($values, $entryValues);
        }
        
        $sqlStr = "INSERT INTO application_question_answer 
            (job_poster_application_id, question, answer)
            VALUES " . 
            implode(',', $valueStrings) . ";";
        
        $sql = $link->prepare($sqlStr);
        try {
            $sql->execute($values) or die("ERROR: " . implode(":", $link->errorInfo()));
            $rowsmodified = $sql->rowCount();
        } catch (PDOException $e) {
            return 'createApplicationQuestionAnswers failed: ' . $e->getMessage();
        }
        BaseDAO::closeConnection($link);
        return $rowsmodified;
    }
}