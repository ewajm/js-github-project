var apiKey = require('./../.env').apiKey;

exports.getRepos = function(user, displayRepo){
  $.get('https://api.github.com/users/daneden/repos?access_token=' + apiKey).then(function(response){
    console.log(response);
    for(var i = 0; i < response.length; i++){
      var name = response[i].name;
      var url = response[i].html_url;
      var description = response[i].description ? response[i].description : "No description provided";
      var language = response[i].language;
      var homepage = response[i].homepage;
      displayRepo(name, url, description, language, homepage);
    }
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};
