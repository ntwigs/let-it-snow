chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		chrome.storage.sync.get("snowToggle", function (obj) {
    		console.log(obj);
		});
	}
	}, 10);
});
