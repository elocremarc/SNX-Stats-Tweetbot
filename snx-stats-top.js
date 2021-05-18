import { SynthetixJs } from "synthetix-js";
import commaNumber from "comma-number";

const loadBlockChain = async () => {
  const snxjs = new SynthetixJs(); //uses default ContractSettings - ethers.js default provider, mainnet
  const toUtf8Bytes = SynthetixJs.utils.formatBytes32String;
  const { synths } = snxjs.contractSettings;

  const newSynthDataPromises = synths.map(async (synth, index) => {
    const synthPrice =
      (await snxjs.ExchangeRates.contract.rateForCurrency(
        toUtf8Bytes(`${synth.name}`)
      )) / 1e18;
    const totalAmount = await snxjs[synth.name].totalSupply();
    const totalSupply = Math.round(snxjs.utils.formatEther(totalAmount));
    const marketCap = Math.round(totalSupply * synthPrice);
    const name = synth.name;

    let synthPriceRnd = Number(synthPrice.toFixed(3));

    if (synthPrice > 10) {
      synthPriceRnd = Math.round(synthPrice);
    }
    return { name, synthPriceRnd, marketCap, totalSupply };
  });

  const newSyncData = await Promise.all(newSynthDataPromises);

  console.log({ newSyncData });

  newSyncData.forEach((synth) => console.log(synth));
  // console.log(synthData);
};
loadBlockChain();
