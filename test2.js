var YouTube = require('youtube-node');
var fetchCommentPage = require('youtube-comment-api')();
 
var youTube = new YouTube();
youTube.setKey('AIzaSyDnrfQzmot1dVYvNFNOXQDf6iuRYMhRcmA');
youTube.search(process.argv[2], 2, function(error, result) {
  if (error) {
    console.log(error);
  }  
  else {
	var videoID = result.items[0].id.videoId;
	fetchCommentPage(videoID, null, function(err, commentPage) { 
		for (var i = 0; i < commentPage.comments.length; i++){
			console.log(commentPage.comments[i].commentText);
	}});
	}
});  
