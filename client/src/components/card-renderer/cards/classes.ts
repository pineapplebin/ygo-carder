import * as PIXI from 'pixi.js'
import {
  IBaseCard,
  TCardType,
  TMonsterAttribute,
  TLevel,
  TSpellTrapAttribute,
  TSpellTrapType,
} from '@/typings/card'
import { Loader } from '../tools/loader'
import { Sizer } from '../tools/sizer'
import { isHansChar, isSpecialChar, isHansPunctuation } from '../tools/util'

interface IDrawElementParam extends ISizeParam {
  name: string
  afterCreated?: (target: PIXI.Sprite) => void
  beforeAppend?: (target: PIXI.Sprite) => void
}

interface ISizeParam {
  x: number
  y: number
  width: number
  height: number
}

export abstract class BaseCardTemplate {
  abstract $type: TCardType

  constructor(
    public $loader: Loader,
    public $sizer: Sizer,
    public $app: PIXI.Application
  ) {}

  abstract async render(card: IBaseCard): Promise<void>

  /**
   * 获取卡名颜色配置
   */
  protected getCardNameColor(
    color: 'white' | 'red' | 'gold'
  ): PIXI.TextStyleOptions {
    switch (color) {
      case 'white': {
        return { fill: '#fff', stroke: '#fff' }
      }
      case 'red': {
        return {
          stroke: '#d31b1d',
          fill: ['#d31b1d', '#dd6052', '#d31b1d'],
          fillGradientStops: [0.1, 0.45, 0.6],
          fillGradientType: 1,
        }
      }
      case 'gold': {
        return {
          stroke: '#c4a222',
          fill: ['#e8d54f', '#c4a222', '#c5b540', '#e8d54f'],
          fillGradientStops: [0.1, 0.45, 0.5, 0.1],
          fillGradientType: 1,
        }
      }
      default: {
        return { fill: '#000', stroke: '#000' }
      }
    }
  }

  /**
   * 绘制元素
   */
  protected drawElement(params: IDrawElementParam) {
    const texture = PIXI.utils.TextureCache[params.name]
    if (!texture) {
      throw new Error(`texture name: ${params.name} can not found`)
    }
    const sprite = new PIXI.Sprite(texture)
    if (params.afterCreated) {
      params.afterCreated(sprite)
    }
    sprite.x = this.$sizer.fromPx(params.x)
    sprite.y = this.$sizer.fromPx(params.y)
    sprite.width = this.$sizer.fromPx(params.width)
    sprite.height = this.$sizer.fromPx(params.height)
    if (params.beforeAppend) {
      params.beforeAppend(sprite)
    }
    this.$app.stage.addChild(sprite)
  }

  /**
   * 绘制背景
   */
  protected drawBackground(type?: TCardType) {
    this.drawElement({
      name: `bg-${type || this.$type}`,
      x: 0,
      y: 0,
      width: 710,
      height: 1035,
    })
  }

