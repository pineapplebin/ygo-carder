import * as PIXI from 'pixi.js'
import { BaseMonsterCardTemplate } from './classes'
import { IPendulumMonsterCard, TCardType, TPendulumSize } from '@/typings/card'

export class PendulumCardTemplate extends BaseMonsterCardTemplate {
  $type = TCardType.PENDULUM

  async render(card: IPendulumMonsterCard) {
    const {
      cardCode,
      name,
      series,
      year,
      extra: {
        scale,
        attribute,
        level,
        types,
        atk,
        def,
        secondType,
        size,
        effectText,
        pendulumEffectText,
      },
    } = card

    this.drawBackground(secondType)
    await this.drawPendulumCardImage(size, card)
    this.drawPendulumBackground(size)

    this.drawCardName(name)
    this.drawCardCode(cardCode)
    this.drawAtk(atk)
    this.drawDef(def)
    this.drawSeries(series, { x: 56, y: 944, alignLeft: true })
    this.drawCopyrightInfo(year)

    this.drawAttribute(attribute)
    this.drawLevel(level)
    this.drawInformation(types)

    this.drawPendulumScale(size, scale)

    this.drawMonsterEffectText(size, effectText)
    this.drawPendulumEffectText(size, pendulumEffectText)
  }

  /**
   * 绘制灵摆卡框
   */
  async drawPendulumBackground(size: TPendulumSize) {
    await this.drawElement({
      name: `pendulum-background-${size}`,
      x: 0,
      y: 0,
      width: 710,
      height: 1035,
    })
  }

  /**
   * 绘制卡图
   */
  async drawPendulumCardImage(size: TPendulumSize, card: IPendulumMonsterCard) {
    const options =
      size === 'sm'
        ? { x: 44, y: 183, width: 620, height: 460 }
        : { x: 44, y: 183, width: 620, height: 460 }
    await this.drawCardImage(card, options)
  }

  /**
   * 绘制怪兽效果
   */
  async drawMonsterEffectText(size: TPendulumSize, effectText: string) {
    const options = {
      [TPendulumSize.LARGE]: { y: 806, height: 133 },
      [TPendulumSize.MIDDLE]: { y: 806, height: 133 },
      [TPendulumSize.SMALL]: { y: 806, height: 133 },
    }
    this.drawEffectText(effectText, {
      width: 605,
      x: 52,
      ...options[size],
    })
  }

  /**
   * 绘制灵摆效果
   */
  async drawPendulumEffectText(size: TPendulumSize, effectText: string) {
    this.drawEffectText(effectText, {
      x: 108,
      y: 652,
      width: 493,
      height: 109,
    })
  }

  async drawPendulumScale(size: TPendulumSize, scale: string) {
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'MatrixBoldSmallCaps',
      strokeThickness: 0,
      stroke: '#000',
      fontSize: this.$sizer.fromPx(48),
    })
    const left = new PIXI.Text(scale, fontStyle)
    left.x = this.$sizer.fromPx(60)
    left.y = this.$sizer.fromPx(710)
    const right = new PIXI.Text(scale, fontStyle)
    right.x = this.$sizer.fromPx(626)
    right.y = this.$sizer.fromPx(710)

    this.$app.stage.addChild(left)
    this.$app.stage.addChild(right)
  }
}
