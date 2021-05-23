import snxData from "synthetix-data";
import { synthetix, Network } from "@synthetixio/contracts-interface";
import { loadSynthData } from "./snx-synths.js";

const snxjs = synthetix({ network: Network.Mainnet });

let value = 0;
let rewards = 0;
let sethCollat = 0;
let susdCollat = 0;
let snxHolders = 0;
let snxRewardsBal = 0;
let snxRewardsBalVes = 0;
let tradeVolumeDay = 0;
let tradeVolumeWeek = 0;
let tradeVolumeMonth = 0;
let feesDay = 0;
let tradesDay = 0;
let avgTradeSizeDay = 0;

export const getExhangeData = async () => {
  //Get the FeesClaimed events in reverse chronological order, showing fees in sUSD and rewards in SNX.
  let fees = await snxData.snx.feesClaimed();
  fees.forEach((instance) => {
    value += instance.value;
    rewards += instance.rewards;
  });
  //Get the list of all EtherCollateral loans opened.
  let collateral = await snxData.etherCollateral.loans();
  collateral.forEach((instance) => {
    if (instance.isOpen) {
      if (instance.collateralMinted === "sETH") {
        sethCollat += instance.amount;
      }
      if (instance.collateralMinted === "sUSD") {
        susdCollat += instance.amount;
      }

      return sethCollat, susdCollat;
    }
  });
  //Get the total count of unique issuers and snxHolders
  let snxTotal = await snxData.snx.total();
  snxHolders = snxTotal.snxHolders;
  //Get the list of reward escrow holders and their latest balance at vesting entry add or vest.
  let snxRewards = await snxData.snx.rewards();
  snxRewards.forEach((instance) => {
    snxRewardsBal += instance.balance;
    snxRewardsBalVes += instance.vestedBalanceOf;
  });
  let synthData = await loadSynthData();

  let snxTotalQuery = 0;
  let snxLockedQuery = 0;
  let stakersTotalDebt = 0;
  let stakersTotalCollateral = 0;
  let totalIssuedSynths = synthData.totalIssuedSynths;
  let usdToSnxPrice = synthData.snxPrice;
  let tempIssuanceRatio = synthData.tempIssuanceRatio;
  let lastDebtLedgerEntry = synthData.lastDebtLedgerEntry;
  let snxMarketCap = synthData.snxMarketCap;
  let cRatio = synthData.cRatio;

  const holders = await snxData.snx.holders({ max: 1000 });
  holders.forEach(({ collateral, debtEntryAtIndex, initialDebtOwnership }) => {
    const collateralFmt = collateral;
    const debtEntryAtIndexFmt = debtEntryAtIndex;
    const initialDebtOwnershipFmt = initialDebtOwnership;

    let debtBalance =
      ((totalIssuedSynths * lastDebtLedgerEntry) / debtEntryAtIndexFmt) *
      initialDebtOwnershipFmt;
    initialDebtOwnershipFmt;
    let collateralRatio = debtBalance / collateralFmt / usdToSnxPrice;

    if (isNaN(debtBalance)) {
      debtBalance = 0;
      collateralRatio = 0;
    }
    const lockedSnx =
      collateralFmt * Math.min(1, collateralRatio / tempIssuanceRatio);

    if (Number(debtBalance) > 0) {
      stakersTotalDebt += Number(debtBalance);
      stakersTotalCollateral += Number(collateralFmt * usdToSnxPrice);
    }
    snxTotalQuery += Number(collateralFmt);
    snxLockedQuery += Number(lockedSnx);
  });
  const snxPercentStaked = snxLockedQuery / snxTotalQuery;
  const snxStaked = snxMarketCap * snxPercentStaked;

  const ts = Math.floor(Date.now() / 1e3);
  const oneDayAgo = ts - 3600 * 24;

  await snxData.exchanges
    .since({
      minTimestamp: oneDayAgo, // one week ago
    })
    .then((exchanges, index) =>
      exchanges.forEach((trade) => {
        tradesDay++;
        feesDay += trade.feesInUSD;
        tradeVolumeDay += trade.fromAmountInUSD;
        avgTradeSizeDay = trade.fromAmountInUSD + avgTradeSizeDay;
        if (index === snxRewards.length - 1) {
          avgTradeSizeDay = avgTradeSizeDay / tradesDay;
        }
      })
    );
  //Get Weekly Volume
  await snxData.exchanges

    .since({
      minTimestamp: Math.floor(Date.now() / 1e3) - 3600 * 24 * 7, // one week ago
    })
    .then((exchanges) =>
      exchanges.forEach((trade) => {
        tradeVolumeWeek += trade.fromAmountInUSD;
      })
    );
  //Get Monthly Volume
  await snxData.exchanges

    .since({
      minTimestamp: Math.floor(Date.now() / 1e3) - 3600 * 24 * 30, // 30 days ago
    })
    .then((exchanges) =>
      exchanges.forEach((trade) => {
        tradeVolumeMonth += trade.fromAmountInUSD;
      })
    );

  return {
    susdCollat,
    sethCollat,
    snxHolders,
    value,
    rewards,
    snxRewardsBal,
    snxRewardsBalVes,
    tradeVolumeDay,
    tradeVolumeWeek,
    tradeVolumeMonth,
    feesDay,
    tradesDay,
    avgTradeSizeDay,
    snxPercentStaked,
    snxMarketCap,
    snxStaked,
    cRatio,
    usdToSnxPrice,
  };
};
