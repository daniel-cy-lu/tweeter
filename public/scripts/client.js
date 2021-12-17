/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Execute after DOM are ready
$(() => {
  
  // Function that GET old tweets from /tweets
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      }
    });
  };
  loadTweets();

  // Function that generate a article container that holds old tweet info and DOM
  const createTweetElement = function(tweetData) {
    const $avatar = $('<img>').attr("src", tweetData.user.avatars);
    const $avatarImg = $('<div>').addClass('old-tweet-header-left-content-avatar');
    $avatarImg.append($avatar);
  
  
    const $username = $('<div>').addClass('old-tweet-header-left-content-username');
    $username.text(tweetData.user.name);
  
  
    const $handle = $('<div>').addClass("old-tweet-header-right-content");
    $handle.text(tweetData.user.handle);
  
  
    const $leftContent = $('<div>').addClass('old-tweet-header-left-content');
    $leftContent.append($avatarImg, $username);
  
  
    const $header = $('<header>').addClass("old-tweet-header");
    $header.append($leftContent, $handle);
  
  
    const $text = $('<div>').addClass('old-tweet-text');
    $text.text(tweetData.content.text);
  
  
    const $date = $("<div>").addClass('old-tweet-footer-date');
    $date.text(timeago.format(tweetData.created_at));
  
  
    const $flag = $('<i>').addClass('fa-solid fa-flag');
    const $retweet = $('<i>').addClass('fa-solid fa-retweet');
    const $heart = $('<i>').addClass('fa-solid fa-heart');
    const $icon = $('<div>').addClass('old-tweet-footer-icons');
    $icon.append($flag, $retweet, $heart);
    const $footer = $('<footer>').addClass("old-tweet-footer");
    
    $footer.append($date, $icon);
    const $oldTweet = $('<article>').addClass('old-tweet-article');
    $oldTweet.append($header, $text, $footer);
    
    return $oldTweet;
  };

  // Function that append each article fomr createTweetElement to container, .old-tweet
  const renderTweets = function(tweetDatas) {
    const oldTweetContainer = $('.old-tweet');
    oldTweetContainer.empty();
  
    for (const tweetData of tweetDatas) {
      const tweet = createTweetElement(tweetData);
      oldTweetContainer.prepend(tweet);
    }
  };

  //Function that validate new tweet length then POST to data storage, /tweets
  const $form = $('.chat-area');

  $form.on('submit', function(event) {
    event.preventDefault();
    const serializeData = $(this).serialize();
    
    const $message = $("textarea").val();
    const $errorSign = $('<i>').addClass("fas fa-exclamation-triangle");
    $('.error-message').empty();
    if ($message === null || $message === "") {
      const $errorText1 = $('<div>').text("Error: Please enter a tweet!");
      $(".error-message").append($errorSign, $errorText1).slideDown(2500).slideUp(4000);
    }
    else if ($message.length > 140) {
      const $errorText2 = $('<div>').text("Error: Your tweet is more than 140 letters!");
      $(".error-message").append($errorSign, $errorText2).slideDown(2500).slideUp(4000);
    }
    else {
      $.post('/tweets', serializeData, (response) => {
        loadTweets();
      });
    }
  });
});


