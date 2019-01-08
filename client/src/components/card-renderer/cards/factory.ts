import * as PIXI from 'pixi.js'
import { BaseCardTemplate } from './classes'
import { TCardType } from '../types'
import { Loader } from '../tools/loader'
import { Sizer } from '../tools/sizer'
import { EffectCardTemplate } from './effect'
import { LinkCardTemplate } from './link'

interface IFactoryParam {
  type: TCardType
  $loader: Loader
  $sizer: Sizer
  $app: PIXI.Application
}

export function templateFactory(params: IFactoryParam): BaseCardTemplate {
  let instance = null
  const { type, $loader, $sizer, $app } = params
  switch (type) {
    case TCardType.EFFECT:
      instance = new EffectCardTemplate($loader, $sizer, $app)
      break
    case TCardType.LINK:
      instance = new LinkCardTemplate($loader, $sizer, $app)
      break
    default:
      throw new Error('unknown type: ' + type)
  }

  return instance
}
