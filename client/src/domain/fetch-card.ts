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
      imageUrl: '/' + pSampleImage,
      // @ts-ignore
      effectText: `①：这张卡召唤·反转召唤·特殊召唤成功时才能发动。从自己的手卡·卡组·墓地选1只「宝玉兽」怪兽当作永续魔法卡使用在自己的魔法与陷阱区域表侧表示放置。②：表侧表示的这张卡在怪兽区域被破坏的场合，可以不送去墓地当作永续魔法卡使用在自己的魔法与陷阱区域表侧表示放置。`,
      level: 4
    } as IEffectCard
  }
}

const FetchCardCaseSingleton = new FetchCardCase()

export { FetchCardCaseSingleton }
