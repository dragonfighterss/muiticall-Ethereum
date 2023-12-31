const { MultiCall } = require("@indexed-finance/multicall");
const { abi } = require("./AggregatorV3Interface.json");
const priceFeedAddress = "0xDB8E00Ef74951874cEB59584483C9490fAE3747b";
const ethers = require("ethers");
require("dotenv").config();
// final code
async function main() {
  let provider = new ethers.providers.JsonRpcProvider(
    process.env.ALCHEMY_MAINNET_RPC_URL
  );
  const multi = new MultiCall(provider);
  const inputs = [];
  numberOfRounds = 10;
  priceFeed = new ethers.Contract(priceFeedAddress, abi, provider);
  latestRound = (await priceFeed.latestRoundData())[0];
  for (
    let round = latestRound.sub(numberOfRounds);
    round.lt(latestRound);
    round = round.add(1)
  ) {
    inputs.push({
      target: priceFeedAddress,
      function: "getRoundData",
      args: [round.toString()],
    });
  }
  const roundData = await multi.multiCall(abi, inputs);
  console.log(roundData);
  return roundData;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("multicall error ----", error);
    process.exit(1);
  });
