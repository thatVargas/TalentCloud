<?php //header('Content-Type: text/html; charset=utf-8'); ?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor . 
-->
<html lang="en">
<head>
    <title>GC Talent Cloud</title>
    <?php include 'inc/head.php'; ?>
</head>

<body>
<ul id="wb-tphp">
    <li class="wb-slc">
        <a class="wb-sl" href="#jobs">Skip to available jobs</a>
    </li>
</ul>

<?php include 'inc/fip.php';?>
<?php include 'inc/nav.php';?>

<!-- A top-level dialog or overlay elements should be children of this div-->
<div id="overlays">
    <!-- BEGIN - Registration Dialog and Overlay-->
    <div id="registerFormOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="registerFormTitle" aria-describedby="registerFormDescription">
        <div id="registerFormWrapperWindow" class="dialogHalfWidthWrapperWindow">
            <div id='registerFormTitleWrapper' class="dialogTitle">
                <strong id='registerFormTitle' title="Register for Talent Cloud">Register for Talent Cloud</strong>
                <div class="hidden" id="registerFormDescription">Register for Talent Cloud</div>
            </div>
            <div class="wb-frmvld wb-init dialogWindowInterior" id="registerFormWrapper">
                <form name="registerForm" id="registerForm" novalidate="novalidate" method="post" enctype="application/x-www-form-urlencoded">
                    <div class="center-block three-quarter-width">
                        <div class="form-group">
                            <label for="register_email">
                                <span>Email:</span>
                                <strong id="register_email_error" class="error hidden">
                                    <span id="register_email_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <input class="form-control form-textbox" id="register_email" name="register_email" type="text" required=""/>
                        </div>
                        <div class="form-group">
                            <label for="register_email_confirm">
                                <span>Re-enter email:</span>
                                <strong id="register_email_confirm_error" class="error hidden">
                                    <span id="register_email_confirm_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <input class="form-control form-textbox" id="register_email_confirm" name="register_email_confirm" type="text" required=""/>
                        </div>
                        <div class="form-group">
                            <label for="register_password">
                                <span>Password:</span>
                                <strong id="register_password_error" class="error hidden">
                                    <span id="register_password_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <input class="form-control form-textbox" id="register_password" name="register_password" type="password" required=""/>
                        </div>
                        <div class="form-group">
                            <label for="register_password_confirm">
                                <span>Re-enter password:</span>
                                <strong id="register_password_confirm_error" class="error hidden">
                                    <span id="register_password_confirm_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <input class="form-control form-textbox" id="register_password_confirm" name="register_password_confirm" type="password" required=""/>
                        </div>
                    </div>
                    <div class="hidden">
                        <p><a href="javascript:void(0)" onclick="UserAPI.hideRegisterForm(); return UserAPI.showLogin(this);" class="ui-link" id="switchToLogin" title="Already have an account? Click here to login.">Already have an account? Click here to login</a></p>
                    </div>
                    <div class="formButtonWrapper">
                        <input type="button" class="btn btn-default" id="registerFormCancelBtn" value="Cancel" onclick="UserAPI.hideRegisterForm()">
                        <input type="button" class="btn btn-primary" id="registerFormRegisterBtn" value="Register" onclick="UserAPI.register();">
                    </div>
                    <div class="clear"></div>
                </form>  
            </div>
        </div>
    </div>
    <div id="registerStatusOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="registerStatusTitle" aria-describedby="registerStatusDescription">
        <div id="registerStatusWrapperWindow" class="dialogHalfWidthWrapperWindow">
            <div id='registerStatusTitleWrapper' class="dialogTitle">
                <strong id='registerStatusTitle' title="Talent Cloud Registration Status">Talent Cloud Registration Status</strong>
                <div class="hidden" id="registerStatusDescription">Talent Cloud Registration Status</div>
            </div>
            <div class="dialogWindowInterior">
                <div id="registrationStatusSuccessMessage">

                </div>
                <div id="registrationStatusEmailConfMessage">

                </div>
                <div class="formButtonWrapper">
                    <input type="button" class="btn btn-default" id="registerStatusCloseBtn" value="Close" onclick="UserAPI.hideRegisterConf()">
                    <input type="button" class="btn btn-primary" id="registerStatusLoginBtn" value="Log in" onclick="UserAPI.hideRegisterConf(); return UserAPI.showLogin(this);"/>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
    <!-- BEGIN - Login Modal Dialog and Overlay-->
    <div id="loginOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="loginFormTitle" aria-describedby="loginFormDescription">
        <div id="loginFormWrapperWindow" class="dialogHalfWidthWrapperWindow">
            <div id='loginFormTitleWrapper' class="dialogTitle">
                <strong id='loginFormTitle' title="Login to TalentCloud">Login to TalentCloud</strong>
                <div class="hidden" id="loginFormDescription">Login to TalentCloud</div>
            </div>
            <div class="dialogWindowInterior">
                <form name="loginForm" id="loginForm" method="post" enctype="application/x-www-form-urlencoded">
                    <div class="label label-danger hidden" id="loginErrors"></div>
                    <div class="center-block three-quarter-width">
                        <div class="form-group">
                            <label for="login_email">
                                <span>Email:</span>
                                <strong id="login_email_error" class="error hidden">
                                    <span id="login_email_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <input class="form-control full-width" type="email" name="login_email" id="login_email" required=""/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="login_password">
                                <span>Password:</span>
                                <strong id="login_password_error" class="error hidden">
                                    <span id="login_password_error_msg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <input class="form-control full-width" type="password" name="login_password" id="login_password" required=""/>
                            </div>
                        </div>
                    </div>                
                    <div class="hidden">
                        <div style="margin: 1em 0 0 0;">
                            <a href="javascript:void(0)">Forgot your password? Click here to reset it. (Not working yet.)</a>
                        </div>
                        <div style="margin: 1em 0 0 0;">
                            <p><a href="javascript:void(0)" onclick="UserAPI.cancelLogin(); return UserAPI.showRegisterForm(this);" class="ui-link" id="switchToRegister" title="Don't have an account? Click here to register.">Don't have an account? Click here to register</a></p>
                        </div>
                    </div>
                                        
                    <div class="formButtonWrapper">
                        <input type="button" id="loginFormCancelBtn" value="Cancel" class="btn btn-default" onclick="UserAPI.cancelLogin()"/>
                        <input type="button" id="loginFormLoginBtn" value="Log in" class="btn btn-primary" onclick="return UserAPI.login()"/>
                    </div>
                    <div class="clear"></div>
                </form>
            </div>
        </div>
    </div>

    <!-- BEGIN - Profile Basic Info Edit Overlay-->
    <div id="profileBasicInfoEditOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profileBasicInfoEditTitle" aria-describedby="profileBasicInfoFormDescription">
        <div id="profileBasicInfoEditWrapperWindow" class="dialogThreeQuarterWrapperWindow">
            <div id="profileBasicInfoFormWrapper">
                <div id='profileBasicInfoEditTitleWrapper' class="dialogTitle">
                    <strong id='profileBasicInfoEditTitle' title="Edit your basic info">Edit your basic info</strong>
                    <div class="hidden" id="profileBasicInfoFormDescription">Edit your basic info</div>
                </div>

                <div class="dialogWindowInterior">
                    <img id="profileBasicInfoEditProfilePic" class="profilePicLarge" src="images/user.png" alt="Default user"/>
                    <a href="javascript:void(0)" id="showUploadProfilePic" onclick="JobSeekerAPI.showUploadProfilePic()"><img src="/images/btn_edit_dark.png" alt="Edit Profile Image" class="editImage"/></a>

                    <form name="profileBasicInfoForm" id="profileBasicInfoForm" method="post" enctype="application/x-www-form-urlencoded">

                        <div class="form-group leftPane">
                            <label for="profileEditFirstName">
                                <span>First Name:</span>
                                <strong id="profileEditFirstNameError" class="error hidden">
                                    <span id="profileEditFirstNameErrorMsg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <input class="form-control full-width" type="text" name="profileEditFirstName" id="profileEditFirstName" required=""/>
                            </div>
                        </div>
                        <div class="form-group rightPane">
                            <label for="profileEditLastName">
                                <span>Last Name:</span>
                                <strong id="profileEditLastNameError" class="error hidden">
                                    <span id="profileEditLastNameErrorMsg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <input class="form-control full-width" type="text" name="profileEditLastName" id="profileEditLastName" required=""/>
                            </div>
                        </div>
                        <div class="form-group clear">
                            <label for="profileEditTagline">
                                <span>Tagline:</span>
                            </label>
                            <div>
                                <input class="form-control full-width" type="text" name="profileEditTagline" id="profileEditTagline"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="profileEditTwitter">
                                <img src="images/twitter.png" alt="Twitter logo" class="form-icon"/>
                                <span>Twitter Username:</span>
                                <strong id="profileEditTwitterError" class="error hidden">
                                    <span id="profileEditTwitterErrorMsg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <input class="form-control full-width" type="text" name="profileEditTwitter" id="profileEditTwitter" placeholder="@Username"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="profileEditLinkedin">
                                <img src="images/linkedin.png" alt="LinkedIn logo" class="form-icon"/>
                                <span>LinkedIn Profile Address:</span>
                                <strong id="profileEditLinkedinError" class="error hidden">
                                    <span id="profileEditLinkedinErrorMsg" class="label label-danger"></span>
                                </strong>
                            </label>
                            <div>
                                <input class="form-control full-width" type="text" name="profileEditLinkedin" id="profileEditLinkedin" placeholder="https://www.linkedin.com/in/exampleuser"/>
                            </div>
                        </div>
                        <div>
                            <input type="button" id="profileBasicInfoEditSave" value="Save" class="btn btn-primary" onclick="JobSeekerAPI.saveJobSeekerProfileChanges()"/>
                            <input type="button" id="profileBasicInfoEditCancel" value="Cancel" class="btn btn-default" onclick="JobSeekerAPI.hideJobSeekerProfileEditOverlays()"/>
                        </div>
                    </form>
                </div>
            </div>
            <div id="profilePicUploadWrapper" class="hidden" aria-labelledby="profilePicUploadTitle" aria-describedby="profilePicUploadDescription">
                <div id='profilePicUploadTitleWrapper' class="dialogTitle">
                    <strong id='profilePicUploadTitle' title="Upload a new profile image">Upload a new profile image</strong>
                    <div class="hidden" id="profilePicUploadDescription">Upload a new profile image</div>
                </div>
                <div class="fileUpload">
                    <div class="leftPane">
                        <div>
                            <input type="file" id="profilePicUploadField" class="fileInput" name="Profile Pic" accept="image/*" />
                        </div>
                        <div id="profilePicUploadDrop" class="fileDropZone fileDropZoneNormal">
                            <p>Drop file here</p>
                        </div>
                    </div>
                    <div class="rightPane">
                        <div id="fileUploadPreviewPanel" style="min-height:130px;">
                            <a id="profilePicUploadClear" class="fileUploadReset" href="#" title="Remove all files from list">Clear</a>
                            <ul id="profilePicUploadPreview" class="filePreviewList"></ul>
                        </div>
                        <div id="fileUploadButtons">
                            <a id="profilePicCancelBtn" href="javascript:void(0)" class="btn btn-default" onclick="JobSeekerAPI.hideUploadProfilePic()">Cancel</a>
                            <a id="profilePicUploadBtn" class="btn btn-primary" href="#" title="Upload all files in list">Upload</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- BEGIN - About Me Edit Overlay-->
    <div id="profileAboutMeEditOverlay" class="hidden dialogOverlay" role="dialog" aria-labelledby="profileAboutMeEditTitle" aria-describedby="profileAboutMeFormDescription">
        <div id="profileAboutMeFormWrapperWindow" class="dialogThreeQuarterWrapperWindow">
            <div id='profileAboutMeEditTitleWrapper' class="dialogTitle">
                <h3 id='profileAboutMeEditTitle' title="Edit your About Me info">Edit your About Me info</h3>
                <div class="hidden" id="profileAboutMeFormDescription">Edit your About Me info</div>
            </div>
            <div class="dialogWindowInterior">
                <form name="profileAboutMeForm" id="profileAboutMeForm" method="post" enctype="application/x-www-form-urlencoded">
                    <div class="form-group">
                        <label for="profileEditAboutMe">
                            <span>About Me:</span>
                        </label>
                        <div>
                            <textarea class="form-control full-width" name="profileEditAboutMe" id="profileEditAboutMe" form="profileAboutMeForm"></textarea>
                        </div>
                    </div>
                    <div>
                        <input type="button" id="profileAboutMeEditSave" value="Save" class="btn btn-primary" onclick="JobSeekerAPI.saveJobSeekerProfileChanges()"/>
                        <input type="button" id="profileAboutMeEditCancel" value="Cancel" class="btn btn-default" onclick="JobSeekerAPI.hideJobSeekerProfileEditOverlays()"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- BEGIN - Standard Yes/No Modal Popup-->
    <div id="yesNoModalOverlay" class="yesNoModalOverlay hidden" role="dialog">
        <div id="yesNoModalWindow" class="yesNoModalWindow">
            <div class="yesNoModalContent">
                <div id="yesNoModalTitle" class="yesNoModalTitle">Title</div>
                <div id="yesNoModalText" class="yesNoModalText">Text</div>
                <div id="modalButtons">
                </div>
            </div>
        </div>
    </div>
