/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var AdminDashboardAPI = {};

AdminDashboardAPI.showDashboard = function(){
    var stateInfo = {pageInfo: 'adminDashboard', pageTitle: 'Talent Cloud: Admin Dashboard'};
    document.title = stateInfo.pageTitle;
    history.pushState(stateInfo, stateInfo.pageInfo, '#AdminDashboard');
    
    ManagerEventsAPI.hideAllLayouts();
    
    var dashboardSection = document.getElementById("dashboardSection");
    dashboardSection.classList.remove("hidden");
};

AdminDashboardAPI.getJobPostersByManagerId = function(){
    
};