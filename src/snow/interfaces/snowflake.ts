import type { IRender } from './render'

export interface ISnowflake extends IRender {
  opacity: number
  setSpeed: (speed: number) => void
  setSize: (size: number) => void
}
