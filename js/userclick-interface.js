var githubRequests = require('./../js/githubapi.js').githubModule;

var displayUser = function(username){
  $("#results h2").html("<a href='https://github.com/" + username + "'>" + username + "'s Repos</a>");
};

var displayRepo = function(name, url, description, language, homepage){
  var repoString = "<div class='repo'><h4><a href='" + url + "'>" + name + "</a></h4><h5> " + description + "</h5><p>language: " + language + "</p>";
  if(homepage){
    repoString += "<p><a href='" + homepage + "'>Project Homepage</a></p>";
  }
  repoString += "</div>";
  $("#results").append(repoString);
};

$(document).ready(function(){
  var githubObject = new githubRequests();
  $("#user-results ul li").click(function(){
    var username = $(this).text();
    displayUser(username);
    githubObject.getRepos(username, displayRepo);
  });
});
