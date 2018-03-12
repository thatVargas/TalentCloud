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

require_once '../model/User.php';
require_once '../controller/UserController.php';
require_once '../controller/JobPosterController.php';
require_once '../controller/JobApplicationController.php';

/**
 * 
 */
class  DashboardController {

    /**
     * 
     * @param int $user_id
     * @param string $locale
     * @return Object $result
     */
    public static function getDashboardByUserId($user_id, $locale) {
        $dummyUser = new User();
        $dummyUser->setUser_id($user_id);
        $user = UserController::getUserById($dummyUser);

        switch ($user->getUser_role()) {
            case 'jobseeker':
                $result = JobApplicationController::getJobApplicationsWithAnswersByApplicantUserId($user->getUser_id());
                break;

            case 'manager':                
                $result = JobPosterController::getJobPostersByManagerUserId($locale,$user->getUser_id());
                break;

            case 'administrator':
                $result = '';
                break;

            default:
                $result = '';
                break;
        }
        
        return $result;
    }

}