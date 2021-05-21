import { percentEmojiGraph, emojifyNumber } from "./percent-emoji.js";
import commaNumber from "comma-number";

export const whaleTweet = () => {
  `🚨🐳🔹🔷🟪 SYNTH WHALE ALERT 🟪🔷🔹🐳🚨`;
};

export const domTweet = (top5) => {
  let tweet = `
    🔹🔷🟪 SYNTH DOMINANCE 🟪🔷🔹
    ${percentEmojiGraph(Math.round(top5[0].dominance))} ${top5[0].name}
    ${percentEmojiGraph(Math.round(top5[1].dominance))} ${top5[1].name}
    ${percentEmojiGraph(Math.round(top5[2].dominance))} ${top5[2].name}
    ${percentEmojiGraph(Math.round(top5[3].dominance))} ${top5[3].name}
    ${percentEmojiGraph(Math.round(top5[4].dominance))} ${top5[4].name}
    ${percentEmojiGraph(Math.round(top5[5].dominance))} ${top5[5].name}
    `;
  return tweet;
};
export const top3Tweet = (top3) => {
  let tweet = `🔹🔷🟪 TOP 3 SYNTHS BY MARKET CAP 🟪🔷🔹

${top3[0].name} $${emojifyNumber(
    commaNumber(Math.round(top3[0].synthMarketCap))
  )}

${top3[1].name} $${emojifyNumber(
    commaNumber(Math.round(top3[1].synthMarketCap))
  )}

${top3[2].name} $${emojifyNumber(
    commaNumber(Math.round(top3[2].synthMarketCap))
  )}

  🌐 https://stats.synthetix.io/#synths
  `;
  return tweet;
};

export const exchangeTweet = (snxdata) => {
  let tweet = `🔹🔷🟪 SYNTH TRADES TODAY 🟪🔷🔹

🔊 Volume  $${emojifyNumber(commaNumber(Math.round(snxdata.tradeVolumeDay)))} 
💸 Fees Collected $${emojifyNumber(commaNumber(Math.round(snxdata.feesDay)))}
#️⃣ Number of Trades ${emojifyNumber(commaNumber(Math.round(snxdata.tradesDay)))}
⚖️ Average Trade Size $${emojifyNumber(
    commaNumber(Math.round(snxdata.avgTradeSizeDay))
  )} 

🌐 https://synthetix.exchange/`;
  return tweet;
};

export const forexTweet = (forexdata) => {};
