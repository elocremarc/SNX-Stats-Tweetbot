const { SynthetixJs } = require('synthetix-js');
const commaNumber = require('comma-number')

(async function() {
  const snxjs = new SynthetixJs(); //uses default ContractSettings - ethers.js default provider, mainnet
 // const snxPrice = snxjs.utils.formatEther(await snxjs.utils.getSynthetixPrice());
  console.log('-------------------');

  console.log('-------------------');
  //console.log(`SNX price: ${snxPrice}`);
  console.log('-------------------');
  console.log('SYNTH SUPPLY');
  console.log('-------------------');
  const { synths } = snxjs.contractSettings;

  synths.forEach(async ({ name, sign }) => {
    const totalAmount = await snxjs[name].totalSupply();
    const totalSupply = Math.round(snxjs.utils.formatEther(totalAmount));
    if (totalSupply > 0){
    console.log(` (${name}) ${sign} ${" "}${totalSupply}`);}
  });
})();