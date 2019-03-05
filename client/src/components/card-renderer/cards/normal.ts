import { TCardType } from '@/typings/card'
import { EffectCardTemplate } from './effect'

export class NormalCardTemplate extends EffectCardTemplate {
  $type = TCardType.NORMAL
}