  /**
   * 绘制卡名
   * @TODO 支持罕贵度卡名
   */
  protected drawCardName(name: string, options?: PIXI.TextStyleOptions) {
    const opt = options || { fill: '#000', stroke: '#000' }
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'YGOCN',
      fontSize: Math.floor(this.$sizer.fromPx(54)),
      strokeThickness: 0.5,
      letterSpacing: -1,
      lineJoin: 'round',
      ...opt,
    })
    const maxWidth = this.$sizer.fromPx(526)
    const text = new PIXI.Text(name, fontStyle)
    text.x = this.$sizer.fromPx(55)
    text.y = this.$sizer.fromPx(45)
    const measure = PIXI.TextMetrics.measureText(name, fontStyle)
    if (measure.width > maxWidth) {
      text.scale.x = maxWidth / measure.width
    }
    this.$app.stage.addChild(text)
  }

  /**
   * 绘制右上角属性
   * 包含魔法、陷阱
   */
  protected async drawAttribute(
    attribute: TMonsterAttribute | TSpellTrapAttribute
  ) {
    await this.drawElement({
      name: `attribute-${attribute}`,
      x: 592,
      y: 47,
      width: 65,
      height: 65,
    })
  }

  /**
   * 绘制卡图
   */
  protected async drawCardImage(card: IBaseCard, options?: ISizeParam) {
    const { x = 83, y = 188, width = 544, height = 544 } = options || {}
    const name = `card-${card.cardCode}`
    const textures = await this.$loader.loadTexture([
      { name, url: card.imageUrl },
    ])
    const sprite = new PIXI.Sprite(textures[name])
    sprite.x = this.$sizer.fromPx(x)
    sprite.y = this.$sizer.fromPx(y)
    sprite.width = this.$sizer.fromPx(width)
    sprite.height = this.$sizer.fromPx(height)
    this.$app.stage.addChild(sprite)
  }

  /**
   * 绘制卡片号码
   */
  protected async drawCardCode(cardCode: string, opt?: { color: string }) {
    if (!/^\d+$/.test(cardCode)) {
      return
    }
    const options = Object.assign({ color: '#000' }, opt || {})
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'Stone Serif',
      strokeThickness: 0,
      fill: options.color,
      fontSize: this.$sizer.fromPx(18),
    })
    const text = new PIXI.Text(cardCode, fontStyle)
    text.x = this.$sizer.fromPx(30)
    text.y = this.$sizer.fromPx(985)
    this.$app.stage.addChild(text)
  }

  /**
   * 绘制系列号码
   */
  protected async drawSeries(
    series: string,
    opt?: { x?: number; y?: number; color?: string; alignLeft?: boolean }
  ) {
    const options = Object.assign({ color: '#000', x: 633, y: 740 }, opt || {})
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'Stone Serif',
      strokeThickness: 0,
      fill: options.color,
      fontSize: this.$sizer.fromPx(20),
    })
    const text = new PIXI.Text(series, fontStyle)
    if (!options.alignLeft) {
      text.anchor.set(1, 0)
    }
    text.x = this.$sizer.fromPx(options.x)
    text.y = this.$sizer.fromPx(options.y)
    this.$app.stage.addChild(text)
  }

  /**
   * 绘制效果文本
   * 根据内容长度压缩大小
   * @deprecated
   */
  protected async drawEffectTextOld(effectText: string, size: ISizeParam) {
    const { width, height, x, y } = size
    let triedCount = 0
    let currentFontSize = 21
    let fontStyle = null
    const style = {
      fontFamily: 'YGOCN',
      strokeThickness: 0.2,
      stroke: '#000',
      breakWords: true,
      wordWrap: true,
      wordWrapWidth: this.$sizer.fromPx(width),
    }
    const maxHeight = this.$sizer.fromPx(height)
    const maxTry = 4
    while (triedCount++ < maxTry) {
      const minLineHeight = currentFontSize
      const lineHeight = currentFontSize + 3
      fontStyle = new PIXI.TextStyle({
        ...style,
        fontSize: Math.floor(this.$sizer.fromPx(currentFontSize)),
        lineHeight: Math.floor(this.$sizer.fromPx(lineHeight)),
      })
      // 测量尺寸
      const measure = PIXI.TextMetrics.measureText(effectText, fontStyle)
      if (measure.height <= maxHeight) {
        break
      }
      const delta = +(measure.height - maxHeight).toPrecision(10)
      const reversed = this.$sizer.reverseResult(delta)
      // 计算行高是否能压缩
      // 否则减少字号
      const lineHeightDelta = lineHeight - reversed / (measure.lines.length - 1)
      console.log(currentFontSize, lineHeightDelta)
      if (lineHeightDelta >= minLineHeight || triedCount >= maxTry) {
        fontStyle = new PIXI.TextStyle({
          ...style,
          fontSize: Math.floor(this.$sizer.fromPx(currentFontSize)),
          lineHeight: Math.floor(this.$sizer.fromPx(lineHeightDelta)),
        })
      } else {
        currentFontSize -= 2
      }
    }
    const text = new PIXI.Text(effectText, fontStyle)
    text.x = this.$sizer.fromPx(x)
    text.y = this.$sizer.fromPx(y)
    this.$app.stage.addChild(text)
  }

  /**
   * 绘制效果文本
   * 自动换行，且右边界对齐
   */
  protected drawEffectText(text: string, size: ISizeParam) {
    const parsedSize = {
      x: this.$sizer.fromPx(size.x),
      y: this.$sizer.fromPx(size.y),
      width: this.$sizer.fromPx(size.width),
      height: this.$sizer.fromPx(size.height),
    }

    // 测量高度
    // const graphics = new PIXI.Graphics()
    // graphics.beginFill(0x000)
    // graphics.drawRect(parsedSize.x, parsedSize.y, 1, parsedSize.height)
    // this.$app.stage.addChild(graphics)

    let currentFontSize = 21
    let halfFontSize = currentFontSize / 2
    const style = {
      fontFamily: 'YGOCN',
      strokeThickness: 0.2,
      stroke: '#000',
    }
    let isPass = false
    let lines = null
    while (!isPass) {
      lines = [{ content: '', isFull: false }]
      let currentLine = 0
      let lineWidth = 0
      for (let i = 0; i < text.length; i++) {
        if (text[i] === '\n') {
          lines[currentLine].isFull = false
          lines.push({ content: '', isFull: false })
          currentLine++
          lineWidth = 0
          continue
        }
        lines[currentLine].content += text[i]
        const currentCharCode = text.charCodeAt(i)
        if (isHansChar(currentCharCode) || isSpecialChar(currentCharCode)) {
          lineWidth += currentFontSize
        } else {
          lineWidth += halfFontSize
        }
        // 如果下个字符为标点时，不换行
        const nextChar = text[i + 1]
        if (nextChar && isHansPunctuation(text.charCodeAt(i + 1))) {
          continue
        }
        // 判断当前字符宽度
        if (lineWidth >= parsedSize.width - halfFontSize) {
          lines[currentLine].isFull = true
          // 如果后面仍有字符时
          if (i < text.length - 1) {
            lines.push({ content: '', isFull: false })
            currentLine++
            lineWidth = 0
          }
        }
      }
      // 检查高度是否超出
      const height = lines.length * currentFontSize * 1.1
      if (height <= size.height) {
        isPass = true
      } else {
        currentFontSize -= 1
        halfFontSize = currentFontSize / 2
      }
      // console.log(lines.map((line) => line.content), height, size.height)
    }
    // 切割分行
    // 渲染文本
    const textStyle = new PIXI.TextStyle({
      ...style,
      fontSize: this.$sizer.fromPx(currentFontSize),
    })
    lines.forEach((line, idx) => {
      const t = new PIXI.Text(line.content, textStyle)
      if (line.isFull) {
        t.width = parsedSize.width
      }
      t.x = parsedSize.x
      t.y = parsedSize.y + idx * this.$sizer.fromPx(currentFontSize * 1.1)
      this.$app.stage.addChild(t)
    })
  }

  /**
   * 绘制版权信息
   */
  protected drawCopyrightInfo(year: string, opt?: { color?: string }) {
    const options = { color: '#000', ...opt }
    this.drawElement({
      name: 'light-icon',
      width: 34,
      height: 34,
      x: 653,
      y: 978,
    })
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'Stone Serif',
      strokeThickness: 0,
      fill: options.color,
      fontSize: this.$sizer.fromPx(18),
    })
    const text = new PIXI.Text(`◎ ${year || ''} YU-GI-OH`, fontStyle)
    text.anchor.set(1, 0)
    text.x = this.$sizer.fromPx(640)
    text.y = this.$sizer.fromPx(985)
    this.$app.stage.addChild(text)
  }
}

