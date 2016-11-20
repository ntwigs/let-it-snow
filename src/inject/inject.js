chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === 'complete') {
		clearInterval(readyStateCheckInterval)
		chrome.storage.sync.get('snowToggle', function (obj) {
    		if (obj.snowToggle) {
				const canvas = new CanvasHandler()
				canvas.initialize()

				let tabInFocus
				toggleFocus = true

				chrome.storage.sync.get('options', function (option) {

					let amountValue = (1000 - (option.options.amount - 1)) || 250
					let sizeValue = (option.options.size / 10) || 0.15
					let speedValue = (option.options.speed / 100) || 0.35


					function generateFlakes() {
						tabInFocus = setInterval(() => {
							canvas.createSnowflake(speedValue, sizeValue)
						}, amountValue)
					}

					function stopFlakes() {
						window.clearInterval(tabInFocus)
					}

					generateFlakes()
					window.addEventListener('visibilitychange', () => {
						toggleFocus = toggleFocus ? false : true
						toggleFocus ? generateFlakes() : stopFlakes()
					})

				})
			}
		})
	}
	}, 10)
})

class Snowflake {
    constructor(ctx, width, speed, size) {

		//Values should be set with value / 100
        this.ctx = ctx
        this.right = Math.random() > 0.5 ? true : false

		//Set size value here
        this.size = Math.floor(Math.random() * size) + 2
        this.x = Math.floor(Math.random() * width) + 1
        this.curve = 100
        this.y = -10

		//Set speed value here
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

    update() {
        for (let i = 0; i < this.snowflakes.length; i++) {
            let snowflake = this.snowflakes[i]
            snowflake.y += snowflake.speed
            this.noise(snowflake)
            snowflake.opacity -= 0.002
            this.removeSnowflakesOutOfCanvasOrInvisible(snowflake, i)
            snowflake.render()
        }
    }

    run() {
        this.draw()
        window.requestAnimationFrame(this.run.bind(this))
    }
}
