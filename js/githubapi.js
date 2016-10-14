var apiKey = require('./../.env').apiKey;

//TODO: user search parameters (location, popularity, etc)
//TODO: repo sort
//TODO: figure out pagination
//TODO: wat if no key ?!?!

githubRequests = function(){

};

githubRequests.prototype.findUsers = function (searchName, displayUserFunction) {
  $.get('https://api.github.com/search/users?q=' + searchName + '&per_page=20&access_token=' + apiKey).then(function(response){
    for(var i=0; i < response.items.length; i++){
      var username = response.items[i].login;
      displayUserFunction(username);
    }
  });
};

githubRequests.prototype.getRepos = function(user, displayRepoFunction){
  $.get('https://api.github.com/users/' + user + '/repos?sort=created&per_page=10&access_token=' + apiKey).then(function(response){
    console.log(response);
    for(var i = 0; i < response.length; i++){
      var name = response[i].name;
      var url = response[i].html_url;
      var description = response[i].description ? response[i].description : "No description provided";
      var language = response[i].language;
      var homepage = response[i].homepage;
      displayRepoFunction(name, url, description, language, homepage);
    }
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.githubModule = githubRequests;
