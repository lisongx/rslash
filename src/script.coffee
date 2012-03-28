BASE_URL = "http://www.reddit.com/r/"
SUBREDDITS_URL = "http://www.reddit.com/reddits/mine/subscriber.json"

window.subreddits = []

$.getJSON SUBREDDITS_URL, (json)->
    for subreddit in json.data.children
        subreddits.push
            content: subreddit.data.display_name.toLowerCase()
            description: subreddit.data.title

chrome.omnibox.onInputChanged.addListener (text, suggest) ->
    results = _.filter subreddits, (subreddit) -> 
            subreddit.content.substring(0, text.length) is text
    suggest results
    
chrome.omnibox.onInputEntered.addListener (text) ->
  url = BASE_URL + text
  chrome.tabs.create url: url


  
# chrome.history.search
#     text: "http://www.reddit.com/r/"
#     maxResults: 100000
#     startTime: 0
#     (results) ->
#         subreddits = []
#         for item in results
#             subreddit = item.url.split('/')[4]
#             console.log subreddit
#         subreddits