const toggleSnow = () => {
    chrome.storage.sync.get("snowToggle", function (obj) {
        const toggle = obj.snowToggle ? false : true
        chrome.storage.sync.set({'snowToggle': toggle}, function() {
          sendResponse();
        });
    });
}

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
        let toggle = document.querySelector('.toggle')
        toggle.addEventListener('click', toggleSnow)
	}
	}, 10);
});
