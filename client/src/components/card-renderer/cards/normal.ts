import { BaseMonsterCardTemplate } from './classes'
import { TCardType, INormalMonsterCard } from '@/typings/card'

export class NormalCardTemplate extends BaseMonsterCardTemplate {
  $type = TCardType.NORMAL

  async render(card: INormalMonsterCard) {
    const {
      cardCode,
      name,
      series,
      extra: { attribute, level, descText, atk, def, types },
    } = card

    this.drawBackground()
    this.drawCardName(name)
    this.drawCardCode(cardCode)
    this.drawSeries(series)

    this.drawAttribute(attribute)
    this.drawCardImage(card)
    this.drawLevel(level)
    this.drawInformation(types)
    this.drawEffectText(descText, {
      width: 608,
      height: 133,
      x: 52,
      y: 806,
    })
    this.drawAtk(atk)
    this.drawDef(def)
  }
}
