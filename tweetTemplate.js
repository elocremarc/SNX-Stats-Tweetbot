import {
  percentEmojiGraph,
  emojifyNumber,
  percentEmoji,
} from "./percent-emoji.js";
import commaNumber from "comma-number";

export const whaleTweet = () => {
  `🚨🐳🟪 SYNTH WHALE ALERT 🟪🐳🚨`;
};

export const domTweet = (top5) => {
  let tweet = `🟪 SYNTH DOMINANCE 🟪

${percentEmoji(Math.round(top5[0].dominance))} 🤖 ${top5[0].name}
${percentEmojiGraph(Math.round(top5[0].dominance))}
    
${percentEmoji(Math.round(top5[1].dominance))} 🤖 ${top5[1].name} 
${percentEmojiGraph(Math.round(top5[1].dominance))}

${percentEmoji(Math.round(top5[2].dominance))} 🤖 ${top5[2].name} 
${percentEmojiGraph(Math.round(top5[2].dominance))}

${percentEmoji(Math.round(top5[3].dominance))} 🤖 ${top5[3].name} 
${percentEmojiGraph(Math.round(top5[3].dominance))}

${percentEmoji(Math.round(top5[4].dominance))} 🤖 ${top5[4].name} 
${percentEmojiGraph(Math.round(top5[4].dominance))}

${percentEmoji(Math.round(top5[5].dominance))} 🤖 ${top5[5].name} 
${percentEmojiGraph(Math.round(top5[5].dominance))} `;
  return tweet;
};
export const top3Tweet = (top3) => {
  let tweet = `🟪TOP 3 SYNTHS BY MARKET CAP🟪

$${top3[0].name} $${emojifyNumber(
    commaNumber(Math.round(top3[0].synthMarketCap))
  )}

$${top3[1].name} $${emojifyNumber(
    commaNumber(Math.round(top3[1].synthMarketCap))
  )}

$${top3[2].name} $${emojifyNumber(
    commaNumber(Math.round(top3[2].synthMarketCap))
  )}
  `;
  return tweet;
};

export const exchangeTweet = (snxdata) => {
  let tweet = `🟪 SYNTH TRADES TODAY 🟪

🔊 Volume  $${emojifyNumber(commaNumber(Math.round(snxdata.tradeVolumeDay)))}

💸 Fees Collected $${emojifyNumber(commaNumber(Math.round(snxdata.feesDay)))}

#️⃣ Number of Trades ${emojifyNumber(commaNumber(Math.round(snxdata.tradesDay)))}

⚖️ Average Trade Size $${emojifyNumber(
    commaNumber(Math.round(snxdata.avgTradeSizeDay))
  )}`;
  return tweet;
};

export const snxTweet = (snxdata) => {
  let snxPrice = snxdata.usdToSnxPrice;
  let snxPriceRnd = parseFloat(snxPrice).toFixed(2);
  let tweet = `🟪 SNX NETWORK STATS 🟪

💸 $SNX Price $${emojifyNumber(commaNumber(snxPriceRnd))}

#️⃣ $SNX Holders ${emojifyNumber(commaNumber(snxdata.snxHolders))}

🧢 $SNX Market Cap
$${emojifyNumber(commaNumber(Math.round(snxdata.snxMarketCap)))}

🥩 $SNX Staked
$${emojifyNumber(commaNumber(Math.round(snxdata.snxStaked)))}

💪 % Staked ${emojifyNumber(
    commaNumber(Math.round(snxdata.snxPercentStaked * 100))
  )}%

🏦 Collateralization Ratio ${emojifyNumber(
    commaNumber(Math.round(snxdata.cRatio))
  )}%`;
  return tweet;
};

export const forexTweet = (forexdata) => {};
