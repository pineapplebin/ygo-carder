import pSampleImage from '../../assets/sample.png'
import {
  IBaseCard,
  IEffectMonsterCard,
  TCardType,
  TMonsterAttribute,
} from '@/typings/card'
import { request, IServerResponse } from './request'

interface IMock {
  list: IBaseCard[]
}

export async function getCardList(): Promise<IBaseCard[]> {
  const res = await request<IServerResponse<IMock>>({
    url: '/api/lightsworn.json',
  })
  return res.data.list

  // return [
  //   {
  //     cardCode: '',
  //     name: '宝玉兽 青玉飞马',
  //     type: TCardType.EFFECT,
  //     imageUrl: '/' + pSampleImage,
  //     series: '',
  //     extra: {
  //       attribute: TMonsterAttribute.WIND,
  //       tslint:disable
  //       effectText: `①：这张卡召唤·反转召唤·特殊召唤成功时才能发动。从自己的手卡·卡组·墓地选1只「宝玉兽」怪兽当作永续魔法卡使用在自己的魔法与陷阱区域表侧表示放置。②：表侧表示的这张卡在怪兽区域被破坏的场合，可以不送去墓地当作永续魔法卡使用在自己的魔法与陷阱区域表侧表示放置。`,
  //       level: 4,
  //       types: ['兽族', '效果'],
  //     },
  //   },
  // ]
}
