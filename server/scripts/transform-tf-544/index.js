const fs = require("fs");
const path = require("path");
const { exceptEnFilename, extractCardName } = require("./utils.js");
const { getCardCode } = require("./fetch.js");

const FOLDER = "/Users/pineapplebin/Documents/Media/OCG/test";

/**
 * 主函数
 */
async function main() {
  // transform filename
  const filenames = fs
    .readdirSync(FOLDER)
    .filter(exceptEnFilename)
    .filter(filename => filename !== ".DS_Store");
  const cardNames = filenames.map(extractCardName);
  const nameMap = filenames.reduce((rst, filename, idx) => {
    rst[filename] = cardNames[idx];
    return rst;
  }, {});
  // fetch data
  const requests = Object.keys(nameMap).map(filename => {
    const cardName = nameMap[filename];
    return getCardCode(cardName)
      .then(password => {
        nameMap[filename] = password;
      })
      .catch(() => {
        delete nameMap[filename];
        console.warn("can not fetch", filename);
      });
  });
  await Promise.all(requests);
  // update filename
  console.log(nameMap);
  Object.keys(nameMap).forEach(filename => {
    fs.renameSync(
      path.join(FOLDER, filename),
      path.join(FOLDER, nameMap[filename]) + ".jpg"
    );
  });
  console.log("done");
}

main();
