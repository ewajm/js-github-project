var githubRequests = require('./../js/githubapi.js').githubModule;

var displayUser = function(username){
  $("#results .row h2").html("<a href='https://github.com/" + username + "'>" + username + "'s Repos</a>");
};

var displayRepo = function(name, url, description, language, homepage, created, pushed){
  var repoString = "<div class='repo'><h4><a href='" + url + "'>" + name + "</a></h4><h5> " + description + "</h5><div class='row'><div class='col-sm-4'>Created: " + created.format("ll") +  "</div><div class='col-sm-4'>Last Push: " +pushed.format("ll")+ "</div><div class='col-sm-4'>Language: " + language + "</div></div>";
  if(homepage){
    repoString += "<p><a href='" + homepage + "'>Project Homepage</a></p>";
  }
  repoString += "</div>";
  $("#results").append(repoString);
};

var createButton = function (pages, user) {
  if(pages.next){
    $("#nextPageDiv").append("<button id='nextPage' class='btn btn-info btn-xs page' value='" + pages.next + "'>More results</button>");
  }
  if(pages.prev){
    $("#nextPageDiv").append("<button id='prevPage' class='btn btn-info btn-xs page' value='" + pages.prev + "'>Previous results</button>");
  }
  $(".page").click(function(){
    $("#results .repo").remove();
    $(".page").remove();
    var page = $(this).val();
    var githubObject = new githubRequests();
    githubObject.getRepos(user, displayRepo, createButton, page);
  });
};

exports.userClickListener = function(){
  $("#results .repo").remove();
  $("#nextPage").remove();
  var githubObject = new githubRequests();
  var username = $(this).text();
  displayUser(username);
  githubObject.getRepos(username, displayRepo, createButton);
};
