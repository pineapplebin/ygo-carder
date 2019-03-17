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

export enum TSpellTrapAttribute {
  SPELL = 10,
  TRAP,
}

export enum TLevel {
  LEVEL = 1,
  RANK,
}

export enum TSpellTrapType {
  NONE = 0,
  COUNTER,
  CONTINUOUS,
  EQUIPMENT,
  FIELD,
  QUICK_PLAY,
  RITUAL,
}

export enum TPendulumSize {
  LARGE = 'lg',
  MIDDLE = 'md',
  SMALL = 'sm',
}

export interface IBaseCard {
  imageUrl: string
  cardCode: string
  name: string
  type: TCardType
  extra: any
  series: string
  year: string
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

export interface IRitualMonsterCard extends IEffectMonsterCard {}

export interface ISynchroMonsterCard extends IBaseCard {
  extra: {
    level: number
    attribute: TMonsterAttribute
    effectText: string
    atk: string
    def: string
    types: string[]
    condition: string
  }
}

export interface INormalMonsterCard extends IBaseCard {
  extra: {
    level: number
    attribute: TMonsterAttribute
    descText: string
    atk: string
    def: string
    types: string[]
  }
}

export interface IXyzMonsterCard extends IBaseCard {
  extra: {
    rank: number
    attribute: TMonsterAttribute
    effectText: string
    atk: string
    def: string
    types: string[]
    condition: string
  }
}

export interface ISpellCard extends IBaseCard {
  extra: {
    type: TSpellTrapType
    effectText: string
  }
}

export interface ILinkMonsterCard extends IBaseCard {
  extra: {
    effectText: string
    attribute: TMonsterAttribute
    atk: string
    link: string
    types: string[]
    condition: string
    direction: number[]
  }
}

export interface IPendulumMonsterCard extends IBaseCard {
  extra: {
    level: number
    attribute: number
    types: string[]
    atk: string
    def: string
    size: TPendulumSize
    secondType: TCardType
    scale: string
    effectText: string
    pendulumEffectText: string
  }
}
