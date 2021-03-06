/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var UserAPI = {};

UserAPI.version = "v1";

UserAPI.baseURL = "/tc/api/" + UserAPI.version + "";

UserAPI.User = function () {
    this.user_id = null;
    this.firstname = null;
    this.lastname = null;
    this.email = null;
    this.password = null;
    this.is_confirmed = null;
    this.user_role = null;
};

/**
 * @param {XMLHttpRequest} httpResponse - returned from http request
 * @return {UserAPI.User}
 */
UserAPI.parseUserResponse = function(httpResponse) {
    var userJson = JSON.parse(httpResponse);
    
    var user = new UserAPI.User();
    user.user_id = userJson.user_id;
    user.email = userJson.email;
    user.password = userJson.password;
    user.firstname = userJson.firstname;
    user.lastname = userJson.lastname;
    user.is_confirmed = userJson.is_confirmed;
    user.user_role = userJson.user_role;
    
    return user;
};

/**
 * 
 * @returns {undefined}
 */
UserAPI.login = function () {
    var loginErrors = document.getElementById("loginErrors");
    if (!loginErrors.classList.contains('hidden')) {
        loginErrors.classList.add('hidden');
    }
    var credentials = {};
    if (UserAPI.hasSessionUser()){
        credentials = UserAPI.getSessionUserAsJSON();
        if (UserAPI.hasAuthToken() && credentials !== null) {
            authToken = UserAPI.getAuthToken();
            credentials.authToken = UserAPI.getAuthToken();
            UserAPI.getUserById(credentials);
        }
    } else {
        var loginForm = document.getElementById("loginForm");
        var email = loginForm.login_email.value;
        var password = loginForm.login_password.value;
        credentials = FormValidationAPI.validateLoginForm(email, password);
        if (credentials !== null) {
            UserAPI.authenticate(credentials);
        }
    }
};

/**
 * 
 * @param {type} credentials
 * @returns {undefined}
 */
UserAPI.authenticate = function (credentials) {
    /*if(UserAPI.hasAuthToken() !== undefined){
     credentials.authToken = UserAPI.getAuthTokenAsJSON();
     }else{
     credentials.authToken = "";
     }*/

    var auth_url = UserAPI.baseURL + "/authenticate";
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open("POST", auth_url);

    } else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open("POST", auth_url);
    } else {
        // Otherwise, CORS is not supported by the browser.
        xhr = null;
        // TODO: indicate to user that browser is not supported
    }

    xhr.open('POST', auth_url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.addEventListener("progress", UserAPI.updateProgress, false);
    xhr.addEventListener("load", function () {
        UserAPI.authTokenCallback(xhr.response, credentials);
    }, false);
    xhr.addEventListener("error", UserAPI.transferFailed, false);
    xhr.addEventListener("abort", UserAPI.transferAborted, false);

    xhr.send(JSON.stringify(credentials));
};

/**
 * 
 * @param {type} credentials
 * @returns {undefined}
 */
UserAPI.getUserById = function (credentials) {
    authToken = credentials.authToken;
    var jwt_elements = authToken.split('.');
    var user_id_from_token = JSON.parse(window.atob(jwt_elements[1]));
    //console.log(user_id_from_token);

    var auth_url = UserAPI.baseURL + "/user/"+user_id_from_token.user_id ;
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open("GET", auth_url);

    } else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open("GET", auth_url);
    } else {
        // Otherwise, CORS is not supported by the browser.
        xhr = null;
        // TODO: indicate to user that browser is not supported
    }

    xhr.open('GET', auth_url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + authToken);
    xhr.addEventListener("progress", UserAPI.updateProgress, false);
    xhr.addEventListener("load", function () {
        UserAPI.loaded(xhr.response);
    }, false);
    xhr.addEventListener("error", UserAPI.transferFailed, false);
    xhr.addEventListener("abort", UserAPI.transferAborted, false);

    xhr.send();
};

/**
 * 
 * @returns {undefined}
 */
UserAPI.updateProgress = function () {

};

/**
 * 
 * @returns {Boolean}
 */
