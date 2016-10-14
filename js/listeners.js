var githubRequests = require('./../js/githubapi.js').githubModule;

Listeners = function(){

};

Listeners.prototype.createButton = function (pages, user) {
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

Listeners.prototype.userClickListener = function(){
  $("#results .repo").remove();
  $("#nextPage").remove();
  var githubObject = new githubRequests();
  var username = $(this).text();
  displayUser(username);
  githubObject.getRepos(username, displayRepo, this.createButton);
};

exports.listenersModule = Listeners;