export abstract class BaseMonsterCardTemplate extends BaseCardTemplate {
  /**
   * 绘制等级
   */
  protected async drawLevel(level: number) {
    const x = 598
    const y = 125
    for (let i = 0; i < level; i++) {
      this.drawElement({
        name: `level-${TLevel.LEVEL}`,
        x: x - i * 48,
        y,
        width: 45,
        height: 45,
      })
    }
  }

  /**
   * 绘制等阶
   */
  protected drawRank(rank: number) {
    const x = 67
    const y = 125
    for (let i = 0; i < rank; i++) {
      this.drawElement({
        name: `level-${TLevel.RANK}`,
        x: x + i * 48,
        y,
        width: 45,
        height: 45,
      })
    }
  }

  /**
   * 绘制卡牌信息（种族等）
   */
  protected async drawInformation(types: string[]) {
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'YGOCN',
      fontSize: Math.floor(this.$sizer.fromPx(26)),
      strokeThickness: 0.4,
      stroke: '#000',
    })
    const text = new PIXI.Text(`【${types.join('/')}】`, fontStyle)
    text.x = this.$sizer.fromPx(37)
    text.y = this.$sizer.fromPx(778)
    text.scale.set(1, 0.95)
    this.$app.stage.addChild(text)
  }

  /**
   * 绘制攻击力
   */
  protected async drawAtk(atk: string) {
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'MatrixBoldSmallCaps',
      strokeThickness: 0,
      stroke: '#000',
      fontSize: this.$sizer.fromPx(30),
    })
    const text = new PIXI.Text(atk, fontStyle)
    text.anchor.set(1, 0)
    text.x = this.$sizer.fromPx(507)
    text.y = this.$sizer.fromPx(948)
    this.$app.stage.addChild(text)
  }

  /**
   * 绘制防御力
   */
  protected async drawDef(def: string) {
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'MatrixBoldSmallCaps',
      strokeThickness: 0,
      stroke: '#000',
      fontSize: this.$sizer.fromPx(30),
    })
    const text = new PIXI.Text(def, fontStyle)
    text.anchor.set(1, 0)
    text.x = this.$sizer.fromPx(648)
    text.y = this.$sizer.fromPx(948)
    this.$app.stage.addChild(text)
  }

  /**
   * 绘制条件
   */
  protected async drawCondition(condition: string) {
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'YGOCN',
      strokeThickness: 0.2,
      stroke: '#000',
      fontSize: this.$sizer.fromPx(21),
    })
    const text = new PIXI.Text(condition, fontStyle)
    text.x = this.$sizer.fromPx(52)
    text.y = this.$sizer.fromPx(806)
    this.$app.stage.addChild(text)
  }
}

export abstract class SpellTrapCardTemplate extends BaseCardTemplate {
  /**
   * 绘制魔法、陷阱卡类型
   */
  protected drawType(card: TCardType, type: TSpellTrapType) {
    const textMap: { [props: string]: string } = {
      [TCardType.SPELL]: '魔法卡',
      [TCardType.TRAP]: '陷阱卡',
    }
    const str = `【${textMap[card]}${type ? '  ' : ''}】`
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'YGOCN',
      strokeThickness: 0,
      stroke: '#000',
      fontSize: this.$sizer.fromPx(38),
    })
    const text = new PIXI.Text(str, fontStyle)
    text.anchor.set(1, 0)
    text.x = this.$sizer.fromPx(660)
    text.y = this.$sizer.fromPx(125)
    this.$app.stage.addChild(text)
    if (type) {
      this.drawElement({
        name: `type-${type}`,
        x: 586,
        y: 130,
        width: 38,
        height: 37,
      })
    }
  }
}
