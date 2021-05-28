const { getExhangeData } = require("./snx-data.js");
const { loadSynthData } = require("./snx-synths.js");
const {
  domTweet,
  top3Tweet,
  exchangeTweet,
  forexTweet,
  snxTweet,
} = require("./tweetTemplate.js");
const { postTweet } = require("./tweet.js");

const tweetSNX = async () => {
  console.log("getting data...");
  const exhangeData = await getExhangeData();
  const synthData = await loadSynthData();
  const random = Math.floor(Math.random() * 5);
  console.log("choosing tweet:" + random);
  switch (random) {
    case 0:
      postTweet(domTweet(synthData.top5));
      break;
    case 1:
      postTweet(snxTweet(exhangeData));
      break;
    case 2:
      postTweet(top3Tweet(synthData.top3));
      break;
    case 3:
      postTweet(exchangeTweet(exhangeData));
      break;
    case 4:
      postTweet(domTweet(synthData.top5));
      break;
  }
};
module.exports = { tweetSNX };
