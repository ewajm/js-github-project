var githubRequests = require('./../js/githubapi.js').githubModule;


var displayUsers = function(name){
  var userString = "<li class='user'><h4>" + name + "</h4></li>";
  $("#user-results ul").append(userString);
};

$(document).ready(function(){
  var githubObject = new githubRequests();
  $("#search-form").submit(function(event){
    event.preventDefault();
    $("#user-results ul").empty();
    $("#user-results").show();
    var userSearch = $("#username").val();
    githubObject.findUsers(userSearch, displayUsers);
  });
});
