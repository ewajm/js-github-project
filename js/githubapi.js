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

githubRequests.prototype.getRepos = function(user, displayRepoFunction, createButton, nextPage){
  var apiLink = 'https://api.github.com/users/' + user + '/repos?sort=created&per_page=10&access_token=' + apiKey;
  if(nextPage){
    apiLink += nextPage;
  }
  apiLink += "&callback=?";
  console.log(apiLink);
  $.getJSON(apiLink, function(response){
    console.log(response);
    for(var i = 0; i < response.data.length; i++){
      var name = response.data[i].name;
      var url = response.data[i].html_url;
      var description = response.data[i].description ? response.data[i].description : "No description provided";
      var language = response.data[i].language ? response.data[i].language : "Not specified";
      var homepage = response.data[i].homepage;
      var created = moment(response.data[i].created_at);
      var lastpush = moment(response.data[i].pushed_at);
      displayRepoFunction(name, url, description, language, homepage, created, lastpush);
    }
    var nextPage = response.meta.Link[0][0].slice(response.meta.Link[0][0].search("&page"));
    createButton(nextPage, user);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.githubModule = githubRequests;
