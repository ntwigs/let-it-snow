chrome.runtime.onInstalled.addListener(async () => {
  const contentScripts = chrome.runtime.getManifest().content_scripts
  if (!Array.isArray(contentScripts)) return

  const [contentScript] = contentScripts

  const tabs = await chrome.tabs.query({ url: contentScript.matches })

  tabs.forEach((tab) => {
    const tabId = tab.id
    if (!tabId || !contentScript.js || !contentScript.css) return

    chrome.scripting
      .executeScript({
        target: { tabId },
        files: contentScript.js,
      })
      .catch(() => {
        /* Eat js injectionError */
      })

    chrome.scripting
      .insertCSS({
        target: { tabId },
        files: contentScript.css,
      })
      .catch(() => {
        /* Eat css injectionError */
      })
  })
})
