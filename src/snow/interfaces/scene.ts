import type { IRender } from './render'

export interface IScene extends IRender {
  setShouldSnow: (shouldSnow: boolean) => void
}
