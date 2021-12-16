/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" 
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


var createTweetElement = function (tweetData) {
  const $avatar = $('<img>').attr("src", tweetData.user.avatars);
  const $avatarImg = $('<div>').addClass('old-tweet-header-left-content-avatar')
  $avatarImg.append($avatar);


  const $username = $('<div>').addClass('old-tweet-header-left-content-username');
  $username.text(tweetData.user.name);


  const $handle = $('<div>').addClass("old-tweet-header-right-content");
  $handle.text(tweetData.user.handle);


  const $leftContent = $('<div>').addClass('old-tweet-header-left-content');
  $leftContent.append($avatarImg, $username); 


  const $header= $('<header>').addClass("old-tweet-header");
  $header.append($leftContent, $handle);


  const $text = $('<div>').addClass('old-tweet-text');
  $text.text(tweetData.content.text);


  const $date = $("<div>").addClass('old-tweet-footer-date');
  $date.text(timeago.format(tweetData.created_at));


  const $flag = $('<i>').addClass('fa-solid fa-flag');
  const $retweet = $('<i>').addClass('fa-solid fa-retweet');
  const $heart = $('<i>').addClass('fa-solid fa-heart');
  const $icon = $('<div>').append($flag, $retweet, $heart);
  const $footer = $('<footer>').addClass("old-tweet-footer");
  
  $footer.append($date, $icon);
  const $oldTweet = $('<article>').append($header, $text, $footer); 
  
  return $oldTweet;
}

var renderTweets = function (tweetDatas) {
  const oldTweetContainer = $('.old-tweet');
  oldTweetContainer.empty();

  for (const tweetData of tweetDatas) {
    const tweet = createTweetElement(tweetData);
    oldTweetContainer.prepend(tweet);
  }
}




renderTweets(data)

