import { BaseMonsterCardTemplate } from './classes'
import { TCardType, IEffectCard } from '@/typings/card'

export class EffectCardTemplate extends BaseMonsterCardTemplate {
  $type = TCardType.EFFECT

  async render(card: IEffectCard) {
    this.drawBackground()
    this.drawCardName(card.name)
    this.drawAttribute(card.attribute)
    this.drawCardImage(card)
    this.drawLevel(card.level)
    this.drawInformation(card)
    this.drawEffectText(card.effectText)
  }

  async drawEffectText(effectText: string) {
    const fontStyle = new PIXI.TextStyle({
      fontFamily: 'YGOCN',
      fontSize: Math.floor(this.$sizer.fromPx(24)),
      lineHeight: Math.floor(this.$sizer.fromPx(26)),
      strokeThickness: 0.2,
      stroke: '#000',
      breakWords: true,
      wordWrap: true,
      wordWrapWidth: this.$sizer.fromPx(610)
    })
    const text = new PIXI.Text(effectText, fontStyle)
    text.x = this.$sizer.fromPx(52)
    text.y = this.$sizer.fromPx(806)
    this.$app.stage.addChild(text)
  }
}
