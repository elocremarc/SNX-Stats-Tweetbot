const {
  percentEmojiGraph,
  emojifyNumber,
  percentEmoji,
} = require("./percent-emoji.js");
const commaNumber = require("comma-number");

const whaleTweet = () => {
  `π¨π³πͺ SYNTH WHALE ALERT πͺπ³π¨`;
};

const domTweet = (top5) => {
  let tweet = `πͺ SYNTH DOMINANCE πͺ

${percentEmoji(Math.round(top5[0].dominance))} π€ ${top5[0].name}
${percentEmojiGraph(Math.round(top5[0].dominance))}
    
${percentEmoji(Math.round(top5[1].dominance))} π€ ${top5[1].name} 
${percentEmojiGraph(Math.round(top5[1].dominance))}

${percentEmoji(Math.round(top5[2].dominance))} π€ ${top5[2].name} 
${percentEmojiGraph(Math.round(top5[2].dominance))}

${percentEmoji(Math.round(top5[3].dominance))} π€ ${top5[3].name} 
${percentEmojiGraph(Math.round(top5[3].dominance))}

${percentEmoji(Math.round(top5[4].dominance))} π€ ${top5[4].name} 
${percentEmojiGraph(Math.round(top5[4].dominance))}

${percentEmoji(Math.round(top5[5].dominance))} π€ ${top5[5].name} 
${percentEmojiGraph(Math.round(top5[5].dominance))} `;
  return tweet;
};
const top3Tweet = (top3) => {
  let tweet = `πͺTOP 3 SYNTHS BY MARKET CAPπͺ

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

const exchangeTweet = (snxdata) => {
  let tweet = `πͺ SYNTH TRADES TODAY πͺ

π Volume  $${emojifyNumber(commaNumber(Math.round(snxdata.tradeVolumeDay)))}

πΈ Fees Collected $${emojifyNumber(commaNumber(Math.round(snxdata.feesDay)))}

#οΈβ£ Number of Trades ${emojifyNumber(commaNumber(Math.round(snxdata.tradesDay)))}

βοΈ Average Trade Size $${emojifyNumber(
    commaNumber(Math.round(snxdata.avgTradeSizeDay))
  )}`;
  return tweet;
};

const snxTweet = (snxdata) => {
  let snxPrice = snxdata.usdToSnxPrice;
  let snxPriceRnd = parseFloat(snxPrice).toFixed(2);
  let tweet = `πͺ SNX NETWORK STATS πͺ

πΈ $SNX Price $${emojifyNumber(commaNumber(snxPriceRnd))}

#οΈβ£ $SNX Holders ${emojifyNumber(commaNumber(snxdata.snxHolders))}

π§’ $SNX Market Cap
$${emojifyNumber(commaNumber(Math.round(snxdata.snxMarketCap)))}

π₯© $SNX Staked
$${emojifyNumber(commaNumber(Math.round(snxdata.snxStaked)))}

πͺ % Staked ${emojifyNumber(
    commaNumber(Math.round(snxdata.snxPercentStaked * 100))
  )}%

π¦ Collateralization Ratio ${emojifyNumber(
    commaNumber(Math.round(snxdata.cRatio))
  )}%`;
  return tweet;
};

const forexTweet = (forexdata) => {};

module.exports = { domTweet, top3Tweet, exchangeTweet, snxTweet };
