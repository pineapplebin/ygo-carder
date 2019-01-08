import { BaseMonsterCardTemplate } from './classes'
import { TCardType, IEffectCard } from '../types'

export class EffectCardTemplate extends BaseMonsterCardTemplate {
  $type = TCardType.EFFECT

  async render(card: IEffectCard) {
    this.drawBackground()
    this.drawCardName(card.name)
    this.drawAttribute(card.attribute)
    this.drawCardImage(card)
    this.drawLevel(card.level)
    this.drawInformation(card)
  }
}
