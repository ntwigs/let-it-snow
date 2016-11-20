chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		chrome.storage.sync.get("snowToggle", function (obj) {
    		if (obj.snowToggle) {
				const canvas = new CanvasHandler()
				canvas.initialize()
				setInterval(() => {
					canvas.createSnowflake()
				}, 250)
			}
		});
	}
	}, 10);
})

class Snowflake {
    constructor(ctx, width) {
        const randomX = Math.floor(Math.random() * width) + 1

        this.ctx = ctx
        this.right = Math.random() > 0.5 ? true : false
        this.size = Math.floor(Math.random() * 4) + 2
        this.x = randomX
        this.curve = 100
        this.y = -10
        this.origo = randomX
        this.speed = 0.35 + (this.size / 50)
        // this.weight = Math.random
        this.xMax = this.x + 200
        this.xMin = this.x - 200
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
        this.snowAmount = 1
        this.snowflakes = []
        this.height = window.innerHeight
        this.width = window.innerWidth
        this.canvas
        this.ctx
    }

    initialize() {
        const body = document.querySelector('body')
        this.ctx = this.createCanvas(body)
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
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    draw() {
        this.clear()
        // this.createSnowflake()
        return this.update()
    }

    removeSnowflakesOutOfCanvasOrInvisible(snowflake, key) {
        if (snowflake.y > this.canvas.height || snowflake.opacity === 0) {
            this.snowflakes.splice(key, 1)
        }
    }

    createSnowflake() {
        // if (Math.random() < this.snowAmount) {
            this.snowflakes.push(new Snowflake(this.ctx, this.canvas.width))
        // }
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

(function() {

})();
