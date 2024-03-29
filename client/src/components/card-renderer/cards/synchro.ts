import { BaseMonsterCardTemplate } from './classes'
import { TCardType, ISynchroMonsterCard } from '@/typings/card'

export class SynchroCardTemplate extends BaseMonsterCardTemplate {
  $type = TCardType.SYNCHRO

  async render(card: ISynchroMonsterCard) {
    const {
      cardCode,
      name,
      series,
      year,
      extra: { attribute, level, effectText, atk, def, types, condition },
    } = card

    this.drawBackground()
    this.drawCardName(name)
    this.drawCardCode(cardCode)
    this.drawSeries(series)
    this.drawCopyrightInfo(year)

    this.drawAttribute(attribute)
    this.drawCardImage(card)
    this.drawLevel(level)
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
