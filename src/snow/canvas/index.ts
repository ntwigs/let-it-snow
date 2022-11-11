import { storageController } from '../../storage'
import { Options } from '../../storage/config'
import { Render } from '../render'
import { Scene } from '../scene'

export class Canvas implements Render {
  private scene: Scene | null = null
  private context: CanvasRenderingContext2D | null = null
  private canvasReference: HTMLCanvasElement | null = null

  constructor() {
    this.setSettingsListener()
  }

  initialize(): void {
    const canvas = this.getCanvas()
    this.canvasReference = canvas
    this.addCanvasToDom(canvas)
    this.addResizeListener(canvas)
    this.getContext(canvas)
    this.getScene()
    this.render()
  }

  remove(): void {
    if (this.canvasReference) {
      this.canvasReference.remove()
      this.canvasReference = null
      this.scene = null
      this.context = null
    }
  }

  async setSettingsListener(): Promise<void> {
    await this.setInitialSnowing()
    storageController.onChange(this.setSnowing.bind(this))
  }

  async setInitialSnowing(): Promise<void> {
    await storageController.seed()
    const { isActive } = await storageController.getValues(['isActive'])
    isActive && this.initialize()
  }

  setSnowing(changes: Record<Options, chrome.storage.StorageChange>): void {
    if ('isActive' in changes) {
      const isActive = changes.isActive.newValue
      isActive ? this.initialize() : this.remove()
    }
  }

  getCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.classList.add('extension-let-it-snow')
    return canvas
  }

  getContext(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d')
    this.context = context ? context : null
  }

  getScene(): void {
    if (!this.context) return
    const scene = new Scene()
    scene.setContext(this.context)
    this.scene = scene
  }

  addCanvasToDom(canvas: HTMLCanvasElement): void {
    document.body.insertAdjacentElement('afterend', canvas)
  }

  addResizeListener(canvas: HTMLCanvasElement): void {
    this.onResize(canvas)
    addEventListener('resize', () => {
      this.onResize(canvas)
    })
  }

  onResize(canvas: HTMLCanvasElement): void {
    canvas.width = innerWidth
    canvas.height = innerHeight
  }

  clear(): void {
    if (this.context) {
      this.context.clearRect(0, 0, innerWidth, innerHeight)
    }
  }

  render(now?: DOMHighResTimeStamp): void {
    this.clear()
    if (this.scene) {
      this.scene.render(now)
      requestAnimationFrame(this.render.bind(this))
    }
  }
}