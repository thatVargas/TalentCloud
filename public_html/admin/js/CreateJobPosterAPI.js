/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var CreateJobPosterAPI = {};

CreateJobPosterAPI.jobPosterObj = null;

CreateJobPosterAPI.lookupMap = {};

CreateJobPosterAPI.JobPostNonLocalized = function(
        id,
        manager_user_id,
        title, 
        title_fr, 
        department_id, 
        province_id, 
        city, 
        city_fr, 
        open_date_time, 
        close_date_time, 
        start_date, 
        term_qty, 
        remuneration_range_low, 
        remuneration_range_high, 
        impact, 
        impact_fr,
        key_tasks_en,
        key_tasks_fr,
        core_competencies_en,
        core_competencies_fr,
        developing_competencies_en,
        developing_competencies_fr,
        other_requirments_en,
        other_requirments_fr) {
    this.id = id;
    this.manager_user_id = manager_user_id;
    this.title = {};
    this.title.en_CA = title;
    this.title.fr_CA = title_fr;
    this.department_id = department_id;
    this.province_id = province_id;
    this.city = {};
    this.city.en_CA = city;
    this.city.fr_CA = city_fr;
    this.open_date_time = open_date_time;
    this.close_date_time = close_date_time;
    this.start_date = start_date;
    this.term_qty = term_qty;
    this.remuneration_range_low = remuneration_range_low;
    this.remuneration_range_high = remuneration_range_high;
    this.impact = {};
    this.impact.en_CA = impact;
    this.impact.fr_CA = impact_fr;
    this.key_tasks = {};
    this.key_tasks.en_CA = key_tasks_en;
    this.key_tasks.fr_CA = key_tasks_fr;
    this.core_competencies = {};
    this.core_competencies.en_CA = core_competencies_en;
    this.core_competencies.fr_CA = core_competencies_fr;
    this.developing_competencies = {};
    this.developing_competencies.en_CA = developing_competencies_en;
    this.developing_competencies.fr_CA = developing_competencies_fr;
    this.other_requirements = {};
    this.other_requirements.en_CA = other_requirments_en;
    this.other_requirements.fr_CA = other_requirments_fr;    
    
    this.term_units_id = 2; //default to months for now
    this.job_min_level_id = 1; //default to CS1
    this.job_max_level_id = 3; //default to CS3
};

CreateJobPosterAPI.localizeJobPost = function(jobPostNonLocalized, locale) {
    var jp = jobPostNonLocalized;
   
    return new JobPostAPI.JobPost(
            jp.id, 
            jp.manager_user_id,
            jp.title[locale],
            jp.appplicants_to_date, 
            jp.close_date_time, 
            CreateJobPosterAPI.getLocalizedLookupValueFromId("department", locale, jp.department_id),
            jp.city[locale],
            CreateJobPosterAPI.getLocalizedLookupValueFromId("province", locale, jp.province_id),
            jp.term_qty,
            CreateJobPosterAPI.getLocalizedLookupValueFromId("jobterm", locale, jp.term_units_id),
            jp.remuneration_type,
            jp.remuneration_range_low,
            jp.remuneration_range_high
            );
};

