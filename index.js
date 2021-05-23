import { getExhangeData } from "./snx-data.js";
import { loadSynthData } from "./snx-synths.js";
import {
  domTweet,
  top3Tweet,
  exchangeTweet,
  forexTweet,
  snxTweet,
} from "./tweetTemplate.js";
import { postTweet } from "./tweet.js";
const tweetSNX = async () => {
  const exhangeData = await getExhangeData();
  const synthData = await loadSynthData();
  const random = Math.floor(Math.random() * 4);
  switch (random) {
    case 1:
      postTweet(domTweet(synthData.top5));
      break;
    case 2:
      postTweet(snxTweet(exhangeData));
      break;
    case 3:
      postTweet(top3Tweet(synthData.top3));
      break;
    case 4:
      postTweet(exchangeTweet(exhangeData));
      break;
  }
};

tweetSNX();
