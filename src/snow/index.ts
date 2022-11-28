import { Canvas } from './main/canvas'
import { LET_IT_SNOW_CLASS } from './main/canvas/selectors'

const hasCanvas = () => {
  const canvas = document.querySelector(`.${LET_IT_SNOW_CLASS}`)
  return !!canvas
}

const snow = () => {
  if (hasCanvas()) return
  new Canvas()
}

snow()
