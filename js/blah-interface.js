var getRepos = require('./../js/getRepos.js').getRepos;

var displayUser = function(username){
  $("#results h2").html("<a href='https://github.com/" + username "'>" + username + "'s Repos'</a>");
}

var displayRepo = function(name, url, description, language, homepage){
  var repoString = "<li><a href='" + url + "'>" + name + "</a> - " + description + "</li>";
  $("#results ul").append(repoString);
}

$(document).ready(function(){
  $("#search-form").submit(function(event){
    event.preventDefault();
    $("#results ul").empty();
    var username = $("#username").val();
    displayUser(username);
    getRepos(username, displayRepo);
  });
});
