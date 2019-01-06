import { BaseUseCase } from './classes'

import pSampleImage from '../../assets/sample.png'
import {
  IBaseCard,
  IEffectCard,
  TCardType,
  TMonsterAttribute
} from '../components/card-renderer/types'

export class FetchCardCase extends BaseUseCase {
  getCard(cardCode: string): IBaseCard {
    return {
      cardCode,
      name: '宝玉兽 青玉飞马',
      type: TCardType.EFFECT,
      attribute: TMonsterAttribute.WIND,
      imageUrl: pSampleImage,
      level: 4
    } as IEffectCard
  }
}

const FetchCardCaseSingleton = new FetchCardCase()

export { FetchCardCaseSingleton }
