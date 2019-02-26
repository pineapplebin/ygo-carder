import pAttrFire from '../../../../assets/attribute-fire.png'
import pAttrWater from '../../../../assets/attribute-water.png'
import pAttrEarth from '../../../../assets/attribute-earth.png'
import pAttrWind from '../../../../assets/attribute-wind.png'
import pAttrDark from '../../../../assets/attribute-dark.png'
import pAttrLight from '../../../../assets/attribute-light.png'
import pAttrSpell from '../../../../assets/attribute-spell.png'
import pAttrTrap from '../../../../assets/attribute-trap.png'

import pLevel from '../../../../assets/level.png'

import pCardEffect from '../../../../assets/card-effect.png'
import pCardLink from '../../../../assets/card-link.png'
import pCardSpell from '../../../../assets/card-spell.png'
import pCardTrap from '../../../../assets/card-trap.png'

import pTypeCounter from '../../../../assets/type-counter.png'
import pTypeContinuous from '../../../../assets/type-continuous.png'
import pTypeField from '../../../../assets/type-field.png'
import pTypeQuickPlay from '../../../../assets/type-quickplay.png'
import pTypeRitual from '../../../../assets/type-ritual.png'
import pTypeEquipment from '../../../../assets/type-equipment.png'

import {
  TCardType,
  TMonsterAttribute,
  TLevel,
  TSpellTrapAttribute,
  TSpellTrapType,
} from '@/typings/card'

export const PRELOAD_IMAGE: Array<{ name: string; url: string }> = [
  // background
  { name: `bg-${TCardType.EFFECT}`, url: pCardEffect },
  { name: `bg-${TCardType.LINK}`, url: pCardLink },
  { name: `bg-${TCardType.SPELL}`, url: pCardSpell },
  { name: `bg-${TCardType.TRAP}`, url: pCardTrap },
  // attribute
  { name: `attribute-${TMonsterAttribute.FIRE}`, url: pAttrFire },
  { name: `attribute-${TMonsterAttribute.WATER}`, url: pAttrWater },
  { name: `attribute-${TMonsterAttribute.EARTH}`, url: pAttrEarth },
  { name: `attribute-${TMonsterAttribute.WIND}`, url: pAttrWind },
  { name: `attribute-${TMonsterAttribute.DARK}`, url: pAttrDark },
  { name: `attribute-${TMonsterAttribute.LIGHT}`, url: pAttrLight },
  { name: `attribute-${TSpellTrapAttribute.SPELL}`, url: pAttrSpell },
  { name: `attribute-${TSpellTrapAttribute.TRAP}`, url: pAttrTrap },
  // spell & trap type
  { name: `type-${TSpellTrapType.COUNTER}`, url: pTypeCounter },
  { name: `type-${TSpellTrapType.CONTINUOUS}`, url: pTypeContinuous },
  { name: `type-${TSpellTrapType.FIELD}`, url: pTypeField },
  { name: `type-${TSpellTrapType.QUICK_PLAY}`, url: pTypeQuickPlay },
  { name: `type-${TSpellTrapType.RITUAL}`, url: pTypeRitual },
  { name: `type-${TSpellTrapType.EQUIPMENT}`, url: pTypeEquipment },
  // level
  { name: `level-${TLevel.LEVEL}`, url: pLevel },
]
