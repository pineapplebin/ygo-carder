import { BaseMonsterCardTemplate } from './classes'
import { TCardType, IEffectMonsterCard } from '@/typings/card'

export class EffectCardTemplate extends BaseMonsterCardTemplate {
  $type = TCardType.EFFECT

  async render(card: IEffectMonsterCard) {
    const {
      cardCode,
      name,
      series,
      extra: { attribute, level, effectText, atk, def },
    } = card

    this.drawBackground()
    this.drawCardName(name)
    this.drawCardCode(cardCode)
    this.drawSeries(series)

    this.drawAttribute(attribute)
    this.drawCardImage(card)
    this.drawLevel(level)
    this.drawInformation(card)
    this.drawEffectText(effectText)
    this.drawAtk(atk)
    this.drawDef(def)
  }
}
