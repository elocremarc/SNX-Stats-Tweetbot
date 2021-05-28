const emojifyNumber = (number) => {
  let numbersplit = String(number).split("");
  let num = "";

  for (let i = 0; i < numbersplit.length; i++) {
    switch (numbersplit[i]) {
      case ".":
        num += ".";
        break;
      case ",":
        num += ",";
        break;
      case "0":
        num += "0️⃣";
        break;

      case "1":
        num += "1️⃣";
        break;
        ß;
      case "2":
        num += "2️⃣";
        break;

      case "3":
        num += "3️⃣";
        break;

      case `4`:
        num += "4️⃣";
        break;

      case `5`:
        num += "5️⃣";
        break;

      case `6`:
        num += "6️⃣";
        break;

      case `7`:
        num += "7️⃣";
        break;

      case `8`:
        num += "8️⃣";
        break;

      case `9`:
        num += "9️⃣";
        break;
    }
  }
  return num;
};

const percentEmoji = (percent) => {
  let emojiPercent;
  if (percent < 10) {
    emojiPercent = "0️⃣" + emojifyNumber(percent) + " % ";
  } else {
    emojiPercent = emojifyNumber(percent) + " % ";
  }
  return emojiPercent;
};

const percentEmojiGraph = (percent) => {
  let barGraph = (Math.round(percent / 10) * 10) / 10;

  let renderdGraph = "";

  for (let i = 0; i < 10; i++) {
    if (i < barGraph) {
      renderdGraph += "🟢";
    } else {
      renderdGraph += "🔵";
    }
  }
  return renderdGraph;
};

module.exports = { percentEmojiGraph, percentEmoji, emojifyNumber };
