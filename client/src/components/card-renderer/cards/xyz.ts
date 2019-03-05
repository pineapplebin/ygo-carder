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
    } = card

    this.drawBackground()
    this.drawCardName(name, { color: '#fff' })
    this.drawCardCode(cardCode, { color: '#fff' })
    this.drawSeries(series, { color: '#fff' })
    this.drawCopyrightInfo(year, { color: '#fff' })

    this.drawAttribute(attribute)
    this.drawCardImage(card)
    this.drawRank(rank)
    this.drawInformation(types)
    this.drawCondition(condition)
    this.drawEffectText(effectText, {
      width: 608,
      height: 108,
      x: 52,
      y: 830,
    })
    this.drawAtk(atk)
    this.drawDef(def)
  }

  private drawRank(rank: number) {
    const x = 67
    const y = 125
    for (let i = 0; i < rank; i++) {
      this.drawElement({
        name: `level-${TLevel.RANK}`,
        x: x + i * 48,
        y,
        width: 45,
        height: 45,
      })
    }
  }
}
