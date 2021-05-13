const { SynthetixJs } = require("synthetix-js");
const commaNumber = require("comma-number");
var ethers = require("ethers");

(async function () {
  const snxjs = new SynthetixJs(); //uses default ContractSettings - ethers.js default provider, mainnet
  const toUtf8Bytes = SynthetixJs.utils.formatBytes32String;

  console.log("-------------------");
  console.log("SYNTH SUPPLY");
  console.log("-------------------");
  const { synths } = snxjs.contractSettings;
  //console.log(synths[19]);

  //const rateForSynth = await snxjs.ExchangeRates.contract.rateForCurrency(synths[1].name);
  //console.log(rateForSynth);
  const synthData = [];
  synths.forEach(async ({ name, sign, category }, index) => {
    const synthPrice =
      (await snxjs.ExchangeRates.contract.rateForCurrency(
        toUtf8Bytes(`${name}`)
      )) / 1e18;
    const totalAmount = await snxjs[name].totalSupply();
    const totalSupply = Math.round(snxjs.utils.formatEther(totalAmount));
    const marketCap = Math.round(totalSupply * synthPrice);

    let synthPriceRnd = Number(synthPrice.toFixed(3));

    if (synthPrice > 10) {
      synthPriceRnd = Math.round(synthPrice);
    }
    if (marketCap > 0) {
      console.log(name, synthPriceRnd, marketCap);
    }

    synthData.push({
      name: name,
      category: category,
      price: synthPrice,
      sign: sign,
      supply: totalSupply,
      marketcap: marketCap,
    });
    //console.log(`${name} price: ${synthPrice}`);
    // console.log(synthData[index])
    if (totalSupply > 0) {
    }
  });
})();
