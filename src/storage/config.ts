export type Options = 'speed' | 'amount' | 'size' | 'isActive'

export type OptionValues = {
  speed: number
  amount: number
  size: number
  isActive: boolean
}

type NumberValue = {
  min: number
  max: number
  default: number
}

type BooleanValue = {
  default: boolean
}

type Config = Record<Options, NumberValue | BooleanValue>

export const config: Config = {
  amount: {
    min: 0.01,
    max: 1000,
    default: 212,
  },
  size: {
    min: 2,
    max: 10,
    default: 2,
  },
  speed: {
    min: 0.1,
    max: 8,
    default: 0.13,
  },
  isActive: {
    default: true,
  },
}
