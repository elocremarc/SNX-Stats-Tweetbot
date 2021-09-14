const {
  percentEmojiGraph,
  emojifyNumber,
  percentEmoji,
} = require("./percent-emoji.js");
const commaNumber = require("comma-number");

const whaleTweet = () => {
  `🚨🐳🟪 SYNTH WHALE ALERT 🟪🐳🚨`;
};

const domTweet = (top5) => {
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
const top3Tweet = (top3) => {
  let tweet = `🟪TOP 3 SYNTHS BY MARKET CAP🟪

$${top3[0].name} $${commaNumber(Math.round(top3[0].synthMarketCap))}

$${top3[1].name} $${commaNumber(Math.round(top3[1].synthMarketCap))}

$${top3[2].name} $${commaNumber(Math.round(top3[2].synthMarketCap))}
  `;
  return tweet;
};

const exchangeTweet = (snxdata) => {
  let tweet = `🟪 SYNTH TRADES TODAY 🟪

🔊 Volume  $${commaNumber(Math.round(snxdata.tradeVolumeDay))}

💸 Fees Collected $${commaNumber(Math.round(snxdata.feesDay))}

#️⃣ Number of Trades ${commaNumber(Math.round(snxdata.tradesDay))}

⚖️ Average Trade Size $${commaNumber(Math.round(snxdata.avgTradeSizeDay))}`;
  return tweet;
};

const snxTweet = (snxdata) => {
  let snxPrice = snxdata.usdToSnxPrice;
  let snxPriceRnd = parseFloat(snxPrice).toFixed(2);
  let tweet = `🟪 SNX NETWORK STATS 🟪

💸 $SNX Price $${commaNumber(snxPriceRnd)}

#️⃣ $SNX Holders ${commaNumber(snxdata.snxHolders)}

🧢 $SNX Market Cap
$${commaNumber(Math.round(snxdata.snxMarketCap))}

🥩 $SNX Staked
$${commaNumber(Math.round(snxdata.snxStaked))}

💪 % Staked ${commaNumber(Math.round(snxdata.snxPercentStaked * 100))}%

🏦 Collateralization Ratio ${commaNumber(Math.round(snxdata.cRatio))}%`;
  return tweet;
};

const forexTweet = (forexdata) => {};

module.exports = { domTweet, top3Tweet, exchangeTweet, snxTweet };
