chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
      chrome.storage.sync.set({'snowToggle': true}, function() {
        sendResponse();
      });
  });
