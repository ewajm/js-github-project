
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
