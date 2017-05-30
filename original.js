var Twitter = require('twitter');
var syllable = require('syllable');
var number_to_text = require('number-to-text')
require('number-to-text/converters/en-us');


var client = new Twitter({
  consumer_key: 'gTRoJMtl99ffXL9hs4ooqQy7u',
  consumer_secret: 's6kKntReeEK4s5wwkJd5BuD2OJ4y90t2y9e36pfN3uVBGmvUaP',
  access_token_key: '797403445393117185-Q58sE9AMi4oxVeJOA1Hnv08S5XwGtfz',
  access_token_secret: '6OuIayuw5Lg4bMzBvUge2FpWLAe81zVs8RfNPPfOiSj5H'
});

function doStuff(i) {

if(i === 6) return;

client.get('search/tweets', {q: process.argv[2], lang:'en', count:100}, function(error, tweets, response) {
  if (!error) {
        var cleanedTweet;

        var flag = true;

        for (var i = 0; i < tweets.statuses.length; i++){

                cleanedTweet = tweets.statuses[i].text;
                cleanedTweet = cleanedTweet.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
                cleanedTweet = cleanedTweet.replace(/([^a-z0-9 ']+)/gi, ' ');
                var words = cleanedTweet.split(' ');
                for (var j = 0; j < words.length; j++){
                  if (!isNaN(words[j]) && parseInt(words[j]) > 0){
                     words[i] = number_to_text.convertToText(words[j]);
                  }
                }
                cleanedTweet = words.join(' ');
                if (syllable(cleanedTweet) === 7){
                  console.log('7:'+ tweets.statuses[i].text);
                  flag = false;
                }
                if (syllable(cleanedTweet) === 5){
                  console.log('5:'+ tweets.statuses[i].text);
                  flag = false;
                }
              }
doStuff(0);
