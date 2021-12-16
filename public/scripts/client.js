/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`)
      } 
    });
  };

  loadTweets();

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

  const $form = $('.chat-area');

  $form.on('submit', function(event) {
    event.preventDefault();
    console.log(this)
    const serializeData = $(this).serialize();
    $.post('/tweets', serializeData, (response) => {
      loadTweets()
    })
  })

})


