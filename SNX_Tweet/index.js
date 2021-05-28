const { tweetSNX } = require("../index");

module.exports = async function (context, myTimer) {
  var timeStamp = new Date().toISOString();
  context.log("starting...");
  try {
    await tweetSNX();
    context.log("sucesful tweet");
  } catch (error) {
    context.log("failed tweet");
    context.log(error);
  }
  if (myTimer.isPastDue) {
    context.log("JavaScript is running late!");
  }
  context.log("JavaScript timer trigger function ran!", timeStamp);
};
