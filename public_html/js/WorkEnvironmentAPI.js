var WorkEnvironmentAPI = {};
WorkEnvironmentAPI.baseURL = "/tc/api/v1";

WorkEnvironmentAPI.photoNameToImgElementId = {'workplace_photo_1' : 'jobPosterWorkEnvironment_1',
    'workplace_photo_2' : 'jobPosterWorkEnvironment_2', 
    'workplace_photo_3' : 'jobPosterWorkEnvironment_3'};

WorkEnvironmentAPI.defaultWorkplacePhoto = '/images/user.png';

/**
 * 
 * @param {string} photo_name
 * @param {string} description
 * @return {WorkEnvironment.WorkplacePhotoCaption}
 */
WorkEnvironmentAPI.WorkplacePhotoCaption = function(photo_name, description) {
    this.photo_name = photo_name;
    this.description = description;
};

/**
 * 
 * @param {string} remote_allowed
 * @param {string} telework_allowed
 * @param {string} flexible_allowed
 * @param {WorkEnvironment.WorkplacePhotoCaption[]} workplace_photo_captions
 * @return {WorkEnvironment.WorkEnvironment}
 */
WorkEnvironmentAPI.WorkEnvironment = function(remote_allowed, telework_allowed,
        flexible_allowed, workplace_photo_captions) {
    this.remote_allowed = remote_allowed;
    this.telework_allowed = telework_allowed;
    this.flexible_allowed = flexible_allowed;
    this.workplace_photo_captions = workplace_photo_captions;
};

WorkEnvironmentAPI.parseWorkEnvironmentResponse = function(response) {
    var json = JSON.parse(response);
    var workEnvironment = new WorkEnvironmentAPI.WorkEnvironment(
            json.basic_work_environment.remote_allowed,
            json.basic_work_environment.telework_allowed,
            json.basic_work_environment.flexible_allowed,
            []
    );
    json.workplace_photo_captions.forEach(function(caption) {
        var workplacePhotoCaption = new WorkEnvironmentAPI.WorkplacePhotoCaption(
               caption.photo_name,
               caption.description
        );
        workEnvironment.workplace_photo_captions.push(workplacePhotoCaption);
    });
    return workEnvironment;
};

WorkEnvironmentAPI.localizeWorkEnvironment = function() {
    if (siteContent) {
        document.getElementById('jobPosterWorkEnvironmentLabel').innerHTML = siteContent.workEnvironment;
        
        document.getElementById('jobPosterRemoteWork_label').innerHTML = siteContent.remoteLocationAllowed;
        document.getElementById('jobPosterTelework_label').innerHTML = siteContent.teleworkAllowed;
        document.getElementById('jobPosterFlexHours_label').innerHTML = siteContent.flexHoursAllowed;
    }
};

WorkEnvironmentAPI.showWorkEnvironment = function(managerProfileId) {
    //Fill text fields
    DataAPI.getWorkplaceEnvironment(managerProfileId, function(response) {
        var workEnv = WorkEnvironmentAPI.parseWorkEnvironmentResponse(response);
        WorkEnvironmentAPI.populateWorkEnvironment(workEnv);
    })
    //Download photos
    for (photoName in WorkEnvironmentAPI.photoNameToImgElementId) {
        WorkEnvironmentAPI.refreshWorkplacePhoto(managerProfileId, photoName, WorkEnvironmentAPI.photoNameToImgElementId[photoName]);
    }
};

/**
 * 
 * @param {WorkEnvironment.WorkEnvironment} workEnvironment
 * @return {undefined}
 */
WorkEnvironmentAPI.populateWorkEnvironment = function(workEnvironment) {
    
    var toggleValueText = {'option0':siteContent.yes, 'option1':siteContent.no};
    var sliderValueText = {'option0':siteContent.almostNever,'option1':siteContent.rarely,'option2':siteContent.sometimes,'option3':siteContent.usually,'option4':siteContent.almostAlways};
    
    document.getElementById('jobPosterRemoteWork').innerHTML = toggleValueText[workEnvironment.remote_allowed];
    document.getElementById('jobPosterTelework').innerHTML = sliderValueText[workEnvironment.telework_allowed];
    document.getElementById('jobPosterFlexHours').innerHTML = sliderValueText[workEnvironment.flexible_allowed];
    
    workEnvironment.workplace_photo_captions.forEach(function(caption){
        var imgId = WorkEnvironmentAPI.photoNameToImgElementId[caption.photo_name];
        if (imgId) {
            document.getElementById(imgId).setAttribute('alt', caption.description);
        } 
    });
};

WorkEnvironmentAPI.refreshWorkplacePhoto = function(managerProfileId, photoName, imageElementId) {
    var xhr = new XMLHttpRequest();
    var photoUrl = WorkEnvironmentAPI.baseURL+'/getWorkplacePhotoByManagerProfileAndName/'+ managerProfileId + '/' + photoName;
    if ("withCredentials" in xhr) {
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open("GET", photoUrl);

    } else if (typeof XDomainRequest != "undefined") {
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open("GET", photoUrl);
    } else {
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
      // TODO: indicate to user that browser is not supported
    } 
    xhr.setRequestHeader("Accept","image/*"); 
    xhr.addEventListener('load', function() {
        img = document.getElementById(imageElementId);
        if (xhr.status == 200 && xhr.responseURL) {
            img.src = xhr.responseURL;
        } else {
            img.src = WorkEnvironmentAPI.defaultWorkplacePhoto;
        }
    });
    xhr.send();
};
