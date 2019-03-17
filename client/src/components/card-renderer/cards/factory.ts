import * as PIXI from 'pixi.js'
import { BaseCardTemplate } from './classes'
import { TCardType } from '@/typings/card'
import { Loader } from '../tools/loader'
import { Sizer } from '../tools/sizer'
import { EffectCardTemplate } from './effect'
import { LinkCardTemplate } from './link'
import { SpellCardTemplate } from './spell'
import { TrapCardTemplate } from './trap'
import { XyzCardTemplate } from './xyz'
import { NormalCardTemplate } from './normal'
import { RitualCardTemplate } from './ritual'
import { SynchroCardTemplate } from './synchro'
import { FusionCardTemplate } from './fusion'
import { PendulumCardTemplate } from './pendulum'

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
    case TCardType.NORMAL:
      instance = new NormalCardTemplate($loader, $sizer, $app)
      break
    case TCardType.RITUAL:
      instance = new RitualCardTemplate($loader, $sizer, $app)
      break
    case TCardType.FUSION:
      instance = new FusionCardTemplate($loader, $sizer, $app)
      break
    case TCardType.SYNCHRO:
      instance = new SynchroCardTemplate($loader, $sizer, $app)
      break
    case TCardType.XYZ:
      instance = new XyzCardTemplate($loader, $sizer, $app)
      break
    case TCardType.LINK:
      instance = new LinkCardTemplate($loader, $sizer, $app)
      break
    case TCardType.SPELL:
      instance = new SpellCardTemplate($loader, $sizer, $app)
      break
    case TCardType.TRAP:
      instance = new TrapCardTemplate($loader, $sizer, $app)
      break
    case TCardType.PENDULUM:
      instance = new PendulumCardTemplate($loader, $sizer, $app)
      break
    default:
      throw new Error('unknown type: ' + type)
  }

  return instance
}
