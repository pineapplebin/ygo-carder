import { BaseMonsterCardTemplate } from './classes'
import { TCardType, IEffectMonsterCard } from '@/typings/card'

export class EffectCardTemplate extends BaseMonsterCardTemplate {
  $type = TCardType.EFFECT

  async render(card: IEffectMonsterCard) {
    const {
      cardCode,
      name,
      series,
      extra: { attribute, level, effectText, atk, def, types },
    } = card

    this.drawBackground()
    this.drawCardName(name)
    this.drawCardCode(cardCode)
    this.drawSeries(series)

    this.drawAttribute(attribute)
    this.drawCardImage(card)
    this.drawLevel(level)
    this.drawInformation(types)
    this.drawEffectText(effectText, {
      width: 608,
      height: 133,
      x: 52,
      y: 806,
    })
    this.drawAtk(atk)
    this.drawDef(def)
  }
}
