class SnowToggle {
    constructor() {
        chrome.extension.sendMessage({}, response => {
        	const readyStateCheckInterval = setInterval(() => {
            	if (document.readyState === 'complete') {
            		clearInterval(readyStateCheckInterval)
                    this.amount = document.querySelector('.amount')
                    this.size = document.querySelector('.size')
                    this.speed = document.querySelector('.speed')
                    this.toggle = document.querySelector('.toggle')
                    this.container = document.querySelector('.toggle-container')
                    this.save = document.querySelector('.save')
                    this.range = document.querySelectorAll('.range')
                    this.checkValues()
                    this.addListener()
                    this.restoreValues()
            	}
        	}, 10)
        })
    }

    checkValues() {
        chrome.storage.sync.get('snowToggle', obj => {
            if (obj.snowToggle === undefined) {
                this.toggle.classList.toggle('move-right')
                chrome.storage.sync.set({'snowToggle': false}, () => {
                    sendResponse()
                })
            }
        })

        chrome.storage.sync.get('options', optionObject => {
            if (optionObject.options === undefined) {
             let options = {'amount': 50, 'size': 50, 'speed': 50}
            chrome.storage.sync.set({'options': options}, () => {
                sendResponse()
            })
            }
        })
    }

    addListener() {
        this.container.addEventListener('click', this.toggleSnow.bind(this))
        for (let i = 0; i < this.range.length; i++) {
            this.range[i].addEventListener('change', this.saveOptions.bind(this))
        }
    }

    toggleSnow() {
        this.toggle.classList.toggle('move-right')
        chrome.storage.sync.get('snowToggle', obj => {
            let toggle

            if (obj.snowToggle !== undefined) {
                toggle = obj.snowToggle ? false : true
            } else {
                toggle = false
            }

            chrome.storage.sync.set({'snowToggle': toggle}, () => {
                sendResponse()
            })
            
        })
    }

    saveOptions() {
        let options = {'amount': this.amount.value || 50, 'size': this.size.value || 50, 'speed': this.speed.value || 50}
        chrome.storage.sync.set({'options': options}, () => {
            sendResponse()
        })
    }

    restoreValues() {
        chrome.storage.sync.get('options', optionObject => {
            this.amount.value = optionObject.options.amount
            this.size.value = optionObject.options.size
            this.speed.value = optionObject.options.speed

            chrome.storage.sync.get('snowToggle', obj => {
                if (!obj.snowToggle) {
                    this.toggle.classList.toggle('move-right')
                }
            })

        })
    }
}

const initSnowToggle = new SnowToggle()
