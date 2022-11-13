import { Render } from '../render'
import { sizeController } from '../utils/size'

export class Snowflake implements Render {
  context: CanvasRenderingContext2D | null = null
  width: number = 0
  speed: number = 0
  size: number = 0
  isRight: boolean = false
  x: number = 0
  y: number = -10
  curve: number = 100
  opacity: number = 0

  constructor(context: CanvasRenderingContext2D, speed: number, size: number) {
    this.context = context
    this.width = sizeController.width
    this.setSpeed(speed)
    this.setSize(size)
    this.x = this.getX(sizeController.width)
    this.opacity = this.getOpacity()
    this.isRight = this.getIsRight()
  }

  setSpeed(speed: number): void {
    this.speed = speed
  }

  setSize(size: number): void {
    const sizeFloor = size - 0.5
    this.size = Math.random() + sizeFloor
  }

  getX(width: number) {
    return Math.floor(Math.random() * width) + 1
  }

  getOpacity(): number {
    return Math.random() * 1 + 0.25
  }

  getIsRight(): boolean {
    return Math.random() > 0.5
  }

  setNoise(): void {
    const CURVE_AMPLITUDE = 5

    if (this.isRight) {
      this.x -= Math.sin(this.curve) / CURVE_AMPLITUDE
    } else {
      this.x += Math.sin(this.curve) / CURVE_AMPLITUDE
    }

    this.curve += 0.01
  }

  draw(): void {
    if (!this.context) return

    this.context.fillStyle = 'rgba(245, 245, 255, ' + this.opacity + ')'
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    this.context.fill()
  }

  setOpacity(): void {
    this.opacity -= 0.002
  }

  setY() {
    this.y += this.speed
  }

  render(_now: DOMHighResTimeStamp): void {
    this.setOpacity()
    this.setNoise()
    this.setY()
    this.draw()
  }
}