UserAPI.register = function (isManager) {
    var registerForm = document.getElementById("registerForm");
    var email = registerForm.register_email.value;
    var email_confirm = registerForm.register_email_confirm.value;
    var password = registerForm.register_password.value;
    var password_confirm = registerForm.register_password_confirm.value;
    var userrole = "jobseeker";
    if (isManager) {
        userrole = "manager";
    }
    var isValid = FormValidationAPI.validateRegisterForm(email, email_confirm, password, password_confirm);

    var credentials = {};
    credentials.email = email;
    credentials.password = password;
    credentials.userrole = userrole;
    // TODO: store name, email, hash in db and send validation email
    if (isValid) {
        UserAPI.registerUser(credentials);
    }
};


/**
 * 
 * @param {type} credentials
 * @returns {undefined}
 */
UserAPI.registerUser = function (credentials) {

    var registerUser_url = UserAPI.baseURL + "/user/register";
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open("POST", registerUser_url);

    } else if (typeof XDomainRequest != "undefined") {
        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open("POST", registerUser_url);
    } else {
        // Otherwise, CORS is not supported by the browser.
        xhr = null;
        // TODO: indicate to user that browser is not supported
    }

    xhr.open('POST', registerUser_url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    //xhr.setRequestHeader('X-CSRF-Token', UserAPI.getCSRFTokenValue());
    xhr.addEventListener("progress", UserAPI.updateProgress, false);
    xhr.addEventListener("load", function () {
        UserAPI.userRegistered(xhr.response);
    }, false);
    xhr.addEventListener("error", UserAPI.transferFailed, false);
    xhr.addEventListener("abort", UserAPI.transferAborted, false);

    xhr.send(JSON.stringify(credentials));
};

UserAPI.userRegistered = function (response) {
    //console.log(response);
    var result = JSON.parse(response);
    var registerSuccess = result.userRegistered;
    var confEmailSuccess = result.confEmailSent;
    UserAPI.clearFormFields("registerForm");
    UserAPI.showRegisterConf(registerSuccess, confEmailSuccess);
};

UserAPI.showRegisterConf = function (registerSuccess, confEmailSuccess) {
    var registrationForm = document.getElementById("registerFormOverlay");
    var registrationStatus = document.getElementById("registerStatusOverlay");
    var registrationFormStatusMessage = document.getElementById("registrationStatusSuccessMessage");
    var registrationFormEmailConfMessage = document.getElementById("registrationStatusEmailConfMessage");

    var registrationSuccessMessage = "<h4>Registration Successful</h4>";
    var registrationFailureMessage = "<h4>Registration Unsuccessful</h4>";
    if (registerSuccess) {
        registrationFormStatusMessage.innerHTML = registrationSuccessMessage;
    } else {
        registrationFormStatusMessage.innerHTML = registrationFailureMessage;
    }
    /*
     var emailConfSuccessMessage = "<div>Confirmation email sent successfully. Please check your email and confirm your email address.</div>";
     var emailConfFailureMessage = "<div>Confirmation email was not sent successfully</div>";
     
     if(confEmailSuccess){
     registrationFormEmailConfMessage.innerHTML = emailConfSuccessMessage;
     }else{
     registrationFormEmailConfMessage.innerHTML = emailConfFailureMessage;
     }*/
    /*
    AccessibilityAPI.enableTabIndex("registerFormStatusTitleText");
    AccessibilityAPI.enableTabIndex("registrationFormStatusMessage");
    AccessibilityAPI.enableTabIndex("registrationFormStatusMessage");
    AccessibilityAPI.enableTabIndex("registerFormStatusClose");
    */
   
    AccessibilityAPI.preventModalEscape("registerStatusCloseBtn", "registerStatusLoginBtn");
    AccessibilityAPI.focusElement("registerStatusLoginBtn");

    UserAPI.clearFormFields("registerForm");
    registrationForm.classList.add("hidden");
    
    registrationStatus.classList.remove("hidden");
};


/**
 * 
 * @returns {undefined}
 */