</div>

<!-- BEGIN - Main Content Section-->
<main>
    <section class="pageContent" id="homePageContentSection">
        <div class="pageBanner">
            <div id="logo-container" class="logo-container">
                <div class="container">
                    <div class="row">
                        <div class="page-banner--tag-line--logo-container col-xs-12 col-sm-3 logo-container">
                            <a href="/" role="img" aria-label="GC Talent Cloud">
                                <img class="tc-logo" src="/images/talentcloudHomepage.png" width="229" alt="GC Talent Cloud logo"/>
                            </a>
                        </div>
                        <div class="h1 col-xs-12 col-sm-7 col-md-6 logo-tagline">People have a right to <br/>meaningful work.</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pageBody" id="homePageContent">
            <section class="section homepage--intro">
                <div class="container">

                    <p class="lead"><a id="mission"></a>The Government of Canada must embrace new methods and tools to improve how it designs, builds,
                        and delivers services.</p>
                    <p class="text">The Canadian Digital Service (CDS) is bringing together the skills and expertise needed to
                        accelerate this change.</p>
                </div>
            </section>
            <section class="section page-what-we-do">
                <div class="container">
                    <h2 class="section--title">What We Do</h2>
                    <p class="lead">
                            The Canadian Digital Service is focused first and foremost on delivery: building simple, easy to use services directly with federal departments. We learn by doing, and we use this experience to keep our work firmly grounded in practical experience. 
                    </p>

                    <p>
                            Inspired by digital initiatives around the world, we are bringing together digital talent and external and government partners to:
                    </p>

                    <ul class="icon-list">

                            <li class="item">
                                    <span class="item-icon"><i class="fa fa-code"></i></span>
                                    <span class="item-text">
                                            <h3>Deliver solutions</h3>
                                            <p>We work with federal organizations to design, prototype, and build better digital services. We focus on solving problems using design, agile methods, and proven technologies that put the user at the centre of our work. We take successful digital solutions and help replicate them across government. </p>
                                    </span>
                            </li>

                            <li class="item">
                                    <span class="item-icon"><i class="fa fa-users"></i></span>
                                    <span class="item-text">
                                            <h3>Build capacity</h3>
                                            <p>We invest in recruitment, learning, and communities of practice to help departments and public servants amplify their skills in areas like user research, design, and data science. </p>
                                    </span>
                            </li>

                            <li class="item">
                                    <span class="item-icon"><i class="fa fa-comments-o"></i></span>
                                    <span class="item-text">
                                            <h3>Provide advice</h3>
                                            <p>We provide advice to federal organizations grounded in practical experience and global best practices.</p>
                                    </span>
                            </li>
                    </ul>

                    <p>We work in the open, sharing what we learn to help make a bigger impact. Housed at the Treasury Board Secretariat, we benefit from line of sight across government and close proximity to the policies and standards needed to drive and scale this transformation.</p>

                    <h2><a name="partnering"></a>Interested in partnering with us?</h2>

                    <p>We focus on improving services to the public and, in particular, advancing services that have a big impact (e.g., used by many people). We are on the lookout for opportunities to get involved at the front end of a problem. When we partner, we will work with you and your service users  on discovery and design, before determining the best way to get the right digital solution in place (e.g. buy, build, hybrid).</p>

                    <p>To ensure the work we do will measurably improve services, we assess potential projects against the following criteria with departments, which we call the “Three Rs” (Readiness, Reach, and Replicability):</p>

                    <h3>Readiness</h3>

                    <p>Is there:</p>

                    <ul>

                            <li>a clearly defined problem?</li>
                            <li>an empowered service owner with a clear path to deploy a solution?</li>
                            <li>a commitment to adopt user-centric, open, and agile techniques?</li>
                            <li>flexibility concerning the technology solution?</li>
                            <li>broader organizational awareness and support?</li>

                    </ul>

                    <h3>Reach</h3>

                    <p>What is the:</p>

                    <ul>

                            <li>nature of the target audience? (e.g. veterans, citizenship applicants)</li>
                            <li>number of potential service users?</li>
                            <li>nature and scope of the service impact on the user? (e.g., saving time, saving money, improving health)</li>

                    </ul>

                    <h3>Replicability</h3>

                    <p>Can we:</p>

                    <ul>

                            <li>scale the solution to other users, within the organization, across government or with other partners?</li>
                            <li>package up the solution and share it for others to use?</li>
                            <li>leverage this project to unlock a barrier to service transformation?</li>

                    </ul>

                    <p>We want to help you build the best, so we take into account our current expertise and availability when we assess an opportunity; when it makes sense, we may bring other partners with complementary skills and tools to the table to help. Where a solution already exists or another partner may be a better fit, we will help connect you with the broader #GCDigital community or to outside partners.</p>

                    <p>Interested in chatting about a potential partnership? <a href="/contact/">Contact us!</a></p>
                </div>
            </section>
            <section class="section section--featured-video">
                <div class="container video-container">

                    <div class="embed-responsive embed-responsive-16by9">
                        <video width="640" height="360" controls>
                            <source src="videos/1479932728445-v0ch3x.mp4" type="video/mp4">
                            Your browser does not support the <code>video</code> tag.
                        </video>
                    </div>

                    <div>
                        <a href="#video-transcript" title="Video Transcript" class="button small outline dark wb-lbx lbx-modal wb-init wb-lbx-inited" id="wb-auto-2">Transcript</a>
                    </div>

                    <section id="video-transcript" class="mfp-hide modal-dialog modal-content overlay-def">
                        <header class="modal-header">
                            <h2 class="modal-title">Transcript</h2>
                        </header>
                        <div class="modal-body">
                            <p>Digital isn't just about building apps, or using the latest technology. It's about putting people first, by designing services that are focused on what users need.</p>

                            <p>We're about making it faster, simpler, and easier, to access government services online.</p>

                            <p>We are bringing together top talent from inside and outside of government that includes developers, designers, data scientists and user experience researchers. We're partnering with departments to solve problems, in order to make services better.</p>

                            <p>We're working in the open, using agile methods and constantly iterating, while relentlessly focusing on user needs.</p>

                            <p>CDS is not about IT. It's about service. User centric government services. It's about recognizing services need to be at the centre of our priorities as a government. Our relevance to citizens is in jeopardy if we can't deliver digital services.</p>

                            <p>We are learning from digital government movements across the globe, and working with the digital community across Canada, to shape a Canadian Digital Service.</p>

                            <p>Together, we can deliver world-class services that are simple and easy to use. It's what Canadians expect. Open. Agile. And focused on delivery. We are the Canadian Digital Service.</p>
                        </div>
                    </section>

                </div>
            </section>
            <section class="section homepage--our-team">
                <div class="page-banner--scrim"></div>

                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <h2 class="section--title">Our Team</h2>

                            <p>We are a building a team with diverse skills and backgrounds, and we’re recruiting! <a href="/our-team">Learn more<span class="sr-only"> about our team:</span></a> about the designers, developers, UX researchers, policy hackers,
                                data specialists, and communicators who make up CDS.</p>
                            <p>
                                <a href="/our-team" class="button yellow">Meet our team</a>
                                <a href="/work-with-us" class="button yellow">Join our team</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </div>
    </section>
    
    <section class="pageContent hidden" id="browseJobsSection">
        <div class="pageBanner">
            <h2 class="section--title" id="browseTitle">Browse Jobs</h2>
        </div>
        <div id="jobs" class="pageBody">
            <div id="noJobs" class="hidden">
                No jobs found
            </div>
            <div id="loadingJobs" class="hidden">
                <img class="center-block" src="/images/working.gif" alt="Loading jobs"/>
            </div>
            <div id="jobList" class="jobList hidden">
                
            
            </div>
            
            <div id="jobPosterApplication" class="hidden">

            </div>
        </div>
 
        <div class="jobCount hidden">
            <span id="contactCount">0</span> jobs
        </div>
    </section>
    
    <section class="pageContent hidden" id="viewJobPosterSection">
        <div class="pageBanner">
            <div id="jobPosterHeaderSection" class="container">
                <h2 class="section--title" id="browseTitle">Browse Jobs</h2>
                <h2 id="jobPosterTitle"></h2>
                <p id="jobPosterLocation">
                    <span id="jobPosterDepartment"></span> - <span id="jobPosterCity"></span>, <span id="jobPosterProvince"></span>
                </p>
                <p id="jobPosterId">#<span id="jobPosterIdValue"></span></p>
                <input id="jobPosterJobId" type="hidden"/>
            </div>
        </div>
        <div class="pageBody">
            <section id="jobPosterDatapointsSection">
                <div class="container">
                    <ul>
                        <li>
                            <p id="jobPosterSalaryRange">
                                <span id="jobPosterSalaryRangeLabel">Compensation</span>: <span id="jobPosterSalaryRangeValue"></span>
                            </p>
                        </li>
                        <li>
                            <p id="jobPosterTerm">
                                <span id="jobPosterTermLabel">Duration</span>: <span id="jobPosterTermValue"></span>
                            </p>
                        </li>
                        <li>
                            <p id="jobPosterJobLevel">
                                <span id="jobPosterJobLevelLabel">Job Level</span>: <span id="jobPosterJobLevelValue"></span>
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
            <section>
                <div class="container">
                    <h3 id="jobPosterImpactLabel" class="jobPosterSectionTitle">Impact</h3>
                    <p id="jobPosterImpact"></p>
                </div>
            </section>
            <section>
                <div class="container">
                    <h3 id="jobPosterKeyTasksLabel" class="jobPosterSectionTitle">Key Tasks</h3>
                    <ul id="jobPosterKeyTasks"></ul>
                </div>
            </section>
            <section>
                <div class="container">
                    <h3 id="jobPosterCoreCompetenciesLabel" class="jobPosterSectionTitle">Core Competencies</h3>
                    <ul id="jobPosterCoreCompetencies"></ul>
                </div>
            </section>
            <section>
                <div class="container">
                   <h3 id="jobPosterDevelopingCompetenciesLabel" class="jobPosterSectionTitle">Developing Competencies</h3>
                    <ul id="jobPosterDevelopingCompetencies"></ul>
                </div>
            </section>
            <section>
                <div class="container">
                    <h3 id="jobPosterOtherRequirementsLabel" class="jobPosterSectionTitle">Other Requirements</h3>
                    <ul id="jobPosterOtherRequirements"></ul>
                </div>
            </section>

            <div id="jobPosterButtonWrapper">
                <button id="jobPosterApplyButton" class="btn btn-primary" value="View" onclick="JobPostAPI.jobPosterApplication();">
                    Apply Now
                </button>
            </div>
        </div>
    </section>
    
    <section class="pageContent hidden" id="profileSection">
        <div class="pageBanner">
            <div id="profileBannerFiller"></div>
        </div>
        <div class="pageBody container">
            <div id="profileBasicInfo" class="centered">
                <div id="profileBasicInfoTopBar">
                    <div class="socialMediaWrapper"> 
                        <ul id="profileSocialMediaLinks"> 
                            <li id="profileTwitterLinkWrapper" class="hidden">
                                <a href="#" id="profileTwitterLink" target="_blank"><img src="/images/twitter.png" class="socialMediaLink" alt="Twitter logo"/></a>
                            </li>
                            <li id="profileLinkedinLinkWrapper" class="hidden">
                                <a href="#" id="profileLinkedinLink" target="_blank"><img src="/images/linkedin.png" class="socialMediaLink" alt="LinkedIn logo"/></a>
                            </li>    
                        </ul>
                    </div>
                    <img id="myProfilePic" class="profilePicLarge" src="images/user.png" alt="Profile Pic"/>
                    <div class="editProfileWrapper">
                        <a href="javascript:void(0)" id="profileBasicInfoEdit" onclick="JobSeekerAPI.showJobSeekerProfileBasicInfoEdit()"><img src="/images/btn_edit_dark.png" alt="Edit Basic Info" class="editImage"/></a>
                    </div>
                </div>
                <div id="profileNameWrapper">
                    <div id="profileName">
                        <span id="profileFirstName"></span> <span id="profileLastName"></span>
                    </div>
                </div>
                <div class="profileTagLineContainer">
                    <p id="profileTagLine">Default tag line!</p>
                    <p>
                        <strong>Available: </strong><span id="profileStartDate"></span>
                        <br>
                        <strong>Status: </strong><span id="profileStatus"></span>
                    </p>
                </div>
                <input type="hidden" id="profileId"/>
                <input type="hidden" id="profileLastUpdated"/>
            </div>
            <div id="profileAboutMeWrapper" class="profileSubSection">
                <div class="profileSubSectionTitleBar">
                    <h2>About Me</h2>
                    <a href="javascript:void(0)" id="profileAboutMeEdit" class="sectionEditBtn" onclick="JobSeekerAPI.showJobSeekerProfileAboutMeEdit()"><img src="/images/btn_edit_dark.png" alt="Edit About Me" class="editImage"/></a>
                </div>
                <p id="profileAboutMe">This is the about me section.</p>
            </div>
            <div id="profileSkillsWrapper" class="profileSubSection">
                <div class="profileSubSectionTitleBar">
                    <h2>My Skills and Knowledge</h2>
                    <a href="javascript:void(0)" id="profileSkillsEdit" class="sectionEditBtn"><img src="/images/btn_edit_dark.png" alt="Edit Skills" class="editImage"/></a>
                </div>
                <ul id="profileSkillsList">
                </ul>
            </div>
        </div>
    </section>
</main>
<?php include 'inc/footer.php';?>
</body>
</html>
