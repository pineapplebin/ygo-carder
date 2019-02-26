import * as PIXI from 'pixi.js'
import {
  IBaseCard,
  TCardType,
  TMonsterAttribute,
  TLevel,
  IEffectMonsterCard,
  TSpellTrapAttribute,
  TSpellTrapType,
} from '@/typings/card'
import { Loader } from '../tools/loader'
import { Sizer } from '../tools/sizer'

interface IDrawElementParam extends ISizeParam {
  name: string
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
   * 绘制元素
   */
  protected drawElement(params: IDrawElementParam) {
    const texture = PIXI.utils.TextureCache[params.name]
    if (!texture) {
      throw new Error(`texture name: ${params.name} can not found`)
    }
    const sprite = new PIXI.Sprite(texture)
    sprite.x = this.$sizer.fromPx(params.x)
    sprite.y = this.$sizer.fromPx(params.y)
    sprite.width = this.$sizer.fromPx(params.width)
    sprite.height = this.$sizer.fromPx(params.height)
    this.$app.stage.addChild(sprite)
  }

  /**
   * 绘制背景
   */
  protected drawBackground() {
    this.drawElement({
      name: `bg-${this.$type}`,
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
  protected drawCardName(name: string, options?: { color?: string }) {
    const opt = Object.assign({ color: '#000' }, options)
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'YGOCN',
      fontSize: Math.floor(this.$sizer.fromPx(48)),
      strokeThickness: 0.5,
      stroke: opt.color,
      fill: opt.color,
      letterSpacing: -1,
    })
    const maxWidth = this.$sizer.fromPx(526)
    const text = new PIXI.Text(name, fontStyle)
    text.x = this.$sizer.fromPx(55)
    text.y = this.$sizer.fromPx(50)
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
  protected async drawCardImage(card: IBaseCard) {
    const name = `card-${card.cardCode}`
    const textures = await this.$loader.loadTexture([
      { name, url: card.imageUrl },
    ])
    const sprite = new PIXI.Sprite(textures[name])
    sprite.x = this.$sizer.fromPx(83)
    sprite.y = this.$sizer.fromPx(188)
    sprite.width = this.$sizer.fromPx(544)
    sprite.height = this.$sizer.fromPx(544)
    this.$app.stage.addChild(sprite)
  }

  /**
   * 绘制卡片号码
   */
  protected async drawCardCode(cardCode: string, opt?: { color: string }) {
    const options = Object.assign({color: '#000'}, opt || {})
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
  protected async drawSeries(series: string, opt?: { color: string }) {
    const options = Object.assign({ color: '#000' }, opt || {})
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'Stone Serif',
      strokeThickness: 0,
      fill: options.color,
      fontSize: this.$sizer.fromPx(20),
    })
    const text = new PIXI.Text(series, fontStyle)
    text.anchor.set(1, 0)
    text.x = this.$sizer.fromPx(633)
    text.y = this.$sizer.fromPx(740)
    this.$app.stage.addChild(text)
  }

  /**
   * 绘制效果文本
   * 根据内容长度压缩大小
   */
  protected async drawEffectText(effectText: string, size: ISizeParam) {
    const { width, height, x, y } = size
    let triedCount = 0
    let currentFontSize = 22
    let fontStyle = null
    const style = {
      fontFamily: 'YGOCN',
      strokeThickness: 0.2,
      stroke: '#000',
      breakWords: true,
      wordWrap: true,
      wordWrapWidth: this.$sizer.fromPx(width),
    }
    const minLineHeight = 22
    const maxHeight = this.$sizer.fromPx(height)
    const maxTry = 4
    while (triedCount++ < maxTry) {
      const lineHeight = 25
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
    text.x = this.$sizer.fromPx(647)
    text.y = this.$sizer.fromPx(948)
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