CreateJobPosterAPI.showCreateJobPosterForm = function(){
    var stateInfo = {pageInfo: 'create_job_poster', pageTitle: 'Talent Cloud: Create Job Poster'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#CreateJobPoster');
    
    ManagerEventsAPI.hideAllLayouts();
    
    document.getElementById("createJobPoster_openDate").value = Utilities.formatDateTimeLocal(new Date());
    
    var createJobPosterSection = document.getElementById("createJobPosterSection");
    createJobPosterSection.classList.remove("hidden");
};

CreateJobPosterAPI.loadLookupData = function() {
    //DivisionAPI.getDivisions(locale);
    //BranchAPI.getBranches(locale);
    var locales = ["en_CA", "fr_CA"];
    var lookupTypes = ["department","branch", "division", "province", "jobterm"];
    for(i in locales) {
        for (j in lookupTypes) {
            var locale = locales[i];
            var lookupType = lookupTypes[j];
            CreateJobPosterAPI.getLookupData(lookupType, locale);
        }
    }
};

CreateJobPosterAPI.selectedUnit = function(newID){
    var option = document.getElementById(newID);
    option.checked = true;
};

CreateJobPosterAPI.getLookupData = function(lookupType, locale){    
    var lookup_URL = DataAPI.baseURL+"/"+locale+"/Lookup/"+lookupType;
    //console.log('Talent cloud url data:   ' + talentcloudData_URL);
    //var talentcloudData_URL = "/wiremock/mappings/GET_ContentByLocale.json";//TEMPORARY for bh.browse_job_seekers branch
    var authToken = "";
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthTokenAsJSON();
    }
    var lookupData_xhr = new XMLHttpRequest();
    if ("withCredentials" in lookupData_xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      lookupData_xhr.open("GET", lookup_URL);

    } else if (typeof XDomainRequest !== "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      lookupData_xhr = new XDomainRequest();
      lookupData_xhr.open("GET", lookup_URL);

    } else {

      // Otherwise, CORS is not supported by the browser.
      lookupData_xhr = null;

    }
    
    lookupData_xhr.addEventListener("progress",
    function(evt){
        DataAPI.talentcloudDataUpdateProgress(evt);
    },false);
    lookupData_xhr.addEventListener("load",
    function(evt){
        CreateJobPosterAPI.addToLookupMap(lookupType, locale, lookupData_xhr.response);
        var userLocale = Utilities.getCookieByName("locale");
        if (userLocale === undefined) {
            userLocale = "en_CA";
        }
        if (userLocale === locale) {
            CreateJobPosterAPI.populateLookups(lookupType,lookupData_xhr.response);
        }
    },false);
    lookupData_xhr.addEventListener("error",DataAPI.transferFailed,false);
    lookupData_xhr.addEventListener("abort",DataAPI.transferAborted,false);

    lookupData_xhr.open('GET',lookup_URL);
    lookupData_xhr.send(authToken);
};

CreateJobPosterAPI.addToLookupMap = function(lookupType, locale, response) {
    if (!CreateJobPosterAPI.lookupMap[lookupType]) {
        CreateJobPosterAPI.lookupMap[lookupType] = {};
    }
    CreateJobPosterAPI.lookupMap[lookupType][locale] = JSON.parse(response);
};

CreateJobPosterAPI.populateLookups = function(lookupType,response){
    //console.log(JSON.parse(response));
    var data = JSON.parse(response);
    
    switch(lookupType) {
        case "department":
            CreateJobPosterAPI.populateSelect("department","createJobPoster_department",data);
            break;
        case "province":
            CreateJobPosterAPI.populateSelect("province","createJobPoster_province",data);
            break;
        case "jobterm":
            if(document.getElementById("jobterms")){
                var jobTermSelect = document.getElementById("jobterms");
                Utilities.clearSelectOptions(jobTermSelect);
                for(var jobterm in data) {
                    var jobterm_name = data[jobterm].value;
                    var optionRow = document.createElement("div");
                    var option = document.createElement("input");
                    option.setAttribute("id","jobterm_"+jobterm_name);
                    option.setAttribute("type","radio");
                    option.setAttribute("name","createJobPoster_termUnits");
                    option.value = data[jobterm].id;
                    var optionLabel = document.createElement("label");
                    optionLabel.setAttribute("for","jobterm_"+jobterm_name);
                    optionLabel.value = data[jobterm].id;
                    optionLabel.innerHTML = jobterm_name;
                    optionRow.appendChild(option);
                    optionRow.appendChild(optionLabel);
                    jobTermSelect.appendChild(optionRow);
                }
            }  
            break;
        default:
            break;
    }
    
        
    
};

CreateJobPosterAPI.populateSelect = function(lookupType, elementId, data){
    
    if(lookupType === lookupType && document.getElementById(elementId)){
        var select = document.getElementById(elementId);
        Utilities.clearSelectOptions(select);
        for(var department in data) {
            var option = document.createElement("option");
            option.value = data[department].id;
            option.innerHTML = data[department].value;
            select.appendChild(option);
        }
    }    
    
};

CreateJobPosterAPI.getLocalizedLookupValueFromId = function(lookeupType, locale, id) {
    var elements = CreateJobPosterAPI.lookupMap[lookeupType][locale];
    for (i in elements) {
        if (elements[i].id == id) {
            return elements[i].value;
        }
    }
    return null;
};

CreateJobPosterAPI.getLookupIdFromLocalizedValue = function(lookeupType, locale, value) {
    var elements = CreateJobPosterAPI.lookupMap[lookeupType][locale];
    for (i in elements) {
        if (elements[i].value == value) {
            return elements[i].id;
        }
    }
    return null;
};


