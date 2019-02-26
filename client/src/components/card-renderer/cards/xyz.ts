import { BaseMonsterCardTemplate } from './classes'
import { TCardType, IXyzMonsterCard } from '@/typings/card'

export class XyzCardTemplate extends BaseMonsterCardTemplate {
  $type = TCardType.XYZ

  async render(card: IXyzMonsterCard) {
    const {
      cardCode,
      name,
      series,
      extra: { attribute, rank, effectText, atk, def, condition, types },
    } = card

    this.drawBackground()
    this.drawCardName(name, { color: '#fff' })
    this.drawCardCode(cardCode, { color: '#fff' })
    this.drawSeries(series, { color: '#fff' })

    this.drawAttribute(attribute)
    this.drawCardImage(card)
    // this.drawLevel(level)
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
