import { BaseMonsterCardTemplate } from './classes'
import { TCardType, IXyzMonsterCard, TLevel } from '@/typings/card'

export class XyzCardTemplate extends BaseMonsterCardTemplate {
  $type = TCardType.XYZ

  async render(card: IXyzMonsterCard) {
    const {
      cardCode,
      name,
      series,
      year,
      extra: { attribute, rank, effectText, atk, def, condition, types },
      style,
    } = card

    this.drawBackground()
    this.drawCardName(
      name,
      this.getCardNameColor(style?.cardNameColor || 'white')
    )
    this.drawCardCode(cardCode, { color: '#fff' })
    this.drawSeries(series, { color: '#fff' })
    this.drawCopyrightInfo(year, { color: '#fff' })

    this.drawAttribute(attribute)
    this.drawCardImage(card)
    this.drawRank(rank)
    this.drawInformation(types)
    this.drawCondition(condition)
    this.drawEffectText(effectText, {
      width: 605,
      height: 108,
      x: 52,
      y: 830,
    })
    this.drawAtk(atk)
    this.drawDef(def)
  }
}