//below are the functions for the tabbed layout of the 'create job poster' page for managers
CreateJobPosterAPI.goToTab = function(tabId) {
    var stepGroups = document.getElementsByClassName('stepGroup');
    //console.log("+   " + stepGroups);
    
    if (tabId === "createJobPosterReviewTab") {
        CreateJobPosterAPI.populateReviewTab();
    }
    
    for (var s = 0; s < stepGroups.length; s++) {
        var stepGroup = stepGroups[s];
        //console.log(stepGroup);
        if (!stepGroup.classList.contains('hidden')) {
            stepGroup.classList.add('hidden');
        }
        if (stepGroup.id === tabId) {
            stepGroup.classList.remove('hidden');
        }
    }
};

CreateJobPosterAPI.populateReviewTab = function() {
    CreateJobPosterAPI.populateJobPosterObjFromForm();
    
    if (CreateJobPosterAPI.jobPosterObj) {
        var demoAreaEnglish = document.getElementById("createJobPosterDemoAreaEnglish");
        demoAreaEnglish.innerHTML = "";
        var jobEnglish = CreateJobPosterAPI.localizeJobPost(CreateJobPosterAPI.jobPosterObj, "en_CA");
        demoAreaEnglish.appendChild(JobPostAPI.populateJobSummary(jobEnglish, true, "en_CA"));

        //Create demo french
        var demoAreaFrench = document.getElementById("createJobPosterDemoAreaFrench");
        demoAreaFrench.innerHTML = "";
        var jobFrench = CreateJobPosterAPI.localizeJobPost(CreateJobPosterAPI.jobPosterObj, "fr_CA");
        demoAreaFrench.appendChild(JobPostAPI.populateJobSummary(jobFrench, true, "fr_CA"));
    } else {
        window.alert("Job Poster must be submitted first");
    }
};

CreateJobPosterAPI.stepHighlight = function(stepID){
    var s1 = document.getElementById("createJobPosterStep1Label");
    s1.classList.remove("create-job-poster-tab-current");
    var s2 = document.getElementById("createJobPosterStep2Label");
    s2.classList.remove("create-job-poster-tab-current");
    var s3 = document.getElementById("createJobPosterStep3Label");
    s3.classList.remove("create-job-poster-tab-current");
    var s4 = document.getElementById("createJobPosterStep4Label");
    s4.classList.remove("create-job-poster-tab-current");
    
    var current = document.getElementById(stepID);
    current.classList.add("create-job-poster-tab-current");
};

CreateJobPosterAPI.validateJobPosterForm = function() { 
    CreateJobPosterAPI.populateJobPosterObjFromForm();
    
    var jp = CreateJobPosterAPI.jobPosterObj;
    var valid = FormValidationAPI.validateJobPoster(jp.title.en_CA, jp.title.fr_CA, jp.city.en_CA, jp.city.fr_CA, jp.open_date_time, jp.close_date_time, jp.start_date, jp.term_qty, jp.remuneration_range_low, jp.remuneration_range_high);
    if (valid) { 
        CreateJobPosterAPI.submitJobPosterForm(); 
    } 
};

