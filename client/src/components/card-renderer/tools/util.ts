/**
 * 检查是否为汉字
 * 给入charCode
 */
export function isHansChar(code: number) {
  return code >= 19968 && code <= 40869
}

/**
 * 检查是否特殊字符
 * 例如：①、●、×等
 */
export function isSpecialChar(code: number) {
  return (code >= 9312 && code <= 9321) || code === 9679 || code === 215
}

/**
 * 返回是否汉字的标点
 */
export function isHansPunctuation(code: number) {
  return code === 65306 || code === 12290 || code === 65292 || code === 12301
}
