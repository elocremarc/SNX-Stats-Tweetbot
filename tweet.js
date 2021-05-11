require("dotenv").config();
const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

function postTweet(tweet) {
  return new Promise((resolve, reject) => {
    let params = {status:  `${tweet}`};

    client.post('statuses/update', params, (err, data) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log(data);
      return resolve(data);
    });
  });
}


console.log("Starting the twitter bot ...");

postTweet()