const toggleSnow = () => {
    chrome.storage.sync.get('snowToggle', function (obj) {
        const toggle = obj.snowToggle ? false : true

        chrome.storage.sync.set({'snowToggle': toggle}, function() {
          sendResponse()
        })
    })
}

const saveOptions = () => {

    const amount = document.querySelector('.amount').value
    const size = document.querySelector('.size').value
    const speed = document.querySelector('.speed').value

    let options = {'amount': amount, 'size': size, 'speed': speed}

    chrome.storage.sync.set({'options': options}, function() {
      sendResponse()
    })
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === 'complete') {
		clearInterval(readyStateCheckInterval)
        let toggle = document.querySelector('.toggle')
        let save = document.querySelector('.save')

        chrome.storage.sync.get('options', function (test) {
            document.querySelector('.amount').value = test.options.amount
            document.querySelector('.size').value = test.options.size
            document.querySelector('.speed').value = test.options.speed
        })

        toggle.addEventListener('click', toggleSnow)
        save.addEventListener('click', saveOptions)
	}
	}, 10)
})
