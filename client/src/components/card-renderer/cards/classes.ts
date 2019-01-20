import * as PIXI from 'pixi.js'
import {
  IBaseCard,
  TCardType,
  TMonsterAttribute,
  TLevel,
  IEffectCard
} from '../types'
import { Loader } from '../tools/loader'
import { Sizer } from '../tools/sizer'

interface IDrawElementParam {
  name: string
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
      height: 1035
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
      letterSpacing: -1
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
  protected async drawAttribute(attribute: TMonsterAttribute) {
    await this.drawElement({
      name: `attribute-${attribute}`,
      x: 592,
      y: 47,
      width: 65,
      height: 65
    })
  }

  /**
   * 绘制卡图
   */
  protected async drawCardImage(card: IBaseCard) {
    const name = `card-${card.cardCode}`
    const textures = await this.$loader.loadTexture([
      { name, url: card.imageUrl }
    ])
    const sprite = new PIXI.Sprite(textures[name])
    sprite.x = this.$sizer.fromPx(83)
    sprite.y = this.$sizer.fromPx(188)
    sprite.width = this.$sizer.fromPx(544)
    sprite.height = this.$sizer.fromPx(544)
    this.$app.stage.addChild(sprite)
  }
}

export abstract class BaseMonsterCardTemplate extends BaseCardTemplate {
  /**
   * 绘制等级
   */
  protected async drawLevel(level: number) {
    const x = 595
    const y = 125
    for (let i = 0; i < level; i++) {
      this.drawElement({
        name: `level-${TLevel.LEVEL}`,
        x: x - i * 48,
        y,
        width: 45,
        height: 45
      })
    }
  }

  /**
   * 绘制卡牌信息（种族等）
   */
  protected async drawInformation(card: IEffectCard) {
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'YGOCN',
      fontSize: Math.floor(this.$sizer.fromPx(26)),
      strokeThickness: 0.4,
      stroke: '#000'
    })
    const text = new PIXI.Text('【兽族/效果】', fontStyle)
    text.x = this.$sizer.fromPx(37)
    text.y = this.$sizer.fromPx(778)
    this.$app.stage.addChild(text)
  }
}
