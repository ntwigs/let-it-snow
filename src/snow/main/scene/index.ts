import { storageController } from '../../../storage'
import { config, type OptionValues } from '../../../storage/config'
import { Snowflake } from '../snowflake'
import { Timer } from '../../timer'
import type { IScene } from '../../interfaces/scene'

export class Scene implements IScene {
  private snowflakes: Snowflake[] = []
  private context: CanvasRenderingContext2D | null = null
  private options: Pick<OptionValues, 'size' | 'speed'> = {
    size: config.size.default as number,
    speed: config.speed.default as number,
  }
  private shouldSnow: boolean | null = null
  private timer: Timer = new Timer()

  constructor(context: CanvasRenderingContext2D) {
    this.setContext(context)
    this.setSettingsListener()
  }

  private setContext(context: CanvasRenderingContext2D) {
    this.context = context
  }

  private setSettingsListener(): void {
    this.setInitialOptions()
    storageController.onChange(this.setOptions.bind(this))
  }

  private async setInitialOptions(): Promise<void> {
    const { speed, size, amount } = await storageController.getValues([
      'amount',
      'speed',
      'size',
    ])

    this.options = {
      speed,
      size,
    }

    this.timer.setInterval(amount)
  }

  private setOptions(
    changes: Record<keyof OptionValues, chrome.storage.StorageChange>
  ): void {
    if ('amount' in changes) {
      const amount = changes.amount.newValue
      this.timer.setInterval(amount)
    }
    if ('speed' in changes) {
      const speed = changes.speed.newValue
      this.options.speed = speed
      this.updateExistingSnowflakes('speed', speed)
    }
    if ('size' in changes) {
      const size = changes.size.newValue
      this.options.size = size
      this.updateExistingSnowflakes('size', size)
    }
  }

  private updateExistingSnowflakes(
    type: keyof Pick<OptionValues, 'size' | 'speed'>,
    value: number
  ) {
    for (let i = 0; i < this.snowflakes.length; i++) {
      type === 'size'
        ? this.snowflakes[i].setSize(value)
        : this.snowflakes[i].setSpeed(value)
    }
  }

  public setShouldSnow(shouldSnow: boolean): void {
    this.shouldSnow = shouldSnow
  }

  render(now?: DOMHighResTimeStamp): void {
    if (!now) return

    if (this.timer.isTick(now) && this.shouldSnow) {
      this.addSnowflake()
    }
    this.removeInvisibleSnowflakes()

    for (let i = 0; i < this.snowflakes.length; i++) {
      this.snowflakes[i].render()
    }
  }

  private addSnowflake() {
    if (!this.context) return
    const snowflake = new Snowflake(
      this.context,
      window.innerWidth,
      this.options.speed,
      this.options.size
    )
    this.snowflakes.push(snowflake)
  }

  private removeInvisibleSnowflakes(): void {
    for (let i = 0; i < this.snowflakes.length; i++) {
      if (this.snowflakes[i].opacity <= 0) {
        this.snowflakes.splice(i, 1)
      }
    }
  }
}
