import type { ISnowflake } from '../../interfaces/snowflake'

export class Snowflake implements ISnowflake {
  private context: CanvasRenderingContext2D | null = null
  private speed: number = 0
  private size: number = 0
  private isRight: boolean = false
  private x: number = 0
  private y: number = -10
  private curve: number = 100
  public opacity: number = 0

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    speed: number,
    size: number
  ) {
    this.context = context
    this.setSpeed(speed)
    this.setSize(size)
    this.x = this.getX(width)
    this.opacity = this.getOpacity()
    this.isRight = this.getIsRight()
  }

  public setSpeed(speed: number): void {
    this.speed = speed
  }

  public setSize(size: number): void {
    const sizeFloor = size - 0.5
    this.size = Math.random() + sizeFloor
  }

  private getX(width: number): number {
    return Math.floor(Math.random() * width) + 1
  }

  private getOpacity(): number {
    return Math.random() * 1 + 0.25
  }

  private getIsRight(): boolean {
    return Math.random() > 0.5
  }

  render(): void {
    this.setOpacity()
    this.setNoise()
    this.setY()
    this.draw()
  }

  private setOpacity(): void {
    const isCloseToEdge = this.y > window.innerHeight * 0.7
    this.opacity -= isCloseToEdge ? 0.02 : 0.002
  }

  private setNoise(): void {
    if (this.isRight) {
      this.x -= this.getCurve()
    } else {
      this.x += this.getCurve()
    }

    this.curve += 0.01
  }

  private getCurve(): number {
    const CURVE_AMPLITUDE = 5
    return Math.sin(this.curve) / CURVE_AMPLITUDE
  }

  private setY(): void {
    this.y += this.speed
  }

  private draw(): void {
    if (!this.context) return

    this.context.fillStyle = 'rgba(245, 245, 255, ' + this.opacity + ')'
    this.context.beginPath()
    this.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    this.context.fill()
  }
}
