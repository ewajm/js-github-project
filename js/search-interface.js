var githubRequests = require('./../js/githubapi.js').githubModule;
var listeners = require('./../js/listeners.js').listenersModule;

var displayUsers = function(name){
  var listener= new listeners();
  var userString = "<li class='user'><h4>" + name + "</h4></li>";
  $("#user-results ul").append(userString);
  $("#user-results ul li").last().click(userClickListener);
};

$(document).ready(function(){
  var githubObject = new githubRequests();
  $("#search-form").submit(function(event){
    event.preventDefault();
    $("#user-results ul").empty();
    $("#user-results").show();
    $("#results .repo").remove();
    $("#results h2").empty();
    var userSearch = $("#username").val();
    githubObject.findUsers(userSearch, displayUsers);
  });
});
