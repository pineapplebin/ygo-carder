import { SpellTrapCardTemplate } from './classes'
import { TCardType, ISpellCard, TSpellTrapAttribute } from '@/typings/card'

export class TrapCardTemplate extends SpellTrapCardTemplate {
  $type = TCardType.TRAP

  async render(card: ISpellCard) {
    const {
      cardCode,
      name,
      series,
      year,
      extra: { effectText, type },
    } = card

    this.drawBackground()
    this.drawCardName(name, this.getCardNameColor('white'))
    this.drawCardCode(cardCode)
    this.drawSeries(series)
    this.drawCopyrightInfo(year)

    this.drawType(TCardType.TRAP, type)
    this.drawCardImage(card)
    this.drawAttribute(TSpellTrapAttribute.TRAP)
    this.drawEffectText(effectText, {
      width: 605,
      height: 195,
      x: 52,
      y: 778,
    })
  }
}
