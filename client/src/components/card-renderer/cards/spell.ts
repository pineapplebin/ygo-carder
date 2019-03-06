import { SpellTrapCardTemplate } from './classes'
import { TCardType, ISpellCard, TSpellTrapAttribute } from '@/typings/card'

export class SpellCardTemplate extends SpellTrapCardTemplate {
  $type = TCardType.SPELL

  async render(card: ISpellCard) {
    const {
      cardCode,
      name,
      series,
      year,
      extra: { effectText, type },
    } = card

    this.drawBackground()
    this.drawCardName(name, { color: '#fff' })
    this.drawCardCode(cardCode)
    this.drawSeries(series)
    this.drawCopyrightInfo(year)

    this.drawType(TCardType.SPELL, type)
    this.drawCardImage(card)
    this.drawAttribute(TSpellTrapAttribute.SPELL)
    this.drawEffectText(effectText, {
      width: 607,
      height: 195,
      x: 52,
      y: 778,
    })
  }
}
