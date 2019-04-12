/**
 * 过滤英文版的文件名
 *
 * @param {string} filename
 * @returns {boolean}
 */
function exceptEnFilename(filename) {
  return !/\[eu\]/.test(filename);
}

/**
 * 从文件名中提取卡片名称
 *
 * @param {string} filename
 * @returns {string}
 */
function extractCardName(filename) {
  return filename
    .replace(/^\d{4}/, "")
    .replace(/\[jp\]/g, "")
    .split(".")
    .slice(0, -1)
    .join(".");
}

module.exports = {
  exceptEnFilename,
  extractCardName
};
