var apiKey = require('./../.env').apiKey;

//TODO: user search parameters (location, popularity, etc)
//TODO: repo sort
//TODO: wat if no key ?!?!

GithubRequests = function(){

};

GithubRequests.prototype.findUsers = function (searchName, displayUserFunction, filters) {
  var getString = 'https://api.github.com/search/users?q=' + searchName;
  for(var key in filters){
    if(filters[key]){
      if(key === "followers"){
        getString += "+" + key + ":%3E" + filters[key];
      } else {
        getString += "+" + key + ":" + filters[key];
      }
    }
  }
  console.log(getString);
  $.get(getString + '&per_page=20&access_token=' + apiKey).then(function(response){
    if(response.items.length > 0){
      for(var i=0; i < response.items.length; i++){
        var username = response.items[i].login;
        displayUserFunction(username);
      }
    } else {
      displayUserFunction("");
    }
  });
};

GithubRequests.prototype.getRepos = function(user, displayRepoFunction, createButton, nextPage){
  var apiLink = 'https://api.github.com/users/' + user + '/repos?sort=created&per_page=10&access_token=' + apiKey;
  if(nextPage){
    apiLink += nextPage;
  }
  apiLink += "&callback=?";
  $.getJSON(apiLink, function(response){
    if(response.data.length > 0){
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
      var links = response.meta.Link;
      var pages = {};
      for(var j = 0; j < links.length; j++){
        if(links[j][1].rel === "prev" || links[j][1].rel === "next"){
          pages[links[j][1].rel] = response.meta.Link[j][0].slice(response.meta.Link[j][0].search("&page"));
        }
      }
      createButton(pages, user);
    } else {
      displayRepoFunction("");
    }
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.githubModule = GithubRequests;
