class Inject {
	constructor() {
		this.tabInFocus = null
		this.toggleFocus = true
		this.amountValue = 250
		this.sizeValue = 0.15
		this.speedValue = 0.35
		this.canvas = null
		this.stop = null

		chrome.extension.sendMessage({}, response => {
			const readyStateCheckInterval = setInterval(() => {
			if (document.readyState === 'complete') {
				clearInterval(readyStateCheckInterval)
				chrome.storage.onChanged.addListener((isToggeling) => {
					this.stopFlakes()
					if (this.stop) {
						this.setUserValues()
					}
					if (isToggeling.snowToggle) {
						this.checkIfTurnOffSnow()
					}
				})
				this.checkIfTurnOffSnow()
			}
			}, 10)
		})
	}

	checkIfTurnOffSnow() {
		chrome.storage.sync.get('snowToggle', onOff => {
			this.stop = onOff.snowToggle

			if (this.stop) {
				if (!this.canvas) {
					this.createCanvas()
				}
				this.setUserValues()
			} else {
				this.stopFlakes()
			}
		})
	}

	setUserValues() {
		chrome.storage.sync.get('options', option => {
			if (option.options !== undefined) {
				this.amountValue = (1000 - (option.options.amount))
				this.sizeValue = (option.options.size / 10)
				this.speedValue = (option.options.speed / 100)
			}
			this.correctTabListener()
		})
	}

	createCanvas() {
		this.canvas = new CanvasHandler()
		this.canvas.initialize()
	}

	correctTabListener() {
		this.generateFlakes()
		window.addEventListener('visibilitychange', this.checkFocusAndGenerate.bind(this))
	}

	checkFocusAndGenerate() {
		this.toggleFocus = this.toggleFocus ? false : true
		this.toggleFocus ? this.generateFlakes() : this.stopFlakes()
	}

	generateFlakes() {
		if (this.stop) {
			this.tabInFocus = setInterval(() => {
				this.canvas.createSnowflake(this.speedValue, this.sizeValue)
			}, this.amountValue)
		}
	}

	stopFlakes() {
		clearInterval(this.tabInFocus)
	}

}

const initialzieInject = new Inject()

class Snowflake {
    constructor(ctx, width, speed, size) {
        this.ctx = ctx
        this.right = Math.random() > 0.5 ? true : false
        this.size = Math.floor(Math.random() * size) + 2
        this.x = Math.floor(Math.random() * width) + 1
        this.curve = 100
        this.y = -10
        this.speed = speed + (this.size / 50)
        this.opacity = (Math.random() * 1) + 0.25
    }

    render() {
        this.ctx.fillStyle = 'rgba(245, 245, 255, ' + this.opacity + ')'
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI)
        this.ctx.fill()
    }
}

class CanvasHandler {
    constructor() {
        this.snowflakes = []
        this.height = window.innerHeight
        this.width = window.innerWidth
        this.canvas
        this.ctx
    }

    initialize() {
        const body = document.querySelector('body')
        this.ctx = this.createCanvas(body)
		this.initializeListener()
        this.run()
    }

    initializeListener() {
        window.addEventListener('resize', () => {
            this.canvas.height = window.innerHeight
            this.canvas.width = window.innerWidth
        })
    }

    createCanvas(body) {
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.style.padding = '0'
        this.canvas.style.margin = '0'
        this.canvas.style.position = 'absolute'
        this.canvas.style.zIndex = '9999'
        this.canvas.style.maxWidth = '100%'
        this.canvas.style.left = '0px'
        this.canvas.style.top = '0px'
        this.canvas.style.pointerEvents = 'none'
        body.appendChild(this.canvas)
        return this.canvas.getContext('2d')
    }

    clear() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }

    draw() {
        this.clear()
        return this.update()
    }

    removeSnowflakesOutOfCanvasOrInvisible(snowflake, key) {
        if (snowflake.y > this.canvas.height || snowflake.opacity === 0) {
            this.snowflakes.splice(key, 1)
        }
    }

    createSnowflake(speed, size) {
    	this.snowflakes.push(new Snowflake(this.ctx, this.canvas.width, speed, size))
    }

    noise(snowflake) {
        if (snowflake.right) {
            snowflake.x -= Math.sin(snowflake.curve) / 5
        } else {
            snowflake.x += Math.sin(snowflake.curve) / 5
        }

        snowflake.curve += 0.01
    }

	lowerOpacity(snowflake) {
		const lower = snowflake.y > this.canvas.height * 0.7 ? 0.03 : 0.002
		snowflake.opacity -= lower
	}

    update() {
        for (let i = 0; i < this.snowflakes.length; i++) {
            let snowflake = this.snowflakes[i]
            snowflake.y += snowflake.speed
            this.noise(snowflake)
			this.lowerOpacity(snowflake)
            this.removeSnowflakesOutOfCanvasOrInvisible(snowflake, i)
            snowflake.render()
        }
    }

    run() {
        this.draw()
        window.requestAnimationFrame(this.run.bind(this))
    }
}
