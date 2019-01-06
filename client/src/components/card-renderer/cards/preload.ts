import pAttrFire from '../../../../assets/attribute-fire.png'
import pAttrWater from '../../../../assets/attribute-water.png'
import pAttrEarth from '../../../../assets/attribute-earth.png'
import pAttrWind from '../../../../assets/attribute-wind.png'
import pAttrDark from '../../../../assets/attribute-dark.png'
import pAttrLight from '../../../../assets/attribute-light.png'
import pLevel from '../../../../assets/level.png'
import pCardEffect from '../../../../assets/card-effect.png'

import { TCardType, TMonsterAttribute, TLevel } from '../types'

export const PRELOAD_IMAGE: Array<{ name: string; url: string }> = [
  // background
  { name: `bg-${TCardType.EFFECT}`, url: pCardEffect },
  // attribute
  { name: `attribute-${TMonsterAttribute.FIRE}`, url: pAttrFire },
  { name: `attribute-${TMonsterAttribute.WATER}`, url: pAttrWater },
  { name: `attribute-${TMonsterAttribute.EARTH}`, url: pAttrEarth },
  { name: `attribute-${TMonsterAttribute.WIND}`, url: pAttrWind },
  { name: `attribute-${TMonsterAttribute.DARK}`, url: pAttrDark },
  { name: `attribute-${TMonsterAttribute.LIGHT}`, url: pAttrLight },
  // level
  { name: `level-${TLevel.LEVEL}`, url: pLevel }
]
