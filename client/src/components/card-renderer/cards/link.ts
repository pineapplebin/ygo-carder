import { BaseMonsterCardTemplate } from './classes'
import { TCardType, IEffectCard } from '@/typings/card'

export class LinkCardTemplate extends BaseMonsterCardTemplate {
  $type = TCardType.LINK

  async render(card: IEffectCard) {
    this.drawBackground()
    this.drawCardName(card.name, { color: '#fff' })
    this.drawAttribute(card.attribute)
    this.drawCardImage(card)
    this.drawLevel(card.level)
    this.drawInformation(card)
  }
}
