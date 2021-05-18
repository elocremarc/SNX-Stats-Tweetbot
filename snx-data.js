import snxData from "synthetix-data";

let value = 0;
let rewards = 0;
let sethCollat = 0;
let susdCollat = 0;
let snxHolders = 0;
let snxRewardsBal = 0;
let snxRewardsBalVes = 0;

const getExhangeData = async () => {
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
  return {
    susdCollat,
    sethCollat,
    snxHolders,
    value,
    rewards,
    snxRewardsBal,
    snxRewardsBalVes,
  };
};
const newdata = await getExhangeData();
console.log(newdata);
