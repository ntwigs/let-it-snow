import { Render } from '../render'
import { Snowflake } from '../snowflake'
import { Timer } from '../timer'

type Options = {
  speed: number
  size: number
}

export class Scene implements Render {
  private snowflakes: Snowflake[] = []
  private context: CanvasRenderingContext2D | null = null
  private options: Options = {
    size: 0,
    speed: 0,
  }
  private timer: Timer = new Timer()

  constructor() {
    this.setSettingsListener()
  }

  setContext(context: CanvasRenderingContext2D) {
    this.context = context
  }

  addSnowflake() {
    if (!this.context) return
    const snowflake = new Snowflake(
      this.context,
      window.innerWidth,
      this.options.speed,
      this.options.size
    )
    this.snowflakes.push(snowflake)
  }

  removeInvisibleSnowflakes(): void {
    for (let i = 0; i < this.snowflakes.length; i++) {
      if (this.snowflakes[i].opacity <= 0) {
        this.snowflakes.splice(i, 1)
      }
    }
  }

  setSettingsListener(): void {
    this.setInitialOptions()
    chrome.storage.onChanged.addListener(this.setOptions.bind(this))
  }

  setInitialOptions(): void {
    chrome.storage.local.get(
      ['amount', 'speed', 'size'],
      ({ amount, speed, size }) => {
        this.options = {
          speed,
          size,
        }
        this.timer.setInterval(amount)
      }
    )
  }

  setOptions(changes: Record<string, chrome.storage.StorageChange>): void {
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

  updateExistingSnowflakes(type: 'size' | 'speed', value: number) {
    this.snowflakes.forEach((snowflake) => {
      if (type === 'size') {
        snowflake.setSize(value)
      }

      if (type === 'speed') {
        snowflake.setSpeed(value)
      }
    })
  }

  render(now?: DOMHighResTimeStamp): void {
    if (!now) return

    if (this.timer.isTick(now)) {
      this.addSnowflake()
    }
    this.removeInvisibleSnowflakes()
    this.snowflakes.forEach((snowflake) => snowflake.render(now))
  }
}
