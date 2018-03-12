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

require_once '../dao/JobPosterDAO.php';
require_once '../model/JobPosters.php';

/**
 * 
 */
class  JobPosterController {

    /**
     * 
     * @param string $page_name
     * @param string $locale
     * @return Page object
     */
    public static function getJobPostersByLocale($locale) {
        
        $jobPosters = new JobPosters();
        $jobs = JobPosterDAO::getJobPostersByLocale($locale);
        $jobPosters->setJobs($jobs);
        return $jobPosters;
    }
    
    /**
     * 
     * @param string $page_name
     * @param string $locale
     * @return Page object
     */
    public static function getJobPosterById($locale,$jobPosterId) {
        
        $jobPoster = JobPosterDAO::getJobPosterById($locale,$jobPosterId);
        return $jobPoster;
    }
    
    /**
     * 
     * @param string $page_name
     * @param string $locale
     * @return Page object
     */
    public static function createJobPoster($jobPoster) {
        
        $newJobPosterId = JobPosterDAO::createJobPoster($jobPoster);
        return array("job_poster_id"=>$newJobPosterId);
    }

    /**
     *     
     * @param string $locale
     * @param int $managerUserId
     * @return Page object
     */
    public static function getJobPostersByManagerUserId($locale,$managerUserId) {
        
        $jobPosters = new JobPosters();
        $jobs = JobPosterDAO::getJobPostersByManagerId($locale,$managerUserId);
        $jobPosters->setJobs($jobs);
        return $jobPosters;
    }
}

?>