UserAPI.hideRegisterConf = function () {
    /*var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#');*/
    
    var registrationFormStatusMessage = document.getElementById("registrationStatusSuccessMessage");
    registrationFormStatusMessage.innerHTML = "";
    var registrationFormEmailConfMessage = document.getElementById("registrationStatusEmailConfMessage");
    registrationFormEmailConfMessage.innerHTML = "";

    var registrationStatus = document.getElementById("registerStatusOverlay");
    registrationStatus.classList.add("hidden");
};


/**
 * 
 * @returns {Boolean}
 */
UserAPI.submitNewJobPoster = function () {
    var newJobPosterForm = document.getElementById("createJobPosterForm");
    var title = newJobPosterForm.newJobPoster_title.value;
    var closeDate = newJobPosterForm.newJobPoster_closeDate.value;
    var id = newJobPosterForm.newJobPoster_id.value;
    var department = newJobPosterForm.newJobPoster_department.value;
    var isValid = FormValidationAPI.validateNewJobPosterForm(title, closeDate, id, department);
    // TODO: store name, email, hash in db
    // TODO: send validation email
    return isValid;
};

/**
 * 
 * @param {type} response
 * @returns {undefined}
 */
UserAPI.authTokenCallback = function (response, credentials) {
    var tokenJSON = JSON.parse(response);
    if (tokenJSON.failed) {
        UserAPI.authenticationFail();
    } else {
        UserAPI.storeAuthToken(tokenJSON);
        if (credentials !== null) {
            credentials.authToken = tokenJSON.token;
        }
        UserAPI.getUserById(credentials);
    }
};

/**
 * 
 * @param {type} response
 * @returns {undefined}
 */
UserAPI.loaded = function (response) {
    //console.log(response);
    var authJSON = JSON.parse(response);
    //console.log(authJSON);
    if(!authJSON.failed){
        var sessionUser = UserAPI.getSessionUserAsJSON();
        //console.log(sessionUser);
        if (sessionUser === null) {
            UserAPI.storeSessionUser(authJSON);
        }
        if (authJSON.user_id !== "") {
            //var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
            //document.title = stateInfo.pageTitle;
            //history.pushState(stateInfo, stateInfo.pageInfo, '#');
            //var user_fname = document.getElementById("user_fname");
            //user_fname.innerHTML = authJSON.firstname;

            var loggedIn = document.getElementById("loggedIn");
            loggedIn.classList.remove("hidden");

            var loggedOut = document.getElementById("loggedOut");
            loggedOut.classList.add("hidden");

            var registerLink = document.getElementById("register");
            registerLink.classList.add("hidden");

            var registerFormOverlay = document.getElementById("registerFormOverlay");
            registerFormOverlay.classList.add("hidden");

            var loginOverlay = document.getElementById("loginOverlay");
            loginOverlay.classList.add("hidden");

            EventsAPI.hideBodyOverflow(false);

            if (authJSON.user_role === TalentCloudAPI.roles.jobseeker) {
                DataAPI.getJobSeekerProfileByUserId(authJSON.user_id, JobSeekerAPI.populateJobSeekerProfile);
                JobSeekerAPI.refreshJobSeekerProfilePic();

                
                var dashBoardLink = document.getElementById("dashBoardLink");
                
                if (dashBoardLink !== null) {
                    var dashBoardLinkListItem = document.getElementById("dashBoardLinkListItem");
                    dashBoardLink.classList.remove("hidden");
                    dashBoardLinkListItem.setAttribute("aria-hidden", "false");
                }
            }
            
                var myProfileLink = document.getElementById("profileLink");

                if (myProfileLink !== null) {
                    var profileLinkListItem = document.getElementById("profileLinkListItem");
                    myProfileLink.classList.remove("hidden");
                    profileLinkListItem.setAttribute("aria-hidden", "false");
                    AccessibilityAPI.focusElement("profileLinkListItem");
                }
                
            if (authJSON.user_role === TalentCloudAPI.roles.manager || authJSON.user_role === TalentCloudAPI.roles.admin) {

                var jobPostersLinkListItem = document.getElementById("jobPostersLinkListItem");
                if (jobPostersLinkListItem){
                    jobPostersLinkListItem.setAttribute("aria-hidden", "false");
                }
                var jobPostersLink = document.getElementById("jobPostersLink");
                if (jobPostersLink){
                    jobPostersLink.classList.remove("hidden");
                }
            }

            EventsAPI.hideBodyOverflow(false);

        }
    } else {
        UserAPI.logout();
    }

};

