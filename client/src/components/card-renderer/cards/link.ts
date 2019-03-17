import { BaseMonsterCardTemplate } from './classes'
import { TCardType, ILinkMonsterCard } from '@/typings/card'

export class LinkCardTemplate extends BaseMonsterCardTemplate {
  $type = TCardType.LINK

  async render(card: ILinkMonsterCard) {
    const {
      cardCode,
      name,
      series,
      year,
      extra: { attribute, effectText, atk, link, types, condition, direction },
    } = card

    this.drawBackground()
    this.drawCardName(name, { color: '#fff' })
    this.drawCardCode(cardCode)
    this.drawSeries(series, { x: 585 })
    this.drawCopyrightInfo(year)

    this.drawAttribute(attribute)
    this.drawInformation(types)
    this.drawCondition(condition)
    this.drawEffectText(effectText, {
      width: 605,
      height: 108,
      x: 52,
      y: 830,
    })
    this.drawAtk(atk)
    this.drawLinkNumber(link)

    await this.drawCardImage(card)
    this.drawDirection(direction)
  }

  /**
   * 绘制连接方向
   */
  protected drawDirection(direction: number[]) {
    const isOnOff = (target: number) =>
      direction.indexOf(target) > -1 ? 'on' : 'off'

    // 正上
    this.drawElement({
      name: `link-mark-vertical-${isOnOff(2)}`,
      width: 122,
      height: 40,
      x: 355,
      y: 170,
      beforeAppend: (target) => {
        target.anchor.set(0.5, 0.5)
        target.rotation = Math.PI * 2 * 0.5
      },
    })
    // 正下
    this.drawElement({
      name: `link-mark-vertical-${isOnOff(8)}`,
      width: 122,
      height: 40,
      x: 355,
      y: 750,
      beforeAppend: (target) => {
        target.anchor.set(0.5, 0.5)
      },
    })
    // 正左
    this.drawElement({
      name: `link-mark-horizontal-${isOnOff(4)}`,
      width: 44,
      height: 121,
      x: 42,
      y: 398,
    })
    // 正右
    this.drawElement({
      name: `link-mark-horizontal-${isOnOff(6)}`,
      width: 44,
      height: 121,
      x: 626,
      y: 398,
      afterCreated: (target) => {
        target.anchor.set(0.5, 0.5)
        target.rotation = Math.PI * 2 * 0.5
        target.anchor.set(1, 1)
      },
    })
    // 左上
    this.drawElement({
      name: `link-mark-diagonal-${isOnOff(1)}`,
      width: 69,
      height: 69,
      x: 90,
      y: 195,
      beforeAppend: (target) => {
        target.anchor.set(0.5, 0.5)
        target.rotation = Math.PI * 2 * 0.25
      },
    })
    // 右上
    this.drawElement({
      name: `link-mark-diagonal-${isOnOff(3)}`,
      width: 69,
      height: 69,
      x: 622,
      y: 195,
      beforeAppend: (target) => {
        target.anchor.set(0.5, 0.5)
        target.rotation = Math.PI * 2 * 0.5
      },
    })
    // 左下
    this.drawElement({
      name: `link-mark-diagonal-${isOnOff(7)}`,
      width: 69,
      height: 69,
      x: 90,
      y: 725,
      beforeAppend: (target) => {
        target.anchor.set(0.5, 0.5)
        target.rotation = Math.PI * 2 * 1
      },
    })
    // 右下
    this.drawElement({
      name: `link-mark-diagonal-${isOnOff(9)}`,
      width: 69,
      height: 69,
      x: 622,
      y: 725,
      beforeAppend: (target) => {
        target.anchor.set(0.5, 0.5)
        target.rotation = Math.PI * 2 * -0.25
      },
    })
  }

  // 绘制连接数值
  protected drawLinkNumber(link: string) {
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'YGOLinkNumber',
      strokeThickness: 1,
      stroke: '#000',
      fontSize: this.$sizer.fromPx(29),
    })
    const text = new PIXI.Text(link, fontStyle)
    text.x = this.$sizer.fromPx(629)
    text.y = this.$sizer.fromPx(942)
    this.$app.stage.addChild(text)
  }
}
