var githubRequests = require('./../js/githubapi.js').githubModule;
var userClickListener = require('./../js/listeners.js').userClickListener;

var displayUsers = function(name){
  if(name){
    var userString = "<li class='user'><h3>" + name + "</h3></li>";
    $("#user-results ul").append(userString);
    $("#user-results ul li").last().click(userClickListener);
  } else {
    $("#user-results ul").append("<li><h3> Sorry, no users found!</h3></li>");
  }

};

$(document).ready(function(){
  var githubObject = new githubRequests();
  $("#search-form").submit(function(event){
    event.preventDefault();
    $("#user-results ul").empty();
    $("#user-results").show();
    var searchString = $("#username").val();
    var searchType = $("input[name=type]:checked").val();
    var searchlocation = $("#location").val();
    var searchfollowers = $("#followers").val();
    var filters = {type: searchType, location: searchlocation, followers: searchfollowers};
    githubObject.findUsers(searchString, displayUsers, filters);
    $(".no-results h1").text("Now choose a username or search again!");
    $("#results .repo").remove();
    $("#results h2").empty();
    $("#nextPageDiv").empty();
    if(!$("#results").hasClass("no-results-wrapper")){
      $("#inner-results").addClass("no-results");
      $("#results").addClass("no-results-wrapper");
      $(".no-results h1").show();
    }
  });
});