/**
 * 
 * @returns {undefined}
 */
UserAPI.transferFailed = function () {
    NetworkErrorMessage();
};

/**
 * 
 * @returns {undefined}
 */
UserAPI.transferAborted = function () {
    NetworkErrorMessage();
};

/**
 * 
 * @returns {undefined}
 */
UserAPI.logout = function () {
    var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    document.title = stateInfo.pageTitle;
    history.replaceState(stateInfo, stateInfo.pageInfo, '#');
    
    var storage = window.sessionStorage;
    storage.removeItem('authToken');
    storage.removeItem('sessionUser');

    window.location.reload();
};

UserAPI.authenticationFail = function () {
    UserAPI.logout();
    UserAPI.showLogin();
    var loginErrors = document.getElementById("loginErrors");
    loginErrors.innerHTML = "Login unsuccessful. Please verify your email address and password.";
    loginErrors.classList.remove('hidden');
};

/**
 * 
 * @param {type} linkElement
 * @returns {undefined}
 */
UserAPI.showLogin = function () {
    //var stateInfo = {pageInfo: 'user_login', pageTitle: 'Talent Cloud: Login'};
    //document.title = stateInfo.pageTitle;
    //history.pushState(stateInfo, stateInfo.pageInfo, '#Login');

    var loginDialog = document.getElementById("loginOverlay");
    loginDialog.classList.remove("hidden");
    EventsAPI.setFormFocus("login_email");
    EventsAPI.hideBodyOverflow(true);
    AccessibilityAPI.preventModalEscape("login_email", "loginFormLoginBtn");
};

/**
 * 
 * @returns {undefined}
 */
UserAPI.failedLogin = function () {
    UserAPI.showLogin();
};

/**
 * 
 * @returns {undefined}
 */
UserAPI.cancelLogin = function () {
    /*var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#');//*/

    var loginOverlay = document.getElementById("loginOverlay");
    loginOverlay.classList.add("hidden");

    var loginErrors = document.getElementById("loginErrors");
    loginErrors.innerHTML = "";
    loginErrors.classList.add('hidden');

    UserAPI.clearFormFields('loginForm');

    EventsAPI.hideBodyOverflow(false);
};

/**
 * 
 * @param {type} linkElement
 * @returns {undefined}
 */
UserAPI.showRegisterForm = function () {
    //var stateInfo = {pageInfo: 'register', pageTitle: 'Talent Cloud: Register'};
    //document.title = stateInfo.pageTitle;
    //history.pushState(stateInfo, stateInfo.pageInfo, '#Register');//last parameter just replaced with #Register instead of url

    var registerDialog = document.getElementById("registerFormOverlay");
    registerDialog.classList.remove("hidden");

    EventsAPI.setFormFocus("register_email");
    EventsAPI.hideBodyOverflow(true);
    AccessibilityAPI.preventModalEscape("register_email","registerFormRegisterBtn");
};

/**
 * 
 * @returns {undefined}
 */
UserAPI.hideRegisterForm = function () {
    /*var stateInfo = {pageInfo: 'talent_cloud', pageTitle: 'Talent Cloud'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#');*/

    var registerDialog = document.getElementById("registerFormOverlay");
    registerDialog.classList.add("hidden");

    EventsAPI.hideBodyOverflow(false);
    UserAPI.clearFormFields("registerForm");
};


/**
 * 
 * @param {type} authToken
 * @returns {undefined}
 */
UserAPI.storeAuthToken = function (authToken) {
    window.sessionStorage.authToken = JSON.stringify(authToken);
};

