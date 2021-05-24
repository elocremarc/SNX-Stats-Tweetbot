import { tweetSNX } from "../index";

module.exports = async function (context, myTimer) {
  var timeStamp = new Date().toISOString();
  console.log("starting...");
  try {
    await tweetSNX();
    console.log("sucesful tweet");
  } catch (error) {
    console.log("failed tweet");
    console.log(error);
  }
  if (myTimer.isPastDue) {
    context.log("JavaScript is running late!");
  }
  context.log("JavaScript timer trigger function ran!", timeStamp);
};
