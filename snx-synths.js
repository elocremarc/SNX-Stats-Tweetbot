import { synthetix } from "@synthetixio/contracts-interface";
import dotenv from "dotenv";
dotenv.config();

// Providers
// const network = "homestead";
// const provider = ethers.getDefaultProvider(network, {
//   etherscan: process.env.YOUR_ETHERSCAN_API_KEY,
//   infura: process.env.YOUR_INFURA_PROJECT_ID,
//   alchemy: process.env.YOUR_ALCHEMY_API_KEY,
// });
export const loadSynthData = async () => {
  let synths;
  let snxPrice;
  let totalSynthMarketCap = 0;

  // this instance exposes props for the given network: synths, sources, targets, users, as well as helper function toBytes32 - as per synthetix: https://github.com/Synthetixio/synthetix/blob/develop/index.js#L199.
  const snxjs = synthetix({
    network: "mainnet",
  });

  const { formatEther } = snxjs.utils;
  synths = snxjs.synths;

  const fromBlock = 10260987;
  const blockOptions = fromBlock ? { blockTag: Number(fromBlock) } : {};
  const unformattedSnxPrice =
    await snxjs.contracts.ExchangeRates.rateForCurrency(
      snxjs.toBytes32("SNX"),
      blockOptions
    ); // note blockOptions must be passed to `ethers.Contract` as the final parameter (and fails if no archive node)
  snxPrice = formatEther(unformattedSnxPrice);
  console.log("snxPrice", snxPrice);
  const synthData = synths.map(async (synth) => {
    //Get Synth Supply
    const totalAmount = await snxjs.contracts[`Synth${synth.name}`].totalSupply(
      blockOptions
    );
    const synthSupply = formatEther(totalAmount);
    //Get Synth Price
    const synthPrice = formatEther(
      await snxjs.contracts.ExchangeRates.rateForCurrency(
        snxjs.toBytes32(synth.name),
        blockOptions
      )
    );
    //Market Cap
    const synthMarketCap = Math.round(synthPrice * synthSupply);

    //Synth Frozen
    const rateIsFrozen = await snxjs.contracts.ExchangeRates.rateIsFrozen(
      snxjs.toBytes32(synth.name),
      blockOptions
    );
    const sign = synth.sign;
    const name = synth.name;
    const category = synth.category;
    return {
      name,
      category,
      sign,
      synthSupply,
      synthPrice,
      synthMarketCap,
      rateIsFrozen,
    };
  });

  const newSynthData = await Promise.all(synthData);

  newSynthData.forEach((synth, index) => {
    totalSynthMarketCap += synth.synthMarketCap;
    if (index === newSynthData.length - 1) {
    }
    return totalSynthMarketCap;
  });
  let synthWeights = newSynthData.map((synth) => {
    const dominance = (synth.synthMarketCap / totalSynthMarketCap) * 100;
    const name = synth.name;
    const category = synth.category;
    const sign = synth.sign;
    const synthSupply = synth.synthSupply;
    const synthPrice = synth.synthPrice;
    const synthMarketCap = synth.synthMarketCap;
    const rateIsFrozen = synth.rateIsFrozen;
    return {
      name,
      category,
      sign,
      synthSupply,
      synthPrice,
      synthMarketCap,
      rateIsFrozen,
      dominance,
    };
  });
  synthWeights = synthWeights.sort((a, b) =>
    a.dominance > b.dominance ? -1 : 1
  );
  let top5 = synthWeights.splice(0, 5);
  let top3 = synthWeights.splice(0, 3);

  let totalPercent = 0;
  top5.forEach((top) => {
    totalPercent += top.dominance;
  });
  let percentOthers = 100 - totalPercent;
  top5.push({ name: "Other", dominance: percentOthers });
  top5 = top5.sort((a, b) => (a.dominance > b.dominance ? -1 : 1));
  return { top3, top5 };
};
