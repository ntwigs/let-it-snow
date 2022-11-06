export class Timer {
  private previous: number = 0
  private interval: number | null = null

  setInterval(interval: number) {
    this.interval = interval
  }

  setInitialPrevious(now: DOMHighResTimeStamp) {
    if (!this.previous) {
      this.previous = now
    }
  }

  isTick(now: DOMHighResTimeStamp): boolean {
    if (this.interval === null) return false

    this.setInitialPrevious(now)
    const delta = now - this.previous

    const shouldTick = delta > this.interval
    if (shouldTick) this.previous = now
    return shouldTick
  }
}
