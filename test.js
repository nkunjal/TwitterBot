var Twitter = require('twitter');
var syllable = require('syllable');
var number_to_text = require('number-to-text')
require('number-to-text/converters/en-us');
var http = require('http');
var fs = require('fs');

//Lets define a port we want to listen to
const PORT=8080;

//We need a function which handles requests and send response
function handleRequest(request, response){
  console.log('handling request', request.url)
  if(request.url === '/'){
    handleHtmlRequest(response)
  }
  else {
    handleTwitterRequest(request.url.substring(1), response)
  }
}
function handleTwitterRequest(querry, response){
  console.log('before', querry)
  doStuff(querry, function(err, results){
    console.log('doing stuff', querry)
    if (err){
      response.writeHeader(500, {"Content-Type": "text/html"});
      response.write("There was an error!");
    }
    else{
      response.writeHeader(200, {"Content-Type": "text/html"});
      response.write(results);
    }
    response.end();
  });

}
function handleHtmlRequest(response) {
  fs.readFile('./website.html', function (err, html) {
    if (err) {
        throw err;
    }
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(html);
    response.end();
  });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

var client = new Twitter({
  consumer_key: 'gTRoJMtl99ffXL9hs4ooqQy7u',
  consumer_secret: 's6kKntReeEK4s5wwkJd5BuD2OJ4y90t2y9e36pfN3uVBGmvUaP',
  access_token_key: '797403445393117185-Q58sE9AMi4oxVeJOA1Hnv08S5XwGtfz',
  access_token_secret: '6OuIayuw5Lg4bMzBvUge2FpWLAe81zVs8RfNPPfOiSj5H'
});


function doStuff(querry, callback) {
client.get('search/tweets', {q: querry, lang:'en', count:100}, function(error, tweets, response) {
  if (error){
    callback(error);
  }
  else {
	var cleanedTweet;

	var flag = true;

	for (var i = 0; i < tweets.statuses.length; i++){

		cleanedTweet = tweets.statuses[i].text;
		cleanedTweet = cleanedTweet.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
		cleanedTweet = cleanedTweet.replace(/([^a-z0-9 ']+)/gi, ' ');
		var words = cleanedTweet.split(/\s+/);
		for (var j = 0; j < words.length; j++){
			if (!isNaN(words[j]) && parseInt(words[j]) > 0){
				words[i] = number_to_text.convertToText(words[j]);
		}
}
		cleanedTweet = words.join(' ');
		if (syllable(cleanedTweet) === 7){
			return callback(null, cleanedTweet);
			/* console.log('7:' + tweets.statuses[i].text); */
		  }
	   }
    }
  });
}
