export enum TCardType {
  EFFECT = 1, // 效果
  NORMAL, // 通常
  FUSION, // 融合
  RITUAL, // 仪式
  SPELL, // 魔法
  TRAP, // 陷阱
  SYNCHRO, // 同调
  XYZ, // 超量
  LINK, // 链接
  PENDULUM, // 灵摆
}

export enum TMonsterAttribute {
  FIRE = 1,
  WIND,
  WATER,
  DARK,
  EARTH,
  LIGHT,
}

export enum TLevel {
  LEVEL = 1,
}

export interface IBaseCard {
  imageUrl: string
  cardCode: string
  name: string
  type: TCardType
  extra: any
  series: string
}

export interface IEffectMonsterCard extends IBaseCard {
  extra: {
    level: number
    attribute: TMonsterAttribute
    effectText: string
    atk: string
    def: string
    types: string[]
  }
}
