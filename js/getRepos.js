var apiKey = require('./../.env').apiKey;

exports.getRepos = function(user, displayRepo){
  $.get('https://api.github.com/users/daneden/repos?access_token=' + apiKey).then(function(response){
    console.log(response);

  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};
