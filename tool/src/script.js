// import $ from "jquery"
;(function() {
  $(main)

  /**
   * 主函数
   */
  function main() {
    console.log("done")
    const mainTable = $("div.card.el-row")
    if (!mainTable) {
      throw new Error("card missing")
    }
    const map = parseAttrMap(mainTable)
    const base = getBaseData(map)
    const extraMap = {
      [1]: getEffectMonsterData,
      [2]: getEffectMonsterData,
      [3]: getConditionMonsterData,
      [4]: getEffectMonsterData,
      [5]: getSpellTrapData,
      [6]: getSpellTrapData,
      [7]: getConditionMonsterData,
      [8]: getXyzMonsterData,
      [9]: getLinkMonsterData,
      [10]: getPendulumMonsterData,
    }
    if (base.type in extraMap) {
      base.extra = extraMap[base.type](map, base)
    }
    console.log(JSON.stringify(base, null, 2))
  }

  /**
   * 将属性装换成键值对
   * @param {JQuery<HTMLElement>} main
   */
  function parseAttrMap(main) {
    const list = main
      .children()
      .filter((idx, item) => /(?:head|val)/.test(item.className))
    const result = {}
    let previous = null
    list.each((idx, element) => {
      const item = $(element)
      const isKey = /head/.test(element.className)
      const content = item.text().trim()
      if (isKey) {
        previous = content
      } else if (previous) {
        result[previous] = content
        previous = null
      }
    })
    console.log(result)
    return result
  }

  /**
   * 转换基础数据
   */
  function getBaseData(map) {
    const result = {}
    // 处理type
    result["type"] = 0
    const type = map["卡片种类"]
    const checkMap = {
      融合: 3,
      仪式: 4,
      同调: 7,
      XYZ: 8,
      连接: 9,
      灵摆: 10,
    }
    const regexps = Object.keys(checkMap).map((str) => [
      new RegExp(str),
      checkMap[str],
    ])
    if (/魔法/.test(type)) {
      result["type"] = 5
    } else if (/陷阱/.test(type)) {
      result["type"] = 6
    } else {
      for (let i = 0; i < regexps.length; i++) {
        if (regexps[i][0].test(type)) {
          result["type"] = regexps[i][1]
          break
        }
      }
    }
    if (!result["type"]) {
      result["type"] = /效果/.test(type) ? 1 : 2
    }
    result["imageUrl"] = `http://pine.me/ygo/${map["卡片密码"]}.png`
    result["cardCode"] = map["卡片密码"]
    result["name"] = map["中文名"]
    result["series"] = ""
    result["year"] = ""
    result["extra"] = {}
    return result
  }

  const ATTRIBUTE_MAP = { 炎: 1, 风: 2, 水: 3, 暗: 4, 地: 5, 光: 6 }

  function handleEffectText(text) {
    return text
      .split("\n")
      .map((line) => line.trim())
      .join("")
  }

  function handleMonsterTypes(map) {
    const race = map["种族"] + "族"
    return [race].concat(
      map["卡片种类"]
        .split(" ")
        .slice(1)
        .reverse()
    )
  }

  /**
   * 获取魔法、陷阱数据
   */
  function getSpellTrapData(map) {
    const extra = {}
    extra["effectText"] = handleEffectText(map["效果"])
    const checkMap = {
      通常: 0,
      反击: 1,
      永续: 2,
      装备: 3,
      场地: 4,
      速攻: 5,
      仪式: 6,
    }
    extra["type"] = 0
    const regexps = Object.keys(checkMap).map((str) => [
      new RegExp(str),
      checkMap[str],
    ])
    for (let i = 0; i < regexps.length; i++) {
      if (regexps[i][0].test(map["卡片种类"])) {
        extra["type"] = regexps[i][1]
        break
      }
    }
    return extra
  }

  /**
   * 获取效果怪兽数据
   */
  function getEffectMonsterData(map) {
    const extra = {}
    extra["level"] = +map["星级"]
    extra["attribute"] = ATTRIBUTE_MAP[map["属性"]]
    extra["atk"] = map["攻击力"]
    extra["def"] = map["防御力"]
    extra["effectText"] = handleEffectText(map["效果"])
    extra["types"] = handleMonsterTypes(map)
    return extra
  }

  /**
   * 获取带条件的怪兽数据
   */
  function getConditionMonsterData(map) {
    const extra = {}
    const [condition, ...rest] = map["效果"].split("\n")
    extra["level"] = +map["星级"]
    extra["attribute"] = ATTRIBUTE_MAP[map["属性"]]
    extra["atk"] = map["攻击力"]
    extra["def"] = map["防御力"]
    extra["effectText"] = handleEffectText(rest.join("\n"))
    extra["types"] = handleMonsterTypes(map)
    extra["condition"] = condition.trim()
    return extra
  }

  /**
   * 获取XYZ怪兽数据
   */
  function getXyzMonsterData(map) {
    const extra = getConditionMonsterData(map)
    delete extra["level"]
    extra["rank"] = map["阶级"]
    return extra
  }

  /**
   * 获取连接怪兽数据
   */
  function getLinkMonsterData(map) {
    const extra = getConditionMonsterData(map)
    extra["link"] = map["LINK"]
    // 方向
    const direction = []
    $(".linkMark")
      .children()
      .each((idx, el) => {
        if (/_on/.test(el.className)) {
          direction.push(el.className)
        }
      })
    extra["direction"] = direction
      .map((d) => +d.match(/\d/)[0])
      .map((dir) => {
        return {
          [1]: 7,
          [2]: 8,
          [3]: 9,
          [4]: 4,
          [6]: 6,
          [7]: 1,
          [8]: 2,
          [9]: 3,
        }[dir]
      })
    return extra
  }

  /**
   * 获取灵摆怪兽数据
   */
  function getPendulumMonsterData(map) {
    const extra = getEffectMonsterData(map)
    extra["pendulumEffectText"] = ""
    extra["scale"] = 0
    extra["size"] = "md"
    const type = map["卡片种类"]
    if (/XYZ/.test(type)) {
      extra["secondType"] = 8
    } else if (/融合/.test(type)) {
      extra["secondType"] = 3
    } else if (/同调/.test(type)) {
      extra["secondType"] = 7
    } else if (/通常/.test(type)) {
      extra["secondType"] = 2
    } else {
      extra["secondType"] = 1
    }
    return extra
  }
})()
