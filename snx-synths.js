import { synthetix } from "@synthetixio/contracts-interface";
import dotenv from "dotenv";
import ethers from "ethers";

dotenv.config();
const synthetixSnx =
  "https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix";
//Providers
const network = "homestead";
const provider = ethers.getDefaultProvider(network, {
  etherscan: process.env.YOUR_ETHERSCAN_API_KEY,
  infura: process.env.YOUR_INFURA_PROJECT_ID,
  alchemy: process.env.YOUR_ALCHEMY_API_KEY,
});
export const loadSynthData = async () => {
  let synths;
  let snxPrice;
  let totalSynthMarketCap = 0;

  // this instance exposes props for the given network: synths, sources, targets, users, as well as helper function toBytes32 - as per synthetix: https://github.com/Synthetixio/synthetix/blob/develop/index.js#L199.
  const snxjs = synthetix({
    network: "mainnet",
    provider: provider,
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
  let totalIssuedSynths =
    await snxjs.contracts.Synthetix.totalIssuedSynthsExcludeEtherCollateral(
      snxjs.toBytes32("sUSD")
    );
  totalIssuedSynths = Number(formatEther(totalIssuedSynths));
  const tempIssuanceRatio = Number(
    snxjs.utils.formatEther(
      await snxjs.contracts.SystemSettings.issuanceRatio()
    )
  );
  const lastDebtLedgerEntry = Number(
    snxjs.utils.formatEther(
      await snxjs.contracts.SynthetixState.lastDebtLedgerEntry()
    )
  );
  let snxTotalSupply = await snxjs.contracts.Synthetix.totalSupply();
  snxTotalSupply = Number(formatEther(snxTotalSupply));
  const snxMarketCap = snxTotalSupply * snxPrice;

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
  const cRatio = Math.round((snxMarketCap / totalIssuedSynths) * 100);

  // console.log(
  //   "snxPrice",
  //   snxPrice,
  //   "snxTotalSupply",
  //   snxTotalSupply,
  //   "MarketCap",
  //   snxMarketCap,
  //   "total Synths",
  //   totalIssuedSynths,
  //   "totalSynthMarketCap",
  //   totalSynthMarketCap,
  //   "c-ratio",
  //   cRatio
  // );
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
  let sortedSynthWeights = synthWeights.sort((a, b) =>
    a.dominance > b.dominance ? -1 : 1
  );

  let top5 = sortedSynthWeights.slice(0, 5);
  let top3 = sortedSynthWeights.slice(0, 3);
  let totalPercent = 0;
  top5.forEach((top) => {
    totalPercent += top.dominance;
  });
  let percentOthers = 100 - totalPercent;
  top5.push({ name: "Other", dominance: percentOthers });
  top5 = top5.sort((a, b) => (a.dominance > b.dominance ? -1 : 1));
  return {
    top3,
    top5,
    cRatio,
    lastDebtLedgerEntry,
    tempIssuanceRatio,
    snxMarketCap,
    snxPrice,
    snxTotalSupply,
    totalIssuedSynths,
    totalSynthMarketCap,
  };
};
// let data = await loadSynthData();
// console.log(data);
