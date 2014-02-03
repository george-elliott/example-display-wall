define('src/templates/helpers/formatTweet',
  [
    'handlebars',
    'moment'
  ], function (
    Handlebars,
    moment
  ) {

  var matchHandles = /(^|[^@\w])@(\w{1,15})\b/g;
  var matchTags = /(^|\s)#(\w+)/g;
  var matchLinks = /(http:\/\/t\.co\/[a-zA-Z0-9]*)/g;

  Handlebars.registerHelper('formatTweet', function(tweet) {
    return new Handlebars.SafeString(tweet.replace(matchHandles, '$1<a class="chute-handle" href="http://twitter.com/$2">@$2</a>')
      .replace(matchTags, '$1<a class="chute-hashtag" href="http://twitter.com/search?q=%23$2">#$2</a>')
      .replace(matchLinks, '<a class="chute-tweet-link" href="$1">$1</a>'));
  });
});
