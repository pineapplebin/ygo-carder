const axios = require("axios");

async function getCardCode(cardName) {
  cardName = cardName.trim();
  const res = await axios(
    `https://www.ourocg.cn/search/${encodeURIComponent(cardName)}/`
  );
  const regexp = new RegExp("window.__STORE__\\s=\\s(.+);\\n</script>");
  const matched = (res.data || "").match(regexp);
  if (matched && matched[1]) {
    const parsed = JSON.parse(matched[1]);
    let rst = null;
    (parsed.cards || []).forEach(card => {
      if (card.name === cardName || card.name_nw === cardName) {
        rst = card.password;
      }
    });
    if (rst) {
      return rst;
    } else {
      // console.warn(parsed);
      throw parsed;
    }
  } else {
    // console.warn(res.data);
    throw res.data;
  }
}

// getCardCode("千手佛").then(console.log);

module.exports = {
  getCardCode
};
