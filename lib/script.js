(function() {
  var BASE_URL, SUBREDDITS_URL;

  BASE_URL = "http://www.reddit.com/r/";

  SUBREDDITS_URL = "http://www.reddit.com/reddits/mine/subscriber.json";

  window.subreddits = [];

  $.getJSON(SUBREDDITS_URL, function(json) {
    var subreddit, _i, _len, _ref, _results;
    _ref = json.data.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      subreddit = _ref[_i];
      _results.push(subreddits.push({
        content: subreddit.data.display_name.toLowerCase(),
        description: subreddit.data.title
      }));
    }
    return _results;
  });

  chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    var results;
    results = _.filter(subreddits, function(subreddit) {
      return subreddit.content.substring(0, text.length) === text;
    });
    return suggest(results);
  });

  chrome.omnibox.onInputEntered.addListener(function(text) {
    var url;
    url = BASE_URL + text;
    return chrome.tabs.create({
      url: url
    });
  });

}).call(this);