CreateJobPosterAPI.populateJobPosterObjFromForm = function() {
    var id = 0;
    //Keep same id if it already exists
    if (CreateJobPosterAPI.jobPosterObj) {
        id = CreateJobPosterAPI.jobPosterObj.id;
    }
    
    var manager_user_id = 0;
    if (UserAPI.hasSessionUser()) {
        //For now, assume there is a one-to-one relation between users and hiring managers
        manager_user_id = UserAPI.getSessionUserAsJSON().user_id;
    } 
     
    var title = document.getElementById("createJobPoster_jobTitle").value; 
     
    var title_fr = document.getElementById("createJobPoster_jobTitle_fr").value; 
    
    var department_id = document.getElementById("createJobPoster_department").value; 
    //var department_id = CreateJobPosterAPI.getLookupIdFromLocalizedValue("department", locale, department);
    
    var province_id = document.getElementById("createJobPoster_province").value;
    //var province_id = CreateJobPosterAPI.getLookupIdFromLocalizedValue("province", locale, province);
    
    var city = document.getElementById("createJobPoster_city").value;
    
    var city_fr = document.getElementById("createJobPoster_city").value;
    
    var open_date_time = document.getElementById("createJobPoster_openDate").value; 
     
    var close_date_time = document.getElementById("createJobPoster_closeDate").value; 
    
    var start_date = document.getElementById("createJobPoster_startDate").value; 
    
    var term_qty = document.getElementById("createJobPoster_termQuantity").value;
    
    var remuneration_range_low = document.getElementById("createJobPoster_remunerationLowRange").value;
    
    var remuneration_range_high = document.getElementById("createJobPoster_remunerationHighRange").value;
    
    var impact = document.getElementById("createJobPoster_impact").value;
    
    var impact_fr = document.getElementById("createJobPoster_impact_fr").value;
    
    //TODO: actually get list items from ui
    var key_tasks_en = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_keyTasks");
    var key_tasks_fr = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_keyTasks_fr"); 
    
    var core_competencies_en = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_coreCompetencies");
    var core_competencies_fr = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_coreCompetencies_fr");
    
    var developing_competencies_en = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_developingCompetencies");
    var developing_competencies_fr = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_developingCompetencies_fr");
    
    var other_requirements_en = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_otherRequirements");
    var other_requirements_fr = CreateJobPosterAPI.getTextareaContentsAsList("createJobPoster_otherRequirements_fr");
        
    CreateJobPosterAPI.jobPosterObj = new CreateJobPosterAPI.JobPostNonLocalized(id, manager_user_id, title, title_fr, department_id, province_id, city, city_fr, open_date_time, close_date_time, start_date, term_qty, remuneration_range_low, remuneration_range_high, impact, impact_fr,key_tasks_en, key_tasks_fr, core_competencies_en, core_competencies_fr, developing_competencies_en, developing_competencies_fr, other_requirements_en, other_requirements_fr);
}

CreateJobPosterAPI.getTextareaContentsAsList = function(textareaElementId) {
    var list = document.getElementById(textareaElementId).value.split(/\r|\n/);
    for (var i=(list.length - 1); i >= 0; i--) {
        list[i] = list[i].trim();
        if (list[i] === "") {
            list.splice(i, 1);
        }
    }
    return list;
}


CreateJobPosterAPI.submitJobPosterForm = function() {
    
    if (CreateJobPosterAPI.jobPosterObj) {
        var jobPosterJson = JSON.stringify(CreateJobPosterAPI.jobPosterObj);
        
        //TODO: use the following code instead when updateJobPoster is ready
        /*
        if (CreateJobPosterAPI.jobObj.id > 0) {
            CreateJobPosterAPI.updateJobPoster(jobPosterJson);
        } else {
            CreateJobPosterAPI.createJobPoster(jobPosterJson);
        }
        */
       
        CreateJobPosterAPI.createJobPoster(jobPosterJson);
        return true;
    } else {
        return false;
    }
};

CreateJobPosterAPI.hideCreateJobPosterForm = function(){
    var jobPosterCreation = document.getElementById("createJobPosterOverlay");    
    jobPosterCreation.classList.add("hidden");
};

CreateJobPosterAPI.createJobPoster = function(jobPosterJson){
    var createJobPoster_URL = DataAPI.baseURL+"/createJobPoster";
    //console.log('Talent cloud url data:   ' + talentcloudData_URL);
    //var talentcloudData_URL = "/wiremock/mappings/GET_ContentByLocale.json";//TEMPORARY for bh.browse_job_seekers branch
    var authToken = "";
    if(UserAPI.hasAuthToken()){
        authToken = UserAPI.getAuthTokenAsJSON();
    }
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open("POST", createJobPoster_URL);

    } else if (typeof XDomainRequest != "undefined") {

      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open("POST", createJobPoster_URL);

    } else {

      // Otherwise, CORS is not supported by the browser.
      xhr = null;

    }
    xhr.open('POST',createJobPoster_URL);
    xhr.setRequestHeader('x-access-token', authToken.access_token);
    
    xhr.addEventListener("progress",
    function(evt){
        DataAPI.talentcloudDataUpdateProgress(evt);
    },false);
    xhr.addEventListener("load",
    function(evt){
        CreateJobPosterAPI.postJobPosterComplete(xhr.response);
    },false);
    xhr.addEventListener("error",DataAPI.transferFailed,false);
    xhr.addEventListener("abort",DataAPI.transferAborted,false);

    xhr.send(jobPosterJson);
};

CreateJobPosterAPI.postJobPosterComplete = function(response) {
    //TODO
    CreateJobPosterAPI.jobPosterObj.id = JSON.parse(response).job_poster_id;
    
    CreateJobPosterAPI.goToTab("createJobPosterReviewTab");
    
    
    
};
