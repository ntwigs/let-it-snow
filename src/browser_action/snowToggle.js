const toggleSnow = () => {
    var bkg = chrome.extension.getBackgroundPage();
    bkg.console.log('Sent to background page');
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