/**
 * 
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.getAuthToken = function () {
    var existingToken = JSON.parse(window.sessionStorage.authToken).token;
    //console.log(existingToken);
    return existingToken;
};

/**
 * 
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.getAuthTokenAsJSON = function () {
    var existingToken = window.sessionStorage.authToken;
    if (UserAPI.hasAuthToken) {
        return JSON.parse(existingToken);
    } else {
        return null;
    }
};


/**
 * 
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.hasAuthToken = function () {
    return window.sessionStorage.authToken === undefined ? false : true;
};

/**
 * 
 * @param {type} userObj
 * @returns {undefined}
 */
UserAPI.storeSessionUser = function (userObj) {
    window.sessionStorage.sessionUser = JSON.stringify(userObj);
};
/**
 * 
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.hasSessionUser = function () {
    return window.sessionStorage.sessionUser === undefined ? false : true;
};

/**
 * 
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.getSessionUserAsJSON = function () {
    var sessionUser = window.sessionStorage.sessionUser;
    //console.log(sessionUser);
    if (sessionUser) {
        return JSON.parse(sessionUser);
    } else {
        return null;
    }
};

/**
 * 
 * @returns {Window.sessionStorage.authToken|Storage.authToken|String}
 */
UserAPI.hasAuthTokenExpired = function () {
    var hasExpired = true;
    if (UserAPI.hasAuthToken()) {
        var token = UserAPI.getAuthTokenAsJSON();
        //console.log(token);
        var tokenExpiry = new Date(token.expires_in * 1000);
        var now = new Date();
        //console.log(Utilities.addDays(now,1).getTime());
        //console.log(tokenExpiry.getTime());
        //console.log(Utilities.addDays(now,1).getTime() <= tokenExpiry.getTime());
        if (Utilities.addDays(now, 1).getTime() >= tokenExpiry) {
            hasExpired = false;
        } else {
            hasExpired = true;
        }
    } else {
        hasExpired = true;
    }
    return hasExpired;
};

/**
 * 
 * @param {type} formId
 * @returns {undefined}
 */
UserAPI.clearFormFields = function (formId) {
    var formToClear = document.getElementById(formId);

    var inputElementTypesToClear = ["text", "email", "password"];
    var elementsToClear = ["textarea", "select", "range"];

    var elements = formToClear.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {

        if (inputElementTypesToClear.includes(elements[i].type)) {
            elements[i].value = "";
        }

        if (elementsToClear.includes(elements[i].tagName)) {
            elements[i].value = "";
        }

    }
};

UserAPI.updateUser = function(user, updateUserCallback) {
    var authToken = UserAPI.getAuthToken();
    
    Utilities.debug?console.log("updating user"):null;
    var updateUser_url = UserAPI.baseURL+"/user/update/";
    var jsonData=JSON.stringify(user);
    
    var updateUser_xhr = new XMLHttpRequest();
    if ("withCredentials" in updateUser_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      updateUser_xhr.open("PUT", updateUser_url);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      updateUser_xhr = new XDomainRequest();
      updateUser_xhr.open("PUT", updateUser_url);

    } else {

      // Otherwise, CORS is not supported by the browser.
      updateUser_xhr = null;

    }

    updateUser_xhr.open('PUT',updateUser_url);
    updateUser_xhr.setRequestHeader("Content-Type","application/json");
    updateUser_xhr.setRequestHeader("Authorization", "Bearer " + authToken);
    
    //updateUser_xhr.addEventListener("progress",DataAPI.updateToggleProgress,false);
    //updateUser_xhr.addEventListener("error",DataAPI.transferFailed,false);
    //updateUser_xhr.addEventListener("abort",DataAPI.transferAborted,false);
    updateUser_xhr.addEventListener("load",function(){
        var responseJson = JSON.parse(updateUser_xhr.responseText);
        if (responseJson.userUpdated && responseJson.updatedUser) {
            UserAPI.storeSessionUser(responseJson.updatedUser);
        }
        updateUserCallback(updateUser_xhr.response);
    }
    ,false);
    updateUser_xhr.send(jsonData);
}
