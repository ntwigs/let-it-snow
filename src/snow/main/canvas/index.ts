import { storageController } from '../../../storage'
import { Options } from '../../../storage/config'
import type { IRender } from '../../interfaces/render'
import { Scene } from '../scene'

export class Canvas implements IRender {
  private scene: Scene | null = null
  private context: CanvasRenderingContext2D | null = null
  private canvasReference: HTMLCanvasElement | null = null

  constructor() {
    this.setSettingsListener()
  }

  private async setSettingsListener(): Promise<void> {
    await this.setInitialSnowing()
    storageController.onChange(this.setSnowing.bind(this))
  }

  private async setInitialSnowing(): Promise<void> {
    await storageController.seed()
    const { isActive } = await storageController.getValues(['isActive'])
    isActive && this.initialize()
  }

  private setSnowing(
    changes: Record<Options, chrome.storage.StorageChange>
  ): void {
    if ('isActive' in changes) {
      const isActive = changes.isActive.newValue
      isActive ? this.initialize() : this.remove()
    }
  }

  private initialize(): void {
    if (!this.canvasReference) {
      const canvas = this.getCanvas()
      this.canvasReference = canvas
      this.addCanvasToDom(canvas)
      this.addResizeListener(canvas)
      this.getContext(canvas)
      this.getScene()
      this.render()
    }
    if (this.scene) {
      this.scene?.setShouldSnow(true)
    }
  }

  private remove(): void {
    if (this.scene) {
      this.scene.setShouldSnow(false)
    }
  }

  private getCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.classList.add('extension-let-it-snow')
    return canvas
  }

  private addCanvasToDom(canvas: HTMLCanvasElement): void {
    document.body.insertAdjacentElement('afterend', canvas)
  }

  private addResizeListener(canvas: HTMLCanvasElement): void {
    this.onResize(canvas)
    addEventListener('resize', () => {
      this.onResize(canvas)
    })
  }

  private onResize(canvas: HTMLCanvasElement): void {
    canvas.width = innerWidth
    canvas.height = innerHeight
  }

  private getContext(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d')
    this.context = context ? context : null
  }

  private getScene(): void {
    if (!this.context) return
    const scene = new Scene(this.context)
    this.scene = scene
  }

  render(now?: DOMHighResTimeStamp): void {
    this.clear()
    if (this.scene) {
      this.scene.render(now)
      requestAnimationFrame(this.render.bind(this))
    }
  }

  private clear(): void {
    if (this.context) {
      this.context.clearRect(0, 0, innerWidth, innerHeight)
    }
  }
}
