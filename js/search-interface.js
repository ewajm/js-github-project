var githubRequests = require('./../js/githubapi.js').githubModule;
var userClickListener = require('./../js/listeners.js').userClickListener;

var displayUsers = function(name){
  var userString = "<li class='user'><h3>" + name + "</h3></li>";
  $("#user-results ul").append(userString);
  $("#user-results ul li").last().click(userClickListener);
};

$(document).ready(function(){
  var githubObject = new githubRequests();
  $("#search-form").submit(function(event){
    event.preventDefault();
    $(".no-results h1").text("Now choose a username!");
    $("#user-results ul").empty();
    $("#user-results").show();
    $("#results .repo").remove();
    $("#results h2").empty();
    var searchString = $("#username").val();
    var searchType = $("input[name=type]:checked").val();
    var searchlocation = $("#location").val();
    var searchfollowers = $("#followers").val();
    var filters = {type: searchType, location: searchlocation, followers: searchfollowers};
    githubObject.findUsers(searchString, displayUsers, filters);
  });
});
