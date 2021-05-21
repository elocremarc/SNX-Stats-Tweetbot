import { getExhangeData } from "./snx-data.js";
import { loadSynthData } from "./snx-synths.js";

const tweetSNX = async () => {
  const exhangeData = await getExhangeData();
  const synthData = await loadSynthData();
  console.log(exhangeData);
  console.log(synthData);
};

tweetSNX();
